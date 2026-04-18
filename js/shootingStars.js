const canvas = document.getElementById("shootingStarsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const TARGET_FPS = 240;
const TARGET_FRAME = 1 / TARGET_FPS;

class ShootingStar {
    constructor() {
        this.reset();

        for (let i = 0; i < Math.random() * 100000; i++) {
            this.update(1);
        }
    }

    reset() {
        this.x = Math.random() * -30;
        this.y = (Math.random() - 0.5) * canvas.width * 2;
        this.length = Math.random() * 80;
        this.speed = Math.random() * 5 + 2;
        this.angle = Math.random() * 10 + 10;
        this.opacity = Math.random() * 0.5 + 0.5;
    }

    update(scale) {
        const rad = (this.angle * Math.PI) / 180;

        this.x += Math.cos(rad) * this.speed * scale;
        this.y += Math.sin(rad) * this.speed * scale;
        this.opacity -= 0.001 * scale;

        if (this.opacity <= 0) {
            this.reset();
        }
    }

    draw() {
        const rad = (this.angle * Math.PI) / 180;

        ctx.strokeStyle = `rgba(255,255,255,${this.opacity})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
            this.x - Math.cos(rad) * this.length,
            this.y - Math.sin(rad) * this.length
        );
        ctx.stroke();
    }
}

let stars = [];

function spawnStar() {
    stars.push(new ShootingStar());
}

for (let i = 0; i < canvas.width * canvas.height / 6000; i++) {
    spawnStar();
}

let lastTime = performance.now();

function animate(now) {
    let dt = (now - lastTime) / 1000;
    lastTime = now;

    dt = Math.min(dt, 0.05);

    const scale = dt / TARGET_FRAME;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const star of stars) {
        star.update(scale);
        star.draw();
    }

    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
        lastTime = performance.now();
    }
});

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});