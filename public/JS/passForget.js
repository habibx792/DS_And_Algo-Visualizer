document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const resetForm = document.getElementById('resetForm');
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
    resetForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirm = confirmInput.value;
        
        // Validation
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
        submitBtn.textContent = 'Resetting...';
        
        try {
            // Send reset request
            const response = await fetch('/api/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, newPassword: password })
            });
            
            const data = await response.json();
            
            if (data.success) {
                showMessage('Password reset successful! Redirecting to login...', 'success');
                
                // Update localStorage if user exists there
                const users = JSON.parse(localStorage.getItem('dsaUsers') || '[]');
                const userIndex = users.findIndex(u => u.email === email);
                if (userIndex !== -1) {
                    users[userIndex].passwordHash = hashPassword(password);
                    localStorage.setItem('dsaUsers', JSON.stringify(users));
                }
                
                // Redirect to login
                setTimeout(() => {
                    window.location.href = 'login';
                }, 2000);
                
            } else {
                showMessage(data.error || 'Reset failed', 'error');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Reset Password';
            }
            
        } catch (error) {
            console.error('Reset error:', error);
            showMessage('Connection error. Please try again.', 'error');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Reset Password';
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
    
    // Auto-focus email field
    setTimeout(() => {
        emailInput.focus();
    }, 100);
});