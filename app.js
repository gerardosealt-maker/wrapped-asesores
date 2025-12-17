/**
 * MASTER JS - WRAPPED 2025 GRUPO SADASI
 * Versión: 3.0 (Narrativa Extendida - 9 Historias)
 */

let data = [], current = 0, currentUser = null, storyTimer = null;
const moneyF = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });

// 1. CARGA DE DATOS
fetch('./data.json')
    .then(r => r.json())
    .then(d => data = d)
    .catch(err => console.error("Error cargando JSON:", err));

// 2. INICIO DE SESIÓN
document.getElementById('startBtn').onclick = () => {
    const val = document.getElementById('agentInput').value.trim();
    if (!val) return alert("Por favor introduce tu ID o nombre");

    currentUser = data.find(u => 
        u.id.toLowerCase() === val.toLowerCase() || 
        u.name.toLowerCase().includes(val.toLowerCase())
    );

    if (!currentUser) return alert("ID no encontrado en la base de datos 2025");

    // Iniciar música
    const music = document.getElementById('music');
    music.play().catch(() => console.log("Interacción requerida para audio"));

    initExperience();
};

// 3. GENERADOR DE FRASES DINÁMICAS (Jiribilla)
function getDynamicPhrases(u) {
    let p = {
        prospects: "¡Mucho contacto, pero tú siempre buscabas el 'SÍ'!",
        cancels: "Baches en el camino, pero sigues en la ruta del éxito.",
        model: "Te lo sabes de memoria, es tu casa favorita.",
        elite: "FUERZA DE VENTAS 2025"
    };

    // Lógica personalizada por resultados
    if (u.prospects > 140) p.prospects = "¡Eres un imán de prospectos! Nadie se te escapó.";
    if (u.cancelaciones === 0) p.cancels = "¡Impecable! Cartera de acero, cero bajas este año.";
    if (u.cancelaciones > 2) p.cancels = "Lo que no te mata, te hace más colmilludo en el cierre.";

    // Status Élite para compartir
    if (u.role === 'asesor') {
        if (u.deeds >= 12 || u.monto_escrituras > 60000000) {
            p.elite = "TOP 2% ASESOR LEYENDA ⭐";
        } else if (u.deeds >= 8) {
            p.elite = "TOP 10% ASESOR ÉLITE 🚀";
        } else {
            p.elite = "ASESOR DE ALTO IMPACTO";
        }
    } else {
        p.elite = "LÍDER ESTRATÉGICO 👑";
    }

    return p;
}

// 4. RENDERIZADO DE VALORES
function renderValues(u) {
    const f = getDynamicPhrases(u);

    // Fotos y Nombres (en todas las diapositivas)
    document.querySelectorAll('.u-photo').forEach(img => img.src = `img/${u.name}.jpg`);
    document.querySelectorAll('.u-name-display').forEach(el => el.textContent = u.name);

    // Inyectar Frases
    document.getElementById('p-prospects-txt').textContent = f.prospects;
    document.getElementById('p-cancels-txt').textContent = f.cancels;
    document.getElementById('p-model-txt').textContent = f.model;
    document.getElementById('f-status-tag').textContent = f.elite;

    // Datos por Diapositiva
    document.getElementById('u-prospects').textContent = u.prospects || u.equipoSales;
    document.getElementById('u-visits').textContent = u.visits || u.eficienciaEquipo;
    document.getElementById('u-cancels').textContent = u.cancelaciones || u.equipoCancelaciones;
    document.getElementById('u-mejorMes').textContent = (u.mejorMes || "DICIEMBRE").toUpperCase();
    document.getElementById('u-sales').textContent = u.sales || u.equipoSales;
    document.getElementById('u-deeds').textContent = u.deeds || u.asesorEstrella;
    document.getElementById('u-topModel').textContent = u.topModel || u.modeloEstrella;

    // Resumen Final (Tarjeta de captura)
    document.getElementById('f-val1').textContent = u.sales || u.equipoSales;
    document.getElementById('f-val2').textContent = u.deeds || u.asesorEstrella;
    document.getElementById('f-val3').textContent = moneyF.format(u.monto_escrituras || u.equipoMonto);
    document.getElementById('f-dev-label').textContent = `${u.role.toUpperCase()} | ${u.desarrollo.toUpperCase()}`;
}

// 5. MOTOR DE HISTORIAS
function initExperience() {
    document.body.setAttribute('data-dev', currentUser.desarrollo.toLowerCase());
    
    // Logo dinámico
    const logoImg = (currentUser.desarrollo.toLowerCase() === 'sendas') ? 'logo-sadasi.png' : 'logo-altta.png';
    document.getElementById('brandLogo').src = `img/${logoImg}`;

    renderValues(currentUser);

    document.getElementById('login').classList.remove('active');
    document.getElementById('tapZones').style.display = 'flex';
    
    initProgressBars();
    showStory(0);
}

function initProgressBars() {
    const root = document.getElementById('progressRoot');
    const count = document.querySelectorAll('.story').length;
    root.innerHTML = '';
    for (let i = 0; i < count; i++) {
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

    // Confetti en la última pantalla
    if (index === stories.length - 1) {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: [getComputedStyle(document.body).getPropertyValue('--accent'), '#ffffff']
        });
    }

    resetTimer();
}

// 6. NAVEGACIÓN Y PAUSA
function resetTimer() {
    clearInterval(storyTimer);
    const storyCount = document.querySelectorAll('.story').length;
    storyTimer = setInterval(() => {
        if (current < storyCount - 1) showStory(current + 1);
        else clearInterval(storyTimer);
    }, 5000);
}

document.getElementById('btnNext').onclick = () => {
    const storyCount = document.querySelectorAll('.story').length;
    if (current < storyCount - 1) showStory(current + 1);
};

document.getElementById('btnPrev').onclick = () => {
    if (current > 0) showStory(current - 1);
};

// Pausar al mantener presionado
const zones = document.getElementById('tapZones');
zones.onmousedown = () => {
    clearInterval(storyTimer);
    const activeFill = document.querySelector('.progress-bar.active .progress-fill');
    if (activeFill) activeFill.style.animationPlayState = 'paused';
};
zones.onmouseup = () => {
    resetTimer();
    const activeFill = document.querySelector('.progress-bar.active .progress-fill');
    if (activeFill) activeFill.style.animationPlayState = 'running';
};

// 7. DESCARGA DE IMAGEN (HTML2CANVAS)
document.getElementById('exportBtn').onclick = function() {
    const area = document.getElementById('capture-area');
    
    // Feedback visual de procesando
    this.innerText = "GENERANDO IMAGEN...";
    this.style.opacity = "0.5";

    html2canvas(area, {
        backgroundColor: "#000",
        scale: 3, // Calidad alta para WhatsApp
        useCORS: true,
        allowTaint: true
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = `Wrapped2025_${currentUser.name.replace(/ /g, '_')}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
        
        this.innerText = "COMPARTIR MI ÉXITO";
        this.style.opacity = "1";
    }).catch(err => {
        alert("Error al generar la imagen. Intenta de nuevo.");
        console.error(err);
    });
};
