import { Link } from 'react-router-dom';

const DashboardFooter = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="text-sm text-gray-600">
            &copy; 2025 Donasiku. Dashboard Donasi.
          </div>

          {/* Links */}
          <div className="flex space-x-6 text-sm">
            <Link to="/about" className="text-gray-600 hover:text-[#007EFF] transition-colors">
              About
            </Link>
            <Link to="/privacy" className="text-gray-600 hover:text-[#007EFF] transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="text-gray-600 hover:text-[#007EFF] transition-colors">
              Terms
            </Link>
            <Link to="/" className="text-gray-600 hover:text-[#007EFF] transition-colors">
              Home
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;