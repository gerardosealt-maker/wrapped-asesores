const data = [
  { "name": "PAOLA ENRIQUEZ RODRIGUEZ", "foto": "Paola Enriquez.jpg", "mejor_mes": "JUNIO", "mejor_mes_ventas": 8, "leads": 282, "citas": 14, "visitas": 10, "v_digital": 6, "v_brutas": 67, "cancelaciones": 5, "v_netas": 62, "escrituras_qty": 56, "monto": "$70.8M" },
  { "name": "ISAAC AGUILAR GUTIERREZ", "foto": "Isaac Aguilar.jpg", "mejor_mes": "FEBRERO", "mejor_mes_ventas": 10, "leads": 255, "citas": 5, "visitas": 3, "v_digital": 3, "v_brutas": 73, "cancelaciones": 11, "v_netas": 62, "escrituras_qty": 59, "monto": "$70.8M" },
  { "name": "JOSE FABIAN SOLIS MENDOZA", "foto": "Fabian Solis.jpg", "mejor_mes": "JULIO", "mejor_mes_ventas": 9, "leads": 253, "citas": 8, "visitas": 4, "v_digital": 1, "v_brutas": 58, "cancelaciones": 6, "v_netas": 60, "escrituras_qty": 52, "monto": "$67.2M" },
  { "name": "LAURA GRACIELA MENDOZA HERNANDEZ", "foto": "Laura Mendoza.jpg", "mejor_mes": "ENERO", "mejor_mes_ventas": 9, "leads": 241, "citas": 10, "visitas": 3, "v_digital": 2, "v_brutas": 69, "cancelaciones": 9, "v_netas": 52, "escrituras_qty": 48, "monto": "$59.8M" },
  { "name": "MARIA FERNANDA ALVAREZ CASTELLANOS", "foto": "Maria Fernanda Alvarez.jpg", "mejor_mes": "NOVIEMBRE", "mejor_mes_ventas": 8, "leads": 123, "citas": 3, "visitas": 1, "v_digital": 1, "v_brutas": 56, "cancelaciones": 6, "v_netas": 50, "escrituras_qty": 46, "monto": "$57.2M" },
  { "name": "LILIANA FRANCO REYES", "foto": "Liliana Franco.jpg", "mejor_mes": "ENERO", "mejor_mes_ventas": 11, "leads": 270, "citas": 13, "visitas": 6, "v_digital": 3, "v_brutas": 51, "cancelaciones": 9, "v_netas": 42, "escrituras_qty": 38, "monto": "$46.1M" },
  { "name": "JUAN ENRIQUE LOPEZ ORDUÑA", "foto": "Enrique Orduña.jpg", "mejor_mes": "JUNIO", "mejor_mes_ventas": 7, "leads": 118, "citas": 10, "visitas": 3, "v_digital": 1, "v_brutas": 44, "cancelaciones": 6, "v_netas": 38, "escrituras_qty": 39, "monto": "$47.2M" },
  { "name": "ADRIANA ESTRELLA CHAVEZ", "foto": "Adriana Estrella.jpg", "mejor_mes": "NOVIEMBRE", "mejor_mes_ventas": 7, "leads": 176, "citas": 18, "visitas": 7, "v_digital": 1, "v_brutas": 46, "cancelaciones": 9, "v_netas": 37, "escrituras_qty": 40, "monto": "$48.6M" },
  { "name": "MARISOL GARCIA CELIS", "foto": "Marisol Garcia Celis.jpg", "mejor_mes": "ENERO", "mejor_mes_ventas": 5, "leads": 102, "citas": 1, "visitas": 1, "v_digital": 1, "v_brutas": 40, "cancelaciones": 5, "v_netas": 35, "escrituras_qty": 30, "monto": "$38.0M" },
  { "name": "MA DE LOS ANGELES ZUÑIGA JIMENEZ", "foto": "Angeles Zuñiga.jpg", "mejor_mes": "MAYO", "mejor_mes_ventas": 6, "leads": 308, "citas": 18, "visitas": 7, "v_digital": 5, "v_brutas": 40, "cancelaciones": 6, "v_netas": 34, "escrituras_qty": 30, "monto": "$36.2M" },
  { "name": "MARIA ANASTACIA CRISTINA CRUZ CERVANTES", "foto": "Cristina Cruz.jpg", "mejor_mes": "FEBRERO", "mejor_mes_ventas": 5, "leads": 223, "citas": 6, "visitas": 6, "v_digital": 6, "v_brutas": 35, "cancelaciones": 4, "v_netas": 31, "escrituras_qty": 28, "monto": "$34.7M" },
  { "name": "CESAR EDUARDO ARREOLA YAÑEZ", "foto": "César Arreola.jpg", "mejor_mes": "OCTUBRE", "mejor_mes_ventas": 5, "leads": 172, "citas": 23, "visitas": 13, "v_digital": 5, "v_brutas": 39, "cancelaciones": 15, "v_netas": 24, "escrituras_qty": 22, "monto": "$28.4M" },
  { "name": "CLAUDIA CAMPA CAUDILLO", "foto": "Claudia Campia.jpg", "mejor_mes": "JUNIO", "mejor_mes_ventas": 4, "leads": 254, "citas": 10, "visitas": 6, "v_digital": 4, "v_brutas": 26, "cancelaciones": 2, "v_netas": 24, "escrituras_qty": 18, "monto": "$23.0M" },
  { "name": "LUIS GUTIERREZ GERBACIO", "foto": "Luis Gutierrez.jpg", "mejor_mes": "NOVIEMBRE", "mejor_mes_ventas": 5, "leads": 300, "citas": 13, "visitas": 2, "v_digital": 1, "v_brutas": 27, "cancelaciones": 5, "v_netas": 22, "escrituras_qty": 19, "monto": "$24.2M" },
  { "name": "JUAN DANIEL CISNEROS RAMOS", "foto": "Daniel Cisneros.jpg", "mejor_mes": "NOVIEMBRE", "mejor_mes_ventas": 4, "leads": 73, "citas": 0, "visitas": 0, "v_digital": 0, "v_brutas": 10, "cancelaciones": 0, "v_netas": 10, "escrituras_qty": 9, "monto": "$11.2M" },
  { "name": "HILDA VERONICA ALVAREZ MEDINA", "foto": "Hilda Veronica.jpg", "mejor_mes": "JULIO", "mejor_mes_ventas": 1, "leads": 12, "citas": 2, "visitas": 0, "v_digital": 1, "v_brutas": 2, "cancelaciones": 0, "v_netas": 2, "escrituras_qty": 0, "monto": "$2.4M" }
];

