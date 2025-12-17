let data = [], current = 0, currentUser = null, storyTimer = null;
const STORY_DURATION = 5000;
const moneyF = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });

// Cargar Datos
fetch('./data.json').then(r => r.json()).then(d => data = d);

// Iniciar sesión
document.getElementById('startBtn').onclick = () => {
    const val = document.getElementById('agentInput').value.trim();
    currentUser = data.find(u => u.id === val || u.name.toLowerCase().includes(val.toLowerCase()));
    if (!currentUser) return alert("ID no encontrado");

    initExperience();
};

function initExperience() {
    document.body.setAttribute('data-role', currentUser.role);
    document.body.setAttribute('data-dev', currentUser.desarrollo.toLowerCase());
    
    renderData();
    document.getElementById('login').style.display = 'none';
    document.getElementById('tapZones').style.display = 'flex';
    
    initProgressBars();
    startStoryLoop();
}

function renderData() {
    const u = currentUser;
    const logo = (u.desarrollo.toLowerCase() === 'sendas') ? 'logo-sadasi.png' : 'logo-altta.png';
    document.getElementById('brandLogo').src = logo;
    document.getElementById('u-photo-intro').src = `${u.name}.jpg`;
    document.getElementById('u-photo-final').src = `${u.name}.jpg`;
    document.getElementById('u-name').textContent = u.name;

    if (u.role === 'asesor') {
        document.getElementById('u-saludo').textContent = "Hola, Asesor";
        document.getElementById('u-mejorMes').textContent = u.mejorMes;
        document.getElementById('u-ventasMes').textContent = u.ventasMejorMes;
        document.getElementById('u-prospects').textContent = u.prospects;
        document.getElementById('u-cancels').textContent = u.cancelaciones;
        document.getElementById('f-role').textContent = "Asesor " + u.desarrollo;
        document.getElementById('f-val1').textContent = u.sales;
        document.getElementById('f-val2').textContent = moneyF.format(u.monto_escrituras);
    } else {
        document.getElementById('u-saludo').textContent = "Hola, Coordinador";
        document.getElementById('c-equipoSales').textContent = u.equipoSales;
        document.getElementById('c-devName').textContent = u.desarrollo;
        document.getElementById('c-estrella').textContent = u.asesorEstrella;
        document.getElementById('c-eficiencia').textContent = u.eficienciaEquipo;
        document.getElementById('f-role').textContent = "Coordinador " + u.desarrollo;
        document.getElementById('f-label1').textContent = "Ventas Equipo";
        document.getElementById('f-val1').textContent = u.equipoSales;
        document.getElementById('f-label2').textContent = "Monto Total";
        document.getElementById('f-val2').textContent = moneyF.format(u.equipoMonto);
    }
}

function initProgressBars() {
    const root = document.getElementById('progressRoot');
    const storiesCount = document.querySelectorAll('.story').length;
    root.innerHTML = '';
    for(let i=0; i<storiesCount; i++) {
        root.innerHTML += '<div class="progress-bar"><div class="progress-fill"></div></div>';
    }
}

function startStoryLoop() {
    showStory(current);
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
        if (current < document.querySelectorAll('.story').length - 1) next();
        else clearInterval(storyTimer);
    }, STORY_DURATION);
}

function next() {
    if (current < document.querySelectorAll('.story').length - 1) showStory(current + 1);
}
function prev() {
    if (current > 0) showStory(current - 1);
}

// Eventos de Navegación y Pausa
const zones = document.getElementById('tapZones');
document.getElementById('btnNext').onclick = next;
document.getElementById('btnPrev').onclick = prev;

const handlePause = (pause) => {
    const fill = document.querySelector('.progress-bar.active .progress-fill');
    if (fill) fill.style.animationPlayState = pause ? 'paused' : 'running';
    pause ? clearInterval(storyTimer) : resetTimer();
};

zones.onmousedown = () => handlePause(true);
zones.onmouseup = () => handlePause(false);
zones.ontouchstart = () => handlePause(true);
zones.ontouchend = () => handlePause(false);

// Exportar Foto
document.getElementById('exportBtn').onclick = (e) => {
    e.stopPropagation();
    const btn = e.target;
    btn.style.opacity = '0';
    html2canvas(document.getElementById('story-final'), { backgroundColor:'#000', scale:2 }).then(canvas => {
        const link = document.createElement('a');
        link.download = `Wrapped_2024.png`;
        link.href = canvas.toDataURL();
        link.click();
        btn.style.opacity = '1';
    });
};
