let images = [];
let currentImageIndex = 0;
let numImages = 193;
let bgWidth, bgHeight;
let loading;

// utils
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = floor(random(i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function calculateBackgroundSize(bg) {
  let canvasRatio = windowWidth / windowHeight;
  let bgRatio = bg.width / bg.height;
  if (canvasRatio > bgRatio) {
    bgWidth = windowWidth;
    bgHeight = bgWidth / bgRatio;
  } else {
    bgHeight = windowHeight;
    bgWidth = bgHeight * bgRatio;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (images.length > 0) {
    calculateBackgroundSize(images[currentImageIndex]);
  }
}

function imageForward() {
  currentImageIndex = (currentImageIndex + 1) % numImages;
  if (soundFile.isLoaded()) {
    soundFile.play();
  }
}

function imageBackwards() {
  currentImageIndex = (currentImageIndex - 1 + numImages) % numImages;
  if (soundFile.isLoaded()) {
    soundFile.play();
  }
}

// p5
function preload() {
  // load images
  for (let i = 1; i <= numImages; i++) {
    let img = loadImage(`data/assets/${i}-imagen.jpg`);
    images.push(img);
  }
  
  // randomize array
  if (images.length > 0) {
    shuffleArray(images);
  }

  // load sound
  soundFile = loadSound("data/whatsapp_sound.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  calculateBackgroundSize({ width: windowWidth, height: windowHeight });
}

function draw() {
  // No limpiar la pantalla

  // Centrar la imagen actual
  let xOffset = (width - bgWidth) / 2;
  let yOffset = (height - bgHeight) / 2;
  image(images[currentImageIndex], xOffset, yOffset, bgWidth, bgHeight);

  // Aplicar efecto de transparencia a la imagen actual
  let alpha = map(sin(frameCount * 0.02), -3, 1, 100, 255);
  tint(255, alpha);
  image(images[currentImageIndex], xOffset + 25, yOffset, bgWidth, bgHeight);
}

// events
function keyPressed() {
  if (keyCode === RIGHT_ARROW || keyCode === UP_ARROW) {
    imageForward();
  } else if (keyCode === LEFT_ARROW || keyCode === DOWN_ARROW) {
    imageBackwards();
  }
}

function mouseClicked() {
  if (mouseButton === "left") {
    return imageForward();
  }
}
