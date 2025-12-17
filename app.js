let data, current = 0, currentUser;
const moneyF = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });

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
    // Configurar Marca y Tema
    document.body.setAttribute('data-theme', user.desarrollo.toLowerCase());
    const logoImg = (user.desarrollo === 'Sadasi') ? 'logo-sadasi.png' : 'logo-altta.png';
    document.getElementById('brandLogoLogin').innerHTML = `<img src="${logoImg}" style="max-height:60px">`;
    document.getElementById('brandLogoStory').src = logoImg;

    // Configurar Fotos (Busca por Nombre del Asesor)
    const photoPath = `${user.name}.jpg`; 
    document.getElementById('u-photo').src = photoPath;
    document.getElementById('u-photo-final').src = photoPath;

    // Datos Generales
    document.getElementById('u-name').textContent = user.name;
    document.getElementById('u-intro').textContent = "Transformaste miedos en firmas este 2024.";

    // Gráfico
    const chart = document.getElementById('chart');
    chart.innerHTML = '';
    const maxVal = Math.max(...Object.values(user.monthlyData), 1);
    for (let mes in user.monthlyData) {
        const h = (user.monthlyData[mes] / maxVal) * 100;
        chart.innerHTML += `<div class="bar-wrapper"><div class="bar" style="height:${h}%"></div><span style="font-size:8px; opacity:0.5">${mes}</span></div>`;
    }

    if(user.role === 'asesor') {
        // Top Modelos
        const list = document.getElementById('topModelsList');
        list.innerHTML = '';
        user.topModels.forEach(m => {
            list.innerHTML += `<li><span>${m.name}</span><strong>${m.sales}</strong></li>`;
        });

        // Métricas
        document.getElementById('p-prospects').textContent = user.prospects;
        document.getElementById('p-visits').textContent = user.visits;
        document.getElementById('p-accuracy').textContent = ((user.sales/user.visits)*100).toFixed(0) + "%";
        
        // Final Story
        document.getElementById('finalName').textContent = user.name;
        document.getElementById('finalRole').textContent = `Asesor ${user.desarrollo}`;
        document.getElementById('f-sales').textContent = user.sales;
        document.getElementById('f-money').textContent = moneyF.format(user.monto_escrituras);
    }

    initDots();
}

// Navegación Swipe
function nextScreen() {
    const screens = document.querySelectorAll('.screen:not(.coord-only)');
    if (current < screens.length - 1) {
        screens[current].classList.add('past');
        screens[current].classList.remove('active');
        current++;
        screens[current].classList.add('active');
        updateDots();
    }
}

function initDots() {
    const container = document.getElementById('navigation-dots');
    container.innerHTML = '';
    const activeScreens = document.querySelectorAll('.screen:not(.coord-only)');
    activeScreens.forEach((_, i) => { if(i>0) container.innerHTML += '<div class="dot"></div>'; });
    updateDots();
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((d, i) => d.classList.toggle('active', i === current - 1));
}

let startY = 0;
document.addEventListener('touchstart', e => startY = e.touches[0].clientY);
document.addEventListener('touchend', e => {
    const delta = startY - e.changedTouches[0].clientY;
    if (delta > 50) nextScreen();
});

document.getElementById('exportBtn').onclick = () => {
    html2canvas(document.getElementById('story-final-screen'), { scale: 2 }).then(canvas => {
        const link = document.createElement('a');
        link.download = `Wrapped2024_${currentUser.name}.png`;
        link.href = canvas.toDataURL();
        link.click();
    });
};
