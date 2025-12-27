import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve ALL static files from all directories
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "public")));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/JS", express.static(path.join(__dirname, "public/JS")));
app.use("/HTML", express.static(path.join(__dirname, "public/HTML")));
app.use("/CSS", express.static(path.join(__dirname, "public/CSS")));

// Password hashing function
function hashPassword(password) {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

// In-memory database
const usersDB = [];

// Enhanced DSA Knowledge Base
const dsaKnowledge = {
  // Stack
  stack: `## 📚 Stack Data Structure
**LIFO (Last In First Out)** principle.

### 🔧 Operations:
1. **Push** - Add element to top (O(1))
2. **Pop** - Remove element from top (O(1))
3. **Peek/Top** - View top element (O(1))
4. **isEmpty** - Check if stack is empty (O(1))

### 💻 JavaScript Implementation:
\`\`\`javascript
class Stack {
    constructor() { this.items = []; }

    push(element) {
        this.items.push(element);
    }

    pop() {
        if (this.isEmpty()) return null;
        return this.items.pop();
    }

    peek() {
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }
}

// Usage
const stack = new Stack();
stack.push(10);
stack.push(20);
console.log(stack.peek()); // 20
stack.pop();
console.log(stack.size()); // 1
\`\`\`

### 📊 Time Complexity:
- All operations: O(1)
- Space: O(n)

### 🎯 Applications:
- Function call stack
- Undo/Redo operations
- Expression evaluation
- Backtracking algorithms`,

  // Queue
  queue: `## 🚶 Queue Data Structure
**FIFO (First In First Out)** principle.

### 🔧 Operations:
1. **Enqueue** - Add element to rear (O(1))
2. **Dequeue** - Remove element from front (O(1))
3. **Front** - Get front element (O(1))
4. **Rear** - Get last element (O(1))

### 💻 JavaScript Implementation:
\`\`\`javascript
class Queue {
    constructor() { this.items = []; }

    enqueue(element) {
        this.items.push(element);
    }

    dequeue() {
        if (this.isEmpty()) return null;
        return this.items.shift();
    }

    front() {
        if (this.isEmpty()) return null;
        return this.items[0];
    }

    rear() {
        if (this.isEmpty()) return null;
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }
}
\`\`\`

### 📊 Time Complexity:
- Enqueue: O(1)
- Dequeue: O(1) (O(n) for array shift, but optimized)
- Space: O(n)

### 🎯 Applications:
- CPU scheduling
- Printer queue
- BFS algorithm
- Call center systems`,

  // Linked List
  "linked list": `## 🔗 Linked List Data Structure
Linear collection of nodes where each node points to the next.

### 🔧 Types:
1. **Singly Linked List** - One direction
2. **Doubly Linked List** - Two directions
3. **Circular Linked List** - Last points to first

### 💻 Node Class:
\`\`\`javascript
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

// Singly Linked List Implementation
class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    // Add at end
    append(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.size++;
    }

    // Insert at beginning
    prepend(data) {
        const newNode = new Node(data);
        newNode.next = this.head;
        this.head = newNode;
        this.size++;
    }

    // Delete node
    delete(data) {
        if (!this.head) return;

        if (this.head.data === data) {
            this.head = this.head.next;
            this.size--;
            return;
        }

        let current = this.head;
        while (current.next && current.next.data !== data) {
            current = current.next;
        }

        if (current.next) {
            current.next = current.next.next;
            this.size--;
        }
    }
}
\`\`\`

### 📊 Time Complexity:
- Access: O(n)
- Search: O(n)
- Insertion: O(1) at beginning, O(n) at end
- Deletion: O(1) at beginning, O(n) at end

### 🎯 Applications:
- Music playlist
- Browser history
- Hash table chaining
- Polynomial representation`,

  // Tree
  tree: `## 🌳 Tree Data Structure
Hierarchical structure with nodes having parent-child relationships.

### 🔧 Types:
1. **Binary Tree** - Max 2 children per node
2. **Binary Search Tree** - Ordered binary tree
3. **AVL Tree** - Self-balancing BST
4. **Heap** - Complete binary tree

### 💻 Binary Tree Implementation:
\`\`\`javascript
class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    // Insert in level order
    insert(value) {
        const newNode = new TreeNode(value);

        if (!this.root) {
            this.root = newNode;
            return;
        }

        const queue = [this.root];
        while (queue.length > 0) {
            const current = queue.shift();

            if (!current.left) {
                current.left = newNode;
                return;
            } else {
                queue.push(current.left);
            }

            if (!current.right) {
                current.right = newNode;
                return;
            } else {
                queue.push(current.right);
            }
        }
    }

    // Inorder traversal (Left, Root, Right)
    inorder(node = this.root, result = []) {
        if (!node) return result;

        this.inorder(node.left, result);
        result.push(node.value);
        this.inorder(node.right, result);

        return result;
    }
}
\`\`\`

### 🔄 Tree Traversals:
1. **Preorder**: Root → Left → Right
2. **Inorder**: Left → Root → Right
3. **Postorder**: Left → Right → Root
4. **Level Order**: BFS approach

### 📊 Time Complexity:
- Traversal: O(n)
- Search: O(n) in BT, O(log n) in BST
- Insert/Delete: O(n) in BT, O(log n) in BST`,

  // Graph
  graph: `## 🕸️ Graph Data Structure
Collection of vertices/nodes connected by edges.

### 🔧 Types:
1. **Directed Graph** - Edges have direction
2. **Undirected Graph** - Edges have no direction
3. **Weighted Graph** - Edges have weights
4. **Unweighted Graph** - All edges equal

### 💻 Graph Implementation (Adjacency List):
\`\`\`javascript
class Graph {
    constructor() {
        this.adjacencyList = new Map();
    }

    addVertex(vertex) {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, []);
        }
    }

    addEdge(vertex1, vertex2) {
        this.adjacencyList.get(vertex1).push(vertex2);
        this.adjacencyList.get(vertex2).push(vertex1); // Undirected
    }

    bfs(start) {
        const queue = [start];
        const visited = new Set([start]);
        const result = [];

        while (queue.length > 0) {
            const vertex = queue.shift();
            result.push(vertex);

            for (const neighbor of this.adjacencyList.get(vertex)) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            }
        }

        return result;
    }

    dfs(start) {
        const stack = [start];
        const visited = new Set();
        const result = [];

        while (stack.length > 0) {
            const vertex = stack.pop();

            if (!visited.has(vertex)) {
                visited.add(vertex);
                result.push(vertex);

                for (const neighbor of this.adjacencyList.get(vertex)) {
                    stack.push(neighbor);
                }
            }
        }

        return result;
    }
}
\`\`\`

### 📊 Time Complexity:
- BFS/DFS: O(V + E)
- Space: O(V)

### 🎯 Applications:
- Social networks
- Maps and navigation
- Network routing
- Recommendation systems`,

  // Sorting Algorithms
  sort: `## 📊 Sorting Algorithms
Arranging elements in specific order (ascending/descending).

### 🏆 Comparison of Common Sorts:

| Algorithm | Best | Average | Worst | Space | Stable |
|-----------|------|---------|-------|-------|--------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) | No |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | No |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) | No |

### 💻 Quick Sort Implementation:
\`\`\`javascript
function quickSort(arr, left = 0, right = arr.length - 1) {
    if (left < right) {
        const pivotIndex = partition(arr, left, right);
        quickSort(arr, left, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, right);
    }
    return arr;
}

function partition(arr, left, right) {
    const pivot = arr[right];
    let i = left - 1;

    for (let j = left; j < right; j++) {
        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
    return i + 1;
}
\`\`\`

### 💻 Merge Sort Implementation:
\`\`\`javascript
function mergeSort(arr) {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }

    return result.concat(left.slice(i)).concat(right.slice(j));
}
\`\`\``,

  // Time Complexity
  "time complexity": `## ⏱️ Time Complexity Analysis
Measure of algorithm efficiency based on input size.

### 📈 Big O Notation Hierarchy:
O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!)

### 📚 Common Complexities:

**O(1) - Constant Time:**
\`\`\`javascript
function getFirst(arr) {
    return arr[0]; // Always takes same time
}
\`\`\`

**O(log n) - Logarithmic Time:**
\`\`\`javascript
function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
\`\`\`

**O(n) - Linear Time:**
\`\`\`javascript
function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) return i;
    }
    return -1;
}
\`\`\`

**O(n²) - Quadratic Time:**
\`\`\`javascript
function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}
\`\`\`

### 🎯 Space Complexity:
- Amount of memory required
- Includes input space + auxiliary space`,

  // Hash Table
  hash: `## 🔑 Hash Table (HashMap)
Key-value store using hash function.

### 💻 Implementation:
\`\`\`javascript
class HashTable {
    constructor(size = 53) {
        this.keyMap = new Array(size);
    }

    _hash(key) {
        let total = 0;
        const PRIME = 31;
        for (let i = 0; i < Math.min(key.length, 100); i++) {
            const char = key[i];
            const value = char.charCodeAt(0) - 96;
            total = (total * PRIME + value) % this.keyMap.length;
        }
        return total;
    }

    set(key, value) {
        const index = this._hash(key);
        if (!this.keyMap[index]) {
            this.keyMap[index] = [];
        }
        this.keyMap[index].push([key, value]);
    }

    get(key) {
        const index = this._hash(key);
        if (this.keyMap[index]) {
            for (let i = 0; i < this.keyMap[index].length; i++) {
                if (this.keyMap[index][i][0] === key) {
                    return this.keyMap[index][i][1];
                }
            }
        }
        return undefined;
    }
}
\`\`\`

### 📊 Time Complexity (Average):
- Insert: O(1)
- Search: O(1)
- Delete: O(1)

### 🎯 Applications:
- Databases
- Caching
- Symbol tables
- Sets implementation`,

  // Dynamic Programming
  "dynamic programming": `## 🧠 Dynamic Programming
Solving complex problems by breaking into simpler subproblems.

### 🔧 Key Concepts:
1. **Optimal Substructure** - Optimal solution from subproblems
2. **Overlapping Subproblems** - Recurring calculations

### 💻 Fibonacci (Memoization):
\`\`\`javascript
function fibonacciMemo(n, memo = {}) {
    if (n <= 1) return n;
    if (memo[n]) return memo[n];

    memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
    return memo[n];
}
\`\`\`

### 💻 Fibonacci (Tabulation):
\`\`\`javascript
function fibonacciTab(n) {
    if (n <= 1) return n;

    const dp = new Array(n + 1);
    dp[0] = 0;
    dp[1] = 1;

    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];
}
\`\`\`

### 🎯 Classic DP Problems:
- Fibonacci sequence
- Knapsack problem
- Longest Common Subsequence
- Coin Change problem
- Matrix Chain Multiplication`,

  // Heap
  heap: `## 📚 Heap Data Structure
Complete binary tree with heap property.

### 🔧 Types:
1. **Max Heap** - Parent ≥ Children
2. **Min Heap** - Parent ≤ Children

### 💻 Min Heap Implementation:
\`\`\`javascript
class MinHeap {
    constructor() {
        this.heap = [];
    }

    getParentIndex(i) { return Math.floor((i - 1) / 2); }
    getLeftChildIndex(i) { return 2 * i + 1; }
    getRightChildIndex(i) { return 2 * i + 2; }

    insert(value) {
        this.heap.push(value);
        this.bubbleUp(this.heap.length - 1);
    }

    bubbleUp(index) {
        while (index > 0) {
            const parentIndex = this.getParentIndex(index);
            if (this.heap[parentIndex] <= this.heap[index]) break;

            [this.heap[parentIndex], this.heap[index]] =
            [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }

    extractMin() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown(0);
        return min;
    }

    bubbleDown(index) {
        const length = this.heap.length;
        while (true) {
            let smallest = index;
            const left = this.getLeftChildIndex(index);
            const right = this.getRightChildIndex(index);

            if (left < length && this.heap[left] < this.heap[smallest]) {
                smallest = left;
            }

            if (right < length && this.heap[right] < this.heap[smallest]) {
                smallest = right;
            }

            if (smallest === index) break;

            [this.heap[index], this.heap[smallest]] =
            [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }
}
\`\`\`

### 📊 Time Complexity:
- Insert: O(log n)
- Extract Min/Max: O(log n)
- Get Min/Max: O(1)
- Build Heap: O(n)

### 🎯 Applications:
- Priority Queue
- Heap Sort
- Dijkstra's Algorithm
- Median maintenance`,

  // Recursion
  recursion: `## 🔄 Recursion
Function calling itself to solve smaller instances.

### 📝 Key Elements:
1. **Base Case** - Stopping condition
2. **Recursive Case** - Calls itself
3. **Progress** - Moves toward base case

### 💻 Factorial Example:
\`\`\`javascript
function factorial(n) {
    // Base case
    if (n <= 1) return 1;

    // Recursive case
    return n * factorial(n - 1);
}
\`\`\`

### 💻 Recursive Sum of Array:
\`\`\`javascript
function sumArray(arr, index = 0) {
    // Base case
    if (index === arr.length) return 0;

    // Recursive case
    return arr[index] + sumArray(arr, index + 1);
}
\`\`\`

### 💻 Binary Search Tree Search (Recursive):
\`\`\`javascript
function searchBST(root, target) {
    if (!root) return false;
    if (root.value === target) return true;

    if (target < root.value) {
        return searchBST(root.left, target);
    } else {
        return searchBST(root.right, target);
    }
}
\`\`\`

### ⚠️ Common Pitfalls:
- No base case → infinite recursion
- No progress → infinite recursion
- Stack overflow for deep recursion
- High memory usage

### 🎯 Applications:
- Tree/Graph traversals
- Divide and conquer algorithms
- Backtracking algorithms
- Dynamic programming`,

  // Searching Algorithms
  search: `## 🔍 Searching Algorithms
Finding elements in data structures.

### 🎯 Linear Search:
\`\`\`javascript
function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) return i;
    }
    return -1;
}
// Time: O(n), Space: O(1)
\`\`\`

### 🎯 Binary Search:
\`\`\`javascript
function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) return mid;

        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1;
}
// Time: O(log n), Space: O(1)
// Prerequisite: Sorted array
\`\`\`

### 🎯 Depth-First Search (DFS):
\`\`\`javascript
function dfs(graph, start) {
    const stack = [start];
    const visited = new Set();
    const result = [];

    while (stack.length > 0) {
        const vertex = stack.pop();

        if (!visited.has(vertex)) {
            visited.add(vertex);
            result.push(vertex);

            for (const neighbor of graph[vertex]) {
                stack.push(neighbor);
            }
        }
    }

    return result;
}
// Time: O(V + E), Space: O(V)
\`\`\`

### 🎯 Breadth-First Search (BFS):
\`\`\`javascript
function bfs(graph, start) {
    const queue = [start];
    const visited = new Set([start]);
    const result = [];

    while (queue.length > 0) {
        const vertex = queue.shift();
        result.push(vertex);

        for (const neighbor of graph[vertex]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }

    return result;
}
// Time: O(V + E), Space: O(V)
\`\`\`

### 📊 Comparison:
| Algorithm | Best | Worst | Space | When to Use |
|-----------|------|-------|-------|-------------|
| Linear | O(1) | O(n) | O(1) | Unsorted, small data |
| Binary | O(1) | O(log n) | O(1) | Sorted array |
| DFS | O(V + E) | O(V + E) | O(V) | Path finding |
| BFS | O(V + E) | O(V + E) | O(V) | Shortest path |
| Hash Search | O(1) | O(n) | O(n) | Frequent lookups |`,

  // Big O Cheatsheet
  "big o": `## 📋 Big O Cheatsheet

### 🏆 Common Data Structure Operations:

**Array:**
- Access: O(1)
- Search: O(n)
- Insert at end: O(1)
- Insert at beginning: O(n)
- Delete from end: O(1)
- Delete from beginning: O(n)

**Linked List:**
- Access: O(n)
- Search: O(n)
- Insert at beginning: O(1)
- Delete at beginning: O(1)
- Insert at end: O(1) with tail, O(n) without
- Delete at end: O(n)

**Stack (using array):**
- Push: O(1)
- Pop: O(1)
- Peek: O(1)
- Search: O(n)

**Queue (using array):**
- Enqueue: O(1)
- Dequeue: O(1)
- Front: O(1)
- Search: O(n)

**Hash Table:**
- Insert: O(1) average, O(n) worst
- Search: O(1) average, O(n) worst
- Delete: O(1) average, O(n) worst

**Binary Search Tree:**
- Access: O(log n) average, O(n) worst
- Search: O(log n) average, O(n) worst
- Insert: O(log n) average, O(n) worst
- Delete: O(log n) average, O(n) worst

**Heap:**
- Insert: O(log n)
- Delete max/min: O(log n)
- Find max/min: O(1)
- Build heap: O(n)

### 🏆 Common Algorithm Complexities:

**Sorting:**
- Bubble Sort: O(n²)
- Selection Sort: O(n²)
- Insertion Sort: O(n²)
- Merge Sort: O(n log n)
- Quick Sort: O(n log n) average, O(n²) worst
- Heap Sort: O(n log n)

**Graph Algorithms:**
- BFS: O(V + E)
- DFS: O(V + E)
- Dijkstra (with binary heap): O((V + E) log V)
- Bellman-Ford: O(VE)

### 💡 Rules for Analysis:
1. **Different inputs = different variables**
2. **Drop constants**: O(2n) → O(n)
3. **Drop non-dominant terms**: O(n² + n) → O(n²)
4. **Worst case usually considered**
5. **Space complexity includes auxiliary space**`,
};

// Helper function to match keywords in question
function findBestMatch(question) {
  const q = question.toLowerCase();
  const keywords = {
    stack: ["stack", "lifo", "push", "pop"],
    queue: ["queue", "fifo", "enqueue", "dequeue"],
    "linked list": ["linked list", "singly", "doubly", "circular", "node"],
    tree: ["tree", "binary", "bst", "avl", "heap", "traversal"],
    graph: ["graph", "vertex", "edge", "bfs", "dfs", "adjacency"],
    sort: ["sort", "quicksort", "mergesort", "bubblesort", "insertion"],
    "time complexity": ["time complexity", "big o", "o(n)", "complexity"],
    hash: ["hash", "hashmap", "hashtable", "dictionary"],
    "dynamic programming": [
      "dynamic programming",
      "dp",
      "memoization",
      "tabulation",
    ],
    heap: ["heap", "min heap", "max heap", "priority queue"],
    recursion: ["recursion", "recursive", "base case"],
    search: ["search", "linear search", "binary search", "bfs", "dfs"],
    "big o": ["big o", "cheatsheet", "complexity chart"],
  };

  let maxMatches = 0;
  let bestTopic = "stack"; // default

  for (const [topic, words] of Object.entries(keywords)) {
    const matches = words.filter((word) => q.includes(word)).length;
    if (matches > maxMatches) {
      maxMatches = matches;
      bestTopic = topic;
    }
  }

  return bestTopic;
}

// ==================== API ENDPOINTS ====================

// Register user
app.post("/api/register", (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "All fields required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: "Password must be 6+ characters",
      });
    }

    // Check if user exists
    if (usersDB.find((u) => u.email === email)) {
      return res.status(400).json({
        success: false,
        error: "Email already registered",
      });
    }

    // Create user
    const user = {
      id: Date.now(),
      name,
      email,
      passwordHash: hashPassword(password),
      createdAt: new Date().toISOString(),
    };

    usersDB.push(user);

    res.json({
      success: true,
      message: `Welcome ${name}!`,
      user: { id: user.id, name, email },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
});

