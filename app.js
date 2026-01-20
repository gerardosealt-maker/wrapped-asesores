let data = [], current = 0, currentUser = null, storyTimer = null;

fetch('./data.json').then(r => r.json()).then(d => { data = d; });

document.getElementById('startBtn').onclick = () => {
    const val = document.getElementById('agentInput').value.trim().toLowerCase();
    const user = data.find(u => u.name.toLowerCase().includes(val));
    if (!user) return alert("Asesor no encontrado");
    currentUser = user;
    initExperience();
};

function renderValues(u) {
    const fileName = u.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().replace(/\s+/g, '_'); 
    document.querySelectorAll('.u-photo').forEach(img => {
        img.src = `img/asesores/${fileName}.jpg`;
        img.onerror = () => { img.src = `https://ui-avatars.com/api/?name=${u.name}&background=FF8200&color=fff`; };
    });

    document.querySelectorAll('.u-name-display').forEach(el => el.textContent = u.name);
    
    // Datos Digitales
    document.getElementById('u-leads').textContent = u.leads;
    document.getElementById('u-citas').textContent = u.citas;
    document.getElementById('u-visitas').textContent = u.visitas;
    document.getElementById('u-vdigital').textContent = u.v_digital;
    
    // Datos Totales
    document.getElementById('u-vbrutas').textContent = u.v_brutas;
    document.getElementById('u-cancels').textContent = u.cancelaciones;
    document.getElementById('u-vnetas').textContent = u.v_netas;
    
    // Escrituración
    document.getElementById('u-eqty').textContent = u.escrituras_qty;
    document.getElementById('u-emonto').textContent = `$${u.escrituras_monto.toFixed(1)} MDP`;

    // Resumen Card
    document.getElementById('f-vnetas').textContent = u.v_netas;
    document.getElementById('f-eqty').textContent = u.escrituras_qty;
    document.getElementById('f-leads').textContent = u.leads;
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
    if (index === 2 || index === 4) confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    
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

document.getElementById('btnNext').onclick = () => { if (current < 4) showStory(current + 1); };
document.getElementById('btnPrev').onclick = () => { if (current > 0) showStory(current - 1); };

document.getElementById('exportBtn').onclick = function() {
    const card = document.getElementById('final-card');
    html2canvas(card, { backgroundColor: '#000000', scale: 3 }).then(canvas => {
        const link = document.createElement('a');
        link.download = `Wrapped_2025_Sendas_${currentUser.name}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
};
