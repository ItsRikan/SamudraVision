import React, { useRef, useState } from 'react';
import { UploadCloud, FileImage, X, AlertCircle } from 'lucide-react';

const ImageUploader = ({ label, onFileSelect, file, previewUrl, error, onClear }) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-textPrimary mb-2">{label}</label>}
      
      {!file ? (
        <div
          className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl transition-all duration-300 cursor-pointer ${
            isDragging
              ? 'border-primary bg-primary/10'
              : error 
                ? 'border-error bg-error/5'
                : 'border-border hover:border-primary/50 hover:bg-surface/50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileInput}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
            <UploadCloud className={`w-10 h-10 mb-3 ${isDragging ? 'text-primary' : error ? 'text-error' : 'text-textSecondary'}`} />
            <p className="mb-2 text-sm text-textPrimary">
              <span className="font-semibold text-primary">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-textSecondary">JPG, JPEG, PNG (MAX. 10MB)</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/jpeg, image/jpg, image/png"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="relative w-full h-64 rounded-xl border border-border overflow-hidden bg-surface group">
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-secondarySurface">
              <FileImage className="w-16 h-16 text-textSecondary" />
            </div>
          )}
          
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
            <p className="text-sm text-textPrimary truncate max-w-[80%] px-2">
              {file.name}
            </p>
            <p className="text-xs text-textSecondary">
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </p>
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={triggerFileInput}
                className="px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary text-sm font-medium rounded-lg transition-colors border border-primary/30"
              >
                Change File
              </button>
              {onClear && (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); onClear(); }}
                  className="p-2 bg-error/20 hover:bg-error/30 text-error rounded-lg transition-colors border border-error/30"
                  title="Remove file"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/jpeg, image/jpg, image/png"
            onChange={handleFileChange}
          />
        </div>
      )}

      {error && (
        <div className="flex items-center gap-1 mt-2 text-error text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
