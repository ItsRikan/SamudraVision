export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#00D4FF',
        background: '#0A0F1E',
        surface: '#111827',
        secondarySurface: '#1F2937',
        textPrimary: '#F9FAFB',
        textSecondary: '#9CA3AF',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        border: '#374151',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
