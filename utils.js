export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  export function calculateBackgroundSize(p, img) {
    let canvasRatio = p.windowWidth / p.windowHeight;
    let imgRatio = img.width / img.height;
    let bgWidth, bgHeight;
  
    if (canvasRatio > imgRatio) {
      bgWidth = p.windowWidth;
      bgHeight = bgWidth / imgRatio;
    } else {
      bgHeight = p.windowHeight;
      bgWidth = bgHeight * imgRatio;
    }
  
    return { bgWidth, bgHeight };
  }
  
  export function windowResized(p, images, currentImageIndex, setImageIndex) {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    if (images.length > 0) {
      setImageIndex(currentImageIndex);
    }
  }
  
  export function imageForward(p, images, currentImageIndex, soundFile, numImages, setImageIndex) {
    setImageIndex((currentImageIndex + 1) % numImages);
    if (soundFile.isLoaded()) {
      soundFile.play();
    }
  }
  
  export function imageBackwards(p, images, currentImageIndex, soundFile, numImages, setImageIndex) {
    setImageIndex((currentImageIndex - 1 + numImages) % numImages);
    if (soundFile.isLoaded()) {
      soundFile.play();
    }
  }
  
  export function keyPressed(p, images, currentImageIndex, numImages, soundFile, imageForward, imageBackwards, setImageIndex) {
    if (p.keyCode === p.RIGHT_ARROW || p.keyCode === p.UP_ARROW) {
      imageForward(p, images, currentImageIndex, soundFile, numImages, setImageIndex);
    } else if (p.keyCode === p.LEFT_ARROW || p.keyCode === p.DOWN_ARROW) {
      imageBackwards(p, images, currentImageIndex, soundFile, numImages, setImageIndex);
    }
  }
  
  export function mouseClicked(p, imageForward, setImageIndex) {
    if (p.mouseButton === p.LEFT) {
      imageForward(p, setImageIndex);
    }
  }
  