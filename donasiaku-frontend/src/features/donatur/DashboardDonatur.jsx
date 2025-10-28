import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiPackage, FiClock, FiCheckCircle, FiEdit2, FiTrash2, FiMapPin, FiCalendar, FiAlertCircle, FiTrendingUp } from 'react-icons/fi';
import { getAuthData } from '../../utils/localStorage';

const DashboardDonatur = () => {
  const user = getAuthData();
  const [donations, setDonations] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    completed: 0
  });
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadDonations();
  }, []);

  const loadDonations = () => {
    const savedDonations = JSON.parse(localStorage.getItem('donations') || '[]');
    const userDonations = savedDonations.filter(d => d.userId === user.id);
    
    setDonations(userDonations);
    
    setStats({
      total: userDonations.length,
      active: userDonations.filter(d => d.status === 'aktif').length,
      completed: userDonations.filter(d => d.status === 'selesai').length
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus donasi ini?')) {
      const savedDonations = JSON.parse(localStorage.getItem('donations') || '[]');
      const updatedDonations = savedDonations.filter(d => d.id !== id);
      localStorage.setItem('donations', JSON.stringify(updatedDonations));
      loadDonations();
    }
  };

  const filteredDonations = filter === 'all' 
    ? donations 
    : donations.filter(d => {
        if (filter === 'active') return d.status === 'aktif';
        if (filter === 'completed') return d.status === 'selesai';
        return true;
      });

  const getStatusBadge = (status) => {
    const badges = {
      'aktif': { bg: 'bg-green-100', text: 'text-green-700', label: 'Aktif', icon: <FiClock /> },
      'selesai': { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Selesai', icon: <FiCheckCircle /> }
    };
    const badge = badges[status] || badges['aktif'];
    return (
      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-semibold ${badge.bg} ${badge.text}`}>
        {badge.icon}
        <span>{badge.label}</span>
      </span>
    );
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'pakaian': '👕',
      'elektronik': '💻',
      'buku': '📚',
      'mainan': '🧸',
      'perabotan': '🛋️',
      'lainnya': '📦'
    };
    return icons[category.toLowerCase()] || '📦';
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Stats */}
      <div className="bg-gradient-to-br from-[#00306C] via-[#0063FF] to-[#007EFF] text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-12">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Selamat Datang, {user?.name}! 👋
            </h1>
            <p className="text-xl text-white/80">
              Kelola donasi Anda dan lihat dampak kebaikan yang telah Anda buat
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                  <FiPackage className="text-3xl" />
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold">{stats.total}</div>
                  <div className="text-white/80 text-sm font-medium">Total Donasi</div>
                </div>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-green-500/30 rounded-xl flex items-center justify-center">
                  <FiClock className="text-3xl text-green-300" />
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold">{stats.active}</div>
                  <div className="text-white/80 text-sm font-medium">Donasi Aktif</div>
                </div>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-green-400 rounded-full" style={{ width: `${stats.total > 0 ? (stats.active/stats.total)*100 : 0}%` }}></div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-blue-500/30 rounded-xl flex items-center justify-center">
                  <FiCheckCircle className="text-3xl text-blue-300" />
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold">{stats.completed}</div>
                  <div className="text-white/80 text-sm font-medium">Donasi Selesai</div>
                </div>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-blue-400 rounded-full" style={{ width: `${stats.total > 0 ? (stats.completed/stats.total)*100 : 0}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Separator */}
        <div className="relative">
          <svg viewBox="0 0 1440 100" className="w-full">
            <path fill="#F9FAFB" d="M0,50 Q360,0 720,50 T1440,50 L1440,100 L0,100 Z"></path>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-8">
        {/* Action Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Daftar Donasi Saya</h2>
            <p className="text-gray-600">Kelola dan pantau semua donasi Anda</p>
          </div>
          <Link
            to="/donasi/buat"
            className="group inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#007EFF] to-[#0063FF] text-white font-bold rounded-xl hover:shadow-xl hover:shadow-[#007EFF]/30 transition-all hover:scale-105"
          >
            <FiPlus className="text-xl group-hover:rotate-90 transition-transform" />
            <span>Buat Donasi Baru</span>
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-2 mb-6 bg-white rounded-xl p-2 shadow-md">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${
              filter === 'all'
                ? 'bg-gradient-to-r from-[#007EFF] to-[#0063FF] text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Semua ({stats.total})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${
              filter === 'active'
                ? 'bg-gradient-to-r from-[#007EFF] to-[#0063FF] text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Aktif ({stats.active})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${
              filter === 'completed'
                ? 'bg-gradient-to-r from-[#007EFF] to-[#0063FF] text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Selesai ({stats.completed})
          </button>
        </div>

        {/* Donations Grid */}
        {filteredDonations.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiAlertCircle className="text-5xl text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Belum Ada Donasi</h3>
            <p className="text-gray-600 mb-6">Mulai berbagi kebaikan dengan membuat donasi pertama Anda</p>
            <Link
              to="/donasi/buat"
              className="inline-flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-[#007EFF] to-[#0063FF] text-white font-bold rounded-xl hover:shadow-xl transition-all"
            >
              <FiPlus className="text-xl" />
              <span>Buat Donasi Sekarang</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDonations.map((donation) => (
              <div
                key={donation.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-100 to-cyan-100">
                  {donation.image ? (
                    <img
                      src={donation.image}
                      alt={donation.nama}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                      {getCategoryIcon(donation.kategori)}
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    {getStatusBadge(donation.status)}
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-gray-700">
                      {getCategoryIcon(donation.kategori)} {donation.kategori}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                    {donation.nama}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {donation.deskripsi}
                  </p>

                  {/* Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <FiPackage className="text-[#007EFF]" />
                      <span>Jumlah: <span className="font-semibold">{donation.jumlah} pcs</span></span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <FiMapPin className="text-[#007EFF]" />
                      <span className="line-clamp-1">{donation.lokasi}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <FiCalendar className="text-[#007EFF]" />
                      <span>{new Date(donation.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-4 border-t border-gray-100">
                    <Link
                      to={`/donasi/edit/${donation.id}`}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 bg-blue-50 text-[#007EFF] font-semibold rounded-xl hover:bg-blue-100 transition-all"
                    >
                      <FiEdit2 />
                      <span>Edit</span>
                    </Link>
                    <button
                      onClick={() => handleDelete(donation.id)}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 bg-red-50 text-red-600 font-semibold rounded-xl hover:bg-red-100 transition-all"
                    >
                      <FiTrash2 />
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardDonatur;