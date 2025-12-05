// Queue Data Structures
let simpleQueue = [];
let circularQueue = {
    data: new Array(8).fill(null),
    front: -1,
    rear: -1,
    capacity: 8
};
let priorityQueue = [];
let dequeData = [];
let printerQueue = [];
let callQueue = [];
let taskQueue = [];

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

document.getElementById('themeToggle').addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Navigation
document.getElementById('homeBtn').addEventListener('click', function() {
    showSection('homeSection');
});

document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('click', function() {
        const tab = this.getAttribute('data-tab');
        showSection(tab + 'Section');
    });
});

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Helper Functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'error' ? 'rgba(248, 113, 113, 0.9)' : 'rgba(252, 163, 17, 0.9)'};
        color: white;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        backdrop-filter: blur(10px);
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Simple Queue Functions
function simpleEnqueue() {
    const input = document.getElementById('simpleInput');
    const value = input.value.trim();
    
    if (!value) {
        showNotification('Please enter a value', 'error');
        return;
    }
    
    simpleQueue.push(value);
    input.value = '';
    renderSimpleQueue();
    updateSimpleInfo();
    showNotification(`Enqueued: ${value}`);
}

function simpleDequeue() {
    if (simpleQueue.length === 0) {
        showNotification('Queue is empty!', 'error');
        return;
    }
    
    const element = document.querySelector('#simpleQueue .queue-element');
    if (element) {
        element.classList.add('dequeue-animation');
        setTimeout(() => {
            const value = simpleQueue.shift();
            renderSimpleQueue();
            updateSimpleInfo();
            showNotification(`Dequeued: ${value}`);
        }, 500);
    }
}

function simplePeek() {
    if (simpleQueue.length === 0) {
        showNotification('Queue is empty!', 'error');
        return;
    }
    showNotification(`Front element: ${simpleQueue[0]}`);
}

function simpleClear() {
    simpleQueue = [];
    renderSimpleQueue();
    updateSimpleInfo();
    showNotification('Queue cleared');
}

function renderSimpleQueue() {
    const container = document.getElementById('simpleQueue');
    container.innerHTML = '';
    
    if (simpleQueue.length === 0) {
        container.innerHTML = '<div style=\"color: var(--text-secondary); font-size: 1rem;\">Queue is empty</div>';
        return;
    }
    
    simpleQueue.forEach(value => {
        const element = document.createElement('div');
        element.className = 'queue-element';
        element.textContent = value;
        container.appendChild(element);
    });
}

function updateSimpleInfo() {
    document.getElementById('simpleSize').textContent = simpleQueue.length;
    document.getElementById('simpleFront').textContent = simpleQueue.length > 0 ? simpleQueue[0] : '-';
    document.getElementById('simpleRear').textContent = simpleQueue.length > 0 ? simpleQueue[simpleQueue.length - 1] : '-';
}

// Circular Queue Functions
function circularEnqueue() {
    const input = document.getElementById('circularInput');
    const value = input.value.trim();
    
    if (!value) {
        showNotification('Please enter a value', 'error');
        return;
    }
    
    // Check if queue is full
    if ((circularQueue.rear + 1) % circularQueue.capacity === circularQueue.front && circularQueue.front !== -1) {
        showNotification('Queue is full!', 'error');
        return;
    }
    
    if (circularQueue.front === -1) {
        circularQueue.front = 0;
        circularQueue.rear = 0;
    } else {
        circularQueue.rear = (circularQueue.rear + 1) % circularQueue.capacity;
    }
    
    circularQueue.data[circularQueue.rear] = value;
    input.value = '';
    renderCircularQueue();
    updateCircularInfo();
    showNotification(`Enqueued: ${value}`);
}

function circularDequeue() {
    if (circularQueue.front === -1) {
        showNotification('Queue is empty!', 'error');
        return;
    }
    
    const value = circularQueue.data[circularQueue.front];
    circularQueue.data[circularQueue.front] = null;
    
    if (circularQueue.front === circularQueue.rear) {
        circularQueue.front = -1;
        circularQueue.rear = -1;
    } else {
        circularQueue.front = (circularQueue.front + 1) % circularQueue.capacity;
    }
    
    renderCircularQueue();
    updateCircularInfo();
    showNotification(`Dequeued: ${value}`);
}

function circularPeek() {
    if (circularQueue.front === -1) {
        showNotification('Queue is empty!', 'error');
        return;
    }
    showNotification(`Front element: ${circularQueue.data[circularQueue.front]}`);
}

function circularClear() {
    circularQueue.data = new Array(8).fill(null);
    circularQueue.front = -1;
    circularQueue.rear = -1;
    renderCircularQueue();
    updateCircularInfo();
    showNotification('Queue cleared');
}

