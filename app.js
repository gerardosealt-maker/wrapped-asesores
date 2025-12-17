let data, current = 0, currentUser;
const moneyF = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });

const frases = [
    "Transformaste metros cuadrados en hogares.",
    "Un año de metas superadas y sueños cumplidos.",
    "Hiciste que el 2024 fuera extraordinario."
];

fetch('./data.json').then(r => r.json()).then(j => {
    data = j;
    document.getElementById('agentInput').oninput = e => {
        document.getElementById('startBtn').disabled = e.target.value.length < 3;
    };
});

document.getElementById('startBtn').onclick = () => {
    const id = document.getElementById('agentInput').value.trim();
    currentUser = data.find(u => u.id === id);
    if (!currentUser) return alert("ID no encontrado");

    setupData(currentUser);
    document.getElementById('music').play().catch(()=>{});
    nextScreen();
};

function setupData(user) {
    // 1. Logo por desarrollo
    const logoImg = (user.desarrollo === 'Sendas') ? 'logo-sadasi.png' : 'logo-altta.png';
    document.getElementById('brandLogo').innerHTML = `<img src="${logoImg}" style="max-height: 50px; margin-bottom: 20px;">`;

    document.getElementById('u-name').textContent = user.name;
    document.getElementById('u-intro').textContent = frases[Math.floor(Math.random()*frases.length)];

    if (user.role === 'asesor') {
        document.getElementById('p-prospects').textContent = user.prospects;
        document.getElementById('p-visits').textContent = user.visits;
        document.getElementById('p-sales').textContent = user.sales;
        document.getElementById('p-deeds').textContent = user.totalDeeds;
        document.getElementById('p-money').textContent = moneyF.format(user.monto_escrituras);
        
        const acc = ((user.sales / user.visits) * 100).toFixed(0);
        document.getElementById('p-accuracy').textContent = acc + "%";

        document.querySelectorAll('.coord-only').forEach(el => el.remove());
        
        document.getElementById('final-grid').innerHTML = `
            <div class="glass-card"><small>VENTAS</small><p style="font-size:24px">${user.sales}</p></div>
            <div class="glass-card"><small>CERTEZA</small><p style="font-size:24px">${acc}%</p></div>
        `;
    } else {
        const team = data.filter(u => u.role === 'asesor' && u.desarrollo === user.desarrollo);
        const tSales = team.reduce((s, a) => s + a.sales, 0);
        const tMoney = team.reduce((s, a) => s + a.monto_escrituras, 0);

        document.getElementById('c-teamName').textContent = `LIDERAZGO EN ${user.desarrollo.toUpperCase()}`;
        document.getElementById('c-sales').textContent = tSales;
        document.getElementById('c-money').textContent = moneyF.format(tMoney);

        // Certeza Comparativa
        let bAcc = -1, topA = null;
        team.forEach(a => {
            let ac = a.sales / a.visits;
            if(ac > bAcc) { bAcc = ac; topA = a; }
        });
        document.getElementById('c-bestAccName').textContent = topA.name;
        document.getElementById('c-bestAccStats').textContent = `Con solo ${topA.visits} visitas logró ${topA.sales} cierres (${(bAcc*100).toFixed(0)}% de efectividad).`;

        document.querySelectorAll('.advisor-only').forEach(el => el.remove());
        
        document.getElementById('final-grid').innerHTML = `
            <div class="glass-card"><small>EQUIPO</small><p style="font-size:24px">${tSales}</p></div>
            <div class="glass-card"><small>MILLONES</small><p style="font-size:18px">${moneyF.format(tMoney)}</p></div>
        `;
    }
    initDots();
}

// Navegación Vertical
function nextScreen() {
    const screens = document.querySelectorAll('.screen');
    if (current < screens.length - 1) {
        screens[current].classList.add('past');
        screens[current].classList.remove('active');
        current++;
        screens[current].classList.add('active');
        updateDots();
    }
}

function prevScreen() {
    const screens = document.querySelectorAll('.screen');
    if (current > 1) {
        screens[current].classList.remove('active');
        current--;
        screens[current].classList.remove('past');
        screens[current].classList.add('active');
        updateDots();
    }
}

function initDots() {
    const container = document.getElementById('navigation-dots');
    container.innerHTML = '';
    const activeScreens = document.querySelectorAll('.screen');
    activeScreens.forEach((_, i) => {
        if(i === 0) return;
        const d = document.createElement('div');
        d.className = 'dot';
        container.appendChild(d);
    });
    updateDots();
}

function updateDots() {
    document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === current - 1));
}

let startY = 0;
document.addEventListener('touchstart', e => startY = e.touches[0].clientY);
document.addEventListener('touchend', e => {
    const delta = startY - e.changedTouches[0].clientY;
    if (delta > 50) nextScreen();
    if (delta < -50) prevScreen();
});

document.getElementById('exportBtn').onclick = () => {
    html2canvas(document.getElementById('summary-screen'), { backgroundColor: '#000' }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'MiWrapped2024.png';
        link.href = canvas.toDataURL();
        link.click();
    });
};
