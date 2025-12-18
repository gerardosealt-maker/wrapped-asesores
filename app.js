let data = [], current = 0, currentUser = null, storyTimer = null;
const moneyF = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });

// 1. CARGA DE DATOS
fetch('./data.json')
    .then(r => r.json())
    .then(d => { data = d; })
    .catch(e => console.error("Error cargando JSON:", e));

// 2. LÓGICA DE INICIO
document.getElementById('startBtn').onclick = () => {
    const val = document.getElementById('agentInput').value.trim().toLowerCase();
    const user = data.find(u => u.name.toLowerCase().includes(val) || u.id.toLowerCase() === val);
    
    if (!user) return alert("Nombre no encontrado. Intenta con tu nombre completo.");
    
    // Procesar Rankings y Sumatorias
    const processedData = data.map(u => u.role.toLowerCase() === 'coordinador' ? processCoordinator(u) : { ...u, isBoss: false });
    currentUser = processedData.find(u => u.id === user.id);
    
    // Ranking basado en Monto de Escrituras
    const sorted = [...processedData].sort((a, b) => b.monto_escrituras - a.monto_escrituras);
    currentUser.rankPos = sorted.findIndex(u => u.id === currentUser.id) + 1;

    document.getElementById('music').play().catch(() => {});
    initExperience();
};

// 3. CÁLCULOS PARA COORDINADORES (Suma el esfuerzo del equipo)
function processCoordinator(coord) {
    const team = data.filter(u => u.desarrollo === coord.desarrollo && u.role === 'asesor');
    return {
        ...coord,
        isBoss: true,
        prospects: team.reduce((s, a) => s + (a.prospects || 0), 0),
        visits: team.reduce((s, a) => s + (a.visits || 0), 0),
        citas: team.reduce((s, a) => s + (a.citas || 0), 0),
        deeds: team.reduce((s, a) => s + (a.deeds || 0), 0), // Suma de escrituras físicas
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

// 4. RENDERIZADO TOTAL DE PANTALLAS
function renderValues(u) {
    // --- LÓGICA DE FOTO (Súper compatible) ---
    const fileName = u.name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[ñÑ]/g, "n")
        .replace(/\s+/g, '_');

    document.querySelectorAll('.u-photo').forEach(img => {
        // Intenta cargar con .jpg, si falla intenta .JPG, si falla intenta .png
        const extensions = ['.jpg', '.JPG', '.png', '.jpeg'];
        let currentIndex = 0;

        img.src = fileName + extensions[currentIndex];
        
        img.onerror = () => {
            currentIndex++;
            if (currentIndex < extensions.length) {
                img.src = fileName + extensions[currentIndex];
            } else {
                // Si nada funciona, Avatar con iniciales
                img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}&background=FF8200&color=fff&size=256`;
            }
        };
    });

    document.querySelectorAll('.u-name-display').forEach(el => el.textContent = u.name);

    // Pantalla 1: Intro
    document.getElementById('role-label-intro').textContent = u.isBoss ? "LA JEFA / EL JEFE," : "HOLA,";
    document.getElementById('p-intro-txt').textContent = u.isBoss 
        ? `Liderar ${u.desarrollo} requiere colmillo. Aquí los números de tu mando en 2025.` 
        : `Un año de perseguir cierres y no soltar ni un solo prospecto en ${u.desarrollo}.`;

    // Pantalla 2: Prospectos
    document.getElementById('u-prospects').textContent = u.prospects;
    document.getElementById('l-p2-sub').textContent = u.isBoss ? "LEADS DE EQUIPO" : "PROSPECTOS";
    document.getElementById('p-prospects-txt').textContent = u.isBoss
        ? `Tu equipo generó ${u.prospects} interesados. ¡Vaya forma de llenar el embudo!`
        : `De ${u.prospects} personas, lograste que pusieran el ojo en nosotros.`;

    // Pantalla 3: Visitas
    document.getElementById('u-visits').textContent = u.visits;
    document.getElementById('p-visits-txt').textContent = u.isBoss
        ? `Lograron ${u.visits} visitas. Tu equipo no dejó de mostrar casas ni un segundo.`
        : `Atendiste ${u.visits} visitas. El desgaste de suela valió la pena.`;

    // Pantalla 4: Cancelaciones
    document.getElementById('u-cancels').textContent = u.cancelaciones;
    document.getElementById('p-cancels-txt').textContent = u.isBoss
        ? `Solo ${u.cancelaciones} bajas en todo el equipo. Eso es tener el control total del cierre.`
        : `¿Bajas? Solo gajes del oficio. Lo importante es cómo te levantaste de esas.`;

    // Pantalla 5: Mejor Mes
    document.getElementById('u-mejorMes').textContent = u.mejorMes.toUpperCase();
    document.getElementById('p-mes-txt').textContent = u.isBoss 
        ? `En ${u.mejorMes} tu equipo cerró ${u.ventasMejorMes} ventas. ¡Imbatibles!`
        : `Tu mejor racha: ${u.ventasMejorMes} cierres solo en este mes.`;

    // Pantalla 6: Ventas
    document.getElementById('u-sales').textContent = u.sales;
    document.getElementById('p-sales-txt').textContent = u.isBoss
        ? `¡${u.sales} ventas! El marcador no miente: eres líder de puros ganadores.`
        : `Cerraste ${u.sales} ventas. Ese colmillo para el negocio está más afilado que nunca.`;

    // Pantalla 7: Escrituras
    document.getElementById('u-deeds').textContent = u.deeds;
    document.getElementById('u-monto-deeds').textContent = moneyF.format(u.monto_escrituras);

    // Pantalla 8: Top
    if (u.isBoss) {
        document.getElementById('l-p8').textContent = "TU PIEZA CLAVE";
        document.getElementById('u-topModel').textContent = u.asesorEstrella;
        document.getElementById('p-model-txt').textContent = `Quien más te ayudó a empujar el barco de ${u.desarrollo}. ¡Vaya dupla!`;
    } else {
        document.getElementById('l-p8').textContent = "TU FAVORITO";
        document.getElementById('u-topModel').textContent = u.topModel;
        document.getElementById('p-model-txt').textContent = `Nadie domina la venta del ${u.topModel} como tú.`;
    }

    // Pantalla 9: Resumen Final (Ranking dinámico)
    document.getElementById('f-status-tag').textContent = u.isBoss ? "LIDERAZGO NIVEL SADASI" : "ASESOR DE ALTO IMPACTO";
    document.getElementById('f-val-sales').textContent = u.sales;
    document.getElementById('f-val-deeds').textContent = u.deeds;
    document.getElementById('f-val-rank').textContent = "#" + u.rankPos;
    document.getElementById('f-val-eff').textContent = u.isBoss ? u.eficiencia : Math.round((u.sales/u.visits)*100) + "%";
    document.getElementById('f-dev-label').textContent = `${u.role.toUpperCase()} | ${u.desarrollo.toUpperCase()}`;

    // Pantalla 10: Cierre 2026
    document.getElementById('p-final-2026').textContent = u.isBoss 
        ? `Tu liderazgo es el motor de Sadasi. Prepárate para guiar un 2026 histórico.`
        : `Afila el colmillo, el 2026 viene con metas que solo tú puedes romper.`;
}

// 5. NAVEGACIÓN Y SISTEMA
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
    if (index === 6 || index === 8) confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    resetTimer();
}

function resetTimer() {
    clearInterval(storyTimer);
    storyTimer = setInterval(() => { if (current < 9) showStory(current + 1); }, 5000);
}

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
