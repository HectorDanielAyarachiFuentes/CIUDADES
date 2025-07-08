document.addEventListener("DOMContentLoaded", function () {
  const listContainer = document.getElementById("city-list"); // Cambiamos el nombre para mayor claridad
  const jsonURL = "./JSON/independent.json";

  fetch(jsonURL)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error al cargar el JSON: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      // 1. Almacena los datos en localStorage para que 'detalle.js' los use.
      localStorage.setItem("datosciudad", JSON.stringify(data));

      // 2. Objeto para agrupar los países por continente.
      //    Ej: { "Europe": [...], "Asia": [...] }
      const countriesByContinent = {};

      data.forEach(country => {
        // Asumimos que el primer continente en la lista es el principal.
        const continentName = country.continents[0]; 
        if (continentName) {
          // Si el continente no existe aún en nuestro objeto, lo creamos como un array vacío.
          if (!countriesByContinent[continentName]) {
            countriesByContinent[continentName] = [];
          }
          // Añadimos el país actual al array de su continente.
          countriesByContinent[continentName].push(country);
        }
      });

      // 3. Ordenar: primero los continentes alfabéticamente, y luego los países dentro de cada continente.
      const sortedContinents = Object.keys(countriesByContinent).sort();

      sortedContinents.forEach(continent => {
        countriesByContinent[continent].sort((a, b) => {
          return a.translations.spa.common.localeCompare(b.translations.spa.common, 'es');
        });
      });

      // 4. Limpia el contenedor y genera el nuevo HTML.
      listContainer.innerHTML = '';
      
      sortedContinents.forEach(continentName => {
        // Crea un contenedor para el grupo del continente
        const continentGroup = document.createElement('div');
        continentGroup.className = 'continent-group';

        // Crea el título del continente
        const title = document.createElement('h2');
        title.className = 'continent-title';
        title.textContent = continentName;
        continentGroup.appendChild(title);

        // Crea la lista de países para este continente
        const countrySublist = document.createElement('ul');
        countrySublist.className = 'country-sublist';

        countriesByContinent[continentName].forEach(country => {
          const listItem = document.createElement('li');
          listItem.innerHTML = `<a href="detalle.html#${country.cca3}">${country.translations.spa.common}</a>`;
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