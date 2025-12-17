let data, current = 0, currentUser;
const screens = document.querySelectorAll('.screen');
const music = document.getElementById('music');
const money = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });

fetch('./data.json').then(r => r.json()).then(j => {
    data = j;
    document.getElementById('agentInput').oninput = (e) => {
        document.getElementById('startBtn').disabled = e.target.value.length < 3;
    };
});

document.getElementById('startBtn').onclick = () => {
    const id = document.getElementById('agentInput').value.trim();
    currentUser = data.find(u => u.id === id);
    if (!currentUser) return alert("ID no encontrado");

    setupBrand(currentUser.desarrollo);

    if (currentUser.role === 'asesor') {
        const accuracy = ((currentUser.sales / currentUser.appointments) * 100).toFixed(0);
        const best = findBestMonth(currentUser.monthlyData);

        document.getElementById('welcome').textContent = currentUser.name;
        document.getElementById('roleTitle').textContent = `ASESOR ${currentUser.desarrollo}`;
        document.getElementById('introCopy').textContent = "Tu dedicación construyó el camino al éxito.";
        
        // Asignación de valores
        document.getElementById('prospectsNum').textContent = currentUser.prospects;
        document.getElementById('accuracyNum').textContent = accuracy + "%";
        document.getElementById('bestMonthName').textContent = best.name.toUpperCase();
        document.getElementById('bestMonthCopy').textContent = `En ${best.name} lograste tu máximo de cierres.`;
        document.getElementById('moneyValue').textContent = money.format(currentUser.monto_escrituras);
        document.getElementById('cancelNum').textContent = currentUser.cancelaciones;

        document.querySelectorAll('.coord-only').forEach(el => el.remove());
        
        document.getElementById('finalMetrics').innerHTML = `
            <div class="glass-card"><p style="font-size:24px; color:var(--primary)">${currentUser.sales}</p><small>VENTAS</small></div>
            <div class="glass-card"><p style="font-size:24px; color:var(--primary)">${accuracy}%</p><small>CERTEZA</small></div>
        `;
    } else {
        setupCoordinator(currentUser);
    }
    startExperience();
};

function setupCoordinator(coord) {
    const team = data.filter(u => u.role === 'asesor' && u.desarrollo === coord.desarrollo);
    const tSales = team.reduce((s, a) => s + a.sales, 0);
    const tMoney = team.reduce((s, a) => s + a.monto_escrituras, 0);

    document.getElementById('welcome').textContent = coord.name;
    document.getElementById('roleTitle').textContent = `LÍDER ${coord.desarrollo}`;
    document.getElementById('teamName').textContent = `EQUIPO ${coord.desarrollo}`;
    document.getElementById('teamSales').textContent = tSales;
    document.getElementById('teamMoney').textContent = money.format(tMoney);

    // Mes Fuerte Equipo
    const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    let teamBest = { name: '', score: -1 };
    months.forEach(m => {
        let mSum = team.reduce((sum, a) => sum + (a.monthlyData[m]?.sales || 0), 0);
        if(mSum > teamBest.score) teamBest = { name: m, score: mSum };
    });
    document.getElementById('teamBestMonth').textContent = teamBest.name.toUpperCase();

    // Certeza
    let bestAcc = -1, accurateA = team[0];
    team.forEach(a => {
        let acc = a.sales / a.appointments;
        if(acc > bestAcc) { bestAcc = acc; accurateA = a; }
    });
    document.getElementById('topAccuracyName').textContent = accurateA.name;
    document.getElementById('topAccuracyStats').textContent = `Cerró el ${(bestAcc*100).toFixed(0)}% de sus citas.`;

    document.querySelectorAll('.advisor-only').forEach(el => el.remove());
    document.getElementById('finalMetrics').innerHTML = `
        <div class="glass-card"><p style="font-size:24px; color:var(--primary)">${tSales}</p><small>TOTAL VENTAS</small></div>
        <div class="glass-card"><p style="font-size:24px; color:var(--primary)">${teamBest.name}</p><small>MES PICO</small></div>
    `;
}

function findBestMonth(m) {
    let b = {name: 'Ene', score: -1};
    for (let k in m) {
        if(m[k].sales > b.score) b = {name: k, score: m[k].sales};
    }
    return b;
}

function setupBrand(des) {
    const img = (des === 'Sendas') ? 'logo-sadasi.png' : 'logo-altta.png';
    document.getElementById('brandHeader').innerHTML = `<img src="${img}" style="max-height: 40px; margin-bottom: 20px;">`;
}

function startExperience() {
    screens[0].classList.remove('active');
    current = 1;
    screens[current].classList.add('active');
    music.play().catch(()=>{});
    initDots();
}

function initDots() {
    const cont = document.getElementById('navigation-dots');
    cont.innerHTML = '';
    document.querySelectorAll('.screen').forEach((_, i) => {
        if(i === 0) return;
        let d = document.createElement('div');
        d.className = 'dot';
        cont.appendChild(d);
    });
    updateDots();
}

function updateDots() {
    document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === current - 1));
}

function next() {
    const active = document.querySelectorAll('.screen');
    if (current < active.length - 1) {
        active[current].classList.remove('active');
        current++;
        active[current].classList.add('active');
        updateDots();
    }
}

let startY = 0;
document.addEventListener('touchstart', e => startY = e.touches[0].clientY);
document.addEventListener('touchend', e => {
    if (startY - e.changedTouches[0].clientY > 50) next();
});

document.getElementById('exportBtn').onclick = () => {
    html2canvas(document.querySelector('.summary-screen'), { backgroundColor: '#000' }).then(canvas => {
        let a = document.createElement('a');
        a.download = 'Wrapped2024.png'; a.href = canvas.toDataURL(); a.click();
    });
};
