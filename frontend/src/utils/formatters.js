export const formatFloat = (value, decimals = 2) => {
  if (value === undefined || value === null || isNaN(value)) return '0.00';
  return Number(value).toFixed(decimals);
};

export const formatTime = (seconds) => {
  if (seconds === undefined || seconds === null || isNaN(seconds)) return '0.00 s';
  return `${Number(seconds).toFixed(2)} s`;
};

export const formatConfidence = (value) => {
  if (value === undefined || value === null || isNaN(value)) return '0%';
  return `${(Number(value) * 100).toFixed(1)}%`;
};
