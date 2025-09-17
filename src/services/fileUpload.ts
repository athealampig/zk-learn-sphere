import { api } from './api';
import { MAX_FILE_SIZE, ALLOWED_FILE_TYPES, UPLOAD_ENDPOINTS } from '@/utils/constants';

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface UploadResult {
  id: string;
  filename: string;
  url: string;
  size: number;
  mimeType: string;
  uploadedAt: string;
}

export interface UploadOptions {
  onProgress?: (progress: UploadProgress) => void;
  endpoint?: string;
  timeout?: number;
}

class FileUploadService {
  async uploadFile(
    file: File, 
    options: UploadOptions = {}
  ): Promise<UploadResult> {
    // Validate file
    this.validateFile(file);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('filename', file.name);
    formData.append('mimeType', file.type);

    const endpoint = options.endpoint || UPLOAD_ENDPOINTS.DOCUMENTS;
    const timeout = options.timeout || 30000;

    try {
      const response = await api.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout,
        onUploadProgress: (progressEvent) => {
          if (options.onProgress && progressEvent.total) {
            const progress: UploadProgress = {
              loaded: progressEvent.loaded,
              total: progressEvent.total,
              percentage: Math.round((progressEvent.loaded / progressEvent.total) * 100)
            };
            options.onProgress(progress);
          }
        }
      });

      return response.data;
    } catch (error: any) {
      console.error('File upload failed:', error);
      throw new Error(
        error.response?.data?.message || 'File upload failed'
      );
    }
  }

  async uploadMultipleFiles(
    files: File[],
    options: UploadOptions = {}
  ): Promise<UploadResult[]> {
    const results: UploadResult[] = [];
    const errors: Error[] = [];

    // Upload files sequentially to avoid overwhelming the server
    for (let i = 0; i < files.length; i++) {
      try {
        const result = await this.uploadFile(files[i], {
          ...options,
          onProgress: (progress) => {
            if (options.onProgress) {
              // Calculate overall progress
              const fileProgress = progress.percentage / files.length;
              const overallProgress = (i / files.length) * 100 + fileProgress;
              
              options.onProgress({
                loaded: progress.loaded,
                total: progress.total,
                percentage: Math.round(overallProgress)
              });
            }
          }
        });
        results.push(result);
      } catch (error) {
        errors.push(error as Error);
      }
    }

    if (errors.length > 0 && results.length === 0) {
      throw new Error(`All uploads failed: ${errors.map(e => e.message).join(', ')}`);
    }

    if (errors.length > 0) {
      console.warn(`${errors.length} of ${files.length} uploads failed:`, errors);
    }

    return results;
  }

  async uploadProofFiles(files: File[]): Promise<UploadResult[]> {
    return this.uploadMultipleFiles(files, {
      endpoint: UPLOAD_ENDPOINTS.PROOF_FILES
    });
  }

  async uploadAvatar(file: File): Promise<UploadResult> {
    // Validate it's an image
    if (!file.type.startsWith('image/')) {
      throw new Error('Avatar must be an image file');
    }

    // Check size limit (smaller for avatars)
    const maxAvatarSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxAvatarSize) {
      throw new Error('Avatar file size must be less than 2MB');
    }

    return this.uploadFile(file, {
      endpoint: UPLOAD_ENDPOINTS.AVATARS
    });
  }

  private validateFile(file: File): void {
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      throw new Error(`File size must be less than ${this.formatFileSize(MAX_FILE_SIZE)}`);
    }

    // Check file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      throw new Error(`File type ${file.type} is not supported. Allowed types: ${ALLOWED_FILE_TYPES.join(', ')}`);
    }

    // Check if file is empty
    if (file.size === 0) {
      throw new Error('File is empty');
    }
  }

  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Utility methods
  isValidFileType(file: File): boolean {
    return ALLOWED_FILE_TYPES.includes(file.type);
  }

  isValidFileSize(file: File): boolean {
    return file.size <= MAX_FILE_SIZE && file.size > 0;
  }

  getFileInfo(file: File) {
    return {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: new Date(file.lastModified),
      isValid: this.isValidFileType(file) && this.isValidFileSize(file)
    };
  }

  // Image specific utilities
  async resizeImage(
    file: File, 
    maxWidth: number, 
    maxHeight: number, 
    quality: number = 0.9
  ): Promise<File> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        // Set canvas size
        canvas.width = width;
        canvas.height = height;

        // Draw and resize image
        ctx?.drawImage(img, 0, 0, width, height);

        // Convert to blob
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const resizedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now()
              });
              resolve(resizedFile);
            } else {
              reject(new Error('Failed to resize image'));
            }
          },
          file.type,
          quality
        );
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  }

  // Generate preview URL for images
  generatePreviewUrl(file: File): string {
    if (file.type.startsWith('image/')) {
      return URL.createObjectURL(file);
    }
    return '';
  }

  // Clean up preview URLs
  revokePreviewUrl(url: string): void {
    URL.revokeObjectURL(url);
  }
}

// Export singleton instance
export const fileUploadService = new FileUploadService();