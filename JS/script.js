function showText(id) {
    var articles = document.querySelectorAll('article');
    for (var i = 0; i < articles.length; i++) {
        articles[i].style.display = 'none'; // Oculta todos los elementos <article>
    }
    var articleToShow = document.getElementById(id);
    if (articleToShow) {
        articleToShow.style.display = 'block'; // Muestra el elemento específico
    }
  }
  //// MUSICA DE BABASONICOS PLAYER
const audioPlayer = document.getElementById("audio-player");

function playPause() {
  if (audioPlayer.paused) {
    audioPlayer.play();
    document.getElementById("guess-button").innerHTML = "¡Dame una sonrisa! 🎶🤘";
  } else {
    audioPlayer.pause();
    document.getElementById("guess-button").innerHTML = "Si tu me quieres...";
  }
}

document.getElementById("guess-button").addEventListener("click", playPause);