import { FiBell, FiMenu } from 'react-icons/fi';
import { getAuthData } from '../../utils/localStorage';
import { useState } from 'react';

const DashboardTopbar = ({ toggleSidebar }) => {
  const user = getAuthData();
  const [notifications] = useState(3); // Dummy notification count

  return (
    <nav className="fixed top-0 right-0 left-0 lg:left-64 h-20 bg-white border-b border-gray-200 shadow-sm z-30 transition-all">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
        >
          <FiMenu className="text-2xl text-gray-700" />
        </button>

        {/* Spacer for desktop */}
        <div className="flex-1 lg:hidden"></div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Notification Bell */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <FiBell className="text-2xl text-gray-700" />
            {notifications > 0 && (
              <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>

          {/* User Info */}
          <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
            <div className="w-10 h-10 bg-gradient-to-br from-[#007EFF] to-[#0063FF] rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">{user?.name?.charAt(0)}</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-bold text-gray-900">{user?.name}</div>
              <div className="text-xs text-gray-600">Donatur</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardTopbar;