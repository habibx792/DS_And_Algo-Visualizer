
       
        let nodes = [];
        let listType = 'singly';
        let animationSpeed = 800;
        let isAnimating = false;
        let currentOperation = null;

     
        const codeSnippets = {
            insertHead: {
                title: 'Insert at Head',
                time: 'O(1)',
                space: 'O(1)',
                code: `function insertHead(value) {\n  const newNode = new Node(value);\n  newNode.next = this.head;\n  if (this.head) {\n    this.head.prev = newNode; // doubly\n  }\n  this.head = newNode;\n  if (!this.tail) {\n    this.tail = newNode;\n  }\n  this.size++;\n}`
            },
            insertTail: {
                title: 'Insert at Tail',
                time: 'O(1)',
                space: 'O(1)',
                code: `function insertTail(value) {\n  const newNode = new Node(value);\n  if (!this.head) {\n    this.head = this.tail = newNode;\n  } else {\n    this.tail.next = newNode;\n    newNode.prev = this.tail; // doubly\n    this.tail = newNode;\n  }\n  this.size++;\n}`
            },
            search: {
                title: 'Search Value',
                time: 'O(n)',
                space: 'O(1)',
                code: `function search(value) {\n  let current = this.head;\n  let index = 0;\n  while (current) {\n    if (current.value === value) {\n      return index;\n    }\n    current = current.next;\n    index++;\n  }\n  return -1;\n}`
            },
            sort: {
                title: 'Sort List (Bubble Sort)',
                time: 'O(n²)',
                space: 'O(1)',
                code: `function sort() {\n  let swapped;\n  do {\n    swapped = false;\n    let current = this.head;\n    while (current.next) {\n      if (current.value > current.next.value) {\n        [current.value, current.next.value] = \n          [current.next.value, current.value];\n        swapped = true;\n      }\n      current = current.next;\n    }\n  } while (swapped);\n}`
            }
        };

        // Initialize
        function init() {
            nodes = generateInitialList(5);
            render();
            setStatus('List initialized');
        }

        function generateInitialList(count) {
            const list = [];
            for (let i = 0; i < count; i++) {
                list.push({
                    id: Date.now() + i,
                    value: Math.floor(Math.random() * 100),
                    highlight: false,
                    searchResult: false
                });
            }
            return list;
        }

        // Render Functions
        function render() {
            const container = document.getElementById('listContainer');
            if (nodes.length === 0) {
                container.innerHTML = '<p class="opacity-60 text-lg w-full text-center py-20">List is empty. Add some nodes!</p>';
                return;
            }

            container.innerHTML = nodes.map((node, index) => {
                const showNext = index < nodes.length - 1 || listType === 'circular';
                const isCircular = listType === 'circular' && index === nodes.length - 1;
                
                return `
                    <div class="flex items-center gap-2">
                        <div class="glass-node p-6 rounded-xl min-w-[120px] text-center relative ${node.highlight ? 'highlight-ring scale-110' : ''} ${node.searchResult ? 'ring-4 ring-green-400' : ''}">
                            ${listType === 'doubly' && index > 0 ? '<div class="absolute -left-6 top-1/2 -translate-y-1/2 text-orange-400">←</div>' : ''}
                            <div class="text-2xl font-bold text-gradient">${node.value}</div>
                            <div class="text-xs opacity-60 mt-1">Node ${index}</div>
                            ${showNext ? '<div class="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500"></div>' : ''}
                        </div>
                        ${showNext ? `
                            <div class="flex items-center">
                                <div class="arrow-line"></div>
                                <svg class="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                                </svg>
                            </div>
                        ` : ''}
                        ${isCircular ? '<div class="text-xs text-green-400 absolute -bottom-8">↻ Circular</div>' : ''}
                    </div>
                `;
            }).join('');
        }

        function updateCodeDisplay(operation) {
            const snippet = codeSnippets[operation];
            const display = document.getElementById('codeDisplay');
            
            if (!snippet) {
                display.innerHTML = '<p class="opacity-60 text-center">Select an operation to view code and complexity</p>';
                return;
            }

            display.innerHTML = `
                <div class="flex items-center gap-2 mb-4">
                    <svg class="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                    </svg>
                    <h3 class="text-lg font-bold text-gradient">${snippet.title}</h3>
                </div>
                <div class="grid grid-cols-2 gap-3 mb-4">
                    <div class="glass-panel p-3 rounded-lg">
                        <div class="text-xs font-semibold mb-1">Time</div>
                        <div class="text-sm font-mono font-bold text-gradient">${snippet.time}</div>
                    </div>
                    <div class="glass-panel p-3 rounded-lg">
                        <div class="text-xs font-semibold mb-1">Space</div>
                        <div class="text-sm font-mono font-bold text-gradient">${snippet.space}</div>
                    </div>
                </div>
                <pre class="code-block p-4 rounded-lg overflow-x-auto text-sm">${snippet.code}</pre>
            `;
        }

        function setStatus(message) {
            document.getElementById('statusMessage').textContent = message;
        }

        async function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        async function highlightNode(index) {
            nodes[index].highlight = true;
            render();
            await sleep(animationSpeed);
            nodes[index].highlight = false;
            render();
        }

        // Operations
        async function insertHead() {
            const value = parseInt(document.getElementById('valueInput').value);
            if (!value) return;

            isAnimating = true;
            setStatus(`Inserting ${value} at head...`);
            updateCodeDisplay('insertHead');

            nodes.unshift({ id: Date.now(), value, highlight: true });
            render();
            await sleep(animationSpeed);
            nodes[0].highlight = false;
            render();

            setStatus(`Successfully inserted ${value} at head`);
            isAnimating = false;
            document.getElementById('valueInput').value = '';
        }

        async function insertTail() {
            const value = parseInt(document.getElementById('valueInput').value);
            if (!value) return;

            isAnimating = true;
            setStatus(`Inserting ${value} at tail...`);
            updateCodeDisplay('insertTail');

            for (let i = 0; i < nodes.length; i++) {
                await highlightNode(i);
            }

            nodes.push({ id: Date.now(), value, highlight: true });
            render();
            await sleep(animationSpeed);
            nodes[nodes.length - 1].highlight = false;
            render();

            setStatus(`Successfully inserted ${value} at tail`);
            isAnimating = false;
            document.getElementById('valueInput').value = '';
        }

        async function deleteHead() {
            if (nodes.length === 0) {
                setStatus('List is empty');
                return;
            }

            isAnimating = true;
            setStatus(`Deleting head node (${nodes[0].value})...`);
            await highlightNode(0);
            nodes.shift();
            render();
            setStatus('Successfully deleted head node');
            isAnimating = false;
        }

        async function deleteTail() {
            if (nodes.length === 0) {
                setStatus('List is empty');
                return;
            }

            isAnimating = true;
            setStatus(`Deleting tail node (${nodes[nodes.length - 1].value})...`);
            for (let i = 0; i < nodes.length; i++) {
                await highlightNode(i);
            }
            nodes.pop();
            render();
            setStatus('Successfully deleted tail node');
            isAnimating = false;
        }

        async function search() {
            const value = parseInt(document.getElementById('valueInput').value);
            if (!value) return;

            isAnimating = true;
            setStatus(`Searching for ${value}...`);
            updateCodeDisplay('search');

            nodes.forEach(n => n.searchResult = false);

            for (let i = 0; i < nodes.length; i++) {
                await highlightNode(i);
                if (nodes[i].value === value) {
                    nodes[i].searchResult = true;
                    render();
                    setStatus(`Found ${value} at index ${i}`);
                    isAnimating = false;
                    return;
                }
            }

            setStatus(`Value ${value} not found`);
            isAnimating = false;
        }

        async function sort() {
            if (nodes.length <= 1) {
                setStatus('Nothing to sort');
                return;
            }

            isAnimating = true;
            setStatus('Sorting list using bubble sort...');
            updateCodeDisplay('sort');

            let swapped;
            do {
                swapped = false;
                for (let i = 0; i < nodes.length - 1; i++) {
                    await highlightNode(i);
                    if (nodes[i].value > nodes[i + 1].value) {
                        [nodes[i], nodes[i + 1]] = [nodes[i + 1], nodes[i]];
                        render();
                        await sleep(animationSpeed);
                        swapped = true;
                    }
                }
            } while (swapped);

            setStatus('List sorted successfully');
            isAnimating = false;
        }

        async function reverse() {
            if (nodes.length <= 1) {
                setStatus('Nothing to reverse');
                return;
            }

            isAnimating = true;
            setStatus('Reversing list...');

            for (let i = 0; i < nodes.length; i++) {
                await highlightNode(i);
            }

            nodes.reverse();
            render();
            setStatus('List reversed successfully');
            isAnimating = false;
        }

        // Event Listeners
        document.getElementById('themeToggle').addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const sunIcon = document.getElementById('sunIcon');
            const moonIcon = document.getElementById('moonIcon');
            sunIcon.classList.toggle('hidden');
            moonIcon.classList.toggle('hidden');
        });

        document.getElementById('resetBtn').addEventListener('click', () => {
            init();
            updateCodeDisplay(null);
        });

        document.querySelectorAll('.list-type-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (isAnimating) return;
                document.querySelectorAll('.list-type-btn').forEach(b => {
                    b.classList.remove('active', 'bg-gradient-to-r', 'from-yellow-500', 'to-orange-500', 'text-white');
                    b.classList.add('glass-panel');
                });
                btn.classList.add('active', 'bg-gradient-to-r', 'from-yellow-500', 'to-orange-500', 'text-white');
                btn.classList.remove('glass-panel');
                listType = btn.dataset.type;
                init();
            });
        });

        document.querySelectorAll('.speed-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.speed-btn').forEach(b => {
                    b.classList.remove('active', 'bg-gradient-to-r', 'from-yellow-500', 'to-orange-500', 'text-white');
                    b.classList.add('glass-panel');
                });
                btn.classList.add('active', 'bg-gradient-to-r', 'from-yellow-500', 'to-orange-500', 'text-white');
                btn.classList.remove('glass-panel');
                animationSpeed = parseInt(btn.dataset.speed);
            });
        });

        document.querySelectorAll('.operation-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (isAnimating) return;
                const op = btn.dataset.op;
                switch(op) {
                    case 'insertHead': insertHead(); break;
                    case 'insertTail': insertTail(); break;
                    case 'deleteHead': deleteHead(); break;
                    case 'deleteTail': deleteTail(); break;
                    case 'search': search(); break;
                    case 'sort': sort(); break;
                    case 'reverse': reverse(); break;
                }
            });
        });

        init();
  