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
      <h1>${selectedCity.name.common}</h1>
      <p>Capital: ${selectedCity.capital[0]}</p>
      <p>Población: ${selectedCity.population}</p>
      <p>Continente: ${selectedCity.continents}</p>
      <p>Bandera:</p>
<img src="${selectedCity.flags.svg}" alt="${selectedCity.flags.alt}">
<p>Descripción de la bandera:</p>
<p>${selectedCity.flags.alt}</p>

      <p>Escudo de Armas: <img src="${selectedCity.coatOfArms.png}" alt="Escudo de Armas de la ciudad"></p>
      <p>Inicio de la semana: ${selectedCity.startOfWeek}</p>
      <p>Coordenadas de la capital:</p>
<ul>
  <li>Latitud: ${selectedCity.capitalInfo.latlng[0]}</li>
  <li>Longitud: ${selectedCity.capitalInfo.latlng[1]}</li>
</ul>
<a href="https://www.google.com/maps?q=${selectedCity.capitalInfo.latlng[0]},${selectedCity.capitalInfo.latlng[1]}" target="_blank">Ver en Google Maps</a>



<p>Traducciones de Venezuela:</p>
<ul>
  <li>Árabe (Oficial): ${selectedCity.translations.ara.official}</li>
  <li>Árabe (Común): ${selectedCity.translations.ara.common}</li>
  <li>Bretón (Oficial): ${selectedCity.translations.bre.official}</li>
  <li>Bretón (Común): ${selectedCity.translations.bre.common}</li>
  <li>Checo (Oficial): ${selectedCity.translations.ces.official}</li>
  <li>Checo (Común): ${selectedCity.translations.ces.common}</li>
  <li>Galés (Oficial): ${selectedCity.translations.cym.official}</li>
  <li>Galés (Común): ${selectedCity.translations.cym.common}</li>
  <li>Alemán (Oficial): ${selectedCity.translations.deu.official}</li>
  <li>Alemán (Común): ${selectedCity.translations.deu.common}</li>
  <li>Estonio (Oficial): ${selectedCity.translations.est.official}</li>
  <li>Estonio (Común): ${selectedCity.translations.est.common}</li>
  <li>Finlandés (Oficial): ${selectedCity.translations.fin.official}</li>
  <li>Finlandés (Común): ${selectedCity.translations.fin.common}</li>
  <li>Francés (Oficial): ${selectedCity.translations.fra.official}</li>
  <li>Francés (Común): ${selectedCity.translations.fra.common}</li>
  <li>Croata (Oficial): ${selectedCity.translations.hrv.official}</li>
  <li>Croata (Común): ${selectedCity.translations.hrv.common}</li>
  <li>Húngaro (Oficial): ${selectedCity.translations.hun.official}</li>
  <li>Húngaro (Común): ${selectedCity.translations.hun.common}</li>
  <li>Italiano (Oficial): ${selectedCity.translations.ita.official}</li>
  <li>Italiano (Común): ${selectedCity.translations.ita.common}</li>
  <li>Japonés (Oficial): ${selectedCity.translations.jpn.official}</li>
  <li>Japonés (Común): ${selectedCity.translations.jpn.common}</li>
  <li>Coreano (Oficial): ${selectedCity.translations.kor.official}</li>
  <li>Coreano (Común): ${selectedCity.translations.kor.common}</li>
  <li>Holandés (Oficial): ${selectedCity.translations.nld.official}</li>
  <li>Holandés (Común): ${selectedCity.translations.nld.common}</li>
  <li>Persa (Oficial): ${selectedCity.translations.per.official}</li>
  <li>Persa (Común): ${selectedCity.translations.per.common}</li>
  <li>Polaco (Oficial): ${selectedCity.translations.pol.official}</li>
  <li>Polaco (Común): ${selectedCity.translations.pol.common}</li>
  <li>Portugués (Oficial): ${selectedCity.translations.por.official}</li>
  <li>Portugués (Común): ${selectedCity.translations.por.common}</li>
  <li>Ruso (Oficial): ${selectedCity.translations.rus.official}</li>
  <li>Ruso (Común): ${selectedCity.translations.rus.common}</li>
  <li>Eslovaco (Oficial): ${selectedCity.translations.slk.official}</li>
  <li>Eslovaco (Común): ${selectedCity.translations.slk.common}</li>
  <li>Español (Oficial): ${selectedCity.translations.spa.official}</li>
  <li>Español (Común): ${selectedCity.translations.spa.common}</li>
  <li>Serbio (Oficial): ${selectedCity.translations.srp.official}</li>
  <li>Serbio (Común): ${selectedCity.translations.srp.common}</li>
  <li>Sueco (Oficial): ${selectedCity.translations.swe.official}</li>
  <li>Sueco (Común): ${selectedCity.translations.swe.common}</li>
  <li>Turco (Oficial): ${selectedCity.translations.tur.official}</li>
  <li>Turco (Común): ${selectedCity.translations.tur.common}</li>
  <li>Urdu (Oficial): ${selectedCity.translations.urd.official}</li>
  <li>Urdu (Común): ${selectedCity.translations.urd.common}</li>
  <li>Chino (Oficial): ${selectedCity.translations.zho.official}</li>
  <li>Chino (Común): ${selectedCity.translations.zho.common}</li>
</ul>

      
      <!-- Agrega más detalles según sea necesario -->
    `;
    cityDetails.innerHTML = cityHtml;
  } else {
    // Maneja el caso en el que la ciudad no se encuentra
    console.error("Ciudad no encontrada.");
  }
});
