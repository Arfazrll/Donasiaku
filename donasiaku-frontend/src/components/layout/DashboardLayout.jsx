import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import DashboardSidebar from './DashboardSidebar';
import DashboardTopbar from './DashboardTopbar';
import DashboardFooter from './DashboardFooter';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Sidebar */}
      <DashboardSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        {/* Top Navbar */}
        <DashboardTopbar toggleSidebar={toggleSidebar} />

        {/* Content */}
        <main className="flex-grow mt-20 p-6">
          <Outlet />
        </main>

        {/* Footer */}
        <DashboardFooter />
      </div>
    </div>
  );
};

export default DashboardLayout;