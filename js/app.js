let data;
let screens = [];
let current = 0;

const params = new URLSearchParams(window.location.search);
const asesor = params.get("asesor") || "demo";

fetch(`data/${asesor}.json`)
  .then(r => r.json())
  .then(json => {
    data = json;
    buildScreens();
    show(0);
  });

function buildScreens() {
  const root = document.getElementById("app");

  let html = `
    <section class="screen">
      <h1>${data.nombre}</h1>
      <p>Este fue tu ${data.anio}</p>
      <button onclick="next()">Iniciar experiencia</button>
    </section>
  `;

  data.escenas.forEach(e => {
    html += `
      <section class="screen">
        <h2>${e.titulo}</h2>
        <div class="number">${data.metricas[e.valor]}</div>
        ${e.narrativa.map(l => `<p class="story-line">${l}</p>`).join("")}
      </section>
    `;
  });

  const cierre = data.cierre[Math.floor(Math.random() * data.cierre.length)];

  html += `
    <section class="screen" id="final">
      <h1>${cierre}</h1>
      <button class="export" onclick="exportImage()">Guardar recuerdo</button>
    </section>
  `;

  root.innerHTML = html;
  screens = document.querySelectorAll(".screen");
}

function show(i) {
  screens.forEach(s => s.classList.remove("active"));
  screens[i].classList.add("active");
}

function next() {
  if (current === 0) document.getElementById("bgm").play();
  if (current < screens.length - 1) {
    current++;
    show(current);
  }
}

function exportImage() {
  const final = document.getElementById("final");
  html2canvas(final).then(canvas => {
    const link = document.createElement("a");
    link.download = "mi-ano-en-resultados.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}
