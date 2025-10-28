import { FiMail, FiPhone, FiMapPin, FiGithub, FiInstagram, FiTwitter } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-[#00306C] via-[#004CB3] to-[#0063FF] text-white mt-auto overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section dengan Logo Image */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <img 
                src="/logo-donasiku.png" 
                alt="DonasiKu Logo" 
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-white/80 leading-relaxed max-w-md mb-6">
              Platform donasi barang berbasis teknologi yang menghubungkan kemurahan hati Anda dengan mereka yang membutuhkan. Cepat, aman, dan transparan.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110">
                <FiInstagram className="text-lg" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110">
                <FiTwitter className="text-lg" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110">
                <FiGithub className="text-lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-white/80 hover:text-white transition-colors flex items-center space-x-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-white transition-all"></span>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/80 hover:text-white transition-colors flex items-center space-x-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-white transition-all"></span>
                  <span>About</span>
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-white/80 hover:text-white transition-colors flex items-center space-x-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-white transition-all"></span>
                  <span>Login</span>
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-white/80 hover:text-white transition-colors flex items-center space-x-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-white transition-all"></span>
                  <span>Register</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-6">Hubungi Kami</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-white/80">
                <FiMail className="text-xl mt-1 flex-shrink-0" />
                <span>info@donasiku.com</span>
              </li>
              <li className="flex items-start space-x-3 text-white/80">
                <FiPhone className="text-xl mt-1 flex-shrink-0" />
                <span>+62 ----</span>
              </li>
              <li className="flex items-start space-x-3 text-white/80">
                <FiMapPin className="text-xl mt-1 flex-shrink-0" />
                <span>Telkom University, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-white/60 text-sm">
            &copy; 2025 Donasiku. Develope by Donasiku Team.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link to="/privacy" className="text-white/60 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-white/60 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
