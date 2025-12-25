import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve ALL static files from all directories
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/JS', express.static(path.join(__dirname, 'public/JS')));
app.use('/HTML', express.static(path.join(__dirname, 'public/HTML')));
app.use('/CSS', express.static(path.join(__dirname, 'public/CSS')));

// Password hashing function
function hashPassword(password) {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
}

// In-memory database
const usersDB = [];

// DSA Knowledge Base
const dsaKnowledge = {
    "stack": `## 📚 Stack Data Structure
**LIFO (Last In First Out)** principle.

### 🔧 Operations:
1. **Push** - Add element to top (O(1))
2. **Pop** - Remove element from top (O(1))
3. **Peek** - View top element (O(1))

### 💻 Code Example:
\`\`\`javascript
class Stack {
    constructor() { this.items = []; }
    push(e) { this.items.push(e); }
    pop() { return this.items.pop(); }
    peek() { return this.items[this.items.length-1]; }
}
\`\`\``,

    "tree": `## 🌳 Binary Tree
Hierarchical structure with max 2 children per node.

### 🔄 Traversal Methods:
1. **Preorder**: Root → Left → Right
2. **Inorder**: Left → Root → Right
3. **Postorder**: Left → Right → Root

### ⚡ Time Complexity: O(n)`,
    
    "linked": `## 🔗 Linked List
Linear data structure with nodes.

### 📋 Types:
- **Singly Linked** (one direction)
- **Doubly Linked** (both directions)
- **Circular** (last points to first)

### 💻 Insert at head: O(1)
### 🔍 Search: O(n)`
};

// ==================== API ENDPOINTS ====================

// Register user
app.post('/api/register', (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({ 
                success: false, 
                error: 'All fields required' 
            });
        }
        
        if (password.length < 6) {
            return res.status(400).json({ 
                success: false, 
                error: 'Password must be 6+ characters' 
            });
        }
        
        // Check if user exists
        if (usersDB.find(u => u.email === email)) {
            return res.status(400).json({ 
                success: false, 
                error: 'Email already registered' 
            });
        }
        
        // Create user
        const user = {
            id: Date.now(),
            name,
            email,
            passwordHash: hashPassword(password),
            createdAt: new Date().toISOString()
        };
        
        usersDB.push(user);
        
        res.json({ 
            success: true, 
            message: `Welcome ${name}!`,
            user: { id: user.id, name, email }
        });
        
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: 'Server error' 
        });
    }
});

// Login user
app.post('/api/login', (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                error: 'Email and password required' 
            });
        }
        
        const user = usersDB.find(u => u.email === email);
        
        if (!user || user.passwordHash !== hashPassword(password)) {
            return res.status(401).json({ 
                success: false, 
                error: 'Invalid credentials' 
            });
        }
        
        res.json({ 
            success: true, 
            message: 'Login successful',
            user: { id: user.id, name: user.name, email: user.email }
        });
        
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: 'Server error' 
        });
    }
});

// Reset password
app.post('/api/reset-password', (req, res) => {
    try {
        const { email, newPassword } = req.body;
        
        if (!email || !newPassword) {
            return res.status(400).json({ 
                success: false, 
                error: 'Email and new password required' 
            });
        }
        
        if (newPassword.length < 6) {
            return res.status(400).json({ 
                success: false, 
                error: 'Password must be 6+ characters' 
            });
        }
        
        const userIndex = usersDB.findIndex(u => u.email === email);
        
        if (userIndex === -1) {
            return res.json({ 
                success: true, 
                message: 'If account exists, password updated' 
            });
        }
        
        usersDB[userIndex].passwordHash = hashPassword(newPassword);
        
        res.json({ 
            success: true, 
            message: 'Password updated successfully' 
        });
        
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: 'Server error' 
        });
    }
});

// DSA Tutor endpoint
app.post('/api/ask', (req, res) => {
    try {
        const { question } = req.body;
        
        if (!question) {
            return res.status(400).json({ 
                success: false, 
                error: 'Question required' 
            });
        }
        
        const q = question.toLowerCase();
        let answer = dsaKnowledge.stack; // Default
        
        if (q.includes('tree') || q.includes('binary')) {
            answer = dsaKnowledge.tree;
        } else if (q.includes('linked')) {
            answer = dsaKnowledge.linked;
        } else if (q.includes('sort') || q.includes('quick')) {
            answer = `## ⚡ Quick Sort
Divide-and-conquer algorithm.

**Complexity:**
- Best/Average: O(n log n)
- Worst: O(n²)

**Space:** O(log n)`;
        } else if (q.includes('time') && q.includes('complex')) {
            answer = `## ⏱️ Time Complexity
**Big O Notation:**
- O(1): Constant time
- O(log n): Logarithmic
- O(n): Linear
- O(n log n): Linearithmic
- O(n²): Quadratic`;
        }
        
        res.json({ 
            success: true, 
            answer: answer 
        });
        
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: 'Server error' 
        });
    }
});

// Get all users (for debugging)
app.get('/api/users', (req, res) => {
    res.json({ 
        success: true, 
        count: usersDB.length,
        users: usersDB.map(u => ({ id: u.id, name: u.name, email: u.email }))
    });
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        users: usersDB.length,
        time: new Date().toISOString()
    });
});

