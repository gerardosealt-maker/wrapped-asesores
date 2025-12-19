let data = [], current = 0, currentUser = null, storyTimer = null;

const frases = {
    prospectos: ["¡Tu imán de clientes está al máximo!", "No dejaste escapar a nadie.", "El radar de prospectos trabajó extra."],
    ventas: ["¡Colmillo afilado! No se te fue ninguna.", "Eres el terror de las metas.", "Simplemente imparable."]
};

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

fetch('./data.json').then(r => r.json()).then(d => { data = d; });

document.getElementById('startBtn').onclick = () => {
    const val = document.getElementById('agentInput').value.trim().toLowerCase();
    const user = data.find(u => u.name.toLowerCase().includes(val));
    if (!user) return alert("Asesor no encontrado");
    currentUser = user;
    initExperience();
};

function renderValues(u) {
    // CORRECCIÓN DE FOTOS: Armando Vargas -> armando_vargas.jpg
    const fileName = u.name.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Quitar acentos
        .trim().replace(/\s+/g, '_'); // Espacios a guion bajo
    
    document.querySelectorAll('.u-photo').forEach(img => {
        img.src = `${fileName}.jpg`;
        img.onerror = () => { img.src = `https://ui-avatars.com/api/?name=${u.name}&background=FF8200&color=fff`; };
    });

    document.querySelectorAll('.u-name-display').forEach(el => el.textContent = u.name);
    document.getElementById('u-prospects').textContent = u.prospects || 0;
    document.getElementById('p-prospects-txt').textContent = getRandom(frases.prospectos);
    document.getElementById('u-sales').textContent = u.sales || 0;
    document.getElementById('p-sales-txt').textContent = getRandom(frases.ventas);
    document.getElementById('f-val-sales').textContent = u.sales || 0;
    document.getElementById('f-val-rank').textContent = "#" + (Math.floor(Math.random() * 10) + 1);
}

// FUNCIÓN PARA EXPORTAR
document.getElementById('exportBtn').onclick = function() {
    const card = document.getElementById('final-card');
    html2canvas(card, { backgroundColor: '#000000', scale: 2 }).then(canvas => {
        const link = document.createElement('a');
        link.download = `Wrapped_2025_${currentUser.name}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
};

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
    if (index === 2) confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    
    clearInterval(storyTimer);
    storyTimer = setInterval(() => {
        if (current < stories.length - 1) showStory(current + 1);
    }, 5000);
}

function initExperience() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('progressRoot').style.display = 'flex';
    document.getElementById('tapZones').style.display = 'flex';
    const root = document.getElementById('progressRoot');
    root.innerHTML = '';
    document.querySelectorAll('.story').forEach(() => {
        root.innerHTML += '<div class="progress-bar"><div class="progress-fill"></div></div>';
    });
    renderValues(currentUser);
    document.getElementById('music').play().catch(() => {});
    showStory(0);
}

document.getElementById('btnNext').onclick = () => { if (current < 3) showStory(current + 1); };
document.getElementById('btnPrev').onclick = () => { if (current > 0) showStory(current - 1); };
