import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, RefreshCw, PenSquare, FileText, Check, Clock, BookOpen, Save, X } from 'lucide-react';
import { useSyllabus } from '../context/SyllabusContext';

const RevisionView = () => {
  const { revisionTopics, updateTopicStatus, updateTopicNotes } = useSyllabus();

  // Active editing notes state
  const [editingTopicId, setEditingTopicId] = useState(null); // topicId
  const [editingText, setEditingText] = useState('');

  const handleStartEdit = (topic) => {
    setEditingTopicId(topic.id);
    setEditingText(topic.notes || '');
  };

  const handleSaveNotes = (topic) => {
    updateTopicNotes(topic.subjectId, topic.chapterId, topic.id, editingText);
    setEditingTopicId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            Revision Alerts
            {revisionTopics.length > 0 && (
              <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-rose-500/10 border border-rose-500/20 px-2 text-xs font-bold text-rose-400">
                {revisionTopics.length}
              </span>
            )}
          </h1>
          <p className="text-sm text-zinc-400">Prioritize these weak spots to ensure all key concepts are fully understood.</p>
        </div>
      </div>

      {/* Topics list */}
      {revisionTopics.length === 0 ? (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-12 text-center max-w-xl mx-auto my-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 mx-auto mb-4 border border-emerald-500/20">
            <CheckCircle className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-bold text-zinc-100">All caught up!</h2>
          <p className="text-sm text-zinc-400 mt-2 max-w-sm mx-auto">
            You don't have any topics marked "Revision Needed". Mark topics for revision in the Syllabus Matrix as you study.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-1">
          {revisionTopics.map((topic) => {
            const isEditing = editingTopicId === topic.id;

            return (
              <div
                key={topic.id}
                className="relative rounded-2xl border border-zinc-850 bg-zinc-950 p-5 md:p-6 transition-all hover:border-zinc-800 shadow-lg"
              >
                {/* Accent line on left */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl bg-rose-500" />

                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  {/* Topic Metadata */}
                  <div className="flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-semibold text-zinc-400 bg-zinc-900 border border-zinc-850 px-2.5 py-1 rounded-lg">
                        {topic.subjectName}
                      </span>
                      <span className="text-zinc-500 font-medium">
                        &rsaquo; {topic.chapterName}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-tight mt-1.5">{topic.name}</h3>
                  </div>

                  {/* Quick Status Changers */}
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-xs text-zinc-500 font-medium mr-1">Move to:</span>
                    <button
                      onClick={() => updateTopicStatus(topic.subjectId, topic.chapterId, topic.id, 'In Progress')}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/20 bg-amber-500/10 hover:bg-amber-500/20 px-3 py-1.5 text-xs font-semibold text-amber-400 transition-colors"
                    >
                      <Clock className="h-3.5 w-3.5" />
                      <span>In Progress</span>
                    </button>
                    <button
                      onClick={() => updateTopicStatus(topic.subjectId, topic.chapterId, topic.id, 'Completed')}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 hover:bg-emerald-500/20 px-3 py-1.5 text-xs font-semibold text-emerald-400 transition-colors"
                    >
                      <Check className="h-3.5 w-3.5" />
                      <span>Completed</span>
                    </button>
                  </div>
                </div>

                {/* Revision Notes Section */}
                <div className="mt-5 pt-4 border-t border-zinc-900 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5 text-rose-400" />
                      Revision Notes
                    </span>
                    {!isEditing && (
                      <button
                        onClick={() => handleStartEdit(topic)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors"
                      >
                        <PenSquare className="h-3.5 w-3.5" />
                        <span>{topic.notes ? 'Edit Notes' : 'Create Notes'}</span>
                      </button>
                    )}
                  </div>

                  {isEditing ? (
                    <div className="space-y-3">
                      <textarea
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        placeholder="Write key equations, formulas or points here..."
                        className="w-full h-24 rounded-xl border border-zinc-800 bg-zinc-900/40 p-3 text-sm text-zinc-200 placeholder-zinc-600 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-all font-sans resize-none"
                        maxLength={280}
                      />
                      <div className="flex justify-between items-center text-[10px] text-zinc-500">
                        <span>{editingText.length}/280 characters</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingTopicId(null)}
                            className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-900 hover:text-white"
                          >
                            <X className="h-4.5 w-4.5" />
                          </button>
                          <button
                            onClick={() => handleSaveNotes(topic)}
                            className="inline-flex items-center gap-1 rounded-lg bg-violet-600 hover:bg-violet-500 px-3 py-1 text-white text-[11px] font-semibold transition-colors"
                          >
                            <Save className="h-3.5 w-3.5" />
                            <span>Save</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-xl bg-zinc-900/30 border border-zinc-900 p-3 text-sm text-zinc-300 italic font-mono min-h-11">
                      {topic.notes ? (
                        <span>"{topic.notes}"</span>
                      ) : (
                        <span className="text-zinc-650 not-italic font-sans">No revision notes added yet. Click 'Create Notes' to capture important formulas or quick summaries.</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RevisionView;
