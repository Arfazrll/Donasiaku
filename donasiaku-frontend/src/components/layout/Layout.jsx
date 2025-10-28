import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  const location = useLocation();
  
  // Pages yang menggunakan navbar khusus (dashboard pages)
  const dashboardPages = [
    '/dashboard-donatur',
    '/donasi/buat',
    '/donasi/edit'
  ];
  
  const isDashboardPage = dashboardPages.some(page => 
    location.pathname.startsWith(page)
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hanya tampilkan Navbar default untuk non-dashboard pages */}
      {!isDashboardPage && <Navbar />}
      
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;