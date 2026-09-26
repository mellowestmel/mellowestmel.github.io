import { createCanvasController } from "./canvasController.js";
import { StarField } from "./field.js";
import { AnimationLoop } from "./animationLoop.js";

export function init(canvasElementId) {
    const canvasElement = document.getElementById(canvasElementId);
    if (!canvasElement) return;

    const { context, resizeToWindow } = createCanvasController(canvasElement);
    const starField = new StarField(canvasElement);

    const loop = new AnimationLoop((scale) => {
        context.clearRect(0, 0, canvasElement.width, canvasElement.height);
        starField.advanceAll(scale);
        starField.renderAll(context);
    });

    loop.start();

    document.addEventListener("visibilitychange", () => {
        if (!document.hidden) {
            loop.resetClock();
        }
    });

    let resizeDebounceTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeDebounceTimer);
        resizeDebounceTimer = setTimeout(resizeToWindow, 100);
    });
}

init("shootingStarsCanvas");