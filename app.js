let data = [], current = 0, currentUser = null, storyTimer = null;
const moneyF = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });

// 1. CARGAR DATOS Y CALCULAR RANKING
fetch('./data.json').then(r => r.json()).then(d => {
    // Ordenamos de mayor a menor monto para que el ranking sea por dinero generado
    data = d.sort((a, b) => (b.monto_escrituras || 0) - (a.monto_escrituras || 0));
}).catch(e => console.error("Error al cargar JSON", e));

// 2. INICIO
document.getElementById('startBtn').onclick = () => {
    const val = document.getElementById('agentInput').value.trim().toLowerCase();
    currentUser = data.find(u => u.id.toLowerCase() === val || u.name.toLowerCase().includes(val));
    
    if (!currentUser) return alert("Asesor no encontrado. Verifica tu ID o Nombre.");
    
    document.getElementById('music').play().catch(() => {});
    initExperience();
};

function initExperience() {
    document.body.setAttribute('data-dev', currentUser.desarrollo.toLowerCase());
    // Cambio de logo según desarrollo
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
    // Calculamos posición en el ranking
    const rankPos = data.findIndex(x => x.id === u.id) + 1;
    const eficiencia = u.visits > 0 ? Math.round((u.sales / u.visits) * 100) + "%" : "0%";
    const status = (u.deeds >= 12) ? "TOP 2% ASESOR LEYENDA ⭐" : (u.deeds >= 8 ? "TOP 10% ASESOR ÉLITE 🚀" : "ASESOR ALTO IMPACTO");

    // Llenado de textos e imágenes
    document.querySelectorAll('.u-photo').forEach(img => img.src = `${u.name}.jpg`);
    document.querySelectorAll('.u-name-display').forEach(el => el.textContent = u.name);
    
    document.getElementById('u-prospects').textContent = u.prospects;
    document.getElementById('u-visits').textContent = u.visits;
    document.getElementById('u-cancels').textContent = u.cancelaciones;
    document.getElementById('u-mejorMes').textContent = (u.mejorMes || "Diciembre").toUpperCase();
    document.getElementById('u-sales').textContent = u.sales;
    document.getElementById('u-deeds').textContent = u.deeds;
    document.getElementById('u-monto-deeds').textContent = moneyF.format(u.monto_escrituras);
    document.getElementById('u-topModel').textContent = u.topModel;

    // Frases dinámicas
    document.getElementById('p-prospects-txt').textContent = u.prospects > 140 ? "¡Eres una máquina de prospección!" : "Enfoque total en cada prospecto.";
    document.getElementById('p-cancels-txt').textContent = u.cancelaciones === 0 ? "¡Imbatible! Mantuviste tu cartera intacta." : "Superaste cada reto con profesionalismo.";

    // Llenado de Tarjeta Final (Social)
    document.getElementById('f-status-tag').textContent = status;
    document.getElementById('f-val1').textContent = u.sales;
    document.getElementById('f-val2').textContent = u.deeds;
    document.getElementById('f-val-rank').textContent = "#" + rankPos;
    document.getElementById('f-val-eff').textContent = eficiencia;
    document.getElementById('f-dev-label').textContent = `${u.role.toUpperCase()} | ${u.desarrollo.toUpperCase()}`;
}

// 3. MOTOR DE HISTORIAS
function initProgressBars() {
    const root = document.getElementById('progressRoot');
    const storyCount = document.querySelectorAll('.story').length;
    root.innerHTML = '';
    for (let i = 0; i < storyCount; i++) {
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
    
    // Confetti cuando llega al resumen final (índice 8)
    if (index === 8) {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }
    
    resetTimer();
}

function resetTimer() {
    clearInterval(storyTimer);
    const storyCount = document.querySelectorAll('.story').length;
    storyTimer = setInterval(() => {
        if (current < storyCount - 1) showStory(current + 1);
        else clearInterval(storyTimer);
    }, 5000);
}

// Navegación Manual
document.getElementById('btnNext').onclick = () => {
    const storyCount = document.querySelectorAll('.story').length;
    if (current < storyCount - 1) showStory(current + 1);
};
document.getElementById('btnPrev').onclick = () => {
    if (current > 0) showStory(current - 1);
};

// 4. DESCARGAR IMAGEN
document.getElementById('exportBtn').onclick = function() {
    const btn = this;
    btn.innerText = "GENERANDO IMAGEN...";
    html2canvas(document.getElementById('capture-area'), { 
        backgroundColor: "#000",
        scale: 2,
        useCORS: true 
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = `Wrapped2025_${currentUser.name}.png`;
        link.href = canvas.toDataURL();
        link.click();
        btn.innerText = "GUARDAR MI HISTORIA";
    });
};
