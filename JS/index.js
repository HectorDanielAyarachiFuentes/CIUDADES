document.addEventListener("DOMContentLoaded", function () {
  const listContainer = document.getElementById("city-list");
  const jsonURL = "./JSON/independent.json";

  // --- MOSTRAR ANIMACIÓN DE CARGA ---
  listContainer.innerHTML = `
    <div class="loader-container" role="status" aria-live="polite">
      <div class="loader"></div>
      <p>Cargando países...</p>
    </div>
  `;

  fetch(jsonURL)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error al cargar el JSON: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
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

      // 2. Objeto para agrupar los países por continente. (Sin cambios)
      const countriesByContinent = {};

      data.forEach(country => {
        // --- MEJORA 2: CÓDIGO MÁS ROBUSTO ---
        // Usamos optional chaining (?.) para evitar errores si 'continents' no existe.
        const continentName = country.continents?.[0]; 
        
        if (continentName) {
          if (!countriesByContinent[continentName]) {
            countriesByContinent[continentName] = [];
          }
          countriesByContinent[continentName].push(country);
        }
      });

      // 3. Ordenar: ahora ordenamos por el nombre TRADUCIDO del continente.
      const sortedContinents = Object.keys(countriesByContinent).sort((a, b) => {
        const translatedA = continentTranslations[a] || a;
        const translatedB = continentTranslations[b] || b;
        return translatedA.localeCompare(translatedB, 'es');
      });

      // Ordenar los países dentro de cada continente (sin cambios).
      sortedContinents.forEach(continent => {
        countriesByContinent[continent].sort((a, b) => {
          return a.translations.spa.common.localeCompare(b.translations.spa.common, 'es');
        });
      });

      // 4. Limpia el contenedor y genera el nuevo HTML.
      listContainer.innerHTML = '';
      
      sortedContinents.forEach(continentName => {
        const continentGroup = document.createElement('div');
        continentGroup.className = 'continent-group';

        const title = document.createElement('h2');
        title.className = 'continent-title';
        // Usamos nuestro mapa de traducciones. Si no encuentra traducción, usa el nombre original.
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
    })
    .catch(error => {
      console.error("Error en el proceso de carga:", error);
      listContainer.innerHTML = '<p class="error-message">Error al cargar la lista de países.</p>';
    });
});