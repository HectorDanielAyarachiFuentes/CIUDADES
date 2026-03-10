document.addEventListener("DOMContentLoaded", function () {
  // --- 1. OBTENER ID DEL PAÍS Y CONTENEDOR ---
  const countryId = window.location.hash.substring(1);
  const cityDetailsContainer = document.getElementById("city-details");
  const jsonURL = "./JSON/independent.json";

  // --- MOSTRAR ANIMACIÓN DE CARGA ---
  cityDetailsContainer.innerHTML = `
    <div class="loader-container" role="status" aria-live="polite">
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
      <section aria-labelledby="neighbors-title">
        <h2 id="neighbors-title" class="section-title">Países Vecinos</h2>
        <div class="neighbors-grid">
          ${neighborsData.map(neighbor => `
            <a href="detalle.html#${neighbor.cca3}" class="country-card neighbor-card">
            <img src="${neighbor.flags.svg}" alt="Bandera de ${neighbor.translations.spa.common}" loading="lazy" decoding="async" width="60" height="40" class="country-card-flag">
              <span class="country-card-name">${neighbor.translations.spa.common}</span>
            </a>
          `).join('')}
        </div>
      </section>
    ` : '';

    // --- GENERAR EL HTML DINÁMICAMENTE ---
    const countryHtml = `
      <div class="country-details-container">
        
        <header class="detail-hero">
          <img src="https://raw.githubusercontent.com/HectorDanielAyarachiFuentes/CIUDADES/main/Imagenes/zebra.png" alt="" class="hero-emblem" aria-hidden="true" onerror="this.style.display='none'">
          <div class="hero-titles">
            <h1>${countryName} ${selectedCountry.cca2}</h1>
            <p class="official-name">${officialName}</p>
          </div>
          <img src="https://raw.githubusercontent.com/HectorDanielAyarachiFuentes/CIUDADES/main/Imagenes/zebra.png" alt="" class="hero-emblem" style="transform: scaleX(-1);" aria-hidden="true" onerror="this.style.display='none'">
        </header>

        <div class="detail-main-grid">
          
          <!-- COLUMNA 1: Datos Generales -->
          <section class="detail-column general-data" aria-labelledby="general-data-title">
            <h2 id="general-data-title" class="section-title">Datos Generales</h2>
            <div class="data-boxes-grid">
              <div class="data-box">
                <span class="box-label"><span class="box-icon">🏛️</span> CAPITAL</span>
                <span class="box-value">${capital}</span>
              </div>
              <div class="data-box">
                <span class="box-label"><span class="box-icon">👥</span> POBLACIÓN</span>
                <span class="box-value">${population}</span>
              </div>
              <div class="data-box">
                <span class="box-label"><span class="box-icon">🌍</span> CONTINENTE</span>
                <span class="box-value">${continents}</span>
              </div>
              <div class="data-box">
                <span class="box-label"><span class="box-icon">📏</span> ÁREA</span>
                <span class="box-value">${area}</span>
              </div>
              <div class="data-box">
                <span class="box-label"><span class="box-icon">🗣️</span> IDIOMAS</span>
                <span class="box-value">${languages}</span>
              </div>
              <div class="data-box">
                <span class="box-label"><span class="box-icon">💰</span> MONEDA</span>
                <span class="box-value">${currency}</span>
              </div>
            </div>
          </section>

          <!-- COLUMNA 2: Símbolos Nacionales -->
          <section class="detail-column national-symbols" aria-labelledby="national-symbols-title">
            <h2 id="national-symbols-title" class="section-title">Símbolos Nacionales</h2>
            <div class="symbols-flex">
              <div class="symbol-item">
                <h3>Bandera</h3>
                <div class="thick-metallic-ring flag-ring">
                  <img src="${selectedCountry.flags.svg}" alt="${selectedCountry.flags.alt ?? ''}" class="country-card-flag" loading="lazy" width="150" height="150">
                </div>
              </div>
              ${selectedCountry.coatOfArms.png ? `
              <div class="symbol-item">
                <h3>Escudo de Armas</h3>
                <div class="coat-of-arms-container">
                  <img src="${selectedCountry.coatOfArms.png}" alt="Escudo de armas de ${countryName}" class="country-coat-of-arms" loading="lazy" width="150" height="150">
                </div>
              </div>
              ` : ''}
            </div>
            
            <p class="flag-description">${selectedCountry.flags.alt ?? 'Descripción de bandera no disponible.'}</p>
            
            <a id="google-maps-btn" href="${selectedCountry.maps.googleMaps}" target="_blank" rel="noopener noreferrer" aria-label="Ver en Google Maps">
              <span class="btn-icon">🌐</span> Ver en Google Maps
            </a>
          </section>

          <!-- COLUMNA 3: Países Vecinos y Traducciones -->
          <section class="detail-column neighbors-translations" aria-labelledby="neighbors-title">
            <h2 id="neighbors-title" class="section-title">Países Vecinos</h2>
            ${neighborsData && neighborsData.length > 0 ? `
              <div class="neighbors-row">
                ${neighborsData.map(neighbor => `
                  <a href="detalle.html#${neighbor.cca3}" class="neighbor-badge">
                    <img src="${neighbor.flags.svg}" alt="Bandera de ${neighbor.translations.spa.common}" class="country-card-flag neighbor-flag" loading="lazy" width="80" height="80">
                    <span class="neighbor-name">${neighbor.translations.spa.common}</span>
                  </a>
                `).join('')}
              </div>
            ` : '<p class="no-neighbors">No comparte fronteras terrestres.</p>'}

            <h2 id="translations-title" class="section-title translations-heading">Nombres en otros idiomas</h2>
            <div class="translations-box-grid">
              ${Object.entries(selectedCountry.translations).slice(0, 6).map(([key, value]) => `
                <div class="data-box translation-box">
                  <span class="box-label">${languageNames[key] || key.toUpperCase()}</span>
                  <span class="box-value">${value.common}</span>
                </div>
              `).join('')}
            </div>
          </section>

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