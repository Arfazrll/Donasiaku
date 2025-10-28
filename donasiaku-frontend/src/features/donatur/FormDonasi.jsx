import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUpload, FiX, FiMapPin } from 'react-icons/fi';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { createDonasi } from '../../services/donasiService';
import { getAuthData } from '../../utils/localStorage';
import { validateDonasiForm } from '../../utils/validation';

const FormDonasi = () => {
  const navigate = useNavigate();
  const user = getAuthData();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    quantity: '',
    unit: 'pcs',
    location: '',
    status: 'aktif',
    userId: user.id,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const categories = [
    { value: '', label: 'Pilih Kategori' },
    { value: 'pakaian', label: 'Pakaian' },
    { value: 'makanan', label: 'Makanan' },
    { value: 'buku', label: 'Buku & Alat Tulis' },
    { value: 'elektronik', label: 'Elektronik' },
    { value: 'perabotan', label: 'Perabotan' },
    { value: 'mainan', label: 'Mainan' },
    { value: 'lainnya', label: 'Lainnya' },
  ];

  const units = ['pcs', 'kg', 'box', 'set', 'pack'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file maksimal 5MB');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('File harus berupa gambar');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateDonasiForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setLoading(true);

    try {
      const donasiData = {
        ...formData,
        imagePreview,
        quantity: parseInt(formData.quantity),
      };

      await createDonasi(donasiData);
      navigate('/dashboard-donatur');
    } catch (error) {
      console.error('Error creating donasi:', error);
      alert('Gagal membuat donasi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom max-w-3xl">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Buat Donasi Baru
            </h1>
            <p className="text-gray-600">
              Isi formulir di bawah untuk membuat posting donasi
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Upload Image */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Foto Barang
              </label>
              {imagePreview ? (
                <div className="relative">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                  >
                    <FiX />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 transition-colors">
                  <FiUpload className="text-4xl text-gray-400 mb-2" />
                  <span className="text-gray-600">Klik untuk upload foto</span>
                  <span className="text-sm text-gray-500 mt-1">PNG, JPG (Max 5MB)</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Title */}
            <Input
              label="Judul Donasi"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Contoh: Pakaian Bekas Layak Pakai"
              error={errors.title}
              required
            />

            {/* Description */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Deskripsi <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Jelaskan kondisi barang, ukuran, dll"
                rows="4"
                className={`input-field ${errors.description ? 'border-red-500' : ''}`}
                required
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>

            {/* Category */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Kategori <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`input-field ${errors.category ? 'border-red-500' : ''}`}
                required
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </div>

            {/* Quantity & Unit */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <Input
                  label="Jumlah"
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="0"
                  error={errors.quantity}
                  required
                  min="1"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Satuan <span className="text-red-500">*</span>
                </label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  {units.map(unit => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                <div className="flex items-center space-x-2">
                  <FiMapPin />
                  <span>Lokasi Pengambilan</span>
                  <span className="text-red-500">*</span>
                </div>
              </label>
              <textarea
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Alamat lengkap untuk pengambilan barang"
                rows="3"
                className={`input-field ${errors.location ? 'border-red-500' : ''}`}
                required
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">{errors.location}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">
                💡 Tip: Sertakan alamat lengkap dan patokan agar mudah ditemukan
              </p>
            </div>

            {/* Submit Buttons */}
            <div className="flex space-x-4">
              <Button
                type="submit"
                variant="primary"
                className="flex-1"
                disabled={loading}
              >
                {loading ? 'Menyimpan...' : 'Simpan Donasi'}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate('/dashboard-donatur')}
                disabled={loading}
              >
                Batal
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormDonasi;