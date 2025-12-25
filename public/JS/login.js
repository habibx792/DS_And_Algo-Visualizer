document.addEventListener('DOMContentLoaded', function() {
    // Check if already logged in
    if (localStorage.getItem('dsaLoggedIn') === 'true') {
        window.location.href = 'main';
        return;
    }
    
    // Elements
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.getElementById('togglePassword');
    const submitBtn = document.getElementById('submitBtn');
    const messageDiv = document.getElementById('message');
    
    // Toggle password visibility
    toggleBtn.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        toggleBtn.innerHTML = type === 'password' ? '<i class="fa-solid fa-eye"></i>' : '<i class="fa-solid fa-eye-slash"></i>';
    });
    
    // Form submission
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        // Basic validation
        if (!email || !password) {
            showMessage('Please fill in all fields', 'error');
            return;
        }
        
        if (!validateEmail(email)) {
            showMessage('Please enter a valid email', 'error');
            return;
        }
        
        // Disable button and show loading
        submitBtn.disabled = true;
        submitBtn.textContent = 'Signing in...';
        
        try {
            // Send login request
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();
            
            if (data.success) {
                // Save user data
                localStorage.setItem('dsaLoggedIn', 'true');
                localStorage.setItem('currentUserId', data.user.id);
                localStorage.setItem('currentUserName', data.user.name);
                localStorage.setItem('currentUserEmail', data.user.email);
                
                showMessage('Login successful! Redirecting...', 'success');
                
                // Redirect after delay
                setTimeout(() => {
                    window.location.href = 'main';
                }, 1500);
                
            } else {
                showMessage(data.error || 'Login failed', 'error');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Sign In';
            }
            
        } catch (error) {
            console.error('Login error:', error);
            showMessage('Connection error. Please try again.', 'error');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Sign In';
        }
    });
    
    // Helper functions
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = `p-3 rounded ${type === 'error' ? 'bg-red-500/20 border border-red-500/30 text-red-300' : 'bg-green-500/20 border border-green-500/30 text-green-300'}`;
        messageDiv.classList.remove('hidden');
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            messageDiv.classList.add('hidden');
        }, 5000);
    }
    
    // Auto-focus email field
    setTimeout(() => {
        emailInput.focus();
    }, 100);
});