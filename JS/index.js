document.addEventListener("DOMContentLoaded", function () {
  const listContainer = document.getElementById("city-list");
  const searchInput = document.getElementById("search-input");
  const jsonURL = "./JSON/independent.json";

  let allCountriesData = []; // Almacenará la lista completa de países

  // --- MEJORA 1: MAPA PARA TRADUCIR LOS CONTINENTES ---
  const continentTranslations = {
    "Africa": "África",
    "Europe": "Europa",
    "Asia": "Asia",
    "Oceania": "Oceanía",
    "North America": "América del Norte",
    "South America": "América del Sur",
    "Antarctica": "Antártida"
  };

  // --- FUNCIÓN PARA RENDERIZAR LA LISTA DE PAÍSES ---
  function renderCountryList(countries) {
    listContainer.innerHTML = ''; // Limpiar la lista antes de renderizar

    if (countries.length === 0) {
      listContainer.innerHTML = '<p class="error-message">No se encontraron países con ese nombre.</p>';
      return;
    }

    // 1. Agrupar países por continente
    const countriesByContinent = {};
    countries.forEach(country => {
      const continentName = country.continents?.[0];
      if (continentName) {
        if (!countriesByContinent[continentName]) {
          countriesByContinent[continentName] = [];
        }
        countriesByContinent[continentName].push(country);
      }
    });

    // 2. Ordenar continentes y países
    const sortedContinents = Object.keys(countriesByContinent).sort((a, b) => {
      const translatedA = continentTranslations[a] || a;
      const translatedB = continentTranslations[b] || b;
      return translatedA.localeCompare(translatedB, 'es');
    });

    sortedContinents.forEach(continent => {
      countriesByContinent[continent].sort((a, b) => {
        return a.translations.spa.common.localeCompare(b.translations.spa.common, 'es');
      });
    });

    // 3. Generar el HTML
    sortedContinents.forEach(continentName => {
      const continentGroup = document.createElement('div');
      continentGroup.className = 'continent-group';

      const title = document.createElement('h2');
      title.className = 'continent-title';
      title.textContent = continentTranslations[continentName] || continentName;
      continentGroup.appendChild(title);

      const countrySublist = document.createElement('ul');
      countrySublist.className = 'country-sublist';

      countriesByContinent[continentName].forEach(country => {
        const listItem = document.createElement('li');
        const flagAltText = country.flags.alt || `Bandera de ${country.translations.spa.common}`;
        listItem.innerHTML = `
          <a href="detalle.html#${country.cca3}" class="country-card">
            <img src="${country.flags.svg}" alt="${flagAltText}" loading="lazy" decoding="async" width="80" height="60" class="country-card-flag">
            <span class="country-card-name">${country.translations.spa.common}</span>
          </a>`;
        countrySublist.appendChild(listItem);
      });

      continentGroup.appendChild(countrySublist);
      listContainer.appendChild(continentGroup);
    });
  }

  // --- MOSTRAR ANIMACIÓN DE CARGA ---
  listContainer.innerHTML = `
    <div class="loader-container" role="status" aria-live="polite">
      <div class="loader"></div>
      <p>Cargando países...</p>
    </div>
  `;

  // --- OBTENER DATOS Y RENDERIZAR INICIALMENTE ---
  fetch(jsonURL)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error al cargar el JSON: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      allCountriesData = data;
      renderCountryList(allCountriesData); // Render inicial
    })
    .catch(error => {
      console.error("Error en el proceso de carga:", error);
      listContainer.innerHTML = '<p class="error-message">Error al cargar la lista de países.</p>';
    });

  // --- EVENT LISTENER PARA LA BARRA DE BÚSQUEDA ---
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    const filteredCountries = allCountriesData.filter(country =>
      country.translations.spa.common.toLowerCase().includes(searchTerm)
    );
    renderCountryList(filteredCountries);
  });
});