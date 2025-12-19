let data = [], current = 0, currentUser = null, storyTimer = null;

fetch('./data.json').then(r => r.json()).then(d => { data = d; });

document.getElementById('startBtn').onclick = () => {
    const val = document.getElementById('agentInput').value.trim().toLowerCase();
    const user = data.find(u => u.name.toLowerCase().includes(val));
    if (!user) return alert("Usuario no encontrado");

    currentUser = user;
    initExperience();
};

function renderValues(u) {
    // CORRECCIÓN FOTOS: Transforma "Nombre Apellido" a "nombre_apellido.jpg"
    const fileName = u.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '_');
    
    document.querySelectorAll('.u-photo').forEach(img => {
        img.src = `${fileName}.jpg`;
        img.onerror = () => { img.src = `https://ui-avatars.com/api/?name=${u.name}&background=FF8200&color=fff`; };
    });

    document.querySelectorAll('.u-name-display').forEach(el => el.textContent = u.name);
    document.getElementById('u-prospects').textContent = u.prospects || 0;
    document.getElementById('u-sales').textContent = u.sales || 0;
    document.getElementById('u-deeds').textContent = u.deeds || 0;
    document.getElementById('u-monto-deeds').textContent = new Intl.NumberFormat('es-MX', {style:'currency', currency:'MXN', maximumFractionDigits:0}).format(u.monto_escrituras || 0);
    
    document.getElementById('f-val-sales').textContent = u.sales || 0;
    document.getElementById('f-val-rank').textContent = "#" + (Math.floor(Math.random() * 10) + 1); // Simulación de rank
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
    if (index === 2) confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    
    clearInterval(storyTimer);
    storyTimer = setInterval(() => {
        if (current < stories.length - 1) showStory(current + 1);
    }, 5000);
}

function initExperience() {
    document.body.setAttribute('data-dev', currentUser.desarrollo.toLowerCase());
    document.getElementById('login').style.display = 'none';
    document.getElementById('progressRoot').style.display = 'flex';
    document.getElementById('tapZones').style.display = 'flex';
    
    const root = document.getElementById('progressRoot');
    root.innerHTML = '';
    document.querySelectorAll('.story').forEach(() => root.innerHTML += '<div class="progress-bar"><div class="progress-fill"></div></div>');
    
    renderValues(currentUser);
    showStory(0);
}

document.getElementById('btnNext').onclick = () => {
    const stories = document.querySelectorAll('.story');
    if (current < stories.length - 1) showStory(current + 1);
};
document.getElementById('btnPrev').onclick = () => {
    if (current > 0) showStory(current - 1);
};
