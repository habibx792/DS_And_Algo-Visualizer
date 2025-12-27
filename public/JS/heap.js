document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const insertBtn = document.getElementById("insertBtn");
  const extractBtn = document.getElementById("extractBtn");
  const peekBtn = document.getElementById("peekBtn");
  const clearBtn = document.getElementById("clearBtn");
  const minHeapBtn = document.getElementById("minHeapBtn");
  const maxHeapBtn = document.getElementById("maxHeapBtn");
  const buildHeapBtn = document.getElementById("buildHeapBtn");
  const heapValue = document.getElementById("heapValue");
  const heapContainer = document.getElementById("heapContainer");
  const heapType = document.getElementById("heapType");
  const heapRoot = document.getElementById("heapRoot");
  const heapSize = document.getElementById("heapSize");
  const heapHeight = document.getElementById("heapHeight");
  const heapArray = document.getElementById("heapArray");
  const operationLog = document.getElementById("operationLog");

  // Heap class
  class Heap {
    constructor(type = "min") {
      this.type = type; // 'min' or 'max'
      this.heap = [];
      this.comparator = type === "min" ? (a, b) => a < b : (a, b) => a > b;
    }

    size() {
      return this.heap.length;
    }

    isEmpty() {
      return this.heap.length === 0;
    }

    peek() {
      return this.isEmpty() ? null : this.heap[0];
    }

    insert(value) {
      this.heap.push(value);
      this.heapifyUp(this.heap.length - 1);
      return true;
    }

    extract() {
      if (this.isEmpty()) return null;

      const root = this.heap[0];
      const last = this.heap.pop();

      if (this.size() > 0) {
        this.heap[0] = last;
        this.heapifyDown(0);
      }

      return root;
    }

    heapifyUp(index) {
      while (index > 0) {
        const parentIndex = Math.floor((index - 1) / 2);
        if (this.comparator(this.heap[index], this.heap[parentIndex])) {
          this.swap(index, parentIndex);
          index = parentIndex;
        } else {
          break;
        }
      }
    }

    heapifyDown(index) {
      const lastIndex = this.size() - 1;

      while (true) {
        let extremeIndex = index;
        const leftChild = 2 * index + 1;
        const rightChild = 2 * index + 2;

        if (
          leftChild <= lastIndex &&
          this.comparator(this.heap[leftChild], this.heap[extremeIndex])
        ) {
          extremeIndex = leftChild;
        }

        if (
          rightChild <= lastIndex &&
          this.comparator(this.heap[rightChild], this.heap[extremeIndex])
        ) {
          extremeIndex = rightChild;
        }

        if (extremeIndex !== index) {
          this.swap(index, extremeIndex);
          index = extremeIndex;
        } else {
          break;
        }
      }
    }

    swap(i, j) {
      [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    buildHeapFromArray(arr) {
      this.heap = [...arr];
      for (let i = Math.floor(this.size() / 2) - 1; i >= 0; i--) {
        this.heapifyDown(i);
      }
    }

    getHeight() {
      if (this.isEmpty()) return 0;
      return Math.floor(Math.log2(this.size())) + 1;
    }

    getHeapArray() {
      return [...this.heap];
    }

    // Helper methods for visualization
    getParentIndex(i) {
      return Math.floor((i - 1) / 2);
    }

    getLeftChildIndex(i) {
      return 2 * i + 1;
    }

    getRightChildIndex(i) {
      return 2 * i + 2;
    }
  }

  // Initialize heap
  let heap = new Heap("min");

  // Event Listeners
  insertBtn.addEventListener("click", insertValue);
  extractBtn.addEventListener("click", extractValue);
  peekBtn.addEventListener("click", peekValue);
  clearBtn.addEventListener("click", clearHeap);
  minHeapBtn.addEventListener("click", () => switchHeapType("min"));
  maxHeapBtn.addEventListener("click", () => switchHeapType("max"));
  buildHeapBtn.addEventListener("click", buildHeapFromInput);

  // Allow Enter key for insert
  heapValue.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      insertValue();
    }
  });

  // Heap Operations
  function insertValue() {
    const value = heapValue.value.trim();

    if (!value) {
      showLog("Please enter a value to insert", "error");
      return;
    }

    const numValue = parseInt(value);
    if (isNaN(numValue)) {
      showLog("Please enter a valid number", "error");
      return;
    }

    if (heap.size() >= 31) {
      showLog("Heap capacity reached! Maximum 31 nodes allowed", "error");
      return;
    }

    heap.insert(numValue);
    heapValue.value = "";
    showLog(`Inserted ${numValue} into ${heap.type} heap`, "success");
    updateHeapInfo();
    updateArrayDisplay();
    drawHeap();
  }

  function extractValue() {
    if (heap.isEmpty()) {
      showLog("Heap is empty!", "error");
      return;
    }

    const extracted = heap.extract();
    showLog(`Extracted ${extracted} from ${heap.type} heap`, "success");
    updateHeapInfo();
    updateArrayDisplay();
    drawHeap();
  }

  function peekValue() {
    if (heap.isEmpty()) {
      showLog("Heap is empty!", "error");
      return;
    }

    const root = heap.peek();
    showLog(`Root element: ${root}`, "info");

    // Highlight the root
    highlightNode(0, "peek");
  }

  function clearHeap() {
    if (heap.isEmpty()) {
      showLog("Heap is already empty!", "info");
      return;
    }

    heap = new Heap(heap.type);
    showLog("Heap cleared", "success");
    updateHeapInfo();
    updateArrayDisplay();
    drawHeap();
  }

  function switchHeapType(type) {
    if (heap.type === type) return;

    // Convert current heap to new type
    const oldHeapArray = heap.getHeapArray();
    heap = new Heap(type);

    // Rebuild heap with existing values
    heap.buildHeapFromArray(oldHeapArray);

    // Update UI
    heapType.textContent = type === "min" ? "Min Heap" : "Max Heap";

    // Update button styles
    if (type === "min") {
      minHeapBtn.classList.add("bg-green-700");
      minHeapBtn.classList.remove("bg-green-600");
      maxHeapBtn.classList.add("bg-blue-600");
      maxHeapBtn.classList.remove("bg-blue-700");
    } else {
      maxHeapBtn.classList.add("bg-blue-700");
      maxHeapBtn.classList.remove("bg-blue-600");
      minHeapBtn.classList.add("bg-green-600");
      minHeapBtn.classList.remove("bg-green-700");
    }

    showLog(`Switched to ${type} heap`, "info");
    updateHeapInfo();
    updateArrayDisplay();
    drawHeap();
  }

  function buildHeapFromInput() {
    const input = prompt(
      "Enter numbers separated by commas (e.g., 10,20,30,40,50):"
    );
    if (!input) return;

    const numbers = input
      .split(",")
      .map((num) => parseInt(num.trim()))
      .filter((num) => !isNaN(num));

    if (numbers.length === 0) {
      showLog("Please enter valid numbers", "error");
      return;
    }

    if (numbers.length > 31) {
      showLog("Maximum 31 elements allowed", "error");
      return;
    }

    heap.buildHeapFromArray(numbers);
    showLog(`Built ${heap.type} heap from array`, "success");
    updateHeapInfo();
    updateArrayDisplay();
    drawHeap();
  }

  function updateHeapInfo() {
    heapType.textContent = heap.type === "min" ? "Min Heap" : "Max Heap";
    heapRoot.textContent = heap.isEmpty() ? "None" : heap.peek();
    heapSize.textContent = heap.size();
    heapHeight.textContent = heap.getHeight();
  }

  function updateArrayDisplay() {
    const array = heap.getHeapArray();
    heapArray.innerHTML = "";

    if (array.length === 0) {
      heapArray.innerHTML = '<span class="text-gray-400">[ ]</span>';
      return;
    }

    heapArray.innerHTML = array
      .map(
        (value, index) =>
          `<span class="px-3 py-1 rounded-md bg-violet-700/30 border border-violet-500 heap-index" data-index="${index}">${value}</span>`
      )
      .join(" ");

    // Add click handlers to array elements
    document.querySelectorAll(".heap-index").forEach((element) => {
      element.addEventListener("click", () => {
        const index = parseInt(element.dataset.index);
        highlightNode(index, "select");
      });
    });
  }

  function showLog(message, type = "info") {
    const colors = {
      success: "text-green-400",
      error: "text-red-400",
      info: "text-yellow-400",
    };

    operationLog.innerHTML = `<span class="${colors[type]}">${message}</span>`;

    // Clear log after 3 seconds
    setTimeout(() => {
      if (operationLog.textContent.includes(message)) {
        operationLog.textContent = "-";
      }
    }, 3000);
  }

  // Drawing functions
  function drawHeap() {
    heapContainer.innerHTML = "";

    if (heap.isEmpty()) {
      const emptyMessage = document.createElement("div");
      emptyMessage.className = "text-gray-400 text-lg";
      emptyMessage.textContent = "Heap is empty";
      heapContainer.appendChild(emptyMessage);
      return;
    }

    // Calculate positions for complete binary tree
    const positions = calculateHeapPositions();

    // Draw edges first
    drawHeapEdges(positions);

    // Draw nodes
    drawHeapNodes(positions);
  }

  function calculateHeapPositions() {
    const positions = new Map();
    if (heap.isEmpty()) return positions;

    const heapArray = heap.getHeapArray();
    const totalNodes = heapArray.length;
    const height = heap.getHeight();

    // Calculate tree width based on height
    const maxWidth = Math.pow(2, height - 1) * 120;
    const startX = 400; // Center
    const levelHeight = 100;

    for (let i = 0; i < totalNodes; i++) {
      const level = Math.floor(Math.log2(i + 1));
      const nodesInLevel = Math.pow(2, level);
      const nodeIndexInLevel = i - (Math.pow(2, level) - 1);

      // Calculate horizontal position
      const levelWidth = Math.pow(2, height - level - 1) * 120;
      const x =
        startX -
        levelWidth / 2 +
        (nodeIndexInLevel + 0.5) * (levelWidth / nodesInLevel);
      const y = 50 + level * levelHeight;

      positions.set(i, {
        x: x,
        y: y,
        value: heapArray[i],
        level: level,
      });
    }

    return positions;
  }

  function drawHeapEdges(positions) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "800");
    svg.setAttribute("height", "600");
    svg.classList.add("absolute", "top-0", "left-0", "z-0");

    for (const [index, data] of positions) {
      const leftChildIndex = heap.getLeftChildIndex(index);
      const rightChildIndex = heap.getRightChildIndex(index);

      if (positions.has(leftChildIndex)) {
        const childData = positions.get(leftChildIndex);
        const line = createLine(
          data.x,
          data.y + 25,
          childData.x,
          childData.y - 25
        );
        svg.appendChild(line);
      }

      if (positions.has(rightChildIndex)) {
        const childData = positions.get(rightChildIndex);
        const line = createLine(
          data.x,
          data.y + 25,
          childData.x,
          childData.y - 25
        );
        svg.appendChild(line);
      }
    }

    heapContainer.appendChild(svg);
  }

  function createLine(x1, y1, x2, y2) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", "#8b5cf6");
    line.setAttribute("stroke-width", "2");
    return line;
  }

  function drawHeapNodes(positions) {
    for (const [index, data] of positions) {
      const nodeElement = createNodeElement(data.x, data.y, data.value, index);
      heapContainer.appendChild(nodeElement);
    }
  }

  function createNodeElement(x, y, value, index) {
    const nodeElement = document.createElement("div");
    nodeElement.className = `
            absolute w-14 h-14 border-2 border-violet-500 rounded-full
            bg-gradient-to-br from-violet-600/70 to-purple-600/70
            flex flex-col items-center justify-center text-white font-bold
            shadow-lg cursor-pointer transform -translate-x-1/2 -translate-y-1/2
            hover:scale-110 hover:border-yellow-500 transition-all duration-300
        `;

    nodeElement.style.left = `${x}px`;
    nodeElement.style.top = `${y}px`;

    // Create content with value and index
    nodeElement.innerHTML = `
            <div class="text-lg">${value}</div>
            <div class="text-xs opacity-70">[${index}]</div>
        `;

    nodeElement.dataset.index = index;
    nodeElement.dataset.value = value;

    nodeElement.addEventListener("click", () => {
      heapValue.value = value;
      highlightNode(index, "select");
    });

    return nodeElement;
  }

  function highlightNode(index, type = "select") {
    // Remove previous highlights
    document.querySelectorAll(".heap-node-highlighted").forEach((el) => {
      el.classList.remove(
        "heap-node-highlighted",
        "bg-green-600/70",
        "bg-yellow-600/70",
        "animate-pulse"
      );
    });

    // Highlight node in visualization
    const nodeElement = heapContainer.querySelector(`[data-index="${index}"]`);
    if (nodeElement) {
      nodeElement.classList.add("heap-node-highlighted");
      if (type === "peek") {
        nodeElement.classList.add("bg-yellow-600/70", "animate-pulse");
      } else {
        nodeElement.classList.add("bg-green-600/70", "animate-pulse");
      }

      // Remove highlight after 2 seconds
      setTimeout(() => {
        nodeElement.classList.remove(
          "heap-node-highlighted",
          "bg-green-600/70",
          "bg-yellow-600/70",
          "animate-pulse"
        );
      }, 2000);
    }

    // Also highlight in array display
    const arrayElement = heapArray.querySelector(`[data-index="${index}"]`);
    if (arrayElement) {
      arrayElement.classList.add("bg-green-600/50", "border-green-400");
      setTimeout(() => {
        arrayElement.classList.remove("bg-green-600/50", "border-green-400");
      }, 2000);
    }
  }

  // Initialize
  updateHeapInfo();
  updateArrayDisplay();
  drawHeap();

  // Initialize button styles
  minHeapBtn.classList.add("bg-green-700");
});