// ==================== HTML ROUTES ====================

// Clean URL routes (recommended)
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/signUp.html'));
});

app.get('/forgot-password', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/passforget.html'));
});

app.get('/main', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/mainPage.html'));
});

// Route for /passforget.html (FIXED ERROR)
app.get('/passforget.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/passforget.html'));
});

// Additional pages
app.get('/arrays', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/arrays.html'));
});

app.get('/datastructures', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/dataStructur.html'));
});

app.get('/queue', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/queue.html'));
});

app.get('/linkedlist', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/List_Visualizer.html'));
});

app.get('/algorithm-visualizer', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/algoViz.html'));
});

app.get('/editor', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/editor.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/contact.html'));
});

app.get('/help', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/help.html'));
});

// Legacy routes (your current URLs)
app.get('/public/HTML/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/login.html'));
});

app.get('/public/HTML/signUp', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/signUp.html'));
});

app.get('/public/HTML/passforget', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/passforget.html'));
});

app.get('/public/HTML/mainPage', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/mainPage.html'));
});

// ==================== FALLBACK ROUTES ====================
// For direct .html file access
app.get('/public/HTML/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/login.html'));
});

app.get('/public/HTML/signUp.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/signUp.html'));
});

app.get('/public/HTML/mainPage.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/mainPage.html'));
});

// Main home route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve any other .html file from HTML directory
app.get('*.html', (req, res) => {
    const requestedFile = req.path;
    const filePath = path.join(__dirname, 'public/HTML', requestedFile);
    
    if (fs.existsSync(filePath)) {
        return res.sendFile(filePath);
    }
    
    // Try root directory
    const rootPath = path.join(__dirname, requestedFile);
    if (fs.existsSync(rootPath)) {
        return res.sendFile(rootPath);
    }
    
    // Not found
    res.status(404).send(`
        <html>
            <head><title>404 - Page Not Found</title></head>
            <body style="font-family: Arial; padding: 40px; text-align: center;">
                <h1>404 - Page Not Found</h1>
                <p>The page you're looking for doesn't exist.</p>
                <p>Try one of these pages:</p>
                <ul style="list-style: none; padding: 20px;">
                    <li><a href="/">Home</a></li>
                    <li><a href="/login">Login</a></li>
                    <li><a href="/signup">Sign Up</a></li>
                    <li><a href="/forgot-password">Forgot Password</a></li>
                    <li><a href="/main">Main Page</a></li>
                </ul>
            </body>
        </html>
    `);
});

// 404 handler for all other routes
app.use((req, res) => {
    res.status(404).send(`
        <html>
            <head><title>404 - Page Not Found</title></head>
            <body style="font-family: Arial; padding: 40px; text-align: center;">
                <h1>404 - Page Not Found</h1>
                <p>Route: ${req.path}</p>
                <p>Available routes:</p>
                <ul style="list-style: none; padding: 20px;">
                    <li><a href="/">Home</a></li>
                    <li><a href="/login">Login</a></li>
                    <li><a href="/signup">Sign Up</a></li>
                    <li><a href="/forgot-password">Forgot Password</a></li>
                    <li><a href="/main">Main Page</a></li>
                </ul>
            </body>
        </html>
    `);
});

// ==================== START SERVER ====================
app.listen(PORT, () => {
    console.log(`🚀 Server running: http://localhost:${PORT}`);
    console.log(`📂 Root: ${__dirname}`);
    console.log(`\n🌐 MAIN URLS:`);
    console.log(`✅ http://localhost:${PORT}/ (Home)`);
    console.log(`✅ http://localhost:${PORT}/login`);
    console.log(`✅ http://localhost:${PORT}/signup`);
    console.log(`✅ http://localhost:${PORT}/forgot-password`);
    console.log(`✅ http://localhost:${PORT}/passforget.html (FIXED)`);
    console.log(`✅ http://localhost:${PORT}/main`);
    console.log(`✅ http://localhost:${PORT}/arrays`);
    console.log(`✅ http://localhost:${PORT}/queue`);
    console.log(`✅ http://localhost:${PORT}/linkedlist`);
    console.log(`\n🔧 LEGACY URLS (also work):`);
    console.log(`✅ http://localhost:${PORT}/public/HTML/login`);
    console.log(`✅ http://localhost:${PORT}/public/HTML/signUp`);
    console.log(`✅ http://localhost:${PORT}/public/HTML/passforget`);
    console.log(`✅ http://localhost:${PORT}/public/HTML/mainPage`);
    console.log(`\n📁 STATIC FILES:`);
    console.log(`✅ http://localhost:${PORT}/JS/login.js`);
    console.log(`✅ http://localhost:${PORT}/public/JS/login.js`);
    console.log(`✅ http://localhost:${PORT}/CSS/ (CSS files)`);
    console.log(`\n🔗 API ENDPOINTS:`);
    console.log(`✅ POST http://localhost:${PORT}/api/register`);
    console.log(`✅ POST http://localhost:${PORT}/api/login`);
    console.log(`✅ POST http://localhost:${PORT}/api/reset-password`);
    console.log(`✅ POST http://localhost:${PORT}/api/ask`);
    console.log(`✅ GET  http://localhost:${PORT}/api/health`);
    console.log(`✅ GET  http://localhost:${PORT}/api/users`);
});