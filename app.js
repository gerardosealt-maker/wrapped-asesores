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
        document.getElementById('welcome').textContent = `¡Hola, ${currentUser.name}!`;
        document.getElementById('roleTitle').textContent = `Asesor de ${currentUser.desarrollo}`;
        document.getElementById('bestMonthName').textContent = best.name.toUpperCase();
        document.getElementById('bestMonthCopy').textContent = `En ${best.name} lograste ${best.sales} ventas. ¡Tu mejor momento del año!`;
        document.getElementById('moneyValue').textContent = money.format(currentUser.monto_escrituras);
        
        document.querySelectorAll('.coord-only').forEach(el => el.remove());
        
        document.getElementById('finalMetrics').innerHTML = `
            <div class="summary-card"><p>${currentUser.sales}</p><small>Ventas</small></div>
            <div class="summary-card"><p>${best.name}</p><small>Mejor Mes</small></div>
            <div class="summary-card"><p>${((currentUser.sales/currentUser.appointments)*100).toFixed(0)}%</p><small>Certeza</small></div>
        `;
    } else {
        setupCoordinator(currentUser);
    }
    startExperience();
};

function setupCoordinator(coord) {
    const team = data.filter(u => u.role === 'asesor' && u.desarrollo === coord.desarrollo);
    document.getElementById('teamName').textContent = `Liderando ${coord.desarrollo}`;
    document.getElementById('welcome').textContent = coord.name;
    document.getElementById('roleTitle').textContent = `Coord. de ${coord.desarrollo}`;
    document.getElementById('introCopy').textContent = "Tu visión guió al equipo hacia resultados extraordinarios.";

    const tSales = team.reduce((s, a) => s + a.sales, 0);
    const tDeeds = team.reduce((s, a) => s + a.totalDeeds, 0);
    const tMoney = team.reduce((s, a) => s + a.monto_escrituras, 0);

    document.getElementById('teamSales').textContent = tSales;
    document.getElementById('teamDeeds').textContent = tDeeds;
    document.getElementById('teamMoney').textContent = money.format(tMoney);

    // --- CÁLCULO MES FUERTE DEL EQUIPO ---
    const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    let teamBest = { name: '', score: -1 };

    months.forEach(m => {
        let monthTotal = team.reduce((sum, a) => sum + (a.monthlyData[m]?.sales || 0), 0);
        if (monthTotal > teamBest.score) {
            teamBest = { name: m, score: monthTotal };
        }
    });
    document.getElementById('teamBestMonth').textContent = teamBest.name.toUpperCase();
    document.getElementById('teamMonthCopy').textContent = `En ${teamBest.name}, tu equipo cerró ${teamBest.score} ventas en conjunto.`;

    // Certeza MVP
    let bestAcc = -1, accurateA = team[0], topS = team[0];
    team.forEach(a => {
        const acc = a.sales / a.appointments;
        if (acc > bestAcc) { bestAcc = acc; accurateA = a; }
        if (a.sales > topS.sales) topS = a;
    });

    document.getElementById('topAccuracyName').textContent = accurateA.name;
    document.getElementById('topAccuracyStats').textContent = `Eficiencia de cierre: ${(bestAcc*100).toFixed(0)}%`;
    document.getElementById('topSalesName').textContent = topS.name;

    document.querySelectorAll('.advisor-only').forEach(el => el.remove());
    document.getElementById('finalMetrics').innerHTML = `
        <div class="summary-card"><p>${tSales}</p><small>Ventas Equipo</small></div>
        <div class="summary-card"><p>${teamBest.name}</p><small>Pico de Operación</small></div>
    `;
}

function setupBrand(des) {
    const logoUrl = (des === 'Sendas') ? 'logo-sadasi.png' : 'logo-altta.png';
    document.getElementById('brandHeader').innerHTML = `<img src="${logoUrl}" style="max-height: 50px; margin-bottom: 20px;">`;
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
    dotsCont.innerHTML = '';
    const activeScreens = document.querySelectorAll('.screen');
    activeScreens.forEach((_, i) => {
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
    html2canvas(document.querySelector('.summary-screen'), { backgroundColor: '#121212' }).then(canvas => {
        const link = document.createElement('a');
        link.download = `Wrapped2024_${currentUser.name}.png`;
        link.href = canvas.toDataURL();
        link.click();
    });
};
