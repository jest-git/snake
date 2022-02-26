window.onload = function () {
  // canvas
  let canvas = document.getElementById("gameCanvas");
  let canvasCtx = canvas.getContext("2d");
  const tileSizeXY = 20;
  const gridSize = 30;
  canvas.width = canvas.height = tileSizeXY * gridSize;

  //game setup
  const bgColour = "black";
  const FPS = 20;

  //snake setup
  const snakeColour = "lime";
  let snakePosX = 10;
  let snakePosY = 10;
  const snakeStartTail = 5;
  let snakeTail = snakeStartTail;
  let snakeTrail = [];
  let snakeVelX = 0;
  let snakeVelY = 0;

  runGame();

  function runGame() {
    setInterval(function () {
      calculateFrame();
      renderFrame();
    }, 1000 / FPS);

    //snake steering
    document.addEventListener("keydown", snakeArrowSteering);
  }

  function calculateFrame() {
    //snake velocity
    snakePosX += snakeVelX;
    snakePosY += snakeVelY;
  }

  function renderFrame() {
    //draw background
    drawRect(0, 0, canvas.width, canvas.height, bgColour);

    //draw snake
    drawRect(snakePosX * tileSizeXY, snakePosY * tileSizeXY, tileSizeXY, tileSizeXY, snakeColour);
  }

  function drawRect(posX, posY, width, height, colour) {
    canvasCtx.fillStyle = colour;
    canvasCtx.fillRect(posX, posY, width, height);
  }

  function snakeArrowSteering(evt) {
    switch (evt.code) {
      case "ArrowUp":
        snakeVelX = 0;
        snakeVelY = -1;
        break;
      case "ArrowRight":
        snakeVelX = 1;
        snakeVelY = 0;
        break;
      case "ArrowDown":
        snakeVelX = 0;
        snakeVelY = 1;
        break;
      case "ArrowLeft":
        snakeVelX = -1;
        snakeVelY = 0;
    }
  }
};
