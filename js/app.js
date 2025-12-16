const app = document.getElementById("app");
const startBtn = document.getElementById("startBtn");
const errorMsg = document.getElementById("errorMsg");
const audio = new Audio("./audio/wrapped.mp3");
audio.loop = true;

let asesores = [];
let screens = [];
let current = 0;
let autoplayTimer;

fetch("./data/asesores.json")
  .then(r => r.json())
  .then(d => asesores = d.asesores);

startBtn.onclick = () => {
  const id = parseInt(document.getElementById("idInput").value);
  const asesor = asesores.find(a => a.id === id);
  if (!asesor) {
    errorMsg.textContent = "ID no encontrado";
    return;
  }
  audio.play().catch(()=>{});
  buildWrapped(asesor);
};

function buildWrapped(asesor) {
  app.innerHTML = "";
  screens = [];

  screens.push(createScreen(
    "gradient-prospectos",
    `<h1>${asesor.nombre}</h1><p class="story">Así se vivió tu año</p>`
  ));

  Object.entries(asesor.metricas).forEach(([k,v]) => {
    screens.push(createScreen(
      `gradient-${k}`,
      `<h2>${k.toUpperCase()}</h2>
       <div class="number">${v}</div>
       <p class="story">${copy(k,v)}</p>`
    ));
  });

  screens.push(createScreen(
    "gradient-final",
    `<h2>Resumen</h2>
     <p class="story">Nada de esto fue casualidad.</p>
     <button onclick="exportImage()">Guardar recuerdo</button>`
  ));

  screens.forEach(s => app.appendChild(s));
  showScreen(0);
  autoplay();
}

function createScreen(gradient, html) {
  const s = document.createElement("section");
  s.className = `screen ${gradient}`;
  s.innerHTML = html;
  return s;
}

function showScreen(i) {
  screens.forEach(s => s.classList.remove("active"));
  screens[i].classList.add("active");
  current = i;
}

function autoplay() {
  autoplayTimer = setInterval(() => {
    if (current < screens.length - 1) showScreen(current + 1);
  }, 4000);
}

function copy(tipo, valor) {
  if (valor > 200) return "Este número habla de dominio.";
  if (valor > 100) return "Constancia que suma.";
  return "Aquí empezó algo.";
}

// EXPORTAR IMAGEN FINAL
function exportImage() {
  const node = screens[screens.length - 1];
  html2canvas(node).then(canvas => {
    const link = document.createElement("a");
    link.download = "mi_wrapped.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}
