// Queue implementation
class Queue {
    constructor(capacity = 10) {
        this.items = [];
        this.capacity = capacity;
    }

    enqueue(element) {
        if (this.isFull()) {
            return false;
        }
        this.items.push(element);
        return true;
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items.shift();
    }

    front() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items[0];
    }

    rear() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    isFull() {
        return this.items.length >= this.capacity;
    }

    size() {
        return this.items.length;
    }

    clear() {
        this.items = [];
    }

    getItems() {
        return [...this.items];
    }
}

// Initialize queue
const queue = new Queue(10);

// DOM elements
const queueValueInput = document.getElementById('queueValue');
const enqueueBtn = document.getElementById('enqueueBtn');
const dequeueBtn = document.getElementById('dequeueBtn');
const frontBtn = document.getElementById('frontBtn');
const rearBtn = document.getElementById('rearBtn');
const sizeBtn = document.getElementById('sizeBtn');
const isEmptyBtn = document.getElementById('isEmptyBtn');
const clearBtn = document.getElementById('clearBtn');
const queueContainer = document.getElementById('queueContainer');
const output = document.getElementById('output');
const queueSize = document.getElementById('queueSize');
const queueFront = document.getElementById('queueFront');
const queueRear = document.getElementById('queueRear');
const queueCapacity = document.getElementById('queueCapacity');

// Colors for queue elements
const elementColors = [
    'from-purple-500 to-pink-500 border-purple-400',
    'from-blue-500 to-cyan-500 border-blue-400',
    'from-green-500 to-emerald-500 border-green-400',
    'from-yellow-500 to-amber-500 border-yellow-400',
    'from-red-500 to-pink-500 border-red-400',
    'from-indigo-500 to-purple-500 border-indigo-400',
    'from-teal-500 to-green-500 border-teal-400',
    'from-orange-500 to-red-500 border-orange-400',
    'from-cyan-500 to-blue-500 border-cyan-400',
    'from-pink-500 to-rose-500 border-pink-400'
];

// Update queue visualization
function updateQueueVisualization() {
    queueContainer.innerHTML = '';
    const items = queue.getItems();
    
    if (items.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'text-gray-400 text-lg';
        emptyMessage.textContent = 'Queue is empty. Add elements using Enqueue.';
        queueContainer.appendChild(emptyMessage);
    } else {
        items.forEach((item, index) => {
            const element = document.createElement('div');
            element.className = `queue-element bg-gradient-to-br ${elementColors[index % elementColors.length]} text-white border-2 shadow-lg`;
            
            // Add index indicator for first element
            if (index === 0) {
                element.innerHTML = `
                    <div class="text-xs bg-white/20 px-2 py-1 rounded-full mb-1">Front</div>
                    <div class="text-2xl font-bold">${item}</div>
                    <div class="text-xs mt-1">Index: ${index}</div>
                `;
            } else if (index === items.length - 1) {
                element.innerHTML = `
                    <div class="text-xs bg-white/20 px-2 py-1 rounded-full mb-1">Rear</div>
                    <div class="text-2xl font-bold">${item}</div>
                    <div class="text-xs mt-1">Index: ${index}</div>
                `;
            } else {
                element.innerHTML = `
                    <div class="text-2xl font-bold">${item}</div>
                    <div class="text-xs mt-1">Index: ${index}</div>
                `;
            }
            
            // Add animation for recently added element
            if (index === items.length - 1 && items.length > 1) {
                element.classList.add('enqueue-animation');
            }
            
            queueContainer.appendChild(element);
        });
    }
    
    // Update info panel
    updateQueueInfo();
}

// Update queue information panel
function updateQueueInfo() {
    queueSize.textContent = queue.size();
    queueCapacity.textContent = queue.capacity;
    
    const frontElement = queue.front();
    const rearElement = queue.rear();
    
    queueFront.textContent = frontElement !== null ? frontElement : 'None';
    queueRear.textContent = rearElement !== null ? rearElement : 'None';
}

// Show output message with animation
function showOutput(message, isError = false) {
    output.textContent = message;
    output.className = 'text-lg font-mono bg-gray-900/50 p-2 rounded-lg min-h-[40px] flex items-center justify-center message-animation';
    
    if (isError) {
        output.classList.add('text-red-400');
    } else {
        output.classList.add('text-green-400');
    }
    
    // Remove animation class after animation completes
    setTimeout(() => {
        output.classList.remove('message-animation');
    }, 300);
}

