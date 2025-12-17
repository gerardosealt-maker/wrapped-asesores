let data = [], current = 0, currentUser = null, storyTimer = null;
const moneyF = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });

fetch('./data.json').then(r => r.json()).then(d => data = d);

document.getElementById('startBtn').onclick = () => {
    const val = document.getElementById('agentInput').value.trim();
    currentUser = data.find(u => u.id === val || u.name.toLowerCase().includes(val.toLowerCase()));
    if (!currentUser) return alert("ID no encontrado");

    document.getElementById('music').play().catch(() => {});
    initExperience();
};

function initExperience() {
    const u = currentUser;
    document.body.setAttribute('data-role', u.role);
    document.body.setAttribute('data-dev', u.desarrollo.toLowerCase());
    
    // Logo por Desarrollo
    const logo = (u.desarrollo.toLowerCase() === 'sendas') ? 'logo-sadasi.png' : 'logo-altta.png';
    document.getElementById('brandLogo').src = logo;

    renderValues(u);
    document.getElementById('login').style.display = 'none';
    document.getElementById('tapZones').style.display = 'flex';
    initProgressBars();
    showStory(0);
}

function renderValues(u) {
    document.querySelectorAll('.advisor-photo').forEach(img => img.src = `${u.name}.jpg`);
    document.getElementById('u-name').textContent = u.name;
    document.getElementById('f-name').textContent = u.name;
    document.getElementById('f-dev-label').textContent = `${u.role.toUpperCase()} | ${u.desarrollo.toUpperCase()}`;

    if (u.role === 'asesor') {
        document.getElementById('model-text').textContent = "El modelo que más vendiste:";
        document.getElementById('u-prospects').textContent = u.prospects;
        document.getElementById('u-citas').textContent = u.citas;
        document.getElementById('u-visits').textContent = u.visits;
        document.getElementById('u-cancels').textContent = u.cancelaciones;
        document.getElementById('u-topModel').textContent = u.topModel;
        document.getElementById('u-sales').textContent = u.sales;
        document.getElementById('u-deeds').textContent = u.deeds;
        document.getElementById('u-monto').textContent = moneyF.format(u.monto_escrituras);
        // Final Card
        document.getElementById('f-val1').textContent = u.sales;
        document.getElementById('f-val2').textContent = u.deeds;
        document.getElementById('f-val3').textContent = moneyF.format(u.monto_escrituras);
    } else {
        document.getElementById('model-text').textContent = "Tendencia del Desarrollo:";
        document.getElementById('u-prospects').textContent = u.equipoSales;
        document.getElementById('u-citas').textContent = u.eficienciaEquipo;
        document.getElementById('u-visits').textContent = u.asesorEstrella;
        document.getElementById('u-cancels').textContent = u.equipoCancelaciones;
        document.getElementById('u-topModel').textContent = u.modeloEstrella;
        document.getElementById('u-sales').textContent = u.equipoSales;
        document.getElementById('u-deeds').textContent = u.equipoCancelaciones + " Canc.";
        document.getElementById('u-monto').textContent = moneyF.format(u.equipoMonto);
        // Final Card
        document.getElementById('f-lbl1').textContent = "Ventas Equipo";
        document.getElementById('f-val1').textContent = u.equipoSales;
        document.getElementById('f-lbl2').textContent = "Modelo Estrella";
        document.getElementById('f-val2').textContent = u.modeloEstrella;
        document.getElementById('f-val3').textContent = moneyF.format(u.equipoMonto);
    }
}

function initProgressBars() {
    const root = document.getElementById('progressRoot');
    const count = document.querySelectorAll('.story').length;
    root.innerHTML = '';
    for(let i=0; i<count; i++) root.innerHTML += '<div class="progress-bar"><div class="progress-fill"></div></div>';
}

function showStory(index) {
    const stories = document.querySelectorAll('.story');
    const bars = document.querySelectorAll('.progress-bar');
    stories.forEach(s => s.classList.remove('active'));
    stories[index].classList.add('active');
    bars.forEach((bar, i) => {
        bar.classList.remove('active', 'completed');
        if (i < index) bar.classList.add('completed');
        if (i === index) bar.classList.add('active');
    });
    current = index;
    
    // EFECTO CONFETI AL FINAL
    if (index === stories.length - 1) {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: [getComputedStyle(document.body).getPropertyValue('--accent')] });
    }
    resetTimer();
}

function resetTimer() {
    clearInterval(storyTimer);
    storyTimer = setInterval(() => {
        if (current < 5) showStory(current + 1);
        else clearInterval(storyTimer);
    }, 5000);
}

// Navegación & Pausa
document.getElementById('btnNext').onclick = () => { if(current < 5) showStory(current + 1); };
document.getElementById('btnPrev').onclick = () => { if(current > 0) showStory(current - 1); };

const togglePause = (pause) => {
    const fill = document.querySelector('.progress-bar.active .progress-fill');
    if (fill) fill.style.animationPlayState = pause ? 'paused' : 'running';
    pause ? clearInterval(storyTimer) : resetTimer();
};

const zones = document.getElementById('tapZones');
zones.onmousedown = () => togglePause(true);
zones.onmouseup = () => togglePause(false);
zones.ontouchstart = () => togglePause(true);
zones.ontouchend = () => togglePause(false);

document.getElementById('exportBtn').onclick = function() {
    const target = document.getElementById('capture-area');
    html2canvas(target, { backgroundColor: "#000", scale: 2, useCORS: true }).then(canvas => {
        const link = document.createElement('a');
        link.download = `Wrapped2025_${currentUser.name}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
};
