const params = new URLSearchParams(window.location.search);
const asesor = params.get("asesor") || "demo";

let current = 0;
let screens = [];
let data = null;

// Cargar JSON del asesor
fetch(`data/${asesor}.json`)
  .then(res => res.json())
  .then(json => {
    data = json;
    buildScreens();
    showScreen(0);
  })
  .catch(() => {
    alert("No se encontró la información del asesor");
  });

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

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
          ${escena.narrativa
            .map(linea => `<p class="story-line">${linea}</p>`)
            .join("")}
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

function showScreen(index) {
  screens.forEach(s => s.classList.remove("active"));
  screens[index].classList.add("active");
}

function next() {
  if (current < screens.length - 1) {
    current++;
    showScreen(current);
  }
}

// Click en cualquier parte
document.addEventListener("click", () => {
  if (current > 0) next();
});

