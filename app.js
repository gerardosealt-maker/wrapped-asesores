let data = [], current = 0, currentUser = null, storyTimer = null;
const moneyF = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });

fetch('./data.json').then(r => r.json()).then(d => { data = d; });

const frases = {
    prospectos: ["¡Vaya forma de llenar el embudo!", "Tu imán para atraer clientes está al máximo.", "Hiciste que todos miraran hacia acá.", "Radar de prospectos imparable."],
    bajas: {
        pocas: ["¿Bajas? Ni las vimos. Control total del cierre.", "Reloj suizo: nada se te cae.", "Terror de las cancelaciones."],
        algunas: ["Gajes del oficio. ¡Te levantaste con todo!", "Unas se van, pero las que cierras valen oro.", "El éxito tiene baches, tú los saltaste."]
    },
    metaCoord: {
        superada: ["¡Liderazgo Nivel Leyenda!", "¡Dejaste la vara altísima!", "Superaste la meta con maestría."],
        casi: ["¡Estuvieron a nada! Casi se rinden ante ustedes.", "Faltó nada, el esfuerzo fue titánico.", "En 2026 la meta no sabrá qué pasó."],
        lejos: ["Un año de retos. ¡En 2026 vamos por la revancha!", "Tu liderazgo prepara el gran regreso."]
    },
    ventasAsesor: ["Colmillo afilado para los cierres.", "Batalla ganada con pura estrategia.", "Persistencia nivel experto.", "Convertiste cada 'no' en un 'sí'."]
};

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

document.getElementById('startBtn').onclick = () => {
    const val = document.getElementById('agentInput').value.trim().toLowerCase();
    const user = data.find(u => u.name.toLowerCase().includes(val) || u.id.toLowerCase() === val);
    if (!user) return alert("Nombre no encontrado.");
    
    const processedData = data.map(u => u.role.toLowerCase() === 'coordinador' ? processCoordinator(u) : { ...u, isBoss: false });
    currentUser = processedData.find(u => u.id === user.id);
    const sorted = [...processedData].sort((a, b) => b.monto_escrituras - a.monto_escrituras);
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
        visits: team.reduce((s, a) => s + (a.visits || 0), 0),
        deeds: team.reduce((s, a) => s + (a.deeds || 0), 0),
        sales: coord.equipoSales,
        targetSales: coord.metaEquipo || 0,
        monto_escrituras: coord.equipoMonto,
        cancelaciones: coord.equipoCancelaciones,
        topModel: coord.modeloEstrella,
        asesorEstrella: coord.asesorEstrella,
        mejorMes: coord.mejorMes || "Diciembre",
        ventasMejorMes: team.reduce((s, a) => s + (a.ventasMejorMes || 0), 0)
    };
}

function renderValues(u) {
    const fileName = u.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[ñÑ]/g, "n").replace(/\s+/g, '_');
    document.querySelectorAll('.u-photo').forEach(img => {
        const ext = ['.jpg', '.JPG', '.png', '.jpeg'];
        let i = 0;
        const load = () => {
            if (i < ext.length) { img.src = fileName + ext[i]; i++; }
            else { img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}&background=FF8200&color=fff`; }
        };
        img.onerror = load;
        load();
    });

    document.querySelectorAll('.u-name-display').forEach(el => el.textContent = u.name);
    document.getElementById('u-prospects').textContent = u.prospects;
    document.getElementById('p-prospects-txt').textContent = getRandom(frases.prospectos);
    document.getElementById('u-cancels').textContent = u.cancelaciones;
    document.getElementById('p-cancels-txt').textContent = getRandom(frases.bajas[u.cancelaciones < 10 ? 'pocas' : 'algunas']);
    document.getElementById('u-sales').textContent = u.sales;

    if (u.isBoss) {
        const porc = (u.sales / u.targetSales) * 100;
        let msg = porc >= 100 ? getRandom(frases.metaCoord.superada) : (porc >= 85 ? getRandom(frases.metaCoord.casi) : getRandom(frases.metaCoord.lejos));
        document.getElementById('p-sales-txt').innerHTML = `Lograste ${u.sales} de ${u.targetSales} ventas. <br><strong>${msg}</strong>`;
        document.getElementById('l-p8').textContent = "TU PIEZA CLAVE";
        document.getElementById('u-topModel').textContent = u.asesorEstrella;
    } else {
        document.getElementById('p-sales-txt').innerHTML = `${u.sales} ventas logradas. <br><strong>${getRandom(frases.ventasAsesor)}</strong>`;
        document.getElementById('l-p8').textContent = "TU MODELO TOP";
        document.getElementById('u-topModel').textContent = u.topModel;
    }

    document.getElementById('u-deeds').textContent = u.deeds;
    document.getElementById('u-monto-deeds').textContent = moneyF.format(u.monto_escrituras);
    document.getElementById('u-mejorMes').textContent = u.mejorMes.toUpperCase();
    document.getElementById('f-val-rank').textContent = "#" + u.rankPos;
    document.getElementById('f-val-sales').textContent = u.sales;
    document.getElementById('f-val-deeds').textContent = u.deeds;
    document.getElementById('f-dev-label').textContent = `${u.role.toUpperCase()} | ${u.desarrollo.toUpperCase()}`;
    document.getElementById('p-final-2026').textContent = u.isBoss ? "Tu liderazgo es el motor de Sadasi. ¡2026 será histórico!" : "Afila el colmillo, el 2026 es tuyo.";
}

function initProgressBars() {
    const root = document.getElementById('progressRoot');
    root.innerHTML = '';
    const screens = document.querySelectorAll('.story');
    screens.forEach(() => { root.innerHTML += '<div class="progress-bar"><div class="progress-fill"></div></div>'; });
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

function resetTimer() { clearInterval(storyTimer); storyTimer = setInterval(() => { if (current < document.querySelectorAll('.story').length - 1) showStory(current + 1); }, 5000); }
document.getElementById('btnNext').onclick = () => { if (current < document.querySelectorAll('.story').length - 1) showStory(current + 1); };
document.getElementById('btnPrev').onclick = () => { if (current > 0) showStory(current - 1); };

document.getElementById('exportBtn').onclick = () => {
    html2canvas(document.getElementById('capture-area'), { backgroundColor: "#000", scale: 2 }).then(canvas => {
        const link = document.createElement('a');
        link.download = `Wrapped2025_${currentUser.name}.png`;
        link.href = canvas.toDataURL();
        link.click();
    });
};

function initExperience() {
    document.body.setAttribute('data-dev', currentUser.desarrollo.toLowerCase());
    document.getElementById('brandLogo').src = (currentUser.desarrollo.toLowerCase() === 'sendas') ? 'logo-sadasi.png' : 'logo-altta.png';
    document.getElementById('progressRoot').style.display = 'flex';
    renderValues(currentUser);
    document.getElementById('login').classList.remove('active');
    document.getElementById('tapZones').style.display = 'flex';
    initProgressBars();
    showStory(0);
}
