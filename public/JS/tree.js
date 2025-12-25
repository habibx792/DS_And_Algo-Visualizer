document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const insertBtn = document.getElementById("insertBtn");
    const deleteBtn = document.getElementById("deleteBtn");
    const searchBtn = document.getElementById("searchBtn");
    const clearBtn = document.getElementById("clearBtn");
    const treeValue = document.getElementById("treeValue");
    const treeContainer = document.getElementById("treeContainer");
    const treeRoot = document.getElementById("treeRoot");
    const treeNodes = document.getElementById("treeNodes");
    const treeHeight = document.getElementById("treeHeight");
    const traversalOutput = document.getElementById("traversalOutput");
    const preorderBtn = document.getElementById("preorderBtn");
    const inorderBtn = document.getElementById("inorderBtn");
    const postorderBtn = document.getElementById("postorderBtn");
    const levelorderBtn = document.getElementById("levelorderBtn");

    // Binary Tree Node class
    class TreeNode {
        constructor(value) {
            this.value = parseInt(value);
            this.left = null;
            this.right = null;
            this.x = 0;
            this.y = 0;
        }
    }

    // Binary Tree class
    class BinaryTree {
        constructor() {
            this.root = null;
            this.nodeCount = 0;
        }

        insert(value) {
            const newNode = new TreeNode(value);
            
            if (!this.root) {
                this.root = newNode;
                this.nodeCount++;
                return true;
            }

            // Simple level-order insertion (not BST, just binary tree)
            const queue = [this.root];
            while (queue.length > 0) {
                const current = queue.shift();
                
                if (!current.left) {
                    current.left = newNode;
                    this.nodeCount++;
                    return true;
                } else if (!current.right) {
                    current.right = newNode;
                    this.nodeCount++;
                    return true;
                } else {
                    queue.push(current.left);
                    queue.push(current.right);
                }
            }
            return false;
        }

        search(value) {
            if (!this.root) return false;
            
            const queue = [this.root];
            while (queue.length > 0) {
                const current = queue.shift();
                if (current.value === parseInt(value)) {
                    return current;
                }
                if (current.left) queue.push(current.left);
                if (current.right) queue.push(current.right);
            }
            return null;
        }

        getHeight(node = this.root) {
            if (!node) return 0;
            const leftHeight = this.getHeight(node.left);
            const rightHeight = this.getHeight(node.right);
            return Math.max(leftHeight, rightHeight) + 1;
        }

        // Traversal methods
        preorder(node = this.root, result = []) {
            if (!node) return result;
            result.push(node.value);
            this.preorder(node.left, result);
            this.preorder(node.right, result);
            return result;
        }

        inorder(node = this.root, result = []) {
            if (!node) return result;
            this.inorder(node.left, result);
            result.push(node.value);
            this.inorder(node.right, result);
            return result;
        }

        postorder(node = this.root, result = []) {
            if (!node) return result;
            this.postorder(node.left, result);
            this.postorder(node.right, result);
            result.push(node.value);
            return result;
        }

        levelorder() {
            if (!this.root) return [];
            
            const result = [];
            const queue = [this.root];
            
            while (queue.length > 0) {
                const current = queue.shift();
                result.push(current.value);
                if (current.left) queue.push(current.left);
                if (current.right) queue.push(current.right);
            }
            return result;
        }
    }

    // Initialize tree
    const tree = new BinaryTree();

    // Event Listeners
    insertBtn.addEventListener("click", insertNode);
    deleteBtn.addEventListener("click", deleteNode);
    searchBtn.addEventListener("click", searchNode);
    clearBtn.addEventListener("click", clearTree);
    preorderBtn.addEventListener("click", () => performTraversal('preorder'));
    inorderBtn.addEventListener("click", () => performTraversal('inorder'));
    postorderBtn.addEventListener("click", () => performTraversal('postorder'));
    levelorderBtn.addEventListener("click", () => performTraversal('levelorder'));

    // Also allow Enter key for insert
    treeValue.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            insertNode();
        }
    });

    // Tree Operations
    function insertNode() {
        const value = treeValue.value.trim();
        
        if (!value) {
            alert("Please enter a value to insert");
            return;
        }

        const numValue = parseInt(value);
        if (isNaN(numValue)) {
            alert("Please enter a valid number");
            return;
        }

        if (tree.search(value)) {
            alert(`Value ${value} already exists in the tree`);
            return;
        }

        if (tree.nodeCount >= 15) {
            alert("Tree capacity reached! Maximum 15 nodes allowed");
            return;
        }

        tree.insert(value);
        treeValue.value = "";
        updateTreeInfo();
        drawTree();
    }

    function deleteNode() {
        const value = treeValue.value.trim();
        
        if (!value) {
            alert("Please enter a value to delete");
            return;
        }

        if (!tree.root) {
            alert("Tree is empty!");
            return;
        }

        const node = tree.search(value);
        if (!node) {
            alert(`Value ${value} not found in the tree`);
            return;
        }

        // Simple deletion: replace with last node in level order
        if (tree.root.value === parseInt(value)) {
            tree.root = null;
        } else {
            // Find parent and remove reference
            const parent = findParent(tree.root, parseInt(value));
            if (parent.left && parent.left.value === parseInt(value)) {
                parent.left = null;
            } else if (parent.right && parent.right.value === parseInt(value)) {
                parent.right = null;
            }
        }
        
        tree.nodeCount--;
        alert(`Value ${value} deleted from tree`);
        treeValue.value = "";
        updateTreeInfo();
        drawTree();
    }

    function findParent(node, value) {
        if (!node) return null;
        if ((node.left && node.left.value === value) || 
            (node.right && node.right.value === value)) {
            return node;
        }
        
        const leftResult = findParent(node.left, value);
        if (leftResult) return leftResult;
        
        return findParent(node.right, value);
    }

    function searchNode() {
        const value = treeValue.value.trim();
        
        if (!value) {
            alert("Please enter a value to search");
            return;
        }

        const node = tree.search(value);
        if (node) {
            alert(`Value ${value} found in the tree`);
            // Highlight the found node
            highlightNode(value, true);
        } else {
            alert(`Value ${value} not found in the tree`);
        }
    }

    function clearTree() {
        if (!tree.root) {
            alert("Tree is already empty!");
            return;
        }

        tree.root = null;
        tree.nodeCount = 0;
        updateTreeInfo();
        drawTree();
        traversalOutput.textContent = "-";
        alert("Tree cleared!");
    }

    function performTraversal(type) {
        if (!tree.root) {
            traversalOutput.textContent = "Tree is empty";
            return;
        }

        let result = [];
        let traversalName = "";
        
        switch(type) {
            case 'preorder':
                result = tree.preorder();
                traversalName = "Preorder";
                break;
            case 'inorder':
                result = tree.inorder();
                traversalName = "Inorder";
                break;
            case 'postorder':
                result = tree.postorder();
                traversalName = "Postorder";
                break;
            case 'levelorder':
                result = tree.levelorder();
                traversalName = "Level Order";
                break;
        }
        
        traversalOutput.textContent = `${traversalName}: ${result.join(" → ")}`;
        
        // Visual traversal animation
        animateTraversal(result);
    }

    function updateTreeInfo() {
        treeRoot.textContent = tree.root ? tree.root.value : "None";
        treeNodes.textContent = tree.nodeCount;
        treeHeight.textContent = tree.getHeight();
    }

    // Tree drawing functions
    function drawTree() {
        treeContainer.innerHTML = "";
        
        if (!tree.root) {
            const emptyMessage = document.createElement("div");
            emptyMessage.className = "text-gray-400 text-lg";
            emptyMessage.textContent = "Tree is empty";
            treeContainer.appendChild(emptyMessage);
            return;
        }

        // Calculate positions using BFS
        const positions = calculatePositions();
        
        // Draw edges first
        drawEdges(positions);
        
        // Draw nodes
        drawNodes(positions);
    }

    function calculatePositions() {
        const positions = new Map();
        if (!tree.root) return positions;
        
        const queue = [{node: tree.root, level: 0, pos: 400}]; // Center position
        const levelHeight = 100;
        
        while (queue.length > 0) {
            const {node, level, pos} = queue.shift();
            
            positions.set(node.value, {
                x: pos,
                y: 50 + level * levelHeight,
                node: node
            });
            
            // Calculate child positions
            const childSpacing = 200 / Math.pow(2, level + 1);
            
            if (node.left) {
                queue.push({
                    node: node.left,
                    level: level + 1,
                    pos: pos - childSpacing
                });
            }
            
            if (node.right) {
                queue.push({
                    node: node.right,
                    level: level + 1,
                    pos: pos + childSpacing
                });
            }
        }
        
        return positions;
    }

    function drawEdges(positions) {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "800");
        svg.setAttribute("height", "600");
        svg.classList.add("absolute", "top-0", "left-0", "z-0");
        
        for (const [value, data] of positions) {
            const node = data.node;
            
            if (node.left && positions.has(node.left.value)) {
                const leftData = positions.get(node.left.value);
                const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                line.setAttribute("x1", data.x);
                line.setAttribute("y1", data.y + 25);
                line.setAttribute("x2", leftData.x);
                line.setAttribute("y2", leftData.y - 25);
                line.setAttribute("stroke", "#8b5cf6");
                line.setAttribute("stroke-width", "2");
                svg.appendChild(line);
            }
            
            if (node.right && positions.has(node.right.value)) {
                const rightData = positions.get(node.right.value);
                const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                line.setAttribute("x1", data.x);
                line.setAttribute("y1", data.y + 25);
                line.setAttribute("x2", rightData.x);
                line.setAttribute("y2", rightData.y - 25);
                line.setAttribute("stroke", "#8b5cf6");
                line.setAttribute("stroke-width", "2");
                svg.appendChild(line);
            }
        }
        
        treeContainer.appendChild(svg);
    }

    function drawNodes(positions) {
        for (const [value, data] of positions) {
            const nodeElement = document.createElement("div");
            nodeElement.className = `
                absolute w-12 h-12 border-2 border-violet-500 rounded-full
                bg-gradient-to-br from-violet-600/70 to-purple-600/70
                flex items-center justify-center text-white font-bold
                shadow-lg cursor-pointer transform -translate-x-1/2 -translate-y-1/2
                hover:scale-110 hover:border-yellow-500 transition-all duration-300
            `;
            
            nodeElement.style.left = `${data.x}px`;
            nodeElement.style.top = `${data.y}px`;
            nodeElement.textContent = value;
            nodeElement.dataset.value = value;
            
            nodeElement.addEventListener("click", () => {
                treeValue.value = value;
            });
            
            treeContainer.appendChild(nodeElement);
        }
    }

    function highlightNode(value, isSearch = false) {
        const nodeElement = treeContainer.querySelector(`[data-value="${value}"]`);
        if (nodeElement) {
            if (isSearch) {
                nodeElement.classList.add("bg-green-600/70", "border-green-500", "animate-pulse");
                setTimeout(() => {
                    nodeElement.classList.remove("bg-green-600/70", "border-green-500", "animate-pulse");
                }, 1500);
            }
        }
    }

    function animateTraversal(values) {
        if (!values || values.length === 0) return;
        
        let index = 0;
        
        const interval = setInterval(() => {
            if (index < values.length) {
                highlightNode(values[index], false);
                index++;
            } else {
                clearInterval(interval);
            }
        }, 800);
    }

    // Initialize
    updateTreeInfo();
    drawTree();
});