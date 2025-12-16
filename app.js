let data, current = 0, advisor;
const screens = document.querySelectorAll('.screen');
// Usamos el ID correcto del audio en index.html
const music = document.getElementById('music'); 
const startButton = document.getElementById('startBtn');
const agentInput = document.getElementById('agentInput');

// 1. CARGA DE DATOS
fetch('./data.json')
  .then(r => r.json())
  .then(j => data = j)
  .then(() => {
    // Habilitar el botón una vez que los datos estén cargados
    startButton.disabled = false;
  });

// 2. LÓGICA DE INICIO Y CARGA DE MÉTRICAS
startButton.onclick = () => {
  // CORRECCIÓN: Usamos 'agentInput'
  const id = agentInput.value.trim(); 
  advisor = data.find(a => a.id === id);
  if (!advisor) return alert('ID no encontrado. Por favor, verifica tu número.');

  // --- CÁLCULO DE MÉTRICAS CLAVE ---
  const prospectConversion = (advisor.appointments / advisor.prospects) * 100;
  const saleConversion = (advisor.sales / advisor.appointments) * 100;

  // --- PANTALLA INTRODUCCIÓN ---
  document.getElementById('welcome').textContent = `${advisor.name}, ¡este fue tu año!`;
  document.getElementById('name').textContent = advisor.sales > 10 ? 'NIVEL MASTER' : 'BASE SÓLIDA';
  document.getElementById('introCopy').textContent =
    advisor.sales > 10
      ? 'Constancia pura. Esto no es suerte, es consistencia en acción.'
      : 'Todo gran cierre empieza con una intención firme. Listo para el próximo ciclo.';

  // --- PANTALLA PROSPECTOS ---
  document.getElementById('prospects').textContent = advisor.prospects;
  document.getElementById('prospectsCopy').textContent =
    prospectConversion >= 50
      ? `Tuviste una conversión de ${prospectConversion.toFixed(0)}% de prospecto a cita. ¡Enfoque de cirujano!`
      : `Registraste ${advisor.prospects} prospectos. Menos ruido, más enfoque para el seguimiento este año.`;

  // --- PANTALLA CITAS ---
  document.getElementById('appointments').textContent = advisor.appointments;
  document.getElementById('appointmentsCopy').textContent =
    saleConversion >= 30
      ? `Un impresionante ${saleConversion.toFixed(0)}% de tus citas se cerraron. ¡Eficacia pura!`
      : `Lograste ${advisor.appointments} citas. Cada una es un aprendizaje valioso. ¡A refinar el cierre!`;

  // --- PANTALLA VENTAS ---
  document.getElementById('sales').textContent = advisor.sales;
  document.getElementById('salesCopy').textContent =
    advisor.sales > 8
      ? 'Conversión real. Nivel pro y resultados tangibles. ¡Sigue así!'
      : 'Base sólida para el próximo ciclo. Usa estos aprendizajes para romper tus metas.';

  // --- PANTALLA RESUMEN ---
  document.getElementById('summary').textContent =
    'No se trata solo de números. Se trata de tu evolución y el impacto que generaste. ¡Felicidades por tu esfuerzo!';


  next();
  // Intenta reproducir la música y maneja el error si el navegador lo bloquea
  music.play().catch(()=>{}); 
};

// 3. FUNCIÓN DE NAVEGACIÓN
function next() {
  // Oculta la pantalla actual (solo si no estamos en el login para la primera transición)
  if (screens[current]) screens[current].classList.remove('active'); 
  
  current++;
  
  // Muestra la siguiente pantalla
  if (screens[current]) {
    screens[current].classList.add('active');
  } else {
    // Si ya no hay más pantallas, volvemos a la primera o mostramos un mensaje final
    // alert('Fin de la experiencia');
    current = screens.length - 1; // Quedarse en la última pantalla
  }
}

// 4. NAVEGACIÓN POR SWIPE (Táctil)
let startY = 0;
document.addEventListener('touchstart', e => startY = e.touches[0].clientY);
document.addEventListener('touchend', e => {
  // Detectar swipe hacia arriba (para avanzar)
  if (startY - e.changedTouches[0].clientY > 50) next();
  // Opcional: Detectar swipe hacia abajo (para regresar)
  // if (e.changedTouches[0].clientY - startY > 50 && current > 0) prev(); 
});

// 5. EXPORTAR IMAGEN (pendiente)
document.getElementById('exportBtn').onclick = () =>
  alert('Exportar imagen: Esta funcionalidad está lista para la siguiente fase con html2canvas!');

// Función Opcional para Navegar con la barra espaciadora
document.addEventListener('keyup', (e) => {
    if (e.code === "Space") {
        next();
    }
});
