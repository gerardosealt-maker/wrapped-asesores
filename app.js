let data = [], current = 0, currentUser = null, storyTimer = null;
const moneyF = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });

fetch('./data.json').then(r => r.json()).then(d => data = d);

document.getElementById('startBtn').onclick = () => {
    const val = document.getElementById('agentInput').value.trim();
    currentUser = data.find(u => u.id === val || u.name.toLowerCase().includes(val.toLowerCase()));
    if (!currentUser) return alert("ID de asesor no válido");
    document.getElementById('music').play().catch(() => {});
    initExperience();
};

function getDynamicContent(u) {
    let phrases = {
        prospects: "Cada nombre fue una oportunidad perseguida con pasión.",
        cancels: "No todas las batallas se ganan, pero tú seguiste adelante.",
        elite: "FUERZA DE VENTAS 2025"
    };

    if (u.prospects > 140) phrases.prospects = "¡Máquina de prospección! Tu energía no tuvo límites.";
    if (u.cancelaciones === 0) phrases.cancels = "¡Imbatible! Mantuviste tu cartera perfecta este año.";

    // Lógica de Status Élite
    if (u.role === 'asesor') {
        if (u.sales >= 15 || u.monto_escrituras > 60000000) phrases.elite = "TOP 2% DE ASESORES ÉLITE";
        else if (u.sales >= 10) phrases.elite = "TOP 10% DE ALTO RENDIMIENTO";
    } else {
        phrases.elite = "LIDERAZGO DE IMPACTO 2025";
    }
    return phrases;
}

function initExperience() {
    const u = currentUser;
    document.body.setAttribute('data-dev', u.desarrollo.toLowerCase());
    document.getElementById('brandLogo').src = (u.desarrollo.toLowerCase() === 'sendas') ? 'logo-sadasi.png' : 'logo-altta.png';

    renderValues(u);
    document.getElementById('login').style.display = 'none';
    document.getElementById('tapZones').style.display = 'flex';
    initProgressBars();
    showStory(0);
}

function renderValues(u) {
    const dyn = getDynamicContent(u);
    document.querySelectorAll('.u-photo').forEach(img => img.src = `${u.name}.jpg`);
    document.querySelectorAll('.u-name-display').forEach(el => el.textContent = u.name);
    document.getElementById('p-prospects-txt').textContent = dyn.prospects;
    document.getElementById('p-cancels-txt').textContent = dyn.cancels;
    document.getElementById('p-status-tag').textContent = dyn.elite;
    document.getElementById('f-dev-label').textContent = `${u.role.toUpperCase()} | ${u.desarrollo.toUpperCase()}`;

    if (u.role === 'asesor') {
        document.getElementById('u-prospects').textContent = u.prospects;
        document.getElementById('u-citas').textContent = u.citas;
        document.getElementById('u-visits').textContent = u.visits;
        document.getElementById('u-cancels').textContent = u.cancelaciones;
        document.getElementById('u-topModel').textContent = u.topModel;
        document.getElementById('u-sales').textContent = u.sales;
        document.getElementById('u-deeds').textContent = u.deeds;
        document.getElementById('f-val1').textContent = u.sales;
        document.getElementById('f-val2').textContent = u.deeds;
        document.getElementById('f-val3').textContent = moneyF.format(u.monto_escrituras);
    } else {
        document.getElementById('model-label').textContent = "Modelo del Desarrollo";
        document.getElementById('u-prospects').textContent = u.equipoSales;
        document.getElementById('u-citas').textContent = u.eficienciaEquipo;
        document.getElementById('u-visits').textContent = "Meta Cumplida";
        document.getElementById('u-cancels').textContent = u.equipoCancelaciones;
        document.getElementById('u-topModel').textContent = u.modeloEstrella;
        document.getElementById('u-sales').textContent = u.equipoSales;
        document.getElementById('u-deeds').textContent = u.asesorEstrella;
        document.getElementById('f-lbl1').textContent = "Ventas Eq.";
        document.getElementById('f-val1').textContent = u.equipoSales;
        document.getElementById('f-lbl2').textContent = "Estrella";
        document.getElementById('f-val2').textContent = u.asesorEstrella;
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
    if (index >= stories.length) return;
    stories.forEach(s => s.classList.remove('active'));
    stories[index].classList.add('active');
    bars.forEach((bar, i) => {
        bar.classList.remove('active', 'completed');
        if (i < index) bar.classList.add('completed');
        if (i === index) bar.classList.add('active');
    });
    current = index;
    if (index === stories.length - 1) {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: [getComputedStyle(document.body).getPropertyValue('--accent'), '#ffffff'] });
    }
    resetTimer();
}

function resetTimer() {
    clearInterval(storyTimer);
    storyTimer = setInterval(() => { if (current < 5) showStory(current + 1); }, 5000);
}

document.getElementById('btnNext').onclick = () => { if(current < 5) showStory(current + 1); };
document.getElementById('btnPrev').onclick = () => { if(current > 0) showStory(current - 1); };

const zones = document.getElementById('tapZones');
zones.onmousedown = () => { clearInterval(storyTimer); document.querySelector('.progress-bar.active .progress-fill').style.animationPlayState = 'paused'; };
zones.onmouseup = () => { resetTimer(); document.querySelector('.progress-bar.active .progress-fill').style.animationPlayState = 'running'; };

document.getElementById('exportBtn').onclick = function() {
    html2canvas(document.getElementById('capture-area'), { backgroundColor: "#000", scale: 2 }).then(canvas => {
        const link = document.createElement('a');
        link.download = `Wrapped2025_${currentUser.name}.png`;
        link.href = canvas.toDataURL();
        link.click();
    });
};
