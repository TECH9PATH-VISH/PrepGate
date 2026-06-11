import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronRight, CheckSquare, Square, MessageSquare, Save, X, Book, FileText, CheckCircle2, AlertTriangle, Play, HelpCircle } from 'lucide-react';
import { useSyllabus } from '../context/SyllabusContext';

const SyllabusView = ({ selectedSubjectId, setSelectedSubjectId }) => {
  const { syllabus, updateTopicStatus, toggleTopicPyq, updateTopicNotes, stats } = useSyllabus();
  
  // Accordion open/close state
  const [expandedSubjects, setExpandedSubjects] = useState({});
  const [expandedChapters, setExpandedChapters] = useState({});
  
  // Note Modal state
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [activeTopic, setActiveTopic] = useState(null); // { subjectId, chapterId, topicId, name, notes }
  const [noteText, setNoteText] = useState('');

  const subjectRefs = useRef({});

  // Auto-expand and scroll to selected subject if routed from Dashboard
  useEffect(() => {
    if (selectedSubjectId) {
      setExpandedSubjects(prev => ({ ...prev, [selectedSubjectId]: true }));
      
      // Auto expand all chapters under that subject too for immediate visibility
      const subject = syllabus.find(s => s.id === selectedSubjectId);
      if (subject) {
        const chapterExpands = {};
        subject.chapters.forEach(chap => {
          chapterExpands[chap.id] = true;
        });
        setExpandedChapters(prev => ({ ...prev, ...chapterExpands }));
      }

      // Scroll to element after render
      setTimeout(() => {
        const element = subjectRefs.current[selectedSubjectId];
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);

      // Reset selection so it doesn't trigger scroll again on other events
      setSelectedSubjectId(null);
    }
  }, [selectedSubjectId, syllabus, setSelectedSubjectId]);

  const toggleSubject = (subjId) => {
    setExpandedSubjects(prev => ({ ...prev, [subjId]: !prev[subjId] }));
  };

  const toggleChapter = (chapId) => {
    setExpandedChapters(prev => ({ ...prev, [chapId]: !prev[chapId] }));
  };

  const openNoteModal = (subjectId, chapterId, topic) => {
    setActiveTopic({
      subjectId,
      chapterId,
      topicId: topic.id,
      name: topic.name
    });
    setNoteText(topic.notes || '');
    setNoteModalOpen(true);
  };

  const saveNote = () => {
    if (activeTopic) {
      updateTopicNotes(activeTopic.subjectId, activeTopic.chapterId, activeTopic.topicId, noteText);
      setNoteModalOpen(false);
      setActiveTopic(null);
    }
  };

  // Status mapping to styles
  const statusConfig = {
    'Not Started': {
      bg: 'bg-zinc-800/80 text-zinc-400 border-zinc-700/50',
      hover: 'hover:bg-zinc-700/80',
      icon: HelpCircle,
      textColor: 'text-zinc-400'
    },
    'In Progress': {
      bg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      hover: 'hover:bg-amber-500/20',
      icon: Play,
      textColor: 'text-amber-400'
    },
    'Revision Needed': {
      bg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      hover: 'hover:bg-rose-500/20',
      icon: AlertTriangle,
      textColor: 'text-rose-400'
    },
    'Completed': {
      bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      hover: 'hover:bg-emerald-500/20',
      icon: CheckCircle2,
      textColor: 'text-emerald-400'
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Syllabus Matrix</h1>
        <p className="text-sm text-zinc-400">Drill down and track your completion status topic by topic.</p>
      </div>

      {/* Accordion Layout */}
      <div className="space-y-4">
        {syllabus.map((subject) => {
          const isSubjExpanded = expandedSubjects[subject.id];
          const subjStats = stats.subjectStats[subject.id];

          return (
            <div
              key={subject.id}
              ref={el => subjectRefs.current[subject.id] = el}
              className="rounded-2xl border border-zinc-850 bg-zinc-950 overflow-hidden shadow-lg transition-all"
            >
              {/* Subject Row (Tier 1) */}
              <div
                onClick={() => toggleSubject(subject.id)}
                className={`flex flex-col md:flex-row md:items-center justify-between p-5 cursor-pointer select-none transition-colors border-b ${
                  isSubjExpanded ? 'bg-zinc-900/40 border-zinc-800' : 'bg-zinc-950 border-transparent hover:bg-zinc-900/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-zinc-500">
                    {isSubjExpanded ? (
                      <ChevronDown className="h-5 w-5 text-violet-400" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-zinc-400" />
                    )}
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-violet-400">
                    <Book className="h-4 w-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white tracking-tight">{subject.name}</h2>
                    <p className="text-xs text-zinc-500 mt-0.5">{subjStats?.completed} of {subjStats?.total} Topics Completed</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-3 md:mt-0 md:w-1/3">
                  {/* Progress Indicator */}
                  <div className="flex-1">
                    <div className="flex justify-between text-xs text-zinc-400 mb-1 font-medium">
                      <span>Progress</span>
                      <span>{subjStats?.progress}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-zinc-900 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-500"
                        style={{ width: `${subjStats?.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Subject Content (Chapters) */}
              {isSubjExpanded && (
                <div className="p-4 space-y-3 bg-zinc-950/50">
                  {subject.chapters.length === 0 ? (
                    <div className="text-center py-6 text-zinc-600 text-sm">No chapters configured.</div>
                  ) : (
                    subject.chapters.map((chapter) => {
                      const isChapExpanded = expandedChapters[chapter.id];
                      
                      // Calculate chapter stats
                      const totalTopics = chapter.topics.length;
                      const completedTopics = chapter.topics.filter(t => t.status === 'Completed').length;
                      const weightedScore = chapter.topics.reduce((acc, t) => {
                        if (t.status === 'Completed') return acc + 1.0;
                        if (t.status === 'In Progress' || t.status === 'Revision Needed') return acc + 0.5;
                        return acc;
                      }, 0);
                      const chapProgress = totalTopics > 0 ? Math.round((weightedScore / totalTopics) * 100) : 0;

                      return (
                        <div
                          key={chapter.id}
                          className="rounded-xl border border-zinc-900 bg-zinc-900/20 overflow-hidden"
                        >
                          {/* Chapter Row (Tier 2) */}
                          <div
                            onClick={() => toggleChapter(chapter.id)}
                            className={`flex items-center justify-between px-4 py-3.5 cursor-pointer select-none transition-colors border-b ${
                              isChapExpanded ? 'bg-zinc-900/50 border-zinc-900' : 'bg-transparent border-transparent hover:bg-zinc-900/30'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="text-zinc-500">
                                {isChapExpanded ? (
                                  <ChevronDown className="h-4.5 w-4.5 text-zinc-300" />
                                ) : (
                                  <ChevronRight className="h-4.5 w-4.5 text-zinc-500" />
                                )}
                              </div>
                              <h3 className="text-sm font-semibold text-zinc-300">{chapter.name}</h3>
                              <span className="text-[10px] font-medium text-zinc-500 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-805">
                                {completedTopics}/{totalTopics} Done
                              </span>
                            </div>

                            <div className="flex items-center gap-4 w-32 sm:w-48">
                              <div className="flex-1">
                                <div className="h-1.5 w-full rounded-full bg-zinc-900 overflow-hidden">
                                  <div
                                    className="h-full rounded-full bg-indigo-500 transition-all duration-300"
                                    style={{ width: `${chapProgress}%` }}
                                  />
                                </div>
                              </div>
                              <span className="text-xs text-zinc-400 font-bold w-8 text-right">{chapProgress}%</span>
                            </div>
                          </div>

                          {/* Chapter Content (Topics - Tier 3) */}
                          {isChapExpanded && (
                            <div className="p-3 bg-zinc-950/20 overflow-x-auto">
                              <table className="w-full text-left min-w-[600px] border-collapse">
                                <thead>
                                  <tr className="border-b border-zinc-900 text-[10px] uppercase text-zinc-500 font-bold tracking-wider">
                                    <th className="pb-2 pl-3 w-[45%]">Topic Title</th>
                                    <th className="pb-2 w-[22%]">Status</th>
                                    <th className="pb-2 w-[15%] text-center">PYQs</th>
                                    <th className="pb-2 pr-3 w-[18%]">Revision Notes</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-900/40">
                                  {chapter.topics.map((topic) => {
                                    const status = statusConfig[topic.status] || statusConfig['Not Started'];
                                    const StatusIcon = status.icon;

                                    return (
                                      <tr key={topic.id} className="text-zinc-300 hover:bg-zinc-900/10 transition-colors">
                                        {/* Topic Name */}
                                        <td className="py-3 pl-3">
                                          <span className="text-sm font-medium text-zinc-200">{topic.name}</span>
                                        </td>

                                        {/* Status Picker Selector */}
                                        <td className="py-3">
                                          <div className="relative inline-block w-40">
                                            <select
                                              value={topic.status}
                                              onChange={(e) => updateTopicStatus(subject.id, chapter.id, topic.id, e.target.value)}
                                              className={`w-full cursor-pointer rounded-lg border px-3 py-1.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors appearance-none pr-8 ${status.bg} ${status.textColor}`}
                                            >
                                              <option value="Not Started">Not Started</option>
                                              <option value="In Progress">In Progress</option>
                                              <option value="Revision Needed">Revision Needed</option>
                                              <option value="Completed">Completed</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-zinc-500">
                                              <ChevronDown className="h-3.5 w-3.5" />
                                            </div>
                                          </div>
                                        </td>

                                        {/* PYQ Toggle */}
                                        <td className="py-3 text-center">
                                          <button
                                            onClick={() => toggleTopicPyq(subject.id, chapter.id, topic.id)}
                                            className={`inline-flex items-center justify-center p-1.5 rounded-lg border transition-all ${
                                              topic.pyqSolved
                                                ? 'bg-sky-500/10 border-sky-500/30 text-sky-400 shadow-md shadow-sky-500/5'
                                                : 'border-zinc-800 hover:border-zinc-700 text-zinc-600 hover:text-zinc-500'
                                            }`}
                                            title={topic.pyqSolved ? "PYQs Completed" : "Mark PYQs Solved"}
                                          >
                                            {topic.pyqSolved ? (
                                              <CheckSquare className="h-4.5 w-4.5 stroke-[2.5]" />
                                            ) : (
                                              <Square className="h-4.5 w-4.5 stroke-[1.5]" />
                                            )}
                                          </button>
                                        </td>

                                        {/* Revision Notes Edit/Preview */}
                                        <td className="py-3 pr-3">
                                          {topic.notes ? (
                                            <div className="flex items-center justify-between gap-2 bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded-lg max-w-[150px] transition-colors group">
                                              <span 
                                                onClick={() => openNoteModal(subject.id, chapter.id, topic)}
                                                className="text-xs text-zinc-400 truncate cursor-pointer flex-1"
                                                title={topic.notes}
                                              >
                                                {topic.notes}
                                              </span>
                                              <button
                                                onClick={() => openNoteModal(subject.id, chapter.id, topic)}
                                                className="text-zinc-600 group-hover:text-zinc-300 hover:text-white transition-colors"
                                              >
                                                <FileText className="h-3.5 w-3.5" />
                                              </button>
                                            </div>
                                          ) : (
                                            <button
                                              onClick={() => openNoteModal(subject.id, chapter.id, topic)}
                                              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 px-2.5 py-1.5 text-xs text-zinc-500 hover:text-zinc-300 hover:border-zinc-700 transition-all font-medium"
                                            >
                                              <MessageSquare className="h-3.5 w-3.5 text-zinc-600" />
                                              <span>Add Note</span>
                                            </button>
                                          )}
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Note Editor Modal */}
      {noteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
            onClick={() => {
              setNoteModalOpen(false);
              setActiveTopic(null);
            }}
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl transition-all p-6 z-10 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest">Quick Notes</span>
                <h3 className="text-lg font-bold text-white mt-1">{activeTopic?.name}</h3>
              </div>
              <button
                onClick={() => {
                  setNoteModalOpen(false);
                  setActiveTopic(null);
                }}
                className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-900 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-2">Revision Summary / Cheat Sheet</label>
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="E.g., Worst case time complexity is O(n log n). Quick sort is unstable whereas Merge sort is stable..."
                  className="w-full h-32 rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 text-sm text-zinc-200 placeholder-zinc-600 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-all font-sans resize-none"
                  maxLength={280}
                />
                <div className="flex justify-end mt-1 text-[10px] text-zinc-500">
                  {noteText.length}/280 characters
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => {
                    setNoteModalOpen(false);
                    setActiveTopic(null);
                  }}
                  className="rounded-xl px-4 py-2.5 text-xs font-semibold text-zinc-400 hover:bg-zinc-900 hover:text-white transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={saveNote}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-violet-500/10 hover:shadow-violet-500/25 transition-all"
                >
                  <Save className="h-3.5 w-3.5" />
                  <span>Save Note</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SyllabusView;
