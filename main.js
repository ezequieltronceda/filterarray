const inputBusqueda = document.getElementById("busqueda");
const sugerencias = document.getElementById("sugerencias");

const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const ciudades = [];

fetch(endpoint)
  .then((total) => total.json())
  .then((data) => ciudades.push(...data))
  .catch((error) => console.error("Fuck", error));

function busqueda(palabra, ciudades) {
  return ciudades.filter((place) => {
    const regex = new RegExp(palabra, "gi");
    return place.city.match(regex) || place.state.match(regex);
  });
}
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayBusqueda() {
  const resultado = busqueda(this.value, ciudades);
  const show = resultado
    .map((place) => {
      const regex = new RegExp(this.value, "gi");
      const nombreCiudad = place.city.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      const nombreEstado = place.state.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      return `
        <li>
        <span class="name">${nombreCiudad}, ${nombreEstado}</span>
        <span class="poblacion">${numberWithCommas(place.population)}</span>
        </li>   
    `;
    })
    .join("");
  sugerencias.innerHTML = show;
}

inputBusqueda.addEventListener("change", displayBusqueda);
inputBusqueda.addEventListener("keyup", displayBusqueda);
