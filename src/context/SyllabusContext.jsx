import React, { createContext, useState, useEffect, useContext } from 'react';

const SyllabusContext = createContext();

const initialSyllabusData = [
  {
    id: "maths",
    name: "Engineering Mathematics & Discrete Mathematics",
    chapters: [
      {
        id: "math-logic",
        name: "Mathematical Logic",
        topics: [
          { id: "prop-fol", name: "Propositional and first-order logic", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "monadic-pred", name: "Monadic predicate logic", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "satisfiability-validity", name: "Satisfiability and Validity", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "sets-relations",
        name: "Sets & Relations",
        topics: [
          { id: "sets-functions", name: "Sets, Functions & Relations", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "partial-orders-lattices", name: "Partial Orders and Lattices", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "equivalence-relations", name: "Equivalence Relations", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "combinatorics",
        name: "Combinatorics",
        topics: [
          { id: "permutations-combinations", name: "Permutations & Combinations", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "counting-summation", name: "Counting and Summation", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "generating-recurrence", name: "Generating Functions and Recurrence Relations", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "graph-theory",
        name: "Graph Theory",
        topics: [
          { id: "connectivity-coloring", name: "Connectivity and Coloring", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "matching-isomorphism", name: "Matching and Isomorphism", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "eulerian-hamiltonian", name: "Eulerian and Hamiltonian paths", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "planar-graphs", name: "Planar graphs", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "linear-algebra",
        name: "Linear Algebra",
        topics: [
          { id: "matrices-determinants", name: "Matrices and Determinants", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "systems-equations", name: "Systems of Linear Equations", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "eigenvalues-vectors", name: "Eigenvalues and Eigenvectors", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "lu-decomposition", name: "LU decomposition", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "calculus",
        name: "Calculus",
        topics: [
          { id: "limits-continuity-diff", name: "Limits, Continuity, and Differentiability", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "maxima-minima", name: "Maxima and Minima", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "mean-value-integration", name: "Mean Value Theorems and Integration", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "probability-statistics",
        name: "Probability & Statistics",
        topics: [
          { id: "random-variables-dist", name: "Random variables, Uniform, Normal, Exponential, Poisson & Binomial distributions", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "mean-median-mode-sd", name: "Mean, Median, Mode, and Standard Deviation", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "conditional-bayes", name: "Conditional Probability and Bayes Theorem", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      }
    ]
  },
  {
    id: "digital-logic",
    name: "Digital Logic",
    chapters: [
      {
        id: "boolean-algebra",
        name: "Boolean Algebra",
        topics: [
          { id: "logic-functions-minimization", name: "Logic functions and Minimization", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "canonical-forms", name: "Canonical and standard forms", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "kmaps", name: "K-Maps", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "combinational-circuits",
        name: "Combinational Circuits",
        topics: [
          { id: "arithmetic-circuits", name: "Arithmetic circuits", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "code-converters", name: "Code converters", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "mux-decoders", name: "Multiplexers and Decoders", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "sequential-circuits",
        name: "Sequential Circuits",
        topics: [
          { id: "latches-flipflops", name: "Latches and Flip-flops", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "counters-registers", name: "Counters and Shift-registers", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "fsms", name: "Finite State Machines (Mealy and Moore models)", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "number-representations",
        name: "Number Representations",
        topics: [
          { id: "fixed-float-repr", name: "Fixed and Floating-point representations", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "computer-arithmetic", name: "Computer arithmetic (addition, subtraction, multiplication)", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      }
    ]
  },
  {
    id: "coa",
    name: "Computer Organization and Architecture (COA)",
    chapters: [
      {
        id: "machine-instructions",
        name: "Machine Instructions",
        topics: [
          { id: "instr-addressing-modes", name: "Machine instructions and Addressing modes", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "alu-datapath",
        name: "ALU & Data Path",
        topics: [
          { id: "alu-datapath-design", name: "ALU, Data-path and Control unit", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "control-unit", name: "Hardwired and Microprogrammed control", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "pipelining",
        name: "Pipelining",
        topics: [
          { id: "pipeline-hazards", name: "Instruction pipelining and Pipeline hazards", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "pipeline-metrics", name: "Throughput and Speedup", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "memory-hierarchy",
        name: "Memory Hierarchy",
        topics: [
          { id: "cache-memory", name: "Cache memory (mapping, replacement policies)", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "main-secondary-storage", name: "Main memory and Secondary storage", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "io-interface",
        name: "I/O Interface",
        topics: [
          { id: "interrupts-dma", name: "I/O interface (Interrupt and DMA mode)", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      }
    ]
  },
  {
    id: "programming-ds",
    name: "Programming and Data Structures",
    chapters: [
      {
        id: "programming-c",
        name: "Programming in C",
        topics: [
          { id: "functions-recursion", name: "Functions, Recursion, Parameter passing, and Scope", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "pointers-arrays-structs", name: "Pointers, Arrays, and Structures", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "linear-ds",
        name: "Linear Data Structures",
        topics: [
          { id: "stacks-queues", name: "Stacks and Queues", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "linked-lists", name: "Linked Lists", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "nonlinear-ds",
        name: "Non-Linear Data Structures",
        topics: [
          { id: "trees-bst", name: "Trees and Binary Search Trees", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "binary-heaps", name: "Binary Heaps", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "graphs-ds", name: "Graphs representation and basic properties", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      }
    ]
  },
  {
    id: "algorithms",
    name: "Algorithms",
    chapters: [
      {
        id: "algorithms-analysis",
        name: "Analysis",
        topics: [
          { id: "asymptotic-complexity", name: "Asymptotic worst-case time and space complexity", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "design-techniques",
        name: "Design Techniques",
        topics: [
          { id: "greedy-algorithms", name: "Greedy approach", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "dynamic-programming", name: "Dynamic Programming", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "divide-conquer-alg", name: "Divide-and-Conquer", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "graph-algorithms",
        name: "Graph Algorithms",
        topics: [
          { id: "bfs-dfs-alg", name: "Graph traversals (BFS, DFS)", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "mst-algorithms", name: "Minimum Spanning Trees (Prim's, Kruskal's)", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "shortest-paths-alg", name: "Shortest paths (Dijkstra's, Bellman-Ford, Floyd-Warshall)", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "sorting-searching",
        name: "Sorting and Searching",
        topics: [
          { id: "sorting-algorithms", name: "Sorting algorithms (Merge sort, Quick sort, Heap sort, Radix sort)", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "hashing", name: "Hashing", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      }
    ]
  },
  {
    id: "toc",
    name: "Theory of Computation (TOC)",
    chapters: [
      {
        id: "regular-languages",
        name: "Regular Languages",
        topics: [
          { id: "regex-dfa-nfa", name: "Regular expressions and Finite automata (DFA, NFA)", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "dfa-minimization", name: "Minimization of DFA", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "pumping-lemma-reg", name: "Pumping Lemma for regular languages", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "context-free-languages",
        name: "Context-Free Languages",
        topics: [
          { id: "cfgs", name: "Context-free grammars", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "pdas", name: "Pushdown automata (PDA)", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "pumping-lemma-cfl", name: "Pumping Lemma for CFLs", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "turing-machines",
        name: "Turing Machines",
        topics: [
          { id: "turing-machines-basic", name: "Turing machines", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "decidability-halting", name: "Decidability and Halting problem", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "undecidability", name: "Undecidability", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      }
    ]
  },
  {
    id: "compiler-design",
    name: "Compiler Design",
    chapters: [
      {
        id: "lexical-syntax",
        name: "Lexical & Syntax Analysis",
        topics: [
          { id: "lexical-analysis", name: "Lexical analysis", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "parsing-types", name: "Parsing (Top-down, Bottom-up, LL, LR, LALR parsers)", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "translation-runtime",
        name: "Translation & Runtime",
        topics: [
          { id: "syntax-translation", name: "Syntax-directed translation", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "runtime-environments", name: "Runtime environments", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "code-generation-optimization",
        name: "Code Generation & Optimization",
        topics: [
          { id: "icg", name: "Intermediate code generation", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "code-optimization", name: "Local and Global code optimization", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "register-allocation", name: "Register allocation", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      }
    ]
  },
  {
    id: "os",
    name: "Operating Systems (OS)",
    chapters: [
      {
        id: "processes-threads",
        name: "Processes & Threads",
        topics: [
          { id: "system-calls", name: "System calls", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "processes-threads-concept", name: "Processes and Threads", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "cpu-scheduling-alg", name: "CPU and Thread scheduling", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "concurrency",
        name: "Concurrency",
        topics: [
          { id: "ipc", name: "Inter-process communication", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "concurrency-mutex", name: "Concurrency and Mutual exclusion", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "semaphores-monitors", name: "Semaphores and Monitors", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "sync-problems", name: "Classical CPU synchronization problems", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "deadlocks-concept", name: "Deadlocks", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "memory-management",
        name: "Memory Management",
        topics: [
          { id: "memory-management-basic", name: "Main memory management", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "paging-segmentation", name: "Paging and Segmentation", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "virtual-memory-replacement", name: "Virtual memory and Page replacement algorithms", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "file-storage",
        name: "File & Storage Systems",
        topics: [
          { id: "files-directories", name: "File systems and Directory structure", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "disk-scheduling", name: "Disk scheduling algorithms", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      }
    ]
  },
  {
    id: "dbms",
    name: "Databases (DBMS)",
    chapters: [
      {
        id: "er-relational-models",
        name: "ER and Relational Models",
        topics: [
          { id: "er-model", name: "ER-model", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "relational-model-concept", name: "Relational model", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "relational-algebra-calculus", name: "Relational algebra and Tuple calculus", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "sql",
        name: "Structured Query Language",
        topics: [
          { id: "sql-queries", name: "SQL queries", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "constraints-triggers", name: "Integrity constraints, Assertions, and Triggers", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "db-design",
        name: "Database Design",
        topics: [
          { id: "schema-refinement", name: "Schema refinement", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "normalization-fds", name: "Functional dependencies and Normalization (1NF, 2NF, 3NF, BCNF)", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "transactions-concurrency",
        name: "Transactions & Concurrency",
        topics: [
          { id: "acid-properties", name: "Transaction concepts and ACID properties", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "concurrency-control", name: "Concurrency control (Locking and Time-stamping)", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "serializability", name: "Serializability", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "storage-indexing",
        name: "Storage & Indexing",
        topics: [
          { id: "file-organization", name: "File organization", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "indexing-b-trees", name: "Indexing (B and B+ trees)", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      }
    ]
  },
  {
    id: "cn",
    name: "Computer Networks (CN)",
    chapters: [
      {
        id: "network-architecture",
        name: "Network Architecture",
        topics: [
          { id: "layering-concept", name: "Concept of layering", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "osi-tcpip-stacks", name: "OSI and TCP/IP protocol stacks", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "datalink-layer",
        name: "Data Link Layer",
        topics: [
          { id: "framing-errors", name: "Framing, Error detection and correction", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "flow-sliding-window", name: "Flow control and Sliding window protocols", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "mac-protocols", name: "Medium Access Control (CSMA/CD, Token Ring)", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "network-layer",
        name: "Network Layer",
        topics: [
          { id: "routing-algorithms", name: "Routing algorithms (Distance Vector, Link State)", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "ipv4-ipv6", name: "IPv4 and IPv6", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "subnetting-cidr-protocols", name: "Subnetting, CIDR, ICMP, ARP, and NAT", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "transport-layer",
        name: "Transport Layer",
        topics: [
          { id: "tcp-udp", name: "TCP and UDP", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "flow-congestion-control", name: "Flow control and Congestion control", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "socket-programming", name: "Socket programming", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "application-layer",
        name: "Application Layer",
        topics: [
          { id: "app-layer-protocols", name: "DNS, SMTP, POP, HTTP, FTP, HTTPS", status: "Not Started", pyqSolved: false, notes: "" }
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

const API_BASE = 'http://localhost:3001/api';

const mergeProgress = (staticSyllabus, progressList) => {
  const progressMap = {};
  progressList.forEach(item => {
    progressMap[item.topicId] = item;
  });

  return staticSyllabus.map(subject => ({
    ...subject,
    chapters: subject.chapters.map(chapter => ({
      ...chapter,
      topics: chapter.topics.map(topic => {
        const prog = progressMap[topic.id];
        return prog ? {
          ...topic,
          status: prog.status,
          pyqSolved: prog.pyqSolved,
          notes: prog.notes
        } : topic;
      })
    }))
  }));
};

export const SyllabusProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('prepgate_token') || null);
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('prepgate_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);
  const [syllabus, setSyllabus] = useState(initialSyllabusData);

  // Helper to log out
  const logout = () => {
    localStorage.removeItem('prepgate_token');
    localStorage.removeItem('prepgate_user');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    setSyllabus(initialSyllabusData);
  };

  // Fetch progress from backend upon authentication
  useEffect(() => {
    const fetchProgress = async () => {
      if (!token) {
        setSyllabus(initialSyllabusData);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`${API_BASE}/progress/get`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const progressList = await response.json();
          setSyllabus(mergeProgress(initialSyllabusData, progressList));
        } else if (response.status === 401) {
          logout();
        }
      } catch (err) {
        console.error("Failed to fetch progress from backend:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [token]);

  // Auth: Login
  const login = async (email, password) => {
    setLoading(true);
    setAuthError('');
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      localStorage.setItem('prepgate_token', data.token);
      localStorage.setItem('prepgate_user', JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
      setIsAuthenticated(true);
    } catch (err) {
      setAuthError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Auth: Register
  const register = async (email, password) => {
    setLoading(true);
    setAuthError('');
    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      localStorage.setItem('prepgate_token', data.token);
      localStorage.setItem('prepgate_user', JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
      setIsAuthenticated(true);
    } catch (err) {
      setAuthError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Sync update with DB
  const syncProgress = async (topicId, status, pyqSolved, notes) => {
    if (!token) return;
    try {
      await fetch(`${API_BASE}/progress/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ topicId, status, pyqSolved, notes })
      });
    } catch (err) {
      console.error("Failed to sync progress with backend:", err);
    }
  };

  // Update status of a topic
  const updateTopicStatus = (subjectId, chapterId, topicId, newStatus) => {
    let topicToSync = null;

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
              const updated = { ...topic, status: newStatus };
              topicToSync = updated;
              return updated;
            })
          };
        })
      };
    }));

    if (topicToSync) {
      syncProgress(topicToSync.id, topicToSync.status, topicToSync.pyqSolved, topicToSync.notes);
    }
  };

  // Toggle PYQs Solved status
  const toggleTopicPyq = (subjectId, chapterId, topicId) => {
    let topicToSync = null;

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
              const updated = { ...topic, pyqSolved: !topic.pyqSolved };
              topicToSync = updated;
              return updated;
            })
          };
        })
      };
    }));

    if (topicToSync) {
      syncProgress(topicToSync.id, topicToSync.status, topicToSync.pyqSolved, topicToSync.notes);
    }
  };

  // Update quick notes
  const updateTopicNotes = (subjectId, chapterId, topicId, newNotes) => {
    let topicToSync = null;

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
              const updated = { ...topic, notes: newNotes };
              topicToSync = updated;
              return updated;
            })
          };
        })
      };
    }));

    if (topicToSync) {
      syncProgress(topicToSync.id, topicToSync.status, topicToSync.pyqSolved, topicToSync.notes);
    }
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
      revisionTopics,
      user,
      token,
      isAuthenticated,
      authError,
      loading,
      login,
      register,
      logout
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
