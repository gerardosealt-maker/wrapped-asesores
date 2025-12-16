let data = null;
let screens = [];
let current = 0;

const params = new URLSearchParams(window.location.search);
const asesor = params.get("asesor") || "demo";

fetch(`data/${asesor}.json`)
  .then(response => {
    if (!response.ok) throw new Error("No existe el JSON");
    return response.json();
  })
  .then(json => {
    data = json;
    buildScreens();
    show(0);
  })
  .catch(err => {
    document.body.innerHTML = `
      <div style="
        height:100vh;
        display:flex;
        justify-content:center;
        align-items:center;
        background:#0b0b0f;
        color:white;
        font-family:Inter;
        text-align:center;
        padding:40px;
      ">
        <div>
          <h1>Error</h1>
          <p>No se encontró información del asesor.</p>
          <p style="opacity:.6">Verifica el nombre del archivo JSON.</p>
        </div>
      </div>
    `;
  });

function buildScreens() {
  const root = document.getElementById("app");

  let html = `
    <section class="screen">
      <h1>${data.nombre}</h1>
      <p class="story">Este fue tu ${data.anio}.</p>
      <button onclick="next()">Iniciar experiencia</button>
    </section>
  `;

  data.escenas.forEach(escena => {
    const valor = data.metricas[escena.valor];

    html += `
      <section class="screen">
        <h2>${escena.titulo}</h2>
        <div class="number">${valor}</div>
        <div class="story">
          ${escena.narrativa.map(
            linea => `<p class="story-line">${linea}</p>`
          ).join("")}
        </div>
      </section>
    `;
  });

  html += `
    <section class="screen">
      <h1>Este fue tu ${data.anio}</h1>
      <p class="story">
        No todos llegan hasta aquí.<br>
        Tú sí.
      </p>
    </section>
  `;

  root.innerHTML = html;
  screens = document.querySelectorAll(".screen");
}

function show(index) {
  screens.forEach(s => s.classList.remove("active"));
  screens[index].classList.add("active");
}

function next() {
  if (current < screens.length - 1) {
    current++;
    show(current);
  }
}
