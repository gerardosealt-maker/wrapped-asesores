const data = [
  { "name": "PAOLA ENRIQUEZ RODRIGUEZ", "foto": "Paola Enriquez.jpg", "mejor_mes": "JUNIO", "mejor_mes_ventas": 8, "leads": 282, "citas": 14, "visitas": 10, "v_digital": 6, "v_brutas": 67, "cancelaciones": 5, "v_netas": 62, "escrituras_qty": 56, "monto": "$70.8M" },
  { "name": "ISAAC AGUILAR GUTIERREZ", "foto": "Isaac Aguilar.jpg", "mejor_mes": "FEBRERO", "mejor_mes_ventas": 10, "leads": 255, "citas": 5, "visitas": 3, "v_digital": 3, "v_brutas": 73, "cancelaciones": 11, "v_netas": 62, "escrituras_qty": 59, "monto": "$70.8M" },
  { "name": "JOSE FABIAN SOLIS MENDOZA", "foto": "Fabian Solis.jpg", "mejor_mes": "JULIO", "mejor_mes_ventas": 9, "leads": 253, "citas": 8, "visitas": 4, "v_digital": 1, "v_brutas": 58, "cancelaciones": 6, "v_netas": 60, "escrituras_qty": 52, "monto": "$67.2M" },
  { "name": "LAURA GRACIELA MENDOZA HERNANDEZ", "foto": "Laura Mendoza.jpg", "mejor_mes": "ENERO", "mejor_mes_ventas": 9, "leads": 241, "citas": 10, "visitas": 3, "v_digital": 2, "v_brutas": 69, "cancelaciones": 9, "v_netas": 52, "escrituras_qty": 48, "monto": "$59.8M" },
  { "name": "MARIA FERNANDA ALVAREZ CASTELLANOS", "foto": "Maria Fernanda Alvarez.jpg", "mejor_mes": "NOVIEMBRE", "mejor_mes_ventas": 8, "leads": 123, "citas": 3, "visitas": 1, "v_digital": 1, "v_brutas": 56, "cancelaciones": 6, "v_netas": 50, "escrituras_qty": 46, "monto": "$57.2M" },
  { "name": "LILIANA FRANCO REYES", "foto": "Liliana Franco.jpg", "mejor_mes": "ENERO", "mejor_mes_ventas": 11, "leads": 270, "citas": 13, "visitas": 6, "v_digital": 3, "v_brutas": 51, "cancelaciones": 9, "v_netas": 42, "escrituras_qty": 38, "monto": "$46.1M" },
  { "name": "JUAN ENRIQUE LOPEZ ORDUÑA", "foto": "Enrique Orduña.jpg", "mejor_mes": "JUNIO", "mejor_mes_ventas": 7, "leads": 118, "citas": 10, "visitas": 3, "v_digital": 1, "v_brutas": 44, "cancelaciones": 6, "v_netas": 38, "escrituras_qty": 39, "monto": "$47.2M" },
  { "name": "ADRIANA ESTRELLA CHAVEZ", "foto": "Adriana Estrella.jpg", "mejor_mes": "NOVIEMBRE", "mejor_mes_ventas": 7, "leads": 176, "citas": 18, "visitas": 7, "v_digital": 1, "v_brutas": 46, "cancelaciones": 9, "v_netas": 37, "escrituras_qty": 40, "monto": "$48.6M" },
  { "name": "MARISOL GARCIA CELIS", "foto": "Marisol Garcia Celis.jpg", "mejor_mes": "ENERO", "mejor_mes_ventas": 5, "leads": 102, "citas": 1, "visitas": 1, "v_digital": 1, "v_brutas": 40, "cancelaciones": 5, "v_netas": 35, "escrituras_qty": 30, "monto": "$38.0M" },
  { "name": "MA DE LOS ANGELES ZUÑIGA JIMENEZ", "foto": "Angeles Zuñiga.jpg", "mejor_mes": "MAYO", "mejor_mes_ventas": 6, "leads": 308, "citas": 18, "visitas": 7, "v_digital": 5, "v_brutas": 40, "cancelaciones": 6, "v_netas": 34, "escrituras_qty": 30, "monto": "$36.2M" },
  { "name": "MARIA ANASTACIA CRISTINA CRUZ CERVANTES", "foto": "Cristina Cruz.jpg", "mejor_mes": "FEBRERO", "mejor_mes_ventas": 5, "leads": 223, "citas": 6, "visitas": 6, "v_digital": 6, "v_brutas": 35, "cancelaciones": 4, "v_netas": 31, "escrituras_qty": 28, "monto": "$34.7M" },
  { "name": "CESAR EDUARDO ARREOLA YAÑEZ", "foto": "César Arreola.jpg", "mejor_mes": "OCTUBRE", "mejor_mes_ventas": 5, "leads": 172, "citas": 23, "visitas": 13, "v_digital": 5, "v_brutas": 39, "cancelaciones": 15, "v_netas": 24, "escrituras_qty": 22, "monto": "$28.4M" },
  { "name": "CLAUDIA CAMPA CAUDILLO", "foto": "Claudia Campia.jpg", "mejor_mes": "JUNIO", "mejor_mes_ventas": 4, "leads": 254, "citas": 10, "visitas": 6, "v_digital": 4, "v_brutas": 26, "cancelaciones": 2, "v_netas": 24, "escrituras_qty": 18, "monto": "$23.0M" },
  { "name": "LUIS GUTIERREZ GERBACIO", "foto": "Luis Gutierrez.jpg", "mejor_mes": "NOVIEMBRE", "mejor_mes_ventas": 5, "leads": 300, "citas": 13, "visitas": 2, "v_digital": 1, "v_brutas": 27, "cancelaciones": 5, "v_netas": 22, "escrituras_qty": 19, "monto": "$24.2M" },
  { "name": "JUAN DANIEL CISNEROS RAMOS", "foto": "Daniel Cisneros.jpg", "mejor_mes": "NOVIEMBRE", "mejor_mes_ventas": 4, "leads": 73, "citas": 0, "visitas": 0, "v_digital": 0, "v_brutas": 10, "cancelaciones": 0, "v_netas": 10, "escrituras_qty": 9, "monto": "$11.2M" },
  { "name": "HILDA VERONICA ALVAREZ MEDINA", "foto": "Hilda Veronica.jpg", "mejor_mes": "JULIO", "mejor_mes_ventas": 1, "leads": 12, "citas": 2, "visitas": 0, "v_digital": 1, "v_brutas": 2, "cancelaciones": 0, "v_netas": 2, "escrituras_qty": 0, "monto": "$2.4M" }
];

