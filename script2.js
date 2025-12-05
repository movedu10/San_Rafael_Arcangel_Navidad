window.onload = function () {

    const container = document.getElementById("fireworks-container");
    const legend = document.getElementById("legend");
    const mainContent = document.getElementById("main-content");

    // Crear canvas
    const canvas = document.createElement("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    container.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    // Colores brillantes estilo glow
const colors = [
    '#B8860B',  // Oro oscuro
    '#FFD700',  // Oro clásico
    '#FFA500',  // Naranja
    '#FFB732'   // Amarillo dorado claro
];


    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Partícula con resplandor
    class Spark {
        constructor(x, y, color, angle) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.angle = angle;
            this.speed = random(2, 5);
            this.life = random(30, 60);
            this.decay = random(0.02, 0.04);
            this.size = random(2, 3);
        }

        update() {
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;
            this.life -= this.decay;
            this.speed *= 0.96; // desacelera
        }

        draw() {
            ctx.save();
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 15;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    // Fuego artificial estilo glow
    class Firework {
        constructor() {
            this.x = random(100, canvas.width - 100);
            this.y = canvas.height;
            this.targetY = random(150, canvas.height / 2);
            this.speed = 6;
            this.exploded = false;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.sparks = [];
        }

        update() {
            if (!this.exploded) {
                this.y -= this.speed;
                if (this.y <= this.targetY) {
                    this.exploded = true;
                    this.explode();
                }
            } else {
                this.sparks.forEach(s => s.update());
                this.sparks = this.sparks.filter(s => s.life > 0);
            }
        }

        draw() {
            if (!this.exploded) {
                ctx.save();
                ctx.shadowColor = this.color;
                ctx.shadowBlur = 20;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            } else {
                this.sparks.forEach(s => s.draw());
            }
        }

        explode() {
            for (let i = 0; i < 50; i++) {
                this.sparks.push(new Spark(
                    this.x,
                    this.y,
                    this.color,
                    random(0, Math.PI * 2)
                ));
            }
        }
    }

    let fireworks = [];

    // Fondo oscuro estilo radial
    function drawBackground() {
        const gradient = ctx.createRadialGradient(
            canvas.width / 2,
            canvas.height / 2,
            100,
            canvas.width / 2,
            canvas.height / 2,
            canvas.width
        );
        gradient.addColorStop(0, '#8B4513');
        gradient.addColorStop(1, '#FFFFF0');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Bucle principal
    function loop() {
        drawBackground();

        if (Math.random() < 0.08) {
            fireworks.push(new Firework());
        }

        fireworks.forEach(fw => {
            fw.update();
            fw.draw();
        });

        fireworks = fireworks.filter(fw => fw.sparks.length > 0 || !fw.exploded);

        requestAnimationFrame(loop);
    }

    loop();

    // Mostrar leyenda después de 500ms para que aparezca sobre fuegos
    setTimeout(() => {
        legend.classList.remove("hidden");
        legend.classList.add("show");
    }, 500);

    // Desaparecer leyenda a los 8500ms
    setTimeout(() => {
        legend.classList.add("hide");
    }, 8500);

    // Quitar fuegos y mostrar contenido a los 10s
// Quitar fuegos y mostrar contenido a los 10s
setTimeout(() => {
    // 1. Iniciar desvanecimiento
    container.style.opacity = '0';
    legend.style.opacity = '0';

    // 2. Esperar a que termine la transición (2s) antes de ocultar
    setTimeout(() => {
        container.style.display = "none";
        legend.style.display = "none";

        // Fondo cálido
        document.body.classList.add("caldo");

        // Mostrar contenido principal
        mainContent.classList.remove("hidden");

        // Activar transición fade-in principal
        setTimeout(() => {
            mainContent.classList.add("show");
        }, 50);

    }, 2000); // 2000ms = duración de la transición
}, 10000);


// Al cargar la página...
window.onload = function () {
  const container = document.getElementById("fireworks-container");
  const legend = document.getElementById("legend");
  const cardFrame = document.getElementById("card-frame");
  const mainContent = document.getElementById("main-content");

  // ... lógica de fuegos artificiales ...

  // Quitar fuegos y mostrar contenido a los 10s
  setTimeout(() => {
    // fade-out fuegos
    container.style.opacity = '0';
    legend.style.opacity = '0';

    setTimeout(() => {
      container.style.display = "none";
      legend.style.display = "none";

      // Fondo cálido
      document.body.classList.add("caldo");

      // Mostrar marco + contenido
      cardFrame.classList.remove("hidden");

      // Dar tiempo para que display se aplique, luego animar contenido
      setTimeout(() => {
        mainContent.classList.add("show");
      }, 50);

    }, 2000); // coincide con el transition de opacity (2s)
  }, 10000);
};


};

