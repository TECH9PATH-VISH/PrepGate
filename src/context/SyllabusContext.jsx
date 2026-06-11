import React, { createContext, useState, useEffect, useContext } from 'react';

const SyllabusContext = createContext();

const initialSyllabusData = [
  {
    id: "algorithms",
    name: "Algorithms",
    chapters: [
      {
        id: "divide-conquer",
        name: "Divide & Conquer",
        topics: [
          { id: "binary-search", name: "Binary Search", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "merge-quick-sort", name: "Merge Sort vs Quick Sort", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "graph-traversals",
        name: "Graph Traversals",
        topics: [
          { id: "bfs-dfs", name: "BFS & DFS", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "dijkstra", name: "Dijkstra’s Algorithm", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      }
    ]
  },
  {
    id: "os",
    name: "Operating Systems",
    chapters: [
      {
        id: "process-management",
        name: "Process Management",
        topics: [
          { id: "cpu-scheduling", name: "CPU Scheduling", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "semaphores", name: "Semaphores", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "deadlocks", name: "Deadlocks", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "memory-management",
        name: "Memory Management",
        topics: [
          { id: "paging", name: "Paging", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "segmentation", name: "Segmentation", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "virtual-memory", name: "Virtual Memory", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      }
    ]
  },
  {
    id: "dbms",
    name: "Databases (DBMS)",
    chapters: [
      {
        id: "relational-model",
        name: "Relational Model",
        topics: [
          { id: "functional-dependencies", name: "Functional Dependencies", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "normalization", name: "3NF/BCNF Normalization", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      }
    ]
  }
];

// Helper to calculate progress weight of a single topic
const getTopicWeight = (status) => {
  switch (status) {
    case 'Completed': return 1.0;
    case 'In Progress': return 0.5;
    case 'Revision Needed': return 0.5;
    case 'Not Started':
    default: return 0.0;
  }
};

export const SyllabusProvider = ({ children }) => {
  const [syllabus, setSyllabus] = useState(() => {
    try {
      const stored = localStorage.getItem('prepgate_syllabus_data');
      return stored ? JSON.parse(stored) : initialSyllabusData;
    } catch (e) {
      console.error("Failed to load syllabus from localStorage:", e);
      return initialSyllabusData;
    }
  });

  useEffect(() => {
    localStorage.setItem('prepgate_syllabus_data', JSON.stringify(syllabus));
  }, [syllabus]);

  // Update status of a topic
  const updateTopicStatus = (subjectId, chapterId, topicId, newStatus) => {
    setSyllabus(prev => prev.map(subject => {
      if (subject.id !== subjectId) return subject;
      return {
        ...subject,
        chapters: subject.chapters.map(chapter => {
          if (chapter.id !== chapterId) return chapter;
          return {
            ...chapter,
            topics: chapter.topics.map(topic => {
              if (topic.id !== topicId) return topic;
              return { ...topic, status: newStatus };
            })
          };
        })
      };
    }));
  };

  // Toggle PYQs Solved status
  const toggleTopicPyq = (subjectId, chapterId, topicId) => {
    setSyllabus(prev => prev.map(subject => {
      if (subject.id !== subjectId) return subject;
      return {
        ...subject,
        chapters: subject.chapters.map(chapter => {
          if (chapter.id !== chapterId) return chapter;
          return {
            ...chapter,
            topics: chapter.topics.map(topic => {
              if (topic.id !== topicId) return topic;
              return { ...topic, pyqSolved: !topic.pyqSolved };
            })
          };
        })
      };
    }));
  };

  // Update quick notes
  const updateTopicNotes = (subjectId, chapterId, topicId, newNotes) => {
    setSyllabus(prev => prev.map(subject => {
      if (subject.id !== subjectId) return subject;
      return {
        ...subject,
        chapters: subject.chapters.map(chapter => {
          if (chapter.id !== chapterId) return chapter;
          return {
            ...chapter,
            topics: chapter.topics.map(topic => {
              if (topic.id !== topicId) return topic;
              return { ...topic, notes: newNotes };
            })
          };
        })
      };
    }));
  };

  // Calculate detailed progress stats
  const calculateStats = () => {
    let totalTopics = 0;
    let completedTopics = 0;
    let inProgressTopics = 0;
    let revisionNeededTopics = 0;
    let totalWeightedScore = 0;
    let totalPyqSolved = 0;

    const subjectStats = {};

    syllabus.forEach(subject => {
      let subjTotal = 0;
      let subjWeighted = 0;
      let subjCompleted = 0;

      subject.chapters.forEach(chapter => {
        chapter.topics.forEach(topic => {
          totalTopics++;
          subjTotal++;

          const weight = getTopicWeight(topic.status);
          totalWeightedScore += weight;
          subjWeighted += weight;

          if (topic.status === 'Completed') {
            completedTopics++;
            subjCompleted++;
          } else if (topic.status === 'In Progress') {
            inProgressTopics++;
          } else if (topic.status === 'Revision Needed') {
            revisionNeededTopics++;
          }

          if (topic.pyqSolved) {
            totalPyqSolved++;
          }
        });
      });

      subjectStats[subject.id] = {
        name: subject.name,
        total: subjTotal,
        completed: subjCompleted,
        progress: subjTotal > 0 ? Math.round((subjWeighted / subjTotal) * 100) : 0,
        completedProgress: subjTotal > 0 ? Math.round((subjCompleted / subjTotal) * 100) : 0
      };
    });

    const overallProgress = totalTopics > 0 ? Math.round((totalWeightedScore / totalTopics) * 100) : 0;
    const overallCompletedPercent = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

    return {
      totalTopics,
      completedTopics,
      inProgressTopics,
      revisionNeededTopics,
      overallProgress,
      overallCompletedPercent,
      totalPyqSolved,
      subjectStats
    };
  };

  const stats = calculateStats();

  // Helper to retrieve list of topics requiring revision
  const getRevisionTopics = () => {
    const list = [];
    syllabus.forEach(subj => {
      subj.chapters.forEach(chap => {
        chap.topics.forEach(top => {
          if (top.status === 'Revision Needed') {
            list.push({
              ...top,
              subjectId: subj.id,
              subjectName: subj.name,
              chapterId: chap.id,
              chapterName: chap.name
            });
          }
        });
      });
    });
    return list;
  };

  const revisionTopics = getRevisionTopics();

  return (
    <SyllabusContext.Provider value={{
      syllabus,
      updateTopicStatus,
      toggleTopicPyq,
      updateTopicNotes,
      stats,
      revisionTopics
    }}>
      {children}
    </SyllabusContext.Provider>
  );
};

export const useSyllabus = () => {
  const context = useContext(SyllabusContext);
  if (!context) {
    throw new Error('useSyllabus must be used within a SyllabusProvider');
  }
  return context;
};
