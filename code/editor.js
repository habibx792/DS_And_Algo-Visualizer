
let htmlEditor, cssEditor, jsEditor;
let currentLayout = "grid";
let isFullscreen = false;
let autoRunEnabled = true;
let updateTimer;


function initEditors() {
  const editorConfig = {
    theme: localStorage.getItem("editorTheme") || "dracula",
    lineNumbers: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    styleActiveLine: true,
    lineWrapping: true,
    extraKeys: {
      "Ctrl-Space": "autocomplete",
      "Ctrl-/": "toggleComment",
    },
  };

  htmlEditor = CodeMirror.fromTextArea(document.getElementById("htmlEditor"), {
    ...editorConfig,
    mode: "htmlmixed",
  });

  cssEditor = CodeMirror.fromTextArea(document.getElementById("cssEditor"), {
    ...editorConfig,
    mode: "css",
  });

  jsEditor = CodeMirror.fromTextArea(document.getElementById("jsEditor"), {
    ...editorConfig,
    mode: "javascript",
  });

 
  loadSavedCode();


  const fontSize = localStorage.getItem("editorFontSize") || "14px";
  const height = localStorage.getItem("editorHeight") || "300px";
  applyFontSize(fontSize);
  applyEditorHeight(height);

  [htmlEditor, cssEditor, jsEditor].forEach((editor) => {
    editor.on("change", () => {
      if (autoRunEnabled) {
        clearTimeout(updateTimer);
        updateTimer = setTimeout(updatePreview, 800);
      }
    });
  });

  
  document.getElementById("autoRunToggle").checked = autoRunEnabled;
  document.getElementById("autoRunToggle").addEventListener("change", (e) => {
    autoRunEnabled = e.target.checked;
    showToast(autoRunEnabled ? "Auto-run enabled" : "Auto-run disabled");
  });

  updatePreview();
}


function loadSavedCode() {
  const savedHtml = localStorage.getItem("savedHtml");
  const savedCss = localStorage.getItem("savedCss");
  const savedJs = localStorage.getItem("savedJs");

  if (savedHtml && savedCss && savedJs) {
    htmlEditor.setValue(savedHtml);
    cssEditor.setValue(savedCss);
    jsEditor.setValue(savedJs);
  }
   else 
    {
    loadDefaultTemplate();
  }
}


function loadDefaultTemplate() {
  htmlEditor.setValue(`<!-- Welcome to DsaViz Code Playground -->
<div class="container">
  <h1 class="title">Hello, DsaViz! </h1>
  <p class="subtitle">Start coding and see live results!</p>
  <button class="btn" onclick="showMessage()">Click Me</button>
  <p id="msg" class="message"></p>
  <div class="card">
    <h3>Features:</h3>
    <ul>
      <li> Live preview</li>
      <li> Multiple themes</li>
      <li> Save & download</li>
      <li> Responsive design</li>
    </ul>
  </div>
</div>`);

  cssEditor.setValue(`/* Modern CSS Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
 background: linear-gradient(135deg, #2c376d 0%, #7a3db8 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.container {
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 600px;
  width: 100%;
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.title {
 color: #002a9c;
  font-size: 2.5rem;
  margin-bottom: 10px;
  text-align: center;
}

.subtitle {
  color: #666;
  text-align: center;
  margin-bottom: 30px;
  font-size: 1.1rem;
}

.btn {
      background: linear-gradient(135deg, #31418a 0%, #9d4ba2 100%);
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  margin: 0 auto 20px;
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.6);
}

.btn:active {
  transform: translateY(0);
}

.message {
  text-align: center;
  color: #3a1b59ff;
  font-size: 1.2rem;
  font-weight: bold;
  min-height: 30px;
  animation: slideIn 0.5s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.card {
  background: #f8f9fa;
  border-radius: 15px;
  padding: 20px;
  margin-top: 30px;
}

.card h3 {
      color: #ffffff;
  margin-bottom: 15px;
  font-size: 1.3rem;
}

.card ul {
  list-style: none;
  padding: 0;
}

.card li {
  padding: 8px 0;
  color: #555;
  font-size: 1rem;
}

@media (max-width: 600px) {
  .container {
    padding: 30px 20px;
  }
  
  .title {
    font-size: 2rem;
  }
}`);

  jsEditor.setValue(`// Interactive JavaScript
function showMessage() {
  const msgElement = document.getElementById('msg');
  const messages = [
    "Awesome! Keep coding! ",
    "You're doing great! ",
    "Code is poetry! ",
    "Keep learning! ",
    "Keep Silent",
    "Build amazing things! "
  ];
  
  const randomMsg = messages[Math.floor(Math.random() * messages.length)];
  msgElement.textContent = randomMsg;
  msgElement.style.animation = 'none';
  
  // Trigger reflow to restart animation
  setTimeout(() => {
    msgElement.style.animation = 'slideIn 0.5s ease-out';
  }, 10);
}

// Console welcome message
console.log('%c Welcome to DsaViz Code Playground! ', 
  'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 20px; padding: 10px; border-radius: 5px;');

// Add interactive console logging
console.log(' Tip: Open the browser console to see more!');
console.log(' Try modifying the CSS for different effects!');
console.log(' Happy coding!');`);
}


