const app = document.getElementById("app");
const startBtn = document.getElementById("startBtn");
const errorMsg = document.getElementById("errorMsg");
const audio = new Audio("./audio/wrapped.mp3");

audio.loop = true;

let asesoresData = [];

fetch("./data/asesores.json")
  .then(res => res.json())
  .then(data => {
    asesoresData = data.asesores;
  })
  .catch(() => {
    errorMsg.textContent = "Error cargando información";
  });

startBtn.addEventListener("click", () => {
  const id = parseInt(document.getElementById("idInput").value);
  const asesor = asesoresData.find(a => a.id === id);

  if (!asesor) {
    errorMsg.textContent = "No se encontró información del asesor";
    return;
  }

  audio.play().catch(() => {});
  renderWrapped(asesor);
});

function renderWrapped(asesor) {
  const screens = [];

  screens.push(`
    <section class="screen gradient-prospectos">
      <h1>${asesor.nombre}</h1>
      <p class="story">Así se vivió tu año</p>
    </section>
  `);

  Object.entries(asesor.metricas).forEach(([key, value]) => {
    screens.push(`
      <section class="screen gradient-${key}">
        <h2>${key.toUpperCase()}</h2>
        <div class="number">${value}</div>
        <p class="story">${copyDinamico(key, value)}</p>
      </section>
    `);
  });

  screens.push(`
    <section class="screen gradient-final">
      <h2>Tu resumen</h2>
      <p class="story">
        Cada cifra habla de constancia, presencia y proceso.
        Esto no termina aquí.
      </p>
    </section>
  `);

  app.innerHTML = screens.join("");
}

function copyDinamico(tipo, valor) {
  const textos = {
    prospectos: valor > 250
      ? "Estuviste donde había oportunidades."
      : valor > 150
      ? "La constancia abrió conversaciones."
      : "Aquí empezó todo.",

    citas: valor > 80
      ? "Muchos dijeron sí a escucharte."
      : valor > 50
      ? "La curiosidad se volvió diálogo."
      : "Cada cita fue una posibilidad real.",

    visitas: valor > 35
      ? "Llevaste la conversación al mundo real."
      : valor > 20
      ? "No todos cruzan la puerta. Algunos sí."
      : "Cada visita contó.",

    ventas: valor > 15
      ? "No fue suerte. Fue seguimiento."
      : valor > 10
      ? "Convertiste cuando importaba."
      : "Aquí se sembró lo que sigue.",

    escrituras: valor > 9
      ? "Este año dejaste huella real."
      : valor > 6
      ? "Más cerca de lo que parece."
      : "Todo proceso largo empieza así."
  };

  return textos[tipo] || "";
}
