import React, { useState } from 'react';
import { Download, RefreshCw, AlertTriangle } from 'lucide-react';
import ImageUploader from '../common/ImageUploader';
import ImageCompare from '../common/ImageCompare';
import Loader from '../common/Loader';
import { useImageUpload } from '../../hooks/useImageUpload';
import { useApiCall } from '../../hooks/useApiCall';
import { endpoints } from '../../api/endpoints';
import { formatTime } from '../../utils/formatters';

const EnhanceSection = () => {
  const { file, previewUrl, error: uploadError, handleFileSelect, clearFile } = useImageUpload();
  const { data, loading, error: apiError, execute } = useApiCall(endpoints.cleanImage);
  const [enhancedUrl, setEnhancedUrl] = useState(null);

  const handleEnhance = async () => {
    if (!file) return;
    try {
      const result = await execute(file);
      if (result && result.url) {
        setEnhancedUrl(result.url);
      }
    } catch (err) {
      console.error('Enhancement failed:', err);
    }
  };

  const handleDownload = async () => {
    if (!enhancedUrl) return;
    try {
      const response = await fetch(enhancedUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `enhanced_${file.name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  const handleReset = () => {
    clearFile();
    setEnhancedUrl(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {loading && <Loader message="Enhancing underwater image... Please wait." />}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Panel: Upload */}
        <div className="space-y-6">
          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold text-textPrimary mb-6 flex items-center gap-2">
              <RefreshCw className="w-6 h-6 text-primary" />
              Enhancement Lab
            </h2>
            
            <ImageUploader
              label="Select underwater image to clean"
              onFileSelect={handleFileSelect}
              file={file}
              previewUrl={previewUrl}
              error={uploadError}
              onClear={handleReset}
            />

            <button
              onClick={handleEnhance}
              disabled={!file || loading}
              className={`w-full mt-8 py-4 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                !file || loading
                  ? 'bg-secondarySurface text-textSecondary cursor-not-allowed border border-border'
                  : 'bg-primary text-background hover:bg-primary/90 shadow-[0_0_15px_rgba(0,212,255,0.3)]'
              }`}
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Enhancing...
                </>
              ) : (
                <>
                  <RefreshCw className="w-5 h-5" />
                  Enhance Image
                </>
              )}
            </button>
          </div>

          {apiError && (
            <div className="bg-error/10 border border-error/20 p-4 rounded-lg flex items-center gap-3 text-error">
              <AlertTriangle className="w-5 h-5" />
              <p className="text-sm font-medium">{apiError}</p>
            </div>
          )}
        </div>

        {/* Right Panel: Result */}
        <div className="space-y-6">
          {enhancedUrl ? (
            <div className="glass-card p-8 animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-textPrimary">Enhanced Result</h2>
                <span className="px-3 py-1 bg-success/10 border border-success/30 text-success rounded-full text-xs font-bold uppercase">
                  Processed
                </span>
              </div>

              <div className="mb-8">
                <ImageCompare beforeImage={previewUrl} afterImage={enhancedUrl} />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-secondarySurface p-4 rounded-lg border border-border">
                  <p className="text-xs text-textSecondary uppercase tracking-wider mb-1">Time Taken</p>
                  <p className="text-xl font-bold text-textPrimary">{formatTime(data?.time_taken)}</p>
                </div>
                <div className="bg-secondarySurface p-4 rounded-lg border border-border">
                  <p className="text-xs text-textSecondary uppercase tracking-wider mb-1">Status</p>
                  <p className="text-xl font-bold text-success uppercase">{data?.status || 'Success'}</p>
                </div>
              </div>


              <button
                onClick={handleDownload}
                className="w-full py-4 bg-surface border border-primary/50 text-primary hover:bg-primary/10 font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,212,255,0.1)]"
              >
                <Download className="w-5 h-5" />
                Download Enhanced Image
              </button>
            </div>
          ) : (
            <div className="glass-card p-8 h-full flex flex-col items-center justify-center text-center border-dashed border-border">
              <div className="w-20 h-20 rounded-full bg-secondarySurface flex items-center justify-center mb-6">
                <RefreshCw className="w-10 h-10 text-textSecondary opacity-30" />
              </div>
              <h3 className="text-xl font-bold text-textSecondary mb-2">Awaiting Enhancement</h3>
              <p className="text-sm text-textSecondary max-w-xs">
                Upload an image on the left and click "Enhance Image" to see the AI in action.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhanceSection;
