import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiHome, FiPackage, FiInbox, FiMessageSquare, FiClock, FiUser, FiLogOut } from 'react-icons/fi';
import { logout, getAuthData } from '../../utils/localStorage';
import { useState } from 'react';

const DashboardNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getAuthData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { path: '/dashboard-donatur', label: 'Dashboard', icon: FiHome },
    { path: '/donatur/donasi-saya', label: 'Donasi Saya', icon: FiPackage },
    { path: '/donatur/permintaan', label: 'Permintaan', icon: FiInbox },
    { path: '/donatur/chat', label: 'Chat', icon: FiMessageSquare },
    { path: '/donatur/riwayat', label: 'Riwayat', icon: FiClock },
    { path: '/donatur/profil', label: 'Profil', icon: FiUser },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/dashboard-donatur" className="flex items-center space-x-3 group">
            <img 
              src="/logo-donasiku.png" 
              alt="DonasiKu Logo" 
              className="h-10 w-auto object-contain transition-transform group-hover:scale-110"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-semibold transition-all ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-[#007EFF] to-[#0063FF] text-white shadow-lg'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-[#007EFF]'
                }`}
              >
                <item.icon className="text-lg" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* User Menu & Logout */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-3 px-4 py-2 bg-blue-50 rounded-xl">
              <div className="w-10 h-10 bg-gradient-to-br from-[#007EFF] to-[#0063FF] rounded-full flex items-center justify-center">
                <FiUser className="text-white" />
              </div>
              <div>
                <div className="text-sm font-bold text-gray-900">{user?.name}</div>
                <div className="text-xs text-gray-600">Donatur</div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-xl font-semibold transition-all"
            >
              <FiLogOut />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-xl"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-[#007EFF] to-[#0063FF] text-white'
                      : 'text-gray-700 hover:bg-blue-50'
                  }`}
                >
                  <item.icon className="text-xl" />
                  <span>{item.label}</span>
                </Link>
              ))}
              <div className="px-4 py-3 bg-blue-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#007EFF] to-[#0063FF] rounded-full flex items-center justify-center">
                    <FiUser className="text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">{user?.name}</div>
                    <div className="text-xs text-gray-600">Donatur</div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-semibold transition-all"
              >
                <FiLogOut className="text-xl" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default DashboardNavbar;