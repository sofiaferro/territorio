p5.disableFriendlyErrors = true; // disables FES

let images = [];
let currentImageIndex = 0;
let numImages = 193;
let bgWidth, bgHeight;
let batchSize = 30;
let imagesLoaded = 0;
let soundFile;
let allImagesLoaded = false;

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
  if (currentImageIndex % batchSize === 0 && imagesLoaded < numImages) {
    loadBatch(currentImageIndex + 1);
  }
}

function imageBackwards() {
  currentImageIndex = (currentImageIndex - 1 + numImages) % numImages;
  if (soundFile.isLoaded()) {
    soundFile.play();
  }
  if (currentImageIndex % batchSize === 0 && imagesLoaded < numImages) {
    loadBatch(currentImageIndex - batchSize + 1);
  }
}

function loadBatch(startIndex) {
  if (startIndex > 0) {
    for (
      let i = startIndex;
      i < startIndex + batchSize && i <= numImages;
      i++
    ) {
      let img = loadImage(`data/assets/${i}-imagen.jpg`, () => {
        imagesLoaded++;
      });
      images.push(img);
    }
    if (imagesLoaded === numImages) {
      allImagesLoaded = true;
    }

    // shuffle once all images are loaded
    shuffleArray(images); 
  }
}

// p5
function preload() {
  // load sound
  soundFile = loadSound("data/trash_sound.mp3");
  
  // load the first batch of images
  loadBatch(1); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  calculateBackgroundSize({ width: windowWidth, height: windowHeight });
}

function draw() {
  background(0);
  windowResized();

  if (images.length > 0 && images[currentImageIndex]) {
    let xOffset = (width - bgWidth) / 2;
    let yOffset = (height - bgHeight) / 2;
    image(images[currentImageIndex], xOffset, yOffset, bgWidth, bgHeight);

    let alpha = map(sin(frameCount * 0.02), -3, 1, 100, 255);
    tint(255, alpha);
    image(images[currentImageIndex], xOffset + 25, yOffset, bgWidth, bgHeight);
  }
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
    imageForward();
  }
}
