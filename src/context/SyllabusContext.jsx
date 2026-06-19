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
          { id: "prop-logic", name: "Propositional logic", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "fol", name: "First-order logic", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "monadic-pred", name: "Monadic predicate logic", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "satisfiability", name: "Satisfiability", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "validity", name: "Validity", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "sets-relations",
        name: "Sets & Relations",
        topics: [
          { id: "sets", name: "Sets", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "functions", name: "Functions", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "relations", name: "Relations", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "partial-orders", name: "Partial Orders", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "lattices", name: "Lattices", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "equivalence-relations", name: "Equivalence Relations", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "combinatorics",
        name: "Combinatorics",
        topics: [
          { id: "permutations", name: "Permutations", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "combinations", name: "Combinations", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "counting", name: "Counting", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "summation", name: "Summation", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "generating-functions", name: "Generating Functions", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "recurrence-relations", name: "Recurrence Relations", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "graph-theory",
        name: "Graph Theory",
        topics: [
          { id: "connectivity", name: "Connectivity", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "coloring", name: "Coloring", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "matching", name: "Matching", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "isomorphism", name: "Isomorphism", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "eulerian-paths", name: "Eulerian paths", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "hamiltonian-paths", name: "Hamiltonian paths", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "planar-graphs", name: "Planar graphs", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "linear-algebra",
        name: "Linear Algebra",
        topics: [
          { id: "matrices", name: "Matrices", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "determinants", name: "Determinants", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "systems-equations", name: "Systems of Linear Equations", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "eigenvalues", name: "Eigenvalues", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "eigenvectors", name: "Eigenvectors", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "lu-decomposition", name: "LU decomposition", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "calculus",
        name: "Calculus",
        topics: [
          { id: "limits", name: "Limits", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "continuity", name: "Continuity", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "differentiability", name: "Differentiability", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "maxima", name: "Maxima", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "minima", name: "Minima", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "mean-value-theorems", name: "Mean Value Theorems", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "integration", name: "Integration", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "probability-statistics",
        name: "Probability & Statistics",
        topics: [
          { id: "random-variables", name: "Random variables", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "uniform-dist", name: "Uniform distribution", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "normal-dist", name: "Normal distribution", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "exponential-dist", name: "Exponential distribution", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "poisson-dist", name: "Poisson distribution", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "binomial-dist", name: "Binomial distribution", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "mean", name: "Mean", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "median", name: "Median", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "mode", name: "Mode", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "standard-deviation", name: "Standard Deviation", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "conditional-probability", name: "Conditional Probability", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "bayes-theorem", name: "Bayes Theorem", status: "Not Started", pyqSolved: false, notes: "" }
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
          { id: "logic-functions", name: "Logic functions", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "logic-minimization", name: "Minimization", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "canonical-forms", name: "Canonical forms", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "standard-forms", name: "Standard forms", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "kmaps", name: "K-Maps", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "combinational-circuits",
        name: "Combinational Circuits",
        topics: [
          { id: "arithmetic-circuits", name: "Arithmetic circuits", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "code-converters", name: "Code converters", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "multiplexers", name: "Multiplexers", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "decoders", name: "Decoders", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "sequential-circuits",
        name: "Sequential Circuits",
        topics: [
          { id: "latches", name: "Latches", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "flipflops", name: "Flip-flops", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "counters", name: "Counters", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "shift-registers", name: "Shift-registers", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "fsms-mealy", name: "Finite State Machines (Mealy model)", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "fsms-moore", name: "Finite State Machines (Moore model)", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "number-representations",
        name: "Number Representations",
        topics: [
          { id: "fixed-point-repr", name: "Fixed-point representation", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "floating-point-repr", name: "Floating-point representation", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "computer-arithmetic-addition", name: "Computer arithmetic (addition)", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "computer-arithmetic-subtraction", name: "Computer arithmetic (subtraction)", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "computer-arithmetic-multiplication", name: "Computer arithmetic (multiplication)", status: "Not Started", pyqSolved: false, notes: "" }
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
          { id: "machine-instructions-basic", name: "Machine instructions", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "addressing-modes", name: "Addressing modes", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "alu-datapath",
        name: "ALU & Data Path",
        topics: [
          { id: "alu", name: "ALU", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "datapath", name: "Data-path", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "control-unit-basic", name: "Control unit", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "hardwired-control", name: "Hardwired control", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "microprogrammed-control", name: "Microprogrammed control", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "pipelining",
        name: "Pipelining",
        topics: [
          { id: "instruction-pipelining", name: "Instruction pipelining", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "pipeline-hazards-basic", name: "Pipeline hazards", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "throughput", name: "Throughput", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "speedup", name: "Speedup", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "memory-hierarchy",
        name: "Memory Hierarchy",
        topics: [
          { id: "cache-mapping", name: "Cache memory mapping", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "cache-replacement", name: "Cache memory replacement policies", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "main-memory", name: "Main memory", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "secondary-storage", name: "Secondary storage", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "io-interface",
        name: "I/O Interface",
        topics: [
          { id: "io-interrupt-mode", name: "I/O interface (Interrupt mode)", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "io-dma-mode", name: "I/O interface (DMA mode)", status: "Not Started", pyqSolved: false, notes: "" }
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
          { id: "functions-c", name: "Functions", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "recursion", name: "Recursion", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "parameter-passing", name: "Parameter passing", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "scope", name: "Scope", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "pointers", name: "Pointers", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "arrays", name: "Arrays", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "structures", name: "Structures", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "linear-ds",
        name: "Linear Data Structures",
        topics: [
          { id: "stacks", name: "Stacks", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "queues", name: "Queues", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "linked-lists", name: "Linked Lists", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "nonlinear-ds",
        name: "Non-Linear Data Structures",
        topics: [
          { id: "trees", name: "Trees", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "bst", name: "Binary Search Trees", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "binary-heaps", name: "Binary Heaps", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "graphs-representation", name: "Graphs representation", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "graphs-properties", name: "Graphs basic properties", status: "Not Started", pyqSolved: false, notes: "" }
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
          { id: "asymptotic-time-complexity", name: "Asymptotic worst-case time complexity", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "asymptotic-space-complexity", name: "Asymptotic worst-case space complexity", status: "Not Started", pyqSolved: false, notes: "" }
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
          { id: "bfs", name: "Graph traversal (BFS)", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "dfs", name: "Graph traversal (DFS)", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "prims-alg", name: "Prim's algorithm", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "kruskals-alg", name: "Kruskal's algorithm", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "dijkstras-alg", name: "Dijkstra's algorithm", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "bellman-ford-alg", name: "Bellman-Ford algorithm", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "floyd-warshall-alg", name: "Floyd-Warshall algorithm", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "sorting-searching",
        name: "Sorting and Searching",
        topics: [
          { id: "merge-sort", name: "Merge sort", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "quick-sort", name: "Quick sort", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "heap-sort", name: "Heap sort", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "radix-sort", name: "Radix sort", status: "Not Started", pyqSolved: false, notes: "" },
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
          { id: "regular-expressions", name: "Regular expressions", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "dfa", name: "Deterministic Finite Automata (DFA)", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "nfa", name: "Non-deterministic Finite Automata (NFA)", status: "Not Started", pyqSolved: false, notes: "" },
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
          { id: "decidability", name: "Decidability", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "halting-problem", name: "Halting problem", status: "Not Started", pyqSolved: false, notes: "" },
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
          { id: "top-down-parsing", name: "Top-down parsing", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "bottom-up-parsing", name: "Bottom-up parsing", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "ll-parsers", name: "LL parsers", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "lr-parsers", name: "LR parsers", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "lalr-parsers", name: "LALR parsers", status: "Not Started", pyqSolved: false, notes: "" }
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
          { id: "local-code-optimization", name: "Local code optimization", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "global-code-optimization", name: "Global code optimization", status: "Not Started", pyqSolved: false, notes: "" },
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
          { id: "processes", name: "Processes", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "threads", name: "Threads", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "cpu-scheduling", name: "CPU scheduling", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "thread-scheduling", name: "Thread scheduling", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "concurrency",
        name: "Concurrency",
        topics: [
          { id: "ipc", name: "Inter-process communication", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "concurrency-concept", name: "Concurrency", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "mutual-exclusion", name: "Mutual exclusion", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "semaphores", name: "Semaphores", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "monitors", name: "Monitors", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "sync-problems", name: "Classical CPU synchronization problems", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "deadlocks-concept", name: "Deadlocks", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "memory-management",
        name: "Memory Management",
        topics: [
          { id: "memory-management-basic", name: "Main memory management", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "paging", name: "Paging", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "segmentation", name: "Segmentation", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "virtual-memory", name: "Virtual memory", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "page-replacement-alg", name: "Page replacement algorithms", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "file-storage",
        name: "File & Storage Systems",
        topics: [
          { id: "file-systems", name: "File systems", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "directory-structure", name: "Directory structure", status: "Not Started", pyqSolved: false, notes: "" },
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
          { id: "relational-algebra", name: "Relational algebra", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "tuple-calculus", name: "Tuple calculus", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "sql",
        name: "Structured Query Language",
        topics: [
          { id: "sql-queries", name: "SQL queries", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "integrity-constraints", name: "Integrity constraints", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "assertions", name: "Assertions", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "triggers", name: "Triggers", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "db-design",
        name: "Database Design",
        topics: [
          { id: "schema-refinement", name: "Schema refinement", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "functional-dependencies", name: "Functional dependencies", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "normalization-1nf", name: "Normalization (1NF)", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "normalization-2nf", name: "Normalization (2NF)", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "normalization-3nf", name: "Normalization (3NF)", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "normalization-bcnf", name: "Normalization (BCNF)", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "transactions-concurrency",
        name: "Transactions & Concurrency",
        topics: [
          { id: "transaction-concepts", name: "Transaction concepts", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "acid-properties", name: "ACID properties", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "concurrency-control-locking", name: "Concurrency control (Locking)", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "concurrency-control-timestamping", name: "Concurrency control (Time-stamping)", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "serializability", name: "Serializability", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "storage-indexing",
        name: "Storage & Indexing",
        topics: [
          { id: "file-organization", name: "File organization", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "indexing-b-trees", name: "Indexing (B trees)", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "indexing-bplus-trees", name: "Indexing (B+ trees)", status: "Not Started", pyqSolved: false, notes: "" }
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
          { id: "osi-stack", name: "OSI protocol stack", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "tcpip-stack", name: "TCP/IP protocol stack", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "datalink-layer",
        name: "Data Link Layer",
        topics: [
          { id: "framing", name: "Framing", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "error-detection", name: "Error detection", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "error-correction", name: "Error correction", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "flow-control-dll", name: "Flow control (Data Link Layer)", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "sliding-window-protocols", name: "Sliding window protocols", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "mac-csmacd", name: "Medium Access Control (CSMA/CD)", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "mac-tokenring", name: "Medium Access Control (Token Ring)", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "network-layer",
        name: "Network Layer",
        topics: [
          { id: "routing-distance-vector", name: "Routing algorithms (Distance Vector)", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "routing-link-state", name: "Routing algorithms (Link State)", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "ipv4", name: "IPv4", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "ipv6", name: "IPv6", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "subnetting", name: "Subnetting", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "cidr", name: "CIDR", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "icmp", name: "ICMP", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "arp", name: "ARP", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "nat", name: "NAT", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "transport-layer",
        name: "Transport Layer",
        topics: [
          { id: "tcp", name: "TCP", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "udp", name: "UDP", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "flow-control-tl", name: "Flow control (Transport Layer)", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "congestion-control", name: "Congestion control", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "socket-programming", name: "Socket programming", status: "Not Started", pyqSolved: false, notes: "" }
        ]
      },
      {
        id: "application-layer",
        name: "Application Layer",
        topics: [
          { id: "dns", name: "DNS", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "smtp", name: "SMTP", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "pop", name: "POP", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "http", name: "HTTP", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "ftp", name: "FTP", status: "Not Started", pyqSolved: false, notes: "" },
          { id: "https", name: "HTTPS", status: "Not Started", pyqSolved: false, notes: "" }
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
  const [isLoading, setIsLoading] = useState(() => !!localStorage.getItem('prepgate_token'));
  const [syllabus, setSyllabus] = useState(initialSyllabusData);

  // Helper to log out
  const logout = () => {
    localStorage.removeItem('prepgate_token');
    localStorage.removeItem('prepgate_user');
    localStorage.removeItem('prepgate_syllabus_progress');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    setSyllabus(initialSyllabusData);
  };

  // Fetch progress from backend upon authentication
  useEffect(() => {
    const hydrateState = async () => {
      // 1. Try to load from localStorage first (fail-safe fallback)
      const localData = localStorage.getItem('prepgate_syllabus_progress');
      if (localData) {
        try {
          const parsed = JSON.parse(localData);
          if (Array.isArray(parsed)) {
            if (parsed.length > 0 && parsed[0].chapters) {
              setSyllabus(parsed);
            } else {
              setSyllabus(mergeProgress(initialSyllabusData, parsed));
            }
          }
        } catch (e) {
          console.error("Error parsing prepgate_syllabus_progress from localStorage:", e);
        }
      }

      // 2. Fetch from backend if authenticated
      if (!token) {
        if (!localData) {
          setSyllabus(initialSyllabusData);
        }
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE}/progress/get`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const progressList = await response.json();
          const merged = mergeProgress(initialSyllabusData, progressList);
          setSyllabus(merged);
          // Sync backend data to local storage
          localStorage.setItem('prepgate_syllabus_progress', JSON.stringify(merged));
        } else if (response.status === 401) {
          logout();
        }
      } catch (err) {
        console.error("Failed to fetch progress from backend:", err);
      } finally {
        setIsLoading(false);
      }
    };

    hydrateState();
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

  // Save all current syllabus progress to database in bulk
  const saveAllProgress = async () => {
    // Save to local storage first as a fail-safe fallback
    localStorage.setItem('prepgate_syllabus_progress', JSON.stringify(syllabus));

    if (!token) return;
    
    const topicsList = [];
    syllabus.forEach(subject => {
      subject.chapters.forEach(chapter => {
        chapter.topics.forEach(topic => {
          topicsList.push({
            topicId: topic.id,
            status: topic.status,
            pyqSolved: topic.pyqSolved,
            notes: topic.notes || ''
          });
        });
      });
    });

    try {
      const response = await fetch(`${API_BASE}/progress/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(topicsList)
      });

      if (!response.ok) {
        throw new Error('Failed to save progress');
      }
      return await response.json();
    } catch (err) {
      console.error("Failed to save progress in bulk:", err);
      throw err;
    }
  };

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
      isLoading,
      login,
      register,
      logout,
      saveAllProgress
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
