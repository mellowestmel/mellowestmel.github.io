class DraggableWindow {
  static highestZIndex = 1;

  constructor(element) {
    this.element = element;
    this.contentElement = element.querySelector(".content");

    this.isDragging = false;
    this.offsetX = 0;
    this.offsetY = 0;

    this.init();
  }

  init() {
    this.element.addEventListener("pointerdown", (event) => {
      if (this.contentElement.contains(event.target)) return;

      this.isDragging = true;

      const rect = this.element.getBoundingClientRect();

      this.offsetX = event.clientX - rect.left;
      this.offsetY = event.clientY - rect.top;

      this.bringToFront();

      this.element.setPointerCapture(event.pointerId);
    });

    this.element.addEventListener("pointermove", (event) => {
      if (!this.isDragging) return;

      this.element.style.left =
        (event.clientX - this.offsetX) + "px";

      this.element.style.top =
        (event.clientY - this.offsetY) + "px";
    });

    this.element.addEventListener("pointerup", () => {
      this.isDragging = false;
    });
  }

  bringToFront() {
    this.element.style.zIndex = DraggableWindow.highestZIndex++;
  }
}

function createWindowFromImage(src, x, y) {
  const image = new Image();

  image.onload = () => {
    const windowElement = document.createElement("div");
    windowElement.className = "window";

    const width = image.naturalWidth;
    const height = image.naturalHeight;

    windowElement.style.width = width + "px";
    windowElement.style.height = height + "px";

    windowElement.style.left = x + "px";
    windowElement.style.top = y + "px";

    windowElement.style.backgroundImage = `url(${src})`;

    windowElement.innerHTML = `
      <div class="titlebar">Window</div>
      <div class="content"></div>
    `;

    document.getElementById("desktop").appendChild(windowElement);

    new DraggableWindow(windowElement);
  };

  image.src = src;
}

createWindowFromImage("/src/assets/window.webp", 800, 800)