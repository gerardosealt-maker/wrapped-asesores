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

function getDynamicPhrases(u) {
    let p = {
        intro: "Hiciste que las cosas sucedieran.",
        prospects: "¡Muchos 'hola', pero tú buscabas el 'sí'!",
        effort: "Desgastaste la suela del zapato, ¡valió la pena!",
        cancels: "No todas se logran, pero tú no te aguitas.",
        model: "Te lo sabes de memoria, ¡es tu favorito!",
        elite: "FUERZA DE VENTAS 2025"
    };

    // Frases por desempeño
    if (u.prospects > 130) p.prospects = "¡Te llovieron prospectos y a todos atendiste!";
    if (u.visits > 50) p.effort = "¡Casi vives en el desarrollo de tantas visitas!";
    if (u.cancelaciones === 0) p.cancels = "¡Cartera de acero! Cero bajas este año.";
    if (u.cancelaciones > 2) p.cancels = "Lo que no te mata, te hace más colmilludo.";

    // Status Élite para el resumen final
    if (u.role === 'asesor') {
        if (u.sales >= 15 || u.monto_escrituras > 60000000) p.elite = "TOP 2% ASESOR ÉLITE ⭐";
        else if (u.sales >= 10) p.elite = "TOP 10% ALTO RENDIMIENTO 🚀";
    } else {
        p.elite = "LÍDER ESTRATÉGICO 👑";
        p.model = "El prototipo que movió la aguja este año.";
    }
    return p;
}

function initExperience() {
    document.body.setAttribute('data-dev', currentUser.desarrollo.toLowerCase());
    document.getElementById('brandLogo').src = (currentUser.desarrollo.toLowerCase() === 'sendas') ? 'logo-sadasi.png' : 'logo-altta.png';
    renderValues(currentUser);
    document.getElementById('login').style.display = 'none';
    document.getElementById('tapZones').style.display = 'flex';
    initProgressBars();
    showStory(0);
}

function renderValues(u) {
    const f = getDynamicPhrases(u);
    document.querySelectorAll('.u-photo').forEach(img => img.src = `${u.name}.jpg`);
    document.querySelectorAll('.u-name-display').forEach(el => el.textContent = u.name);
    
    // Inyectar Frases
    document.getElementById('p-intro-txt').textContent = f.intro;
    document.getElementById('p-prospects-txt').textContent = f.prospects;
    document.getElementById('p-effort-txt').textContent = f.effort;
    document.getElementById('p-cancels-txt').textContent = f.cancels;
    document.getElementById('p-model-txt').textContent = f.model;
    document.getElementById('f-status-tag').textContent = f.elite;
    
    document.getElementById('f-dev-label').textContent = `${u.role.toUpperCase()} | ${u.desarrollo.toUpperCase()}`;

    // Datos numéricos
    document.getElementById('u-prospects').textContent = u.prospects || u.equipoSales;
    document.getElementById('u-citas').textContent = u.citas || u.eficienciaEquipo;
    document.getElementById('u-visits').textContent = u.visits || "META";
    document.getElementById('u-cancels').textContent = u.cancelaciones || u.equipoCancelaciones;
    document.getElementById('u-topModel').textContent = u.topModel || u.modeloEstrella;

    // Resumen Final
    document.getElementById('f-val1').textContent = u.sales || u.equipoSales;
    document.getElementById('f-val2').textContent = u.deeds || u.asesorEstrella;
    document.getElementById('f-val3').textContent = moneyF.format(u.monto_escrituras || u.equipoMonto);
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
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: [getComputedStyle(document.body).getPropertyValue('--accent')] });
    }
    resetTimer();
}

function resetTimer() {
    clearInterval(storyTimer);
    storyTimer = setInterval(() => { if (current < 5) showStory(current + 1); }, 5000);
}

document.getElementById('btnNext').onclick = () => { if(current < 5) showStory(current + 1); };
document.getElementById('btnPrev').onclick = () => { if(current > 0) showStory(current - 1); };

// Lógica de descarga corregida
document.getElementById('exportBtn').onclick = function() {
    const area = document.getElementById('capture-area');
    html2canvas(area, {
        backgroundColor: "#000",
        scale: 3, // Mayor calidad
        useCORS: true,
        logging: false
    }).then(canvas => {
        const image = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.download = `MiWrapped2025_${currentUser.name}.png`;
        link.href = image;
        link.click();
    });
};
