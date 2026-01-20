const data = [
  { "name": "PAOLA ENRIQUEZ RODRIGUEZ", "foto": "Paola Enriquez.jpg", "mejor_mes": "JUNIO", "mejor_mes_ventas": 8, "leads": 242, "citas": 67, "visitas": 56, "v_digital": 28, "v_brutas": 67, "cancelaciones": 5, "v_netas": 62, "escrituras_qty": 56, "monto": "$70.8M" },
  { "name": "ISAAC AGUILAR GUTIERREZ", "foto": "Isaac Aguilar.jpg", "mejor_mes": "FEBRERO", "mejor_mes_ventas": 10, "leads": 218, "citas": 73, "visitas": 59, "v_digital": 25, "v_brutas": 73, "cancelaciones": 11, "v_netas": 62, "escrituras_qty": 59, "monto": "$70.8M" },
  { "name": "JOSE FABIAN SOLIS MENDOZA", "foto": "Fabian Solis.jpg", "mejor_mes": "JULIO", "mejor_mes_ventas": 9, "leads": 140, "citas": 60, "visitas": 52, "v_digital": 19, "v_brutas": 58, "cancelaciones": 6, "v_netas": 60, "escrituras_qty": 52, "monto": "$67.2M" },
  { "name": "LAURA GRACIELA MENDOZA HERNANDEZ", "foto": "Laura Mendoza.jpg", "mejor_mes": "ENERO", "mejor_mes_ventas": 9, "leads": 189, "citas": 69, "visitas": 48, "v_digital": 22, "v_brutas": 69, "cancelaciones": 9, "v_netas": 52, "escrituras_qty": 48, "monto": "$59.8M" },
  { "name": "MARIA FERNANDA ALVAREZ CASTELLANOS", "foto": "Maria Fernanda Alvarez.jpg", "mejor_mes": "NOVIEMBRE", "mejor_mes_ventas": 8, "leads": 156, "citas": 56, "visitas": 46, "v_digital": 18, "v_brutas": 56, "cancelaciones": 6, "v_netas": 50, "escrituras_qty": 46, "monto": "$57.2M" },
  { "name": "LILIANA FRANCO REYES", "foto": "Liliana Franco.jpg", "mejor_mes": "ENERO", "mejor_mes_ventas": 11, "leads": 112, "citas": 51, "visitas": 38, "v_digital": 14, "v_brutas": 51, "cancelaciones": 9, "v_netas": 42, "escrituras_qty": 38, "monto": "$46.1M" },
  { "name": "JUAN ENRIQUE LOPEZ ORDUÑA", "foto": "Enrique Orduña.jpg", "mejor_mes": "JUNIO", "mejor_mes_ventas": 7, "leads": 98, "citas": 44, "visitas": 39, "v_digital": 12, "v_brutas": 44, "cancelaciones": 6, "v_netas": 38, "escrituras_qty": 39, "monto": "$47.2M" },
  { "name": "ADRIANA ESTRELLA CHAVEZ", "foto": "Adriana Estrella.jpg", "mejor_mes": "NOVIEMBRE", "mejor_mes_ventas": 7, "leads": 87, "citas": 46, "visitas": 40, "v_digital": 11, "v_brutas": 46, "cancelaciones": 9, "v_netas": 37, "escrituras_qty": 40, "monto": "$48.6M" },
  { "name": "MARISOL GARCIA CELIS", "foto": "Marisol Garcia Celis.jpg", "mejor_mes": "ENERO", "mejor_mes_ventas": 5, "leads": 104, "citas": 40, "visitas": 30, "v_digital": 13, "v_brutas": 40, "cancelaciones": 5, "v_netas": 35, "escrituras_qty": 30, "monto": "$38.0M" },
  { "name": "MA DE LOS ANGELES ZUÑIGA JIMENEZ", "foto": "Angeles Zuñiga.jpg", "mejor_mes": "MAYO", "mejor_mes_ventas": 6, "leads": 92, "citas": 40, "visitas": 30, "v_digital": 10, "v_brutas": 40, "cancelaciones": 6, "v_netas": 34, "escrituras_qty": 30, "monto": "$36.2M" },
  { "name": "MARIA ANASTACIA CRISTINA CRUZ CERVANTES", "foto": "Cristina Cruz.jpg", "mejor_mes": "FEBRERO", "mejor_mes_ventas": 5, "leads": 76, "citas": 35, "visitas": 28, "v_digital": 9, "v_brutas": 35, "cancelaciones": 4, "v_netas": 31, "escrituras_qty": 28, "monto": "$34.7M" },
  { "name": "CESAR EDUARDO ARREOLA YAÑEZ", "foto": "César Arreola.jpg", "mejor_mes": "OCTUBRE", "mejor_mes_ventas": 5, "leads": 65, "citas": 39, "visitas": 22, "v_digital": 8, "v_brutas": 39, "cancelaciones": 15, "v_netas": 24, "escrituras_qty": 22, "monto": "$28.4M" },
  { "name": "CLAUDIA CAMPA CAUDILLO", "foto": "Claudia Campia.jpg", "mejor_mes": "JUNIO", "mejor_mes_ventas": 4, "leads": 58, "citas": 26, "visitas": 18, "v_digital": 7, "v_brutas": 26, "cancelaciones": 2, "v_netas": 24, "escrituras_qty": 18, "monto": "$23.0M" },
  { "name": "LUIS GUTIERREZ GERBACIO", "foto": "Luis Gutierrez.jpg", "mejor_mes": "NOVIEMBRE", "mejor_mes_ventas": 5, "leads": 45, "citas": 27, "visitas": 19, "v_digital": 6, "v_brutas": 27, "cancelaciones": 5, "v_netas": 22, "escrituras_qty": 19, "monto": "$24.2M" },
  { "name": "JUAN DANIEL CISNEROS RAMOS", "foto": "Daniel Cisneros.jpg", "mejor_mes": "NOVIEMBRE", "mejor_mes_ventas": 4, "leads": 32, "citas": 10, "visitas": 9, "v_digital": 4, "v_brutas": 10, "cancelaciones": 0, "v_netas": 10, "escrituras_qty": 9, "monto": "$11.2M" },
  { "name": "HILDA VERONICA ALVAREZ MEDINA", "foto": "Hilda Veronica.jpg", "mejor_mes": "JULIO", "mejor_mes_ventas": 1, "leads": 12, "citas": 2, "visitas": 0, "v_digital": 1, "v_brutas": 2, "cancelaciones": 0, "v_netas": 2, "escrituras_qty": 0, "monto": "$2.4M" }
];

