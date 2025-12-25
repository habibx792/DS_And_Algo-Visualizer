// Node class for linked list
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null; // For doubly linked list
        this.id = Date.now() + Math.random();
    }
}

// Linked List implementation
class LinkedList {
    constructor(type = 'singly') {
        this.head = null;
        this.tail = null;
        this.size = 0;
        this.type = type; // 'singly', 'doubly', 'circular'
    }

    // Insert at head
    insertHead(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            if (this.type === 'circular') {
                newNode.next = newNode;
            }
        } else {
            newNode.next = this.head;
            if (this.type === 'doubly') {
                this.head.prev = newNode;
            }
            this.head = newNode;
            if (this.type === 'circular') {
                this.tail.next = this.head;
            }
        }
        this.size++;
        return newNode;
    }

    // Insert at tail
    insertTail(value) {
        const newNode = new Node(value);
        if (!this.head) {
            return this.insertHead(value);
        } else {
            if (this.type === 'doubly') {
                newNode.prev = this.tail;
            }
            this.tail.next = newNode;
            this.tail = newNode;
            if (this.type === 'circular') {
                this.tail.next = this.head;
            }
            this.size++;
            return newNode;
        }
    }

    // Insert at position
    insertAt(value, position) {
        if (position < 0 || position > this.size) {
            return null;
        }
        
        if (position === 0) {
            return this.insertHead(value);
        }
        if (position === this.size) {
            return this.insertTail(value);
        }

        const newNode = new Node(value);
        let current = this.head;
        let prev = null;
        let index = 0;

        while (index < position) {
            prev = current;
            current = current.next;
            index++;
        }

        newNode.next = current;
        if (this.type === 'doubly') {
            newNode.prev = prev;
            current.prev = newNode;
        }
        prev.next = newNode;
        this.size++;
        return newNode;
    }

    // Delete from head
    deleteHead() {
        if (!this.head) return null;
        
        const deletedNode = this.head;
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
            if (this.type === 'doubly') {
                this.head.prev = null;
            }
            if (this.type === 'circular') {
                this.tail.next = this.head;
            }
        }
        this.size--;
        return deletedNode;
    }

    // Delete from tail
    deleteTail() {
        if (!this.head) return null;
        
        if (this.head === this.tail) {
            return this.deleteHead();
        }

        let current = this.head;
        let prev = null;
        
        while (current.next) {
            prev = current;
            current = current.next;
        }

        const deletedNode = current;
        this.tail = prev;
        this.tail.next = this.type === 'circular' ? this.head : null;
        this.size--;
        return deletedNode;
    }

    // Delete at position
    deleteAt(position) {
        if (position < 0 || position >= this.size) {
            return null;
        }
        
        if (position === 0) {
            return this.deleteHead();
        }
        if (position === this.size - 1) {
            return this.deleteTail();
        }

        let current = this.head;
        let prev = null;
        let index = 0;

        while (index < position) {
            prev = current;
            current = current.next;
            index++;
        }

        prev.next = current.next;
        if (this.type === 'doubly' && current.next) {
            current.next.prev = prev;
        }
        this.size--;
        return current;
    }

    // Search for value
    search(value) {
        let current = this.head;
        let index = 0;
        
        while (current) {
            if (current.value == value) {
                return index;
            }
            current = current.next;
            index++;
            if (current === this.head) break; // For circular lists
        }
        return -1;
    }

    // Reverse the list
    reverse() {
        let prev = null;
        let current = this.head;
        let next = null;
        
        while (current) {
            next = current.next;
            current.next = prev;
            if (this.type === 'doubly') {
                current.prev = next;
            }
            prev = current;
            current = next;
            if (current === this.head) break; // For circular lists
        }
        
        this.tail = this.head;
        this.head = prev;
        
        if (this.type === 'circular') {
            this.tail.next = this.head;
        }
    }

    // Sort the list (bubble sort)
    sort() {
        if (this.size <= 1) return;
        
        let swapped;
        do {
            swapped = false;
            let current = this.head;
            
            while (current && current.next) {
                if (parseInt(current.value) > parseInt(current.next.value)) {
                    // Swap values
                    const temp = current.value;
                    current.value = current.next.value;
                    current.next.value = temp;
                    swapped = true;
                }
                current = current.next;
                if (current === this.head) break; // For circular lists
            }
        } while (swapped);
    }

    // Clear the list
    clear() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    // Get list as array for visualization
    toArray() {
        const result = [];
        let current = this.head;
        let visited = new Set();
        
        while (current && !visited.has(current.id)) {
            result.push({
                value: current.value,
                id: current.id,
                isHead: current === this.head,
                isTail: current === this.tail
            });
            visited.add(current.id);
            current = current.next;
            if (current === this.head) break; // For circular lists
        }
        
        return result;
    }
}

