let data = [], current = 0, currentUser = null, storyTimer = null;
const moneyF = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });

// CARGA DE DATOS
fetch('./data.json').then(r => r.json()).then(d => { data = d; });

document.getElementById('startBtn').onclick = () => {
    const val = document.getElementById('agentInput').value.trim().toLowerCase();
    const user = data.find(u => u.name.toLowerCase().includes(val));
    if (!user) return alert("Nombre no encontrado.");
    
    // 1. Procesamos a todos para calcular ranking real
    const processedData = data.map(u => u.role.toLowerCase() === 'coordinador' ? processCoordinator(u) : { ...u, isBoss: false });
    
    // 2. Definimos al usuario actual
    currentUser = processedData.find(u => u.id === user.id);
    
    // 3. Calculamos Ranking (basado en monto_escrituras)
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
        citas: team.reduce((s, a) => s + (a.citas || 0), 0),
        deeds: team.reduce((s, a) => s + (a.deeds || 0), 0), // SUMA DE EQUIPO
        sales: coord.equipoSales,
        monto_escrituras: coord.equipoMonto,
        cancelaciones: coord.equipoCancelaciones,
        topModel: coord.modeloEstrella,
        asesorEstrella: coord.asesorEstrella,
        eficiencia: coord.eficienciaEquipo,
        mejorMes: coord.mejorMes || "Diciembre",
        ventasMejorMes: team.reduce((s, a) => s + (a.ventasMejorMes || 0), 0)
    };
}

function renderValues(u) {
    // FOTO: Normalización estricta (Mayra Muñoz -> Mayra_Munoz.jpg)
    const fileName = u.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ñ/g, "n").replace(/Ñ/g, "n").replace(/\s+/g, '_');
    document.querySelectorAll('.u-photo').forEach(img => {
        img.src = `${fileName}.jpg`;
        img.onerror = () => { img.src = 'default.jpg'; };
    });

    document.querySelectorAll('.u-name-display').forEach(el => el.textContent = u.name);

    // 1. INTRO
    document.getElementById('role-label-intro').textContent = u.isBoss ? "LA JEFA / EL JEFE," : "HOLA,";
    document.getElementById('p-intro-txt').textContent = u.isBoss 
        ? `Llevar las riendas de ${u.desarrollo} requiere colmillo. Aquí los números de tu mando.` 
        : `Un año de perseguir cierres y no soltar ni un solo prospecto en ${u.desarrollo}.`;

    // 2. PROSPECTOS (Jiribilla)
    document.getElementById('u-prospects').textContent = u.prospects;
    document.getElementById('l-p2-sub').textContent = u.isBoss ? "LEADS DE EQUIPO" : "PROSPECTOS";
    document.getElementById('p-prospects-txt').textContent = u.isBoss
        ? `Tu equipo atrajo a ${u.prospects} interesados. ¡Vaya forma de llenar el embudo!`
        : `De ${u.prospects} personas, lograste que pusieran el ojo en nosotros.`;

    // 3. VISITAS
    document.getElementById('u-visits').textContent = u.visits;
    document.getElementById('p-visits-txt').textContent = u.isBoss
        ? `Lograron ${u.visits} visitas. Tu equipo no dejó de mostrar casas ni un segundo.`
        : `Atendiste ${u.visits} visitas. El desgaste de suela valió la pena.`;

    // 4. CANCELACIONES (Jiribilla)
    document.getElementById('u-cancels').textContent = u.cancelaciones;
    document.getElementById('p-cancels-txt').textContent = u.isBoss
        ? `Solo ${u.cancelaciones} bajas en todo el equipo. Eso es tener el control total del cierre.`
        : `¿Bajas? Solo gajes del oficio. Lo importante es cómo te levantaste de esas.`;

    // 5. MEJOR MES
    document.getElementById('u-mejorMes').textContent = u.mejorMes.toUpperCase();
    document.getElementById('p-mes-txt').textContent = u.isBoss 
        ? `En ${u.mejorMes} tu equipo cerró ${u.ventasMejorMes} ventas. ¡Imbatibles!`
        : `Tu mejor racha: ${u.ventasMejorMes} cierres solo en este mes.`;

    // 6. VENTAS
    document.getElementById('u-sales').textContent = u.sales;
    document.getElementById('p-sales-txt').textContent = u.isBoss
        ? `¡${u.sales} ventas! El marcador no miente: eres líder de puros ganadores.`
        : `Cerraste ${u.sales} ventas. Ese colmillo para el negocio está más afilado que nunca.`;

    // 7. ESCRITURAS
    document.getElementById('u-deeds').textContent = u.deeds;
    document.getElementById('u-monto-deeds').textContent = moneyF.format(u.monto_escrituras);

    // 8. TOP DEL AÑO
    if (u.isBoss) {
        document.getElementById('l-p8').textContent = "TU PIEZA CLAVE";
        document.getElementById('u-topModel').textContent = u.asesorEstrella;
        document.getElementById('p-model-txt').textContent = `Quien más te ayudó a empujar el barco de ${u.desarrollo}. ¡Vaya dupla!`;
    } else {
        document.getElementById('l-p8').textContent = "TU FAVORITO";
        document.getElementById('u-topModel').textContent = u.topModel;
        document.getElementById('p-model-txt').textContent = `Nadie domina la venta del ${u.topModel} como tú.`;
    }

    // 9. RESUMEN FINAL
    document.getElementById('f-status-tag').textContent = u.isBoss ? "LIDERAZGO NIVEL SADASI" : "ASESOR DE ALTO IMPACTO";
    document.getElementById('f-val-sales').textContent = u.sales;
    document.getElementById('f-val-deeds').textContent = u.deeds;
    document.getElementById('f-val-rank').textContent = "#" + u.rankPos;
    document.getElementById('f-val-eff').textContent = u.isBoss ? u.eficiencia : Math.round((u.sales/u.visits)*100) + "%";
    document.getElementById('f-dev-label').textContent = `${u.role.toUpperCase()} | ${u.desarrollo.toUpperCase()}`;

    // 10. CIERRE 2026 (Personalizado)
    document.getElementById('p-final-2026').textContent = u.isBoss 
        ? `Tu liderazgo es el motor de Sadasi. Prepárate para guiar un 2026 histórico.`
        : `Afila el colmillo, que el 2026 viene con metas que solo tú puedes romper.`;
}

// FUNCIONES DE INTERFAZ
function initProgressBars() {
    const root = document.getElementById('progressRoot');
    const count = document.querySelectorAll('.story').length;
    root.innerHTML = '';
    for (let i = 0; i < count; i++) root.innerHTML += '<div class="progress-bar"><div class="progress-fill"></div></div>';
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
    if (index === 8) confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    resetTimer();
}
function resetTimer() { clearInterval(storyTimer); storyTimer = setInterval(() => { if (current < 9) showStory(current + 1); }, 5000); }
document.getElementById('btnNext').onclick = () => { if (current < 9) showStory(current + 1); };
document.getElementById('btnPrev').onclick = () => { if (current > 0) showStory(current - 1); };
document.getElementById('exportBtn').onclick = function() {
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
