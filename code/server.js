import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { execSync } from "child_process"; // ✅ for killing old process

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files
app.use(express.static(path.join(__dirname))); // code folder
app.use('/src', express.static(path.join(__dirname, 'src'))); // src folder for CSS/JS

// API Key
const GEMINI_API_KEY = "AIzaSyCynQ0HeKgh4x50pgfC92pRT8stDeNjSTY";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash"
});

// Routes
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));
app.get("/test", (req, res) => res.sendFile(path.join(__dirname, "test.html")));
app.get("/algoViz", (req, res) => res.sendFile(path.join(__dirname, "algoViz.html")));

app.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ answer: "Please provide a question" });

    const systemPrompt = `You are an AI assistant that only answers questions about Data Structures and Algorithms (DSA).

IMPORTANT FORMATTING RULES - FOLLOW STRICTLY:

1. Use numbered lists for step-by-step explanations
2. Use bullet points for features and characteristics
3. For code blocks, use triple backticks with language specification
4. Use simple headings with ## and ### format
5. Structure your answer with clear sections
6. Always include time and space complexity
7. Provide practical examples
8. Use simple, clear language without excessive formatting

Format your response with clean, readable structure.`;

    const result = await model.generateContent(`${systemPrompt}\n\nUser: ${question}`);
    const response = await result.response;
    let text = response.text();

    text = formatCleanResponse(text);
    res.json({ answer: text });

  } catch (error) {
    console.error("❌ API Error:", error.message);
    res.status(500).json({
      answer: '<div class="error-message">Error connecting to AI service. Please try again.</div>'
    });
  }
});

// Clean formatting function (your original)
function formatCleanResponse(text) {
  text = text.replace(/##\s+(.*?)(?=\n|$)/g,
    '<h2 class="clean-heading font-semibold text-xl mt-6 mb-3 pb-2 border-b border-gray-300">$1</h2>');

  text = text.replace(/###\s+(.*?)(?=\n|$)/g,
    '<h3 class="clean-subheading font-medium text-lg mt-4 mb-2 text-gray-800">$1</h3>');

  text = text.replace(/```(\w+)?\n([\s\S]*?)```/g, function (match, language, code) {
    const lang = language || 'text';
    const formattedCode = escapeHtml(code.trim());
    return `
    <div class="clean-code-block my-4 rounded border border-gray-300 bg-gray-50 overflow-hidden">
      <div class="code-header flex justify-between items-center bg-gray-200 px-4 py-2 border-b border-gray-300">
        <span class="text-gray-700 text-sm font-mono">${lang}</span>
        <button class="copy-btn text-gray-600 hover:text-gray-800" onclick="copyCode(this)">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
        </button>
      </div>
      <pre class="p-4 overflow-x-auto"><code class="text-sm leading-relaxed font-mono">${formattedCode}</code></pre>
    </div>`;
  });

  text = text.replace(/`([^`]+)`/g,
    '<code class="inline-code bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono border border-gray-300">$1</code>');

  text = text.replace(/^(\d+)\.\s+(.*)$/gm,
    '<li class="numbered-item flex items-start mb-2"><span class="numbered-bullet text-gray-700 font-medium mr-2 mt-0.5">$1.</span><span class="numbered-text text-gray-700">$2</span></li>');
  text = text.replace(/(<li class="numbered-item.*?<\/li>)/gs,
    '<ol class="numbered-list my-3 space-y-1">$1</ol>');

  text = text.replace(/^\*\s+(.*)$/gm,
    '<li class="bullet-item flex items-start mb-2"><span class="bullet-point w-1.5 h-1.5 bg-gray-600 rounded-full mt-2 mr-3 flex-shrink-0"></span><span class="bullet-text text-gray-700">$1</span></li>');
  text = text.replace(/(<li class="bullet-item.*?<\/li>)/gs,
    '<ul class="bullet-list my-3 space-y-1">$1</ul>');

  text = text.replace(/\n\n/g, '</div><div class="paragraph mt-3">');
  text = text.replace(/\n/g, '<br>');

  return `<div class="clean-message-content space-y-3">${text}</div>`;
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ✅ Kill any process using port 3000 on Windows
try {
  execSync('for /f "tokens=5" %a in (\'netstat -a -n -o ^| findstr :3000 ^| findstr LISTENING\') do taskkill /F /PID %a');
  console.log("🧹 Previous process on port 3000 killed (if existed)");
} catch (err) {
  // no process to kill
}

// Start server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 DSA Chatbot Server running at http://localhost:${PORT}`);
  console.log("📁 Available pages:");
  console.log(`   - http://localhost:${PORT}/ (Home)`);
  console.log(`   - http://localhost:${PORT}/test (Test Page)`);
  console.log(`   - http://localhost:${PORT}/algoViz (Algorithm Visualizer)`);
});
