document.addEventListener("DOMContentLoaded", function () {
  // Obtén la ID de la ciudad desde la URL
  const cityId = window.location.hash.substring(1); // Elimina el "#" del fragmento de la URL

  // Obtén los IDs generados aleatoriamente desde localStorage
  const generatedIds = JSON.parse(localStorage.getItem("generatedIds"));

  // Obtén los datos de ciudades desde localStorage
  const cityData = JSON.parse(localStorage.getItem("datosciudad"));

  // Busca la ciudad correspondiente por la ID generada aleatoriamente
  const selectedCity = cityData.find((city, index) => generatedIds[index] === cityId);

  // Verifica si se encontró la ciudad
  if (selectedCity) {
    // Muestra los detalles de la ciudad
    const cityDetails = document.getElementById("city-details");
    const cityHtml = `
      <h1>${selectedCity.name.official}</h1>
      <p>Capital: ${selectedCity.capital[0]}</p>
      <p>Población: ${selectedCity.population}</p>
      <!-- Agrega más detalles según sea necesario -->
    `;
    cityDetails.innerHTML = cityHtml;
  } else {
    // Maneja el caso en el que la ciudad no se encuentra
    console.error("Ciudad no encontrada.");
  }
});
