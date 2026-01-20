/**
 * BASE DE DATOS INTEGRADA (DATA)
 * Basada en tabla de ventas y nombres de archivos de imagen
 */
const data = [
  { "name": "PAOLA ENRIQUEZ RODRIGUEZ", "foto": "Paola Enriquez.jpg", "mejor_mes": "JUNIO", "mejor_mes_ventas": 8, "leads": 242, "citas": 67, "visitas": 56, "v_digital": 28, "v_brutas": 67, "cancelaciones": 5, "v_netas": 62, "escrituras_qty": 56 },
  { "name": "ISAAC AGUILAR GUTIERREZ", "foto": "Isaac Aguilar.jpg", "mejor_mes": "FEBRERO", "mejor_mes_ventas": 10, "leads": 218, "citas": 73, "visitas": 59, "v_digital": 25, "v_brutas": 73, "cancelaciones": 11, "v_netas": 62, "escrituras_qty": 59 },
  { "name": "JOSE FABIAN SOLIS MENDOZA", "foto": "Fabian Solis.jpg", "mejor_mes": "FEBRERO", "mejor_mes_ventas": 9, "leads": 140, "citas": 60, "visitas": 52, "v_digital": 19, "v_brutas": 58, "cancelaciones": 6, "v_netas": 60, "escrituras_qty": 52 },
  { "name": "LAURA GRACIELA MENDOZA HERNANDEZ", "foto": "Laura Mendoza.jpg", "mejor_mes": "ENERO", "mejor_mes_ventas": 9, "leads": 189, "citas": 69, "visitas": 48, "v_digital": 22, "v_brutas": 69, "cancelaciones": 9, "v_netas": 52, "escrituras_qty": 48 },
  { "name": "MARIA FERNANDA ALVAREZ CASTELLANOS", "foto": "Maria Fernanda Alvarez.jpg", "mejor_mes": "MAYO", "mejor_mes_ventas": 8, "leads": 156, "citas": 56, "visitas": 46, "v_digital": 18, "v_brutas": 56, "cancelaciones": 6, "v_netas": 50, "escrituras_qty": 46 },
  { "name": "LILIANA FRANCO REYES", "foto": "Liliana Franco.jpg", "mejor_mes": "ENERO", "mejor_mes_ventas": 11, "leads": 112, "citas": 51, "visitas": 38, "v_digital": 14, "v_brutas": 51, "cancelaciones": 9, "v_netas": 42, "escrituras_qty": 38 },
  { "name": "JUAN ENRIQUE LOPEZ ORDUÑA", "foto": "Enrique Orduña.jpg", "mejor_mes": "JUNIO", "mejor_mes_ventas": 7, "leads": 98, "citas": 44, "visitas": 39, "v_digital": 12, "v_brutas": 44, "cancelaciones": 6, "v_netas": 38, "escrituras_qty": 39 },
  { "name": "ADRIANA ESTRELLA CHAVEZ", "foto": "Adriana Estrella.jpg", "mejor_mes": "NOVIEMBRE", "mejor_mes_ventas": 7, "leads": 87, "citas": 46, "visitas": 40, "v_digital": 11, "v_brutas": 46, "cancelaciones": 9, "v_netas": 37, "escrituras_qty": 40 },
  { "name": "MARISOL GARCIA CELIS", "foto": "Marisol Garcia Celis.jpg", "mejor_mes": "AGOSTO", "mejor_mes_ventas": 5, "leads": 104, "citas": 40, "visitas": 30, "v_digital": 13, "v_brutas": 40, "cancelaciones": 5, "v_netas": 35, "escrituras_qty": 30 },
  { "name": "MA DE LOS ANGELES ZUÑIGA JIMENEZ", "foto": "Angeles Zuñiga.jpg", "mejor_mes": "MAYO", "mejor_mes_ventas": 6, "leads": 92, "citas": 40, "visitas": 30, "v_digital": 10, "v_brutas": 40, "cancelaciones": 6, "v_netas": 34, "escrituras_qty": 30 },
  { "name": "MARIA ANASTACIA CRISTINA CRUZ CERVANTES", "foto": "Cristina Cruz.jpg", "mejor_mes": "FEBRERO", "mejor_mes_ventas": 5, "leads": 76, "citas": 35, "visitas": 28, "v_digital": 9, "v_brutas": 35, "cancelaciones": 4, "v_netas": 31, "escrituras_qty": 28 },
  { "name": "CESAR EDUARDO ARREOLA YAÑEZ", "foto": "César Arreola.jpg", "mejor_mes": "ENERO", "mejor_mes_ventas": 5, "leads": 65, "citas": 39, "visitas": 22, "v_digital": 8, "v_brutas": 39, "cancelaciones": 15, "v_netas": 24, "escrituras_qty": 22 },
  { "name": "CLAUDIA CAMPIA CAUDILLO", "foto": "Claudia Campia.jpg", "mejor_mes": "JUNIO", "mejor_mes_ventas": 4, "leads": 58, "citas": 26, "visitas": 18, "v_digital": 7, "v_brutas": 26, "cancelaciones": 2, "v_netas": 24, "escrituras_qty": 18 },
  { "name": "LUIS GUTIERREZ GERBACIO", "foto": "Luis Gutierrez.jpg", "mejor_mes": "NOVIEMBRE", "mejor_mes_ventas": 5, "leads": 45, "citas": 27, "visitas": 19, "v_digital": 6, "v_brutas": 27, "cancelaciones": 5, "v_netas": 22, "escrituras_qty": 19 },
  { "name": "JUAN DANIEL CISNEROS RAMOS", "foto": "Daniel Cisneros.jpg", "mejor_mes": "NOVIEMBRE", "mejor_mes_ventas": 4, "leads": 32, "citas": 10, "visitas": 9, "v_digital": 4, "v_brutas": 10, "cancelaciones": 0, "v_netas": 10, "escrituras_qty": 9 },
  { "name": "HILDA VERONICA ALVAREZ MEDINA", "foto": "Hilda Veronica.jpg", "mejor_mes": "JULIO", "mejor_mes_ventas": 1, "leads": 12, "citas": 2, "visitas": 0, "v_digital": 1, "v_brutas": 2, "cancelaciones": 0, "v_netas": 2, "escrituras_qty": 0 }
];