// ... (Aquí mantén tus datos de 'data') ...

let current = 0;
let currentUser = null;
let storyTimer = null;

document.getElementById('startBtn').onclick = () => {
    const input = document.getElementById('agentInput').value.trim().toUpperCase();
    const user = data.find(u => u.name.toUpperCase().includes(input));
    
    if (!user) {
        alert("Asesor no encontrado");
        return;
    }
    
    currentUser = user;
    renderValues(user);
    document.getElementById('login').style.display = 'none';
    document.getElementById('progressRoot').style.display = 'flex';
    document.getElementById('tapZones').style.display = 'flex';
    document.getElementById('music').play().catch(e => console.log("Audio bloqueado"));
    showStory(0);
};

function showStory(index) {
    const stories = document.querySelectorAll('.story');
    if (index < 0 || index >= stories.length) return;

    // 1. Ocultar todas y mostrar solo la actual
    stories.forEach(s => s.classList.remove('active'));
    stories[index].classList.add('active');

    // 2. Actualizar Barras de Progreso
    const root = document.getElementById('progressRoot');
    root.innerHTML = '';
    stories.forEach((_, i) => {
        const bar = document.createElement('div');
        bar.className = 'progress-bar';
        const fill = document.createElement('div');
        fill.className = 'progress-fill';
        if (i < index) fill.style.width = '100%';
        if (i === index) setTimeout(() => fill.style.width = '100%', 50);
        bar.appendChild(fill);
        root.appendChild(bar);
    });

    current = index;
    
    // 3. Reiniciar Timer (5.5 segundos por slide)
    clearInterval(storyTimer);
    storyTimer = setInterval(() => {
        if (current < stories.length - 1) showStory(current + 1);
    }, 5500);

    // Confetti solo en slides de éxito
    if (index > 0) confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
}

// Navegación Manual
document.getElementById('btnNext').onclick = () => {
    const stories = document.querySelectorAll('.story');
    if (current < stories.length - 1) showStory(current + 1);
};

document.getElementById('btnPrev').onclick = () => {
    if (current > 0) showStory(current - 1);
};
