import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Upload, X, File, CheckCircle } from 'lucide-react';
import { useFileUpload } from '@/hooks/useFileUpload';
import { formatFileSize } from '@/utils/helpers';

interface FileUploadProps {
  onUploadComplete?: (results: any[]) => void;
  maxFiles?: number;
  acceptedTypes?: string[];
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onUploadComplete,
  maxFiles = 5,
  acceptedTypes,
  className
}) => {
  const {
    files,
    uploading,
    progress,
    results,
    addFiles,
    removeFile,
    uploadFiles,
    dragHandlers,
    handleFileInputChange
  } = useFileUpload({
    maxFiles,
    acceptedTypes,
    onSuccess: onUploadComplete
  });

  const handleUpload = async () => {
    try {
      await uploadFiles();
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <div className={className}>
      <Card 
        className="glass border-white/10 border-dashed cursor-pointer hover:border-primary/50 transition-colors"
        {...dragHandlers}
      >
        <CardContent className="p-6 text-center">
          <input
            type="file"
            multiple
            accept={acceptedTypes?.join(',')}
            onChange={handleFileInputChange}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium mb-2">Drop files here or click to browse</p>
            <p className="text-sm text-muted-foreground">
              Maximum {maxFiles} files, up to 10MB each
            </p>
          </label>
        </CardContent>
      </Card>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <File className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index)}
                disabled={uploading}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}

          {uploading && progress && (
            <div className="p-3 bg-white/5 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Uploading...</span>
                <span className="text-sm">{progress.percentage}%</span>
              </div>
              <Progress value={progress.percentage} />
            </div>
          )}

          <Button
            onClick={handleUpload}
            disabled={uploading || files.length === 0}
            className="w-full"
          >
            {uploading ? 'Uploading...' : `Upload ${files.length} file${files.length > 1 ? 's' : ''}`}
          </Button>
        </div>
      )}
    </div>
  );
};