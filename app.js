let data, current = 0, currentUser;
const screens = document.querySelectorAll('.screen');
const music = document.getElementById('music');
const money = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });

fetch('./data.json')
  .then(r => r.json())
  .then(j => {
      data = j;
      document.getElementById('agentInput').oninput = (e) => {
          document.getElementById('startBtn').disabled = e.target.value.length < 3;
      };
  });

function findBestMonth(monthlyData) {
    if(!monthlyData) return { name: "N/A", score: 0 };
    let best = { name: '', score: -1 };
    for (const [month, stats] of Object.entries(monthlyData)) {
        const score = (stats.sales * 3) + (stats.deeds * 5);
        if (score > best.score) {
            best = { name: month, score: score, sales: stats.sales, deeds: stats.deeds };
        }
    }
    return best;
}

document.getElementById('startBtn').onclick = () => {
    const id = document.getElementById('agentInput').value.trim();
    currentUser = data.find(u => u.id === id);
    if (!currentUser) return alert("ID no encontrado");

    setupBrand(currentUser.desarrollo);
    
    if (currentUser.role === 'asesor') {
        const best = findBestMonth(currentUser.monthlyData);
        document.getElementById('welcome').textContent = currentUser.name;
        document.getElementById('roleTitle').textContent = `Asesor ${currentUser.desarrollo}`;
        document.getElementById('bestMonthName').textContent = best.name.toUpperCase();
        document.getElementById('bestMonthCopy').textContent = `En ${best.name} lograste ${best.sales} cierres. ¡Tu punto más alto!`;
        document.getElementById('moneyValue').textContent = money.format(currentUser.monto_escrituras);
        
        document.querySelectorAll('.coord-only').forEach(el => el.remove());
        
        // Resumen final asesor
        document.getElementById('finalMetrics').innerHTML = `
            <div class="summary-card"><h3>${currentUser.sales}</h3><small>Ventas</small></div>
            <div class="summary-card"><h3>${best.name}</h3><small>Mejor Mes</small></div>
            <div class="summary-card"><h3>${((currentUser.sales/currentUser.appointments)*100).toFixed(0)}%</h3><small>Certeza</small></div>
        `;
    } else {
        setupCoordinator(currentUser);
    }
    startExperience();
};

function setupCoordinator(coord) {
    const team = data.filter(u => u.role === 'asesor' && u.desarrollo === coord.desarrollo);
    document.getElementById('teamName').textContent = `Equipo ${coord.desarrollo}`;
    
    const tSales = team.reduce((s, a) => s + a.sales, 0);
    const tDeeds = team.reduce((s, a) => s + a.totalDeeds, 0);
    const tMoney = team.reduce((s, a) => s + a.monto_escrituras, 0);

    document.getElementById('teamSales').textContent = tSales;
    document.getElementById('teamDeeds').textContent = tDeeds;
    document.getElementById('teamMoney').textContent = money.format(tMoney);

    // Analítica Certeza
    let bestAcc = -1, accurateA = team[0];
    team.forEach(a => {
        const acc = a.sales / a.appointments;
        if (acc > bestAcc) { bestAcc = acc; accurateA = a; }
    });

    document.getElementById('topAccuracyName').textContent = accurateA.name;
    document.getElementById('topAccuracyStats').textContent = `Efectividad de cierre: ${(bestAcc*100).toFixed(0)}%`;

    document.querySelectorAll('.advisor-only').forEach(el => el.remove());
}

function setupBrand(des) {
    const logoUrl = (des === 'Sendas') ? 'logo-sadasi.png' : 'logo-altta.png';
    document.getElementById('brandHeader').innerHTML = `<img src="${logoUrl}" style="max-height: 50px;">`;
}

function startExperience() {
    screens[0].classList.remove('active');
    current = 1;
    screens[current].classList.add('active');
    music.play().catch(()=>{});
    initDots();
}

function initDots() {
    const dotsCont = document.getElementById('navigation-dots');
    document.querySelectorAll('.screen').forEach((_, i) => {
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

document.getElementById('exportBtn').onclick = () => {
    html2canvas(document.querySelector('.summary-screen')).then(canvas => {
        const link = document.createElement('a');
        link.download = 'Wrapped2024.png';
        link.href = canvas.toDataURL();
        link.click();
    });
};
