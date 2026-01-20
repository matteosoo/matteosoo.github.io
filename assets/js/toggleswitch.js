const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = themeToggleBtn.querySelector('i');
const currentTheme = localStorage.getItem('theme');

// Function to update icon
function updateIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// Initial Check
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateIcon(currentTheme);
}

// Event Listener
themeToggleBtn.addEventListener('click', function() {
    let theme = 'light';
    if (document.documentElement.getAttribute('data-theme') === 'light' || !document.documentElement.getAttribute('data-theme')) {
        theme = 'dark';
    }
    
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateIcon(theme);
    
    // Add small rotation animation class if desired, or simpler via CSS active state
});