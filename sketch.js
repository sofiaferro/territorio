let currentIndex = 0;
let bgWidth, bgHeight;
let imagePaths = [];
let maxImages = 193; // Número máximo de imágenes
let isLoading = false;
let currentImage;
let soundFile;
let toastMessage = "← ↑ → ↓ 🖱️";
let init = false;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = floor(random(i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function showPopUp() {
  /*  if (init) {
    // Calcular posiciones y tamaños en función del tamaño del canvas
    let rectWidth = windowWidth / 2;
    let rectHeight = windowHeight / 2;
    let rectX = (width - rectWidth) / 2;
    let rectY = (height - rectHeight) / 2;

    // Dibujar el rectángulo
    fill(0);
    rectMode(CORNER);
    rect(rectX, rectY, rectWidth, rectHeight);

    // Mostrar la cruz
    fill(255);
    textAlign(CENTER, CENTER);
    textFont("Courier New", 24);
    text("X", rectX + rectWidth - 20, rectY + 20);

    // Mostrar el mensaje
    fill(255);
    textFont("Courier New", 32);
    textAlign(CENTER, CENTER);

    text(toastMessage, width / 2, height / 2);
  } */
}

function preload() {
  for (let i = 1; i <= maxImages; i++) {
    let imageName = "data/assets/" + i + "-imagen.jpg";
    imagePaths.push(imageName);
  }

  if (imagePaths.length > 0) {
    shuffleArray(imagePaths);
    loadImageAtIndex(currentIndex);
  }

  // Carga el archivo de sonido
  soundFile = loadSound("data/whatsapp_sound.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  calculateBackgroundSize({ width: windowWidth, height: windowHeight });
}

function calculateBackgroundSize(bg) {
  let canvasRatio = width / height;
  let bgRatio = bg.width / bg.height;

  if (canvasRatio > bgRatio) {
    bgWidth = width;
    bgHeight = bgWidth / bgRatio;
  } else {
    bgHeight = height;
    bgWidth = bgHeight * bgRatio;
  }
}

function draw() {
  background(0);
  windowResized();

  if (isLoading) {
    fill(255);
    text("Loading...", windowWidth / 2, windowHeight / 2);
  } else if (currentImage != null) {
    let xOffset = (width - bgWidth) / 2;
    let yOffset = (height - bgHeight) / 2;
    image(currentImage, xOffset, yOffset, bgWidth, bgHeight);
    let alpha = map(sin(frameCount * 0.02), -3, 1, 100, 255);
    tint(255, alpha);
    image(currentImage, xOffset + 25, yOffset, bgWidth, bgHeight);
    showPopUp();
  } else {
    fill(255);
    textAlign(CENTER, CENTER);
    text("No images loaded", width / 2, height / 2);
  }
}

function imageForward() {
  currentIndex = (currentIndex + 1) % imagePaths.length;
  loadImageAtIndex(currentIndex);
  if (soundFile.isLoaded()) {
    soundFile.play();
  }
}

function imageBackwards() {
  currentIndex = (currentIndex - 1 + imagePaths.length) % imagePaths.length;
  loadImageAtIndex(currentIndex);
  if (soundFile.isLoaded()) {
    soundFile.play();
  }
}

function keyPressed() {
  if (!init) {
    if (keyCode === RIGHT_ARROW || keyCode === UP_ARROW) {
      imageForward();
    } else if (keyCode === LEFT_ARROW || keyCode === DOWN_ARROW) {
      imageBackwards();
    }
    calculateBackgroundSize(currentImage);
  }
}

function mouseClicked() {
  let rectWidth = windowWidth / 2;
  let rectHeight = windowHeight / 2;
  let rectX = (windowWidth - rectWidth) / 2;
  let rectY = (windowHeight - rectHeight) / 2;
  if (
    mouseX > rectX + rectWidth - 40 &&
    mouseX < rectX + rectWidth &&
    mouseY > rectY &&
    mouseY < rectY + 40
  ) {
    return (init = false); // Establecer init en false para ocultar el pop-up
  }
  if (!init && mouseButton === "left") {
    return imageForward();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (imagePaths.length > 0) {
    calculateBackgroundSize(currentImage);
  }
}

function loadImageAtIndex(index) {
  if (index < 0 || index >= imagePaths.length) {
    console.log("Index out of bounds: " + index);
    return;
  }
  let path = imagePaths[index];
  isLoading = true;
  currentImage = loadImage(path, () => {
    isLoading = false;
    if (currentImage == null) {
      console.log("Failed to load image");
    } else {
      console.log("Loaded image");
    }
  });
}