// Login user
app.post("/api/login", (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email and password required",
      });
    }

    const user = usersDB.find((u) => u.email === email);

    if (!user || user.passwordHash !== hashPassword(password)) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    res.json({
      success: true,
      message: "Login successful",
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
});

// Reset password
app.post("/api/reset-password", (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({
        success: false,
        error: "Email and new password required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        error: "Password must be 6+ characters",
      });
    }

    const userIndex = usersDB.findIndex((u) => u.email === email);

    if (userIndex === -1) {
      return res.json({
        success: true,
        message: "If account exists, password updated",
      });
    }

    usersDB[userIndex].passwordHash = hashPassword(newPassword);

    res.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
});

// Enhanced DSA Tutor endpoint
app.post("/api/ask", (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        error: "Question required",
      });
    }

    const bestTopic = findBestMatch(question);
    let answer = dsaKnowledge[bestTopic] || dsaKnowledge.stack;

    // Add personalized intro
    answer = `## 🤖 DSA Tutor Answer\nBased on your question: **"${question}"**\n\n${answer}`;

    // Add follow-up suggestions
    answer += `\n\n### 🔍 Need More Help?\nTry asking about:\n- Code implementation for specific operations\n- Real-world use cases\n- Time/Space complexity analysis\n- Comparison with other data structures\n- Common interview questions`;

    res.json({
      success: true,
      answer: answer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
});