function renderCircularQueue() {
    const container = document.getElementById('circularQueue');
    container.innerHTML = '';
    
    for (let i = 0; i < circularQueue.capacity; i++) {
        const element = document.createElement('div');
        element.className = 'circular-element';
        
        const index = document.createElement('div');
        index.className = 'index';
        index.textContent = i;
        element.appendChild(index);
        
        if (circularQueue.data[i] !== null) {
            element.classList.add('filled');
            const value = document.createElement('div');
            value.className = 'value';
            value.textContent = circularQueue.data[i];
            element.appendChild(value);
        }
        
        if (i === circularQueue.front && circularQueue.front !== -1) {
            element.classList.add('front');
        }
        if (i === circularQueue.rear && circularQueue.rear !== -1) {
            element.classList.add('rear');
        }
        
        container.appendChild(element);
    }
}

function updateCircularInfo() {
    const size = circularQueue.front === -1 ? 0 : 
                 circularQueue.rear >= circularQueue.front ? 
                 circularQueue.rear - circularQueue.front + 1 : 
                 circularQueue.capacity - circularQueue.front + circularQueue.rear + 1;
    
    document.getElementById('circularSize').textContent = size;
    document.getElementById('circularFrontIdx').textContent = circularQueue.front;
    document.getElementById('circularRearIdx').textContent = circularQueue.rear;
}

// Priority Queue Functions
function priorityEnqueue() {
    const valueInput = document.getElementById('priorityValue');
    const priorityInput = document.getElementById('priorityLevel');
    const value = valueInput.value.trim();
    const priority = parseInt(priorityInput.value);
    
    if (!value || !priority) {
        showNotification('Please enter both value and priority', 'error');
        return;
    }
    
    const item = { value, priority };
    
    // Insert based on priority (lower number = higher priority)
    let inserted = false;
    for (let i = 0; i < priorityQueue.length; i++) {
        if (priority < priorityQueue[i].priority) {
            priorityQueue.splice(i, 0, item);
            inserted = true;
            break;
        }
    }
    
    if (!inserted) {
        priorityQueue.push(item);
    }
    
    valueInput.value = '';
    priorityInput.value = '';
    renderPriorityQueue();
    updatePriorityInfo();
    showNotification(`Enqueued: ${value} (Priority: ${priority})`);
}

function priorityDequeue() {
    if (priorityQueue.length === 0) {
        showNotification('Queue is empty!', 'error');
        return;
    }
    
    const element = document.querySelector('#priorityQueue .queue-element');
    if (element) {
        element.classList.add('dequeue-animation');
        setTimeout(() => {
            const item = priorityQueue.shift();
            renderPriorityQueue();
            updatePriorityInfo();
            showNotification(`Dequeued: ${item.value} (Priority: ${item.priority})`);
        }, 500);
    }
}

function priorityPeek() {
    if (priorityQueue.length === 0) {
        showNotification('Queue is empty!', 'error');
        return;
    }
    showNotification(`Highest priority: ${priorityQueue[0].value} (Priority: ${priorityQueue[0].priority})`);
}

function priorityClear() {
    priorityQueue = [];
    renderPriorityQueue();
    updatePriorityInfo();
    showNotification('Queue cleared');
}

function renderPriorityQueue() {
    const container = document.getElementById('priorityQueue');
    container.innerHTML = '';
    
    if (priorityQueue.length === 0) {
        container.innerHTML = '<div style=\"color: var(--text-secondary); font-size: 1rem;\">Queue is empty</div>';
        return;
    }
    
    priorityQueue.forEach(item => {
        const element = document.createElement('div');
        element.className = 'queue-element priority-label';
        element.textContent = item.value;
        element.setAttribute('data-priority', item.priority);
        container.appendChild(element);
    });
}

function updatePriorityInfo() {
    document.getElementById('prioritySize').textContent = priorityQueue.length;
    document.getElementById('priorityHighest').textContent = 
        priorityQueue.length > 0 ? `${priorityQueue[0].value} (P:${priorityQueue[0].priority})` : '-';
}

// Deque Functions
function dequePushFront() {
    const input = document.getElementById('dequeInput');
    const value = input.value.trim();
    
    if (!value) {
        showNotification('Please enter a value', 'error');
        return;
    }
    
    dequeData.unshift(value);
    input.value = '';
    renderDeque();
    updateDequeInfo();
    showNotification(`Pushed to front: ${value}`);
}

function dequePushRear() {
    const input = document.getElementById('dequeInput');
    const value = input.value.trim();
    
    if (!value) {
        showNotification('Please enter a value', 'error');
        return;
    }
    
    dequeData.push(value);
    input.value = '';
    renderDeque();
    updateDequeInfo();
    showNotification(`Pushed to rear: ${value}`);
}

function dequePopFront() {
    if (dequeData.length === 0) {
        showNotification('Deque is empty!', 'error');
        return;
    }
    
    const value = dequeData.shift();
    renderDeque();
    updateDequeInfo();
    showNotification(`Popped from front: ${value}`);
}

