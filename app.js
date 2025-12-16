let data, current = 0, advisor, averageSales;
const screens = document.querySelectorAll('.screen');
const music = document.getElementById('music'); 
const startButton = document.getElementById('startBtn');
const agentInput = document.getElementById('agentInput'); 
const navigationDots = document.getElementById('navigation-dots');
const swipeHint = document.getElementById('swipe-hint');
const exportButton = document.getElementById('exportBtn');
const whatsappShareBtn = document.getElementById('whatsappShareBtn'); 


// DATOS DE PRUEBA TEMPORALES para simular la estructura completa
const TEMP_DATA_EXTENSION = {
    totalDeeds: 7,
    monthlyData: {
        "Ene": { "sales": 1, "deeds": 0 }, "Feb": { "sales": 0, "deeds": 0 }, 
        "Mar": { "sales": 2, "deeds": 1 }, "Abr": { "sales": 0, "deeds": 0 }, 
        "May": { "sales": 1, "deeds": 1 }, "Jun": { "sales": 0, "deeds": 0 }, 
        "Jul": { "sales": 2, "deeds": 2 }, "Ago": { "sales": 1, "deeds": 1 }, 
        "Sep": { "sales": 0, "deeds": 0 }, "Oct": { "sales": 1, "deeds": 1 }, 
        "Nov": { "sales": 0, "deeds": 0 }, "Dic": { "sales": 1, "deeds": 1 }
    }
};

function findBestMonth(monthlyData) {
    let bestMonth = '';
    let maxScore = -1;
    const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

    for (const month of months) {
        const score = (monthlyData[month].sales * 3) + (monthlyData[month].deeds * 5); 
        if (score > maxScore) {
            maxScore = score;
            bestMonth = month;
        }
    }
    return { name: bestMonth, score: maxScore };
}


// 1. CARGA DE DATOS, CÁLCULO DE PROMEDIOS Y HABILITACIÓN DEL BOTÓN
fetch('./data.json')
  .then(r => r.json())
  .then(j => {
      data = j;
      const totalSales = data.reduce((sum, a) => sum + a.sales, 0);
      averageSales = totalSales / data.length;
  })
  .then(() => {
    // HABILITA EL BOTÓN CUANDO HAY CONTENIDO EN EL INPUT
    agentInput.addEventListener('input', () => {
        startButton.disabled = agentInput.value.trim().length === 0;
    });
    initDots();
  });

// 2. LÓGICA DE INICIO Y CARGA DE MÉTRICAS
startButton.onclick = () => {
  const id = agentInput.value.trim(); 
  advisor = data.find(a => a.id === id);
  if (!advisor) return alert('ID no encontrado. Por favor, verifica tu número.');
  
  advisor = {...advisor, ...TEMP_DATA_EXTENSION};

  // --- CÁLCULO DE MÉTRICAS CLAVE Y INSIGHTS ---
  const prospectConversion = (advisor.appointments / advisor.prospects) * 100;
  const saleConversion = (advisor.sales / advisor.appointments) * 100;
  const salesDifference = advisor.sales - averageSales;
  const bestMonthData = findBestMonth(advisor.monthlyData);
  const bestMonthStats = advisor.monthlyData[bestMonthData.name];
  
  // --- PANTALLAS (Asignación de Contenido) ---
  document.getElementById('welcome').textContent = advisor.name;
  document.getElementById('name').textContent = advisor.sales > 10 ? 'NIVEL MASTER' : 'BASE SÓLIDA';
  document.getElementById('introCopy').textContent =
    advisor.sales > 10
      ? 'Constancia pura. Esto no es suerte, es consistencia en acción.'
      : 'Todo gran cierre empieza con una intención firme. Listo para el próximo ciclo.';

  document.getElementById('prospects').textContent = advisor.prospects;
  document.getElementById('prospectsCopy').textContent =
    prospectConversion >= 50
      ? `Tuviste una conversión de ${prospectConversion.toFixed(0)}% de prospecto a cita. ¡Enfoque de cirujano!`
      : `Registraste ${advisor.prospects} prospectos. Menos ruido, más enfoque para el seguimiento este año.`;

  document.getElementById('appointments').textContent = advisor.appointments;
  document.getElementById('appointmentsCopy').textContent =
    saleConversion >= 30
      ? `Un impresionante ${saleConversion.toFixed(0)}% de tus citas se cerraron. ¡Eficacia pura!`
      : `Lograste ${advisor.appointments} citas. Cada una es un aprendizaje valioso. ¡A refinar el cierre!`;

  document.getElementById('sales').textContent = advisor.sales;
  document.getElementById('salesCopy').textContent =
    advisor.sales > 8
      ? 'Conversión real. Nivel pro y resultados tangibles. ¡Sigue así!'
      : 'Base sólida para el próximo ciclo. Usa estos aprendizajes para romper tus metas.';
      
  document.getElementById('deeds').textContent = advisor.totalDeeds;
  document.getElementById('deedsCopy').textContent =
    advisor.totalDeeds > 5
      ? `Tuviste ${advisor.totalDeeds} escrituras. ¡La meta se ve cerca, sigue monetizando ese esfuerzo!`
      : `Registraste ${advisor.totalDeeds} escrituras. El volumen es importante, pero la calidad se traduce en cierres.`;

  document.getElementById('bestMonth').textContent = bestMonthData.name.toUpperCase();
  document.getElementById('bestMonthCopy').textContent = 
      `En ${bestMonthData.name}, lograste ${bestMonthStats.sales} ventas y ${bestMonthStats.deeds} escrituras. ¡Tu mejor desempeño del año! Enfoca tu energía en replicar ese éxito.`;

  // --- Lógica del Resumen Final ---
  document.getElementById('finalSales').textContent = advisor.sales;
  document.getElementById('finalDeeds').textContent = advisor.totalDeeds;
  document.getElementById('finalMonth').textContent = bestMonthData.name.toUpperCase();
  // ------------------------------------

  document.getElementById('summary').textContent =
    salesDifference > 0
        ? `Superaste el promedio del equipo de ${averageSales.toFixed(1)} cierres por ${salesDifference.toFixed(1)} unidades. ¡Tu impacto es enorme!`
        : `Tu base de ${advisor.sales} cierres es un excelente punto de partida. El promedio del equipo fue de ${averageSales.toFixed(1)}. ¡A superar esa marca el próximo año!`;


  // EL BOTÓN INICIA EN current=0, lo forzamos a pasar a current=1
  screens[0].classList.remove('active');
  current = 1;
  screens[current].classList.add('active');
  updateDots();
  swipeHint.style.display = 'block';
  swipeHint.querySelector('p').textContent = 'Desliza ↑ o ↓';

  music.play().catch(()=>{}); 
};

