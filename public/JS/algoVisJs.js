document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const arrayInput = document.getElementById('arrayInput');
    const useBtn = document.getElementById('useBtn');
    const randomBtn = document.getElementById('randomBtn');
    const shuffleBtn = document.getElementById('shuffleBtn');
    const clearBtn = document.getElementById('clearBtn');

    const sizeRange = document.getElementById('sizeRange');
    const sizeVal = document.getElementById('sizeVal');
    const speedRange = document.getElementById('speedRange');
    const speedVal = document.getElementById('speedVal');

    const algoSelect = document.getElementById('algoSelect');
    const orderRadios = document.getElementsByName('order');

    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const stepBtn = document.getElementById('stepBtn');
    const resetBtn = document.getElementById('resetBtn');

    const linearBtn = document.getElementById('linearBtn');
    const binaryBtn = document.getElementById('binaryBtn');
    const searchInput = document.getElementById('searchInput');

    const canvas = document.getElementById('canvas');
    const elemCount = document.getElementById('elemCount');
    const algoName = document.getElementById('algoName');
    const currentOp = document.getElementById('currentOp');
    const statusText = document.getElementById('statusText');

    // Code and Complexity Elements
    const currentAlgoCode = document.getElementById('currentAlgoCode');
    const algoComplexityName = document.getElementById('algoComplexityName');
    const timeComplexity = document.getElementById('timeComplexity');
    const spaceComplexity = document.getElementById('spaceComplexity');
    const bestCase = document.getElementById('bestCase');
    const worstCase = document.getElementById('worstCase');
    const stable = document.getElementById('stable');
    const inPlace = document.getElementById('inPlace');
    const langButtons = document.querySelectorAll('.lang-btn');

    // Algorithm Code Database
    const algorithmCode = {
        bubble: {
            python: `def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        swapped = False\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n                swapped = True\n        if not swapped:\n            break\n    return arr`,
            
            javascript: `function bubbleSort(arr) {\n    let n = arr.length;\n    for (let i = 0; i < n; i++) {\n        let swapped = false;\n        for (let j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n                swapped = true;\n            }\n        }\n        if (!swapped) break;\n    }\n    return arr;\n}`,
            
            java: `public void bubbleSort(int[] arr) {\n    int n = arr.length;\n    for (int i = 0; i < n; i++) {\n        boolean swapped = false;\n        for (int j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                int temp = arr[j];\n                arr[j] = arr[j + 1];\n                arr[j + 1] = temp;\n                swapped = true;\n            }\n        }\n        if (!swapped) break;\n    }\n}`,
            
            cpp: `void bubbleSort(int arr[], int n) {\n    for (int i = 0; i < n; i++) {\n        bool swapped = false;\n        for (int j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                swap(arr[j], arr[j + 1]);\n                swapped = true;\n            }\n        }\n        if (!swapped) break;\n    }\n}`
        },
        
        selection: {
            python: `def selection_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        min_idx = i\n        for j in range(i+1, n):\n            if arr[j] < arr[min_idx]:\n                min_idx = j\n        arr[i], arr[min_idx] = arr[min_idx], arr[i]\n    return arr`,
            
            javascript: `function selectionSort(arr) {\n    let n = arr.length;\n    for (let i = 0; i < n; i++) {\n        let minIdx = i;\n        for (let j = i + 1; j < n; j++) {\n            if (arr[j] < arr[minIdx]) {\n                minIdx = j;\n            }\n        }\n        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];\n    }\n    return arr;\n}`,
            
            java: `public void selectionSort(int[] arr) {\n    int n = arr.length;\n    for (int i = 0; i < n; i++) {\n        int minIdx = i;\n        for (int j = i + 1; j < n; j++) {\n            if (arr[j] < arr[minIdx]) {\n                minIdx = j;\n            }\n        }\n        int temp = arr[minIdx];\n        arr[minIdx] = arr[i];\n        arr[i] = temp;\n    }\n}`,
            
            cpp: `void selectionSort(int arr[], int n) {\n    for (int i = 0; i < n; i++) {\n        int minIdx = i;\n        for (int j = i + 1; j < n; j++) {\n            if (arr[j] < arr[minIdx]) {\n                minIdx = j;\n            }\n        }\n        swap(arr[minIdx], arr[i]);\n    }\n}`
        },
        
        quick: {
            python: `def quick_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quick_sort(left) + middle + quick_sort(right)`,
            
            javascript: `function quickSort(arr) {\n    if (arr.length <= 1) return arr;\n    const pivot = arr[Math.floor(arr.length / 2)];\n    const left = [], middle = [], right = [];\n    for (const x of arr) {\n        if (x < pivot) left.push(x);\n        else if (x === pivot) middle.push(x);\n        else right.push(x);\n    }\n    return [...quickSort(left), ...middle, ...quickSort(right)];\n}`,
            
            java: `public int[] quickSort(int[] arr) {\n    if (arr.length <= 1) return arr;\n    int pivot = arr[arr.length / 2];\n    ArrayList<Integer> left = new ArrayList<>();\n    ArrayList<Integer> middle = new ArrayList<>();\n    ArrayList<Integer> right = new ArrayList<>();\n    for (int x : arr) {\n        if (x < pivot) left.add(x);\n        else if (x == pivot) middle.add(x);\n        else right.add(x);\n    }\n    // Combine results\n    return combined;\n}`,
            
            cpp: `void quickSort(int arr[], int low, int high) {\n    if (low < high) {\n        int pi = partition(arr, low, high);\n        quickSort(arr, low, pi - 1);\n        quickSort(arr, pi + 1, high);\n    }\n}\n\nint partition(int arr[], int low, int high) {\n    int pivot = arr[high];\n    int i = low - 1;\n    for (int j = low; j < high; j++) {\n        if (arr[j] < pivot) {\n            i++;\n            swap(arr[i], arr[j]);\n        }\n    }\n    swap(arr[i + 1], arr[high]);\n    return i + 1;\n}`
        },
        
        merge: {
            python: `def merge_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    mid = len(arr) // 2\n    left = merge_sort(arr[:mid])\n    right = merge_sort(arr[mid:])\n    return merge(left, right)\n\ndef merge(left, right):\n    result = []\n    i = j = 0\n    while i < len(left) and j < len(right):\n        if left[i] < right[j]:\n            result.append(left[i])\n            i += 1\n        else:\n            result.append(right[j])\n            j += 1\n    result.extend(left[i:])\n    result.extend(right[j:])\n    return result`,
            
            javascript: `function mergeSort(arr) {\n    if (arr.length <= 1) return arr;\n    const mid = Math.floor(arr.length / 2);\n    const left = mergeSort(arr.slice(0, mid));\n    const right = mergeSort(arr.slice(mid));\n    return merge(left, right);\n}\n\nfunction merge(left, right) {\n    const result = [];\n    let i = 0, j = 0;\n    while (i < left.length && j < right.length) {\n        if (left[i] < right[j]) {\n            result.push(left[i]);\n            i++;\n        } else {\n            result.push(right[j]);\n            j++;\n        }\n    }\n    return result.concat(left.slice(i)).concat(right.slice(j));\n}`,
            
            java: `public int[] mergeSort(int[] arr) {\n    if (arr.length <= 1) return arr;\n    int mid = arr.length / 2;\n    int[] left = Arrays.copyOfRange(arr, 0, mid);\n    int[] right = Arrays.copyOfRange(arr, mid, arr.length);\n    return merge(mergeSort(left), mergeSort(right));\n}\n\nprivate int[] merge(int[] left, int[] right) {\n    int[] result = new int[left.length + right.length];\n    int i = 0, j = 0, k = 0;\n    while (i < left.length && j < right.length) {\n        if (left[i] < right[j]) {\n            result[k++] = left[i++];\n        } else {\n            result[k++] = right[j++];\n        }\n    }\n    while (i < left.length) result[k++] = left[i++];\n    while (j < right.length) result[k++] = right[j++];\n    return result;\n}`,
            
            cpp: `void mergeSort(int arr[], int l, int r) {\n    if (l >= r) return;\n    int m = l + (r - l) / 2;\n    mergeSort(arr, l, m);\n    mergeSort(arr, m + 1, r);\n    merge(arr, l, m, r);\n}\n\nvoid merge(int arr[], int l, int m, int r) {\n    int n1 = m - l + 1, n2 = r - m;\n    int L[n1], R[n2];\n    for (int i = 0; i < n1; i++) L[i] = arr[l + i];\n    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];\n    int i = 0, j = 0, k = l;\n    while (i < n1 && j < n2) {\n        if (L[i] <= R[j]) arr[k++] = L[i++];\n        else arr[k++] = R[j++];\n    }\n    while (i < n1) arr[k++] = L[i++];\n    while (j < n2) arr[k++] = R[j++];\n}`
        }
    };

    // Complexity Database
    const algorithmComplexity = {
        bubble: {
            name: "Bubble Sort",
            time: "O(n²)",
            space: "O(1)",
            best: "O(n)",
            worst: "O(n²)",
            stable: "Yes",
            inPlace: "Yes",
            description: "Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order."
        },
        selection: {
            name: "Selection Sort",
            time: "O(n²)",
            space: "O(1)",
            best: "O(n²)",
            worst: "O(n²)",
            stable: "No",
            inPlace: "Yes",
            description: "Repeatedly finds the minimum element from unsorted part and puts it at the beginning."
        },
        quick: {
            name: "Quick Sort",
            time: "O(n log n)",
            space: "O(log n)",
            best: "O(n log n)",
            worst: "O(n²)",
            stable: "No",
            inPlace: "Yes",
            description: "Divide and conquer algorithm that picks an element as pivot and partitions the array around the pivot."
        },
        merge: {
            name: "Merge Sort",
            time: "O(n log n)",
            space: "O(n)",
            best: "O(n log n)",
            worst: "O(n log n)",
            stable: "Yes",
            inPlace: "No",
            description: "Divide and conquer algorithm that divides array into halves, sorts them and merges them."
        }
    };

    let arr = [];
    let original = [];
    let bars = [];
    let running = false;
    let paused = false;
    let speed = Number(speedRange.value);
    let currentLang = 'python';
    
    // Step mode variables
    let stepMode = false;
    let stepPromiseResolve = null;
    let stepWaitStart = null;

    // Initialize
    function init() {
        arr = parseInput(arrayInput.value);
        original = arr.slice();
        render(arr);
        sizeVal.textContent = sizeRange.value;
        speedVal.textContent = speed + 'ms';
        setStatus('Ready');
        setCurrent('Idle');
        updateCodeAndComplexity();
    }

    // Update code and complexity display
    function updateCodeAndComplexity() {
        const algo = algoSelect.value;
        const code = algorithmCode[algo];
        const complexity = algorithmComplexity[algo];
        
        if (code && complexity) {
            // Update code display
            const codeElement = document.getElementById('pythonCode');
            if (codeElement) {
                codeElement.innerHTML = highlightCode(code[currentLang] || code['python']);
            }
            
            // Update complexity display
            algoComplexityName.textContent = complexity.name;
            timeComplexity.textContent = complexity.time;
            spaceComplexity.textContent = complexity.space;
            bestCase.textContent = complexity.best;
            worstCase.textContent = complexity.worst;
            stable.textContent = complexity.stable;
            inPlace.textContent = complexity.inPlace;
            
            currentAlgoCode.textContent = complexity.name;
        }
    }

    // Syntax highlighting
    function highlightCode(code) {
        return code
            .replace(/def|function|public|void|int|bool|return|if|else|for|while/g, '<span class="keyword">$&</span>')
            .replace(/bubbleSort|selectionSort|quickSort|mergeSort|partition|merge/g, '<span class="function">$&</span>')
            .replace(/"[^"]*"/g, '<span class="string">$&</span>')
            .replace(/\b\d+\b/g, '<span class="number">$&</span>')
            .replace(/#.*$/gm, '<span class="comment">$&</span>')
            .replace(/\/\/.*$/gm, '<span class="comment">$&</span>')
            .replace(/\/\*[\s\S]*?\*\//g, '<span class="comment">$&</span>')
            .replace(/[=<>!+\-*/%&|^~]+/g, '<span class="operator">$&</span>')
            .replace(/\n/g, '<br>');
    }

    // Language button handler
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            langButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentLang = this.dataset.lang;
            updateCodeAndComplexity();
        });
    });

    // Algorithm selection handler
    algoSelect.addEventListener('change', updateCodeAndComplexity);

    // Set status messages
    const setStatus = (s) => {
        statusText.textContent = s;
    };
    
    const setCurrent = (s) => {
        currentOp.textContent = s;
        algoName.textContent = s;
    };

    // Parse input array
    function parseInput(text) {
        if (!text) return [];
        return text
            .split(',')
            .map(s => s.trim())
            .filter(Boolean)
            .map(x => Number(x))
            .filter(x => Number.isFinite(x));
    }

    // Generate random array
    function randomArray(n) {
        const out = [];
        for (let i = 0; i < n; i++) {
            out.push(Math.floor(Math.random() * 100) + 3);
        }
        return out;
    }

    // Shuffle array
    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    // Render visualization
    function render(a) {
        canvas.innerHTML = '';
        bars = [];
        
        if (a.length === 0) {
            canvas.innerHTML = '<span class="text-gray-500 italic">[ Enter numbers above to visualize ]</span>';
            return;
        }
        
        const max = Math.max(...a, 1);
        const min = Math.min(...a, 0);
        elemCount.textContent = a.length;

        a.forEach((v, i) => {
            const bar = document.createElement('div');
            bar.className = 'bar';
            const pct = (v - min) / (max - min || 1);
            const height = Math.max(6, pct * 90);
            bar.style.height = height + '%';

            const label = document.createElement('div');
            label.className = 'label';
            label.textContent = v;
            bar.appendChild(label);
            canvas.appendChild(bar);
            bars.push(bar);
        });
    }

    // Visualization helpers
    function highlightCompare(i, j) {
        if (typeof i === 'number') bars[i]?.classList.add('compare');
        if (typeof j === 'number') bars[j]?.classList.add('compare');
    }
    
    function unhighlightCompare(i, j) {
        if (typeof i === 'number') bars[i]?.classList.remove('compare');
        if (typeof j === 'number') bars[j]?.classList.remove('compare');
    }
    
    function highlightSwap(i, j) {
        bars[i]?.classList.add('swap');
        bars[j]?.classList.add('swap');
    }
    
    function unhighlightSwap(i, j) {
        bars[i]?.classList.remove('swap');
        bars[j]?.classList.remove('swap');
    }
    
    function highlightFound(i) {
        bars[i]?.classList.add('found');
    }

    // Swap values in array and visualization
    function swapValues(i, j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        const bi = bars[i];
        const bj = bars[j];
        const hI = bi.style.height;
        const hJ = bj.style.height;
        const lI = bi.querySelector('.label').textContent;
        const lJ = bj.querySelector('.label').textContent;
        
        bi.style.height = hJ;
        bj.style.height = hI;
        bi.querySelector('.label').textContent = lJ;
        bj.querySelector('.label').textContent = lI;
    }

    // Wait function for animation
    function wait(ms) {
        return new Promise((resolve) => {
            if (stepMode) {
                // In step mode, wait for step button click
                paused = true;
                stepPromiseResolve = resolve;
                stepWaitStart = performance.now();
                setStatus('Paused - Click Step to continue');
                
                // Start a loop to check if step button was pressed
                (function checkStep() {
                    if (paused) {
                        requestAnimationFrame(checkStep);
                        return;
                    }
                    // Step button was pressed, resume
                    if (stepPromiseResolve === resolve) {
                        stepPromiseResolve = null;
                        resolve();
                    }
                })();
            } else {
                // Normal mode - use timer
                const start = performance.now();
                (function loop() {
                    if (paused) {
                        requestAnimationFrame(loop);
                        return;
                    }
                    if (performance.now() - start >= ms) return resolve();
                    requestAnimationFrame(loop);
                })();
            }
        });
    }

    // Algorithm implementations
    async function bubbleSort(ascending = true) {
        running = true;
        stepMode = false; // Ensure not in step mode for normal play
        setStatus('Running');
        setCurrent('Bubble Sort');
        updateCodeAndComplexity();
        
        const n = arr.length;
        for (let i = 0; i < n; i++) {
            let swapped = false;
            for (let j = 0; j < n - i - 1; j++) {
                if (!running) return;
                highlightCompare(j, j + 1);
                await wait(speed);
                
                if ((ascending && arr[j] > arr[j + 1]) || (!ascending && arr[j] < arr[j + 1])) {
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
        setStatus('Completed');
        running = false;
    }

    async function selectionSort(ascending = true) {
        running = true;
        stepMode = false;
        setStatus('Running');
        setCurrent('Selection Sort');
        updateCodeAndComplexity();
        
        const n = arr.length;
        for (let i = 0; i < n - 1; i++) {
            let idx = i;
            for (let j = i + 1; j < n; j++) {
                if (!running) return;
                highlightCompare(idx, j);
                await wait(speed);
                
                if ((ascending && arr[j] < arr[idx]) || (!ascending && arr[j] > arr[idx])) {
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
        setStatus('Completed');
        running = false;
    }

    async function quickSortWrapper(ascending = true) {
        running = true;
        stepMode = false;
        setStatus('Running');
        setCurrent('Quick Sort');
        updateCodeAndComplexity();
        
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
        setStatus('Completed');
        running = false;
    }

    async function mergeSortWrapper(ascending = true) {
        running = true;
        stepMode = false;
        setStatus('Running');
        setCurrent('Merge Sort');
        updateCodeAndComplexity();
        
        async function merge(l, m, r) {
            if (!running) return;
            const left = arr.slice(l, m + 1);
            const right = arr.slice(m + 1, r + 1);
            let i = 0, j = 0, k = l;
            
            while (i < left.length && j < right.length) {
                highlightCompare(k);
                await wait(speed);
                
                if ((ascending && left[i] <= right[j]) || (!ascending && left[i] >= right[j])) {
                    arr[k] = left[i];
                    bars[k].style.height = computeHeight(left[i]) + '%';
                    bars[k].querySelector('.label').textContent = left[i];
                    i++;
                } else {
                    arr[k] = right[j];
                    bars[k].style.height = computeHeight(right[j]) + '%';
                    bars[k].querySelector('.label').textContent = right[j];
                    j++;
                }
                unhighlightCompare(k);
                k++;
            }
            
            while (i < left.length) {
                if (!running) return;
                arr[k] = left[i];
                bars[k].style.height = computeHeight(left[i]) + '%';
                bars[k].querySelector('.label').textContent = left[i];
                i++;
                k++;
                await wait(speed / 2);
            }
            
            while (j < right.length) {
                if (!running) return;
                arr[k] = right[j];
                bars[k].style.height = computeHeight(right[j]) + '%';
                bars[k].querySelector('.label').textContent = right[j];
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
        setStatus('Completed');
        running = false;
    }

    // Search algorithms
    async function linearSearch(val) {
        running = true;
        setStatus('Running');
        setCurrent('Linear Search');
        
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
        setStatus('Not found');
        running = false;
        return -1;
    }

    async function binarySearch(val) {
        const isSortedAsc = arr.every((v, i, aa) => i === 0 || aa[i - 1] <= v);
        if (!isSortedAsc) {
            setStatus('Array not sorted ascending — binary search aborted');
            return -1;
        }
        
        running = true;
        setStatus('Running');
        setCurrent('Binary Search');
        
        let l = 0, r = arr.length - 1;
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
        setStatus('Not found');
        running = false;
        return -1;
    }

    // Get sort order
    function getOrder() {
        for (const r of orderRadios) {
            if (r.checked) return r.value;
        }
        return 'asc';
    }

    // Run selected algorithm
    async function runAlgorithm() {
        if (running) {
            setStatus('Already running');
            return;
        }
        
        paused = false;
        stepMode = false; // Normal play mode
        const algo = algoSelect.value;
        const order = getOrder();
        
        setCurrent(`${algo.charAt(0).toUpperCase() + algo.slice(1)} Sort ${order === 'asc' ? '↑' : '↓'}`);
        updateCodeAndComplexity();
        
        if (algo === 'bubble') {
            await bubbleSort(order === 'asc');
        } else if (algo === 'selection') {
            await selectionSort(order === 'asc');
        } else if (algo === 'quick') {
            await quickSortWrapper(order === 'asc');
        } else if (algo === 'merge') {
            await mergeSortWrapper(order === 'asc');
        }
    }

    // Step button functionality
    async function startStepMode() {
        if (running) {
            setStatus('Already running');
            return;
        }
        
        stepMode = true;
        running = true;
        paused = false; // Start unpaused
        
        const algo = algoSelect.value;
        const order = getOrder();
        
        setCurrent(`${algo.charAt(0).toUpperCase() + algo.slice(1)} Sort ${order === 'asc' ? '↑' : '↓'} - Step Mode`);
        setStatus('Step Mode - Click Step to begin');
        updateCodeAndComplexity();
        
        if (algo === 'bubble') {
            await bubbleSort(order === 'asc');
        } else if (algo === 'selection') {
            await selectionSort(order === 'asc');
        } else if (algo === 'quick') {
            await quickSortWrapper(order === 'asc');
        } else if (algo === 'merge') {
            await mergeSortWrapper(order === 'asc');
        }
        
        // When algorithm completes in step mode
        stepMode = false;
        if (running) {
            setStatus('Completed');
            running = false;
        }
    }

    // Event Listeners
    useBtn.addEventListener('click', () => {
        const parsed = parseInput(arrayInput.value);
        if (parsed.length === 0) {
            setStatus('No valid numbers');
            return;
        }
        arr = parsed.slice();
        original = arr.slice();
        render(arr);
        setStatus('Array set');
        updateCodeAndComplexity();
    });

    randomBtn.addEventListener('click', () => {
        const n = Number(sizeRange.value);
        arr = randomArray(n);
        original = arr.slice();
        arrayInput.value = arr.join(',');
        render(arr);
        setStatus('Randomized');
        updateCodeAndComplexity();
    });

    shuffleBtn.addEventListener('click', () => {
        arr = shuffle(arr.slice());
        original = arr.slice();
        arrayInput.value = arr.join(',');
        render(arr);
        setStatus('Shuffled');
        updateCodeAndComplexity();
    });

    clearBtn.addEventListener('click', () => {
        arr = [];
        original = [];
        arrayInput.value = '';
        render(arr);
        setStatus('Cleared');
        updateCodeAndComplexity();
    });

    sizeRange.addEventListener('input', (e) => {
        sizeVal.textContent = e.target.value;
    });

    speedRange.addEventListener('input', (e) => {
        speed = Number(e.target.value);
        speedVal.textContent = speed + 'ms';
    });

    playBtn.addEventListener('click', async () => {
        if (running) {
            // If already running and paused, resume
            paused = false;
            setStatus('Running');
            return;
        }
        await runAlgorithm();
    });

    pauseBtn.addEventListener('click', () => {
        paused = true;
        setStatus('Paused');
    });

    // STEP BUTTON - FIXED
    stepBtn.addEventListener('click', async () => {
        if (running && paused) {
            // If paused, resume for one step
            paused = false;
            if (stepPromiseResolve) {
                // Resolve the wait promise to continue execution
                stepPromiseResolve();
                stepPromiseResolve = null;
            }
            setStatus('Step executed - Click Step to continue');
        } else if (!running) {
            // Start algorithm in step mode
            await startStepMode();
        }
    });

    resetBtn.addEventListener('click', () => {
        paused = false;
        running = false;
        stepMode = false;
        if (original && original.length) {
            arr = original.slice();
            render(arr);
            setStatus('Reset to original');
            setCurrent('Idle');
            updateCodeAndComplexity();
        } else {
            arr = [];
            render(arr);
            setStatus('Reset');
            updateCodeAndComplexity();
        }
    });

    linearBtn.addEventListener('click', async () => {
        const v = Number(searchInput.value);
        if (!Number.isFinite(v)) {
            setStatus('Enter numeric search value');
            return;
        }
        if (running) {
            setStatus('Busy');
            return;
        }
        await linearSearch(v);
    });

    binaryBtn.addEventListener('click', async () => {
        const v = Number(searchInput.value);
        if (!Number.isFinite(v)) {
            setStatus('Enter numeric search value');
            return;
        }
        if (running) {
            setStatus('Busy');
            return;
        }
        await binarySearch(v);
    });

    // Initialize the application
    init();
});