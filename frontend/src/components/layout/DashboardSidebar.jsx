// src/components/layout/DashboardSidebar.jsx

import { Link, useLocation } from 'react-router-dom';
import { 
  FiHome, FiPackage, FiInbox, FiMessageSquare, FiClock, FiUser, 
  FiSettings, FiLogOut, FiChevronLeft, FiSearch, FiHeart 
} from 'react-icons/fi';
import { logout, getUserRole } from '../../utils/localStorage'; // <-- Tambahkan getUserRole
import { useNavigate } from 'react-router-dom';

const DashboardSidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const role = getUserRole(); // <-- Dapatkan role pengguna

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  // Definisikan menu berdasarkan role
  let mainMenuItems = [];
  let bottomMenuItems = [];

  if (role === 'donatur') {
    mainMenuItems = [
      { path: '/dashboard-donatur', label: 'Dashboard', icon: FiHome },
      { path: '/donatur/donasi-saya', label: 'Donasi Saya', icon: FiPackage },
      { path: '/donatur/permintaan', label: 'Permintaan', icon: FiInbox },
      { path: '/donatur/chat', label: 'Chat', icon: FiMessageSquare },
      { path: '/donatur/riwayat', label: 'Riwayat', icon: FiClock },
    ];
    bottomMenuItems = [
      { path: '/donatur/profil', label: 'Profil', icon: FiUser },
      { path: '/donatur/settings', label: 'Settings', icon: FiSettings },
    ];
  } else if (role === 'penerima') {
    mainMenuItems = [
      // Ini adalah halaman utama untuk penerima
      { path: '/dashboard-penerima', label: 'Cari Donasi', icon: FiSearch }, 
      { path: '/penerima/permintaan-saya', label: 'Permintaan Saya', icon: FiInbox },
      { path: '/penerima/chat', label: 'Chat', icon: FiMessageSquare },
      { path: '/penerima/riwayat', label: 'Riwayat', icon: FiClock },
    ];
    bottomMenuItems = [
      { path: '/penerima/profil', label: 'Profil', icon: FiUser },
      { path: '/penerima/settings', label: 'Settings', icon: FiSettings },
    ];
  }

  return (
    <>
      {/* Overlay untuk mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 shadow-xl z-50 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-0 lg:w-20'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo & Toggle */}
          <div className="h-20 flex items-center justify-between px-6 border-b border-gray-200">
            {isOpen && (
              <Link to="/" className="flex items-center space-x-2">
                <img 
                  src="/logo-donasiku.png" 
                  alt="DonasiKu" 
                  className="h-10 w-auto object-contain"
                />
              </Link>
            )}
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FiChevronLeft className={`text-xl transition-transform ${!isOpen && 'rotate-180'}`} />
            </button>
          </div>

          {/* Main Menu (Dinamis) */}
          <div className="flex-1 overflow-y-auto py-6">
            <div className="px-3 mb-2">
              {isOpen && <p className="text-xs font-semibold text-gray-500 uppercase px-3 mb-2">Main</p>}
            </div>
            <nav className="space-y-1 px-3">
              {mainMenuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-[#007EFF] to-[#0063FF] text-white shadow-lg'
                      : 'text-gray-700 hover:bg-blue-50'
                  }`}
                  title={!isOpen ? item.label : ''}
                >
                  <item.icon className="text-xl flex-shrink-0" />
                  {isOpen && <span className="font-semibold">{item.label}</span>}
                </Link>
              ))}
            </nav>

            {/* Settings Section (Dinamis) */}
            <div className="px-3 mt-8 mb-2">
              {isOpen && <p className="text-xs font-semibold text-gray-500 uppercase px-3 mb-2">Setting</p>}
            </div>
            <nav className="space-y-1 px-3">
              {bottomMenuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-[#007EFF] to-[#0063FF] text-white shadow-lg'
                      : 'text-gray-700 hover:bg-blue-50'
                  }`}
                  title={!isOpen ? item.label : ''}
                >
                  <item.icon className="text-xl flex-shrink-0" />
                  {isOpen && <span className="font-semibold">{item.label}</span>}
                </Link>
              ))}
            </nav>
          </div>

          {/* Logout Button */}
          <div className="p-3 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all font-semibold"
              title={!isOpen ? 'Logout' : ''}
            >
              <FiLogOut className="text-xl flex-shrink-0" />
              {isOpen && <span>Sign-Out</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;