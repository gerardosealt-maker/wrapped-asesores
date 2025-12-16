let advisors = [];
const audio = document.getElementById("bgMusic");

fetch("data.json")
  .then(res => res.json())
  .then(data => advisors = data);

document.getElementById("startBtn").addEventListener("click", () => {
  const id = document.getElementById("agentInput").value.trim();
  const advisor = advisors.find(a => a.id === id);

  if (!advisor) {
    alert("ID no encontrado");
    return;
  }

  // Mostrar experiencia
  document.querySelector(".screen-login").style.display = "none";
  document.getElementById("experience").classList.remove("hidden");

  // Audio (desbloqueado por interacción)
  audio.play().catch(() => {});

  // Inyectar data
  document.getElementById("name").textContent =
    `${advisor.name}, así se vio tu año`;

  document.getElementById("introCopy").textContent =
    advisor.sales > 8
      ? "Un año de consistencia y cierres reales."
      : "Cada paso construyó la base de lo que viene.";

  document.getElementById("prospects").textContent = advisor.prospects;
  document.getElementById("appointments").textContent = advisor.appointments;
  document.getElementById("sales").textContent = advisor.sales;

  document.getElementById("prospectsCopy").textContent =
    advisor.prospects > 50
      ? "El flujo nunca se detuvo."
      : "Menos volumen, más intención.";

  document.getElementById("appointmentsCopy").textContent =
    advisor.appointments > 20
      ? "Seguimiento que sí convirtió."
      : "Cada cita fue aprendizaje.";

  document.getElementById("salesCopy").textContent =
    advisor.sales > 10
      ? "Resultados que hablan solos."
      : "La base está puesta.";

  document.getElementById("summary").textContent =
    "Esto no es una calificación. Es una fotografía de tu evolución.";
});
