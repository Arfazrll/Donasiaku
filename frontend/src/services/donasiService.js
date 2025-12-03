import { donationAPI } from './api';

const activeRequests = new Map();

const createRequestKey = (endpoint, params) => {
  return `${endpoint}_${JSON.stringify(params)}`;
};

export const createDonasi = async (donasiData) => {
  try {
    const response = await donationAPI.create(donasiData);
    return response.data.data;
  } catch (error) {
    console.error('Error creating donation:', error);
    throw new Error(error.response?.data?.message || 'Gagal membuat donasi');
  }
};

export const getAllDonasi = async (params = {}) => {
  const requestKey = createRequestKey('donations', params);
  
  if (activeRequests.has(requestKey)) {
    return activeRequests.get(requestKey);
  }

  const requestPromise = (async () => {
    try {
      const response = await donationAPI.getAll(params);
      
      if (!response.data || !response.data.success) {
        return [];
      }

      const donations = response.data.data?.data || [];
      return Array.isArray(donations) ? donations : [];
    } catch (error) {
      console.error('Error fetching donations:', error);
      return [];
    } finally {
      activeRequests.delete(requestKey);
    }
  })();

  activeRequests.set(requestKey, requestPromise);
  return requestPromise;
};

export const getDonasiByIdService = async (id) => {
  try {
    const response = await donationAPI.getById(id);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching donation:', error);
    throw new Error('Donasi tidak ditemukan');
  }
};

export const updateDonasiService = async (id, updatedData) => {
  try {
    const response = await donationAPI.update(id, updatedData);
    return response.data.data;
  } catch (error) {
    console.error('Error updating donation:', error);
    throw new Error(error.response?.data?.message || 'Gagal mengupdate donasi');
  }
};

export const deleteDonasiService = async (id) => {
  try {
    await donationAPI.delete(id);
    return true;
  } catch (error) {
    console.error('Error deleting donation:', error);
    throw new Error('Gagal menghapus donasi');
  }
};

export const getMyDonasi = async () => {
  const requestKey = 'my-donations';
  
  if (activeRequests.has(requestKey)) {
    return activeRequests.get(requestKey);
  }

  const requestPromise = (async () => {
    try {
      const response = await donationAPI.getMyDonations();
      
      if (!response.data || !response.data.success) {
        return [];
      }

      const donations = response.data.data?.data || [];
      return Array.isArray(donations) ? donations : [];
    } catch (error) {
      if (error.response?.status === 401) {
        return [];
      }
      console.error('Error fetching my donations:', error);
      return [];
    } finally {
      activeRequests.delete(requestKey);
    }
  })();

  activeRequests.set(requestKey, requestPromise);
  return requestPromise;
};

export const updateDonasiStatus = async (id, status) => {
  try {
    const response = await donationAPI.updateStatus(id, status);
    return response.data.data;
  } catch (error) {
    console.error('Error updating status:', error);
    throw new Error('Gagal mengubah status');
  }
};