// Get all users (for debugging)
app.get("/api/users", (req, res) => {
  res.json({
    success: true,
    count: usersDB.length,
    users: usersDB.map((u) => ({ id: u.id, name: u.name, email: u.email })),
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    users: usersDB.length,
    topics: Object.keys(dsaKnowledge).length,
    time: new Date().toISOString(),
  });
});

// Get available topics
app.get("/api/topics", (req, res) => {
  res.json({
    success: true,
    topics: Object.keys(dsaKnowledge),
    count: Object.keys(dsaKnowledge).length,
  });
});

// ==================== HTML ROUTES ====================

// Clean URL routes (recommended)
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public/HTML/login.html"));
});

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "public/HTML/signUp.html"));
});

app.get("/forgot-password", (req, res) => {
  res.sendFile(path.join(__dirname, "public/HTML/passforget.html"));
});

app.get("/main", (req, res) => {
  res.sendFile(path.join(__dirname, "public/HTML/mainPage.html"));
});

// Route for /passforget.html (FIXED ERROR)
app.get("/passforget.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public/HTML/passforget.html"));
});

// Additional pages
app.get("/arrays", (req, res) => {
  res.sendFile(path.join(__dirname, "public/HTML/arrays.html"));
});

app.get("/datastructures", (req, res) => {
  res.sendFile(path.join(__dirname, "public/HTML/dataStructur.html"));
});

