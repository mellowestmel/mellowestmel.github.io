export function createCanvasController(canvasElement) {
    const context = canvasElement.getContext("2d");

    function resizeToWindow() {
        canvasElement.width = window.innerWidth;
        canvasElement.height = window.innerHeight;
    }

    resizeToWindow();
    
    window.addEventListener("resize", resizeToWindow);
    return { canvasElement, context, resizeToWindow };
}