let current = 0;
let currentUser = null;
let storyTimer = null;

// Lógica del Botón Principal
document.getElementById('startBtn').addEventListener('click', function() {
    const input = document.getElementById('agentInput').value.trim().toUpperCase();
    if (!input) return alert("Por favor escribe tu nombre");

    const user = data.find(u => u.name.toUpperCase().includes(input));
    
    if (!user) {
        alert("Asesor no encontrado. Verifica la lista.");
        return;
    }

    currentUser = user;
    renderValues(user);
    
    // Cambiar Pantallas
    document.getElementById('login').style.display = 'none';
    document.getElementById('progressRoot').style.display = 'flex';
    document.getElementById('tapZones').style.display = 'flex';
    
    // Música
    const music = document.getElementById('music');
    music.play().catch(() => console.log("Audio requiere interacción"));
    
    showStory(0);
});

function renderValues(u) {
    let r = "", f1 = "", f2 = "", f3 = "", f4 = "", fFinal = "";
    
    if (u.v_netas >= 50) {
        r = "👑 MÁSTER ÉLITE";
        f1 = "Has redefinido lo que es posible este año.";
        f2 = `En ${u.mejor_mes} demostraste un nivel de leyenda.`;
        f3 = "Tu capacidad para convertir prospectos es asombrosa.";
        f4 = "Balance perfecto. Eres el estándar de excelencia.";
        fFinal = "¡Gracias por ser pieza clave del éxito!";
    } else if (u.v_netas >= 30) {
        r = "⭐ ASESOR DIAMANTE";
        f1 = "Tu constancia inspira a todo el equipo.";
        f2 = `¡${u.mejor_mes} fue un mes espectacular para ti!`;
        f3 = "Disciplina y seguimiento: tu fórmula del éxito.";
        f4 = "Números sólidos que demuestran gran profesionalismo.";
        fFinal = "¡Vamos por un 2026 aún más grande!";
    } else {
        r = "🚀 ASESOR PRO";
        f1 = "Un año de aprendizaje y bases para el futuro.";
        f2 = `${u.mejor_mes} fue tu mejor momento, ¡repitámoslo!`;
        f3 = "Cada contacto cuenta. ¡Sigue cultivando éxitos!";
        f4 = "¡En 2026 vamos a duplicar estos resultados!";
        fFinal = "¡Tu potencial no tiene límites!";
    }

    document.getElementById('rank-badge-main').innerHTML = `<div style="background:var(--primary); padding:5px 15px; border-radius:20px; font-size:11px; font-weight:bold;">${r}</div>`;
    document.getElementById('f-rango').textContent = r;
    document.getElementById('frase-1').textContent = f1;
    document.getElementById('frase-2').textContent = f2;
    document.getElementById('frase-3').textContent = f3;
    document.getElementById('frase-4').textContent = f4;
    document.getElementById('f-frase').textContent = fFinal;

    document.querySelectorAll('.u-photo').forEach(img => {
        img.src = encodeURI(u.foto);
        img.onerror = () => { img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}&background=FF8200&color=fff`; };
    });

    document.querySelectorAll('.u-name-display').forEach(el => el.textContent = u.name);
    document.getElementById('u-mejor-mes-nombre').textContent = u.mejor_mes;
    document.getElementById('u-mejor-mes-qty').textContent = u.mejor_mes_ventas;
    document.getElementById('u-leads').textContent = u.leads;
    document.getElementById('u-citas').textContent = u.citas;
    document.getElementById('u-visitas').textContent = u.visitas;
    document.getElementById('u-vbrutas').textContent = u.v_brutas;
    document.getElementById('u-canceladas').textContent = u.cancelaciones;
    document.getElementById('u-vnetas-slide').textContent = u.v_netas;
    document.getElementById('u-vdigital-slide').textContent = u.v_digital;
    document.getElementById('f-monto').textContent = u.monto;
    document.getElementById('f-vnetas').textContent = u.v_netas;
    document.getElementById('f-eqty').textContent = u.escrituras_qty;
}

function showStory(index) {
    const stories = document.querySelectorAll('.story');
    if (index < 0 || index >= stories.length) return;

    stories.forEach(s => s.classList.remove('active'));
    stories[index].classList.add('active');

    const root = document.getElementById('progressRoot');
    root.innerHTML = '';
    stories.forEach((_, i) => {
        const bar = document.createElement('div');
        bar.className = 'progress-bar';
        const fill = document.createElement('div');
        fill.className = 'progress-fill';
        if (i < index) fill.style.width = '100%';
        if (i === index) setTimeout(() => fill.style.width = '100%', 50);
        bar.appendChild(fill);
        root.appendChild(bar);
    });

    current = index;
    clearInterval(storyTimer);
    storyTimer = setInterval(() => {
        if (current < stories.length - 1) showStory(current + 1);
    }, 5500);

    if (index > 0) confetti({ particleCount: 25, spread: 50, origin: { y: 0.8 } });
}

document.getElementById('btnNext').onclick = () => {
    const stories = document.querySelectorAll('.story');
    if (current < stories.length - 1) showStory(current + 1);
};

document.getElementById('btnPrev').onclick = () => {
    if (current > 0) showStory(current - 1);
};
