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
    
    // CORRECCIÓN DE LOGOS
    // Sendas -> Sadasi | Meseta/Acento -> Altta Homes
    const logo = (u.desarrollo.toLowerCase() === 'sendas') ? 'logo-sadasi.png' : 'logo-altta.png';
    document.getElementById('brandLogo').src = logo;

    renderValues(u);
    document.getElementById('login').style.display = 'none';
    document.getElementById('tapZones').style.display = 'flex';
    initProgressBars();
    showStory(0);
}

function renderValues(u) {
    // Generales
    document.getElementById('u-photo-intro').src = `${u.name}.jpg`;
    document.getElementById('u-photo-final').src = `${u.name}.jpg`;
    document.getElementById('u-name').textContent = u.name;
    document.getElementById('f-name').textContent = u.name;

    if (u.role === 'asesor') {
        document.getElementById('u-prospects').textContent = u.prospects;
        document.getElementById('u-citas').textContent = u.citas;
        document.getElementById('u-visits').textContent = u.visits;
        document.getElementById('u-sales').textContent = u.sales;
        document.getElementById('u-deeds').textContent = u.deeds;
        document.getElementById('u-monto').textContent = moneyF.format(u.monto_escrituras);
        document.getElementById('u-mejorMes').textContent = u.mejorMes;
        document.getElementById('u-ventasMes').textContent = u.ventasMejorMes;
        // Final Card
        document.getElementById('f-val1').textContent = u.sales;
        document.getElementById('f-val2').textContent = u.deeds;
    } else {
        document.getElementById('c-equipoSales').textContent = u.equipoSales;
        document.getElementById('c-devName').textContent = u.desarrollo;
        document.getElementById('c-estrella').textContent = u.asesorEstrella;
        document.getElementById('c-eficiencia').textContent = u.eficienciaEquipo;
        // Final Card
        document.getElementById('f-lbl1').textContent = "Ventas Equipo";
        document.getElementById('f-val1').textContent = u.equipoSales;
        document.getElementById('f-lbl2').textContent = "Monto Total";
        document.getElementById('f-val2').textContent = (u.equipoMonto / 1000000).toFixed(1) + "M";
    }
}

function initProgressBars() {
    const root = document.getElementById('progressRoot');
    const storiesCount = document.querySelectorAll('.story').length;
    root.innerHTML = '';
    for(let i=0; i<storiesCount; i++) root.innerHTML += '<div class="progress-bar"><div class="progress-fill"></div></div>';
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
    resetTimer();
}

function resetTimer() {
    clearInterval(storyTimer);
    storyTimer = setInterval(() => {
        if (current < document.querySelectorAll('.story').length - 1) showStory(current + 1);
        else clearInterval(storyTimer);
    }, 5000);
}

// Navegación y Pausa
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

document.getElementById('exportBtn').onclick = (e) => {
    e.stopPropagation();
    html2canvas(document.getElementById('story-final'), { backgroundColor:'#000', scale:2 }).then(canvas => {
        const link = document.createElement('a');
        link.download = `Wrapped_2024.png`;
        link.href = canvas.toDataURL();
        link.click();
    });
};
