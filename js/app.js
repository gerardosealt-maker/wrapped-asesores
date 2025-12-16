const app = document.getElementById("app");
const audio = new Audio("./audio/wrapped.mp3");
audio.loop = true;


fetch("./data/asesores.json")
.then(res => res.json())
.then(data => iniciar(data));


function iniciar(data) {
const asesor = data.asesores[0]; // luego se puede filtrar por ID


audio.play().catch(() => {});


const screens = [];


screens.push(`
<section class="screen gradient-prospectos">
<h1>${asesor.nombre}</h1>
<p class="story-line">Así se vio tu año</p>
</section>
`);


Object.keys(asesor.metricas).forEach(key => {
screens.push(`
<section class="screen gradient-${key}">
<h2>${key.toUpperCase()}</h2>
<div class="number">${asesor.metricas[key]}</div>
<p class="story-line">Cada número cuenta una historia</p>
</section>
`);
});


screens.push(`
<section class="screen gradient-final">
<h2>Tu año, en resumen</h2>
<p class="story-line">Nada de esto fue casualidad</p>
<button type="button" onclick="exportar()">Guardar recuerdo</button>
</section>
`);


app.innerHTML = screens.join("");
}


function exportar() {
alert("Aquí luego se exporta la imagen completa");
}
