let data, current = 0, currentUser;
const moneyF = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });

fetch('./data.json').then(r => r.json()).then(j => {
    data = j;
    document.getElementById('agentInput').oninput = e => {
        document.getElementById('startBtn').disabled = e.target.value.length < 1;
    };
});

document.getElementById('startBtn').onclick = () => {
    const val = document.getElementById('agentInput').value.trim();
    currentUser = data.find(u => u.id === val || u.name.includes(val));
    if (!currentUser) return alert("No se encontró el asesor.");

    renderApp(currentUser);
    nextScreen();
};

function renderApp(user) {
    // Definir Desarrollo para el Tema CSS
    const devKey = user.desarrollo.toLowerCase();
    document.body.setAttribute('data-dev', devKey);

    // Logos Dinámicos
    const logoImg = (devKey === 'sendas') ? 'logo-sadasi.png' : 'logo-altta.png';
    document.getElementById('brandLogo').src = logoImg;

    // Foto por Nombre
    document.getElementById('u-photo').src = `${user.name}.jpg`;

    // Llenar Datos
    document.getElementById('u-mejorMes').textContent = user.mejorMes;
    document.getElementById('u-ventasMes').textContent = user.ventasMejorMes;
    document.getElementById('u-prospects').textContent = user.prospects;
    document.getElementById('u-visits').textContent = user.visits;
    document.getElementById('u-accuracy').textContent = ((user.sales/user.visits)*100).toFixed(0) + "%";
    document.getElementById('u-cancels').textContent = user.cancelaciones;

    // Resumen Final
    document.getElementById('f-name').textContent = user.name;
    document.getElementById('f-dev').textContent = `Desarrollo ${user.desarrollo}`;
    document.getElementById('f-sales').textContent = user.sales;
    document.getElementById('f-money').textContent = moneyF.format(user.monto_escrituras);
    document.getElementById('f-model').textContent = user.topModels[0].name;

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

function initDots() {
    const container = document.getElementById('navigation-dots');
    container.innerHTML = '';
    document.querySelectorAll('.screen').forEach((_, i) => {
        if(i > 0) container.innerHTML += `<div class="dot ${i === current ? 'active' : ''}"></div>`;
    });
}

function updateDots() {
    document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === current - 1));
}

// Swipe y Exportación
let startY = 0;
document.addEventListener('touchstart', e => startY = e.touches[0].clientY);
document.addEventListener('touchend', e => {
    const delta = startY - e.changedTouches[0].clientY;
    if (delta > 50) nextScreen();
});

document.getElementById('exportBtn').onclick = () => {
    const btn = document.getElementById('exportBtn');
    btn.style.display = 'none'; // Ocultar botón en la captura
    html2canvas(document.getElementById('story-final'), { backgroundColor: '#000', scale: 2 }).then(canvas => {
        const link = document.createElement('a');
        link.download = `Wrapped_${currentUser.name}.png`;
        link.href = canvas.toDataURL();
        link.click();
        btn.style.display = 'block';
    });
};
