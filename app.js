let data, current = 0, advisor;
// Corregida la referencia al elemento de música
const music = document.getElementById('bgMusic'); 
const screens = document.querySelectorAll('.screen');
const startButton = document.getElementById('startBtn');
const agentInput = document.getElementById('agentInput'); // Usamos el ID correcto del input

// 1. Carga de datos y habilitación del botón
fetch('./data.json')
  .then(r => r.json())
  .then(j => {
    data = j;
    // Habilita el botón de inicio una vez que los datos están cargados
    startButton.disabled = false; 
    agentInput.addEventListener('input', () => {
        // Habilitar si hay texto en el input
        startButton.disabled = agentInput.value.trim().length === 0;
    });
  });

// 2. Lógica de inicio
startButton.onclick = () => {
  // Corregida la referencia al valor del input
  const id = agentInput.value.trim(); 
  advisor = data.find(a => a.id === id);
  if (!advisor) return alert('ID no encontrado');

  // Colocando el nombre y el nivel en las etiquetas correctas de la segunda pantalla
  document.getElementById('welcome').textContent = advisor.name; 
  document.getElementById('name').textContent = advisor.sales > 10 ? 'NIVEL PRO' : 'BASE SÓLIDA';

  document.getElementById('introCopy').textContent =
    advisor.sales > 10
      ? 'Constancia pura. Esto no es suerte.'
      : 'Todo gran cierre empieza con intención.';

  document.getElementById('prospects').textContent = advisor.prospects;
  document.getElementById('appointments').textContent = advisor.appointments;
  document.getElementById('sales').textContent = advisor.sales;

  document.getElementById('prospectsCopy').textContent =
    advisor.prospects > 50
      ? 'Mucho flujo. El embudo respiró.'
      : 'Menos ruido, más enfoque.';

  document.getElementById('appointmentsCopy').textContent =
    advisor.appointments > 20
      ? 'Aquí se nota el seguimiento.'
      : 'Cada cita cuenta más de lo que parece.';

  document.getElementById('salesCopy').textContent =
    advisor.sales > 8
      ? 'Conversión real. Nivel pro.'
      : 'Base sólida para el próximo ciclo.';

  document.getElementById('summary').textContent =
    'No se trata solo de números. Se trata de evolución.';

  next();
  // Manejo de promesa para evitar errores de reproducción automática
  music.play().catch(()=>{}); 
};

// 3. Navegación
function next() {
  if (screens[current]) screens[current].classList.remove('active');
  current++;
  if (screens[current]) screens[current].classList.add('active');
}

// 4. Swipe (sigue funcionando solo hacia adelante)
let startY = 0;
document.addEventListener('touchstart', e => startY = e.touches[0].clientY);
document.addEventListener('touchend', e => {
  if (startY - e.changedTouches[0].clientY > 50) next();
});

// 5. Exportar imagen
document.getElementById('exportBtn').onclick = () =>
  alert('Exportar imagen: siguiente fase');
