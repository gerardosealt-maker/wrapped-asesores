let data, current = 0, advisor, averageSales;
const screens = document.querySelectorAll('.screen');
const music = document.getElementById('music'); 
const startButton = document.getElementById('startBtn');
const agentInput = document.getElementById('agentInput');
const navigationDots = document.getElementById('navigation-dots');
const shareButtons = document.getElementsByClassName('share-btn');

// Función auxiliar para encontrar el mejor mes por métrica
function findBestMonth(monthlyData) {
    let bestMonth = '';
    let maxScore = -1;
    const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

    for (const month of months) {
        // Puntuación: 3 puntos por Venta, 5 puntos por Escritura (Escritura tiene más peso)
        const score = (monthlyData[month].sales * 3) + (monthlyData[month].deeds * 5); 
        if (score > maxScore) {
            maxScore = score;
            bestMonth = month;
        }
    }
    return { name: bestMonth, score: maxScore };
}


// 1. CARGA DE DATOS, CÁLCULO DE PROMEDIOS Y HABILITACIÓN
fetch('./data.json')
  .then(r => r.json())
  .then(j => {
      data = j;
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

  // --- CÁLCULO DE MÉTRICAS CLAVE Y INSIGHTS ---
  const prospectConversion = (advisor.appointments / advisor.prospects) * 100;
  const saleConversion = (advisor.sales / advisor.appointments) * 100;
  const salesDifference = advisor.sales - averageSales;
  const bestMonthData = findBestMonth(advisor.monthlyData);
  const bestMonthStats = advisor.monthlyData[bestMonthData.name];
  
  // --- PANTALLA 2: INTRODUCCIÓN ---
  document.getElementById('welcome').textContent = advisor.name;
  document.getElementById('name').textContent = advisor.sales > 10 ? 'NIVEL MASTER' : 'BASE SÓLIDA';
  document.getElementById('introCopy').textContent =
    advisor.sales > 10
      ? 'Constancia pura. Esto no es suerte, es consistencia en acción.'
      : 'Todo gran cierre empieza con una intención firme. Listo para el próximo ciclo.';

  // --- PANTALLA 3: PROSPECTOS ---
  document.getElementById('prospects').textContent = advisor.prospects;
  document.getElementById('prospectsCopy').textContent =
    prospectConversion >= 50
      ? `Tuviste una conversión de ${prospectConversion.toFixed(0)}% de prospecto a cita. ¡Enfoque de cirujano!`
      : `Registraste ${advisor.prospects} prospectos. Menos ruido, más enfoque para el seguimiento este año.`;

  // --- PANTALLA 4: CITAS ---
  document.getElementById('appointments').textContent = advisor.appointments;
  document.getElementById('appointmentsCopy').textContent =
    saleConversion >= 30
      ? `Un impresionante ${saleConversion.toFixed(0)}% de tus citas se cerraron. ¡Eficacia pura!`
      : `Lograste ${advisor.appointments} citas. Cada una es un aprendizaje valioso. ¡A refinar el cierre!`;

  // --- PANTALLA 5: VENTAS ---
  document.getElementById('sales').textContent = advisor.sales;
  document.getElementById('salesCopy').textContent =
    advisor.sales > 8
      ? 'Conversión real. Nivel pro y resultados tangibles. ¡Sigue así!'
      : 'Base sólida para el próximo ciclo. Usa estos aprendizajes para romper tus metas.';
      
  // --- PANTALLA 6: ESCRITURAS REALIZADAS ---
  document.getElementById('deeds').textContent = advisor.totalDeeds;
  document.getElementById('deedsCopy').textContent =
    advisor.totalDeeds > 5
      ? `Tuviste ${advisor.totalDeeds} escrituras. ¡La meta se ve cerca, sigue monetizando ese esfuerzo!`
      : `Registraste ${advisor.totalDeeds} escrituras. El volumen es importante, pero la calidad se traduce en cierres.`;

  // --- PANTALLA 7: MEJOR MES (INSIGHT BASADO EN DATA MENSUAL) ---
  document.getElementById('bestMonth').textContent = bestMonthData.name.toUpperCase();
  document.getElementById('bestMonthCopy').textContent = 
      `En ${bestMonthData.name}, lograste ${bestMonthStats.sales} ventas y ${bestMonthStats.deeds} escrituras. ¡Tu mejor desempeño del año! Enfoca tu energía en replicar ese éxito.`;


  // --- PANTALLA 8: RESUMEN FINAL ---
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

    const dots = document.querySelectorAll('#navigation-dots .dot');
    dots.forEach((dot, index) => {
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
    const screenToCapture = screens[current]; 
    
    // Oculta temporalmente elementos que no deben ir en la captura
    navigationDots.style.display = 'none';
    document.getElementById('swipe-hint').style.display = 'none';
    document.getElementById('social-share').style.display = 'none'; 

    html2canvas(screenToCapture, {
        allowTaint: true,
        useCORS: true,
        scale: 2 
    }).then(function(canvas) {
        // Restaurar los elementos
        navigationDots.style.display = 'flex';
        document.getElementById('swipe-hint').style.display = 'block';
        document.getElementById('social-share').style.display = 'flex'; 

        // Crear enlace de descarga
        const link = document.createElement('a');
        link.download = `Wrapped_${advisor.name.replace(/\s/g, '_')}_${advisor.id}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        alert('¡Recuerdo guardado con éxito! Ahora puedes compartirlo.');
    });
};

// 6. LÓGICA DE COMPARTIR EN REDES SOCIALES
Array.from(shareButtons).forEach(button => {
    button.onclick = () => {
        const platform = button.getAttribute('data-platform');
        // Texto dinámico para compartir
        const shareText = `¡Mira mi #Wrapped de Asesor de Ventas! Logré ${advisor.sales} ventas y ${advisor.totalDeeds} escrituras este año. ¡Vamos por más! 🚀 #Ventas #Éxito #MiWrapped`;
        const encodedText = encodeURIComponent(shareText);
        
        // La URL de tu app en Netlify
        const appLink = encodeURIComponent(window.location.href);

        let url = '';

        if (platform === 'whatsapp') {
            url = `https://wa.me/?text=${encodedText}%20${appLink}`;
        } else if (platform === 'twitter') {
            url = `https://twitter.com/intent/tweet?text=${encodedText}&url=${appLink}`;
        }
        
        if (url) {
            window.open(url, '_blank');
        }
    };
});
