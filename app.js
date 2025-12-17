let data = [], current = 0, currentUser = null, storyTimer = null;
const moneyF = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });

fetch('./data.json').then(r => r.json()).then(d => {
    data = d;
}).catch(e => console.error("Error al cargar JSON", e));

document.getElementById('startBtn').onclick = () => {
    const val = document.getElementById('agentInput').value.trim().toLowerCase();
    const user = data.find(u => u.id.toLowerCase() === val || u.name.toLowerCase().includes(val));
    if (!user) return alert("Usuario no encontrado.");
    
    // Si el rol incluye "coordinador", sumamos la data de su equipo automáticamente
    if (user.role.toLowerCase().includes('coordinador')) {
        currentUser = calculateTeamData(user);
    } else {
        currentUser = user;
    }
    
    document.getElementById('music').play().catch(() => {});
    initExperience();
};

function calculateTeamData(coord) {
    // Busca a todos los asesores del mismo desarrollo que NO sean coordinadores
    const team = data.filter(u => u.desarrollo === coord.desarrollo && !u.role.toLowerCase().includes('coordinador'));
    const starAdvisor = [...team].sort((a,b) => b.monto_escrituras - a.monto_escrituras)[0];

    return {
        ...coord,
        prospects: team.reduce((sum, u) => sum + (u.prospects || 0), 0),
        visits: team.reduce((sum, u) => sum + (u.visits || 0), 0),
        cancelaciones: team.reduce((sum, u) => sum + (u.cancelaciones || 0), 0),
        sales: team.reduce((sum, u) => sum + (u.sales || 0), 0),
        deeds: team.reduce((sum, u) => sum + (u.deeds || 0), 0),
        monto_escrituras: team.reduce((sum, u) => sum + (u.monto_escrituras || 0), 0),
        asesorEstrella: starAdvisor ? starAdvisor.name : "Equipo Acento",
        totalTeam: team.length
    };
}

function initExperience() {
    document.body.setAttribute('data-dev', currentUser.desarrollo.toLowerCase());
    const logoFile = (currentUser.desarrollo.toLowerCase() === 'sendas') ? 'logo-sadasi.png' : 'logo-altta.png';
    document.getElementById('brandLogo').src = logoFile;
    document.getElementById('progressRoot').style.display = 'flex';
    renderValues(currentUser);
    document.getElementById('login').classList.remove('active');
    document.getElementById('tapZones').style.display = 'flex';
    initProgressBars();
    showStory(0);
}

function renderValues(u) {
    const isCoord = u.role.toLowerCase().includes('coordinador');
    
    // Ranking basado en monto (individual o equipo sumado)
    const sortedData = [...data].sort((a, b) => b.monto_escrituras - a.monto_escrituras);
    const rankPos = sortedData.findIndex(x => x.id === u.id) + 1;
    const eficiencia = u.visits > 0 ? Math.round((u.sales / u.visits) * 100) + "%" : "0%";

    document.querySelectorAll('.u-photo').forEach(img => img.src = `${u.name}.jpg`);
    document.querySelectorAll('.u-name-display').forEach(el => el.textContent = u.name);

    document.getElementById('role-label-intro').textContent = isCoord ? "LÍDER," : "HOLA,";
    document.getElementById('p-intro-txt').textContent = isCoord ? `Coordinaste el éxito de ${u.totalTeam} asesores.` : "Fuiste pieza clave de Sadasi este año.";
    
    document.getElementById('l-p2-sub').textContent = isCoord ? "PROSPECTOS EQUIPO" : "PROSPECTOS";
    document.getElementById('u-prospects').textContent = u.prospects;
    document.getElementById('p-prospects-txt').textContent = isCoord ? "Tu equipo mantuvo el embudo siempre lleno." : "Cada prospecto fue una oportunidad aprovechada.";

    document.getElementById('l-p3-sub').textContent = isCoord ? "VISITAS EQUIPO" : "VISITAS";
    document.getElementById('u-visits').textContent = u.visits;

    document.getElementById('u-cancels').textContent = u.cancelaciones;
    document.getElementById('p-cancels-txt').textContent = u.cancelaciones === 0 ? "¡Impecable! Nada se les escapó." : "Experiencia ganada para cerrar el 2026.";

    document.getElementById('u-mejorMes').textContent = (u.mejorMes || "DICIEMBRE").toUpperCase();
    document.getElementById('p-mes-txt').textContent = isCoord ? "El mes más fuerte de tu equipo." : "Fue tu mes de mayor productividad.";

    document.getElementById('u-sales').textContent = u.sales;
    document.getElementById('u-deeds').textContent = u.deeds;
    document.getElementById('u-monto-deeds').textContent = moneyF.format(u.monto_escrituras);

    document.getElementById('l-p8').textContent = isCoord ? "ASESOR ESTRELLA" : "TU ESPECIALIDAD";
    document.getElementById('u-topModel').textContent = isCoord ? u.asesorEstrella : (u.topModel || "Modelo Sadasi");
    document.getElementById('p-model-txt').textContent = isCoord ? "El motor de tus resultados grupales." : "Nadie domina este modelo como tú.";

    document.getElementById('f-status-tag').textContent = isCoord ? "COORDINADORA MÁSTER" : (u.deeds >= 12 ? "ASESOR LEYENDA ⭐" : "ASESOR ÉLITE");
    document.getElementById('f-val1').textContent = u.sales;
    document.getElementById('f-val2').textContent = u.deeds;
    document.getElementById('f-val-rank').textContent = "#" + rankPos;
    document.getElementById('f-val-eff').textContent = isCoord ? "PRO" : eficiencia;
    document.getElementById('f-dev-label').textContent = `${u.role.toUpperCase()} | ${u.desarrollo.toUpperCase()}`;

    const rankMsg = document.getElementById('p-rank-msg');
    if(rankPos <= 3) rankMsg.textContent = "¡Cuidado! Hay un fuera de serie suelto aquí. 🔥";
    else rankMsg.textContent = "¡Estás en la élite de Sadasi! 🚀";

    document.getElementById('f-l1').textContent = isCoord ? "Escrit. Equipo" : "Escrituras";
    document.getElementById('f-l2').textContent = isCoord ? "Ventas Equipo" : "Ventas";
}

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
    if (index === 9) confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    resetTimer();
}

function resetTimer() {
    clearInterval(storyTimer);
    const count = document.querySelectorAll('.story').length;
    storyTimer = setInterval(() => { if (current < count - 1) showStory(current + 1); }, 5000);
}

document.getElementById('btnNext').onclick = () => {
    const count = document.querySelectorAll('.story').length;
    if (current < count - 1) showStory(current + 1);
};
document.getElementById('btnPrev').onclick = () => { if (current > 0) showStory(current - 1); };

document.getElementById('exportBtn').onclick = function() {
    html2canvas(document.getElementById('capture-area'), { backgroundColor: "#000", scale: 2 }).then(canvas => {
        const link = document.createElement('a');
        link.download = `Wrapped2025_${currentUser.name}.png`;
        link.href = canvas.toDataURL();
        link.click();
    });
};
