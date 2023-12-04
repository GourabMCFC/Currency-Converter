let collapse = document.querySelector('#collapse');
let navbar = document.querySelector('#navbar-default');
let themeToggleBtn = document.querySelector('#theme-toggle');
let themeToggleBtnText = document.querySelector('#theme-toggle-text');
collapse.addEventListener('click', () => navbar.classList.toggle('hidden'));

if (
    localStorage.getItem('color-theme') === 'dark' ||
    (!('color-theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
    themeToggleBtnText.appendChild(document.createTextNode('Light Mode'));
    themeToggleBtn.checked = true;
} else {
    themeToggleBtnText.appendChild(document.createTextNode('Dark Mode'));
    themeToggleBtn.checked = false;
}

themeToggleBtn.addEventListener('click', function (e) {
    // e.preventDefault();
    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            themeToggleBtnText.firstChild.replaceWith(
                document.createTextNode('Light Mode')
            );
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            themeToggleBtnText.firstChild.replaceWith(
                document.createTextNode('Dark Mode')
            );
            localStorage.setItem('color-theme', 'light');
        }

        // if NOT set via local storage previously
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }
});
