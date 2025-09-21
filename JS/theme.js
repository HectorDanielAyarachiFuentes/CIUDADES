document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Función para aplicar el tema
  const applyTheme = (theme) => {
    if (theme === 'dark') {
      htmlElement.setAttribute('data-theme', 'dark');
      if (themeToggle) {
        themeToggle.checked = true;
        themeToggle.setAttribute('aria-checked', 'true');
      }
    } else {
      htmlElement.removeAttribute('data-theme');
      if (themeToggle) {
        themeToggle.checked = false;
        themeToggle.setAttribute('aria-checked', 'false');
      }
    }
  };

  // Determinar el tema inicial: preferencia guardada > preferencia del SO > claro
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  applyTheme(initialTheme);

  // Listener para el interruptor
  if (themeToggle) {
    themeToggle.addEventListener('change', (e) => {
      const newTheme = e.target.checked ? 'dark' : 'light';
      applyTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }
});