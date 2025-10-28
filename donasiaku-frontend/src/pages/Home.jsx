import { Link } from 'react-router-dom';
import { FiArrowRight, FiHeart, FiUsers, FiPackage, FiCheckCircle } from 'react-icons/fi';
import { useEffect, useState, useCallback } from 'react';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const showcaseImages = [
    {
      title: 'Dashboard Donatur',
      description: 'Kelola donasi Anda dengan mudah',
      color: 'from-blue-500 to-blue-700'
    },
    {
      title: 'Form Donasi',
      description: 'Buat posting donasi dalam hitungan menit',
      color: 'from-green-500 to-green-700'
    },
    {
      title: 'Riwayat Donasi',
      description: 'Pantau semua aktivitas donasi Anda',
      color: 'from-purple-500 to-purple-700'
    },
  ];

  const autoSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % showcaseImages.length);
  }, [showcaseImages.length]);

  useEffect(() => {
    const interval = setInterval(autoSlide, 3000);
    return () => clearInterval(interval);
  }, [autoSlide]);

  const features = [
    {
      icon: <FiHeart className="text-4xl text-primary-600" />,
      title: 'Mudah & Cepat',
      description: 'Proses donasi yang simple dan user-friendly'
    },
    {
      icon: <FiUsers className="text-4xl text-primary-600" />,
      title: 'Terpercaya',
      description: 'Platform yang aman dan dapat dipercaya'
    },
    {
      icon: <FiPackage className="text-4xl text-primary-600" />,
      title: 'Beragam Kategori',
      description: 'Berbagai jenis barang untuk didonasikan'
    },
    {
      icon: <FiCheckCircle className="text-4xl text-primary-600" />,
      title: 'Transparan',
      description: 'Tracking donasi yang jelas dan transparan'
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container-custom py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Berbagi Kebahagiaan Melalui <span className="text-yellow-300">DonasiAku</span>
              </h1>
              <p className="text-xl mb-8 text-gray-100">
                Platform donasi barang yang menghubungkan hati dermawan dengan mereka yang membutuhkan. 
                Mudah, cepat, dan terpercaya.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/register" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl flex items-center space-x-2">
                  <span>Mulai Berdonasi</span>
                  <FiArrowRight />
                </Link>
                <Link to="/login" className="border-2 border-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-primary-600 transition-all">
                  Login
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div>
                  <div className="text-4xl font-bold text-yellow-300">1000+</div>
                  <div className="text-gray-200">Donasi Terkumpul</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-yellow-300">500+</div>
                  <div className="text-gray-200">Donatur Aktif</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-yellow-300">100+</div>
                  <div className="text-gray-200">Penerima Terbantu</div>
                </div>
              </div>
            </div>

            {/* Right Content - Scrollable Showcase */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Preview Header */}
                <div className="bg-gray-800 px-4 py-3 flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>

                {/* Showcase Slider */}
                <div className="relative h-96 overflow-hidden">
                  {showcaseImages.map((slide, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                        index === currentSlide ? 'translate-x-0' : 'translate-x-full'
                      }`}
                      style={{
                        transform: `translateX(${(index - currentSlide) * 100}%)`
                      }}
                    >
                      <div className={`h-full bg-gradient-to-br ${slide.color} flex flex-col items-center justify-center p-8`}>
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-8 text-center">
                          <h3 className="text-3xl font-bold mb-4">{slide.title}</h3>
                          <p className="text-lg">{slide.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Slider Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {showcaseImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Mengapa Memilih DonasiAku?
            </h2>
            <p className="text-xl text-gray-600">
              Platform terbaik untuk berbagi kebaikan dengan mudah dan aman
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center hover:scale-105 transition-transform">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Cara Kerja
            </h2>
            <p className="text-xl text-gray-600">
              Mulai berdonasi dalam 3 langkah sederhana
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Daftar Akun</h3>
              <p className="text-gray-600">
                Buat akun sebagai Donatur dan lengkapi profil Anda
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Posting Donasi</h3>
              <p className="text-gray-600">
                Upload foto barang dan detail lokasi pengambilan
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Tersambung</h3>
              <p className="text-gray-600">
                Penerima akan menghubungi Anda untuk mengambil donasi
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">
            Siap Memulai Berbagi Kebaikan?
          </h2>
          <p className="text-xl mb-8 text-gray-100">
            Bergabunglah dengan ribuan donatur yang telah membantu sesama
          </p>
          <Link 
            to="/register" 
            className="bg-white text-primary-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl inline-flex items-center space-x-2"
          >
            <span>Daftar Sekarang</span>
            <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;