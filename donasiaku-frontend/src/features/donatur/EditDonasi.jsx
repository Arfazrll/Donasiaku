import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiPackage, FiImage, FiMapPin, FiFileText, FiSave, FiX } from 'react-icons/fi';

const EditDonasi = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    nama: '',
    kategori: 'pakaian',
    jumlah: 1,
    deskripsi: '',
    lokasi: '',
    status: 'aktif',
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

  useEffect(() => {
    const savedDonations = JSON.parse(localStorage.getItem('donations') || '[]');
    const donation = savedDonations.find(d => d.id === id);
    if (donation) {
      setFormData(donation);
      if (donation.image) {
        setImagePreview(donation.image);
      }
    } else {
      navigate('/dashboard-donatur');
    }
  }, [id, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
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

    const savedDonations = JSON.parse(localStorage.getItem('donations') || '[]');
    const updatedDonations = savedDonations.map(d => 
      d.id === id ? { ...formData, updatedAt: new Date().toISOString() } : d
    );
    localStorage.setItem('donations', JSON.stringify(updatedDonations));

    setTimeout(() => {
      navigate('/dashboard-donatur');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#00306C] to-[#0063FF] text-white">
        <div className="max-w-4xl mx-auto px-6 md:px-8 pt-24 pb-12">
          <button
            onClick={() => navigate('/dashboard-donatur')}
            className="inline-flex items-center space-x-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <FiX className="text-xl" />
            <span>Kembali ke Dashboard</span>
          </button>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Edit Donasi</h1>
          <p className="text-xl text-white/80">Perbarui informasi donasi Anda</p>
        </div>
        <div className="relative">
          <svg viewBox="0 0 1440 100" className="w-full">
            <path fill="#F9FAFB" d="M0,50 Q360,0 720,50 T1440,50 L1440,100 L0,100 Z"></path>
          </svg>
        </div>
      </div>

      {/* Form Container */}
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Image Upload Section */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 border-b border-gray-200">
            <label className="block mb-3">
              <span className="flex items-center space-x-2 text-lg font-bold text-gray-900 mb-4">
                <FiImage className="text-[#007EFF]" />
                <span>Foto Barang</span>
              </span>
              <div className="relative">
                {imagePreview ? (
                  <div className="relative group">
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
                      className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
                    >
                      <FiX />
                    </button>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                      <span className="text-white font-semibold">Klik untuk ganti foto</span>
                    </div>
                  </div>
                ) : (
                  <div className="border-3 border-dashed border-gray-300 rounded-2xl p-12 text-center cursor-pointer hover:border-[#007EFF] transition-all bg-white">
                    <FiImage className="text-6xl text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 font-semibold mb-2">Klik untuk upload foto</p>
                    <p className="text-sm text-gray-500">PNG, JPG hingga 5MB</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </label>
          </div>

          {/* Form Fields */}
          <div className="p-8 space-y-6">
            {/* Nama Barang */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-bold text-gray-900 mb-3">
                <FiPackage className="text-[#007EFF]" />
                <span>Nama Barang *</span>
              </label>
              <input
                type="text"
                required
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#007EFF] focus:ring-4 focus:ring-[#007EFF]/10 transition-all text-gray-900 font-medium"
              />
            </div>

            {/* Kategori */}
            <div>
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
                        ? 'bg-gradient-to-r from-[#007EFF] to-[#0063FF] text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="text-2xl">{cat.icon}</span>
                    <span>{cat.label}</span>
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
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#007EFF] focus:ring-4 focus:ring-[#007EFF]/10 transition-all text-gray-900 font-medium"
              />
            </div>

            {/* Status */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-bold text-gray-900 mb-3">
                <FiPackage className="text-[#007EFF]" />
                <span>Status *</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, status: 'aktif' })}
                  className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                    formData.status === 'aktif'
                      ? 'bg-green-500 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>🟢 Aktif</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, status: 'selesai' })}
                  className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                    formData.status === 'selesai'
                      ? 'bg-blue-500 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>✅ Selesai</span>
                </button>
              </div>
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
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#007EFF] focus:ring-4 focus:ring-[#007EFF]/10 transition-all text-gray-900 font-medium"
              />
            </div>

            {/* Deskripsi */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-bold text-gray-900 mb-3">
                <FiFileText className="text-[#007EFF]" />
                <span>Deskripsi *</span>
              </label>
              <textarea
                required
                value={formData.deskripsi}
                onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                rows="5"
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#007EFF] focus:ring-4 focus:ring-[#007EFF]/10 transition-all text-gray-900 font-medium resize-none"
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex space-x-4 pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-[#007EFF] to-[#0063FF] text-white font-bold rounded-xl hover:shadow-xl hover:shadow-[#007EFF]/30 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiSave className="text-xl" />
                <span>{isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
              </button>
              <button
                type="button"
                onClick={() => navigate('/dashboard-donatur')}
                className="px-8 py-4 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition-all"
              >
                Batal
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDonasi;