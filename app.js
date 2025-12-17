let data, current = 0, currentUser;
const screens = document.querySelectorAll('.screen');
const music = document.getElementById('music');
const money = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });

// 1. CARGA DE DATOS
fetch('./data.json')
  .then(r => r.json())
  .then(j => {
      data = j;
      document.getElementById('agentInput').addEventListener('input', (e) => {
          document.getElementById('startBtn').disabled = e.target.value.length < 3;
      });
  });

// 2. INICIO DE EXPERIENCIA
document.getElementById('startBtn').onclick = () => {
    const id = document.getElementById('agentInput').value.trim();
    currentUser = data.find(u => u.id === id);

    if (!currentUser) return alert("ID no encontrado");

    setupBrand(currentUser.desarrollo);
    
    if (currentUser.role === 'asesor') {
        setupAdvisor(currentUser);
    } else {
        setupCoordinator(currentUser);
    }

    startExperience();
};

function setupBrand(des) {
    const logoUrl = (des === 'Sendas') ? 'logo-sadasi.png' : 'logo-altta.png';
    document.getElementById('brandHeader').innerHTML = `<img src="${logoUrl}" style="max-height: 60px;">`;
}

function setupAdvisor(user) {
    document.getElementById('welcome').textContent = user.name;
    document.getElementById('roleTitle').textContent = `Asesor de ${user.desarrollo}`;
    document.getElementById('introCopy').textContent = "Tu esfuerzo transformó vidas este año.";
    document.getElementById('cancellations').textContent = user.cancelaciones;
    document.getElementById('moneyValue').textContent = money.format(user.monto_escrituras);

    document.querySelectorAll('.coord-only').forEach(el => el.remove());

    const accuracy = ((user.sales / user.appointments) * 100).toFixed(0);
    document.getElementById('finalMetrics').innerHTML = `
        <div class="summary-card"><h3>${user.sales}</h3><small>Ventas</small></div>
        <div class="summary-card"><h3>${accuracy}%</h3><small>Certeza</small></div>
        <div class="summary-card"><h3>${user.totalDeeds}</h3><small>Escrituras</small></div>
    `;
}

function setupCoordinator(coord) {
    const team = data.filter(u => u.role === 'asesor' && u.desarrollo === coord.desarrollo);
    document.getElementById('welcome').textContent = coord.name;
    document.getElementById('roleTitle').textContent = `Coordinador ${coord.desarrollo}`;
    document.getElementById('introCopy').textContent = "Aquí el impacto de tu liderazgo.";

    const tSales = team.reduce((s, a) => s + a.sales, 0);
    const tDeeds = team.reduce((s, a) => s + a.totalDeeds, 0);
    const tMoney = team.reduce((s, a) => s + a.monto_escrituras, 0);

    document.getElementById('teamSales').textContent = tSales;
    document.getElementById('teamDeeds').textContent = tDeeds;
    document.getElementById('teamMoney').textContent = money.format(tMoney);

    // ANALÍTICA DE CERTEZA
    let bestAcc = -1, accurateA = null, topS = team[0];
    team.forEach(a => {
        const acc = a.sales / a.appointments;
        if (acc > bestAcc) { bestAcc = acc; accurateA = a; }
        if (a.sales > topS.sales) topS = a;
    });

    document.getElementById('topAccuracyName').textContent = accurateA.name;
    document.getElementById('topAccuracyStats').textContent = `Efectividad del ${(bestAcc*100).toFixed(0)}% de cierre por cita.`;
    document.getElementById('topSalesName').textContent = topS.name;

    document.querySelectorAll('.advisor-only').forEach(el => el.remove());
    document.getElementById('finalMetrics').innerHTML = `
        <div class="summary-card"><h3>${tSales}</h3><small>Ventas Equipo</small></div>
        <div class="summary-card"><h3>${tDeeds}</h3><small>Escrituras</small></div>
    `;
}

// 3. NAVEGACIÓN
function startExperience() {
    screens[0].classList.remove('active');
    current = 1;
    screens[current].classList.add('active');
    music.play().catch(()=>{});
    initDots();
}

function initDots() {
    const dotsCont = document.getElementById('navigation-dots');
    const actualScreens = document.querySelectorAll('.screen');
    actualScreens.forEach((_, i) => {
        if(i === 0) return;
        const d = document.createElement('div');
        d.className = 'dot';
        dotsCont.appendChild(d);
    });
    updateDots();
}

function updateDots() {
    const ds = document.querySelectorAll('.dot');
    ds.forEach((d, i) => d.classList.toggle('active', i === current - 1));
}

function next() {
    const activeScreens = document.querySelectorAll('.screen');
    if (current < activeScreens.length - 1) {
        activeScreens[current].classList.remove('active');
        current++;
        activeScreens[current].classList.add('active');
        updateDots();
    }
}

let startY = 0;
document.addEventListener('touchstart', e => startY = e.touches[0].clientY);
document.addEventListener('touchend', e => {
    const delta = startY - e.changedTouches[0].clientY;
    if (delta > 50) next();
});

// 4. EXPORTAR
document.getElementById('exportBtn').onclick = () => {
    html2canvas(document.querySelector('.summary-screen')).then(canvas => {
        const link = document.createElement('a');
        link.download = 'MiWrapped2024.png';
        link.href = canvas.toDataURL();
        link.click();
    });
};
