export function renderStar(context, star) {
    const tail = star.getTailPosition();

    context.globalAlpha = star.opacity;
    context.beginPath();
    context.moveTo(star.x, star.y);
    context.lineTo(tail.x, tail.y);
    context.stroke();
}