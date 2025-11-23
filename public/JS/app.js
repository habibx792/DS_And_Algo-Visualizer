
(() => {
 
  const arrayInput = document.getElementById("arrayInput");
  const useBtn = document.getElementById("useBtn");
  const randomBtn = document.getElementById("randomBtn");
  const shuffleBtn = document.getElementById("shuffleBtn");
  const clearBtn = document.getElementById("clearBtn");

  const sizeRange = document.getElementById("sizeRange");
  const sizeVal = document.getElementById("sizeVal");
  const speedRange = document.getElementById("speedRange");
  const speedVal = document.getElementById("speedVal");

  const algoSelect = document.getElementById("algoSelect");
  const orderRadios = document.getElementsByName("order");

  const playBtn = document.getElementById("playBtn");
  const pauseBtn = document.getElementById("pauseBtn");
  const stepBtn = document.getElementById("stepBtn");
  const resetBtn = document.getElementById("resetBtn");

  const linearBtn = document.getElementById("linearBtn");
  const binaryBtn = document.getElementById("binaryBtn");
  const searchInput = document.getElementById("searchInput");

  const canvas = document.getElementById("canvas");
  const elemCount = document.getElementById("elemCount");
  const algoName = document.getElementById("algoName");
  const currentOp = document.getElementById("currentOp");
  const statusText = document.getElementById("statusText");

  const snapshotBtn = document.getElementById("snapshotBtn");


  let arr = [];
  let original = [];
  let bars = [];
  let running = false;
  let paused = false;
  let iterator = null; 
  let speed = Number(speedRange.value); 

  const setStatus = (s) => {
    statusText.textContent = s;
  };
  const setCurrent = (s) => {
    currentOp.textContent = s;
    algoName.textContent = s;
  };

  function parseInput(text) {
    if (!text) return [];
    return text
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((x) => Number(x))
      .filter((x) => Number.isFinite(x));
  }

  function randomArray(n) {
    const out = [];
    for (let i = 0; i < n; i++) out.push(Math.floor(Math.random() * 100) + 3);
    return out;
  }

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function render(a) {
    canvas.innerHTML = "";
    bars = [];
    const max = Math.max(...a, 1);
    const min = Math.min(...a, 0);
    elemCount.textContent = a.length;

    a.forEach((v, i) => {
      const bar = document.createElement("div");
      bar.className = "bar";
      const pct = (v - min) / (max - min || 1);
      const height = Math.max(6, pct * 90);
      bar.style.height = height + "%";

      const label = document.createElement("div");
      label.className = "label";
      label.textContent = v;
      bar.appendChild(label);
      canvas.appendChild(bar);
      bars.push(bar);
    });
  }


  function highlightCompare(i, j) {
    if (typeof i === "number") bars[i]?.classList.add("compare");
    if (typeof j === "number") bars[j]?.classList.add("compare");
  }
  function unhighlightCompare(i, j) {
    if (typeof i === "number") bars[i]?.classList.remove("compare");
    if (typeof j === "number") bars[j]?.classList.remove("compare");
  }
  function highlightSwap(i, j) {
    bars[i]?.classList.add("swap");
    bars[j]?.classList.add("swap");
  }
  function unhighlightSwap(i, j) {
    bars[i]?.classList.remove("swap");
    bars[j]?.classList.remove("swap");
  }
  function highlightFound(i) {
    bars[i]?.classList.add("found");
  }
  function dimAll(except = []) {
    bars.forEach((b, idx) => {
      if (!except.includes(idx)) b.classList.add("dim");
    });
  }
  function undimAll() {
    bars.forEach((b) => b.classList.remove("dim"));
  }


  function swapValues(i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
    const bi = bars[i],
      bj = bars[j];
    const hI = bi.style.height,
      hJ = bj.style.height;
    const lI = bi.querySelector(".label").textContent,
      lJ = bj.querySelector(".label").textContent;
    bi.style.height = hJ;
    bj.style.height = hI;
    bi.querySelector(".label").textContent = lJ;
    bj.querySelector(".label").textContent = lI;
  }

  function wait(ms) {
    return new Promise((resolve) => {
      const start = performance.now();
      (function loop() {
        if (paused) {
          requestAnimationFrame(loop);
          return;
        }
        if (performance.now() - start >= ms) return resolve();
        requestAnimationFrame(loop);
      })();
    });
  }

  async function bubbleSort(ascending = true) {
    running = true;
    setStatus("Running");
    setCurrent("Bubble Sort");
    const n = arr.length;
    for (let i = 0; i < n; i++) {
      let swapped = false;
      for (let j = 0; j < n - i - 1; j++) {
        if (!running) return;
        highlightCompare(j, j + 1);
        await wait(speed);
        if (
          (ascending && arr[j] > arr[j + 1]) ||
          (!ascending && arr[j] < arr[j + 1])
        ) {
          highlightSwap(j, j + 1);
          await wait(Math.max(40, speed / 3));
          swapValues(j, j + 1);
          await wait(Math.max(40, speed / 3));
          unhighlightSwap(j, j + 1);
          swapped = true;
        }
        unhighlightCompare(j, j + 1);
      }
      if (!swapped) break;
    }
    setStatus("Completed");
    running = false;
  }

  async function selectionSort(ascending = true) {
    running = true;
    setStatus("Running");
    setCurrent("Selection Sort");
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      let idx = i;
      for (let j = i + 1; j < n; j++) {
        if (!running) return;
        highlightCompare(idx, j);
        await wait(speed);
        if (
          (ascending && arr[j] < arr[idx]) ||
          (!ascending && arr[j] > arr[idx])
        ) {
          unhighlightCompare(idx, j);
          idx = j;
        } else {
          unhighlightCompare(idx, j);
        }
      }
      if (idx !== i) {
        highlightSwap(i, idx);
        await wait(Math.max(40, speed / 3));
        swapValues(i, idx);
        await wait(Math.max(40, speed / 3));
        unhighlightSwap(i, idx);
      }
    }
    setStatus("Completed");
    running = false;
  }

  async function quickSortWrapper(ascending = true) {
    running = true;
    setStatus("Running");
    setCurrent("Quick Sort");
    async function partition(l, r) {
      const pivot = arr[r];
      let i = l;
      for (let j = l; j < r; j++) {
        if (!running) return;
        highlightCompare(j, r);
        await wait(speed);
        let comp = ascending ? arr[j] <= pivot : arr[j] >= pivot;
        if (comp) {
          if (i !== j) {
            highlightSwap(i, j);
            await wait(Math.max(40, speed / 3));
            swapValues(i, j);
            await wait(Math.max(40, speed / 3));
            unhighlightSwap(i, j);
          }
          i++;
        }
        unhighlightCompare(j, r);
      }
      if (i !== r) {
        highlightSwap(i, r);
        await wait(Math.max(40, speed / 3));
        swapValues(i, r);
        await wait(Math.max(40, speed / 3));
        unhighlightSwap(i, r);
      }
      return i;
    }
    async function quick(l, r) {
      if (!running) return;
      if (l < r) {
        const pi = await partition(l, r);
        await quick(l, pi - 1);
        await quick(pi + 1, r);
      }
    }
    await quick(0, arr.length - 1);
    setStatus("Completed");
    running = false;
  }


  async function mergeSortWrapper(ascending = true) {
    running = true;
    setStatus("Running");
    setCurrent("Merge Sort");
    async function merge(l, m, r) {
      if (!running) return;
      const left = arr.slice(l, m + 1);
      const right = arr.slice(m + 1, r + 1);
      let i = 0,
        j = 0,
        k = l;
      while (i < left.length && j < right.length) {
        highlightCompare(k);
        await wait(speed);
        if (
          (ascending && left[i] <= right[j]) ||
          (!ascending && left[i] >= right[j])
        ) {
          arr[k] = left[i];
          bars[k].style.height = computeHeight(left[i]) + "%";
          bars[k].querySelector(".label").textContent = left[i];
          i++;
          k++;
        } else {
          arr[k] = right[j];
          bars[k].style.height = computeHeight(right[j]) + "%";
          bars[k].querySelector(".label").textContent = right[j];
          j++;
          k++;
        }
        unhighlightCompare(k - 1);
      }
      while (i < left.length) {
        if (!running) return;
        arr[k] = left[i];
        bars[k].style.height = computeHeight(left[i]) + "%";
        bars[k].querySelector(".label").textContent = left[i];
        i++;
        k++;
        await wait(speed / 2);
      }
      while (j < right.length) {
        if (!running) return;
        arr[k] = right[j];
        bars[k].style.height = computeHeight(right[j]) + "%";
        bars[k].querySelector(".label").textContent = right[j];
        j++;
        k++;
        await wait(speed / 2);
      }
    }
    async function mergeSort(l, r) {
      if (!running) return;
      if (l >= r) return;
      const m = Math.floor((l + r) / 2);
      await mergeSort(l, m);
      await mergeSort(m + 1, r);
      await merge(l, m, r);
    }
    function computeHeight(val) {
      const max = Math.max(...arr, 1);
      const min = Math.min(...arr, 0);
      const pct = (val - min) / (max - min || 1);
      return Math.max(6, pct * 90);
    }

    await mergeSort(0, arr.length - 1);
    setStatus("Completed");
    running = false;
  }


  async function linearSearch(val) {
    running = true;
    setStatus("Running");
    setCurrent("Linear Search");
    for (let i = 0; i < arr.length; i++) {
      if (!running) return;
      highlightCompare(i);
      await wait(speed);
      if (arr[i] === val) {
        highlightFound(i);
        setStatus(`Found at index ${i}`);
        running = false;
        return i;
      }
      unhighlightCompare(i);
    }
    setStatus("Not found");
    running = false;
    return -1;
  }

  async function binarySearch(val) {
 
    const isSortedAsc = arr.every((v, i, aa) => i === 0 || aa[i - 1] <= v);
    if (!isSortedAsc) {
      setStatus("Array not sorted ascending — binary search aborted");
      return -1;
    }
    running = true;
    setStatus("Running");
    setCurrent("Binary Search");
    let l = 0,
      r = arr.length - 1;
    while (l <= r) {
      if (!running) return -1;
      const mid = Math.floor((l + r) / 2);
      highlightCompare(l, mid);
      highlightCompare(r);
      await wait(speed);
      if (arr[mid] === val) {
        highlightFound(mid);
        setStatus(`Found at index ${mid}`);
        running = false;
        return mid;
      } else if (arr[mid] < val) {
        unhighlightCompare(l, mid);
        unhighlightCompare(r);
        l = mid + 1;
      } else {
        unhighlightCompare(l, mid);
        unhighlightCompare(r);
        r = mid - 1;
      }
    }
    setStatus("Not found");
    running = false;
    return -1;
  }

  function getOrder() {
    for (const r of orderRadios) if (r.checked) return r.value;
    return "asc";
  }

  async function runAlgorithm() {
    if (running) {
      setStatus("Already running");
      return;
    }
    paused = false;
    const algo = algoSelect.value;
    const order = getOrder();
    setCurrent(
      `${algo.charAt(0).toUpperCase() + algo.slice(1)} ${
        order === "asc" ? "↑" : "↓"
      }`
    );
    if (algo === "bubble") {
      await bubbleSort(order === "asc");
    } else if (algo === "selection") {
      await selectionSort(order === "asc");
    } else if (algo === "quick") {
      await quickSortWrapper(order === "asc");
    } else if (algo === "merge") {
      await mergeSortWrapper(order === "asc");
    }
  }


  useBtn.addEventListener("click", () => {
    const parsed = parseInput(arrayInput.value);
    if (parsed.length === 0) {
      setStatus("No valid numbers");
      return;
    }
    arr = parsed.slice();
    original = arr.slice();
    render(arr);
    setStatus("Array set");
  });

  randomBtn.addEventListener("click", () => {
    const n = Number(sizeRange.value);
    arr = randomArray(n);
    original = arr.slice();
    arrayInput.value = arr.join(",");
    render(arr);
    setStatus("Randomized");
  });

  shuffleBtn.addEventListener("click", () => {
    arr = shuffle(arr.slice());
    original = arr.slice();
    arrayInput.value = arr.join(",");
    render(arr);
    setStatus("Shuffled");
  });

  clearBtn.addEventListener("click", () => {
    arr = [];
    original = [];
    arrayInput.value = "";
    render(arr);
    setStatus("Cleared");
  });

  
  sizeRange.addEventListener("input", (e) => {
    sizeVal.textContent = e.target.value;
  });
  speedRange.addEventListener("input", (e) => {
    speed = Number(e.target.value);
    speedVal.textContent = speed + "ms";
  });

  playBtn.addEventListener("click", async () => {
    if (running) {
      paused = false;
      setStatus("Running");
      return;
    }
    paused = false;
    await runAlgorithm();
  });

  pauseBtn.addEventListener("click", () => {
    paused = true;
    setStatus("Paused");
  });

  resetBtn.addEventListener("click", () => {
    paused = false;
    running = false;
    if (original && original.length) {
      arr = original.slice();
      render(arr);
      setStatus("Reset to original");
      setCurrent("Idle");
    } else {
      arr = [];
      render(arr);
      setStatus("Reset");
    }
  });

 
  stepBtn.addEventListener("click", async () => {
    if (running) {
      setStatus("Already running");
      return;
    }
   
    paused = false;
    running = true;
    const algo = algoSelect.value;
    setCurrent("Stepping: " + algo);
    const stepMs = Math.max(60, speed);
   
    const controller = { kill: false };
    setTimeout(() => (controller.kill = true), stepMs);
  

    if (algo === "bubble") {
      await bubbleSort(getOrder() === "asc");
    } else if (algo === "selection") {
      await selectionSort(getOrder() === "asc");
    } else if (algo === "quick") {
      await quickSortWrapper(getOrder() === "asc");
    } else if (algo === "merge") {
      await mergeSortWrapper(getOrder() === "asc");
    }
    running = false;
    paused = true;
    setStatus("Stepped (approx.)");
  });

  linearBtn.addEventListener("click", async () => {
    const v = Number(searchInput.value);
    if (!Number.isFinite(v)) {
      setStatus("Enter numeric search value");
      return;
    }
    if (running) {
      setStatus("Busy");
      return;
    }
    await linearSearch(v);
  });

  binaryBtn.addEventListener("click", async () => {
    const v = Number(searchInput.value);
    if (!Number.isFinite(v)) {
      setStatus("Enter numeric search value");
      return;
    }
    if (running) {
      setStatus("Busy");
      return;
    }
    await binarySearch(v);
  });

  snapshotBtn.addEventListener("click", () => {
    const outer = canvas.cloneNode(true);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
   
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'>
      <foreignObject width='100%' height='100%'>${new XMLSerializer().serializeToString(
        outer
      )}</foreignObject>
    </svg>`;
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "visualizer.svg";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });


  (function init() {
    arr = parseInput(arrayInput.value);
    original = arr.slice();
    render(arr);
    sizeVal.textContent = sizeRange.value;
    speedVal.textContent = speed + "ms";
    setStatus("Ready");
    setCurrent("Idle");
  })();

  window._vis = {
    get: () => arr.slice(),
    set: (a) => {
      arr = a.slice();
      original = arr.slice();
      render(arr);
    },
  };
})();


