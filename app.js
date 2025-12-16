let data, current = 0, advisor, averageSales; // Agregamos averageSales
const screens = document.querySelectorAll('.screen');
const music = document.getElementById('music'); 
const startButton = document.getElementById('startBtn');
const agentInput = document.getElementById('agentInput');
const navigationDots = document.getElementById('navigation-dots');

// 1. CARGA DE DATOS, CÁLCULO DE PROMEDIOS Y HABILITACIÓN
fetch('./data.json')
  .then(r => r.json())
  .then(j => {
      data = j;
      // Calcula el promedio de ventas de todo el equipo
      const totalSales = data.reduce((sum, a) => sum + a.sales, 0);
      averageSales = totalSales / data.length;
  })
  .then(() => {
    startButton.disabled = false;
    initDots();
  });

// 2. LÓGICA DE INICIO Y CARGA DE MÉTRICAS
startButton.onclick = () => {
  const id = agentInput.value.trim(); 
  advisor = data.find(a => a.id === id);
  if (!advisor) return alert('ID no encontrado. Por favor, verifica tu número.');

  // --- CÁLCULO DE MÉTRICAS CLAVE ---
  const prospectConversion = (advisor.appointments / advisor.prospects) * 100;
  const saleConversion = (advisor.sales / advisor.appointments) * 100;
  const salesDifference = advisor.sales - averageSales;

  // --- PANTALLA INTRODUCCIÓN ---
  document.getElementById('welcome').textContent = advisor.name;
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

  // --- PANTALLA RESUMEN FINAL ---
  document.getElementById('summaryTitle').textContent =
      salesDifference > 0
          ? `¡${advisor.sales} Ventas! (+${salesDifference.toFixed(1)})`
          : `¡${advisor.sales} Ventas! (${salesDifference.toFixed(1)})`;

  document.getElementById('summary').textContent =
    salesDifference > 0
        ? `Superaste el promedio del equipo (${averageSales.toFixed(1)}) por ${salesDifference.toFixed(1)} cierres. ¡Eres un líder!`
        : `Tu desempeño te da una base sólida. El promedio del equipo fue de ${averageSales.toFixed(1)} cierres. ¡A buscar ese extra el próximo año!`;


  next();
  music.play().catch(()=>{}); 
};

// 3. FUNCIÓN DE NAVEGACIÓN Y PUNTOS
function initDots() {
  // Crea un punto por cada pantalla de contenido (todas menos la de login)
  screens.forEach((screen, index) => {
    if (screen.id !== 'login') {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      navigationDots.appendChild(dot);
    }
  });
}

function next() {
  if (screens[current]) screens[current].classList.remove('active'); 
  current++;
  
  if (screens[current]) {
    screens[current].classList.add('active');

    // --- UX MEJORA: Actualizar Puntos de Navegación ---
    const dots = document.querySelectorAll('#navigation-dots .dot');
    dots.forEach((dot, index) => {
      // current=1 es la primera pantalla de contenido (index=0 del dot)
      dot.classList.toggle('active', index === (current - 1)); 
    });
  } else {
    current = screens.length - 1; 
  }
}

// 4. NAVEGACIÓN POR SWIPE (Táctil)
let startY = 0;
document.addEventListener('touchstart', e => startY = e.touches[0].clientY);
document.addEventListener('touchend', e => {
  if (startY - e.changedTouches[0].clientY > 50) next();
});

// 5. EXPORTAR IMAGEN (html2canvas)
document.getElementById('exportBtn').onclick = () => {
    const screenToCapture = screens[current]; // Captura solo la pantalla actual (Resumen)
    
    // Oculta temporalmente los puntos de navegación y el hint para la captura
    navigationDots.style.display = 'none';
    document.getElementById('swipe-hint').style.display = 'none';

    html2canvas(screenToCapture, {
        allowTaint: true,
        useCORS: true,
        scale: 2 // Escala alta para mejor calidad en móviles
    }).then(function(canvas) {
        // Restaurar los elementos de navegación
        navigationDots.style.display = 'flex';
        document.getElementById('swipe-hint').style.display = 'block';

        // Crear enlace de descarga
        const link = document.createElement('a');
        link.download = `Wrapped_${advisor.name.replace(/\s/g, '_')}_${advisor.id}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        alert('¡Recuerdo guardado con éxito!');
    });
};

// Función Opcional para Navegar con la barra espaciadora
document.addEventListener('keyup', (e) => {
    if (e.code === "Space") {
        next();
    }
});