app.get("/queue", (req, res) => {
  res.sendFile(path.join(__dirname, "public/HTML/queue.html"));
});

app.get("/linkedlist", (req, res) => {
  res.sendFile(path.join(__dirname, "public/HTML/List_Visualizer.html"));
});

app.get("/algorithm-visualizer", (req, res) => {
  res.sendFile(path.join(__dirname, "public/HTML/algoViz.html"));
});

app.get("/editor", (req, res) => {
  res.sendFile(path.join(__dirname, "public/HTML/editor.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public/HTML/contact.html"));
});

app.get("/help", (req, res) => {
  res.sendFile(path.join(__dirname, "public/HTML/help.html"));
});

// Legacy routes (your current URLs)
app.get("/public/HTML/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public/HTML/login.html"));
});

app.get("/public/HTML/signUp", (req, res) => {
  res.sendFile(path.join(__dirname, "public/HTML/signUp.html"));
});

app.get("/public/HTML/passforget", (req, res) => {
  res.sendFile(path.join(__dirname, "public/HTML/passforget.html"));
});

app.get("/public/HTML/mainPage", (req, res) => {
  res.sendFile(path.join(__dirname, "public/HTML/mainPage.html"));
});

// ==================== FALLBACK ROUTES ====================
// For direct .html file access
app.get("/public/HTML/login.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public/HTML/login.html"));
});

