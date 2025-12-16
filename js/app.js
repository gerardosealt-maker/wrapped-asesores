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

  root.innerHTML = `
    <section class="screen">
      <h1>${data.nombre}</h1>
      <p class="story">Este fue tu ${data.anio}. Desliza o toca para comenzar.</p>
      <button onclick="next()">Iniciar experiencia</button>
    </section>

    <section class="screen">
      <h2>Todo empezó con un mensaje</h2>
      <div class="number">${data.metricas.prospectos}</div>
      <p class="story">${random(data.frases.prospectos)}</p>
    </section>

    <section class="screen">
      <h2>Cuando hubo intención real</h2>
      <div class="number">${data.metricas.citas}</div>
      <p class="story">${random(data.frases.citas)}</p>
    </section>

    <section class="screen">
      <h2>El momento clave</h2>
      <div class="number">${data.metricas.visitas}</div>
      <p class="story">${random(data.frases.visitas)}</p>
    </section>

    <section class="screen">
      <h2>Resultados reales</h2>
      <div class="number">${data.metricas.ventas}</div>
      <p class="story">${random(data.frases.ventas)}</p>
    </section>

    <section class="screen">
      <h2>Esto ya quedó en papel</h2>
      <div class="number">${data.metricas.escrituras}</div>
      <p class="story">${random(data.frases.escrituras)}</p>
    </section>

    <section class="screen">
      <h1>Este fue tu ${data.anio}</h1>
      <p class="story">
        No fue suerte. Fue constancia, criterio y disciplina.
      </p>
    </section>
  `;

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
