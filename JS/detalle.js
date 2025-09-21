document.addEventListener("DOMContentLoaded", function () {
  // --- 1. OBTENER ID DEL PAÍS Y CONTENEDOR ---
  const countryId = window.location.hash.substring(1);
  const cityDetailsContainer = document.getElementById("city-details");
  const jsonURL = "./JSON/independent.json";

  // --- MOSTRAR ANIMACIÓN DE CARGA ---
  cityDetailsContainer.innerHTML = `
    <div class="loader-container">
      <div class="loader"></div>
      <p>Cargando detalles del país...</p>
    </div>
  `;

  // --- 2. FUNCIÓN PARA RENDERIZAR LOS DETALLES DEL PAÍS ---
  function renderCountryDetails(selectedCountry) {
    // --- PREPARAR LOS DATOS (CON VALORES POR DEFECTO PARA EVITAR ERRORES) ---
    const countryName = selectedCountry.translations.spa?.common ?? selectedCountry.name.common;
    const officialName = selectedCountry.translations.spa?.official ?? selectedCountry.name.official;
    const capital = selectedCountry.capital?.join(', ') ?? 'No especificada';
    const population = selectedCountry.population.toLocaleString('es-ES');
    const area = (selectedCountry.area ?? 0).toLocaleString('es-ES') + ' km²';
    const continents = selectedCountry.continents?.join(', ') ?? 'No especificado';
    const subregion = selectedCountry.subregion ?? 'No especificada';

    const currencyKey = Object.keys(selectedCountry.currencies)[0];
    const currency = currencyKey
      ? `${selectedCountry.currencies[currencyKey].name} (${selectedCountry.currencies[currencyKey].symbol})`
      : 'No especificada';

    const languages = Object.values(selectedCountry.languages)?.join(', ') ?? 'No especificado';
    const demonym = selectedCountry.demonyms.spa?.m ?? selectedCountry.demonyms.eng?.m ?? 'No especificado';
    const borders = selectedCountry.borders?.join(', ') ?? 'No tiene fronteras terrestres';

    // --- MAPA DE NOMBRES DE IDIOMAS PARA LAS TRADUCCIONES ---
    const languageNames = {
      ara: 'Árabe', bre: 'Bretón', ces: 'Checo', cym: 'Galés', deu: 'Alemán',
      est: 'Estonio', fin: 'Finlandés', fra: 'Francés', hrv: 'Croata', hun: 'Húngaro',
      ita: 'Italiano', jpn: 'Japonés', kor: 'Coreano', nld: 'Holandés', per: 'Persa',
      pol: 'Polaco', por: 'Portugués', rus: 'Ruso', slk: 'Eslovaco', spa: 'Español',
      srp: 'Serbio', swe: 'Sueco', tur: 'Turco', urd: 'Urdu', zho: 'Chino'
    };

    // --- GENERAR EL HTML DINÁMICAMENTE ---
    const countryHtml = `
      <div class="country-details-container">
        
        <div class="country-header">
          <h1>${countryName} ${selectedCountry.flag}</h1>
          <p class="official-name">${officialName}</p>
        </div>

        <h2 class="section-title">Datos Generales</h2>
        <div class="details-grid">
          <div class="grid-item"><strong>Capital</strong><span>${capital}</span></div>
          <div class="grid-item"><strong>Población</strong><span>${population}</span></div>
          <div class="grid-item"><strong>Área</strong><span>${area}</span></div>
          <div class="grid-item"><strong>Continente</strong><span>${continents}</span></div>
          <div class="grid-item"><strong>Subregión</strong><span>${subregion}</span></div>
          <div class="grid-item"><strong>Moneda</strong><span>${currency}</span></div>
          <div class="grid-item"><strong>Idiomas</strong><span>${languages}</span></div>
          <div class="grid-item"><strong>Gentilicio</strong><span>${demonym}</span></div>
        </div>

        <h2 class="section-title">Símbolos Nacionales</h2>
        <div class="symbols-container">
          <div class="symbol-item">
            <h3>Bandera</h3>
            <img src="${selectedCountry.flags.svg}" alt="${selectedCountry.flags.alt}" class="country-flag">
            <p>${selectedCountry.flags.alt ?? 'Descripción no disponible.'}</p>
          </div>
          ${selectedCountry.coatOfArms.png ? `
          <div class="symbol-item">
            <h3>Escudo de Armas</h3>
            <img src="${selectedCountry.coatOfArms.png}" alt="Escudo de armas de ${countryName}" class="country-coat-of-arms">
          </div>
          ` : ''}
        </div>
        
        <!-- INICIO DE LA SECCIÓN CORREGIDA -->
        <div class="geography-section">
          <h2 class="section-title">Geografía y Ubicación</h2>
          <div class="details-grid">
              <div class="grid-item"><strong>Fronteras</strong><span>${borders}</span></div>
              <div class="grid-item"><strong>Lat/Lng</strong><span>${selectedCountry.latlng.join(', ')}</span></div>
          </div>
          <a id="google-maps-link" href="${selectedCountry.maps.googleMaps}" target="_blank">Ver en Google Maps</a>
        </div>
        <!-- FIN DE LA SECCIÓN CORREGIDA -->

        <h2 class="section-title">Nombres en otros idiomas</h2>
        <ul class="translations-list">
          ${Object.entries(selectedCountry.translations).map(([key, value]) => `
            <li><strong>${languageNames[key] || key}:</strong> ${value.common}</li>
          `).join('')}
        </ul>

      </div>
    `;

    cityDetailsContainer.innerHTML = countryHtml;
  }

  // --- 3. FUNCIÓN PARA MOSTRAR UN ERROR ---
  function renderError(message) {
    cityDetailsContainer.innerHTML = `
      <div class="error-container">
        <h1>Error 404</h1>
        <p>${message}</p>
        <p>Por favor, vuelve a la página principal e inténtalo de nuevo.</p>
        <a href="index.html" class="back-button">Volver al Inicio</a>
      </div>
    `;
  }

  // --- 4. OBTENER DATOS Y RENDERIZAR ---
  fetch(jsonURL)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error al cargar el JSON: ${response.statusText}`);
      }
      return response.json();
    })
    .then(allCountriesData => {
      const selectedCountry = allCountriesData.find(
        (country) => country.cca3 === countryId.toUpperCase() || country.cca2 === countryId.toUpperCase()
      );

      if (selectedCountry) {
        renderCountryDetails(selectedCountry);
      } else {
        renderError(`No se pudo encontrar el país con el ID "${countryId}".`);
      }
    })
    .catch(error => {
      console.error("Error en el proceso de carga de detalles:", error);
      renderError("No se pudieron cargar los datos del país.");
    });
});