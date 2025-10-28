import { FiTarget, FiUsers, FiPackage, FiCheckCircle, FiMapPin, FiMessageSquare, FiTrendingUp, FiShield } from 'react-icons/fi';

const About = () => {
  const features = [
    {
      icon: <FiPackage className="text-3xl" />,
      title: 'Posting Donasi',
      description: 'Donatur dapat membuat posting barang dengan foto, deskripsi, dan lokasi pengambilan',
      gradient: 'from-[#007EFF] to-[#0063FF]'
    },
    {
      icon: <FiMapPin className="text-3xl" />,
      title: 'Berbasis Lokasi',
      description: 'Platform donatur dengan penerima untuk saling terhubung secara langsung',
      gradient: 'from-[#00A6FF] to-[#007EFF]'
    },
    {
      icon: <FiMessageSquare className="text-3xl" />,
      title: 'Komunikasi Langsung',
      description: 'Fitur chat untuk koordinasi pengambilan atau pengiriman barang',
      gradient: 'from-[#0063FF] to-[#004CB3]'
    },
    {
      icon: <FiTrendingUp className="text-3xl" />,
      title: 'Tracking Donasi',
      description: 'Pantau status donasi dari permintaan hingga barang diterima',
      gradient: 'from-[#004CB3] to-[#00306C]'
    },
    {
      icon: <FiShield className="text-3xl" />,
      title: 'Verifikasi Pengguna',
      description: 'Sistem verifikasi untuk memastikan keamanan dan kepercayaan',
      gradient: 'from-[#00306C] to-[#007EFF]'
    },
    {
      icon: <FiCheckCircle className="text-3xl" />,
      title: 'Transparan',
      description: 'Riwayat lengkap semua aktivitas donasi dapat dipantau',
      gradient: 'from-[#007EFF] to-[#00A6FF]'
    },
  ];

  const goals = [
    'Memfasilitasi proses donasi dengan sistem yang terorganisir',
    'Menghubungkan donatur dan penerima secara langsung',
    'Meningkatkan transparansi dan kepercayaan dalam proses donasi',
    'Mendorong kesadaran sosial untuk berpartisipasi dalam donasi',
    'Mendukung Tujuan Pembangunan Berkelanjutan (SDGs)'
  ];

  const userRoles = [
    {
      role: 'Donatur',
      description: 'Individu atau komunitas yang ingin menyalurkan barang bekas layak pakai',
      responsibilities: [
        'Membuat posting donasi dengan foto dan deskripsi',
        'Meninjau dan menanggapi permintaan dari penerima',
        'Memastikan barang dikirim sesuai kesepakatan',
        'Memantau status donasi'
      ],
      icon: '🎁',
      color: 'from-[#007EFF] to-[#0063FF]'
    },
    {
      role: 'Penerima',
      description: 'Individu, panti asuhan, atau komunitas yang membutuhkan bantuan barang',
      responsibilities: [
        'Mencari barang donasi sesuai kebutuhan',
        'Mengajukan permintaan donasi',
        'Konfirmasi penerimaan barang',
        'Menjaga komunikasi dengan donatur'
      ],
      icon: '🤝',
      color: 'from-[#00A6FF] to-[#007EFF]'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E9FAFF] to-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-[#007EFF]/20 to-[#00A6FF]/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#0063FF]/20 to-[#00306C]/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-block bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-4">
              <span className="text-sm font-bold text-[#007EFF]">TENTANG KAMI</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-[#00306C] leading-tight">
              Menghubungkan Kebaikan Melalui <span className="bg-gradient-to-r from-[#007EFF] to-[#00A6FF] bg-clip-text text-transparent">Teknologi</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Donasiku adalah platform donasi barang bekas layak pakai yang memfasilitasi proses penyaluran dari donatur kepada penerima secara efisien, aman, dan transparan.
            </p>
          </div>
        </div>
      </section>

      {/* Latar Belakang */}
      <section className="py-20 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-[#00306C]">Latar Belakang</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Dalam era digital saat ini, teknologi web memiliki peran penting dalam membantu masyarakat menyelesaikan berbagai permasalahan sosial, termasuk dalam kegiatan donasi.
              </p>
              <p>
                Banyak individu maupun komunitas memiliki barang bekas yang masih layak pakai, namun sering kali kesulitan menemukan pihak yang membutuhkan secara tepat dan efisien. Di sisi lain, terdapat lembaga sosial, panti asuhan, serta komunitas yang membutuhkan bantuan tersebut, tetapi terkendala akses informasi dan saluran distribusi.
              </p>
              <p>
                Melihat permasalahan tersebut, dikembangkanlah <span className="font-bold text-[#007EFF]">Donasiku</span>, sebuah platform berbasis web yang berfungsi untuk menghubungkan donatur dengan penerima secara langsung, cepat, dan transparan.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-[#007EFF] to-[#0063FF] rounded-3xl p-12 text-white shadow-2xl">
              <h3 className="text-3xl font-bold mb-6">Dampak Sosial</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <FiCheckCircle className="text-2xl flex-shrink-0 mt-1" />
                  <span className="text-lg">Pengentasan kemiskinan dengan akses barang gratis</span>
                </li>
                <li className="flex items-start space-x-3">
                  <FiCheckCircle className="text-2xl flex-shrink-0 mt-1" />
                  <span className="text-lg">Pengurangan kesenjangan sosial</span>
                </li>
                <li className="flex items-start space-x-3">
                  <FiCheckCircle className="text-2xl flex-shrink-0 mt-1" />
                  <span className="text-lg">Mendukung konsumsi berkelanjutan</span>
                </li>
                <li className="flex items-start space-x-3">
                  <FiCheckCircle className="text-2xl flex-shrink-0 mt-1" />
                  <span className="text-lg">Mengurangi limbah barang bekas</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tujuan */}
      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#00306C] mb-4">Tujuan Kami</h2>
            <p className="text-xl text-gray-600">Misi yang ingin kami capai melalui platform ini</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.map((goal, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-100 hover:border-[#007EFF] transition-all hover:scale-105">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#007EFF] to-[#0063FF] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{goal}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fitur Utama */}
      <section className="py-20 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#00306C] mb-4">Fitur Utama</h2>
          <p className="text-xl text-gray-600">Kemudahan yang kami tawarkan untuk Anda</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity rounded-2xl`}></div>
              <div className="relative z-10">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.gradient} text-white mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[#00306C] mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Role Pengguna */}
      <section className="py-20 bg-gradient-to-br from-[#00306C] to-[#0063FF] text-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Peran Pengguna</h2>
            <p className="text-xl text-white/80">Dua role utama dalam platform Donasiku</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {userRoles.map((user, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all">
                <div className="text-6xl mb-4">{user.icon}</div>
                <h3 className="text-3xl font-bold mb-3">{user.role}</h3>
                <p className="text-white/80 mb-6 text-lg">{user.description}</p>
                <h4 className="font-bold text-lg mb-4">Tanggung Jawab:</h4>
                <ul className="space-y-3">
                  {user.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <FiCheckCircle className="text-xl flex-shrink-0 mt-0.5" />
                      <span className="text-white/90">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="bg-gradient-to-r from-[#007EFF] to-[#0063FF] rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Siap Bergabung dengan Kami?</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Mulai perjalanan berbagi kebaikan Anda bersama ribuan pengguna lainnya
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/register" className="px-10 py-4 bg-white text-[#007EFF] font-bold rounded-full hover:bg-gray-100 transition-all hover:scale-105 shadow-xl">
              Daftar Sekarang
            </a>
            <a href="/login" className="px-10 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-full border-2 border-white hover:bg-white/20 transition-all">
              Login
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;