function updatePreview() {
  try {
    const html = htmlEditor.getValue();
    const css = "<style>" + cssEditor.getValue() + "</style>";
    const js = "<script>" + jsEditor.getValue() + "</script>";

    const outputFrame = document.getElementById("outputFrame");
    const content = html + css + js;

    outputFrame.srcdoc = content;

    
    const runBtn = document.getElementById("runBtn");
    runBtn.classList.add("glow-animation");
    setTimeout(() => {
      runBtn.classList.remove("glow-animation");
    }, 2000);
  } catch (error) {
    console.error("Preview error:", error);
    showToast("Error updating preview");
  }
}


function refreshPreview() {
  updatePreview();
  showToast("Preview refreshed!");
}


function toggleEditor(id) {
  const box = document.getElementById(id);
  box.classList.toggle("collapsed");
}


function toggleMobileMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.classList.toggle("hidden");
}


function copyCode(type, event) {
  event.stopPropagation();

  let code = "";
  switch (type) {
    case "html":
      code = htmlEditor.getValue();
      break;
    case "css":
      code = cssEditor.getValue();
      break;
    case "js":
      code = jsEditor.getValue();
      break;
  }

  navigator.clipboard
    .writeText(code)
    .then(() => {
      showToast(`${type.toUpperCase()} copied to clipboard!`);
    })
    .catch((err) => {
      console.error("Copy failed:", err);
      showToast("Copy failed!");
    });
}

// Save code to localStorage
function saveCode() {
  localStorage.setItem("savedHtml", htmlEditor.getValue());
  localStorage.setItem("savedCss", cssEditor.getValue());
  localStorage.setItem("savedJs", jsEditor.getValue());
  showToast("Code saved successfully!");
}


function clearCode() {
  if (confirm("Are you sure you want to clear all code?")) {
    htmlEditor.setValue("");
    cssEditor.setValue("");
    jsEditor.setValue("");
    updatePreview();
    showToast("Code cleared!");
  }
}

function downloadCode() {
  const html = htmlEditor.getValue();
  const css = cssEditor.getValue();
  const js = jsEditor.getValue();

  const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DsaViz Project</title>
  <style>
${css}
  </style>
</head>
<body>
${html}
  <script>
${js}
  <\/script>
</body>
</html>`;

  const blob = new Blob([fullHTML], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "dsaviz-project.html";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast("Code downloaded!");
}

function toggleLayout() {
  const grid = document.getElementById("editorsGrid");

  if (currentLayout === "grid") {
    grid.classList.remove("md:grid-cols-3");
    grid.classList.add("split-horizontal");
    currentLayout = "split";
    showToast("Split layout");
  } else {
    grid.classList.remove("split-horizontal");
    grid.classList.add("md:grid-cols-3");
    currentLayout = "grid";
    showToast("Grid layout");
  }
}

function toggleFullscreen() {
  const section = document.getElementById("playgroundSection");

  if (!isFullscreen) {
    section.classList.add("fullscreen-mode");
    isFullscreen = true;
    showToast("Fullscreen mode");
  } else {
    section.classList.remove("fullscreen-mode");
    isFullscreen = false;
    showToast("Exited fullscreen");
  }
}


function openTemplatesModal() {
  document.getElementById("templatesModal").classList.add("active");
}

function closeTemplatesModal() {
  document.getElementById("templatesModal").classList.remove("active");
}


function loadTemplate(templateName) {
  const templates = {
    "animated-button": {
      html: `<div class="button-container">
  <button class="animated-btn">
    <span>Hover Me!</span>
    <div class="ripple"></div>
  </button>
</div>`,
      css: `body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  font-family: Arial, sans-serif;
}

