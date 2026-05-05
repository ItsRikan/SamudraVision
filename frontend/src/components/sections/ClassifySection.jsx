import React from 'react';
import { Search, Info, AlertTriangle, Droplets } from 'lucide-react';
import ImageUploader from '../common/ImageUploader';
import Loader from '../common/Loader';
import { useImageUpload } from '../../hooks/useImageUpload';
import { useApiCall } from '../../hooks/useApiCall';
import { endpoints } from '../../api/endpoints';
import { formatConfidence } from '../../utils/formatters';

const ClassifySection = () => {
  const { file, previewUrl, error: uploadError, handleFileSelect, clearFile } = useImageUpload();
  const { data, loading, error: apiError, execute } = useApiCall(endpoints.classifyWater);

  const handleClassify = async () => {
    if (!file) return;
    try {
      await execute(file);
    } catch (err) {
      console.error('Classification failed:', err);
    }
  };

  const getWaterTypeStyles = (type) => {
    const types = {
      'Deep Blue Ocean': {
        color: 'text-blue-500',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/30',
        desc: 'High clarity but significant light absorption. Red wavelengths are almost entirely lost.',
        difficulty: 'Medium'
      },
      'Coastal/Turbid': {
        color: 'text-emerald-500',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/30',
        desc: 'High particulate concentration leading to significant scattering and green/yellow tint.',
        difficulty: 'High'
      },
      'Mixed/Shallow': {
        color: 'text-teal-400',
        bg: 'bg-teal-400/10',
        border: 'border-teal-400/30',
        desc: 'Variable lighting and complex scattering from seabed reflection.',
        difficulty: 'Low'
      }
    };
    return types[type] || {
      color: 'text-primary',
      bg: 'bg-primary/10',
      border: 'border-primary/30',
      desc: 'Unknown water characteristics detected.',
      difficulty: 'Unknown'
    };
  };

  const waterStyles = data ? getWaterTypeStyles(data.wtype) : null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {loading && <Loader message="Analyzing water type properties..." />}

      <div className="glass-card p-8 mb-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Search className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-textPrimary">Water Classifier</h2>
            <p className="text-sm text-textSecondary text-left">
              AI analysis to determine water type and optical characteristics.
            </p>
          </div>
        </div>

        <div className="mb-8">
          <ImageUploader
            onFileSelect={handleFileSelect}
            file={file}
            previewUrl={previewUrl}
            error={uploadError}
            onClear={() => { clearFile(); }}
          />
        </div>

        <button
          onClick={handleClassify}
          disabled={!file || loading}
          className={`w-full py-4 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 ${!file || loading
              ? 'bg-secondarySurface text-textSecondary cursor-not-allowed border border-border'
              : 'bg-primary text-background hover:bg-primary/90 shadow-[0_0_15px_rgba(0,212,255,0.3)]'
            }`}
        >
          {loading ? (
            <>
              <Search className="w-5 h-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              Classify Water Type
            </>
          )}
        </button>

        {apiError && (
          <div className="mt-6 bg-error/10 border border-error/20 p-4 rounded-lg flex items-center gap-3 text-error">
            <AlertTriangle className="w-5 h-5" />
            <p className="text-sm font-medium">{apiError}</p>
          </div>
        )}
      </div>

      {data && (
        <div className="glass-card p-8 animate-fade-in overflow-hidden relative">
          {/* Subtle background icon */}
          <Droplets className={`absolute -right-8 -bottom-8 w-48 h-48 opacity-10 ${waterStyles.color}`} />

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 ${waterStyles.bg} ${waterStyles.color} border ${waterStyles.border}`}>
                  Environment Detected
                </span>
                <h2 className={`text-4xl font-bold ${waterStyles.color} mb-2`}>{data.wtype}</h2>
                <div className="flex items-center gap-2 text-textSecondary">
                  <Info className="w-4 h-4" />
                  <span className="text-sm">Difficulty Level: <strong className="text-textPrimary">{waterStyles.difficulty}</strong></span>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="relative w-24 h-24 mb-2">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      cx="50" cy="50" r="45"
                      fill="transparent"
                      stroke="currentColor"
                      strokeWidth="8"
                      className="text-surface"
                    />
                    <circle
                      cx="50" cy="50" r="45"
                      fill="transparent"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeDasharray={`${data.score * 282.7} 282.7`}
                      strokeLinecap="round"
                      className={`${waterStyles.color} transition-all duration-1000 ease-out`}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-xl font-bold ${waterStyles.color}`}>
                      {Math.round(data.score * 100)}%
                    </span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-textSecondary uppercase tracking-widest">Score</span>
              </div>
            </div>

            <div className="bg-secondarySurface/50 p-6 rounded-xl border border-border">
              <h3 className="text-lg font-bold text-textPrimary mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" />
                Optical Characteristics
              </h3>
              <p className="text-textSecondary leading-relaxed italic">
                "{waterStyles.desc}"
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassifySection;
