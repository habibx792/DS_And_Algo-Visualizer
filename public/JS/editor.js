// Global variables
let editor;
let currentLanguage = "javascript";

// Language configurations with file extensions
const languageConfigs = {
    javascript: {
        mode: "javascript",
        extension: "js",
        starterCode: `// JavaScript Code Editor
console.log("Welcome to DsaViz Code Editor!");

// Simple function example
function greet(name) {
    return "Hello, " + name + "!";
}

// Call the function
const message = greet("Developer");
console.log(message);

// Array operations
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log("Original:", numbers);
console.log("Doubled:", doubled);

// Object example
const user = {
    name: "John Doe",
    age: 25,
    skills: ["JavaScript", "Python", "HTML", "CSS"]
};

console.log("User:", user);`
    },
    python: {
        mode: "python",
        extension: "py",
        starterCode: `# Python Code Editor
print("Welcome to DsaViz Code Editor!")

# Simple function example
def greet(name):
    return f"Hello, {name}!"

# Call the function
message = greet("Developer")
print(message)

# List operations
numbers = [1, 2, 3, 4, 5]
doubled = [n * 2 for n in numbers]
print("Original:", numbers)
print("Doubled:", doubled)

# Dictionary example
user = {
    "name": "John Doe",
    "age": 25,
    "skills": ["Python", "JavaScript", "HTML", "CSS"]
}

print("User:", user)

# Conditional example
age = 25
if age >= 18:
    print("You are an adult")
else:
    print("You are a minor")`
    },
    java: {
        mode: "text/x-java",
        extension: "java",
        starterCode: `// Java Code Editor
public class Main {
    public static void main(String[] args) {
        System.out.println("Welcome to DsaViz Code Editor!");
        
        // Simple method example
        String message = greet("Developer");
        System.out.println(message);
        
        // Array operations
        int[] numbers = {1, 2, 3, 4, 5};
        System.out.print("Original: ");
        for (int n : numbers) {
            System.out.print(n + " ");
        }
        System.out.println();
        
        // Object example
        Person user = new Person("John Doe", 25);
        System.out.println("User: " + user.name + ", Age: " + user.age);
    }
    
    public static String greet(String name) {
        return "Hello, " + name + "!";
    }
}

class Person {
    String name;
    int age;
    
    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}`
    },
    cpp: {
        mode: "text/x-c++src",
        extension: "cpp",
        starterCode: `// C++ Code Editor
#include <iostream>
#include <vector>
using namespace std;

// Function prototype
string greet(string name);

int main() {
    cout << "Welcome to DsaViz Code Editor!" << endl;
    
    // Simple function example
    string message = greet("Developer");
    cout << message << endl;
    
    // Vector operations
    vector<int> numbers = {1, 2, 3, 4, 5};
    cout << "Original: ";
    for (int n : numbers) {
        cout << n << " ";
    }
    cout << endl;
    
    // Calculate sum
    int sum = 0;
    for (int n : numbers) {
        sum += n;
    }
    cout << "Sum: " << sum << endl;
    
    return 0;
}

string greet(string name) {
    return "Hello, " + name + "!";
}`
    },
    html: {
        mode: "htmlmixed",
        extension: "html",
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DsaViz HTML Editor</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.1);
            padding: 30px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
        }
        
        h1 {
            color: #fca311;
            text-align: center;
        }
        
        .feature {
            background: rgba(255, 255, 255, 0.1);
            padding: 15px;
            margin: 10px 0;
            border-radius: 8px;
        }
        
        button {
            background: #fca311;
            color: black;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
        }
        
        button:hover {
            background: #ffb84d;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to DsaViz HTML Editor</h1>
        <p>This is a sample HTML page created in the code editor.</p>
        
        <div class="feature">
            <h3>Features:</h3>
            <ul>
                <li>Live preview capability</li>
                <li>Multiple language support</li>
                <li>Save and load functionality</li>
                <li>Syntax highlighting</li>
            </ul>
        </div>
        
        <button onclick="showMessage()">Click Me!</button>
        <p id="message"></p>
    </div>
    
    <script>
        function showMessage() {
            document.getElementById('message').textContent = 
                'You clicked the button! Try editing this code.';
        }
    </script>
</body>
</html>`
    },
    css: {
        mode: "css",
        extension: "css",
        starterCode: `/* CSS Code Editor - Styling Examples */

/* Reset and base styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #1a237e 0%, #4a148c 100%);
    color: #fff;
    min-height: 100vh;
    padding: 20px;
}

/* Container styles */
.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 30px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    backdrop-filter: blur(10px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

/* Typography */
h1 {
    color: #fca311;
    font-size: 2.5rem;
    margin-bottom: 20px;
    text-align: center;
}

p {
    line-height: 1.6;
    margin-bottom: 15px;
}

/* Button styles */
.btn {
    display: inline-block;
    background: linear-gradient(135deg, #fca311 0%, #ff9800 100%);
    color: #000;
    padding: 12px 24px;
    border-radius: 50px;
    text-decoration: none;
    font-weight: bold;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(252, 163, 17, 0.4);
}

/* Card styles */
.card {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 15px;
    padding: 20px;
    margin: 20px 0;
    transition: transform 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
}

/* Animation example */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate {
    animation: fadeIn 0.8s ease-out;
}

/* Responsive design */
@media (max-width: 768px) {
    .container {
        padding: 20px;
    }
    
    h1 {
        font-size: 2rem;
    }
}`
    }
};

// Initialize the editor
function initEditor() {
    editor = CodeMirror.fromTextArea(document.getElementById("codeEditor"), {
        mode: languageConfigs[currentLanguage].mode,
        theme: localStorage.getItem("editorTheme") || "dracula",
        lineNumbers: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        styleActiveLine: true,
        lineWrapping: true,
        indentUnit: 4,
        viewportMargin: Infinity,
    });

    // Set initial content
    editor.setValue(languageConfigs[currentLanguage].starterCode);

    // Apply saved settings
    const savedFontSize = localStorage.getItem("editorFontSize") || "14px";
    const savedEditorHeight = localStorage.getItem("editorHeight") || "400px";
    const savedTheme = localStorage.getItem("editorTheme") || "dracula";

    document.getElementById("fontSizeSelect").value = savedFontSize;
    document.getElementById("editorHeightSelect").value = savedEditorHeight;
    document.getElementById("themeSelect").value = savedTheme;

    applyFontSize(savedFontSize);
    applyEditorHeight(savedEditorHeight);
    changeTheme();

    // Track cursor position
    editor.on("cursorActivity", function(cm) {
        const cursor = cm.getCursor();
        document.getElementById("lineNumber").textContent = cursor.line + 1;
        document.getElementById("colNumber").textContent = cursor.ch + 1;
    });

    // Keyboard shortcuts
    editor.on("keydown", function(cm, event) {
        // Ctrl+Enter or Cmd+Enter to run code
        if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
            event.preventDefault();
            runCode();
        }
        
        // Ctrl+S or Cmd+S to save
        if ((event.ctrlKey || event.metaKey) && event.key === "s") {
            event.preventDefault();
            saveCode();
        }
        
        // Ctrl+D or Cmd+D to download
        if ((event.ctrlKey || event.metaKey) && event.key === "d") {
            event.preventDefault();
            downloadCode();
        }
    });
}

// Change programming language
function changeLanguage() {
    const select = document.getElementById("languageSelect");
    currentLanguage = select.value;

    // Update UI
    document.getElementById("languageLabel").textContent = 
        select.options[select.selectedIndex].text;

    // Change editor mode
    editor.setOption("mode", languageConfigs[currentLanguage].mode);

    // Set starter code for the language
    editor.setValue(languageConfigs[currentLanguage].starterCode);
    
    // Update file name input with proper extension
    const fileNameInput = document.getElementById("fileNameInput");
    const currentFileName = fileNameInput.value.split('.')[0] || "code";
    const newExtension = languageConfigs[currentLanguage].extension;
    fileNameInput.value = `${currentFileName}.${newExtension}`;

    showToast(`Language changed to ${select.options[select.selectedIndex].text}`);
}

// Run code
function runCode() {
    const code = editor.getValue();
    const outputArea = document.getElementById("outputArea");

    // Clear previous output
    outputArea.textContent = "";

    try {
        // For JavaScript, we can use eval (with caution)
        if (currentLanguage === "javascript") {
            // Capture console.log output
            const originalLog = console.log;
            let output = "";

            console.log = function(...args) {
                output += args.join(" ") + "\n";
                originalLog.apply(console, args);
            };

            eval(code);

            console.log = originalLog;
            outputArea.textContent = output || "Code executed successfully (no output)";
        }
        // For HTML, create an iframe preview
        else if (currentLanguage === "html") {
            const iframe = document.createElement("iframe");
            iframe.style.width = "100%";
            iframe.style.height = "300px";
            iframe.style.border = "none";
            iframe.style.borderRadius = "10px";
            iframe.style.marginTop = "10px";
            
            outputArea.innerHTML = "";
            outputArea.appendChild(iframe);
            iframe.srcdoc = code;
            
            outputArea.textContent = "HTML Preview loaded. Check the iframe above.";
        }
        // For other languages, we can't execute them directly in the browser
        else {
            outputArea.textContent = 
                `Code execution for ${currentLanguage} is not fully supported in the browser.\n\n` +
                `Your ${currentLanguage.toUpperCase()} code:\n\n${code}\n\n` +
                `For ${currentLanguage === "python" ? "Python" : "Java/C++"} code, you would need a backend server to execute it properly.`;
        }
    } catch (error) {
        outputArea.textContent = `Error: ${error.message}\n\nStack trace:\n${error.stack}`;
    }
    
    // Scroll to output
    outputArea.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// Clear code editor
function clearCode() {
    if (confirm("Are you sure you want to clear the editor?")) {
        editor.setValue(languageConfigs[currentLanguage].starterCode);
        showToast("Editor cleared");
    }
}

// Clear output
function clearOutput() {
    document.getElementById("outputArea").textContent = "";
    showToast("Output cleared");
}

// Save code to localStorage
function saveCode() {
    const code = editor.getValue();
    const timestamp = new Date().toISOString();
    
    // Save with language and timestamp
    const savedCode = {
        code: code,
        language: currentLanguage,
        timestamp: timestamp,
        name: `code_${currentLanguage}_${Date.now()}`
    };
    
    // Get existing saves or create new array
    let saves = JSON.parse(localStorage.getItem("editorSaves")) || [];
    saves.push(savedCode);
    
    // Keep only last 10 saves
    if (saves.length > 10) {
        saves = saves.slice(-10);
    }
    
    localStorage.setItem("editorSaves", JSON.stringify(saves));
    localStorage.setItem(`lastCode_${currentLanguage}`, code);
    
    showToast("Code saved successfully!");
}

// Download code as file
function downloadCode() {
    let fileName = document.getElementById("fileNameInput").value.trim();
    
    // If no filename provided, use default with extension
    if (!fileName) {
        fileName = `code.${languageConfigs[currentLanguage].extension}`;
    } else {
        // Ensure the file has the correct extension
        const extension = languageConfigs[currentLanguage].extension;
        if (!fileName.endsWith(`.${extension}`)) {
            fileName = fileName.split('.')[0] + `.${extension}`;
        }
    }
    
    const code = editor.getValue();
    
    // Create download link
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast(`File "${fileName}" downloaded!`);
}

// Copy code to clipboard
function copyCode() {
    const code = editor.getValue();

    navigator.clipboard.writeText(code)
        .then(() => {
            showToast("Code copied to clipboard!");
        })
        .catch((err) => {
            console.error("Failed to copy code: ", err);
            showToast("Failed to copy code");
        });
}

// Change editor theme
function changeTheme() {
    const theme = document.getElementById("themeSelect").value;
    editor.setOption("theme", theme);
    localStorage.setItem("editorTheme", theme);
    showToast(`Theme changed to ${theme}`);
}

// Change editor font size
function changeFontSize() {
    const fontSize = document.getElementById("fontSizeSelect").value;
    applyFontSize(fontSize);
    localStorage.setItem("editorFontSize", fontSize);
}

function applyFontSize(size) {
    document.querySelector(".CodeMirror").style.fontSize = size;
}

// Change editor height
function changeEditorHeight() {
    const height = document.getElementById("editorHeightSelect").value;
    applyEditorHeight(height);
    localStorage.setItem("editorHeight", height);
}

function applyEditorHeight(height) {
    editor.setSize(null, height);
}

// Reset settings to defaults
function resetSettings() {
    if (confirm("Are you sure you want to reset all settings to defaults?")) {
        localStorage.removeItem("editorTheme");
        localStorage.removeItem("editorFontSize");
        localStorage.removeItem("editorHeight");

        document.getElementById("themeSelect").value = "dracula";
        document.getElementById("fontSizeSelect").value = "14px";
        document.getElementById("editorHeightSelect").value = "400px";

        changeTheme();
        changeFontSize();
        changeEditorHeight();

        showToast("Settings reset to defaults");
    }
}

// Show toast notification
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

// Modal functions
function openSettingsModal() {
    document.getElementById("settingsModal").classList.add("active");
}

function closeSettingsModal() {
    document.getElementById("settingsModal").classList.remove("active");
}

function toggleMobileMenu() {
    document.getElementById("mobileMenu").classList.toggle("hidden");
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", function() {
    initEditor();
    
    // Show welcome message
    setTimeout(() => {
        showToast("Welcome to DsaViz Code Editor! Press Ctrl+Enter to run code, Ctrl+D to download.");
    }, 1000);
});