import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Impor Layout
import Layout from './components/layout/Layout.jsx';
import DashboardLayout from './components/layout/DashboardLayout.jsx';

// Impor Halaman Publik
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import NotFound from './pages/NotFound.jsx';

// Impor Fitur Auth
import Login from './features/auth/Login.jsx';
import Register from './features/auth/Register.jsx';

// Impor Fitur Donatur
import DashboardDonatur from './features/donatur/DashboardDonatur.jsx';
import FormDonasi from './features/donatur/FormDonasi.jsx';
import EditDonasi from './features/donatur/EditDonasi.jsx';
import DaftarDonasi from './features/donatur/DaftarDonasi.jsx';
import KelolaDonasi from './features/donatur/KelolaDonasi.jsx';
import ChatDonatur from './features/donatur/ChatDonatur.jsx';



// Impor Fitur Penerima
import DashboardPenerima from './features/penerima/DashboardPenerima.jsx';
import DetailDonasi from './features/penerima/DetailDonasi.jsx';
import PermintaanSaya from './features/penerima/PermintaanSaya.jsx';
import Profile from "./features/penerima/Profile.jsx";

// Impor Fitur Bersama (Shared)
import Riwayat from './features/riwayat/Riwayat.jsx';

// Impor Utilitas
import { isAuthenticated, getUserRole } from './utils/localStorage.js';

// Komponen Rute Terlindungi
const ProtectedRoute = ({ children, requiredRole }) => {
  if (!isAuthenticated()) {
    // Jika belum login
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && getUserRole() !== requiredRole) {
    // Jika role tidak sesuai
    return <Navigate to="/" replace />;
  }

  // Jika lolos validasi
  return children;
};

// Komponen App Utama
function App() {
  return (
    <Router>
      <Routes>
        {/* ===== Rute Publik (Layout Utama) ===== */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* ===== Rute Dashboard (Layout Dashboard) ===== */}
        <Route path="/" element={<DashboardLayout />}>

          {/* ===== Rute Donatur ===== */}
          <Route
            path="dashboard-donatur"
            element={
              <ProtectedRoute requiredRole="donatur">
                <DashboardDonatur />
              </ProtectedRoute>
            }
          />
          <Route
            path="donasi/buat"
            element={
              <ProtectedRoute requiredRole="donatur">
                <FormDonasi />
              </ProtectedRoute>
            }
          />
          <Route
            path="donasi/edit/:id"
            element={
              <ProtectedRoute requiredRole="donatur">
                <EditDonasi />
              </ProtectedRoute>
            }
          />

          <Route
            path="donatur/permintaan"
            element={
              <ProtectedRoute requiredRole="donatur">
                <KelolaDonasi />
              </ProtectedRoute>
            }
          />

          <Route
            path="donatur/chat"
            element={
              <ProtectedRoute requiredRole="donatur">
                <ChatDonatur />
              </ProtectedRoute>
            }
          />

          {/* Route: Donasi Saya (Daftar Donasi) */}
          <Route
            path="donatur/donasi-saya"
            element={
              <ProtectedRoute requiredRole="donatur">
                <DaftarDonasi />
              </ProtectedRoute>
            }
          />

         

          {/* ===== Rute Penerima ===== */}
          <Route
            path="dashboard-penerima"
            element={
              <ProtectedRoute requiredRole="penerima">
                <DashboardPenerima />
              </ProtectedRoute>
            }
          />

          <Route
            path="donasi/detail/:id"
            element={
              <ProtectedRoute requiredRole="penerima">
                <DetailDonasi />
              </ProtectedRoute>
            }
          />
          <Route
          path="penerima/profil"
          element={
            <ProtectedRoute requiredRole="penerima">
              <Profile />
            </ProtectedRoute>
          }
          />  
          {/* ===== FIX: Rute untuk Permintaan Saya ===== */}
          <Route
            path="penerima/permintaan-saya"
            element={
              <ProtectedRoute requiredRole="penerima">
                <PermintaanSaya />
              </ProtectedRoute>
            }
          />
          {/* Tambahan agar navigasi dengan ID tidak error */}
          <Route
            path="penerima/permintaan-saya/:id"
            element={
              <ProtectedRoute requiredRole="penerima">
                <PermintaanSaya />
              </ProtectedRoute>
            }
          />

          {/* ===== Rute Riwayat ===== */}
          <Route
            path="donatur/riwayat"
            element={
              <ProtectedRoute requiredRole="donatur">
                <Riwayat />
              </ProtectedRoute>
            }
          />
          <Route
            path="penerima/riwayat"
            element={
              <ProtectedRoute requiredRole="penerima">
                <Riwayat />
              </ProtectedRoute>
            }
          />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
