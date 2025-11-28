export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateDonasiForm = (formData) => {
  const errors = {};

  if (!formData.title || formData.title.trim() === '') {
    errors.title = 'Judul donasi harus diisi';
  }

  if (!formData.description || formData.description.trim() === '') {
    errors.description = 'Deskripsi donasi harus diisi';
  }

  if (!formData.category || formData.category === '') {
    errors.category = 'Kategori harus dipilih';
  }

  if (!formData.quantity || formData.quantity <= 0) {
    errors.quantity = 'Jumlah barang harus lebih dari 0';
  }

  if (!formData.location || formData.location.trim() === '') {
    errors.location = 'Lokasi pengambilan harus diisi';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};