import React, { useState } from 'react';
import { Menu, Trophy, CheckCircle, AlertCircle, Sparkles, Settings, UserCircle, LogOut, LogIn, UserPlus, X, CloudUpload, Check, Loader2 } from 'lucide-react';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import SyllabusView from './components/SyllabusView';
import RevisionView from './components/RevisionView';
import AuthView from './components/AuthView';
import { useSyllabus } from './context/SyllabusContext';

// Sleek dark-mode skeleton loader matching the dashboard layout
const DashboardSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-zinc-900 rounded-lg" />
          <div className="h-4 w-72 bg-zinc-900/50 rounded-md" />
        </div>
        <div className="flex items-center gap-3">
          <div className="h-10 w-28 bg-zinc-900 rounded-xl" />
          <div className="h-10 w-40 bg-zinc-900 rounded-xl" />
        </div>
      </div>

      {/* Hero Stats Card Skeleton */}
      <div className="relative overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950 p-6 md:p-8 shadow-xl">
        <div className="grid gap-6 md:grid-cols-3 md:items-center">
          {/* Circular Progress Skeleton */}
          <div className="flex flex-col items-center justify-center border-b border-zinc-900 pb-6 md:border-b-0 md:border-r md:pb-0 md:pr-6">
            <div className="relative flex h-36 w-36 items-center justify-center">
              <div className="absolute h-full w-full rounded-full border-8 border-zinc-900" />
              <div className="flex flex-col items-center gap-1">
                <div className="h-6 w-12 bg-zinc-900 rounded" />
                <div className="h-3 w-16 bg-zinc-900/60 rounded" />
              </div>
            </div>
          </div>

          {/* Progress Metrics Skeleton */}
          <div className="space-y-4 md:col-span-2 md:pl-6">
            <div className="h-4 w-2/3 bg-zinc-900 rounded" />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="rounded-xl border border-zinc-900 bg-zinc-900/20 p-3 h-16 flex flex-col justify-between">
                  <div className="h-3 w-12 bg-zinc-900 rounded" />
                  <div className="h-5 w-8 bg-zinc-900 rounded mt-2" />
                </div>
              ))}
            </div>
            <div>
              <div className="flex justify-between text-xs text-zinc-500 mb-1.5 font-medium">
                <div className="h-3 w-40 bg-zinc-900 rounded" />
                <div className="h-3 w-8 bg-zinc-900 rounded" />
              </div>
              <div className="h-2.5 w-full rounded-full bg-zinc-900 overflow-hidden" />
            </div>
          </div>
        </div>
      </div>

      {/* Lists Split Skeleton */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Subject-wise Progress Skeleton */}
        <div className="space-y-4">
          <div className="h-6 w-36 bg-zinc-900 rounded" />
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-xl border border-zinc-900 bg-zinc-950 p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="space-y-2 w-2/3">
                    <div className="h-4 bg-zinc-900 rounded w-4/5" />
                    <div className="h-3 bg-zinc-900/60 rounded w-1/3" />
                  </div>
                  <div className="h-6 w-10 bg-zinc-900 rounded-lg" />
                </div>
                <div className="h-2 w-full bg-zinc-900 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Revision alerts skeleton */}
        <div className="space-y-4">
          <div className="h-6 w-36 bg-zinc-900 rounded" />
          <div className="rounded-xl border border-zinc-900 bg-zinc-950 p-4 h-[330px] space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-lg border border-zinc-900 bg-zinc-900/20 p-3 space-y-2">
                <div className="h-3 w-16 bg-zinc-900 rounded" />
                <div className="h-4 w-3/4 bg-zinc-900 rounded mt-2" />
                <div className="h-3 w-1/2 bg-zinc-900/60 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('login');
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [saveState, setSaveState] = useState('default'); // 'default', 'loading', 'success'

  const { stats, isAuthenticated, user, logout, saveAllProgress, isLoading } = useSyllabus();

  const handleSaveProgress = async () => {
    if (!isAuthenticated) {
      setAuthModalTab('login');
      setAuthModalOpen(true);
      return;
    }
    if (saveState !== 'default') return;
    setSaveState('loading');
    try {
      await saveAllProgress();
      setSaveState('success');
      setTimeout(() => {
        setSaveState('default');
      }, 2000);
    } catch (error) {
      console.error("Failed to save progress:", error);
      setSaveState('default');
    }
  };

  const getUserFirstName = () => {
    if (!user || !user.email) return 'Vishal';
    const namePart = user.email.split('@')[0];
    const firstSegment = namePart.split(/[._-]/)[0];
    return firstSegment.charAt(0).toUpperCase() + firstSegment.slice(1);
  };

  const renderCurrentView = () => {
    if (isLoading) {
      return <DashboardSkeleton />;
    }
    switch (currentView) {
      case 'dashboard':
        return (
          <DashboardView 
            setCurrentView={setCurrentView} 
            setSelectedSubjectId={setSelectedSubjectId} 
          />
        );
      case 'syllabus':
        return (
          <SyllabusView 
            selectedSubjectId={selectedSubjectId} 
            setSelectedSubjectId={setSelectedSubjectId} 
          />
        );
      case 'revision':
        return <RevisionView />;
      default:
        return (
          <DashboardView 
            setCurrentView={setCurrentView} 
            setSelectedSubjectId={setSelectedSubjectId} 
          />
        );
    }
  };

  const getBreadcrumbName = () => {
    switch (currentView) {
      case 'dashboard': return 'Dashboard';
      case 'syllabus': return 'Syllabus Matrix';
      case 'revision': return 'Revision Alerts';
      default: return 'Dashboard';
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100 antialiased font-sans">
      {/* Sidebar navigation */}
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
        onOpenAuth={() => {
          setAuthModalTab('login');
          setAuthModalOpen(true);
        }}
      />

      {/* Main content container */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Navbar Header */}
        <header className="sticky top-0 z-30 flex flex-col border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              {/* Menu Toggle for Mobile */}
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white md:hidden focus:outline-none"
              >
                <Menu className="h-5 w-5" />
              </button>

              {/* Breadcrumb & Greeting */}
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
                  <span>PrepGate</span>
                  <span>/</span>
                  <span className="text-zinc-400">{getBreadcrumbName()}</span>
                </div>
                <h2 className="text-sm font-semibold text-zinc-200">
                  {isAuthenticated ? `Welcome, ${getUserFirstName()}` : 'Welcome to PrepGate'}
                </h2>
              </div>
            </div>

            {/* Quick stats / Progress Trophy & Settings Dropdown */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-400 bg-zinc-900 border border-zinc-850 px-3 py-1.5 rounded-lg font-medium">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                <span>{stats.completedTopics} of {stats.totalTopics} Completed</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1.5 rounded-lg shadow-md shadow-violet-500/20">
                <Trophy className="h-4 w-4" />
                <span>{stats.overallProgress}% Weighted Prep</span>
              </div>

              {/* Save Progress Button */}
              <button
                onClick={handleSaveProgress}
                disabled={saveState === 'loading'}
                className={`whitespace-nowrap flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all duration-300 border focus:outline-none ${
                  saveState === 'success'
                    ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                    : saveState === 'loading'
                    ? 'bg-zinc-900 border-zinc-800 text-zinc-500 cursor-not-allowed'
                    : 'bg-cyan-500/15 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/25 hover:border-cyan-500/50 shadow-[0_0_12px_rgba(6,182,212,0.15)] hover:shadow-[0_0_18px_rgba(6,182,212,0.25)]'
                }`}
              >
                {saveState === 'loading' ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-zinc-500" />
                ) : saveState === 'success' ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <CloudUpload className="h-3.5 w-3.5 text-cyan-400" />
                )}
                <span>
                  {saveState === 'loading'
                    ? 'Saving...'
                    : saveState === 'success'
                    ? 'Saved!'
                    : 'Save Progress'}
                </span>
              </button>

              {/* Settings Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white border border-zinc-850 bg-zinc-950 transition-all cursor-pointer focus:outline-none"
                >
                  <Settings className="h-4 w-4" />
                </button>

                {dropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                    <div className="absolute right-0 mt-2 w-48 rounded-xl border border-zinc-800 bg-zinc-900/95 backdrop-blur-xl p-1 shadow-2xl z-50 animate-slideDown">
                      {isAuthenticated ? (
                        <>
                          <button
                            onClick={() => {
                              setDropdownOpen(false);
                              setProfileModalOpen(true);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer text-left"
                          >
                            <UserCircle className="h-4 w-4 text-violet-400" />
                            <span>View Profile</span>
                          </button>
                          <button
                            onClick={() => {
                              setDropdownOpen(false);
                              logout();
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer text-left"
                          >
                            <LogOut className="h-4 w-4" />
                            <span>Log Out</span>
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setDropdownOpen(false);
                              setAuthModalTab('login');
                              setAuthModalOpen(true);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer text-left"
                          >
                            <LogIn className="h-4 w-4 text-emerald-400" />
                            <span>Log In</span>
                          </button>
                          <button
                            onClick={() => {
                              setDropdownOpen(false);
                              setAuthModalTab('register');
                              setAuthModalOpen(true);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer text-left"
                          >
                            <UserPlus className="h-4 w-4 text-sky-400" />
                            <span>Sign Up</span>
                          </button>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Global Completion Percentage Bar */}
          <div className="mt-4 w-full">
            <div className="flex items-center justify-between text-[11px] font-bold text-zinc-500 mb-1">
              <span className="uppercase tracking-wider">Overall Syllabus Progress</span>
              <span className="text-zinc-300 font-mono">{stats.overallProgress}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-zinc-900 overflow-hidden relative">
              {/* Glow indicator */}
              <div 
                className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-500 transition-all duration-500 ease-out shadow-lg"
                style={{ width: `${stats.overallProgress}%` }}
              />
            </div>
          </div>
        </header>

        {/* View Content Area */}
        <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
          {renderCurrentView()}
        </main>

        {/* Footer */}
        <footer className="py-6 border-t border-zinc-900 text-center text-[11px] text-zinc-600 font-medium tracking-wide mt-auto">
          &copy; {new Date().getFullYear()} PrepGate Syllabus Tracker. Designed for GATE Computer Science & Information Technology.
        </footer>
      </div>

      {/* Auth Modal overlay */}
      {authModalOpen && (
        <AuthView 
          isModal={true} 
          initialTab={authModalTab} 
          onClose={() => setAuthModalOpen(false)} 
        />
      )}

      {/* Profile Modal overlay */}
      {profileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900/95 backdrop-blur-xl p-6 shadow-2xl relative">
            <button
              onClick={() => setProfileModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white rounded-lg p-1.5 hover:bg-zinc-800/60 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white text-xl font-bold mb-4 shadow-lg shadow-violet-500/10 uppercase">
                {user?.email?.slice(0, 2) || 'US'}
              </div>
              <h3 className="text-lg font-bold text-white mb-1">User Profile</h3>
              <div className="w-full bg-zinc-950/80 rounded-xl p-3 border border-zinc-850/60 text-left mt-3 space-y-2.5">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold block">Email Address</span>
                  <span className="text-zinc-200 text-sm font-medium">{user?.email || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold block">Status</span>
                  <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1.5 mt-0.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Authenticated via JWT
                  </span>
                </div>
              </div>
              <button
                onClick={() => setProfileModalOpen(false)}
                className="mt-6 w-full bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-900 text-white font-semibold rounded-xl py-2.5 text-sm transition-all cursor-pointer"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;


