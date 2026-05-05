export const isValidImageFile = (file) => {
  if (!file) return false;
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  return validTypes.includes(file.type);
};

export const isFileSizeOk = (file, maxSizeMB = 10) => {
  if (!file) return false;
  const sizeInMB = file.size / (1024 * 1024);
  return sizeInMB <= maxSizeMB;
};

export const validateImageUpload = (file) => {
  if (!isValidImageFile(file)) {
    return 'Invalid file type. Only JPG, JPEG, and PNG are allowed.';
  }
  if (!isFileSizeOk(file)) {
    return 'File size exceeds 10MB limit.';
  }
  return null;
};
