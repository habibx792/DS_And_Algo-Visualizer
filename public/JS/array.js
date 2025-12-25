// Array Visualizer Implementation
class ArrayVisualizer {
    constructor() {
        this.arrayType = '1D';
        this.arraySize = 8;
        this.rows = 3;
        this.cols = 3;
        this.array = [];
        this.isAnimating = false;
        this.animationSpeed = 800;
        
        // Initialize DOM elements
        this.initializeElements();
        this.initializeArray();
    }

    initializeElements() {
        // Control buttons
        this.oneDBtn = document.getElementById('oneDBtn');
        this.twoDBtn = document.getElementById('twoDBtn');
        this.arraySizeInput = document.getElementById('arraySize');
        this.updateSizeBtn = document.getElementById('updateSizeBtn');
        this.rowsInput = document.getElementById('rowsInput');
        this.colsInput = document.getElementById('colsInput');
        this.arrayValueInput = document.getElementById('arrayValue');
        this.positionInput = document.getElementById('positionInput');
        
        // Operation buttons
        this.insertAtBtn = document.getElementById('insertAtBtn');
        this.searchBtn = document.getElementById('searchBtn');
        this.updateBtn = document.getElementById('updateBtn');
        this.deleteBtn = document.getElementById('deleteBtn');
        this.traverseBtn = document.getElementById('traverseBtn');
        this.sortBtn = document.getElementById('sortBtn');
        this.reverseBtn = document.getElementById('reverseBtn');
        this.randomBtn = document.getElementById('randomBtn');
        this.clearBtn = document.getElementById('clearBtn');
        
        // Containers
        this.oneDContainer = document.getElementById('oneDContainer');
        this.twoDContainer = document.getElementById('twoDContainer');
        this.arrayContainer = document.getElementById('arrayContainer');
        
        // Info displays
        this.output = document.getElementById('output');
        this.arrayTypeSpan = document.getElementById('arrayType');
        this.arrayDimensions = document.getElementById('arrayDimensions');
        this.arrayCells = document.getElementById('arrayCells');
        this.arrayRange = document.getElementById('arrayRange');
    }

    initializeArray() {
        if (this.arrayType === '1D') {
            this.generate1DArray();
        } else {
            this.generate2DArray();
        }
        this.updateInfoPanel();
    }

    generate1DArray() {
        this.array = [];
        for (let i = 0; i < this.arraySize; i++) {
            this.array.push({
                value: Math.floor(Math.random() * 100),
                index: i,
                highlighted: false
            });
        }
        this.render1DArray();
    }

    generate2DArray() {
        this.array = [];
        for (let r = 0; r < this.rows; r++) {
            const row = [];
            for (let c = 0; c < this.cols; c++) {
                row.push({
                    value: Math.floor(Math.random() * 100),
                    row: r,
                    col: c,
                    highlighted: false
                });
            }
            this.array.push(row);
        }
        this.render2DArray();
    }

    render1DArray() {
        this.oneDContainer.innerHTML = '';
        this.oneDContainer.classList.remove('hidden');
        this.twoDContainer.classList.add('hidden');

        const fragment = document.createDocumentFragment();
        
        this.array.forEach((element, index) => {
            const elementDiv = document.createElement('div');
            elementDiv.className = `array-element bg-gradient-to-br ${
                element.highlighted ? 'from-yellow-500 to-amber-500 border-yellow-400' : 
                'from-purple-500 to-pink-500 border-purple-400'
            } text-white border-2 shadow-lg cursor-pointer`;
            
            elementDiv.innerHTML = `
                <div class="text-xs bg-white/20 px-2 py-1 rounded-full mb-1">${index}</div>
                <div class="text-2xl font-bold">${element.value}</div>
            `;
            
            // Make clickable for direct editing
            elementDiv.addEventListener('click', () => {
                this.editElement(index);
            });
            
            elementDiv.dataset.index = index;
            fragment.appendChild(elementDiv);
        });
        
        this.oneDContainer.appendChild(fragment);
    }

