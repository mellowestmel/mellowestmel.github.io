const TARGET_FRAMES_PER_SECOND = 240;
const TARGET_FRAME_DURATION = 1 / TARGET_FRAMES_PER_SECOND;
const MAX_DELTA_SECONDS = 0.05;

export class AnimationLoop {
    constructor(onTick) {
        this.onTick = onTick;
        this.lastFrameTime = performance.now();
        this.frameHandle = null;

        this.tick = this.tick.bind(this);
    }

    start() {
        this.frameHandle = requestAnimationFrame(this.tick);
    }

    tick(currentTime) {
        const rawDeltaSeconds = (currentTime - this.lastFrameTime) / 1000;
        this.lastFrameTime = currentTime;

        const clampedDeltaSeconds = Math.min(rawDeltaSeconds, MAX_DELTA_SECONDS);
        const scale = clampedDeltaSeconds / TARGET_FRAME_DURATION;

        this.onTick(scale);

        this.frameHandle = requestAnimationFrame(this.tick);
    }

    resetClock() {
        this.lastFrameTime = performance.now();
    }
}