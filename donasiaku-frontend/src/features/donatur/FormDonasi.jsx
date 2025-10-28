import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPackage, FiImage, FiMapPin, FiFileText, FiSave } from 'react-icons/fi';
import { getAuthData } from '../../utils/localStorage';

const FormDonasi = () => {
  const navigate = useNavigate();
  const user = getAuthData();
  const [formData, setFormData] = useState({
    nama: '',
    kategori: 'pakaian',
    jumlah: 1,
    deskripsi: '',
    lokasi: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: 'pakaian', label: 'Pakaian', icon: '👕' },
    { value: 'elektronik', label: 'Elektronik', icon: '💻' },
    { value: 'buku', label: 'Buku', icon: '📚' },
    { value: 'mainan', label: 'Mainan', icon: '🧸' },
    { value: 'perabotan', label: 'Perabotan', icon: '🛋️' },
    { value: 'lainnya', label: 'Lainnya', icon: '📦' }
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file maksimal 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newDonation = {
      id: Date.now().toString(),
      ...formData,
      userId: user.id,
      status: 'aktif',
      createdAt: new Date().toISOString()
    };

    const savedDonations = JSON.parse(localStorage.getItem('donations') || '[]');
    savedDonations.push(newDonation);
    localStorage.setItem('donations', JSON.stringify(savedDonations));

    setTimeout(() => {
      navigate('/dashboard-donatur');
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#007EFF] to-[#0063FF] text-white px-8 py-6">
          <h2 className="text-2xl font-bold mb-2">Buat Donasi Baru</h2>
          <p className="text-blue-100">Bagikan kebaikan Anda dengan mengisi form di bawah ini</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          {/* Photo Upload */}
          <div className="mb-8">
            <label className="flex items-center space-x-2 text-sm font-bold text-gray-900 mb-3">
              <FiImage className="text-[#007EFF]" />
              <span>Foto Barang</span>
            </label>
            <div className="relative group">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-2xl"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setFormData({ ...formData, image: null });
                    }}
                    className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all shadow-lg"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="border-3 border-dashed border-gray-300 rounded-2xl h-64 flex flex-col items-center justify-center cursor-pointer hover:border-[#007EFF] transition-all bg-gray-50">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiImage className="text-4xl text-[#007EFF]" />
                    </div>
                    <p className="text-gray-700 font-semibold mb-1">Klik untuk upload foto</p>
                    <p className="text-sm text-gray-500">PNG, JPG hingga 5MB</p>
                  </div>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nama Barang */}
            <div className="md:col-span-2">
              <label className="flex items-center space-x-2 text-sm font-bold text-gray-900 mb-3">
                <FiPackage className="text-[#007EFF]" />
                <span>Nama Barang *</span>
              </label>
              <input
                type="text"
                required
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                placeholder="Contoh: Baju Bekas Layak Pakai"
                className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:border-[#007EFF] focus:ring-4 focus:ring-[#007EFF]/10 transition-all"
              />
            </div>

            {/* Kategori */}
            <div className="md:col-span-2">
              <label className="flex items-center space-x-2 text-sm font-bold text-gray-900 mb-3">
                <FiPackage className="text-[#007EFF]" />
                <span>Kategori *</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, kategori: cat.value })}
                    className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                      formData.kategori === cat.value
                        ? 'bg-gradient-to-r from-[#007EFF] to-[#0063FF] text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="text-xl">{cat.icon}</span>
                    <span className="text-sm">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Jumlah */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-bold text-gray-900 mb-3">
                <FiPackage className="text-[#007EFF]" />
                <span>Jumlah *</span>
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.jumlah}
                onChange={(e) => setFormData({ ...formData, jumlah: parseInt(e.target.value) })}
                className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:border-[#007EFF] focus:ring-4 focus:ring-[#007EFF]/10 transition-all"
              />
            </div>

            {/* Lokasi */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-bold text-gray-900 mb-3">
                <FiMapPin className="text-[#007EFF]" />
                <span>Lokasi Pengambilan *</span>
              </label>
              <input
                type="text"
                required
                value={formData.lokasi}
                onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                placeholder="Contoh: Jl. Gatot Subroto No. 123, Bandung"
                className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:border-[#007EFF] focus:ring-4 focus:ring-[#007EFF]/10 transition-all"
              />
            </div>

            {/* Deskripsi */}
            <div className="md:col-span-2">
              <label className="flex items-center space-x-2 text-sm font-bold text-gray-900 mb-3">
                <FiFileText className="text-[#007EFF]" />
                <span>Deskripsi *</span>
              </label>
              <textarea
                required
                value={formData.deskripsi}
                onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                placeholder="Jelaskan kondisi barang dan detail lainnya..."
                rows="4"
                className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:border-[#007EFF] focus:ring-4 focus:ring-[#007EFF]/10 transition-all resize-none"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-[#007EFF] to-[#0063FF] text-white font-bold rounded-xl hover:shadow-xl hover:shadow-[#007EFF]/30 transition-all hover:scale-105 disabled:opacity-50"
            >
              <FiSave className="text-xl" />
              <span>{isSubmitting ? 'Menyimpan...' : 'Simpan Donasi'}</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard-donatur')}
              className="px-8 py-4 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition-all"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormDonasi;