let data = [], current = 0, currentUser = null, storyTimer = null;

const frases = {
    leads: ["¡Tu imán de clientes estuvo encendido!", "Tu radar de prospectos no descansó.", "Atrapaste leads como un pro."],
    ventas: ["¡Colmillo afilado para el cierre!", "Ni las cancelaciones te frenaron.", "Vendedor estrella de Sendas."],
    escrituras: ["¡Convertiste sueños en llaves reales!", "Patrimonio entregado con éxito.", "¡Cerraste el año como los grandes!"],
    mejorMes: ["Fue tu momento de gloria.", "Simplemente imparable.", "Ese mes no hubo quien te detuviera."]
};

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

fetch('./data.json').then(r => r.json()).then(d => { data = d; });

document.getElementById('startBtn').onclick = () => {
    const val = document.getElementById('agentInput').value.trim().toUpperCase();
    const user = data.find(u => u.name.includes(val));
    if (!user) return alert("Asesor no encontrado. Escribe el nombre tal cual aparece en el reporte.");
    currentUser = user;
    initExperience();
};

function renderValues(u) {
    // Identificación de fotos según vienen guardadas (nombre exacto + .jpg)
    document.querySelectorAll('.u-photo').forEach(img => {
        img.src = `img/asesores/${u.foto}`;
        img.onerror = () => { img.src = `https://ui-avatars.com/api/?name=${u.name}&background=FF8200&color=fff`; };
    });

    document.querySelectorAll('.u-name-display').forEach(el => el.textContent = u.name);
    
    // Slide Digital
    document.getElementById('u-leads').textContent = u.leads;
    document.getElementById('p-leads-txt').textContent = getRandom(frases.leads);
    document.getElementById('u-citas').textContent = u.citas;
    document.getElementById('u-visitas').textContent = u.visitas;
    
    // Slide Mejor Mes (Golden Month)
    document.getElementById('u-mejor-mes-nombre').textContent = u.mejor_mes;
    document.getElementById('u-mejor-mes-qty').textContent = u.mejor_mes_ventas;
    document.getElementById('p-mejor-mes-txt').textContent = getRandom(frases.mejorMes);

    // Slide Ventas
    document.getElementById('u-vbrutas').textContent = u.v_brutas;
    document.getElementById('u-cancels').textContent = u.cancelaciones;
    document.getElementById('u-vnetas').textContent = u.v_netas;
    document.getElementById('p-vnetas-txt').textContent = getRandom(frases.ventas);
    document.getElementById('u-vdigital').textContent = u.v_digital;
    
    // Escrituración
    document.getElementById('u-eqty').textContent = u.escrituras_qty;
    document.getElementById('u-emonto').textContent = `$${u.escrituras_monto.toFixed(1)} MDP`;
    document.getElementById('p-escrituras-txt').textContent = getRandom(frases.escrituras);

    // Card Final
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
    // Confetti en hitos importantes (Mejor Mes, Ventas y Final)
    if ([1, 2, 4].includes(index)) {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#FF8200', '#FF007A', '#FFFFFF'] });
    }
    
    clearInterval(storyTimer);
    storyTimer = setInterval(() => {
        if (current < stories.length - 1) showStory(current + 1);
    }, 5500);
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
