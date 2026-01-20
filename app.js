const data = [
  { "name": "PAOLA ENRIQUEZ RODRIGUEZ", "foto": "PAOLA ENRIQUEZ.jpg", "mejor_mes": "MAYO", "mejor_mes_ventas": 12, "leads": 242, "citas": 67, "visitas": 56, "v_digital": 62, "v_brutas": 67, "cancelaciones": 5, "v_netas": 62, "escrituras_qty": 56, "escrituras_monto": 70.8 },
  { "name": "ISAAC AGUILAR GUTIERREZ", "foto": "ISAAC AGUILAR.jpg", "mejor_mes": "MARZO", "mejor_mes_ventas": 10, "leads": 218, "citas": 73, "visitas": 59, "v_digital": 62, "v_brutas": 73, "cancelaciones": 11, "v_netas": 62, "escrituras_qty": 59, "escrituras_monto": 70.8 },
  { "name": "JOSE FABIAN SOLIS MENDOZA", "foto": "FABIAN SOLIS.jpg", "mejor_mes": "OCTUBRE", "mejor_mes_ventas": 11, "leads": 140, "citas": 60, "visitas": 52, "v_digital": 48, "v_brutas": 58, "cancelaciones": 6, "v_netas": 52, "escrituras_qty": 52, "escrituras_monto": 67.2 },
  { "name": "LAURA GRACIELA MENDOZA HERNANDEZ", "foto": "LAURA MENDOZA.jpg", "mejor_mes": "JULIO", "mejor_mes_ventas": 9, "leads": 189, "citas": 69, "visitas": 48, "v_digital": 60, "v_brutas": 69, "cancelaciones": 9, "v_netas": 60, "escrituras_qty": 48, "escrituras_monto": 59.8 },
  { "name": "MARIA FERNANDA ALVAREZ CASTELLANOS", "foto": "MARIA FERNANDA ALVAREZ.jpg", "mejor_mes": "SEPTIEMBRE", "mejor_mes_ventas": 8, "leads": 156, "citas": 56, "visitas": 46, "v_digital": 50, "v_brutas": 56, "cancelaciones": 6, "v_netas": 50, "escrituras_qty": 46, "escrituras_monto": 57.2 },
  { "name": "LILIANA FRANCO REYES", "foto": "LILIANA FRANCO.jpg", "mejor_mes": "JUNIO", "mejor_mes_ventas": 7, "leads": 112, "citas": 51, "visitas": 38, "v_digital": 42, "v_brutas": 51, "cancelaciones": 9, "v_netas": 42, "escrituras_qty": 38, "escrituras_monto": 46.1 },
  { "name": "JUAN ENRIQUE LOPEZ ORDUÑA", "foto": "ENRIQUE ORDUÑA.jpg", "mejor_mes": "AGOSTO", "mejor_mes_ventas": 8, "leads": 98, "citas": 44, "visitas": 39, "v_digital": 38, "v_brutas": 44, "cancelaciones": 6, "v_netas": 38, "escrituras_qty": 39, "escrituras_monto": 47.2 },
  { "name": "ADRIANA ESTRELLA CHAVEZ", "foto": "ADRIANA ESTRELLA.jpg", "mejor_mes": "ABRIL", "mejor_mes_ventas": 7, "leads": 87, "citas": 46, "visitas": 40, "v_digital": 37, "v_brutas": 46, "cancelaciones": 9, "v_netas": 37, "escrituras_qty": 40, "escrituras_monto": 48.6 },
  { "name": "MARISOL GARCIA CELIS", "foto": "MARISOL GARCIA.jpg", "mejor_mes": "NOVIEMBRE", "mejor_mes_ventas": 6, "leads": 104, "citas": 40, "visitas": 30, "v_digital": 35, "v_brutas": 40, "cancelaciones": 5, "v_netas": 35, "escrituras_qty": 30, "escrituras_monto": 38.0 },
  { "name": "MA DE LOS ANGELES ZUÑIGA JIMENEZ", "foto": "ANGELES ZUÑIGA.jpg", "mejor_mes": "ENERO", "mejor_mes_ventas": 5, "leads": 92, "citas": 40, "visitas": 30, "v_digital": 34, "v_brutas": 40, "cancelaciones": 6, "v_netas": 34, "escrituras_qty": 30, "escrituras_monto": 36.2 },
  { "name": "MARIA ANASTACIA CRISTINA CRUZ CERVANTES", "foto": "CRISTINA CRUZ.jpg", "mejor_mes": "FEBRERO", "mejor_mes_ventas": 6, "leads": 76, "citas": 35, "visitas": 28, "v_digital": 31, "v_brutas": 35, "cancelaciones": 4, "v_netas": 31, "escrituras_qty": 28, "escrituras_monto": 34.7 },
  { "name": "CESAR EDUARDO ARREOLA YAÑEZ", "foto": "CESAR ARREOLA.jpg", "mejor_mes": "DICIEMBRE", "mejor_mes_ventas": 4, "leads": 65, "citas": 39, "visitas": 22, "v_digital": 24, "v_brutas": 39, "cancelaciones": 15, "v_netas": 24, "escrituras_qty": 22, "escrituras_monto": 28.4 },
  { "name": "LUIS GUTIERREZ GERBACIO", "foto": "LUIS GUTIERREZ.jpg", "mejor_mes": "JULIO", "mejor_mes_ventas": 4, "leads": 45, "citas": 27, "visitas": 19, "v_digital": 22, "v_brutas": 27, "cancelaciones": 5, "v_netas": 22, "escrituras_qty": 19, "escrituras_monto": 24.2 },
  { "name": "CLAUDIA CAMPIA CAUDILLO", "foto": "CLAUDIA CAMPIA.jpg", "mejor_mes": "MAYO", "mejor_mes_ventas": 5, "leads": 58, "citas": 26, "visitas": 18, "v_digital": 24, "v_brutas": 26, "cancelaciones": 2, "v_netas": 24, "escrituras_qty": 18, "escrituras_monto": 23.0 },
  { "name": "JUAN DANIEL CISNEROS RAMOS", "foto": "DANIEL CISNEROS.jpg", "mejor_mes": "OCTUBRE", "mejor_mes_ventas": 3, "leads": 32, "citas": 10, "visitas": 9, "v_digital": 10, "v_brutas": 10, "cancelaciones": 0, "v_netas": 10, "escrituras_qty": 9, "escrituras_monto": 11.2 },
  { "name": "HILDA VERONICA ALVAREZ MEDINA", "foto": "HILDA VERONICA ALVAREZ MEDINA.jpg", "mejor_mes": "DICIEMBRE", "mejor_mes_ventas": 1, "leads": 12, "citas": 2, "visitas": 0, "v_digital": 2, "v_brutas": 2, "cancelaciones": 0, "v_netas": 2, "escrituras_qty": 0, "escrituras_monto": 2.4 }
];

