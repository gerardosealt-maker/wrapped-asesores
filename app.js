let data = [], current = 0, currentUser = null, storyTimer = null;

const frases = {
    leads: [
        "¡Tu radar de prospectos echó humo!",
        "Dominaste el arte de convertir clics en clientes.",
        "Tu teléfono no dejó de sonar en todo el 2025.",
        "Atrapaste leads como si fueras un imán humano.",
        "Hiciste que el CRM trabajara horas extra."
    ],
    ventas: [
        "¡Colmillo de oro para el cierre!",
        "Donde pones el ojo, pones la firma.",
        "Ni las cancelaciones pudieron con tu ritmo.",
        "Eres oficialmente el terror de las metas mensuales.",
        "Vender es un arte y tú eres el Picasso de Sendas."
    ],
    mejorMes: [
        "¡Ese mes estabas en modo leyenda!",
        "Nadie pudo seguirte el paso en esos 30 días.",
        "Simplemente imparable, fue tu mejor versión.",
        "Hiciste que lo difícil pareciera un juego.",
        "Ese mes no fue suerte, fue puro talento."
    ],
    topTier: [ // Frases exclusivas para los de +50 ventas
        "¡Nivel Dios de ventas activado! 🏆",
        "Estás en la cima de la pirámide de Sendas.",
        "Tu nombre ya está escrito en el salón de la fama.",
        "Leyenda viviente de Sadasi. ¡Qué año!"
    ]
};

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

fetch('./data.json').then(r => r.json()).then(d => { data = d; });

document.getElementById('startBtn').onclick = () => {
    const val = document.getElementById('agentInput').value.trim().toUpperCase();
    const user = data.find(u => u.name.toUpperCase().includes(val));
    if (!user) return alert("Asesor no encontrado. Prueba con un solo nombre o apellido.");
    currentUser = user;
    initExperience();
};

function renderValues(u) {
    // 1. Detección de Rango (Premiación)
    let medalla = "";
    let fraseVenta = getRandom(frases.ventas);
    
    if (u.v_netas >= 60) {
        medalla = "👑 MASTER ELITE";
        fraseVenta = getRandom(frases.topTier);
    } else if (u.v_netas >= 45) {
        medalla = "⭐ DIAMANTE";
    } else if (u.v_netas >= 30) {
        medalla = "🔥 SENIOR";
    }

    // Inyectar Medalla si existe
    const badgeHtml = medalla ? `<div class="rank-badge">${medalla}</div>` : "";
    document.getElementById('rank-container').innerHTML = badgeHtml;

    // Foto
    document.querySelectorAll('.u-photo').forEach(img => {
        img.src = `img/asesores/${u.foto}`;
        img.onerror = () => { img.src = `https://ui-avatars.com/api/?name=${u.name}&background=FF8200&color=fff`; };
    });

    document.querySelectorAll('.u-name-display').forEach(el => el.textContent = u.name);
    
    // Asignación de datos
    document.getElementById('u-mejor-mes-nombre').textContent = u.mejor_mes;
    document.getElementById('u-mejor-mes-qty').textContent = u.mejor_mes_ventas;
    document.getElementById('p-mejor-mes-txt').textContent = getRandom(frases.mejorMes);

    document.getElementById('u-leads').textContent = u.leads;
    document.getElementById('p-leads-txt').textContent = getRandom(frases.leads);
    
    document.getElementById('u-vnetas').textContent = u.v_netas;
    document.getElementById('p-vnetas-txt').textContent = fraseVenta;
    document.getElementById('u-vdigital').textContent = u.v_digital;

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
    // Explosión masiva si es Top Performer
    if ([1, 3, 4].includes(index)) {
        let count = currentUser.v_netas > 50 ? 250 : 100;
        confetti({ particleCount: count, spread: 80, origin: { y: 0.6 }, colors:['#FF8200', '#FF007A', '#FFD700'] });
    }
    
    clearInterval(storyTimer);
    storyTimer = setInterval(() => { if (current < stories.length - 1) showStory(current + 1); }, 5500);
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
    html2canvas(document.getElementById('final-card'), { backgroundColor: '#000', scale: 3 }).then(canvas => {
        const link = document.createElement('a');
        link.download = `Wrapped_2025_${currentUser.name}.png`;
        link.href = canvas.toDataURL();
        link.click();
    });
};
