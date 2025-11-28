import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { login } from '../../services/authService';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'donatur'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Untuk animasi fade-in
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Login menggunakan authService
      const user = await login(formData.email, formData.password);

      // Cek apakah role sesuai
      if (user.role !== formData.role) {
        setError(`Anda terdaftar sebagai ${user.role}, bukan ${formData.role}`);
        setLoading(false);
        return;
      }

      // Redirect berdasarkan role
      if (user.role === 'donatur') {
        navigate('/dashboard-donatur');
      } else {
        navigate('/dashboard-penerima');
      }
    } catch (err) {
      setError(err.message || 'Email, password, atau role tidak valid');
      setLoading(false);
    }
  };

  return (
    // Padding atas (pt-40) agar tidak tertutup navbar
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center pt-40 pb-20 px-6">
      
      {/* Wrapper untuk animasi */}
      <div className={`w-full max-w-md transition-all duration-700 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* --- REVISI UTAMA --- */}
        {/* Mengganti struktur kartu agar sama seperti Register.jsx */}
        {/* Menghapus 'overflow-hidden' dan menambahkan 'p-8' */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          
          {/* Header Teks (menggantikan header biru) */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Login ke Donasiku</h2>
            <p className="text-gray-600">Masuk untuk mulai berdonasi</p>
          </div>

          {/* Form */}
          {/* Menghapus 'p-8' dari sini karena sudah ada di parent */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm transition-all animate-pulse">
                {error}
              </div>
            )}

            {/* Role Selector */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">
                Login Sebagai
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'donatur' })}
                  className={`py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                    formData.role === 'donatur'
                      ? 'bg-gradient-to-r from-[#007EFF] to-[#0063FF] text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                   Donatur
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'penerima' })}
                  className={`py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                    formData.role === 'penerima'
                      ? 'bg-gradient-to-r from-[#007EFF] to-[#0063FF] text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                   Penerima
                </button>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Email *
              </label>
              <div className="relative group">
                <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl transition-colors group-focus-within:text-[#007EFF]" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@example.com"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#007EFF] focus:ring-4 focus:ring-[#007EFF]/10 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Password *
              </label>
              <div className="relative group">
                <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl transition-colors group-focus-within:text-[#007EFF]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-[#007EFF] focus:ring-4 focus:ring-[#007EFF]/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FiEyeOff className="text-xl" /> : <FiEye className="text-xl" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-[#007EFF] to-[#0063FF] text-white font-bold rounded-xl hover:shadow-xl hover:shadow-[#007EFF]/30 transition-all hover:scale-[1.03] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : 'Login'}
            </button>

            {/* Register Link */}
            <p className="text-center text-gray-600">
              Belum punya akun?{' '}
              <Link to="/register" className="text-[#007EFF] font-semibold hover:underline">
                Daftar di sini
              </Link>
            </p>

            {/* Demo Info */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <p className="text-sm font-semibold text-yellow-800 mb-1">Demo Login:</p>
              <p className="text-xs text-yellow-700">Buat akun baru atau gunakan akun yang sudah Anda daftarkan</p>
            </div>
          </form>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link to="/" className="text-gray-600 hover:text-[#007EFF] font-semibold transition-colors">
            ← Kembali ke Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;