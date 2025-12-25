document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    if (localStorage.getItem('dsaLoggedIn') !== 'true') {
        window.location.href = 'login';
        return;
    }
    
    // Elements
    const userNameElement = document.getElementById('userName');
    const displayUserNameElement = document.getElementById('displayUserName');
    const logoutBtn = document.getElementById('logoutBtn');
    const questionInput = document.getElementById('question');
    const sendBtn = document.getElementById('sendBtn');
    const chatContainer = document.getElementById('chat');
    
    // Set user info
    const userName = localStorage.getItem('currentUserName') || 'User';
    if (userNameElement) {
        userNameElement.textContent = userName;
    }
    if (displayUserNameElement) {
        displayUserNameElement.textContent = userName;
    }
    
    // Logout handler
    logoutBtn.addEventListener('click', function() {
        if (confirm(`Logout ${userName}?`)) {
            localStorage.removeItem('dsaLoggedIn');
            localStorage.removeItem('currentUserId');
            localStorage.removeItem('currentUserName');
            localStorage.removeItem('currentUserEmail');
            window.location.href = 'login';
        }
    });
    
    // Send question on Enter key
    questionInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            askQuestion();
        }
    });
    
    // Send button click
    sendBtn.addEventListener('click', askQuestion);
    
    // Quick question buttons
    document.querySelectorAll('.quick-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            questionInput.value = question;
            setTimeout(askQuestion, 300);
        });
    });
    
    // Ask question function
    async function askQuestion() {
        const question = questionInput.value.trim();
        if (!question) {
            showNotification('Please enter a question', 'error');
            return;
        }
        
        // Add user message
        addMessage(question, 'user');
        questionInput.value = '';
        
        // Show typing indicator
        const typingDiv = addMessage('Thinking...', 'bot', true);
        
        try {
            // Send to server
            const response = await fetch('/api/ask', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question })
            });
            
            const data = await response.json();
            
            // Remove typing indicator
            if (typingDiv && typingDiv.parentNode) {
                typingDiv.remove();
            }
            
            // Add bot response
            if (data.success) {
                addMessage(data.answer, 'bot');
            } else {
                addMessage('Error: ' + (data.error || 'Unknown error'), 'bot');
            }
            
        } catch (error) {
            console.error('Error:', error);
            
            // Remove typing indicator
            if (typingDiv && typingDiv.parentNode) {
                typingDiv.remove();
            }
            
            // Add error message
            addMessage('Sorry, I encountered an error. Please try again.', 'bot');
        }
    }
    
    // Add message to chat
    function addMessage(content, sender, isTyping = false) {
        const div = document.createElement('div');
        div.classList.add('fade-in');
        
        if (sender === 'user') {
            div.classList.add('flex', 'justify-end');
            div.innerHTML = `
                <div class="bg-goldAccent text-navyDeep rounded-lg px-4 py-3 max-w-xl shadow-lg">
                    <div class="font-semibold mb-1">You</div>
                    <p>${escapeHtml(content)}</p>
                </div>`;
        } else {
            div.classList.add('flex', 'justify-start');
            
            if (isTyping) {
                div.innerHTML = `
                    <div class="bg-white/10 border border-white/20 rounded-lg px-4 py-3">
                        <div class="flex items-center space-x-2">
                            <div class="w-5 h-5 bg-goldAccent rounded-full flex items-center justify-center">
                                <i class="fa-solid fa-bolt text-navyDeep text-xs"></i>
                            </div>
                            <span class="font-semibold text-goldAccent">DSA Tutor</span>
                        </div>
                        <p class="text-gray-300 mt-2">${content}</p>
                    </div>`;
            } else {
                div.innerHTML = `
                    <div class="bg-white/10 border border-white/20 rounded-lg px-4 py-3 max-w-3xl">
                        <div class="flex items-center space-x-2 mb-2">
                            <div class="w-5 h-5 bg-goldAccent rounded-full flex items-center justify-center">
                                <i class="fa-solid fa-bolt text-navyDeep text-xs"></i>
                            </div>
                            <span class="font-semibold text-goldAccent">DSA Tutor</span>
                        </div>
                        <div class="message-content">${formatMessage(content)}</div>
                    </div>`;
            }
        }
        
        chatContainer.appendChild(div);
        scrollToBottom();
        return div;
    }
    
    // Format message with basic markdown
    function formatMessage(text) {
        let formatted = text
            // Code blocks
            .replace(/```(\w+)?\n([\s\S]*?)```/g, function(match, lang, code) {
                return `<pre class="bg-gray-900 p-4 rounded overflow-x-auto my-3"><code class="text-sm">${escapeHtml(code.trim())}</code></pre>`;
            })
            // Inline code
            .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
            // Bold
            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
            // Lists
            .replace(/^\d+\.\s+(.*)$/gm, '<li class="ml-4 mb-1">$1</li>')
            .replace(/^\*\s+(.*)$/gm, '<li class="ml-4 mb-1">• $1</li>')
            // Headings
            .replace(/## (.*?)(?=\n|$)/g, '<h2 class="text-xl font-bold text-goldAccent mt-4 mb-2">$1</h2>')
            // Line breaks
            .replace(/\n\n/g, '</div><div class="mt-3">')
            .replace(/\n/g, '<br>');
        
        return `<div class="space-y-2">${formatted}</div>`;
    }
    
    // Escape HTML
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Scroll to bottom
    function scrollToBottom() {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    
    // Show notification
    function showNotification(message, type = 'error') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 px-4 py-3 rounded-lg shadow-lg z-50 ${type === 'error' ? 'bg-red-500/90' : 'bg-blue-500/90'} text-white`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    // Auto-focus input
    setTimeout(() => {
        questionInput.focus();
    }, 300);
});