import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiLogIn, FiLogOut, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { isAuthenticated, logout, getAuthData, getUserRole } from '../../utils/localStorage';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const authenticated = isAuthenticated();
  const user = getAuthData();
  const role = getUserRole();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  // Auto-hide on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Floating Navbar Container - AUTO HIDE */}
      <div className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-16 pt-6 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <nav className="max-w-[1400px] mx-auto bg-white/90 backdrop-blur-xl rounded-full shadow-2xl border border-gray-200/50 px-8 md:px-10 py-4 transition-all duration-300 hover:shadow-3xl">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <div className="relative transition-transform duration-300 group-hover:scale-105">
                <img 
                  src="/logo-donasiku.png" 
                  alt="DonasiKu Logo" 
                  className="h-10 md:h-12 w-auto object-contain"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              <Link 
                to="/" 
                className={`px-6 py-2.5 font-semibold transition-all rounded-full ${
                  isActive('/') 
                    ? 'bg-gradient-to-r from-[#007EFF] to-[#0063FF] text-white shadow-lg' 
                    : 'text-gray-700 hover:text-[#007EFF] hover:bg-blue-50'
                }`}
              >
                Home
              </Link>

              <Link 
                to="/about" 
                className={`px-6 py-2.5 font-semibold transition-all rounded-full ${
                  isActive('/about') 
                    ? 'bg-gradient-to-r from-[#007EFF] to-[#0063FF] text-white shadow-lg' 
                    : 'text-gray-700 hover:text-[#007EFF] hover:bg-blue-50'
                }`}
              >
                About
              </Link>

              {authenticated && role === 'donatur' && (
                <Link 
                  to="/dashboard-donatur" 
                  className={`px-6 py-2.5 font-semibold transition-all rounded-full ${
                    isActive('/dashboard-donatur') 
                      ? 'bg-gradient-to-r from-[#007EFF] to-[#0063FF] text-white shadow-lg' 
                      : 'text-gray-700 hover:text-[#007EFF] hover:bg-blue-50'
                  }`}
                >
                  Dashboard
                </Link>
              )}

              {!authenticated ? (
                <div className="flex items-center space-x-2 ml-4">
                  <Link 
                    to="/login" 
                    className="px-6 py-2.5 text-gray-700 hover:text-[#007EFF] font-semibold transition-all rounded-full hover:bg-blue-50 flex items-center space-x-2"
                  >
                    <FiLogIn className="text-lg" />
                    <span>Login</span>
                  </Link>
                  <Link 
                    to="/register" 
                    className="px-7 py-2.5 bg-gradient-to-r from-[#007EFF] to-[#0063FF] text-white font-bold rounded-full hover:shadow-xl hover:shadow-[#007EFF]/30 transform hover:scale-105 transition-all"
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <div className="flex items-center space-x-3 ml-4">
                  <div className="flex items-center space-x-3 px-5 py-2.5 bg-blue-50 rounded-full">
                    <div className="w-9 h-9 bg-gradient-to-br from-[#007EFF] to-[#0063FF] rounded-full flex items-center justify-center shadow-lg">
                      <FiUser className="text-white text-sm" />
                    </div>
                    <span className="font-bold text-[#00306C] text-sm">{user?.name}</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="px-6 py-2.5 text-red-600 hover:bg-red-50 font-semibold transition-all rounded-full flex items-center space-x-2"
                  >
                    <FiLogOut />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-3 text-gray-700 hover:text-[#007EFF] hover:bg-blue-50 rounded-full transition-all"
            >
              {mobileMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="absolute top-24 left-4 right-4 bg-white rounded-3xl shadow-2xl p-6 space-y-3">
            <Link 
              to="/" 
              className={`block px-5 py-3 rounded-xl font-semibold transition-all ${
                isActive('/') ? 'bg-gradient-to-r from-[#007EFF] to-[#0063FF] text-white' : 'text-gray-700 hover:bg-blue-50'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>

            <Link 
              to="/about" 
              className={`block px-5 py-3 rounded-xl font-semibold transition-all ${
                isActive('/about') ? 'bg-gradient-to-r from-[#007EFF] to-[#0063FF] text-white' : 'text-gray-700 hover:bg-blue-50'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>

            {authenticated && role === 'donatur' && (
              <Link 
                to="/dashboard-donatur" 
                className={`block px-5 py-3 rounded-xl font-semibold transition-all ${
                  isActive('/dashboard-donatur') ? 'bg-gradient-to-r from-[#007EFF] to-[#0063FF] text-white' : 'text-gray-700 hover:bg-blue-50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}

            {!authenticated ? (
              <>
                <Link 
                  to="/login" 
                  className="block px-5 py-3 text-gray-700 hover:bg-blue-50 rounded-xl font-semibold transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="block px-5 py-3 bg-gradient-to-r from-[#007EFF] to-[#0063FF] text-white text-center rounded-xl font-bold shadow-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <div className="px-5 py-3 bg-blue-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#007EFF] to-[#0063FF] rounded-full flex items-center justify-center">
                      <FiUser className="text-white" />
                    </div>
                    <span className="font-bold text-[#00306C]">{user?.name}</span>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full px-5 py-3 text-red-600 hover:bg-red-50 rounded-xl font-semibold transition-all text-left"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;