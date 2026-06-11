import React, { useState } from 'react';
import { Menu, Trophy, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import SyllabusView from './components/SyllabusView';
import RevisionView from './components/RevisionView';
import AuthView from './components/AuthView';
import { useSyllabus } from './context/SyllabusContext';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { stats, isAuthenticated } = useSyllabus();

  if (!isAuthenticated) {
    return <AuthView />;
  }

  const renderCurrentView = () => {
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

              {/* Breadcrumb / Section Title */}
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500">
                <span>PrepGate</span>
                <span>/</span>
                <span className="text-zinc-200">{getBreadcrumbName()}</span>
              </div>
            </div>

            {/* Quick stats / Progress Trophy */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-400 bg-zinc-900 border border-zinc-850 px-3 py-1.5 rounded-lg font-medium">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                <span>{stats.completedTopics} of {stats.totalTopics} Completed</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1.5 rounded-lg shadow-md shadow-violet-500/20">
                <Trophy className="h-4 w-4" />
                <span>{stats.overallProgress}% Weighted Prep</span>
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
    </div>
  );
}

export default App;
