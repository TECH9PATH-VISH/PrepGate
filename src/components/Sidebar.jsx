import React from 'react';
import { LayoutDashboard, BookOpen, AlertCircle, GraduationCap, X } from 'lucide-react';
import { useSyllabus } from '../context/SyllabusContext';

const Sidebar = ({ currentView, setCurrentView, mobileOpen, setMobileOpen, onOpenAuth }) => {
  const { revisionTopics, user, logout, isAuthenticated } = useSyllabus();
  const revisionCount = revisionTopics.length;

  const navItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'syllabus', name: 'Syllabus Matrix', icon: BookOpen },
    { id: 'revision', name: 'Revision Alerts', icon: AlertCircle, badge: revisionCount },
  ];

  const handleNavClick = (viewId) => {
    setCurrentView(viewId);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-64 flex-col border-r border-zinc-800 bg-zinc-950 px-5 py-6 transition-transform duration-300 md:static md:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">PrepGate</span>
              <p className="text-[10px] text-zinc-500 font-medium tracking-wider uppercase">GATE CSE Tracker</p>
            </div>
          </div>
          {/* Close button on mobile */}
          <button 
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-900 hover:text-white md:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 group relative ${
                  isActive
                    ? 'bg-zinc-900 text-violet-400'
                    : 'text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-5 w-5 transition-colors duration-200 ${
                    isActive ? 'text-violet-400' : 'text-zinc-400 group-hover:text-zinc-200'
                  }`} />
                  <span>{item.name}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-bold ${
                    isActive ? 'bg-violet-500/20 text-violet-300' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  }`}>
                    {item.badge}
                  </span>
                )}
                {/* Active Indicator Line */}
                {isActive && (
                  <div className="absolute left-0 top-3 bottom-3 w-1 rounded-r-md bg-gradient-to-y from-violet-500 to-indigo-500" />
                )}
              </button>
            );
          })}
        </nav>

        {/* User Profile & Sign Out / In */}
        <div className="mt-auto border-t border-zinc-900 pt-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
              {/* Fallback avatar initials */}
              <div className="flex h-full w-full items-center justify-center font-semibold text-sm text-zinc-300 bg-gradient-to-br from-zinc-800 to-zinc-900 uppercase">
                {isAuthenticated && user ? user.email.slice(0, 2) : 'GT'}
              </div>
              <span className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-zinc-950 ${
                isAuthenticated ? 'bg-emerald-500' : 'bg-amber-500'
              }`} />
            </div>
            <div className="flex-1 overflow-hidden">
              <h4 className="truncate text-sm font-medium text-zinc-200">
                {isAuthenticated ? 'GATE Aspirant' : 'Guest User'}
              </h4>
              <p className="truncate text-xs text-zinc-500">
                {isAuthenticated && user ? user.email : 'guest@prepgate.io'}
              </p>
            </div>
          </div>
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-zinc-850 bg-zinc-900/50 hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-zinc-850 bg-zinc-900/50 hover:bg-emerald-500/10 hover:border-emerald-500/20 hover:text-emerald-400 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer"
            >
              Sign In
            </button>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
