let data = [], current = 0, currentUser = null, storyTimer = null;
const moneyF = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });

// 1. CARGA DE DATOS
fetch('./data.json').then(r => r.json()).then(d => { data = d; });

// 2. LÓGICA DE INICIO
document.getElementById('startBtn').onclick = () => {
    const val = document.getElementById('agentInput').value.trim().toLowerCase();
    const user = data.find(u => u.name.toLowerCase().includes(val));
    
    if (!user) return alert("Nombre no encontrado.");
    
    // Si es coordinador, el sistema extrae la data automática del equipo
    currentUser = user.role.toLowerCase() === 'coordinador' ? processCoordinator(user) : { ...user, isBoss: false };
    
    document.getElementById('music').play().catch(() => {});
    initExperience();
};

// 3. PROCESAMIENTO DETALLADO DE COORDINADORES
function processCoordinator(coord) {
    const team = data.filter(u => u.desarrollo === coord.desarrollo && u.role === 'asesor');
    
    return {
        ...coord,
        isBoss: true,
        // SUMATORIAS AUTOMÁTICAS
        prospects: team.reduce((s, a) => s + (a.prospects || 0), 0),
        visits: team.reduce((s, a) => s + (a.visits || 0), 0),
        citas: team.reduce((s, a) => s + (a.citas || 0), 0),
        // DATA DE EQUIPO (CAMPOS DEL JSON)
        sales: coord.equipoSales,
        monto_escrituras: coord.equipoMonto,
        cancelaciones: coord.equipoCancelaciones,
        topModel: coord.modeloEstrella,
        asesorEstrella: coord.asesorEstrella,
        eficiencia: coord.eficienciaEquipo,
        totalTeam: team.length
    };
}

// 4. RENDERIZADO CON FRASES CON JIRIBILLA
function renderValues(u) {
    document.querySelectorAll('.u-photo').forEach(img => img.src = `${u.name}.jpg`);
    document.querySelectorAll('.u-name-display').forEach(el => el.textContent = u.name);

    // --- PANTALLA: INTRO ---
    document.getElementById('role-label-intro').textContent = u.isBoss ? "LA JEFA / EL JEFE," : "HOLA,";
    document.getElementById('p-intro-txt').textContent = u.isBoss 
        ? `Llevar las riendas de ${u.desarrollo} no es para cualquiera. Aquí tu 2025.` 
        : `Un año de perseguir cierres y no soltar ni un solo prospecto.`;

    // --- PANTALLA: PROSPECTOS ---
    document.getElementById('l-p2-sub').textContent = u.isBoss ? "LEADS GENERADOS" : "PROSPECTOS";
    document.getElementById('u-prospects').textContent = u.prospects;
    document.getElementById('p-prospects-txt').textContent = u.isBoss
        ? `Tu equipo trajo a ${u.prospects} interesados. ¡Vaya forma de llenar el embudo!`
        : `De ${u.prospects} personas, lograste que pusieran el ojo en nosotros.`;

    // --- PANTALLA: VISITAS / MOVIMIENTO ---
    document.getElementById('u-visits').textContent = u.visits;
    document.getElementById('p-visits-txt').textContent = u.isBoss
        ? `Lograron ${u.visits} visitas. Tu equipo no dejó de mostrar casas ni un segundo.`
        : `Atendiste ${u.visits} visitas. El desgaste de suela valió la pena.`;

    // --- PANTALLA: CANCELACIONES (EL COLMILLO) ---
    document.getElementById('u-cancels').textContent = u.cancelaciones;
    document.getElementById('p-cancels-txt').textContent = u.isBoss
        ? `Solo ${u.cancelaciones} bajas en todo el equipo. Eso es tener el control del cierre.`
        : `¿Bajas? Solo gajes del oficio. Lo importante es cómo te levantaste de esas.`;

    // --- PANTALLA: VENTAS ---
    document.getElementById('u-sales').textContent = u.sales;
    document.getElementById('p-sales-txt').textContent = u.isBoss
        ? `¡${u.sales} ventas logradas! El marcador habla por sí solo: eres líder de ganadores.`
        : `Cerraste ${u.sales} ventas. Ese colmillo para el negocio está más afilado que nunca.`;

    // --- PANTALLA: ESCRITURAS ---
    document.getElementById('u-deeds').textContent = u.isBoss ? "MÁSTER" : u.deeds;
    document.getElementById('u-monto-deeds').textContent = moneyF.format(u.monto_escrituras);

    // --- PANTALLA: TOP (DINÁMICA COORDINADOR VS ASESOR) ---
    const topLabel = document.getElementById('l-p8');
    const topVal = document.getElementById('u-topModel');
    const topTxt = document.getElementById('p-model-txt');

    if (u.isBoss) {
        topLabel.textContent = "TU PIEZA CLAVE";
        topVal.textContent = u.asesorEstrella;
        topTxt.textContent = `Quien más te ayudó a empujar el barco este año. ¡Vaya dupla!`;
    } else {
        topLabel.textContent = "TU FAVORITO";
        topVal.textContent = u.topModel;
        topTxt.textContent = `Nadie vende el ${u.topModel} con la maestría que tú lo haces.`;
    }

    // --- RESUMEN FINAL ---
    document.getElementById('f-status-tag').textContent = u.isBoss ? "LIDERAZGO NIVEL SADASI" : "ASESOR DE ALTO IMPACTO";
    document.getElementById('f-val1').textContent = u.sales;
    document.getElementById('f-val2').textContent = u.isBoss ? "TOP" : u.deeds;
    document.getElementById('f-val-rank').textContent = u.isBoss ? "LÍDER" : "#1";
    document.getElementById('f-val-eff').textContent = u.isBoss ? u.eficiencia : Math.round((u.sales/u.visits)*100) + "%";
    document.getElementById('f-dev-label').textContent = `${u.role.toUpperCase()} | ${u.desarrollo.toUpperCase()}`;
}

// 5. NAVEGACIÓN Y EXPORTACIÓN (FUNCIONES ESTÁNDAR)
function initProgressBars() {
    const root = document.getElementById('progressRoot');
    const count = document.querySelectorAll('.story').length;
    root.innerHTML = '';
    for (let i = 0; i < count; i++) root.innerHTML += '<div class="progress-bar"><div class="progress-fill"></div></div>';
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
    if (index === 8) confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    resetTimer();
}
function resetTimer() { clearInterval(storyTimer); storyTimer = setInterval(() => { if (current < 9) showStory(current + 1); }, 5000); }
document.getElementById('btnNext').onclick = () => { if (current < 9) showStory(current + 1); };
document.getElementById('btnPrev').onclick = () => { if (current > 0) showStory(current - 1); };
document.getElementById('exportBtn').onclick = function() {
    html2canvas(document.getElementById('capture-area'), { backgroundColor: "#000", scale: 2 }).then(canvas => {
        const link = document.createElement('a');
        link.download = `Wrapped2025_${currentUser.name}.png`;
        link.href = canvas.toDataURL();
        link.click();
    });
};
function initExperience() {
    document.body.setAttribute('data-dev', currentUser.desarrollo.toLowerCase());
    document.getElementById('brandLogo').src = (currentUser.desarrollo.toLowerCase() === 'sendas') ? 'logo-sadasi.png' : 'logo-altta.png';
    document.getElementById('progressRoot').style.display = 'flex';
    renderValues(currentUser);
    document.getElementById('login').classList.remove('active');
    document.getElementById('tapZones').style.display = 'flex';
    initProgressBars();
    showStory(0);
}
