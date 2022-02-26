window.onload = function () {
  // canvas
  let canvas = document.getElementById("gameCanvas");
  let canvasCtx = canvas.getContext("2d");
  const tileSizeXY = 20;
  const gridSize = 30;
  canvas.width = canvas.height = tileSizeXY * gridSize;

  //game setup
  const bgColour = "black";
  const FPS = 30;

  runGame();

  function runGame() {
    setInterval(function () {
      calculateFrame();
      renderFrame();
    }, 1000 / FPS);
  }

  function calculateFrame() {}

  function renderFrame() {
    //draw background
    drawRect(0, 0, canvas.width, canvas.height, bgColour);
  }

  function drawRect(posX, posY, width, height, colour) {
    canvasCtx.fillStyle = colour;
    canvasCtx.fillRect(posX, posY, width, height);
  }
};
