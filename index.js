document.addEventListener("DOMContentLoaded", function () {
    const cityList = document.getElementById("city-list");
    const cityContent = document.querySelector("section:last-child");
  
    // URL del JSON (reemplaza con la ubicación real del JSON)
    const jsonURL = "independent.json"; // Asegúrate de que la ruta sea correcta
  
    // Realiza una solicitud para cargar el JSON
    fetch(jsonURL)
      .then((response) => response.json())
      .then((data) => {
         // Almacena los datos del JSON en localStorage con el nombre "datosciudad"
         localStorage.setItem("datosciudad", JSON.stringify(data));
        // Itera a través de todas las ciudades en el JSON
        data.forEach((cityData) => {
          // Obtén las traducciones en español desde "translations"
          const translations = cityData.translations;
          const officialNameInSpanish = translations.spa.official;
  
          // Genera un enlace para cada ciudad y agrégalo a la lista
          const cityLink = document.createElement("li");
          cityLink.innerHTML = `<a href="detalle.html#${officialNameInSpanish.toLowerCase()}" onclick="showText('${officialNameInSpanish.toLowerCase()}')">${officialNameInSpanish}</a>`;
          cityList.appendChild(cityLink);
        });
      })
      .catch((error) => {
        console.error("Error al cargar el JSON:", error);
      });
  });
