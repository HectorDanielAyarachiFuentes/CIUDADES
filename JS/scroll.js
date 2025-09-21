document.addEventListener('DOMContentLoaded', () => {
  const backToTopButton = document.getElementById('back-to-top-btn');

  // Si el botón no existe en la página, no hacemos nada.
  if (!backToTopButton) {
    return;
  }

  // Muestra u oculta el botón basado en la posición del scroll.
  const scrollFunction = () => {
    // Muestra el botón después de hacer scroll 300px hacia abajo.
    if (window.scrollY > 300) {
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }
  };

  // Vuelve al inicio de la página suavemente al hacer clic.
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  window.addEventListener('scroll', scrollFunction);
  backToTopButton.addEventListener('click', scrollToTop);
});