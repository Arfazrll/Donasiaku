import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiPlus, FiPackage, FiCheckCircle, FiClock, FiEdit, FiTrash2, FiMapPin } from 'react-icons/fi';
import { getAuthData } from '../../utils/localStorage';
import { getMyDonasi, deleteDonasiService } from '../../services/donasiService';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const DashboardDonatur = () => {
  const navigate = useNavigate();
  const user = getAuthData();
  const [donasi, setDonasi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    aktif: 0,
    selesai: 0,
  });

  const loadDonasi = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getMyDonasi(user.id);
      setDonasi(data);
      
      // Calculate stats
      setStats({
        total: data.length,
        aktif: data.filter(d => d.status === 'aktif').length,
        selesai: data.filter(d => d.status === 'selesai').length,
      });
    } catch (error) {
      console.error('Error loading donasi:', error);
    } finally {
      setLoading(false);
    }
  }, [user.id]);

  useEffect(() => {
    loadDonasi();
  }, [loadDonasi]);

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus donasi ini?')) {
      try {
        await deleteDonasiService(id);
        loadDonasi();
      } catch (error) {
        console.error('Error deleting donasi:', error);
        alert('Gagal menghapus donasi');
      }
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      aktif: 'bg-green-100 text-green-800',
      selesai: 'bg-gray-100 text-gray-800',
      proses: 'bg-yellow-100 text-yellow-800',
    };
    return badges[status] || badges.aktif;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Dashboard Donatur */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="container-custom py-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Selamat Datang, {user?.name}! 👋
              </h1>
              <p className="text-xl text-green-100">
                Kelola donasi Anda dengan mudah dan pantau dampak kebaikan Anda
              </p>
            </div>
            <Link to="/donasi/buat">
              <Button variant="primary" className="bg-white text-green-600 hover:bg-gray-100 mt-4 md:mt-0">
                <div className="flex items-center space-x-2">
                  <FiPlus />
                  <span>Buat Donasi Baru</span>
                </div>
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 mb-1">Total Donasi</p>
                  <p className="text-4xl font-bold">{stats.total}</p>
                </div>
                <FiPackage className="text-5xl text-white/50" />
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 mb-1">Donasi Aktif</p>
                  <p className="text-4xl font-bold">{stats.aktif}</p>
                </div>
                <FiClock className="text-5xl text-white/50" />
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 mb-1">Donasi Selesai</p>
                  <p className="text-4xl font-bold">{stats.selesai}</p>
                </div>
                <FiCheckCircle className="text-5xl text-white/50" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donasi List Section */}
      <section className="container-custom py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Daftar Donasi Saya</h2>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat data...</p>
          </div>
        ) : donasi.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <FiPackage className="text-6xl text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Belum Ada Donasi
              </h3>
              <p className="text-gray-600 mb-6">
                Mulai berbagi kebaikan dengan membuat donasi pertama Anda
              </p>
              <Link to="/donasi/buat">
                <Button variant="primary">
                  <div className="flex items-center space-x-2">
                    <FiPlus />
                    <span>Buat Donasi</span>
                  </div>
                </Button>
              </Link>
            </div>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {donasi.map((item) => (
              <Card key={item.id} className="hover:scale-105 transition-transform">
                {/* Image */}
                <div className="mb-4 rounded-lg overflow-hidden bg-gray-200 h-48 flex items-center justify-center">
                  {item.imagePreview ? (
                    <img 
                      src={item.imagePreview} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FiPackage className="text-6xl text-gray-400" />
                  )}
                </div>

                {/* Content */}
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-800 flex-1">
                      {item.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(item.status)}`}>
                      {item.status}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <FiPackage className="mr-2" />
                      <span className="font-semibold">Kategori:</span>
                      <span className="ml-1 capitalize">{item.category}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FiPackage className="mr-2" />
                      <span className="font-semibold">Jumlah:</span>
                      <span className="ml-1">{item.quantity} {item.unit}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FiMapPin className="mr-2" />
                      <span className="font-semibold">Lokasi:</span>
                      <span className="ml-1 line-clamp-1">{item.location}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => navigate(`/donasi/edit/${item.id}`)}
                      className="flex-1 flex items-center justify-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      <FiEdit />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex-1 flex items-center justify-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <FiTrash2 />
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default DashboardDonatur;