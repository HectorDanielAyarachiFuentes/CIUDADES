document.addEventListener("DOMContentLoaded", function () {
  // --- 1. OBTENER DATOS Y EL PAÍS SELECCIONADO ---
  const countryId = window.location.hash.substring(1);
  const allCountriesData = JSON.parse(localStorage.getItem("datosciudad"));

  const selectedCountry = allCountriesData.find(
    (country) => country.cca3 === countryId.toUpperCase() || country.cca2 === countryId.toUpperCase()
  );

  const cityDetailsContainer = document.getElementById("city-details");

  // --- 2. VERIFICAR SI SE ENCONTRÓ EL PAÍS ---
  if (selectedCountry) {
    // --- 3. PREPARAR LOS DATOS (CON VALORES POR DEFECTO PARA EVITAR ERRORES) ---
    const countryName = selectedCountry.translations.spa?.common ?? selectedCountry.name.common;
    const officialName = selectedCountry.translations.spa?.official ?? selectedCountry.name.official;
    const capital = selectedCountry.capital?.join(', ') ?? 'No especificada';
    const population = selectedCountry.population.toLocaleString('es-ES');
    const area = selectedCountry.area.toLocaleString('es-ES') + ' km²';
    const continents = selectedCountry.continents?.join(', ') ?? 'No especificado';
    const subregion = selectedCountry.subregion ?? 'No especificada';

    const currencyKey = Object.keys(selectedCountry.currencies)[0];
    const currency = currencyKey
      ? `${selectedCountry.currencies[currencyKey].name} (${selectedCountry.currencies[currencyKey].symbol})`
      : 'No especificada';

    const languages = Object.values(selectedCountry.languages)?.join(', ') ?? 'No especificado';
    const demonym = selectedCountry.demonyms.spa?.m ?? selectedCountry.demonyms.eng?.m ?? 'No especificado';
    const borders = selectedCountry.borders?.join(', ') ?? 'No tiene fronteras terrestres';

    // --- 4. MAPA DE NOMBRES DE IDIOMAS PARA LAS TRADUCCIONES ---
    const languageNames = {
      ara: 'Árabe', bre: 'Bretón', ces: 'Checo', cym: 'Galés', deu: 'Alemán',
      est: 'Estonio', fin: 'Finlandés', fra: 'Francés', hrv: 'Croata', hun: 'Húngaro',
      ita: 'Italiano', jpn: 'Japonés', kor: 'Coreano', nld: 'Holandés', per: 'Persa',
      pol: 'Polaco', por: 'Portugués', rus: 'Ruso', slk: 'Eslovaco', spa: 'Español',
      srp: 'Serbio', swe: 'Sueco', tur: 'Turco', urd: 'Urdu', zho: 'Chino'
    };

    // --- 5. GENERAR EL HTML DINÁMICAMENTE ---
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

  } else {
    // --- MANEJO DE ERROR SI EL PAÍS NO SE ENCUENTRA ---
    cityDetailsContainer.innerHTML = `
      <div class="error-container">
        <h1>Error 404</h1>
        <p>No se pudo encontrar el país con el ID "${countryId}".</p>
        <p>Por favor, vuelve a la página principal e inténtalo de nuevo.</p>
        <a href="index.html" class="back-button">Volver al Inicio</a>
      </div>
    `;
  }
});