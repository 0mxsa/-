// src/components/Layout/Sidebar.tsx
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Map, CalendarDays, BrainCircuit, Settings, Search } from 'lucide-react';
import { cn } from '../Shared/Utils';

export const Sidebar = () => {
  const links = [
    { to: '/', icon: Map, label: 'الخريطة' },
    { to: '/dashboard', icon: LayoutDashboard, label: 'لوحة التحكم' },
    { to: '/timeline', icon: CalendarDays, label: 'الخط الزمني' },
  ];

  return (
    <div className="h-screen w-20 flex flex-col items-center py-8 glass-panel z-50 relative border-l border-white/5 border-r-0 rounded-l-none">
      <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center mb-8 shadow-lg shadow-primary-500/30">
        <BrainCircuit size={28} className="text-white" />
      </div>

      <div className="flex flex-col gap-6 w-full items-center flex-1">
        <button className="w-10 h-10 rounded-lg hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors mb-4">
          <Search size={22} />
        </button>

        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => cn(
              "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
              isActive ? "bg-white/10 text-primary-400 shadow-inner" : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
            )}
          >
            <link.icon size={24} />
          </NavLink>
        ))}
      </div>

      <button className="w-10 h-10 rounded-lg hover:bg-white/10 flex items-center justify-center text-gray-500 hover:text-white transition-colors mt-auto">
        <Settings size={22} />
      </button>
    </div>
  );
};