app.get("/public/HTML/signUp.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public/HTML/signUp.html"));
});

app.get("/public/HTML/mainPage.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public/HTML/mainPage.html"));
});

// Main home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Serve any other .html file from HTML directory
app.get("*.html", (req, res) => {
  const requestedFile = req.path;
  const filePath = path.join(__dirname, "public/HTML", requestedFile);

  if (fs.existsSync(filePath)) {
    return res.sendFile(filePath);
  }

  // Try root directory
  const rootPath = path.join(__dirname, requestedFile);
  if (fs.existsSync(rootPath)) {
    return res.sendFile(rootPath);
  }

  // Not found
  res.status(404).send(`
        <html>
            <head><title>404 - Page Not Found</title></head>
            <body style="font-family: Arial; padding: 40px; text-align: center;">
                <h1>404 - Page Not Found</h1>
                <p>The page you're looking for doesn't exist.</p>
                <p>Try one of these pages:</p>
                <ul style="list-style: none; padding: 20px;">
                    <li><a href="/">Home</a></li>
                    <li><a href="/login">Login</a></li>
                    <li><a href="/signup">Sign Up</a></li>
                    <li><a href="/forgot-password">Forgot Password</a></li>
                    <li><a href="/main">Main Page</a></li>
                </ul>
            </body>
        </html>
    `);
});

