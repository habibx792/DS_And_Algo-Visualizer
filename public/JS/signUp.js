document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const signupForm = document.getElementById('signupForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmInput = document.getElementById('confirmPassword');
    const toggleBtn = document.getElementById('togglePassword');
    const toggleConfirmBtn = document.getElementById('toggleConfirm');
    const submitBtn = document.getElementById('submitBtn');
    const messageDiv = document.getElementById('message');
    
    // Toggle password visibility
    toggleBtn.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        toggleBtn.innerHTML = type === 'password' ? '<i class="fa-solid fa-eye"></i>' : '<i class="fa-solid fa-eye-slash"></i>';
    });
    
    toggleConfirmBtn.addEventListener('click', function() {
        const type = confirmInput.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmInput.setAttribute('type', type);
        toggleConfirmBtn.innerHTML = type === 'password' ? '<i class="fa-solid fa-eye"></i>' : '<i class="fa-solid fa-eye-slash"></i>';
    });
    
    // Form submission
    signupForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirm = confirmInput.value;
        
        // Validation
        if (!name || name.length < 2) {
            showMessage('Name must be at least 2 characters', 'error');
            return;
        }
        
        if (!email || !validateEmail(email)) {
            showMessage('Please enter a valid email', 'error');
            return;
        }
        
        if (!password || password.length < 6) {
            showMessage('Password must be at least 6 characters', 'error');
            return;
        }
        
        if (password !== confirm) {
            showMessage('Passwords do not match', 'error');
            return;
        }
        
        // Disable button and show loading
        submitBtn.disabled = true;
        submitBtn.textContent = 'Creating Account...';
        
        try {
            // Send registration request
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });
            
            const data = await response.json();
            
            if (data.success) {
                showMessage(`Account created for ${name}! Redirecting to login...`, 'success');
                
                // Save to localStorage for backup
                const users = JSON.parse(localStorage.getItem('dsaUsers') || '[]');
                users.push({
                    id: data.user.id,
                    name: data.user.name,
                    email: data.user.email,
                    passwordHash: hashPassword(password),
                    createdAt: new Date().toISOString()
                });
                localStorage.setItem('dsaUsers', JSON.stringify(users));
                
                // Redirect to login
                setTimeout(() => {
                    window.location.href = 'login';
                }, 2000);
                
            } else {
                showMessage(data.error || 'Registration failed', 'error');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Create Account';
            }
            
        } catch (error) {
            console.error('Registration error:', error);
            showMessage('Connection error. Please try again.', 'error');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Create Account';
        }
    });
    
    // Helper functions
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function hashPassword(password) {
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash).toString(36);
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
    
    // Auto-focus name field
    setTimeout(() => {
        nameInput.focus();
    }, 100);
});