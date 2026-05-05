import React from 'react';
import { BarChart3, AlertTriangle } from 'lucide-react';
import ImageUploader from '../common/ImageUploader';
import MetricsPanel from '../metrics/MetricsPanel';
import Loader from '../common/Loader';
import { useImageUpload } from '../../hooks/useImageUpload';
import { useApiCall } from '../../hooks/useApiCall';
import { endpoints } from '../../api/endpoints';

const BenchmarkSection = () => {
  const rawUpload = useImageUpload();
  const refUpload = useImageUpload();
  const { data, loading, error, execute } = useApiCall(endpoints.computeMetrics);

  const handleBenchmark = async () => {
    if (!rawUpload.file) return;
    try {
      await execute(rawUpload.file, refUpload.file || null);
    } catch (err) {
      console.error('Benchmark failed:', err);
    }
  };

  const isSubmitDisabled = !rawUpload.file || loading;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {loading && <Loader message="Computing image quality metrics..." />}

      <div className="glass-card p-8 mb-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-textPrimary">Performance Benchmark</h2>
            <p className="text-sm text-textSecondary text-left">
              Compare a raw underwater image against its ground truth reference (optional).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <ImageUploader
            label="Raw Underwater Image"
            onFileSelect={rawUpload.handleFileSelect}
            file={rawUpload.file}
            previewUrl={rawUpload.previewUrl}
            error={rawUpload.error}
            onClear={rawUpload.clearFile}
          />
          <ImageUploader
            label="Reference Image (Ground Truth)"
            onFileSelect={refUpload.handleFileSelect}
            file={refUpload.file}
            previewUrl={refUpload.previewUrl}
            error={refUpload.error}
            onClear={refUpload.clearFile}
          />
        </div>

        <button
          onClick={handleBenchmark}
          disabled={isSubmitDisabled}
          className={`w-full py-4 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
            isSubmitDisabled
              ? 'bg-secondarySurface text-textSecondary cursor-not-allowed border border-border'
              : 'bg-primary text-background hover:bg-primary/90 shadow-[0_0_15px_rgba(0,212,255,0.3)]'
          }`}
        >
          {loading ? (
            <>
              <BarChart3 className="w-5 h-5 animate-spin" />
              Computing...
            </>
          ) : (
            <>
              <BarChart3 className="w-5 h-5" />
              Compute Metrics
            </>
          )}
        </button>

        {error && (
          <div className="mt-6 bg-error/10 border border-error/20 p-4 rounded-lg flex items-center gap-3 text-error">
            <AlertTriangle className="w-5 h-5" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}
      </div>

      {data && (
        <div className="animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold text-textPrimary">Benchmark Results</h2>
            <div className="h-px flex-grow bg-border"></div>
          </div>
          <MetricsPanel metrics={data} />
        </div>
      )}
    </div>
  );
};

export default BenchmarkSection;