.button-container {
  text-align: center;
}

.animated-btn {
  position: relative;
  padding: 20px 50px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
}

.animated-btn:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.6);
}

.animated-btn:active {
  transform: translateY(0) scale(0.95);
}

.animated-btn span {
  position: relative;
  z-index: 2;
}

.ripple {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: scale(0);
  opacity: 0;
}

.animated-btn:hover .ripple {
  animation: rippleEffect 0.6s ease-out;
}

@keyframes rippleEffect {
  to {
    transform: scale(2);
    opacity: 0;
  }
}`,
      js: `console.log('Animated button loaded!');

const btn = document.querySelector('.animated-btn');
btn.addEventListener('click', function() {
  this.style.animation = 'pulse 0.5s ease';
  setTimeout(() => {
    this.style.animation = '';
  }, 500);
});`,
    },
    "card-layout": {
      html: `<div class="card-grid">
  <div class="card">
    <div class="card-icon"></div>
    <h3>Design</h3>
    <p>Beautiful and modern UI designs</p>
  </div>
  
  <div class="card">
    <div class="card-icon"></div>
    <h3>Code</h3>
    <p>Clean and efficient code</p>
  </div>
  
  <div class="card">
    <div class="card-icon"></div>
    <h3>Deploy</h3>
    <p>Fast and reliable deployment</p>
  </div>
  
  <div class="card">
    <div class="card-icon"></div>
    <h3>Responsive</h3>
    <p>Works on all devices</p>
  </div>
</div>`,
      css: `body {
  margin: 0;
  padding: 40px;
     background: linear-gradient(135deg, #1f2959 0%, #573678 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  min-height: 100vh;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.card {
  background: white;
  border-radius: 15px;
  padding: 30px;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 15px;
}

.card h3 {
  color: #667eea;
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.card p {
  color: #666;
  line-height: 1.6;
}`,
      js: `// Add click interaction to cards
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', function() {
    this.style.animation = 'cardPulse 0.5s ease';
    setTimeout(() => {
      this.style.animation = '';
    }, 500);
  });
});

// Add keyframe animation via JS
const style = document.createElement('style');
style.textContent = \`
  @keyframes cardPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
\`;
document.head.appendChild(style);

console.log('Card layout loaded!');`,
    },
    navbar: {
      html: `<nav class="navbar">
  <div class="nav-brand">MyWebsite</div>
  <button class="nav-toggle" onclick="toggleNav()">☰</button>
  <ul class="nav-menu" id="navMenu">
    <li><a href="#home">Home</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#services">Services</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</nav>

<div class="content">
  <h1>Welcome to Our Website</h1>
  <p>Responsive navigation bar example</p>
</div>`,
      css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background: #f5f5f5;
}

.navbar {
         background: linear-gradient(135deg, #533d76 0%, #22192e 100%);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-brand {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-toggle {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-menu li a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
  padding: 0.5rem 1rem;
  border-radius: 5px;
}

.nav-menu li a:hover {
  background: rgba(255, 255, 255, 0.2);
}

.content {
  text-align: center;
  padding: 4rem 2rem;
}

.content h1 {
  color: #0c1541;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .nav-toggle {
    display: block;
  }
  
  .nav-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #764ba2;
    flex-direction: column;
    gap: 0;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
  }
  
  .nav-menu.active {
    max-height: 300px;
  }
  
  .nav-menu li {
    padding: 0;
  }
  
  .nav-menu li a {
    display: block;
    padding: 1rem 2rem;
    border-radius: 0;
  }
}`,
      js: `function toggleNav() {
  const navMenu = document.getElementById('navMenu');
  navMenu.classList.toggle('active');
}

