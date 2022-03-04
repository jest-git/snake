window.onload = function () {
  // canvas
  let canvas = document.getElementById("gameCanvas");
  let canvasCtx = canvas.getContext("2d");
  const tileSizeXY = 20;
  const gridSize = 30;
  canvas.width = canvas.height = tileSizeXY * gridSize;

  //game setup
  const bgColour = "black";
  const FPS = 10;
  const tilePadding = 2;

  //snake setup
  const snakeColour = "lime";
  let snakePosX = 10;
  let snakePosY = 10;
  const snakeStartTail = 5;
  let snakeTail = snakeStartTail;
  let snakeTrail = [];
  let snakeVelX = 0;
  let snakeVelY = 0;

  //apple setup
  const appleColour = "red";
  let applePosX = 12;
  let applePosY = 12;

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

    snakeBandTeleport();

    snakeTrail.push({ x: snakePosX, y: snakePosY });
    while (snakeTrail.length > snakeTail) {
      snakeTrail.shift();
    }
  }

  function renderFrame() {
    //draw background
    drawRect(0, 0, canvas.width, canvas.height, bgColour);

    //draw snake
    for (var i = 0; i < snakeTrail.length; i++) {
      drawRect(
        snakeTrail[i].x * tileSizeXY,
        snakeTrail[i].y * tileSizeXY,
        tileSizeXY - tilePadding,
        tileSizeXY - tilePadding,
        snakeColour
      );
    }

    //draw apple
    drawRect(
      applePosX * tileSizeXY,
      applePosY * tileSizeXY,
      tileSizeXY - tilePadding,
      tileSizeXY - tilePadding,
      appleColour
    );
  }

  /*
    functions library
  */
  function drawRect(posX, posY, width, height, colour) {
    canvasCtx.fillStyle = colour;
    canvasCtx.fillRect(posX, posY, width, height);
  }

  function snakeArrowSteering(evt) {
    switch (evt.code) {
      case "ArrowUp":
        if (snakeVelY !== 1) {
          snakeVelX = 0;
          snakeVelY = -1;
        }
        break;
      case "ArrowRight":
        if (snakeVelX !== -1) {
          snakeVelX = 1;
          snakeVelY = 0;
        }
        break;
      case "ArrowDown":
        if (snakeVelY !== -1) {
          snakeVelX = 0;
          snakeVelY = 1;
        }
        break;
      case "ArrowLeft":
        if (snakeVelX !== 1) {
          snakeVelX = -1;
          snakeVelY = 0;
        }
    }
  }

  function snakeBandTeleport() {
    if (snakePosX < 0) {
      snakePosX = gridSize - 1;
    }
    if (snakePosX > gridSize - 1) {
      snakePosX = 0;
    }
    if (snakePosY < 0) {
      snakePosY = gridSize - 1;
    }
    if (snakePosY > gridSize - 1) {
      snakePosY = 0;
    }
  }
};
