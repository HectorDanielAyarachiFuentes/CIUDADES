document.addEventListener("DOMContentLoaded", function () {
    // Obtén el ID de la ciudad desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const cityName = urlParams.get("city");
  
    // Obtén los datos de las ciudades desde el localStorage
    const cityData = JSON.parse(localStorage.getItem("datosciudad"));
  
    // Busca la ciudad por su nombre
    const selectedCity = cityData.find((city) => city.translations.spa.official.toLowerCase() === cityName);
  
    if (selectedCity) {
      // Crea el contenido HTML con los detalles de la ciudad
      const detalleHtml = `
        <header class="header">
          <h1>${selectedCity.translations.spa.official}</h1>
        </header>
        <div class="city-card">
          <h2>${selectedCity.translations.spa.common}</h2>
          <p><strong>País:</strong> ${selectedCity.name.common}</p>
          <p><strong>Código CCA2:</strong> ${selectedCity.cca2}</p>
          <!-- Agrega más detalles de la ciudad aquí según tus necesidades -->
          <button onclick="goToIndex()" class="volver-button">Volver Atrás</button>
        </div>
      `;
  
      // Agrega el contenido al contenedor cityDetails
      const cityDetails = document.getElementById("city-details");
      cityDetails.innerHTML = detalleHtml;
    } else {
      // Si no se encuentra la ciudad, muestra un mensaje de error
      const cityDetails = document.getElementById("city-details");
      cityDetails.innerHTML = "<p>Ciudad no encontrada.</p>";
    }
  });
  