import React from 'react';
import { Home, Search, ClipboardList, MessageSquare, User } from 'lucide-react';

export default function MobileBottomNav({
  activeTab,
  setActiveTab,
  userRole,
  unreadCount = 1
}) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'find_work', label: 'Find work', icon: Search },
    {
      id: userRole === 'customer' ? 'customer_dashboard' : 'worker_dashboard',
      label: userRole === 'customer' ? 'My jobs' : 'My work',
      icon: ClipboardList
    },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: unreadCount },
    { id: 'settings_help', label: 'Profile', icon: User }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-2 py-2 flex items-center justify-around shadow-lg">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          activeTab === item.id ||
          (item.id === 'customer_dashboard' &&
            (activeTab === 'compare_quotes' || activeTab === 'manage_hired_job')) ||
          (item.id === 'find_work' && (activeTab === 'job_details' || activeTab === 'send_quote'));

        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center flex-1 py-1 relative ${
              isActive ? 'text-[#008272]' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div className="relative">
              <Icon className="w-5 h-5" />
              {item.badge && item.badge > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                  {item.badge}
                </span>
              )}
            </div>
            <span className={`text-[10px] mt-1 ${isActive ? 'font-bold' : 'font-medium'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