let current = 0, currentUser = null, storyTimer = null;

const frases = {
    leads: ["¡Tu imán de clientes estuvo a tope!", "Prospectos por todos lados.", "Dominaste el arte de convertir leads en sueños.", "Tu radar digital no descansó.", "Atrapaste prospectos como un pro."],
    ventas: ["¡Colmillo de oro para el cierre!", "Ni las cancelaciones te quitaron el ritmo.", "Talento puro para la negociación.", "Donde pones el ojo, pones la firma.", "Eres el terror de las metas mensuales."],
    mejorMes: ["¡Ese mes estabas en modo leyenda!", "Nadie pudo seguirte el paso esos 30 días.", "Simplemente imparable.", "Fue tu pico más alto de energía.", "Hiciste historia en la oficina."],
    topTier: ["¡Nivel DIOS de ventas activado! 👑", "Estás en la cima absoluta de Sendas.", "Leyenda viviente de Sadasi.", "Tu nombre ya está en el salón de la fama."]
};

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

// LOGICA DE BUSQUEDA
document.getElementById('startBtn').onclick = () => {
    const inputVal = document.getElementById('agentInput').value.trim().toUpperCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    if (!inputVal) return alert("Escribe tu nombre");

    const user = data.find(u => {
        const n = u.name.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return n.includes(inputVal);
    });

    if (!user) return alert("Asesor no encontrado. Prueba solo con tu apellido.");
    
    currentUser = user;
    initExperience();
};

function renderValues(u) {
    // Medallas
    let medalla = "";
    if (u.v_netas >= 60) medalla = "👑 MASTER ELITE";
    else if (u.v_netas >= 45) medalla = "⭐ DIAMANTE";
    else if (u.v_netas >= 30) medalla = "🔥 SENIOR";
    document.getElementById('rank-container').innerHTML = medalla ? `<div class="rank-badge">${medalla}</div>` : "";

    // Fotos
    document.querySelectorAll('.u-photo').forEach(img => {
        img.src = `img/asesores/${u.foto}`;
        img.onerror = () => { img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}&background=FF8200&color=fff&size=512`; };
    });

    // Inyección de Datos
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
    if ([1, 3, 4].includes(index)) {
        let c = currentUser.v_netas > 50 ? 250 : 120;
        confetti({ particleCount: c, spread: 70, origin: { y: 0.6 }, colors:['#FF8200', '#FF007A', '#FFD700'] });
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

document.getElementById('btnNext').onclick = () => { if (current < 4) showStory(current + 1); };
document.getElementById('btnPrev').onclick = () => { if (current > 0) showStory(current - 1); };

document.getElementById('exportBtn').onclick = function() {
    const card = document.getElementById('final-card');
    html2canvas(card, { backgroundColor: '#000', scale: 3 }).then(canvas => {
        const link = document.createElement('a');
        link.download = `Wrapped_2025_${currentUser.name}.png`;
        link.href = canvas.toDataURL();
        link.click();
    });
};
