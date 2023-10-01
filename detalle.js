document.addEventListener("DOMContentLoaded", function () {
  const venezuelaDetails = document.getElementById("venezuela-details");

  // Obtén los datos de Venezuela desde el localStorage
  const data = JSON.parse(localStorage.getItem("datosciudad"));

  if (data) {
    // Encuentra la entrada correspondiente a Venezuela en los datos
    const venezuelaData = data.find((city) => city.name.common === "Venezuela");

    if (venezuelaData) {
      // Construye un HTML con los datos de Venezuela
      const venezuelaHtml = `
        <h1>${venezuelaData.name.official}</h1>
        <p>Capital: ${venezuelaData.capital[0]}</p>
        <p>Población: ${venezuelaData.population}</p>
        <!-- Agrega más detalles aquí según sea necesario -->
      `;

      // Establece el HTML generado en el elemento venezuela-details
      venezuelaDetails.innerHTML = venezuelaHtml;
    } else {
      venezuelaDetails.innerHTML = "<p>Datos de Venezuela no encontrados.</p>";
    }
  }
});
