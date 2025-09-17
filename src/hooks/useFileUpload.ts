import { useState, useCallback } from 'react';
import { fileUploadService, UploadProgress, UploadResult } from '@/services/fileUpload';
import { notificationService } from '@/services/notifications';

export interface UseFileUploadOptions {
  endpoint?: string;
  onSuccess?: (result: UploadResult) => void;
  onError?: (error: Error) => void;
  maxFiles?: number;
  acceptedTypes?: string[];
}

export interface FileUploadState {
  files: File[];
  uploading: boolean;
  progress: UploadProgress | null;
  results: UploadResult[];
  errors: Error[];
}

export const useFileUpload = (options: UseFileUploadOptions = {}) => {
  const [state, setState] = useState<FileUploadState>({
    files: [],
    uploading: false,
    progress: null,
    results: [],
    errors: []
  });

  const resetState = useCallback(() => {
    setState({
      files: [],
      uploading: false,
      progress: null,
      results: [],
      errors: []
    });
  }, []);

  const addFiles = useCallback((newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles);
    const maxFiles = options.maxFiles || 10;
    
    setState(prev => {
      const totalFiles = prev.files.length + fileArray.length;
      
      if (totalFiles > maxFiles) {
        notificationService.warning(
          'Too Many Files',
          `You can only upload up to ${maxFiles} files at once`
        );
        return prev;
      }

      // Filter out duplicates and invalid files
      const validFiles = fileArray.filter(file => {
        const isDuplicate = prev.files.some(f => 
          f.name === file.name && f.size === file.size
        );
        
        if (isDuplicate) {
          notificationService.warning('Duplicate File', `${file.name} is already selected`);
          return false;
        }

        if (options.acceptedTypes && !options.acceptedTypes.includes(file.type)) {
          notificationService.error(
            'Invalid File Type',
            `${file.name} is not an accepted file type`
          );
          return false;
        }

        if (!fileUploadService.isValidFileSize(file)) {
          notificationService.error(
            'File Too Large',
            `${file.name} exceeds the maximum file size limit`
          );
          return false;
        }

        return true;
      });

      return {
        ...prev,
        files: [...prev.files, ...validFiles]
      };
    });
  }, [options.maxFiles, options.acceptedTypes]);

  const removeFile = useCallback((index: number) => {
    setState(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  }, []);

  const uploadFiles = useCallback(async () => {
    if (state.files.length === 0) {
      notificationService.warning('No Files', 'Please select files to upload');
      return;
    }

    setState(prev => ({
      ...prev,
      uploading: true,
      progress: { loaded: 0, total: 0, percentage: 0 },
      results: [],
      errors: []
    }));

    try {
      let results: UploadResult[];
      
      if (state.files.length === 1) {
        // Single file upload
        const result = await fileUploadService.uploadFile(state.files[0], {
          endpoint: options.endpoint,
          onProgress: (progress) => {
            setState(prev => ({ ...prev, progress }));
          }
        });
        results = [result];
      } else {
        // Multiple file upload
        results = await fileUploadService.uploadMultipleFiles(state.files, {
          endpoint: options.endpoint,
          onProgress: (progress) => {
            setState(prev => ({ ...prev, progress }));
          }
        });
      }

      setState(prev => ({
        ...prev,
        uploading: false,
        progress: null,
        results
      }));

      notificationService.success(
        'Upload Successful',
        `Successfully uploaded ${results.length} file${results.length > 1 ? 's' : ''}`
      );

      options.onSuccess?.(results[0]); // For backward compatibility
      
      return results;
    } catch (error) {
      const err = error as Error;
      
      setState(prev => ({
        ...prev,
        uploading: false,
        progress: null,
        errors: [...prev.errors, err]
      }));

      notificationService.error('Upload Failed', err.message);
      options.onError?.(err);
      
      throw error;
    }
  }, [state.files, options]);

  const uploadSingleFile = useCallback(async (file: File) => {
    setState(prev => ({
      ...prev,
      uploading: true,
      progress: { loaded: 0, total: 0, percentage: 0 },
      results: [],
      errors: []
    }));

    try {
      const result = await fileUploadService.uploadFile(file, {
        endpoint: options.endpoint,
        onProgress: (progress) => {
          setState(prev => ({ ...prev, progress }));
        }
      });

      setState(prev => ({
        ...prev,
        uploading: false,
        progress: null,
        results: [result]
      }));

      notificationService.success('Upload Successful', `Successfully uploaded ${file.name}`);
      options.onSuccess?.(result);
      
      return result;
    } catch (error) {
      const err = error as Error;
      
      setState(prev => ({
        ...prev,
        uploading: false,
        progress: null,
        errors: [err]
      }));

      notificationService.error('Upload Failed', err.message);
      options.onError?.(err);
      
      throw error;
    }
  }, [options]);

  // Drag and drop handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      addFiles(droppedFiles);
    }
  }, [addFiles]);

  // File input change handler
  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      addFiles(selectedFiles);
    }
  }, [addFiles]);

  // Generate preview URLs
  const getPreviewUrls = useCallback(() => {
    return state.files.map(file => ({
      file,
      url: fileUploadService.generatePreviewUrl(file)
    }));
  }, [state.files]);

  // Cleanup preview URLs
  const cleanupPreviewUrls = useCallback((urls: string[]) => {
    urls.forEach(url => fileUploadService.revokePreviewUrl(url));
  }, []);

  return {
    // State
    files: state.files,
    uploading: state.uploading,
    progress: state.progress,
    results: state.results,
    errors: state.errors,

    // Actions
    addFiles,
    removeFile,
    uploadFiles,
    uploadSingleFile,
    resetState,

    // Drag and drop handlers
    dragHandlers: {
      onDragOver: handleDragOver,
      onDragEnter: handleDragEnter,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop
    },

    // File input handler
    handleFileInputChange,

    // Preview utilities
    getPreviewUrls,
    cleanupPreviewUrls,

    // Validation utilities
    isValidFile: (file: File) => fileUploadService.isValidFileType(file) && fileUploadService.isValidFileSize(file),
    getFileInfo: fileUploadService.getFileInfo
  };
};