// Initialize linked list
let linkedList = new LinkedList('singly');
let currentType = 'singly';
let isAnimating = false;
let animationSpeed = 800;

// DOM elements
const nodeValueInput = document.getElementById('nodeValue');
const positionInput = document.getElementById('positionInput');
const listContainer = document.getElementById('listContainer');
const output = document.getElementById('output');
const listSize = document.getElementById('listSize');
const listHead = document.getElementById('listHead');
const listTail = document.getElementById('listTail');
const listTypeSpan = document.getElementById('listType');

// Color palette for nodes
const nodeColors = [
    'from-purple-500 to-pink-500 border-purple-400',
    'from-blue-500 to-cyan-500 border-blue-400',
    'from-green-500 to-emerald-500 border-green-400',
    'from-yellow-500 to-amber-500 border-yellow-400',
    'from-red-500 to-pink-500 border-red-400',
    'from-indigo-500 to-purple-500 border-indigo-400',
    'from-teal-500 to-green-500 border-teal-400',
    'from-orange-500 to-red-500 border-orange-400'
];

// Update visualization
function updateVisualization() {
    listContainer.innerHTML = '';
    const nodes = linkedList.toArray();
    
    if (nodes.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'text-gray-400 text-lg';
        emptyMessage.textContent = 'Linked list is empty. Add nodes using Insert operations.';
        listContainer.appendChild(emptyMessage);
        return;
    }

    // Create a container for the list
    const listVisual = document.createElement('div');
    listVisual.className = 'flex flex-wrap items-center justify-center gap-6';

    nodes.forEach((node, index) => {
        // Create node element
        const nodeElement = document.createElement('div');
        nodeElement.className = `node-element bg-gradient-to-br ${nodeColors[index % nodeColors.length]} text-white border-2 shadow-lg`;
        
        if (node.isHead) {
            nodeElement.innerHTML = `
                <div class="text-xs bg-white/20 px-2 py-1 rounded-full mb-1">HEAD</div>
                <div class="text-2xl font-bold">${node.value}</div>
                <div class="text-xs mt-1">Index: ${index}</div>
            `;
        } else if (node.isTail) {
            nodeElement.innerHTML = `
                <div class="text-xs bg-white/20 px-2 py-1 rounded-full mb-1">TAIL</div>
                <div class="text-2xl font-bold">${node.value}</div>
                <div class="text-xs mt-1">Index: ${index}</div>
            `;
        } else {
            nodeElement.innerHTML = `
                <div class="text-2xl font-bold">${node.value}</div>
                <div class="text-xs mt-1">Index: ${index}</div>
            `;
        }

        // Add to visual
        listVisual.appendChild(nodeElement);

        // Add arrow connector (except for last node in non-circular)
        if (index < nodes.length - 1 || currentType === 'circular') {
            const arrowDiv = document.createElement('div');
            
            if (currentType === 'doubly') {
                arrowDiv.className = 'double-arrow mx-2';
            } else if (currentType === 'circular' && index === nodes.length - 1) {
                const circularContainer = document.createElement('div');
                circularContainer.className = 'flex items-center gap-4';
                const circularArrow = document.createElement('div');
                circularArrow.className = 'circular-arrow';
                circularContainer.innerHTML = `
                    <div class="text-xs text-green-400">Circular</div>
                `;
                circularContainer.appendChild(circularArrow);
                listVisual.appendChild(circularContainer);
            } else {
                arrowDiv.className = 'arrow mx-2';
            }
            
            if (currentType !== 'circular' || index < nodes.length - 1) {
                listVisual.appendChild(arrowDiv);
            }
        }
    });

    listContainer.appendChild(listVisual);
    updateListInfo();
}

// Update list information
function updateListInfo() {
    listSize.textContent = linkedList.size;
    listTypeSpan.textContent = currentType.charAt(0).toUpperCase() + currentType.slice(1);
    
    if (linkedList.head) {
        listHead.textContent = linkedList.head.value;
        listTail.textContent = linkedList.tail ? linkedList.tail.value : 'None';
    } else {
        listHead.textContent = 'None';
        listTail.textContent = 'None';
    }
}

// Show output message
function showOutput(message, isError = false) {
    output.textContent = message;
    output.className = 'text-lg font-mono bg-gray-900/50 p-2 rounded-lg min-h-[40px] flex items-center justify-center message-animation';
    
    if (isError) {
        output.classList.add('text-red-400');
    } else {
        output.classList.add('text-green-400');
    }
    
    setTimeout(() => {
        output.classList.remove('message-animation');
    }, 300);
}

