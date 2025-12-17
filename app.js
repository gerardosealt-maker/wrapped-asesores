let data, current = 0, currentUser;
const moneyF = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });

// Frases aleatorias para dar variedad
const introsAsesor = [
    "Un año de transformar miedos en firmas.",
    "Cada llave entregada fue un sueño cumplido.",
    "Hiciste que el 2024 fuera inolvidable."
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

    setupExperience(currentUser);
    document.getElementById('music').play().catch(()=>{});
    nextScreen();
};

function setupExperience(user) {
    document.getElementById('userName').textContent = user.name;
    const logoUrl = (user.desarrollo === 'Sendas') ? 'logo-sadasi.png' : 'logo-altta.png';
    document.getElementById('brandHeader').innerHTML = `<img src="${logoUrl}" style="max-height: 40px; margin-bottom: 20px;">`;

    if (user.role === 'asesor') {
        document.getElementById('userIntro').textContent = introsAsesor[Math.floor(Math.random()*introsAsesor.length)];
        document.getElementById('p-prospects').textContent = user.prospects;
        document.getElementById('p-visits').textContent = user.visits;
        document.getElementById('p-sales').textContent = user.sales;
        document.getElementById('p-deeds').textContent = user.totalDeeds;
        document.getElementById('p-money').textContent = moneyF.format(user.monto_escrituras);
        
        const acc = ((user.sales / user.visits) * 100).toFixed(0);
        document.getElementById('p-accuracy').textContent = acc + "%";

        // Mejor Mes
        let best = {m: 'Ene', v: -1};
        for(let m in user.monthlyData) {
            if(user.monthlyData[m].sales > best.v) best = {m, v: user.monthlyData[m].sales};
        }
        document.getElementById('p-bestMonth').textContent = best.m.toUpperCase();
        document.getElementById('p-bestMonthStory').textContent = `En ${best.m} lograste ${best.v} cierres. ¡Fuiste imparable!`;

        document.querySelectorAll('.coord-only').forEach(el => el.remove());
        
        // Resumen final
        document.getElementById('final-stats-grid').innerHTML = `
            <div class="coord-card"><small>VENTAS</small><p>${user.sales}</p></div>
            <div class="coord-card"><small>MONTO</small><p style="font-size:14px">${moneyF.format(user.monto_escrituras)}</p></div>
        `;
    } else {
        // Lógica Coordinador
        const team = data.filter(u => u.role === 'asesor' && u.desarrollo === user.desarrollo);
        const tSales = team.reduce((s, a) => s + a.sales, 0);
        const tMoney = team.reduce((s, a) => s + a.monto_escrituras, 0);

        document.getElementById('userIntro').textContent = "Liderar es inspirar. Mira lo que lograste con tu equipo.";
        document.getElementById('c-sales').textContent = tSales;
        document.getElementById('c-money').textContent = moneyF.format(tMoney);

        // Certeza equipo
        let bAcc = -1, topA = team[0];
        team.forEach(a => {
            let ac = a.sales / a.visits;
            if(ac > bAcc) { bAcc = ac; topA = a; }
        });
        document.getElementById('c-topAccName').textContent = topA.name;
        document.getElementById('c-topAccStats').textContent = `Efectividad de cierre: ${(bAcc*100).toFixed(0)}%`;

        document.querySelectorAll('.advisor-only').forEach(el => el.remove());
        document.getElementById('final-stats-grid').innerHTML = `
            <div class="coord-card"><small>EQUIPO</small><p>${tSales}</p></div>
            <div class="coord-card"><small>VALOR</small><p style="font-size:12px">${moneyF.format(tMoney)}</p></div>
        `;
    }
    initDots();
}

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
    const activeScreens = document.querySelectorAll('.screen');
    activeScreens.forEach((_, i) => {
        if(i === 0) return;
        const dot = document.createElement('div');
        dot.className = 'dot';
        container.appendChild(dot);
    });
    updateDots();
}

function updateDots() {
    document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === current - 1));
}

// Swipe Vertical
let startY = 0;
document.addEventListener('touchstart', e => startY = e.touches[0].clientY);
document.addEventListener('touchend', e => {
    const delta = startY - e.changedTouches[0].clientY;
    if (delta > 50) nextScreen(); // Swipe arriba -> siguiente
    if (delta < -50) prevScreen(); // Swipe abajo -> anterior
});

document.getElementById('exportBtn').onclick = () => {
    html2canvas(document.getElementById('summary-screen'), { backgroundColor: '#000' }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'MiResumen2024.png';
        link.href = canvas.toDataURL();
        link.click();
    });
};
