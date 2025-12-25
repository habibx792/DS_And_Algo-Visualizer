// Global logout function
function handleLogout() {
    const userName = localStorage.getItem('currentUserName') || 'User';
    
    if (confirm(`Logout ${userName}?`)) {
        // Clear all auth data
        localStorage.removeItem('dsaLoggedIn');
        localStorage.removeItem('currentUserId');
        localStorage.removeItem('currentUserName');
        localStorage.removeItem('currentUserEmail');
        localStorage.removeItem('resetPendingEmail');
        
        // Redirect to login
        window.location.href = 'login';
    }
}

// Auto-attach to logout buttons on page load
document.addEventListener('DOMContentLoaded', function() {
    // Find all logout buttons
    const logoutButtons = document.querySelectorAll('#logoutBtn, .logout-btn, [data-action="logout"]');
    
    logoutButtons.forEach(btn => {
        btn.addEventListener('click', handleLogout);
    });
    
    // Update UI based on login state
    updateAuthUI();
});

// Update UI based on auth state
function updateAuthUI() {
    const isLoggedIn = localStorage.getItem('dsaLoggedIn') === 'true';
    const userName = localStorage.getItem('currentUserName') || '';
    
    // Update all login/logout buttons
    const loginButtons = document.querySelectorAll('.login-btn, [data-action="login"]');
    const logoutButtons = document.querySelectorAll('.logout-btn, [data-action="logout"]');
    
    if (isLoggedIn) {
        // User is logged in
        loginButtons.forEach(btn => {
            btn.textContent = `Logout (${userName})`;
            btn.classList.remove('bg-goldAccent', 'text-black');
            btn.classList.add('bg-red-600', 'text-white');
            btn.onclick = handleLogout;
        });
        
        logoutButtons.forEach(btn => {
            btn.style.display = 'block';
            btn.onclick = handleLogout;
        });
        
    } else {
        // User is not logged in
        loginButtons.forEach(btn => {
            btn.textContent = 'Login';
            btn.classList.remove('bg-red-600', 'text-white');
            btn.classList.add('bg-goldAccent', 'text-black');
            btn.onclick = () => {
                window.location.href = 'login';
            };
        });
        
        logoutButtons.forEach(btn => {
            btn.style.display = 'none';
        });
    }
}

// Listen for storage changes (for multiple tabs)
window.addEventListener('storage', updateAuthUI);