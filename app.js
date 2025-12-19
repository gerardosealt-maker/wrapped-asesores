let data = [], current = 0, currentUser = null, storyTimer = null;
const moneyF = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });

// Carga inicial segura
fetch('./data.json')
    .then(r => r.json())
    .then(d => { data = d; console.log("Datos cargados correctamente"); })
    .catch(e => console.error("Error cargando JSON:", e));

const frases = {
    prospectos: ["¡Tu imán de clientes está al máximo!", "No dejaste escapar a nadie.", "El radar de prospectos trabajó extra.", "Medio mundo puso el ojo en ti."],
    bajas: {
        pocas: ["¡Control total del cierre!", "Reloj suizo: nada se te cae.", "Terror de las cancelaciones."],
        algunas: ["Gajes del oficio. ¡Te levantaste con todo!", "Unas se van, pero las que cierras valen oro."]
    },
    metaCoord: {
        superada: ["¡Liderazgo Nivel Leyenda!", "¡Dejaste la vara altísima!", "Superaste la meta con maestría."],
        casi: ["¡Casi lo logran! El esfuerzo fue titánico.", "¡Por un pelo! En 2026 esa meta cae."],
        lejos: ["Año de aprendizaje. ¡Vamos por la revancha!", "El marcador no define tu liderazgo."]
    },
    ventasAsesor: ["Colmillo afilado para los cierres.", "Batalla ganada con pura estrategia.", "Tu persistencia nos hace grandes."]
};

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

document.getElementById('startBtn').onclick = () => {
    if (data.length === 0) return alert("Cargando datos, espera un segundo...");
    
    const val = document.getElementById('agentInput').value.trim().toLowerCase();
    const user = data.find(u => u.name.toLowerCase().includes(val) || u.id.toLowerCase() === val);
    
    if (!user) return alert("Nombre no encontrado. Intenta con tu nombre de pila.");
    
    // Procesar datos de coordinadores o asesores
    const processedData = data.map(u => u.role.toLowerCase() === 'coordinador' ? processCoordinator(u) : { ...u, isBoss: false });
    currentUser = processedData.find(u => u.id === user.id);
    
    // Calcular Ranking basado en monto escriturado
    const sorted = [...processedData].sort((a, b) => (b.monto_escrituras || 0) - (a.monto_escrituras || 0));
    currentUser.rankPos = sorted.findIndex(u => u.id === currentUser.id) + 1;

    document.getElementById('music').play().catch(() => {});
    initExperience();
};

function processCoordinator(coord) {
    const team = data.filter(u => u.desarrollo === coord.desarrollo && u.role === 'asesor');
    return {
        ...coord, 
        isBoss: true,
        prospects: team.reduce((s, a) => s + (a.prospects || 0), 0),
        deeds: team.reduce((s, a) => s + (a.deeds || 0), 0),
        sales: coord.equipoSales || 0,
        targetSales: coord.metaEquipo || 1,
        monto_escrituras: coord.equipoMonto || 0,
        cancelaciones: coord.equipoCancelaciones || 0,
        topModel: coord.modeloEstrella,
        asesorEstrella: coord.asesorEstrella,
        mejorMes: coord.mejorMes || "Diciembre"
    };
}

function renderValues(u) {
    // CORRECCIÓN DE FOTOS: Formato armando_vargas.jpg
    const fileName = u.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[ñÑ]/g, "n").trim().replace(/\s+/g, '_');
    
    document.querySelectorAll('.u-photo').forEach(img => {
        const tryExts = [`${fileName}.jpg`, `${fileName}.JPG`, `${fileName}.png`, `${fileName}.jpeg`];
        let idx = 0;
        const tryLoad = () => {
            if (idx < tryExts.length) {
                img.src = tryExts[idx];
                idx++;
            } else {
                img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}&background=FF8200&color=fff`;
            }
        };
        img.onerror = tryLoad;
        tryLoad();
    });

    document.querySelectorAll('.u-name-display').forEach(el => el.textContent = u.name);
    document.getElementById('u-prospects').textContent = u.prospects || 0;
    document.getElementById('p-prospects-txt').textContent = getRandom(frases.prospectos);
    document.getElementById('u-cancels').textContent = u.cancelaciones || 0;
    document.getElementById('p-cancels-txt').textContent = getRandom(frases.bajas[u.cancelaciones < 8 ? 'pocas' : 'algunas']);
    document.getElementById('u-sales').textContent = u.sales || 0;

    if (u.isBoss) {
        const porc = (u.sales / u.targetSales) * 100;
        let m = porc >= 100 ? getRandom(frases.metaCoord.superada) : (porc >= 85 ? getRandom(frases.metaCoord.casi) : getRandom(frases.metaCoord.lejos));
        document.getElementById('p-sales-txt').innerHTML = `Meta Equipo: ${u.targetSales} ventas.<br><strong>${m}</strong>`;
        document.getElementById('l-p8').textContent = "ASESOR ESTRELLA";
        document.getElementById('u-topModel').textContent = u.asesorEstrella;
    } else {
        document.getElementById('p-sales-txt').innerHTML = `${u.sales} cierres logrados.<br><strong>${getRandom(frases.ventasAsesor)}</strong>`;
        document.getElementById('l-p8').textContent = "MODELO TOP";
        document.getElementById('u-topModel').textContent = u.topModel;
    }

    document.getElementById('u-deeds').textContent = u.deeds || 0;
    document.getElementById('u-monto-deeds').textContent = moneyF.format(u.monto_escrituras || 0);
    document.getElementById('u-mejorMes').textContent = (u.mejorMes || "Diciembre").toUpperCase();
    document.getElementById('f-val-rank').textContent = "#" + u.rankPos;
    document.getElementById('f-val-sales').textContent = u.sales || 0;
    document.getElementById('f-val-deeds').textContent = u.deeds || 0;
    document.getElementById('p-final-2026').textContent = u.isBoss ? "Tu liderazgo guía el éxito. ¡Vamos por un 2026 imparable!" : "Afila el colmillo, el 2026 te espera.";
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
    if (index === 3 || index === 7) confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    resetTimer();
}

function resetTimer() { 
    clearInterval(storyTimer); 
    storyTimer = setInterval(() => { 
        if (current < document.querySelectorAll('.story').length - 1) showStory(current + 1); 
    }, 5000); 
}

document.getElementById('btnNext').onclick = () => { if (current < document.querySelectorAll('.story').length - 1) showStory(current + 1); };
document.getElementById('btnPrev').onclick = () => { if (current > 0) showStory(current - 1); };

function initExperience() {
    document.body.setAttribute('data-dev', currentUser.desarrollo.toLowerCase());
    document.getElementById('brandLogo').src = (currentUser.desarrollo.toLowerCase() === 'sendas') ? 'logo-sadasi.png' : 'logo-altta.png';
    document.getElementById('login').classList.remove('active');
    document.getElementById('progressRoot').style.display = 'flex';
    document.getElementById('storyHeader').style.display = 'flex';
    document.getElementById('tapZones').style.display = 'flex';
    
    // Crear barras de progreso dinámicamente según el número de secciones
    const root = document.getElementById('progressRoot');
    root.innerHTML = '';
    document.querySelectorAll('.story').forEach(() => root.innerHTML += '<div class="progress-bar"><div class="progress-fill"></div></div>');
    
    renderValues(currentUser);
    showStory(0);
}
