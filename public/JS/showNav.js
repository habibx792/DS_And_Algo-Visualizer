document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const mobNav = document.querySelector('#mobNav');
    const mobNavcontent = document.querySelector('#mobNavcontent');
    
    if (mobNav && mobNavcontent) {
        mobNav.addEventListener('click', function(e) {
            e.preventDefault();
            mobNavcontent.classList.toggle('hidden');
        });
    }
});