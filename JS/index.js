document.addEventListener("DOMContentLoaded", function () {
  const cityList = document.getElementById("city-list");
  // URL del JSON (reemplaza con la ubicación real del JSON)
  const jsonURL = "./JSON/independent.json"; // Asegúrate de que la ruta sea correcta
  // Realiza una solicitud para cargar el JSON
  fetch(jsonURL)
    .then((response) => response.json())
    .then((data) => {
      // Almacena los datos del JSON en localStorage con el nombre "datosciudad"
      localStorage.setItem("datosciudad", JSON.stringify(data));
      // Inicializa un arreglo para almacenar las IDs generadas
      const generatedIds = [];
      // Itera a través de todas las ciudades en el JSON
      data.forEach((cityData, index) => {
        // Obtén las traducciones en español desde "translations"
        const translations = cityData.translations;
        const officialNameInSpanish = translations.spa.official;
        // Genera una ID aleatoria única
        const uniqueId = generateUniqueId();
        generatedIds.push(uniqueId);
        // Genera un enlace para cada ciudad con la ID aleatoria y agrégalo a la lista
        const cityLink = document.createElement("li");
        cityLink.innerHTML = `<a href="detalle.html#${uniqueId}">${officialNameInSpanish}</a>`;
        cityList.appendChild(cityLink);
        // Asigna un identificador único al enlace para el manejo de clics
        cityLink.dataset.cityIndex = index;
      });
      // Almacena los IDs generados en el localStorage
      localStorage.setItem("generatedIds", JSON.stringify(generatedIds));
    })
    .catch((error) => {
      console.error("Error al cargar el JSON:", error);
    });
  // Manejo de clics para toda la lista de enlaces
  cityList.addEventListener("click", function (event) {
    if (event.target.tagName === "A") {
      const cityIndex = event.target.dataset.cityIndex;
      if (cityIndex !== undefined) {
        showText(cityIndex);
      }
    }
  });
});
// Función para generar una ID aleatoria única
function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9); // Genera una cadena de 9 caracteres alfanuméricos aleatorios
}
