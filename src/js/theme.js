export function setTheme(themeName) {
  localStorage.setItem('theme', themeName);
  document.body.className = themeName;
}

export function toggleTheme() {
  if (localStorage.getItem('theme') === 'dark') {
    setTheme('light');
  } else {
    setTheme('dark');
  }
}

export function initializeTheme(themeSwitch) {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    setTheme('dark');
    themeSwitch.checked = true;
  } else {
    setTheme('light');
    themeSwitch.checked = false;
  }
}