let current = 0, currentUser = null, storyTimer = null;

document.getElementById('startBtn').onclick = () => {
    const val = document.getElementById('agentInput').value.trim().toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const user = data.find(u => u.name.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(val));
    if (!user) return alert("Asesor no encontrado.");
    currentUser = user;
    initExperience();
};

function renderValues(u) {
    let medalla = "";
    if (u.v_netas >= 60) medalla = "👑 MASTER ELITE";
    else if (u.v_netas >= 45) medalla = "⭐ DIAMANTE";
    else if (u.v_netas >= 30) medalla = "🔥 SENIOR";
    document.getElementById('rank-container').innerHTML = medalla ? `<div class="rank-badge">${medalla}</div>` : "";

    // CAMBIO CLAVE: Se eliminó 'img/asesores/' porque tus fotos están sueltas en el repo
    document.querySelectorAll('.u-photo').forEach(img => {
        img.src = u.foto; 
        img.onerror = () => { img.src = `https://ui-avatars.com/api/?name=${u.name}&background=FF8200&color=fff`; };
    });

    document.querySelectorAll('.u-name-display').forEach(el => el.textContent = u.name);
    document.getElementById('u-mejor-mes-nombre').textContent = u.mejor_mes;
    document.getElementById('u-mejor-mes-qty').textContent = u.mejor_mes_ventas;
    document.getElementById('u-leads').textContent = u.leads;
    document.getElementById('u-citas').textContent = u.citas;
    document.getElementById('u-visitas').textContent = u.visitas;
    document.getElementById('u-vnetas').textContent = u.v_netas;
    document.getElementById('u-vdigital').textContent = u.v_digital;
    document.getElementById('u-vbrutas').textContent = u.v_brutas;
    document.getElementById('u-cancels').textContent = u.cancelaciones;
    
    // INYECCIÓN DEL MONTO
    document.getElementById('f-monto').textContent = u.monto;
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
    if ([1, 3, 4].includes(index)) confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
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

document.getElementById('btnNext').onclick = () => { if (current < 4) showStory(current + 1); };
document.getElementById('btnPrev').onclick = () => { if (current > 0) showStory(current - 1); };

document.getElementById('exportBtn').onclick = function() {
    html2canvas(document.getElementById('final-card'), { backgroundColor: '#000', scale: 3 }).then(canvas => {
        const link = document.createElement('a');
        link.download = `Wrapped_${currentUser.name}.png`;
        link.href = canvas.toDataURL();
        link.click();
    });
};
