import { Link, useNavigate } from 'react-router-dom';
import { FiHeart, FiLogIn, FiLogOut, FiUser, FiHome, FiList } from 'react-icons/fi';
import { isAuthenticated, logout, getAuthData, getUserRole } from '../../utils/localStorage';

const Navbar = () => {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();
  const user = getAuthData();
  const role = getUserRole();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FiHeart className="text-primary-600 text-3xl" />
            <span className="text-2xl font-bold text-primary-600">DonasiAku</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors">
              <FiHome />
              <span>Home</span>
            </Link>

            {authenticated && role === 'donatur' && (
              <>
                <Link 
                  to="/dashboard-donatur" 
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <FiList />
                  <span>Dashboard</span>
                </Link>
              </>
            )}

            {!authenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors">
                  <FiLogIn />
                  <span>Login</span>
                </Link>
                <Link to="/register" className="btn-primary">
                  Register
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-700">
                  <FiUser />
                  <span className="font-semibold">{user?.name}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
                >
                  <FiLogOut />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-primary-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;