:root {
    --primary: #FF8200;
    --secondary: #FF4500;
    --bg: #050505;
    --glass: rgba(255, 255, 255, 0.08);
}

body[data-dev="acento"], body[data-dev="meseta"] { 
    --primary: #007AFF; 
    --secondary: #00C6FF; 
}

* { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }

body { background: var(--bg); color: #fff; overflow: hidden; height: 100vh; display: flex; justify-content: center; }

#capture-area { 
    width: 100%; max-width: 430px; height: 100vh; 
    position: relative; overflow: hidden; background: #000;
}

/* Fondo de Gradientes Animados (Look Moderno) */
.story {
    position: absolute; width: 100%; height: 100%;
    display: none; flex-direction: column; justify-content: center; align-items: center;
    padding: 40px 30px; text-align: center; z-index: 2;
}

.story::before {
    content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    background: radial-gradient(circle at 20% 30%, var(--primary) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, var(--secondary) 0%, transparent 50%);
    opacity: 0.15; z-index: -1; filter: blur(40px);
    animation: pulseBg 10s infinite alternate ease-in-out;
}

@keyframes pulseBg { from { opacity: 0.1; } to { opacity: 0.25; } }

.story.active { display: flex; animation: fadeIn 0.6s cubic-bezier(0.23, 1, 0.32, 1); }

@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

/* Tipografía Limpia (Sin sombras feas) */
h1 { font-size: 42px; font-weight: 800; letter-spacing: -1.5px; line-height: 1; margin-bottom: 10px; }
h2 { font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 3px; opacity: 0.7; margin-bottom: 20px; color: var(--primary); }

.big-number { 
    font-size: 95px; font-weight: 900; line-height: 1; 
    letter-spacing: -4px; margin: 15px 0;
    background: linear-gradient(180deg, #FFFFFF 30%, var(--primary) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}

/* Foto con Estilo Moderno */
.photo-container { 
    width: 220px; height: 220px; border-radius: 50%; 
    border: 1px solid rgba(255,255,255,0.2); overflow: hidden; margin-bottom: 25px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
}
.photo-container img { width: 100%; height: 100%; object-fit: cover; }

/* Barras de Progreso Minimalistas */
#progressRoot { position: absolute; top: 12px; width: 94%; left: 3%; display: flex; gap: 4px; z-index: 100; }
.progress-bar { height: 2px; background: rgba(255,255,255,0.15); flex: 1; border-radius: 4px; overflow: hidden; }
.progress-fill { height: 100%; background: #fff; width: 0%; border-radius: 4px; }
.active .progress-fill { width: 100%; transition: width 5s linear; }

/* Botón de Login Estilizado */
#startBtn { 
    background: #fff; color: #000; padding: 16px 32px; 
    border-radius: 30px; font-weight: 700; font-size: 14px; 
    border: none; cursor: pointer; transition: 0.3s;
}
#startBtn:active { transform: scale(0.95); }

/* Card Final (Glassmorphism) */
.card-summary { 
    background: rgba(255, 255, 255, 0.05); 
    backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 30px 20px; border-radius: 24px; width: 100%;
}