// 404 handler for all other routes
app.use((req, res) => {
  res.status(404).send(`
        <html>
            <head><title>404 - Page Not Found</title></head>
            <body style="font-family: Arial; padding: 40px; text-align: center;">
                <h1>404 - Page Not Found</h1>
                <p>Route: ${req.path}</p>
                <p>Available routes:</p>
                <ul style="list-style: none; padding: 20px;">
                    <li><a href="/">Home</a></li>
                    <li><a href="/login">Login</a></li>
                    <li><a href="/signup">Sign Up</a></li>
                    <li><a href="/forgot-password">Forgot Password</a></li>
                    <li><a href="/main">Main Page</a></li>
                </ul>
            </body>
        </html>
    `);
});

// ==================== START SERVER ====================
app.listen(PORT, () => {
  console.log(`🚀 Server running: http://localhost:${PORT}`);
  console.log(`📂 Root: ${__dirname}`);
  console.log(`\n🤖 ENHANCED DSA TUTOR FEATURES:`);
  console.log(`✅ Advanced topic detection`);
  console.log(`✅ 12+ DSA topics covered`);
  console.log(`✅ Code examples for all concepts`);
  console.log(`✅ Time complexity analysis`);
  console.log(`✅ Real-world applications`);
  console.log(`\n🌐 MAIN URLS:`);
  console.log(`✅ http://localhost:${PORT}/ (Home)`);
  console.log(`✅ http://localhost:${PORT}/login`);
  console.log(`✅ http://localhost:${PORT}/signup`);
  console.log(`✅ http://localhost:${PORT}/forgot-password`);
  console.log(`✅ http://localhost:${PORT}/passforget.html (FIXED)`);
  console.log(`✅ http://localhost:${PORT}/main`);
  console.log(`✅ http://localhost:${PORT}/arrays`);
  console.log(`✅ http://localhost:${PORT}/queue`);
  console.log(`✅ http://localhost:${PORT}/linkedlist`);
  console.log(`\n🔧 LEGACY URLS (also work):`);
  console.log(`✅ http://localhost:${PORT}/public/HTML/login`);
  console.log(`✅ http://localhost:${PORT}/public/HTML/signUp`);
  console.log(`✅ http://localhost:${PORT}/public/HTML/passforget`);
  console.log(`✅ http://localhost:${PORT}/public/HTML/mainPage`);
  console.log(`\n📁 STATIC FILES:`);
  console.log(`✅ http://localhost:${PORT}/JS/login.js`);
  console.log(`✅ http://localhost:${PORT}/public/JS/login.js`);
  console.log(`✅ http://localhost:${PORT}/CSS/ (CSS files)`);
  console.log(`\n🔗 API ENDPOINTS:`);
  console.log(`✅ POST http://localhost:${PORT}/api/register`);
  console.log(`✅ POST http://localhost:${PORT}/api/login`);
  console.log(`✅ POST http://localhost:${PORT}/api/reset-password`);
  console.log(`✅ POST http://localhost:${PORT}/api/ask (Enhanced!)`);
  console.log(`✅ GET  http://localhost:${PORT}/api/health`);
  console.log(`✅ GET  http://localhost:${PORT}/api/users`);
  console.log(`✅ GET  http://localhost:${PORT}/api/topics (NEW!)`);
});