// Close menu when clicking outside
document.addEventListener('click', function(event) {
  const navbar = document.querySelector('.navbar');
  const navMenu = document.getElementById('navMenu');
  
  if (!navbar.contains(event.target)) {
    navMenu.classList.remove('active');
  }
});

console.log('Navigation bar loaded!');`,
    },
    form: {
      html: `<div class="form-container">
  <form id="contactForm">
    <h2>Contact Us</h2>
    
    <div class="form-group">
      <label for="name">Name</label>
      <input type="text" id="name" placeholder="Your name" required>
    </div>
    
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" id="email" placeholder="your@email.com" required>
    </div>
    
    <div class="form-group">
      <label for="message">Message</label>
      <textarea id="message" rows="4" placeholder="Your message" required></textarea>
    </div>
    
    <button type="submit">Send Message</button>
    
    <div id="formMessage"></div>
  </form>
</div>`,
      css: `body {
  margin: 0;
  padding: 20px;
    background: linear-gradient(135deg, #384789 0%, #7340a6 100%);
  font-family: Arial, sans-serif;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-container {
  background: white;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 100%;
}

form h2 {
      color: #253fb6;
  margin-bottom: 30px;
  text-align: center;
  font-size: 2rem;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  color: #333;
  font-weight: 600;
  margin-bottom: 8px;
}

input, textarea {
  width: 100%;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s;
  font-family: inherit;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

button {
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
}

#formMessage {
  margin-top: 20px;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
  display: none;
}

#formMessage.success {
  background: #d4edda;
  color: #155724;
  display: block;
}`,
      js: `document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  
  // Simulate form submission
  const formMessage = document.getElementById('formMessage');
  formMessage.textContent = \`Thank you, \${name}! Your message has been sent.\`;
  formMessage.classList.add('success');
  
  // Clear form
  this.reset();
  
  // Hide message after 5 seconds
  setTimeout(() => {
    formMessage.classList.remove('success');
  }, 5000);
});

console.log('Contact form loaded!');`,
    },
    todo: {
      html: `<div class="todo-app">
  <h1> Todo List</h1>
  
  <div class="input-container">
    <input type="text" id="todoInput" placeholder="Add a new task...">
    <button onclick="addTodo()">Add</button>
  </div>
  
  <ul id="todoList"></ul>
  
  <div class="stats">
    <span id="totalTasks">0 tasks</span>
  </div>
</div>`,
      css: `body {
  margin: 0;
  padding: 20px;
      background: linear-gradient(135deg, #1a2866 0%, #6d36a5 100%);
  font-family: Arial, sans-serif;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.todo-app {
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 100%;
}

h1 {
  color: #667eea;
  text-align: center;
  margin-bottom: 30px;
}

.input-container {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  flex: 1;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: #667eea;
}

button {
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

#todoList {
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
}

.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 10px;
  transition: all 0.3s;
}

.todo-item:hover {
  background: #e9ecef;
}

.todo-item.completed {
  opacity: 0.6;
  text-decoration: line-through;
}

.delete-btn {
  background: #dc3545;
  padding: 6px 12px;
  font-size: 0.9rem;
}

.stats {
  text-align: center;
  color: #666;
  font-weight: 600;
}`,
      js: `let todos = JSON.parse(localStorage.getItem('todos')) || [];

function renderTodos() {
  const list = document.getElementById('todoList');
  list.innerHTML = '';
  
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = 'todo-item' + (todo.completed ? ' completed' : '');
    li.innerHTML = \`
      <span onclick="toggleTodo(\${index})" style="cursor: pointer; flex: 1;">\${todo.text}</span>
      <button class="delete-btn" onclick="deleteTodo(\${index})">Delete</button>
    \`;
    list.appendChild(li);
  });
  
  document.getElementById('totalTasks').textContent = \`\${todos.length} task\${todos.length !== 1 ? 's' : ''}\`;
  localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo() {
  const input = document.getElementById('todoInput');
  const text = input.value.trim();
  
  if (text) {
    todos.push({ text, completed: false });
    input.value = '';
    renderTodos();
  }
}

function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

// Enter key to add todo
document.getElementById('todoInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') addTodo();
});

renderTodos();
console.log('Todo app loaded!');`,
    },
    calculator: {
      html: `<div class="calculator">
  <div class="display" id="display">0</div>
  
  <div class="buttons">
    <button onclick="clearDisplay()" class="btn-clear">C</button>
    <button onclick="appendOperator('/')" class="btn-operator">÷</button>
    <button onclick="appendOperator('*')" class="btn-operator">×</button>
    <button onclick="deleteChar()" class="btn-operator">←</button>
    
    <button onclick="appendNumber('7')">7</button>
    <button onclick="appendNumber('8')">8</button>
    <button onclick="appendNumber('9')">9</button>
    <button onclick="appendOperator('-')" class="btn-operator">−</button>
    
    <button onclick="appendNumber('4')">4</button>
    <button onclick="appendNumber('5')">5</button>
    <button onclick="appendNumber('6')">6</button>
    <button onclick="appendOperator('+')" class="btn-operator">+</button>
    
    <button onclick="appendNumber('1')">1</button>
    <button onclick="appendNumber('2')">2</button>
    <button onclick="appendNumber('3')">3</button>
    <button onclick="calculate()" class="btn-equals" style="grid-row: span 2">=</button>
    
    <button onclick="appendNumber('0')" style="grid-column: span 2">0</button>
    <button onclick="appendNumber('.')">.</button>
  </div>
</div>`,
      css: `body {
  margin: 0;
  padding: 20px;
     background: linear-gradient(135deg, #1a2866 0%, #6d36a5 100%);
  font-family: Arial, sans-serif;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.calculator {
  background: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  width: 320px;
}

.display {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  text-align: right;
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  min-height: 60px;
  word-wrap: break-word;
  overflow-x: auto;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

button {
  padding: 20px;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
  background: #f8f9fa;
  color: #333;
}

button:hover {
  background: #e9ecef;
  transform: scale(1.05);
}

button:active {
  transform: scale(0.95);
}

.btn-operator {
  background: #667eea;
  color: white;
}

.btn-operator:hover {
  background: #5568d3;
}

.btn-clear {
  background: #dc3545;
  color: white;
}

.btn-clear:hover {
  background: #c82333;
}

.btn-equals {
  background: #28a745;
  color: white;
}

.btn-equals:hover {
  background: #218838;
}`,
      js: `let currentDisplay = '0';
let operator = null;
let previousValue = null;
let shouldResetDisplay = false;

function updateDisplay() {
  document.getElementById('display').textContent = currentDisplay;
}

function appendNumber(num) {
  if (shouldResetDisplay) {
    currentDisplay = num;
    shouldResetDisplay = false;
  } else {
    currentDisplay = currentDisplay === '0' ? num : currentDisplay + num;
  }
  updateDisplay();
}

function appendOperator(op) {
  if (operator && !shouldResetDisplay) {
    calculate();
  }
  previousValue = parseFloat(currentDisplay);
  operator = op;
  shouldResetDisplay = true;
}

function calculate() {
  if (operator === null || previousValue === null) return;
  
  const current = parseFloat(currentDisplay);
  let result;
  
  switch (operator) {
    case '+':
      result = previousValue + current;
      break;
    case '-':
      result = previousValue - current;
      break;
    case '*':
      result = previousValue * current;
      break;
    case '/':
      result = previousValue / current;
      break;
  }
  
  currentDisplay = String(result);
  operator = null;
  previousValue = null;
  shouldResetDisplay = true;
  updateDisplay();
}

function clearDisplay() {
  currentDisplay = '0';
  operator = null;
  previousValue = null;
  shouldResetDisplay = false;
  updateDisplay();
}

function deleteChar() {
  currentDisplay = currentDisplay.length > 1 ? currentDisplay.slice(0, -1) : '0';
  updateDisplay();
}

console.log('Calculator loaded!');`,
    },
  };

  const template = templates[templateName];
  if (template) {
    htmlEditor.setValue(template.html);
    cssEditor.setValue(template.css);
    jsEditor.setValue(template.js);
    closeTemplatesModal();
    updatePreview();
    showToast(`Template loaded: ${templateName}`);
  }
}


