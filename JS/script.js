// --- REPRODUCTOR DE MÚSICA (SOLO PARA INDEX.HTML) ---

// Seleccionamos los elementos del reproductor
const guessButton = document.getElementById("guess-button");
const audioPlayer = document.getElementById("audio-player");

// Verificamos si el botón existe en la página actual antes de añadir el listener.
// Esto evita errores en la consola en la página de detalle.
if (guessButton && audioPlayer) {
  function playPause() {
    const isPlaying = !audioPlayer.paused;
    if (isPlaying) {
      audioPlayer.pause();
      guessButton.innerHTML = "Si tu me quieres...";
      guessButton.setAttribute('aria-pressed', 'false');
    } else {
      audioPlayer.play();
      guessButton.innerHTML = "¡Dame una sonrisa! 🎶🤘";
      guessButton.setAttribute('aria-pressed', 'true');
    }
  }

  guessButton.addEventListener("click", playPause);
}