// Enqueue operation
function enqueueElement() {
    const value = queueValueInput.value.trim();
    
    if (!value) {
        showOutput('Please enter a value to enqueue', true);
        return;
    }
    
    if (queue.isFull()) {
        showOutput('Queue is full! Cannot enqueue more elements.', true);
        return;
    }
    
    const success = queue.enqueue(value);
    
    if (success) {
        showOutput(`Enqueued: "${value}" to the queue`);
        updateQueueVisualization();
        queueValueInput.value = '';
        queueValueInput.focus();
        
        // Add animation to the last element
        const elements = queueContainer.querySelectorAll('.queue-element');
        if (elements.length > 0) {
            elements[elements.length - 1].classList.add('enqueue-animation');
        }
    } else {
        showOutput('Failed to enqueue element', true);
    }
}

// Dequeue operation
function dequeueElement() {
    if (queue.isEmpty()) {
        showOutput('Queue is empty! Cannot dequeue.', true);
        return;
    }
    
    const dequeuedValue = queue.dequeue();
    showOutput(`Dequeued: "${dequeuedValue}" from the queue`);
    
    // Animate the dequeued element if it exists
    const firstElement = queueContainer.querySelector('.queue-element');
    if (firstElement) {
        firstElement.classList.add('dequeue-animation');
        setTimeout(() => {
            updateQueueVisualization();
        }, 500);
    } else {
        updateQueueVisualization();
    }
}

// Front operation
function showFront() {
    const frontElement = queue.front();
    
    if (frontElement !== null) {
        showOutput(`Front element: "${frontElement}"`);
        
        // Highlight front element
        const elements = queueContainer.querySelectorAll('.queue-element');
        if (elements.length > 0) {
            elements[0].classList.add('border-4', 'border-yellow-400');
            setTimeout(() => {
                elements[0].classList.remove('border-4', 'border-yellow-400');
            }, 1000);
        }
    } else {
        showOutput('Queue is empty! No front element.', true);
    }
}

// Rear operation
function showRear() {
    const rearElement = queue.rear();
    
    if (rearElement !== null) {
        showOutput(`Rear element: "${rearElement}"`);
        
        // Highlight rear element
        const elements = queueContainer.querySelectorAll('.queue-element');
        if (elements.length > 0) {
            elements[elements.length - 1].classList.add('border-4', 'border-blue-400');
            setTimeout(() => {
                elements[elements.length - 1].classList.remove('border-4', 'border-blue-400');
            }, 1000);
        }
    } else {
        showOutput('Queue is empty! No rear element.', true);
    }
}

// Size operation
function showSize() {
    const size = queue.size();
    showOutput(`Queue size: ${size} element${size !== 1 ? 's' : ''}`);
    
    // Pulse animation on size display
    queueSize.classList.add('scale-125');
    setTimeout(() => {
        queueSize.classList.remove('scale-125');
    }, 300);
}

// Is Empty operation
function checkIsEmpty() {
    const isEmpty = queue.isEmpty();
    
    if (isEmpty) {
        showOutput('Queue is empty', true);
    } else {
        showOutput('Queue is not empty');
    }
    
    // Visual feedback
    queueContainer.classList.add('border-2', isEmpty ? 'border-red-500' : 'border-green-500');
    setTimeout(() => {
        queueContainer.classList.remove('border-2', 'border-red-500', 'border-green-500');
    }, 1000);
}

// Clear queue operation
function clearQueue() {
    if (queue.isEmpty()) {
        showOutput('Queue is already empty', true);
        return;
    }
    
    queue.clear();
    showOutput('Queue cleared successfully');
    updateQueueVisualization();
}

// Event Listeners
enqueueBtn.addEventListener('click', enqueueElement);

dequeueBtn.addEventListener('click', dequeueElement);

frontBtn.addEventListener('click', showFront);

rearBtn.addEventListener('click', showRear);

sizeBtn.addEventListener('click', showSize);

isEmptyBtn.addEventListener('click', checkIsEmpty);

clearBtn.addEventListener('click', clearQueue);

// Enter key support for input
queueValueInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        enqueueElement();
    }
});

// Initialize visualization
updateQueueVisualization();

// Additional feature: Auto-generate random elements button
function addRandomElementButton() {
    const randomBtn = document.createElement('button');
    randomBtn.id = 'randomBtn';
    randomBtn.className = 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-2 px-4 rounded-lg border-2 border-indigo-700 hover:border-indigo-600 transition-all duration-300 w-full mt-3';
    randomBtn.innerHTML = '<i class="fas fa-random mr-2"></i> Add Random Element';
    
    // Insert after enqueue button
    const inputContainer = queueValueInput.parentElement;
    inputContainer.parentElement.insertBefore(randomBtn, inputContainer.nextSibling);
    
    randomBtn.addEventListener('click', () => {
        const randomValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        const randomValue = randomValues[Math.floor(Math.random() * randomValues.length)];
        queueValueInput.value = randomValue;
        enqueueElement();
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateQueueVisualization();
    addRandomElementButton();
    queueValueInput.focus();
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Queue };
}