let data = [], current = 0, currentUser = null, storyTimer = null;
const moneyF = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });

// 1. CARGA DE DATOS
fetch('./data.json')
    .then(r => r.json())
    .then(d => { data = d; })
    .catch(e => console.error("Error cargando JSON:", e));

// 2. LOGICA DE INICIO
document.getElementById('startBtn').onclick = () => {
    const val = document.getElementById('agentInput').value.trim().toLowerCase();
    const user = data.find(u => u.name.toLowerCase().includes(val) || u.id.toLowerCase() === val);
    
    if (!user) return alert("Nombre no encontrado. Intenta de nuevo.");
    
    // Procesar datos si es coordinador o asesor
    if (user.role.toLowerCase() === 'coordinador') {
        currentUser = processCoordinator(user);
    } else {
        currentUser = { ...user, isBoss: false };
    }
    
    document.getElementById('music').play().catch(() => {});
    initExperience();
};

// 3. PROCESAMIENTO AUTOMÁTICO PARA COORDINADORES
function processCoordinator(coord) {
    // Filtramos a los asesores que pertenecen a su equipo/desarrollo
    const team = data.filter(u => u.desarrollo === coord.desarrollo && u.role === 'asesor');
    
    return {
        ...coord,
        isBoss: true,
        // Sumamos automáticamente prospectos y visitas de la data de sus asesores
        prospects: team.reduce((s, a) => s + (a.prospects || 0), 0),
        visits: team.reduce((s, a) => s + (a.visits || 0), 0),
        // Usamos los campos específicos que proporcionaste para equipo
        sales: coord.equipoSales,
        monto_escrituras: coord.equipoMonto,
        cancelaciones: coord.equipoCancelaciones,
        topModel: coord.modeloEstrella,
        asesorEstrella: coord.asesorEstrella,
        eficiencia: coord.eficienciaEquipo,
        totalTeam: team.length
    };
}

// 4. INICIALIZAR INTERFAZ
function initExperience() {
    document.body.setAttribute('data-dev', currentUser.desarrollo.toLowerCase());
    
    // Logo según desarrollo
    const logoFile = (currentUser.desarrollo.toLowerCase() === 'sendas') ? 'logo-sadasi.png' : 'logo-altta.png';
    document.getElementById('brandLogo').src = logoFile;
    
    document.getElementById('progressRoot').style.display = 'flex';
    renderValues(currentUser);
    
    document.getElementById('login').classList.remove('active');
    document.getElementById('tapZones').style.display = 'flex';
    
    initProgressBars();
    showStory(0);
}

// 5. RENDERIZAR VALORES EN PANTALLAS
function renderValues(u) {
    // Fotos y Nombres
    document.querySelectorAll('.u-photo').forEach(img => img.src = `${u.name}.jpg`);
    document.querySelectorAll('.u-name-display').forEach(el => el.textContent = u.name);

    // Pantalla 1: Intro
    document.getElementById('role-label-intro').textContent = u.isBoss ? "LÍDER," : "HOLA,";
    document.getElementById('p-intro-txt').textContent = u.isBoss 
        ? `Diriges el éxito en ${u.desarrollo} con un equipo de ${u.totalTeam} expertos.` 
        : `Fuiste una pieza clave para el éxito de ${u.desarrollo} este año.`;

    // Pantalla 2: Prospectos
    document.getElementById('l-p2-sub').textContent = u.isBoss ? "PROSPECTOS EQUIPO" : "PROSPECTOS";
    document.getElementById('u-prospects').textContent = u.prospects;

    // Pantalla 3: Visitas
    document.getElementById('l-p3-sub').textContent = u.isBoss ? "VISITAS EQUIPO" : "VISITAS";
    document.getElementById('u-visits').textContent = u.visits;

    // Pantalla 4: Cancelaciones
    document.getElementById('u-cancels').textContent = u.cancelaciones;

    // Pantalla 5: Mejor Mes
    document.getElementById('u-mejorMes').textContent = (u.mejorMes || "Diciembre").toUpperCase();

    // Pantalla 6: Ventas
    document.getElementById('u-sales').textContent = u.sales;

    // Pantalla 7: Escrituras y Monto
    document.getElementById('u-deeds').textContent = u.isBoss ? "EQUIPO" : u.deeds;
    document.getElementById('u-monto-deeds').textContent = moneyF.format(u.monto_escrituras);

    // Pantalla 8: Top del Año (Dinámica)
    document.getElementById('l-p8').textContent = u.isBoss ? "ASESOR ESTRELLA" : "MODELO ESTRELLA";
    document.getElementById('u-topModel').textContent = u.isBoss ? u.asesorEstrella : u.topModel;

    // Pantalla 9: Resumen Final
    document.getElementById('f-status-tag').textContent = u.isBoss ? "COORDINADOR MÁSTER" : "ASESOR ÉLITE";
    document.getElementById('f-val1').textContent = u.sales;
    document.getElementById('f-val2').textContent = u.isBoss ? "TOP" : u.deeds;
    document.getElementById('f-val-rank').textContent = "#1"; // Aquí puedes meter lógica de ranking si gustas
    document.getElementById('f-val-eff').textContent = u.isBoss ? u.eficiencia : Math.round((u.sales/u.visits)*100) + "%";
    document.getElementById('f-dev-label').textContent = `${u.role.toUpperCase()} | ${u.desarrollo.toUpperCase()}`;
}

// 6. NAVEGACIÓN TIPO "STORIES"
function initProgressBars() {
    const root = document.getElementById('progressRoot');
    const count = document.querySelectorAll('.story').length;
    root.innerHTML = '';
    for (let i = 0; i < count; i++) {
        root.innerHTML += '<div class="progress-bar"><div class="progress-fill"></div></div>';
    }
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
    
    // Confetti en la pantalla final de métricas
    if (index === 8) {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }
    
    resetTimer();
}

function resetTimer() {
    clearInterval(storyTimer);
    const count = document.querySelectorAll('.story').length;
    storyTimer = setInterval(() => {
        if (current < count - 1) showStory(current + 1);
    }, 5000);
}

// Controles Manuales
document.getElementById('btnNext').onclick = () => {
    const count = document.querySelectorAll('.story').length;
    if (current < count - 1) showStory(current + 1);
};

document.getElementById('btnPrev').onclick = () => {
    if (current > 0) showStory(current - 1);
};

// 7. EXPORTAR IMAGEN
document.getElementById('exportBtn').onclick = function() {
    const area = document.getElementById('capture-area');
    html2canvas(area, { backgroundColor: "#000", scale: 2 }).then(canvas => {
        const link = document.createElement('a');
        link.download = `Wrapped2025_${currentUser.name}.png`;
        link.href = canvas.toDataURL();
        link.click();
    });
};
