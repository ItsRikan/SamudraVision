import React, { useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';

const Toast = ({ message, type = 'error', onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  const bgClass = type === 'error' ? 'bg-error/10 border-error/30' : 'bg-primary/10 border-primary/30';
  const textClass = type === 'error' ? 'text-error' : 'text-primary';
  const Icon = type === 'error' ? AlertCircle : AlertCircle;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-[slideIn_0.3s_ease-out]">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${bgClass} backdrop-blur-md shadow-lg max-w-md`}>
        <Icon className={`w-5 h-5 flex-shrink-0 ${textClass}`} />
        <p className={`text-sm font-medium ${textClass} break-words`}>{message}</p>
        <button 
          onClick={onClose}
          className="ml-auto p-1 text-textSecondary hover:text-textPrimary transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
