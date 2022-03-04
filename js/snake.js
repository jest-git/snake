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

  //flags
  let canPressArrow = true;

  runGame();

  function runGame() {
    setInterval(function () {
      calculateFrame();
      renderFrame();
      canPressArrow = true;
    }, 1000 / FPS);

    //snake steering
    document.addEventListener("keydown", snakeArrowSteering);
  }

  function calculateFrame() {
    //snake velocity
    snakePosX += snakeVelX;
    snakePosY += snakeVelY;

    snakeBandTeleport();

    //snake eat snake (must be before calculate snake trail)
    for (var i = 0; i < snakeTrail.length; i++) {
      if (snakeTrail[i].x === snakePosX && snakeTrail[i].y === snakePosY) {
        snakeTail = snakeStartTail;
      }
    }

    //calculate snake trail
    snakeTrail.push({ x: snakePosX, y: snakePosY });
    while (snakeTrail.length > snakeTail) {
      snakeTrail.shift();
    }

    //snake eat apple
    if (applePosX === snakePosX && applePosY === snakePosY) {
      snakeTail++;
      applePosX = Math.floor(Math.random() * gridSize);
      applePosY = Math.floor(Math.random() * gridSize);
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
        if (snakeVelY !== 1 && canPressArrow) {
          snakeVelX = 0;
          snakeVelY = -1;
          canPressArrow = false;
        }
        break;
      case "ArrowRight":
        if (snakeVelX !== -1 && canPressArrow) {
          snakeVelX = 1;
          snakeVelY = 0;
          canPressArrow = false;
        }
        break;
      case "ArrowDown":
        if (snakeVelY !== -1 && canPressArrow) {
          snakeVelX = 0;
          snakeVelY = 1;
          canPressArrow = false;
        }
        break;
      case "ArrowLeft":
        if (snakeVelX !== 1 && canPressArrow) {
          snakeVelX = -1;
          snakeVelY = 0;
          canPressArrow = false;
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
