export function renderStar(context, star) {
    const tail = star.getTailPosition();

    // Trail gradient: yellow at the head -> white -> transparent at the tail
    const gradient = context.createLinearGradient(
        star.x,
        star.y,
        tail.x,
        tail.y
    );

    gradient.addColorStop(0, "#FFF");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

    context.globalAlpha = star.opacity;
    context.strokeStyle = gradient;
    context.lineWidth = 4;
    context.lineCap = "round";

    context.beginPath();
    context.moveTo(star.x, star.y);
    context.lineTo(tail.x, tail.y);
    context.stroke();

    // Head
    context.fillStyle = "#FFF";
    context.beginPath();
    context.arc(star.x, star.y, 3, 0, Math.PI * 2);
    context.fill();

    context.globalAlpha = 1;
}