document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            clearError('username');
            clearError('password');

            // Get form values
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;

            // Validate
            let isValid = true;

            if (!username) {
                showError('username', 'Username is required');
                isValid = false;
            }

            if (!password) {
                showError('password', 'Password is required');
                isValid = false;
            }

            if (!isValid) return;

            // Simple authentication (in real app, this would be done server-side)
            if (username === 'Naeemullah' && password === 'Afshan&Salam') {
                // Store session
                sessionStorage.setItem('loggedIn', 'true');
                sessionStorage.setItem('username', username);
                
                // Redirect to dashboard
                window.location.href = 'dashboard.html';
            } else {
                showError('password', 'Invalid username or password');
            }
        });
    }
});

// Check authentication on protected pages
function checkAuth() {
    const loggedIn = sessionStorage.getItem('loggedIn');
    const currentPage = window.location.pathname;
    
    // If not logged in and not on index page
    if (!loggedIn && !currentPage.includes('index.html') && currentPage !== '/') {
        window.location.href = 'index.html';
    }
}

// Run auth check on page load (except login page)
if (!window.location.pathname.includes('index.html')) {
    checkAuth();
}
