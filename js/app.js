let data, current = 0, advisor;
const screens = document.querySelectorAll('.screen');
const music = document.getElementById('music');

fetch('./data.json')
  .then(r => r.json())
  .then(j => data = j);

document.getElementById('startBtn').onclick = () => {
  const id = document.getElementById('agentId').value;
  advisor = data.find(a => a.id === id);
  if (!advisor) return alert('ID no encontrado');

  document.getElementById('welcome').textContent =
    `${advisor.name}, este fue tu año`;

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
  music.play().catch(()=>{});
};

function next() {
  screens[current].classList.remove('active');
  current++;
  if (screens[current]) screens[current].classList.add('active');
}

let startY = 0;
document.addEventListener('touchstart', e => startY = e.touches[0].clientY);
document.addEventListener('touchend', e => {
  if (startY - e.changedTouches[0].clientY > 50) next();
});

document.getElementById('exportBtn').onclick = () =>
  alert('Exportar imagen: siguiente fase');
