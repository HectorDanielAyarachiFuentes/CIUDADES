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
  function renderCountryDetails(selectedCountry, neighborsData) {
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
    const borderNames = (neighborsData && neighborsData.length > 0)
      ? neighborsData.map(n => n.translations.spa.common).join(', ')
      : 'No tiene fronteras terrestres';

    // --- MAPA DE NOMBRES DE IDIOMAS PARA LAS TRADUCCIONES ---
    const languageNames = {
      ara: 'Árabe', bre: 'Bretón', ces: 'Checo', cym: 'Galés', deu: 'Alemán',
      est: 'Estonio', fin: 'Finlandés', fra: 'Francés', hrv: 'Croata', hun: 'Húngaro',
      ita: 'Italiano', jpn: 'Japonés', kor: 'Coreano', nld: 'Holandés', per: 'Persa',
      pol: 'Polaco', por: 'Portugués', rus: 'Ruso', slk: 'Eslovaco', spa: 'Español',
      srp: 'Serbio', swe: 'Sueco', tur: 'Turco', urd: 'Urdu', zho: 'Chino'
    };

    // --- GENERAR HTML PARA PAÍSES VECINOS ---
    const neighborsHtml = (neighborsData && neighborsData.length > 0) ? `
      <h2 class="section-title">Países Vecinos</h2>
      <div class="neighbors-grid">
        ${neighborsData.map(neighbor => `
          <a href="detalle.html#${neighbor.cca3}" class="country-card neighbor-card">
            <img src="${neighbor.flags.svg}" alt="Bandera de ${neighbor.translations.spa.common}" loading="lazy" class="country-card-flag">
            <span class="country-card-name">${neighbor.translations.spa.common}</span>
          </a>
        `).join('')}
      </div>
    ` : '';

    // --- GENERAR EL HTML DINÁMICAMENTE ---
    const countryHtml = `
      <div class="country-hero" style="background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${selectedCountry.flags.svg}')">
        <h1>${countryName} ${selectedCountry.flag}</h1>
        <p class="official-name">${officialName}</p>
      </div>

      <div class="country-details-container">
        <h2 class="section-title">Datos Generales</h2>
        <div class="details-grid">
          <div class="grid-item"><strong><span class="grid-item-icon">🏙️</span>Capital</strong><span>${capital}</span></div>
          <div class="grid-item"><strong><span class="grid-item-icon">👨‍👩‍👧‍👦</span>Población</strong><span>${population}</span></div>
          <div class="grid-item"><strong><span class="grid-item-icon">🏞️</span>Área</strong><span>${area}</span></div>
          <div class="grid-item"><strong><span class="grid-item-icon">🌎</span>Continente</strong><span>${continents}</span></div>
          <div class="grid-item"><strong><span class="grid-item-icon">📍</span>Subregión</strong><span>${subregion}</span></div>
          <div class="grid-item"><strong><span class="grid-item-icon">💰</span>Moneda</strong><span>${currency}</span></div>
          <div class="grid-item"><strong><span class="grid-item-icon">🗣️</span>Idiomas</strong><span>${languages}</span></div>
          <div class="grid-item"><strong><span class="grid-item-icon">👋</span>Gentilicio</strong><span>${demonym}</span></div>
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
              <div class="grid-item"><strong><span class="grid-item-icon">🗺️</span>Fronteras</strong><span>${borderNames}</span></div>
              <div class="grid-item"><strong><span class="grid-item-icon">🧭</span>Lat/Lng</strong><span>${selectedCountry.latlng.join(', ')}</span></div>
          </div>
          <a id="google-maps-link" href="${selectedCountry.maps.googleMaps}" target="_blank">Ver en Google Maps</a>
        </div>
        <!-- FIN DE LA SECCIÓN CORREGIDA -->

        ${neighborsHtml}

        <h2 class="section-title">Nombres en otros idiomas</h2>
        <div class="translations-grid">
          ${Object.entries(selectedCountry.translations).map(([key, value]) => `
            <div class="translation-card">
              <div class="translation-lang">${languageNames[key] || key.toUpperCase()}</div>
              <div class="translation-name">${value.common}</div>
            </div>
          `).join('')}
        </div>

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
        const neighborsData = selectedCountry.borders
          ?.map(borderCode => allCountriesData.find(country => country.cca3 === borderCode))
          .filter(Boolean); // Filtra resultados nulos si un código de frontera no se encuentra

        renderCountryDetails(selectedCountry, neighborsData);
      } else {
        renderError(`No se pudo encontrar el país con el ID "${countryId}".`);
      }
    })
    .catch(error => {
      console.error("Error en el proceso de carga de detalles:", error);
      renderError("No se pudieron cargar los datos del país.");
    });
});