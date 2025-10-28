import { 
  saveDonasi, 
  getDonasi, 
  getDonasiById, 
  updateDonasi, 
  deleteDonasi,
  getDonasiByUserId 
} from '../utils/localStorage';

export const createDonasi = async (donasiData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newDonasi = saveDonasi(donasiData);
      resolve(newDonasi);
    }, 500);
  });
};

export const getAllDonasi = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const donasi = getDonasi();
      resolve(donasi);
    }, 300);
  });
};

export const getDonasiByIdService = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const donasi = getDonasiById(id);
      if (donasi) {
        resolve(donasi);
      } else {
        reject(new Error('Donasi tidak ditemukan'));
      }
    }, 300);
  });
};

export const updateDonasiService = async (id, updatedData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const updated = updateDonasi(id, updatedData);
      if (updated) {
        resolve(updated);
      } else {
        reject(new Error('Gagal mengupdate donasi'));
      }
    }, 500);
  });
};

export const deleteDonasiService = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      deleteDonasi(id);
      resolve(true);
    }, 300);
  });
};

export const getMyDonasi = async (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const myDonasi = getDonasiByUserId(userId);
      resolve(myDonasi);
    }, 300);
  });
};