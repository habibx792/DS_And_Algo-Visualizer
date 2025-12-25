document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const pushBtn = document.getElementById("pushBtn");
    const popBtn = document.getElementById("popBtn");
    const peekBtn = document.getElementById("peekBtn");
    const clearBtn = document.getElementById("clearBtn");
    const stackValue = document.getElementById("stackValue");
    const stackContainer = document.getElementById("stackContainer");
    const stackSize = document.getElementById("stackSize");
    const stackTop = document.getElementById("stackTop");
    const stackCapacity = document.getElementById("stackCapacity");

    // Stack data structure
    let stack = [];
    const MAX_CAPACITY = 10;

    // Initialize
    updateStackInfo();
    updateStackDisplay();

    // Event Listeners
    pushBtn.addEventListener("click", pushOperation);
    popBtn.addEventListener("click", popOperation);
    peekBtn.addEventListener("click", peekOperation);
    clearBtn.addEventListener("click", clearStack);

    // Also allow Enter key for push
    stackValue.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            pushOperation();
        }
    });

    // Stack Operations
    function pushOperation() {
        const value = stackValue.value.trim();
        
        if (!value) {
            alert("Please enter a value to push");
            return;
        }

        if (stack.length >= MAX_CAPACITY) {
            alert(`Stack is full! Maximum capacity is ${MAX_CAPACITY}`);
            return;
        }

        // Add to stack
        stack.push(value);
        
        // Clear input
        stackValue.value = "";
        
        // Update display
        updateStackInfo();
        updateStackDisplay();
        
        // Visual feedback for push
        highlightTopElement("push");
    }

    function popOperation() {
        if (stack.length === 0) {
            alert("Stack is empty! Cannot pop");
            return;
        }

        // Visual feedback before removing
        highlightTopElement("pop");
        
        // Small delay to show animation
        setTimeout(() => {
            // Remove from stack
            const poppedValue = stack.pop();
            alert(`Popped value: ${poppedValue}`);
            
            // Update display
            updateStackInfo();
            updateStackDisplay();
        }, 500);
    }

    function peekOperation() {
        if (stack.length === 0) {
            alert("Stack is empty!");
            return;
        }

        const topValue = stack[stack.length - 1];
        
        // Visual feedback for peek
        highlightTopElement("peek");
        
        // Show top value
        setTimeout(() => {
            alert(`Top value: ${topValue}`);
        }, 500);
    }

    function clearStack() {
        if (stack.length === 0) {
            alert("Stack is already empty!");
            return;
        }

        // Visual feedback for clear
        highlightAllElements("clear");
        
        // Small delay for animation
        setTimeout(() => {
            stack = [];
            updateStackInfo();
            updateStackDisplay();
            alert("Stack cleared!");
        }, 800);
    }

    // Update stack information display
    function updateStackInfo() {
        stackSize.textContent = stack.length;
        stackTop.textContent = stack.length > 0 ? stack[stack.length - 1] : "None";
        stackCapacity.textContent = MAX_CAPACITY;
    }

    // Update visual stack display
    function updateStackDisplay() {
        // Clear container
        stackContainer.innerHTML = "";
        
        if (stack.length === 0) {
            const emptyMessage = document.createElement("div");
            emptyMessage.className = "text-gray-400 text-lg";
            emptyMessage.textContent = "Stack is empty";
            stackContainer.appendChild(emptyMessage);
            return;
        }

        // Create stack elements from bottom to top
        for (let i = 0; i < stack.length; i++) {
            const element = document.createElement("div");
            element.className = `
                w-3/4 max-w-xs border-2 border-black rounded-lg px-6 py-4 
                backdrop-blur-xl bg-white/20 shadow-md transition-all duration-300
                flex items-center justify-center mb-2
            `;
            
            element.innerHTML = `
                <div class="text-2xl font-bold">${stack[i]}</div>
                <div class="text-sm text-gray-300 ml-4">Index: ${i}</div>
            `;
            
            // Add different colors based on position
            if (i === stack.length - 1) {
                // Top element
                element.classList.add("border-yellow-500", "bg-yellow-600/30");
                element.innerHTML += `<div class="text-xs text-yellow-300 mt-1">TOP</div>`;
            } else if (i === stack.length - 2) {
                // Second from top
                element.classList.add("border-orange-500", "bg-orange-600/30");
            } else {
                element.classList.add("border-violet-500", "bg-violet-600/30");
            }
            
            stackContainer.appendChild(element);
        }
    }

    // Visual feedback functions
    function highlightTopElement(operation) {
        const elements = stackContainer.querySelectorAll("div");
        if (elements.length === 0 || elements[0].classList.contains("text-gray-400")) return;
        
        const topElement = elements[elements.length - 1];
        
        switch(operation) {
            case "push":
                topElement.classList.add("animate-pulse", "border-green-500", "bg-green-600/40");
                setTimeout(() => {
                    topElement.classList.remove("animate-pulse", "border-green-500", "bg-green-600/40");
                }, 1000);
                break;
                
            case "pop":
                topElement.classList.add("animate-bounce", "border-red-500", "bg-red-600/40");
                setTimeout(() => {
                    topElement.classList.remove("animate-bounce", "border-red-500", "bg-red-600/40");
                }, 800);
                break;
                
            case "peek":
                topElement.classList.add("animate-ping", "border-yellow-500", "bg-yellow-600/40");
                setTimeout(() => {
                    topElement.classList.remove("animate-ping", "border-yellow-500", "bg-yellow-600/40");
                }, 800);
                break;
        }
    }

    function highlightAllElements(operation) {
        const elements = stackContainer.querySelectorAll("div");
        if (elements.length === 0 || elements[0].classList.contains("text-gray-400")) return;
        
        elements.forEach(element => {
            if (operation === "clear") {
                element.classList.add("border-red-500", "bg-red-600/40", "animate-pulse");
            }
        });
    }

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
        if (e.ctrlKey) {
            switch(e.key.toLowerCase()) {
                case 'p':
                    e.preventDefault();
                    pushOperation();
                    break;
                case 'o':
                    e.preventDefault();
                    popOperation();
                    break;
                case 'e':
                    e.preventDefault();
                    peekOperation();
                    break;
                case 'c':
                    e.preventDefault();
                    clearStack();
                    break;
            }
        }
    });
});