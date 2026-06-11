import React from 'react';
import { Trophy, BookOpen, CheckCircle, Calendar, ArrowRight, AlertTriangle, HelpCircle, CheckSquare, Sparkles } from 'lucide-react';
import { useSyllabus } from '../context/SyllabusContext';

const DashboardView = ({ setCurrentView, setSelectedSubjectId }) => {
  const { stats, revisionTopics } = useSyllabus();

  const handleViewSubject = (subjectId) => {
    setSelectedSubjectId(subjectId);
    setCurrentView('syllabus');
  };

  // Mock motivational quote based on progress
  const getMotivationalQuote = () => {
    const p = stats.overallProgress;
    if (p === 0) return "The journey of a thousand miles begins with a single step. Start your GATE prep today!";
    if (p < 25) return "Great start! Consistent daily tracking is the secret to cracking GATE CSE.";
    if (p < 50) return "You're making steady progress! Keep revising chapters and solving PYQs.";
    if (p < 75) return "Over halfway there! Focus on your 'Revision Needed' areas to solidify concepts.";
    return "Excellent progress! You are in the final stretch. Keep simulating mock tests!";
  };

  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Dashboard</h1>
          <p className="text-sm text-zinc-400">Welcome back. Track your GATE CSE preparation roadmap.</p>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-2.5 text-xs text-zinc-300 font-medium w-fit">
          <Calendar className="h-4 w-4 text-violet-400" />
          <span>{new Date().toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
        </div>
      </div>

      {/* Hero Stats Card */}
      <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-6 md:p-8 shadow-xl">
        {/* Glow effect */}
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-600/15 blur-3xl" />
        <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-indigo-600/10 blur-3xl" />

        <div className="relative grid gap-6 md:grid-cols-3 md:items-center">
          {/* Main Progress circular or large percentage */}
          <div className="flex flex-col items-center justify-center border-b border-zinc-900 pb-6 md:border-b-0 md:border-r md:pb-0 md:pr-6">
            <div className="relative flex h-36 w-36 items-center justify-center">
              {/* Circular progress track */}
              <svg className="absolute h-full w-full -rotate-90">
                <circle
                  cx="72"
                  cy="72"
                  r="64"
                  className="stroke-zinc-900"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="72"
                  cy="72"
                  r="64"
                  className="stroke-violet-500 transition-all duration-500 ease-out"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 64}
                  strokeDasharray-base={2 * Math.PI * 64}
                  strokeDashoffset={2 * Math.PI * 64 * (1 - stats.overallProgress / 100)}
                  strokeLinecap="round"
                />
              </svg>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-extrabold text-white tracking-tight">{stats.overallProgress}%</span>
                <span className="text-[10px] uppercase text-zinc-500 font-semibold tracking-wider">Weighted Prep</span>
              </div>
            </div>
          </div>

          {/* Progress Metrics list */}
          <div className="space-y-4 md:col-span-2 md:pl-6">
            <div className="flex items-center gap-2 text-violet-400 font-semibold text-sm">
              <Sparkles className="h-4 w-4" />
              <span>{getMotivationalQuote()}</span>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-xl border border-zinc-900 bg-zinc-900/40 p-3">
                <p className="text-xs text-zinc-500 font-medium">Completed</p>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-xl font-bold text-emerald-400">{stats.completedTopics}</span>
                  <span className="text-xs text-zinc-600">/ {stats.totalTopics}</span>
                </div>
              </div>

              <div className="rounded-xl border border-zinc-900 bg-zinc-900/40 p-3">
                <p className="text-xs text-zinc-500 font-medium">PYQs Solved</p>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-xl font-bold text-sky-400">{stats.totalPyqSolved}</span>
                  <span className="text-xs text-zinc-600">/ {stats.totalTopics}</span>
                </div>
              </div>

              <div className="rounded-xl border border-zinc-900 bg-zinc-900/40 p-3">
                <p className="text-xs text-zinc-500 font-medium">In Progress</p>
                <div className="flex items-baseline mt-1">
                  <span className="text-xl font-bold text-amber-400">{stats.inProgressTopics}</span>
                </div>
              </div>

              <div className="rounded-xl border border-zinc-900 bg-zinc-900/40 p-3">
                <p className="text-xs text-zinc-500 font-medium">Revision Needed</p>
                <div className="flex items-baseline mt-1">
                  <span className="text-xl font-bold text-rose-400">{stats.revisionNeededTopics}</span>
                </div>
              </div>
            </div>

            {/* Overall progress bar */}
            <div>
              <div className="flex justify-between text-xs text-zinc-400 mb-1.5 font-medium">
                <span>Core Complete Ratio (Strict Completed)</span>
                <span>{stats.overallCompletedPercent}%</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-zinc-900 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500 ease-out"
                  style={{ width: `${stats.overallCompletedPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subject list and Revision list Split */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Subject-wise Progress */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-violet-400" />
            <h2 className="text-lg font-bold text-white">Subject Progress</h2>
          </div>

          <div className="space-y-3">
            {Object.entries(stats.subjectStats).map(([id, subject]) => (
              <div
                key={id}
                className="group relative rounded-xl border border-zinc-800 bg-zinc-950 p-4 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/20"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-zinc-200 group-hover:text-violet-400 transition-colors">{subject.name}</h3>
                    <p className="text-xs text-zinc-500">{subject.completed} of {subject.total} Topics Fully Done</p>
                  </div>
                  <span className="text-sm font-bold text-zinc-300 bg-zinc-900 px-2.5 py-1 rounded-lg border border-zinc-850">
                    {subject.progress}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="h-2 w-full rounded-full bg-zinc-900 overflow-hidden mb-3">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 transition-all duration-500"
                    style={{ width: `${subject.progress}%` }}
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => handleViewSubject(id)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors"
                  >
                    <span>Open Matrix</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Revision Alerts */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-rose-400" />
            <h2 className="text-lg font-bold text-white">Pending Revision Alerts</h2>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 h-[330px] overflow-y-auto space-y-3">
            {revisionTopics.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 mb-3 border border-emerald-500/20">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-zinc-200 text-sm">All Clear!</h3>
                <p className="text-xs text-zinc-500 mt-1 max-w-[240px]">
                  No topics are currently marked as "Revision Needed". Nice job!
                </p>
              </div>
            ) : (
              revisionTopics.slice(0, 4).map((topic) => (
                <div
                  key={topic.id}
                  className="rounded-lg border border-zinc-900 bg-zinc-900/30 p-3 hover:border-zinc-800 transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/20">
                        Revision Needed
                      </span>
                      <h4 className="font-semibold text-zinc-200 text-sm mt-1.5">{topic.name}</h4>
                      <p className="text-[11px] text-zinc-500 mt-0.5">
                        {topic.subjectName} &bull; {topic.chapterName}
                      </p>
                    </div>
                  </div>
                  {topic.notes && (
                    <div className="mt-2 text-xs text-zinc-400 bg-zinc-950 p-2 rounded border border-zinc-900 italic font-mono truncate">
                      "{topic.notes}"
                    </div>
                  )}
                </div>
              ))
            )}

            {revisionTopics.length > 4 && (
              <button
                onClick={() => setCurrentView('revision')}
                className="w-full text-center py-2 text-xs font-semibold text-zinc-400 hover:text-zinc-200 transition-colors border-t border-zinc-900 pt-3"
              >
                View all {revisionTopics.length} revision alerts
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
