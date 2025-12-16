const params = new URLSearchParams(window.location.search);
const asesor = params.get("asesor") || "demo";

const audio = document.getElementById("bgAudio");

window.addEventListener("click", () => {
  audio.volume = 0.4;
  audio.play();
}, { once: true });

fetch(`data/${asesor}.json`)
  .then(res => res.json())
  .then(data => {
    document.getElementById("nombre").innerText =
      `${data.nombre}, este fue tu año`;

    document.getElementById("prospectos").innerText = data.prospectos;
    document.getElementById("citas").innerText = data.citas;
    document.getElementById("visitas").innerText = data.visitas;
    document.getElementById("ventas").innerText = data.ventas;

    document.getElementById("textoProspectos").innerText = data.frases.prospectos;
    document.getElementById("textoCitas").innerText = data.frases.citas;
    document.getElementById("textoVisitas").innerText = data.frases.visitas;
    document.getElementById("textoVentas").innerText = data.frases.ventas;
    document.getElementById("cierre").innerText = data.frases.cierre;
  });
