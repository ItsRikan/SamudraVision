import React from 'react';
import MetricsCard from './MetricsCard';
import { Clock } from 'lucide-react';
import { formatTime } from '../../utils/formatters';
import QualityGauge from './QualityGauge';

const MetricsPanel = ({ metrics }) => {
  if (!metrics) return null;

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {metrics.PSNR !== undefined && metrics.PSNR !== null && (
          <MetricsCard 
            title="PSNR"
            tooltip="Peak Signal-to-Noise Ratio. Measures the quality of reconstruction. Higher is better."
          >
            <QualityGauge 
              value={metrics.PSNR} 
              min={0} 
              max={50} 
              unit="dB" 
              thresholds={{ good: 30, excellent: 40 }}
            />
          </MetricsCard>
        )}

        {metrics.SSIM !== undefined && metrics.SSIM !== null && (
          <MetricsCard 
            title="SSIM"
            tooltip="Structural Similarity. Measures perceived change in structural information. Closer to 1.0 is better."
          >
            <QualityGauge 
              value={metrics.SSIM} 
              min={0} 
              max={1} 
              unit="Score" 
              thresholds={{ good: 0.8, excellent: 0.9 }}
              colorScheme="emerald"
            />
          </MetricsCard>
        )}

        <MetricsCard 
          title="UIQM"
          tooltip="Underwater Image Quality Measure. Combines colorfulness, sharpness, and contrast. Higher is better."
        >
          <QualityGauge 
            value={metrics.UIQM || 0} 
            min={-1} 
            max={5} 
            unit="UIQM" 
            thresholds={{ good: 3.0, excellent: 4.0 }}
            colorScheme="teal"
          />
        </MetricsCard>

        <MetricsCard 
          title="UCIQE"
          tooltip="Underwater Color Image Quality Evaluation. Measures color cast, saturation, and contrast. Higher is better."
        >
          <QualityGauge 
            value={metrics.UCIQE || 0} 
            min={0} 
            max={1} 
            unit="UCIQE" 
            thresholds={{ good: 0.5, excellent: 0.7 }}
            colorScheme="emerald"
          />
        </MetricsCard>

        <MetricsCard 
          title="Processing Time"
          tooltip="Time taken by the AI model to process the image."
        >
          <div className="flex flex-col items-center gap-2 py-4">
            <Clock className="w-8 h-8 text-textSecondary opacity-50" />
            <div className="text-center">
              <span className="text-3xl font-bold text-textPrimary">
                {formatTime(metrics.TIME)}
              </span>
            </div>
          </div>
        </MetricsCard>

      </div>

      <div className="glass-card p-6 text-sm text-textSecondary bg-surface/30">
        <h4 className="font-bold text-textPrimary mb-4 uppercase tracking-wider flex items-center gap-2">
          <div className="w-1 h-4 bg-primary rounded-full"></div>
          Detailed Metrics Guide
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          {metrics.PSNR && (
            <div className="flex justify-between border-b border-border/50 pb-2">
              <span><strong className="text-primary">PSNR (dB):</strong> 0 to 50+ range.</span>
              <span className="text-xs">Good &gt; 30 | Excellent &gt; 40</span>
            </div>
          )}
          {metrics.SSIM && (
            <div className="flex justify-between border-b border-border/50 pb-2">
              <span><strong className="text-success">SSIM Score:</strong> 0 to 1.0 range.</span>
              <span className="text-xs">Good &gt; 0.8 | Excellent &gt; 0.9</span>
            </div>
          )}
          <div className="flex justify-between border-b border-border/50 pb-2">
            <span><strong className="text-teal-400">UIQM:</strong> High clarity/contrast.</span>
            <span className="text-xs">Good &gt; 3.0 | Excellent &gt; 4.0</span>
          </div>
          <div className="flex justify-between border-b border-border/50 pb-2">
            <span><strong className="text-emerald-400">UCIQE:</strong> Color/Balance.</span>
            <span className="text-xs">Good &gt; 0.5 | Excellent &gt; 0.7</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsPanel;
