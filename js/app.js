let data;
let screens = [];
let current = 0;
let timer;
let startX = 0;

const params = new URLSearchParams(window.location.search);
const asesor = params.get("asesor") || "demo";

fetch(`data/${asesor}.json`)
  .then(r => r.json())
  .then(json => {
    data = json;
    buildScreens();
    show(0);
    autoPlay();
    enableSwipe();
  });

function buildScreens() {
  const app = document.getElementById("app");

  let html = `
    <section class="screen active">
      <div class="content">
        <h1>${data.nombre}</h1>
        <p>Este fue tu ${data.anio}</p>
      </div>
    </section>
  `;

  data.escenas.forEach(e => {
    html += `
      <section class="screen gradient-${e.valor}">
        <div class="content">
          <h2>${e.titulo}</h2>
          <div class="number">${data.metricas[e.valor]}</div>
          ${e.narrativa.map(l => `<p class="story-line">${l}</p>`).join("")}
        </div>
      </section>
    `;
  });

  const cierre = data.cierre[Math.floor(Math.random() * data.cierre.length)];

  html += `
    <section class="screen" id="final">
      <div class="content">
        <h1>${cierre}</h1>
        <button type="button" class="export" onclick="exportStory()">Guardar mi historia</button>
      </div>
    </section>
  `;

  app.innerHTML = html;
  screens = document.querySelectorAll(".screen");
}

function show(i) {
  screens.forEach(s => s.classList.remove("active"));
  screens[i].classList.add("active");
  updateProgress();
}

function next() {
  if (current < screens.length - 1) {
    current++;
    show(current);
  }
}

function prev() {
  if (current > 0) {
    current--;
    show(current);
  }
}

function autoPlay() {
  document.getElementById("bgm").play();
  timer = setInterval(() => {
    if (current < screens.length - 1) next();
    else clearInterval(timer);
  }, 4200);
}

/* PROGRESS */
function updateProgress() {
  const percent = ((current + 1) / screens.length) * 100;
  document.getElementById("progress").style.width = percent + "%";
}

/* SWIPE */
function enableSwipe() {
  document.addEventListener("touchstart", e => startX = e.touches[0].clientX);
  document.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) next();
    if (endX - startX > 50) prev();
  });
}

/* EXPORT STORY */
function exportStory() {
  clearInterval(timer);
  html2canvas(document.body).then(canvas => {
    const link = document.createElement("a");
    link.download = "mi-ano-en-resultados.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}
