import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary-600 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Halaman Tidak Ditemukan</h2>
        <p className="text-gray-600 mb-8">
          Maaf, halaman yang Anda cari tidak ditemukan.
        </p>
        <Link 
          to="/" 
          className="btn-primary inline-flex items-center space-x-2"
        >
          <FiHome />
          <span>Kembali ke Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;