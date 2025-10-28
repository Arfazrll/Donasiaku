import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { register } from '../../utils/localStorage'; // UPDATE INI

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'donatur'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Password tidak cocok');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password minimal 6 karakter');
      return;
    }

    try {
      // Use register function from localStorage
      register(formData);
      alert('Registrasi berhasil! Silakan login.');
      navigate('/login');
    } catch (err) {
      setError(err.message);
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
            <h1 className="text-3xl font-bold mb-2">Daftar DonasiAku</h1>
            <p className="text-blue-100">Bergabung untuk mulai berbagi kebaikan</p>
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
                Daftar Sebagai
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

            {/* Name */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Nama Lengkap *
              </label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nama lengkap Anda"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#007EFF] focus:ring-4 focus:ring-[#007EFF]/10 transition-all"
                />
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
                  placeholder="Minimal 6 karakter"
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

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Konfirmasi Password *
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Ulangi password"
                  className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-[#007EFF] focus:ring-4 focus:ring-[#007EFF]/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <FiEyeOff className="text-xl" /> : <FiEye className="text-xl" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-[#007EFF] to-[#0063FF] text-white font-bold rounded-xl hover:shadow-xl hover:shadow-[#007EFF]/30 transition-all hover:scale-105"
            >
              Daftar Sekarang
            </button>

            {/* Login Link */}
            <p className="text-center text-gray-600">
              Sudah punya akun?{' '}
              <Link to="/login" className="text-[#007EFF] font-semibold hover:underline">
                Login di sini
              </Link>
            </p>
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

export default Register;