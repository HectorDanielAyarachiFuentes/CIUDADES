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