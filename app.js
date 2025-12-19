let data = [], current = 0, currentUser = null, storyTimer = null;

const frases = {
    prospectos: ["¡Tu imán de clientes está al máximo!", "No dejaste escapar a nadie.", "El radar de prospectos trabajó extra.", "Medio mundo puso el ojo en ti."],
    bajas: ["¡Control total! Nada se te cae.", "Unas se van, pero tus cierres valen oro.", "Gajes del oficio, ¡pero tú sigues de pie!"],
    ventas: ["¡Colmillo afilado! No se te fue ninguna.", "Eres el terror de las metas.", "Estrategia pura y cierres maestros.", "Simplemente imparable."]
};

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Cargar Datos
fetch('./data.json').then(r => r.json()).then(d => { data = d; });

document.getElementById('startBtn').onclick = () => {
    const val = document.getElementById('agentInput').value.trim().toLowerCase();
    if (!val) return alert("Escribe tu nombre");
    
    const user = data.find(u => u.name.toLowerCase().includes(val));
    if (!user) return alert("Asesor no encontrado en la base de 2025");
    
    currentUser = user;
    initExperience();
};

function renderValues(u) {
    // LÓGICA DE FOTOS: Transforma "Armando Vargas" -> "armando_vargas.jpg"
    const fileName = u.name.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Quitar acentos
        .replace(/[ñÑ]/g, "n")
        .trim().replace(/\s+/g, '_');
    
    document.querySelectorAll('.u-photo').forEach(img => {
        img.src = `${fileName}.jpg`;
        // Si no existe el archivo físico, pone un avatar profesional
        img.onerror = () => {
            img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}&background=FF8200&color=fff&size=512`;
        };
    });

    // Rellenar Textos
    document.querySelectorAll('.u-name-display').forEach(el => el.textContent = u.name);
    document.getElementById('u-prospects').textContent = u.prospects || 0;
    document.getElementById('p-prospects-txt').textContent = getRandom(frases.prospectos);
    
    document.getElementById('u-cancels').textContent = u.cancelaciones || 0;
    document.getElementById('p-cancels-txt').textContent = getRandom(frases.bajas);
    
    document.getElementById('u-sales').textContent = u.sales || 0;
    document.getElementById('p-sales-txt').textContent = getRandom(frases.ventas);
    
    document.getElementById('u-deeds').textContent = u.deeds || 0;
    document.getElementById('u-monto-deeds').textContent = new Intl.NumberFormat('es-MX', {style:'currency', currency:'MXN', maximumFractionDigits:0}).format(u.monto_escrituras || 0);
    
    // Resumen Final
    document.getElementById('f-val-sales').textContent = u.sales || 0;
    document.getElementById('f-val-rank').textContent = "#" + (Math.floor(Math.random() * 10) + 1); // Aquí puedes poner lógica de ranking real
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
    if (index === 3 || index === 5) confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    
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
    document.getElementById('storyHeader').style.display = 'flex';
    
    // Generar barras de progreso según número de secciones
    const root = document.getElementById('progressRoot');
    root.innerHTML = '';
    document.querySelectorAll('.story').forEach(() => {
        root.innerHTML += '<div class="progress-bar"><div class="progress-fill"></div></div>';
    });
    
    renderValues(currentUser);
    document.getElementById('music').play().catch(() => {});
    showStory(0);
}

// Navegación Manual
document.getElementById('btnNext').onclick = () => {
    if (current < document.querySelectorAll('.story').length - 1) showStory(current + 1);
};
document.getElementById('btnPrev').onclick = () => {
    if (current > 0) showStory(current - 1);
};
