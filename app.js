let data = [], current = 0, currentUser = null, storyTimer = null;
const moneyF = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });

fetch('./data.json').then(r => r.json()).then(d => {
    data = d.sort((a, b) => (b.monto_escrituras || 0) - (a.monto_escrituras || 0));
}).catch(e => console.error("Error al cargar JSON", e));

document.getElementById('startBtn').onclick = () => {
    const val = document.getElementById('agentInput').value.trim().toLowerCase();
    currentUser = data.find(u => u.id.toLowerCase() === val || u.name.toLowerCase().includes(val));
    if (!currentUser) return alert("Usuario no encontrado.");
    document.getElementById('music').play().catch(() => {});
    initExperience();
};

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
    const isCoord = (u.role.toLowerCase() === 'coordinador');
    const rankPos = data.findIndex(x => x.id === u.id) + 1;
    const eficiencia = u.visits > 0 ? Math.round((u.sales / u.visits) * 100) + "%" : "0%";
    
    // Foto y Nombre
    document.querySelectorAll('.u-photo').forEach(img => img.src = `${u.name}.jpg`);
    document.querySelectorAll('.u-name-display').forEach(el => el.textContent = u.name);

    // Ajuste de Labels (Coordinador vs Asesor)
    document.getElementById('role-label-intro').textContent = isCoord ? "LÍDER," : "HOLA,";
    document.getElementById('p-intro-txt').textContent = isCoord ? "Guiaste a tu equipo hacia la cima este 2025." : "Fuiste pieza clave de Sadasi este año.";
    
    document.getElementById('l-p2').textContent = isCoord ? "FUERZA DE EQUIPO" : "EL ALCANCE";
    document.getElementById('l-p2-sub').textContent = isCoord ? "PROSPECTOS EQUIPO" : "PROSPECTOS";
    document.getElementById('u-prospects').textContent = u.prospects;
    document.getElementById('p-prospects-txt').textContent = isCoord ? "Tu equipo no dejó de recibir interesados." : "¡Mucho contacto, pero tú buscabas el sí!";

    document.getElementById('l-p3').textContent = isCoord ? "GESTIÓN DE EQUIPO" : "EL TERRENO";
    document.getElementById('l-p3-sub').textContent = isCoord ? "VISITAS TOTALES" : "VISITAS REALIZADAS";
    document.getElementById('u-visits').textContent = u.visits;

    document.getElementById('p-cancels-txt').textContent = u.cancelaciones === 0 ? "¡Imbatible! Mantuvieron la cartera intacta." : "De los errores se aprende para cerrar mejor.";
    document.getElementById('u-cancels').textContent = u.cancelaciones;

    document.getElementById('u-mejorMes').textContent = (u.mejorMes || "Exitoso").toUpperCase();
    document.getElementById('p-mes-txt').textContent = isCoord ? "Tu equipo brilló más que nunca." : "Fue tu mes de mayor productividad.";

    document.getElementById('u-sales').textContent = u.sales;
    document.getElementById('p-sales-txt').textContent = isCoord ? "Cierres consolidados bajo tu liderazgo." : "Ventas que transformaron vidas.";

    document.getElementById('u-deeds').textContent = u.deeds;
    document.getElementById('u-monto-deeds').textContent = moneyF.format(u.monto_escrituras);

    document.getElementById('l-p8').textContent = isCoord ? "ASESOR ESTRELLA" : "TU ESPECIALIDAD";
    document.getElementById('u-topModel').textContent = isCoord ? (u.asesorEstrella || "Tu Equipo") : u.topModel;
    document.getElementById('p-model-txt').textContent = isCoord ? "El motor que impulsó tus resultados." : "Nadie domina este modelo como tú.";

    // Resumen Final e Imagen
    const status = isCoord ? "LÍDER ESTRATÉGICO 2025" : (u.deeds >= 12 ? "TOP 2% ASESOR LEYENDA ⭐" : "ASESOR ALTO IMPACTO");
    document.getElementById('f-status-tag').textContent = status;
    document.getElementById('f-val1').textContent = u.sales;
    document.getElementById('f-val2').textContent = u.deeds;
    document.getElementById('f-val-rank').textContent = "#" + rankPos;
    document.getElementById('f-val-eff').textContent = isCoord ? "ALTA" : eficiencia;
    document.getElementById('f-dev-label').textContent = `${u.role.toUpperCase()} | ${u.desarrollo.toUpperCase()}`;

    // Frase picante Ranking
    const rankMsg = document.getElementById('p-rank-msg');
    if(rankPos <= 3) rankMsg.textContent = "¡Cuidado! Hay un fuera de serie suelto aquí. 🔥";
    else if(rankPos <= 10) rankMsg.textContent = "¡Estás en la élite del desarrollo! 🚀";
    else rankMsg.textContent = "¡Vas por el Top 10 en 2026! 💪";

    // Textos de etiquetas en la tabla del resumen
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
    if (index === 8) confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
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
    this.innerText = "CAPTURA LISTA...";
    html2canvas(document.getElementById('capture-area'), { backgroundColor: "#000", scale: 2 }).then(canvas => {
        const link = document.createElement('a');
        link.download = `Wrapped2025_${currentUser.name}.png`;
        link.href = canvas.toDataURL();
        link.click();
        this.innerText = "GUARDAR MI HISTORIA";
    });
};
