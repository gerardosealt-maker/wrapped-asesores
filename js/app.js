const app = document.getElementById("app");
const login = document.getElementById("login");
const audio = new Audio("./audio/wrapped.mp3");
audio.loop = true;
let DATA = null;


fetch("./data/asesores.json")
.then(res => res.json())
.then(json => DATA = json)
.catch(() => alert("Error cargando datos"));


function acceder() {
const id = parseInt(document.getElementById("inputID").value);
const asesor = DATA.asesores.find(a => a.id === id);


if (!asesor) {
alert("ID no encontrado");
return;
}


login.style.display = "none";
app.style.display = "block";


iniciarWrapped(asesor);
}


function iniciarWrapped(asesor) {
audio.play().catch(() => {});


const screens = [];


screens.push(`
<section class="screen gradient-prospectos">
<h1>${asesor.nombre}</h1>
<p class="story-line">Así se vio tu año</p>
</section>
`);


for (const key in asesor.metricas) {
screens.push(`
<section class="screen gradient-${key}">
<h2>${key.toUpperCase()}</h2>
<div class="number">${asesor.metricas[key]}</div>
<p class="story-line">${copyDinamico(key, asesor.metricas[key])}</p>
</section>
`);
}


screens.push(`
<section class="screen gradient-final">
<h2>Tu año, en resumen</h2>
<p class="story-line">Nada de esto fue casualidad</p>
</section>
`);


app.innerHTML = screens.join("");
}


function copyDinamico(m, v) {
}
