// src/features/penerima/DashboardPenerima.jsx

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiPackage, FiMapPin, FiCalendar, FiSearch, FiAlertCircle } from 'react-icons/fi';
import { getAuthData } from '../../utils/localStorage';
import { getAllDonasi } from '../../services/donasiService'; // Pastikan path ini benar

const DashboardPenerima = () => {
  const user = getAuthData();
  const navigate = useNavigate();
  
  const [allDonations, setAllDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'Semua' },
    { value: 'pakaian', label: 'Pakaian' },
    { value: 'elektronik', label: 'Elektronik' },
    { value: 'buku', label: 'Buku' },
    { value: 'mainan', label: 'Mainan' },
    { value: 'perabotan', label: 'Perabotan' },
    { value: 'lainnya', label: 'Lainnya' }
  ];

  useEffect(() => {
  const loadDonations = async () => {
    try {
      const donasiList = await getAllDonasi();
      const activeDonations = donasiList.filter(d => d.status === 'aktif');
      setAllDonations(activeDonations);
      setFilteredDonations(activeDonations);
    } catch (error) {
      console.error("Gagal memuat donasi:", error);
    }
  };
  loadDonations();
}, []);

  // 3. Filter donasi berdasarkan search dan kategori
  useEffect(() => {
    let result = allDonations;

    // Filter berdasarkan kategori
    if (category !== 'all') {
      result = result.filter(d => d.kategori.toLowerCase() === category.toLowerCase());
    }

    // Filter berdasarkan search term
    if (searchTerm) {
      result = result.filter(d => 
        d.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.deskripsi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.lokasi.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredDonations(result);
  }, [searchTerm, category, allDonations]);

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
      {/* Hero Section - Mengikuti UI Anda */}
      <div className="bg-gradient-to-br from-[#00306C] via-[#0063FF] to-[#007EFF] text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Selamat Datang, {user?.name}! 👋
            </h1>
            <p className="text-xl text-white/80">
              Temukan dan ajukan donasi yang Anda butuhkan
            </p>
          </div>

          {/* Search Bar - Pengganti Stat Cards */}
          <div className="relative">
            <input 
              type="text"
              placeholder="Cari donasi berdasarkan nama, deskripsi, atau lokasi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 border-2 border-transparent focus:border-white focus:ring-0"
            />
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-gray-400" />
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
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Daftar Donasi Tersedia</h2>
            <p className="text-gray-600">Pilih donasi yang paling sesuai dengan kebutuhan Anda</p>
          </div>
        </div>

        {/* Filter Kategori */}
        <div className="flex flex-wrap gap-2 mb-6 bg-white rounded-xl p-2 shadow-md">
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${
                category === cat.value
                  ? 'bg-gradient-to-r from-[#007EFF] to-[#0063FF] text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Donations Grid */}
        {filteredDonations.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiAlertCircle className="text-5xl text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Donasi Tidak Ditemukan</h3>
            <p className="text-gray-600">Coba ubah kata kunci pencarian atau filter kategori Anda.</p>
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

                  {/* Action Button */}
                  <div className="pt-4 border-t border-gray-100">
                    <button
                      onClick={() => navigate(`/donasi/detail/${donation.id}`)}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-[#007EFF] to-[#0063FF] text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-[#007EFF]/30 transition-all hover:scale-105"
                    >
                      <span>Lihat Detail & Ajukan</span>
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

export default DashboardPenerima;