function openSettingsModal() {
  document.getElementById("settingsModal").classList.add("active");

  const theme = localStorage.getItem("editorTheme") || "dracula";
  const fontSize = localStorage.getItem("editorFontSize") || "14px";
  const height = localStorage.getItem("editorHeight") || "300px";

  document.getElementById("themeSelect").value = theme;
  document.getElementById("fontSizeSelect").value = fontSize;
  document.getElementById("editorHeightSelect").value = height;
}

function closeSettingsModal() {
  document.getElementById("settingsModal").classList.remove("active");
}


function changeTheme() {
  const theme = document.getElementById("themeSelect").value;
  [htmlEditor, cssEditor, jsEditor].forEach((editor) => {
    editor.setOption("theme", theme);
  });
  localStorage.setItem("editorTheme", theme);
  showToast(`Theme changed to ${theme}`);
}

// Change font size
function changeFontSize() {
  const fontSize = document.getElementById("fontSizeSelect").value;
  applyFontSize(fontSize);
  localStorage.setItem("editorFontSize", fontSize);
  showToast(`Font size: ${fontSize}`);
}

function applyFontSize(size) {
  document.querySelectorAll(".CodeMirror").forEach((editor) => {
    editor.style.fontSize = size;
  });
}

// Change editor height
function changeEditorHeight() {
  const height = document.getElementById("editorHeightSelect").value;
  applyEditorHeight(height);
  localStorage.setItem("editorHeight", height);
  showToast(`Editor height: ${height}`);
}