/**
 * LÓGICA DE LA APLICACIÓN
 */
let current = 0, currentUser = null, storyTimer = null;

const frases = {
    leads: ["¡Tu imán de clientes estuvo a tope!", "Prospectos por todos lados.", "Dominaste el mundo digital."],
    ventas: ["¡Colmillo de oro para el cierre!", "Ni las cancelaciones te frenaron.", "Vendedor estrella de Sendas."],
    mejorMes: ["¡Fue tu momento de gloria!", "Ese mes no hubo quien te detuviera.", "Simplemente imparable."],
    topTier: ["¡Nivel DIOS de ventas activado! 👑", "Estás en la cima absoluta de Sendas.", "Leyenda viviente de Sadasi."]
};

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Inicio de sesión
document.getElementById('startBtn').onclick = () => {
    const inputVal = document.getElementById('agentInput').value.trim().toUpperCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Quita acentos
    
    if (!inputVal) return alert("Escribe tu nombre");

    const user = data.find(u => {
        const n = u.name.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return n.includes(inputVal);
    });

    if (!user) return alert("Asesor no encontrado. Prueba con un solo nombre.");
    
    currentUser = user;
    initExperience();
};

function renderValues(u) {
    // Medallas por desempeño
    let medalla = "";
    if (u.v_netas >= 60) medalla = "👑 MASTER ELITE";
    else if (u.v_netas >= 45) medalla = "⭐ DIAMANTE";
    else if (u.v_netas >= 30) medalla = "🔥 SENIOR";
    document.getElementById('rank-container').innerHTML = medalla ? `<div class="rank-badge">${medalla}</div>` : "";

    // Foto del asesor
    document.querySelectorAll('.u-photo').forEach(img => {
        img.src = `img/asesores/${u.foto}`;
        img.onerror = () => { // Si no existe el archivo físico, usa avatar de respaldo
            img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}&background=FF8200&color=fff&size=512`; 
        };
    });

    // Inyección de textos
    document.querySelectorAll('.u-name-display').forEach(el => el.textContent = u.name);
    document.getElementById('u-mejor-mes-nombre').textContent = u.mejor_mes;
    document.getElementById('u-mejor-mes-qty').textContent = u.mejor_mes_ventas;
    document.getElementById('p-mejor-mes-txt').textContent = getRandom(frases.mejorMes);

    document.getElementById('u-leads').textContent = u.leads;
    document.getElementById('u-citas').textContent = u.citas;
    document.getElementById('u-visitas').textContent = u.visitas;
    document.getElementById('p-leads-txt').textContent = getRandom(frases.leads);

    document.getElementById('u-vbrutas').textContent = u.v_brutas;
    document.getElementById('u-cancels').textContent = u.cancelaciones;
    document.getElementById('u-vnetas').textContent = u.v_netas;
    document.getElementById('u-vdigital').textContent = u.v_digital;
    document.getElementById('p-vnetas-txt').textContent = u.v_netas >= 60 ? getRandom(frases.topTier) : getRandom(frases.ventas);

    document.getElementById('f-vnetas').textContent = u.v_netas;
    document.getElementById('f-eqty').textContent = u.escrituras_qty;
    document.getElementById('f-leads').textContent = u.leads;
}

function showStory(index) {
    const stories = document.querySelectorAll('.story');
    const bars = document.querySelectorAll('.progress-bar');
    if (index >= stories.length) return;

    stories.forEach(s => s.classList.remove('active'));
    stories[index].classList.add('active');
    
    bars.forEach((bar, i) => {
        bar.classList.remove('active', 'completed');
        if (i < index) bar.classList.add('completed');
        if (i === index) bar.classList.add('active');
    });

    current = index;
    // Explosión de confetti en slides clave
    if ([1, 3, 4].includes(index)) {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors:['#FF8200', '#FF007A', '#FFD700'] });
    }
    
    clearInterval(storyTimer);
    storyTimer = setInterval(() => { if (current < stories.length - 1) showStory(current + 1); }, 5500);
}

function initExperience() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('progressRoot').style.display = 'flex';
    document.getElementById('tapZones').style.display = 'flex';
    const root = document.getElementById('progressRoot');
    root.innerHTML = '';
    document.querySelectorAll('.story').forEach(() => {
        root.innerHTML += '<div class="progress-bar"><div class="progress-fill"></div></div>';
    });
    renderValues(currentUser);
    document.getElementById('music').play().catch(() => {});
    showStory(0);
}

// Navegación
document.getElementById('btnNext').onclick = () => { if (current < 4) showStory(current + 1); };
document.getElementById('btnPrev').onclick = () => { if (current > 0) showStory(current - 1); };

// Exportar Imagen
document.getElementById('exportBtn').onclick = function() {
    html2canvas(document.getElementById('final-card'), { backgroundColor: '#000', scale: 3 }).then(canvas => {
        const link = document.createElement('a');
        link.download = `Wrapped_${currentUser.name}.png`;
        link.href = canvas.toDataURL();
        link.click();
    });
};