// 3. FUNCIONES DE NAVEGACIÓN Y PUNTOS
function initDots() {
  // Solo crea puntos para las pantallas de la experiencia (índice 1 en adelante)
  for (let i = 1; i < screens.length; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    navigationDots.appendChild(dot);
  }
}

function updateDots() {
    // Los puntos se sincronizan con la pantalla actual - 1 (ya que el Login no tiene punto)
    const dots = document.querySelectorAll('#navigation-dots .dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === (current - 1)); 
    });
}

function next() {
  if (current < screens.length - 1) { 
      screens[current].classList.remove('active'); 
      current++;
      screens[current].classList.add('active');
      updateDots();
      
      swipeHint.style.display = (current === screens.length - 1) ? 'none' : 'block';
      if (current > 0 && current < screens.length - 1) swipeHint.querySelector('p').textContent = 'Desliza ↑ o ↓';
  }
}

function prev() {
    // Si estamos en la pantalla 1 (la primera de la experiencia)
    if (current === 1) { 
        screens[current].classList.remove('active');
        current = 0; // Regresamos al Login
        screens[current].classList.add('active');
        music.pause();
        swipeHint.style.display = 'none'; 
        updateDots();
    } 
    // Si estamos en cualquier otra pantalla de la experiencia
    else if (current > 1) { 
        screens[current].classList.remove('active');
        current--;
        screens[current].classList.add('active');
        updateDots();
        swipeHint.style.display = 'block';
        swipeHint.querySelector('p').textContent = 'Desliza ↑ o ↓';
    }
}

// 4. NAVEGACIÓN POR SWIPE (Táctil)
let startY = 0;
document.addEventListener('touchstart', e => {
    if (current > 0 && current < screens.length) { // Solo si estamos dentro de la experiencia
        startY = e.touches[0].clientY;
    }
});

document.addEventListener('touchend', e => {
  if (current > 0 && current < screens.length) {
      const deltaY = startY - e.changedTouches[0].clientY;
      
      if (deltaY > 50) next(); // Deslizar hacia arriba (siguiente)
      else if (deltaY < -50) prev(); // Deslizar hacia abajo (anterior/regresar a login)
  }
});


// 5. EXPORTAR IMAGEN (html2canvas)
exportButton.onclick = () => {
    const screenToCapture = screens[current]; 
    
    // Ocultar elementos para la captura
    navigationDots.style.display = 'none';
    swipeHint.style.display = 'none';
    document.getElementById('action-buttons').style.display = 'none'; 
    // Ocultamos el título h2 de 'Tu Legado del Año' si es necesario para un look más limpio de certificado (opcional)
    // screenToCapture.querySelector('h2').style.display = 'none';

    html2canvas(screenToCapture, {
        allowTaint: true,
        useCORS: true,
        scale: 2 
    }).then(function(canvas) {
        // Restaurar elementos
        navigationDots.style.display = 'flex';
        swipeHint.style.display = 'block';
        document.getElementById('action-buttons').style.display = 'flex'; 
        // screenToCapture.querySelector('h2').style.display = 'block'; // Restaurar título

        const link = document.createElement('a');
        link.download = `Wrapped_${advisor.name.replace(/\s/g, '_')}_${advisor.id}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        alert('¡Recuerdo guardado con éxito! Abre tu Instagram o WhatsApp para subirlo a tus Historias/Estados.');
    });
};

// 6. LÓGICA DE COMPARTIR EN WHATSAPP (Enlace)
whatsappShareBtn.onclick = () => {
    const shareText = `¡Mira mi #Wrapped de Asesor de Ventas! Logré ${advisor.sales} ventas y ${advisor.totalDeeds || 'N/A'} escrituras este año. ¡Vamos por más! 🚀 #Ventas #Éxito #MiWrapped`;
    const encodedText = encodeURIComponent(shareText);
    const appLink = encodeURIComponent(window.location.href);

    const url = `https://wa.me/?text=${encodedText}%20${appLink}`;
    window.open(url, '_blank');
};
