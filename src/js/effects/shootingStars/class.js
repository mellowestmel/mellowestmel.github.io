const DEGREES_TO_RADIANS = Math.PI / 180;
const OPACITY_FADE_RATE = 0.001;

export class ShootingStar {
    constructor(spawnBounds) {
        this.spawnBounds = spawnBounds;
        this.reset();
        this.fastForwardToRandomAge();
    }

    reset() {
        this.x = Math.random() * -30;
        this.y = (Math.random() - 0.5) * this.spawnBounds.width * 2;
        this.trailLength = Math.random() * 80;
        this.speed = Math.random() * 5 + 2;
        this.opacity = Math.random() * 0.5 + 0.5;

        const angleDegrees = Math.random() * 10 + 10;
        const angleRadians = angleDegrees * DEGREES_TO_RADIANS;
        this.directionCosine = Math.cos(angleRadians);
        this.directionSine = Math.sin(angleRadians);
    }

    fastForwardToRandomAge() {
        const maxAge = this.opacity / OPACITY_FADE_RATE;
        const randomAge = Math.random() * maxAge;
        this.advance(randomAge);
    }

    advance(scale) {
        this.x += this.directionCosine * this.speed * scale;
        this.y += this.directionSine * this.speed * scale;
        this.opacity -= OPACITY_FADE_RATE * scale;

        if (this.opacity <= 0) {
            this.reset();
        }
    }

    getTailPosition() {
        return {
            x: this.x - this.directionCosine * this.trailLength,
            y: this.y - this.directionSine * this.trailLength,
        };
    }
}