// Sleep function for animations
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Change list type
function changeListType(type) {
    if (isAnimating) return;
    
    currentType = type;
    const oldList = linkedList.toArray();
    linkedList = new LinkedList(type);
    
    // Re-add all nodes
    oldList.forEach(node => {
        linkedList.insertTail(node.value);
    });
    
    // Update UI
    document.querySelectorAll('.list-type-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (type === 'singly') {
        document.getElementById('singlyBtn').classList.add('active');
    } else if (type === 'doubly') {
        document.getElementById('doublyBtn').classList.add('active');
    } else {
        document.getElementById('circularBtn').classList.add('active');
    }
    
    showOutput(`Changed to ${type} linked list`);
    updateVisualization();
}

// Insert at head
async function insertHead() {
    const value = nodeValueInput.value.trim();
    if (!value) {
        showOutput('Please enter a value', true);
        return;
    }
    
    if (isAnimating) return;
    isAnimating = true;
    
    showOutput(`Inserting ${value} at head...`);
    linkedList.insertHead(value);
    
    // Animation
    updateVisualization();
    const nodes = listContainer.querySelectorAll('.node-element');
    if (nodes.length > 0) {
        nodes[0].classList.add('insert-animation');
        await sleep(animationSpeed);
        nodes[0].classList.remove('insert-animation');
    }
    
    showOutput(`Successfully inserted ${value} at head`);
    nodeValueInput.value = '';
    nodeValueInput.focus();
    isAnimating = false;
}

// Insert at tail
async function insertTail() {
    const value = nodeValueInput.value.trim();
    if (!value) {
        showOutput('Please enter a value', true);
        return;
    }
    
    if (isAnimating) return;
    isAnimating = true;
    
    showOutput(`Inserting ${value} at tail...`);
    linkedList.insertTail(value);
    
    // Animation
    updateVisualization();
    const nodes = listContainer.querySelectorAll('.node-element');
    if (nodes.length > 0) {
        nodes[nodes.length - 1].classList.add('insert-animation');
        await sleep(animationSpeed);
        nodes[nodes.length - 1].classList.remove('insert-animation');
    }
    
    showOutput(`Successfully inserted ${value} at tail`);
    nodeValueInput.value = '';
    isAnimating = false;
}

// Insert at position
async function insertAt() {
    const value = nodeValueInput.value.trim();
    const position = parseInt(positionInput.value);
    
    if (!value) {
        showOutput('Please enter a value', true);
        return;
    }
    
    if (isNaN(position) || position < 0 || position > linkedList.size) {
        showOutput(`Please enter a valid position (0-${linkedList.size})`, true);
        return;
    }
    
    if (isAnimating) return;
    isAnimating = true;
    
    showOutput(`Inserting ${value} at position ${position}...`);
    linkedList.insertAt(value, position);
    
    // Animation
    updateVisualization();
    const nodes = listContainer.querySelectorAll('.node-element');
    if (nodes.length > position) {
        nodes[position].classList.add('insert-animation');
        await sleep(animationSpeed);
        nodes[position].classList.remove('insert-animation');
    }
    
    showOutput(`Successfully inserted ${value} at position ${position}`);
    nodeValueInput.value = '';
    positionInput.value = '';
    isAnimating = false;
}

// Delete from head
async function deleteHead() {
    if (linkedList.size === 0) {
        showOutput('Linked list is empty', true);
        return;
    }
    
    if (isAnimating) return;
    isAnimating = true;
    
    const headValue = linkedList.head.value;
    showOutput(`Deleting head node (${headValue})...`);
    
    // Animation
    const nodes = listContainer.querySelectorAll('.node-element');
    if (nodes.length > 0) {
        nodes[0].classList.add('delete-animation');
        await sleep(animationSpeed);
    }
    
    linkedList.deleteHead();
    updateVisualization();
    showOutput(`Successfully deleted head node (${headValue})`);
    isAnimating = false;
}

// Delete from tail
async function deleteTail() {
    if (linkedList.size === 0) {
        showOutput('Linked list is empty', true);
        return;
    }
    
    if (isAnimating) return;
    isAnimating = true;
    
    const tailValue = linkedList.tail.value;
    showOutput(`Deleting tail node (${tailValue})...`);
    
    // Animation
    const nodes = listContainer.querySelectorAll('.node-element');
    if (nodes.length > 0) {
        nodes[nodes.length - 1].classList.add('delete-animation');
        await sleep(animationSpeed);
    }
    
    linkedList.deleteTail();
    updateVisualization();
    showOutput(`Successfully deleted tail node (${tailValue})`);
    isAnimating = false;
}

