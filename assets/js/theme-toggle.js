document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.getElementById('theme-toggle');
    const darkIcon = document.getElementById("dark-icon");
    const lightIcon = document.getElementById("light-icon");
    const startingTheme = document.documentElement.getAttribute('data-theme');

    if (startingTheme === 'light')
        setIcon('light');
    else
        setIcon('dark');

    toggleBtn.addEventListener('click', function () {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        if (newTheme === 'light')
            setIcon('light');
        else
            setIcon('dark');
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
    function setIcon(theme) {
        lightIcon.style.display = theme === 'light' ? 'none' : 'inline';
        darkIcon.style.display = theme === 'dark' ? 'none' : 'inline';
    }
});


