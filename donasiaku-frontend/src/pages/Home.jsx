import { Link } from 'react-router-dom';
import { FiArrowRight, FiHeart, FiUsers, FiPackage, FiCheckCircle, FiTrendingUp, FiShield, FiMapPin } from 'react-icons/fi';
import { useEffect, useState, useCallback } from 'react';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const showcaseImages = [
    {
      title: 'Dashboard Interaktif',
      description: 'Kelola dan konfirmasi donasi dengan dashboard',
      gradient: 'from-[#007EFF] to-[#0063FF]',
      icon: '📊',
      stat: '500+ Donatur'
    },
    {
      title: 'Real-time Matching',
      description: 'Sistem Transparasi donasi dengan penerima secara langsung',
      gradient: 'from-[#00A6FF] to-[#007EFF]',
      icon: '🎯',
      stat: '95% Match Rate'
    },
    {
      title: 'Track & Verify',
      description: 'Aman dan Terverivikasi',
      gradient: 'from-[#0063FF] to-[#00306C]',
      icon: '🔒',
      stat: '100% Transparent'
    },
  ];

  const autoSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % showcaseImages.length);
  }, [showcaseImages.length]);

  useEffect(() => {
    const interval = setInterval(autoSlide, 5000);
    return () => clearInterval(interval);
  }, [autoSlide]);

  const bentoFeatures = [
    {
      title: 'Verified Users',
      description: 'Semua pengguna terverifikasi untuk keamanan maksimal',
      icon: <FiShield className="text-4xl" />,
      gradient: 'from-[#007EFF] to-[#0063FF]',
      size: 'large'
    },
    {
      title: 'Instant Connect',
      description: 'Hubungkan donatur & penerima dalam hitungan detik',
      icon: <FiUsers className="text-3xl" />,
      gradient: 'from-[#00A6FF] to-[#007EFF]',
      size: 'small'
    },
    {
      title: 'Real-time Tracking',
      description: 'Pantau status donasi secara real-time',
      icon: <FiTrendingUp className="text-3xl" />,
      gradient: 'from-[#0063FF] to-[#004CB3]',
      size: 'small'
    },
  ];

  const stats = [
    { value: '1000+', label: 'Donasi Sukses', icon: <FiPackage />, color: 'from-[#007EFF] to-[#0063FF]' },
    { value: '500+', label: 'Donatur Aktif', icon: <FiUsers />, color: 'from-[#00A6FF] to-[#007EFF]' },
    { value: '100+', label: 'Penerima Terbantu', icon: <FiHeart />, color: 'from-[#0063FF] to-[#00306C]' },
  ];

  return (
    <div className="overflow-hidden bg-gradient-to-b from-[#E9FAFF] to-white">
      {/* Hero Section */}
      <section className="relative min-h-screen pt-32 pb-20">
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-20 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#A7E8FF]/30 to-[#007EFF]/20 rounded-full blur-3xl"
            style={{
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
            }}
          ></div>
          <div 
            className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#8BE3FF]/30 to-[#00A6FF]/20 rounded-full blur-3xl"
            style={{
              transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`
            }}
          ></div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Content - 7 columns */}
            <div className={`lg:col-span-7 space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-5 py-3 rounded-full shadow-lg border border-[#A7E8FF]">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-[#00306C]">Trusted by 1000+ Users</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-6xl md:text-7xl font-bold leading-tight">
                  <span className="text-[#00306C]">Berbagi</span>
                  <br />
                  <span className="bg-gradient-to-r from-[#007EFF] via-[#00A6FF] to-[#0063FF] bg-clip-text text-transparent">
                    Kebahagiaan
                  </span>
                  <br />
                  <span className="text-[#00306C]">Dimulai di Sini</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                  Platform donasi berbasis teknologi yang menghubungkan kemurahan hati Anda dengan mereka yang membutuhkan. Cepat, aman, dan transparan.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/register" 
                  className="group relative px-8 py-4 bg-gradient-to-r from-[#007EFF] to-[#0063FF] text-white font-bold rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#007EFF]/50 hover:scale-105"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>Mulai Berdonasi</span>
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link 
                  to="/login" 
                  className="px-8 py-4 bg-white text-[#007EFF] font-bold rounded-2xl border-2 border-[#007EFF] hover:bg-[#007EFF] hover:text-white transition-all duration-300"
                >
                  Lihat Donasi 
                </Link>
              </div>

              <div className="flex flex-wrap gap-6 pt-4">
                {stats.map((stat, index) => (
                  <div 
                    key={index}
                    className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-lg border border-white/50 hover:scale-105 transition-transform"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-white text-xl shadow-lg`}>
                      {stat.icon}
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#00306C]">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - 5 columns */}
            <div className={`lg:col-span-5 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#007EFF] to-[#00A6FF] rounded-[2.5rem] blur-2xl opacity-20 animate-pulse"></div>
                
                <div className="relative bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-2xl overflow-hidden border border-white/50">
                  <div className="relative h-[500px]">
                    {showcaseImages.map((slide, index) => (
                      <div
                        key={index}
                        className={`absolute inset-0 transition-all duration-700 ${
                          index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                        }`}
                      >
                        <div className={`h-full bg-gradient-to-br ${slide.gradient} p-8 flex flex-col justify-between`}>
                          <div className="space-y-4">
                            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                              <span className="text-white text-sm font-semibold">{slide.stat}</span>
                            </div>
                            <div className="text-8xl">{slide.icon}</div>
                          </div>

                          <div className="space-y-2">
                            <h3 className="text-3xl font-bold text-white">{slide.title}</h3>
                            <p className="text-white/90 text-lg">{slide.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                    {showcaseImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`transition-all duration-300 ${
                          index === currentSlide 
                            ? 'bg-white w-8 h-2' 
                            : 'bg-white/50 w-2 h-2 hover:bg-white/75'
                        } rounded-full`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="py-24 relative">
        <div className="absolute top-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full">
            <path fill="#E9FAFF" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
          </svg>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl font-bold text-[#00306C]">
              Kenapa Memilih <span className="bg-gradient-to-r from-[#007EFF] to-[#00A6FF] bg-clip-text text-transparent">Donasiku</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Platform modern untuk pengalaman donasi yang lebih baik
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {bentoFeatures.map((feature, index) => (
              <div
                key={index}
                className={`group relative ${
                  feature.size === 'large' ? 'lg:col-span-2 lg:row-span-1' : 'lg:col-span-1'
                } ${
                  index === 0 ? 'lg:row-span-2' : ''
                }`}
              >
                <div className="h-full bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group-hover:scale-[1.02]">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                      <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                        {feature.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-[#00306C] mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                    
                    {feature.size === 'large' && (
                      <div className="mt-6">
                        <div className="flex items-center space-x-2 text-[#007EFF] font-semibold group-hover:translate-x-2 transition-transform">
                          <span>Selengkapnya</span>
                          <FiArrowRight />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-24 bg-gradient-to-br from-[#00306C] to-[#0063FF] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE4YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNk0wIDI0YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2IDYtMi42OS02LTYgMi42OS02IDYtNiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl font-bold">
              Cara Kerja Donasiku
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Proses donasi yang sederhana dan efisien
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                step: '01', 
                title: 'Daftar & Verifikasi', 
                desc: 'Buat akun dan verifikasi identitas untuk keamanan maksimal',
                icon: '🔐'
              },
              { 
                step: '02', 
                title: 'Posting Donasi', 
                desc: 'Upload foto barang dan detail lokasi pengambilan dengan mudah',
                icon: '📸'
              },
              { 
                step: '03', 
                title: 'Ambil & Konfirmasi', 
                desc: 'Sistem Transparasi donasi dengan penerima secara langsung',
                icon: '🤝'
              }
            ].map((item, index) => (
              <div key={index} className="relative group">
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 h-full">
                  <div className="text-6xl mb-6">{item.icon}</div>
                  <div className="text-sm font-bold text-[#8BE3FF] mb-2">STEP {item.step}</div>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-white/80">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-5xl font-bold text-[#00306C]">
              Siap Memulai Perjalanan Berbagi?
            </h2>
            <p className="text-xl text-gray-600">
              Bergabunglah dengan ribuan donatur yang telah membuat perbedaan
            </p>
            <div className="flex justify-center gap-4">
              <Link 
                to="/register" 
                className="group px-10 py-5 bg-gradient-to-r from-[#007EFF] to-[#0063FF] text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-[#007EFF]/50 transition-all duration-300 hover:scale-105 inline-flex items-center space-x-2"
              >
                <span>Daftar Sekarang</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;