// Delete at position
async function deleteAt() {
    const position = parseInt(positionInput.value);
    
    if (linkedList.size === 0) {
        showOutput('Linked list is empty', true);
        return;
    }
    
    if (isNaN(position) || position < 0 || position >= linkedList.size) {
        showOutput(`Please enter a valid position (0-${linkedList.size - 1})`, true);
        return;
    }
    
    if (isAnimating) return;
    isAnimating = true;
    
    showOutput(`Deleting node at position ${position}...`);
    
    // Animation
    const nodes = listContainer.querySelectorAll('.node-element');
    if (nodes.length > position) {
        nodes[position].classList.add('delete-animation');
        await sleep(animationSpeed);
    }
    
    const deletedNode = linkedList.deleteAt(position);
    updateVisualization();
    showOutput(`Successfully deleted node ${deletedNode.value} at position ${position}`);
    positionInput.value = '';
    isAnimating = false;
}

// Search for value
async function search() {
    const value = nodeValueInput.value.trim();
    if (!value) {
        showOutput('Please enter a value to search', true);
        return;
    }
    
    if (isAnimating) return;
    isAnimating = true;
    
    showOutput(`Searching for ${value}...`);
    const position = linkedList.search(value);
    
    if (position !== -1) {
        // Highlight found node
        const nodes = listContainer.querySelectorAll('.node-element');
        if (nodes.length > position) {
            nodes[position].classList.add('border-4', 'border-yellow-400');
            await sleep(1000);
            nodes[position].classList.remove('border-4', 'border-yellow-400');
        }
        showOutput(`Found ${value} at position ${position}`);
    } else {
        showOutput(`${value} not found in the linked list`, true);
    }
    
    nodeValueInput.value = '';
    isAnimating = false;
}

// Reverse list
async function reverse() {
    if (linkedList.size <= 1) {
        showOutput('Linked list is too short to reverse', true);
        return;
    }
    
    if (isAnimating) return;
    isAnimating = true;
    
    showOutput('Reversing linked list...');
    linkedList.reverse();
    
    // Animation
    updateVisualization();
    await sleep(animationSpeed);
    
    showOutput('Successfully reversed linked list');
    isAnimating = false;
}

// Sort list
async function sort() {
    if (linkedList.size <= 1) {
        showOutput('Linked list is too short to sort', true);
        return;
    }
    
    if (isAnimating) return;
    isAnimating = true;
    
    showOutput('Sorting linked list...');
    linkedList.sort();
    
    // Animation
    updateVisualization();
    await sleep(animationSpeed);
    
    showOutput('Successfully sorted linked list');
    isAnimating = false;
}

// Clear list
async function clearList() {
    if (linkedList.size === 0) {
        showOutput('Linked list is already empty', true);
        return;
    }
    
    if (isAnimating) return;
    isAnimating = true;
    
    showOutput('Clearing linked list...');
    linkedList.clear();
    
    // Animation
    updateVisualization();
    await sleep(animationSpeed);
    
    showOutput('Successfully cleared linked list');
    isAnimating = false;
}

// Initialize with sample data
function initializeSampleData() {
    linkedList.clear();
    ['10', '20', '30', '40', '50'].forEach(value => {
        linkedList.insertTail(value);
    });
    updateVisualization();
    showOutput('Linked list initialized with sample data');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // List type buttons
    document.getElementById('singlyBtn').addEventListener('click', () => changeListType('singly'));
    document.getElementById('doublyBtn').addEventListener('click', () => changeListType('doubly'));
    document.getElementById('circularBtn').addEventListener('click', () => changeListType('circular'));
    
    // Insert operations
    document.getElementById('insertHeadBtn').addEventListener('click', insertHead);
    document.getElementById('insertTailBtn').addEventListener('click', insertTail);
    document.getElementById('insertAtBtn').addEventListener('click', insertAt);
    
    // Delete operations
    document.getElementById('deleteHeadBtn').addEventListener('click', deleteHead);
    document.getElementById('deleteTailBtn').addEventListener('click', deleteTail);
    document.getElementById('deleteAtBtn').addEventListener('click', deleteAt);
    
    // Advanced operations
    document.getElementById('searchBtn').addEventListener('click', search);
    document.getElementById('reverseBtn').addEventListener('click', reverse);
    document.getElementById('sortBtn').addEventListener('click', sort);
    document.getElementById('clearBtn').addEventListener('click', clearList);
    
    // Enter key support
    nodeValueInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            if (document.activeElement === nodeValueInput) {
                insertHead();
            }
        }
    });
    
    positionInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            if (document.activeElement === positionInput) {
                insertAt();
            }
        }
    });
    
    // Initialize
    initializeSampleData();
    nodeValueInput.focus();
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LinkedList, Node };
}