    render2DArray() {
        this.twoDContainer.innerHTML = '';
        this.twoDContainer.classList.remove('hidden');
        this.oneDContainer.classList.add('hidden');

        // Set grid template
        this.twoDContainer.style.gridTemplateColumns = `repeat(${this.cols}, 1fr)`;
        this.twoDContainer.style.gridTemplateRows = `repeat(${this.rows}, 1fr)`;

        const fragment = document.createDocumentFragment();
        
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const element = this.array[r][c];
                const elementDiv = document.createElement('div');
                elementDiv.className = `array-element bg-gradient-to-br ${
                    element.highlighted ? 'from-yellow-500 to-amber-500 border-yellow-400' : 
                    'from-blue-500 to-cyan-500 border-blue-400'
                } text-white border-2 shadow-lg cursor-pointer`;
                
                elementDiv.innerHTML = `
                    <div class="row-label">Row ${r}</div>
                    <div class="text-2xl font-bold">${element.value}</div>
                    <div class="col-label">Col ${c}</div>
                `;
                
                // Make clickable for direct editing
                elementDiv.addEventListener('click', () => {
                    this.edit2DElement(r, c);
                });
                
                elementDiv.dataset.row = r;
                elementDiv.dataset.col = c;
                fragment.appendChild(elementDiv);
            }
        }
        
        this.twoDContainer.appendChild(fragment);
    }

    updateInfoPanel() {
        this.arrayTypeSpan.textContent = this.arrayType;
        
        if (this.arrayType === '1D') {
            this.arrayDimensions.textContent = this.arraySize;
            this.arrayCells.textContent = this.arraySize;
            this.arrayRange.textContent = `0-${this.arraySize - 1}`;
        } else {
            this.arrayDimensions.textContent = `${this.rows}×${this.cols}`;
            this.arrayCells.textContent = this.rows * this.cols;
            this.arrayRange.textContent = `[0,0]-[${this.rows-1},${this.cols-1}]`;
        }
    }

    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    showOutput(message, isError = false) {
        this.output.textContent = message;
        this.output.className = 'text-lg font-mono bg-gray-900/50 p-2 rounded-lg min-h-[40px] flex items-center justify-center message-animation';
        
        if (isError) {
            this.output.classList.add('text-red-400');
        } else {
            this.output.classList.add('text-green-400');
        }
        
        setTimeout(() => {
            this.output.classList.remove('message-animation');
        }, 300);
    }

    // Element editing
    editElement(index) {
        const currentValue = this.array[index].value;
        const newValue = prompt(`Edit value at index ${index}:`, currentValue);
        
        if (newValue !== null && newValue !== currentValue) {
            const numValue = parseInt(newValue);
            if (!isNaN(numValue)) {
                this.array[index].value = numValue;
                this.render1DArray();
                this.showOutput(`Updated index ${index} to ${numValue}`);
                
                // Animation
                const element = this.oneDContainer.children[index];
                element.classList.add('update-animation');
                setTimeout(() => element.classList.remove('update-animation'), 500);
            } else {
                this.showOutput('Please enter a valid number', true);
            }
        }
    }

    edit2DElement(row, col) {
        const currentValue = this.array[row][col].value;
        const newValue = prompt(`Edit value at [${row}][${col}]:`, currentValue);
        
        if (newValue !== null && newValue !== currentValue) {
            const numValue = parseInt(newValue);
            if (!isNaN(numValue)) {
                this.array[row][col].value = numValue;
                this.render2DArray();
                this.showOutput(`Updated [${row}][${col}] to ${numValue}`);
                
                // Animation
                const elements = this.twoDContainer.children;
                const elementIndex = row * this.cols + col;
                elements[elementIndex].classList.add('update-animation');
                setTimeout(() => elements[elementIndex].classList.remove('update-animation'), 500);
            } else {
                this.showOutput('Please enter a valid number', true);
            }
        }
    }

    // Operations
    async insertAt() {
        const value = this.arrayValueInput.value.trim();
        const position = this.positionInput.value.trim();
        
        if (!value) {
            this.showOutput('Please enter a value', true);
            return;
        }
        
        const numValue = parseInt(value);
        if (isNaN(numValue)) {
            this.showOutput('Please enter a valid number', true);
            return;
        }
        
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        if (this.arrayType === '1D') {
            if (!position || isNaN(position)) {
                this.showOutput('Please enter a valid index position', true);
                this.isAnimating = false;
                return;
            }
            
            const index = parseInt(position);
            if (index < 0 || index > this.array.length) {
                this.showOutput(`Index out of bounds. Valid range: 0-${this.array.length}`, true);
                this.isAnimating = false;
                return;
            }
            
            this.showOutput(`Inserting ${numValue} at index ${index}...`);
            
            // Animation
            if (this.oneDContainer.children[index]) {
                this.oneDContainer.children[index].classList.add('insert-animation');
                await this.sleep(this.animationSpeed);
            }
            
            // Insert (for visualization, we'll replace at index)
            this.array[index].value = numValue;
            this.render1DArray();
            this.showOutput(`Inserted ${numValue} at index ${index}`);
        } else {
            // 2D array insertion
            const [row, col] = position.split(',').map(p => parseInt(p.trim()));
            
            if (isNaN(row) || isNaN(col) || row < 0 || row >= this.rows || col < 0 || col >= this.cols) {
                this.showOutput(`Invalid position. Use format: row,col (e.g., 1,2)`, true);
                this.isAnimating = false;
                return;
            }
            
            this.showOutput(`Inserting ${numValue} at position [${row}][${col}]...`);
            
            // Animation
            const elementIndex = row * this.cols + col;
            const element = this.twoDContainer.children[elementIndex];
            if (element) {
                element.classList.add('insert-animation');
                await this.sleep(this.animationSpeed);
            }
            
            this.array[row][col].value = numValue;
            this.render2DArray();
            this.showOutput(`Inserted ${numValue} at [${row}][${col}]`);
        }
        
        this.arrayValueInput.value = '';
        this.positionInput.value = '';
        this.isAnimating = false;
    }

    async search() {
        const value = this.arrayValueInput.value.trim();
        
        if (!value) {
            this.showOutput('Please enter a value to search', true);
            return;
        }
        
        const searchValue = parseInt(value);
        if (isNaN(searchValue)) {
            this.showOutput('Please enter a valid number', true);
            return;
        }
        
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        this.showOutput(`Searching for ${searchValue}...`);
        
        if (this.arrayType === '1D') {
            let found = false;
            
            for (let i = 0; i < this.array.length; i++) {
                // Highlight current element being checked
                const element = this.oneDContainer.children[i];
                element.classList.add('search-animation');
                await this.sleep(300);
                
                if (this.array[i].value === searchValue) {
                    found = true;
                    this.showOutput(`Found ${searchValue} at index ${i}`);
                    element.classList.remove('search-animation');
                    element.classList.add('bg-gradient-to-r', 'from-green-500', 'to-emerald-500');
                    setTimeout(() => {
                        element.classList.remove('bg-gradient-to-r', 'from-green-500', 'to-emerald-500');
                        this.render1DArray();
                    }, 2000);
                    break;
                }
                
                element.classList.remove('search-animation');
                await this.sleep(100);
            }
            
            if (!found) {
                this.showOutput(`${searchValue} not found in array`, true);
            }
        } else {
            let found = false;
            
            for (let r = 0; r < this.rows; r++) {
                for (let c = 0; c < this.cols; c++) {
                    const elementIndex = r * this.cols + c;
                    const element = this.twoDContainer.children[elementIndex];
                    
                    if (element) {
                        element.classList.add('search-animation');
                        await this.sleep(200);
                        
                        if (this.array[r][c].value === searchValue) {
                            found = true;
                            this.showOutput(`Found ${searchValue} at position [${r}][${c}]`);
                            element.classList.remove('search-animation');
                            element.classList.add('bg-gradient-to-r', 'from-green-500', 'to-emerald-500');
                            setTimeout(() => {
                                element.classList.remove('bg-gradient-to-r', 'from-green-500', 'to-emerald-500');
                                this.render2DArray();
                            }, 2000);
                            break;
                        }
                        
                        element.classList.remove('search-animation');
                        await this.sleep(50);
                    }
                }
                if (found) break;
            }
            
            if (!found) {
                this.showOutput(`${searchValue} not found in array`, true);
            }
        }
        
        this.arrayValueInput.value = '';
        this.isAnimating = false;
    }

    async traverse() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        this.showOutput(`Traversing array...`);
        
        if (this.arrayType === '1D') {
            for (let i = 0; i < this.array.length; i++) {
                const element = this.oneDContainer.children[i];
                element.classList.add('search-animation');
                await this.sleep(300);
                element.classList.remove('search-animation');
                await this.sleep(100);
            }
            this.showOutput(`Traversal complete. Visited ${this.array.length} elements.`);
        } else {
            let count = 0;
            for (let r = 0; r < this.rows; r++) {
                for (let c = 0; c < this.cols; c++) {
                    const elementIndex = r * this.cols + c;
                    const element = this.twoDContainer.children[elementIndex];
                    
                    if (element) {
                        element.classList.add('search-animation');
                        await this.sleep(150);
                        element.classList.remove('search-animation');
                        await this.sleep(50);
                        count++;
                    }
                }
            }
            this.showOutput(`Traversal complete. Visited ${count} elements.`);
        }
        
        this.isAnimating = false;
    }

    async sort() {
        if (this.arrayType !== '1D') {
            this.showOutput('Sorting is only available for 1D arrays', true);
            return;
        }
        
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        this.showOutput('Sorting array using bubble sort...');
        
        // Create a copy for visualization
        const arrayCopy = [...this.array];
        
        // Bubble sort with visualization
        let swapped;
        do {
            swapped = false;
            for (let i = 0; i < arrayCopy.length - 1; i++) {
                // Highlight elements being compared
                const elements = this.oneDContainer.children;
                elements[i].classList.add('search-animation');
                elements[i + 1].classList.add('search-animation');
                await this.sleep(300);
                
                if (arrayCopy[i].value > arrayCopy[i + 1].value) {
                    // Swap
                    [arrayCopy[i], arrayCopy[i + 1]] = [arrayCopy[i + 1], arrayCopy[i]];
                    swapped = true;
                    
                    // Update visualization
                    this.array = arrayCopy;
                    this.render1DArray();
                    await this.sleep(300);
                }
                
                elements[i].classList.remove('search-animation');
                elements[i + 1].classList.remove('search-animation');
                await this.sleep(100);
            }
        } while (swapped);
        
        this.showOutput('Array sorted successfully');
        this.isAnimating = false;
    }

    async reverse() {
        if (this.arrayType !== '1D') {
            this.showOutput('Reverse is only available for 1D arrays', true);
            return;
        }
        
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        this.showOutput('Reversing array...');
        
        // Animate reversal
        for (let i = 0; i < Math.floor(this.array.length / 2); i++) {
            const leftIdx = i;
            const rightIdx = this.array.length - 1 - i;
            
            const leftElement = this.oneDContainer.children[leftIdx];
            const rightElement = this.oneDContainer.children[rightIdx];
            
            leftElement.classList.add('search-animation');
            rightElement.classList.add('search-animation');
            await this.sleep(300);
            
            // Swap
            [this.array[leftIdx], this.array[rightIdx]] = [this.array[rightIdx], this.array[leftIdx]];
            this.render1DArray();
            
            leftElement.classList.remove('search-animation');
            rightElement.classList.remove('search-animation');
            await this.sleep(200);
        }
        
        this.showOutput('Array reversed successfully');
        this.isAnimating = false;
    }

    randomize() {
        if (this.arrayType === '1D') {
            this.generate1DArray();
        } else {
            this.generate2DArray();
        }
        this.showOutput('Array randomized with new values');
    }

    clear() {
        if (this.arrayType === '1D') {
            this.array = Array(this.arraySize).fill().map((_, i) => ({
                value: 0,
                index: i,
                highlighted: false
            }));
            this.render1DArray();
        } else {
            for (let r = 0; r < this.rows; r++) {
                for (let c = 0; c < this.cols; c++) {
                    this.array[r][c].value = 0;
                    this.array[r][c].highlighted = false;
                }
            }
            this.render2DArray();
        }
        this.showOutput('Array cleared (all values set to 0)');
    }

    // Event listeners
    setupEventListeners() {
        // Array type switching
        this.oneDBtn.addEventListener('click', () => {
            if (this.isAnimating) return;
            this.arrayType = '1D';
            this.oneDBtn.classList.add('active');
            this.twoDBtn.classList.remove('active');
            document.getElementById('sizeControls1D').classList.remove('hidden');
            document.getElementById('sizeControls2D').classList.add('hidden');
            this.initializeArray();
            this.showOutput('Switched to 1D Array');
        });

        this.twoDBtn.addEventListener('click', () => {
            if (this.isAnimating) return;
            this.arrayType = '2D';
            this.twoDBtn.classList.add('active');
            this.oneDBtn.classList.remove('active');
            document.getElementById('sizeControls1D').classList.add('hidden');
            document.getElementById('sizeControls2D').classList.remove('hidden');
            this.initializeArray();
            this.showOutput('Switched to 2D Array');
        });

        // Size updates
        this.updateSizeBtn.addEventListener('click', () => {
            const newSize = parseInt(this.arraySizeInput.value);
            if (newSize >= 1 && newSize <= 20) {
                this.arraySize = newSize;
                this.generate1DArray();
                this.showOutput(`1D Array size updated to ${newSize}`);
            } else {
                this.showOutput('Please enter a size between 1 and 20', true);
            }
        });

        this.rowsInput.addEventListener('input', () => {
            const newRows = parseInt(this.rowsInput.value);
            if (newRows >= 1 && newRows <= 6 && this.arrayType === '2D') {
                this.rows = newRows;
                this.generate2DArray();
                this.showOutput(`2D Array rows updated to ${newRows}`);
            }
        });

        this.colsInput.addEventListener('input', () => {
            const newCols = parseInt(this.colsInput.value);
            if (newCols >= 1 && newCols <= 8 && this.arrayType === '2D') {
                this.cols = newCols;
                this.generate2DArray();
                this.showOutput(`2D Array columns updated to ${newCols}`);
            }
        });

        // Operation buttons
        this.insertAtBtn.addEventListener('click', () => this.insertAt());
        this.searchBtn.addEventListener('click', () => this.search());
        this.updateBtn.addEventListener('click', () => this.insertAt()); // Update uses same logic as insert
        this.deleteBtn.addEventListener('click', () => this.clear()); // Simplified delete
        this.traverseBtn.addEventListener('click', () => this.traverse());
        this.sortBtn.addEventListener('click', () => this.sort());
        this.reverseBtn.addEventListener('click', () => this.reverse());
        this.randomBtn.addEventListener('click', () => this.randomize());
        this.clearBtn.addEventListener('click', () => this.clear());

        // Enter key support
        this.arrayValueInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.insertAt();
            }
        });

        this.positionInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.insertAt();
            }
        });
    }

    initialize() {
        this.setupEventListeners();
        this.showOutput('1D Array initialized. Click on elements to edit values.');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const arrayVisualizer = new ArrayVisualizer();
    arrayVisualizer.initialize();
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ArrayVisualizer };
}