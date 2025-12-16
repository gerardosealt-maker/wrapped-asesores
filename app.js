let advisors = [];
const audio = document.getElementById("bgMusic");
const startBtn = document.getElementById("startBtn");

// Cargar JSON
fetch("data.json")
  .then(res => res.json())
  .then(data => {
    advisors = data;
    startBtn.disabled = false;
  })
  .catch(() => alert("Error cargando datos"));

// Iniciar experiencia
startBtn.addEventListener("click", () => {
  const idInput = document.getElementById("agentInput").value;
  const id = String(idInput).trim();

  const advisor = advisors.find(
    a => String(a.id).trim() === id
  );

  if (!advisor) {
    alert("No encontramos ese ID. Revísalo bien.");
    return;
  }

  // Mostrar experiencia
  document.getElementById("login").style.display = "none";
  document.getElementById("experience").classList.remove("hidden");

  // Música (permitida por click)
  audio.volume = 0.5;
  audio.play().catch(() => {});

  // Datos base
  document.getElementById("name").textContent =
    `${advisor.name}, así se vio tu año`;

  document.getElementById("prospects").textContent = advisor.prospects;
  document.getElementById("appointments").textContent = advisor.appointments;
  document.getElementById("sales").textContent = advisor.sales;

  // Copys dinámicos + easter eggs
  document.getElementById("introCopy").textContent =
    advisor.sales >= 12
      ? "Nivel élite desbloqueado. Esto no fue casualidad."
      : "Cada número cuenta una parte de tu historia.";

  document.getElementById("prospectsCopy").textContent =
    advisor.prospects >= 70
      ? "Atrajiste miradas como imán."
      : "Menos ruido, más intención.";

  document.getElementById("appointmentsCopy").textContent =
    advisor.appointments >= 30
      ? "Aquí empezó la magia."
      : "Cada cita fue una semilla.";

  document.getElementById("salesCopy").textContent =
    advisor.sales >= 10
      ? "Conversión real. Respeto."
      : "La base está puesta para lo que sigue.";

  document.getElementById("summary").textContent =
    advisor.sales >= 12
      ? "Este año dejaste huella. El siguiente promete más."
      : "No es un cierre, es un punto de partida.";
});

// Exportar imagen
document.getElementById("exportBtn").addEventListener("click", () => {
  html2canvas(document.getElementById("experience")).then(canvas => {
    const link = document.createElement("a");
    link.download = "mi_wrapped.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
});