function dequePopRear() {
    if (dequeData.length === 0) {
        showNotification('Deque is empty!', 'error');
        return;
    }
    
    const value = dequeData.pop();
    renderDeque();
    updateDequeInfo();
    showNotification(`Popped from rear: ${value}`);
}

function dequeClear() {
    dequeData = [];
    renderDeque();
    updateDequeInfo();
    showNotification('Deque cleared');
}

function renderDeque() {
    const container = document.getElementById('dequeQueue');
    container.innerHTML = '';
    
    if (dequeData.length === 0) {
        container.innerHTML = '<div style=\"color: var(--text-secondary); font-size: 1rem;\">Deque is empty</div>';
        return;
    }
    
    dequeData.forEach(value => {
        const element = document.createElement('div');
        element.className = 'queue-element';
        element.textContent = value;
        container.appendChild(element);
    });
}

function updateDequeInfo() {
    document.getElementById('dequeSize').textContent = dequeData.length;
    document.getElementById('dequeFront').textContent = dequeData.length > 0 ? dequeData[0] : '-';
    document.getElementById('dequeRear').textContent = dequeData.length > 0 ? dequeData[dequeData.length - 1] : '-';
}

// Application Functions - Printer Queue
let jobCounter = 0;
function addPrintJob() {
    jobCounter++;
    const job = `Job-${jobCounter}`;
    printerQueue.push(job);
    renderPrinterQueue();
    showNotification(`Added print job: ${job}`);
}

function processPrintJob() {
    if (printerQueue.length === 0) {
        showNotification('No print jobs in queue!', 'error');
        return;
    }
    
    const job = printerQueue.shift();
    renderPrinterQueue();
    showNotification(`Processing: ${job}`);
}

function renderPrinterQueue() {
    const container = document.querySelector('#printerDemo .printer-queue');
    container.innerHTML = '';
    
    if (printerQueue.length === 0) {
        container.innerHTML = '<div style=\"color: var(--text-secondary);\">No jobs</div>';
        return;
    }
    
    printerQueue.forEach(job => {
        const element = document.createElement('div');
        element.className = 'app-item';
        element.textContent = job;
        container.appendChild(element);
    });
}

// Application Functions - Call Center
let callCounter = 0;
function addCall() {
    callCounter++;
    const call = `Call-${callCounter}`;
    callQueue.push(call);
    renderCallQueue();
    showNotification(`Incoming call: ${call}`);
}

function answerCall() {
    if (callQueue.length === 0) {
        showNotification('No calls waiting!', 'error');
        return;
    }
    
    const call = callQueue.shift();
    renderCallQueue();
    showNotification(`Answered: ${call}`);
}

function renderCallQueue() {
    const container = document.querySelector('#callDemo .call-queue');
    container.innerHTML = '';
    
    if (callQueue.length === 0) {
        container.innerHTML = '<div style=\"color: var(--text-secondary);\">No calls</div>';
        return;
    }
    
    callQueue.forEach(call => {
        const element = document.createElement('div');
        element.className = 'app-item';
        element.textContent = call;
        container.appendChild(element);
    });
}

// Application Functions - Task Scheduling
let taskCounter = 0;
const tasks = ['Update DB', 'Send Email', 'Generate Report', 'Backup Data', 'Clear Cache'];

function addTask() {
    const task = tasks[Math.floor(Math.random() * tasks.length)];
    taskCounter++;
    const taskName = `${task}-${taskCounter}`;
    taskQueue.push(taskName);
    renderTaskQueue();
    showNotification(`Scheduled: ${taskName}`);
}

function executeTask() {
    if (taskQueue.length === 0) {
        showNotification('No tasks in queue!', 'error');
        return;
    }
    
    const task = taskQueue.shift();
    renderTaskQueue();
    showNotification(`Executing: ${task}`);
}

function renderTaskQueue() {
    const container = document.querySelector('#taskDemo .task-queue');
    container.innerHTML = '';
    
    if (taskQueue.length === 0) {
        container.innerHTML = '<div style=\"color: var(--text-secondary);\">No tasks</div>';
        return;
    }
    
    taskQueue.forEach(task => {
        const element = document.createElement('div');
        element.className = 'app-item';
        element.textContent = task;
        container.appendChild(element);
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    const activeSection = document.querySelector('.section.active');
    
    if (e.key === 'Enter') {
        if (activeSection.id === 'simpleSection') {
            simpleEnqueue();
        } else if (activeSection.id === 'circularSection') {
            circularEnqueue();
        } else if (activeSection.id === 'prioritySection') {
            priorityEnqueue();
        } else if (activeSection.id === 'dequeSection') {
            dequePushRear();
        }
    }
});

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize on page load
initTheme();
renderSimpleQueue();
renderCircularQueue();
renderPriorityQueue();
renderDeque();
updateSimpleInfo();
updateCircularInfo();
updatePriorityInfo();
updateDequeInfo();
