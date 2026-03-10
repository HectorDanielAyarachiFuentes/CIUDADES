document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Función para aplicar el tema
  const applyTheme = (theme) => {
    if (theme === 'light') {
      htmlElement.setAttribute('data-theme', 'light');
      if (themeToggle) {
        themeToggle.checked = true; // El toggle activo ahora significa modo claro
        themeToggle.setAttribute('aria-checked', 'true');
      }
    } else {
      htmlElement.removeAttribute('data-theme'); // Por defecto es oscuro ahora
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
      const newTheme = e.target.checked ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }
});