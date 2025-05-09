import { useState } from 'react';
import { Link } from 'wouter';
import { useTheme } from '../../hooks/use-theme';

interface NavbarProps {
  toggleSidebar: () => void;
  showAuthModal: () => void;
  isAuthenticated: boolean;
  userData?: {
    name: string;
    avatar: string;
  };
}

export default function Navbar({ toggleSidebar, showAuthModal, isAuthenticated, userData }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-30">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              id="sidebar-toggle" 
              className="lg:hidden text-slate-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400"
              onClick={toggleSidebar}
            >
              <i className="ri-menu-line text-2xl"></i>
            </button>
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <span className="text-xl font-bold text-primary-600 dark:text-primary-400">SocialPulse</span>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Search metrics, platforms..." 
                className="w-full py-2 pl-10 pr-4 text-sm bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <i className="ri-search-line absolute left-3 top-2.5 text-slate-400"></i>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              id="theme-toggle" 
              onClick={toggleTheme}
              className="p-2 text-slate-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <i className="ri-sun-line hidden dark:block text-xl"></i>
              <i className="ri-moon-line block dark:hidden text-xl"></i>
            </button>
            
            <div className="relative">
              <button 
                className="p-2 text-slate-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 relative"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              >
                <i className="ri-notification-3-line text-xl"></i>
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Notifications</p>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    <div className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">New follower spike</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Your Instagram account gained 250+ followers today</p>
                    </div>
                    <div className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">Weekly report ready</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Your analytics report for last week is ready to view</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700"></div>
            
            {isAuthenticated && userData ? (
              <div className="relative">
                <button 
                  className="flex items-center space-x-2 hover:text-primary-600 dark:hover:text-primary-400"
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                >
                  <img 
                    src={userData.avatar} 
                    alt="User" 
                    className="h-8 w-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                  />
                  <span className="hidden md:block text-sm font-medium">{userData.name}</span>
                  <i className="ri-arrow-down-s-line hidden md:block"></i>
                </button>
                
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <a href="#" className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700">Your Profile</a>
                    <a href="#" className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700">Settings</a>
                    <a href="#" className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700">Sign out</a>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={showAuthModal}
                className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm"
              >
                <i className="ri-login-box-line"></i>
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
