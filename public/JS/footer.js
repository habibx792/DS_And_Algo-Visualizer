document.addEventListener('DOMContentLoaded', function() {
    const footer = document.getElementById('footer');
    if (!footer) return;
    
    const isLoggedIn = localStorage.getItem('dsaLoggedIn') === 'true';
    const userName = localStorage.getItem('currentUserName') || '';
    const userEmail = localStorage.getItem('currentUserEmail') || '';
    
    footer.innerHTML = `
        <div class="max-w-6xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <!-- About -->
                <div>
                    <h3 class="text-lg font-bold text-goldAccent mb-4">About DSA Visualizer</h3>
                    <p class="text-gray-400 text-sm">
                        Interactive platform for learning Data Structures and Algorithms 
                        with AI-powered tutoring.
                    </p>
                </div>
                
                <!-- Links -->
                <div>
                    <h3 class="text-lg font-bold text-goldAccent mb-4">Quick Links</h3>
                    <ul class="space-y-2">
                        <li><a href="/" class="text-gray-400 hover:text-goldAccent text-sm">Home</a></li>
                        <li><a href="login" class="text-gray-400 hover:text-goldAccent text-sm">Login</a></li>
                        <li><a href="signup" class="text-gray-400 hover:text-goldAccent text-sm">Sign Up</a></li>
                    </ul>
                </div>
                
                <!-- User Status -->
                <div>
                    <h3 class="text-lg font-bold text-goldAccent mb-4">Account Status</h3>
                    <div class="bg-navySoft/50 p-4 rounded-lg">
                        <p class="text-gray-300 text-sm">
                            ${isLoggedIn ? `Logged in as: <span class="text-goldAccent font-bold">${userName}</span>` : 'Not logged in'}
                        </p>
                        ${isLoggedIn ? `
                            <button onclick="handleLogout()" 
                                    class="mt-3 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm">
                                Logout
                            </button>
                        ` : `
                            <a href="login" 
                               class="mt-3 block w-full bg-goldAccent hover:bg-white text-navyDark text-center py-2 rounded-lg text-sm font-semibold">
                                Login
                            </a>
                        `}
                    </div>
                </div>
            </div>
            
            <!-- Copyright -->
            <div class="border-t border-gray-700/50 pt-6 text-center">
                <p class="text-gray-500 text-sm">
                    &copy; ${new Date().getFullYear()} DSA Visualizer. All rights reserved.
                </p>
                <p class="text-gray-500 text-xs mt-1">
                    Built with ❤️ for developers and students
                </p>
            </div>
        </div>
    `;
    
    // Add logout function to window
    window.handleLogout = function() {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('dsaLoggedIn');
            localStorage.removeItem('currentUserName');
            localStorage.removeItem('currentUserEmail');
            localStorage.removeItem('currentUserId');
            window.location.href = 'login';
        }
    };
});