function applyEditorHeight(height) {
  [htmlEditor, cssEditor, jsEditor].forEach((editor) => {
    editor.setSize(null, height);
  });
}

function resetSettings() {
  if (confirm("Reset all settings to default?")) {
    localStorage.removeItem("editorTheme");
    localStorage.removeItem("editorFontSize");
    localStorage.removeItem("editorHeight");


    [htmlEditor, cssEditor, jsEditor].forEach((editor) => {
      editor.setOption("theme", "dracula");
      editor.setSize(null, "300px");
    });
    applyFontSize("14px");

    document.getElementById("themeSelect").value = "dracula";
    document.getElementById("fontSizeSelect").value = "14px";
    document.getElementById("editorHeightSelect").value = "300px";

    showToast("Settings reset to defaults");
  }
}


function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function initLoginButton() {
  const loginBtn = document.getElementById("loginBtn");
  const isLoggedIn = localStorage.getItem("dsaLoggedIn") === "true";

  if (isLoggedIn) {
    loginBtn.textContent = "Logout";
    loginBtn.classList.remove("bg-goldAccent", "text-black");
    loginBtn.classList.add("bg-red-500", "hover:bg-red-600", "text-white");
    loginBtn.addEventListener("click", () => {
      localStorage.removeItem("dsaLoggedIn");
      showToast("You have been logged out.");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);
    });
  } else {
    loginBtn.addEventListener("click", () => {
      window.location.href = "login.html";
    });
  }
}


document.addEventListener("click", function (e) {
  if (e.target.classList.contains("modal")) {
    e.target.classList.remove("active");
  }
});


document.addEventListener("keydown", function (e) {

  if ((e.ctrlKey || e.metaKey) && e.key === "s") {
    e.preventDefault();
    saveCode();
  }

  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    e.preventDefault();
    updatePreview();
  }

  
  if (e.key === "Escape") {
    closeTemplatesModal();
    closeSettingsModal();
    if (isFullscreen) {
      toggleFullscreen();
    }
  }
});


window.addEventListener("DOMContentLoaded", function () {
  initEditors();
  initLoginButton();


  setTimeout(() => {
    showToast("Welcome to DsaViz Code Playground! ");
  }, 500);
});
