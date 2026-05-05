import React from 'react';
import { Loader2 } from 'lucide-react';

const StatusBadge = ({ status, loading }) => {
  if (loading) {
    return (
      <div className="flex items-center gap-2 px-3 py-1 bg-surface rounded-full border border-border">
        <Loader2 className="w-3 h-3 text-primary animate-spin" />
        <span className="text-xs text-textSecondary font-medium">Checking...</span>
      </div>
    );
  }

  const isHealthy = status === 'healthy';
  const colorClass = isHealthy ? 'bg-success' : 'bg-error';
  const textClass = isHealthy ? 'text-success' : 'text-error';
  const borderClass = isHealthy ? 'border-success/30' : 'border-error/30';
  const bgClass = isHealthy ? 'bg-success/10' : 'bg-error/10';

  return (
    <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${borderClass} ${bgClass}`}>
      <span className="relative flex h-2.5 w-2.5">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${colorClass}`}></span>
        <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${colorClass}`}></span>
      </span>
      <span className={`text-xs font-medium uppercase tracking-wider ${textClass}`}>
        {isHealthy ? 'API Online' : 'API Offline'}
      </span>
    </div>
  );
};

export default StatusBadge;
