const moneyF = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });
let data = [], current = 0, currentUser = null;

// Cargar Datos
fetch('./data.json').then(r => r.json()).then(d => { data = d; });

document.getElementById('startBtn').onclick = () => {
    const val = document.getElementById('agentInput').value.trim();
    currentUser = data.find(u => u.id === val || u.name.toLowerCase().includes(val.toLowerCase()));
    
    if (!currentUser) return alert("Asesor no encontrado.");
    
    initExperience();
    document.getElementById('music').play().catch(() => {});
    nextScreen();
};

function initExperience() {
    const user = currentUser;
    // UI Theme
    document.body.setAttribute('data-dev', user.desarrollo.toLowerCase());
    const logoImg = (user.desarrollo.toLowerCase() === 'sendas') ? 'logo-sadasi.png' : 'logo-altta.png';
    document.getElementById('brandLogo').src = logoImg;
    
    // Data Binding
    document.getElementById('u-photo').src = `${user.name}.jpg`;
    document.getElementById('u-mejorMes').textContent = user.mejorMes;
    document.getElementById('u-ventasMes').textContent = user.ventasMejorMes;
    document.getElementById('u-accuracy').textContent = ((user.sales/user.visits)*100).toFixed(0) + "%";
    document.getElementById('u-visits').textContent = user.visits;
    document.getElementById('u-sales').textContent = user.sales;
    document.getElementById('u-cancels').textContent = user.cancelaciones;
    
    // Final Summary
    document.getElementById('f-name').textContent = user.name;
    document.getElementById('f-dev').textContent = `Desarrollo ${user.desarrollo}`;
    document.getElementById('f-sales').textContent = user.sales;
    document.getElementById('f-money').textContent = moneyF.format(user.monto_escrituras);
    document.getElementById('f-model').textContent = user.topModels[0].name;

    createProgressBars();
}

function createProgressBars() {
    const root = document.getElementById('progressRoot');
    const screens = document.querySelectorAll('.screen');
    root.innerHTML = '';
    screens.forEach((_, i) => {
        if(i === 0) return;
        const bar = document.createElement('div');
        bar.className = 'progress-bar';
        bar.innerHTML = '<div class="progress-fill"></div>';
        root.appendChild(bar);
    });
}

function nextScreen() {
    const screens = document.querySelectorAll('.screen');
    const bars = document.querySelectorAll('.progress-bar');

    if (current < screens.length - 1) {
        screens[current].classList.add('past');
        screens[current].classList.remove('active');
        current++;
        screens[current].classList.add('active');
        
        if(current > 0) bars[current - 1].classList.add('active');
    }
}

// Mobile Gestures
let touchStart = 0;
document.addEventListener('touchstart', e => touchStart = e.touches[0].clientY);
document.addEventListener('touchend', e => {
    let touchEnd = e.changedTouches[0].clientY;
    if (touchStart - touchEnd > 70) nextScreen();
});

// Export
document.getElementById('exportBtn').onclick = function() {
    this.style.display = 'none';
    html2canvas(document.getElementById('story-final'), {
        backgroundColor: '#0b0b0b',
        scale: 2,
        useCORS: true
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = `Wrapped_${currentUser.name}.png`;
        link.href = canvas.toDataURL();
        link.click();
        this.style.display = 'block';
    });
};
