import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { login } from '../../utils/localStorage';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'donatur'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Simulasi login
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === formData.email && u.password === formData.password && u.role === formData.role);

    if (user) {
      login({ id: user.id, name: user.name, email: user.email, role: user.role });
      
      if (user.role === 'donatur') {
        navigate('/dashboard-donatur');
      } else {
        navigate('/dashboard-penerima');
      }
    } else {
      setError('Email, password, atau role tidak valid');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#007EFF] to-[#0063FF] text-white p-8 text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <img src="/logo-donasiku.png" alt="DonasiKu" className="h-12 w-auto brightness-0 invert" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Login ke DonasiAku</h1>
            <p className="text-blue-100">Masuk untuk mulai berdonasi</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
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
                  className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                    formData.role === 'donatur'
                      ? 'bg-gradient-to-r from-[#007EFF] to-[#0063FF] text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  🎁 Donatur
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'penerima' })}
                  className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                    formData.role === 'penerima'
                      ? 'bg-gradient-to-r from-[#007EFF] to-[#0063FF] text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  🤝 Penerima
                </button>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Email *
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
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
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
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
              className="w-full py-4 bg-gradient-to-r from-[#007EFF] to-[#0063FF] text-white font-bold rounded-xl hover:shadow-xl hover:shadow-[#007EFF]/30 transition-all hover:scale-105"
            >
              Login
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
          <Link to="/" className="text-gray-600 hover:text-[#007EFF] font-semibold">
            ← Kembali ke Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;