//non OOP:

var speed = 1;
var level = 1;
var showDebug = false;
var stuv = localStorage.getItem("stuv");
var controls = localStorage.getItem("controls");
const CANVAS_OTHER = document.getElementById("CANVAS_OTHER");
const CTX_OTHER = CANVAS_OTHER.getContext("2d");
CANVAS_OTHER.height = window.innerHeight;
CANVAS_OTHER.width = window.innerWidth;
const CANVAS = document.getElementById("CANVAS");
const CTX = CANVAS.getContext("2d");
CANVAS.height = window.innerHeight;
CANVAS.width = window.innerWidth;
if (controls == "wasd") {
  var up = "KeyW";
  var left = "KeyD";
  var right = "KeyA";
  var down = "KeyS";
}
else if (controls == "arrow") {
  var up = "ArrowUp";
  var left = "ArrowRight";
  var right = "ArrowLeft";
  var down = "ArrowDown";
}
var x = CANVAS.width / 2;
var y = CANVAS.height / 2 + CANVAS.height / 4;
var finnalX = CANVAS.width / 2;
var finnalXOther = CANVAS.width / 2;
var touchX = 0;
var touchY = 0;
var touchDirX = 0;
var touchDirY = 0;


//check
var circle = function (x, y, radius, isFilled, fillColor, outlineColor) {
  CTX_OTHER.strokeStyle = outlineColor;
  CTX_OTHER.fillStyle = fillColor;
  CTX_OTHER.beginPath();
  CTX_OTHER.arc(x, y, radius, 0, Math.PI * 2, false);
  if (isFilled) {
    CTX_OTHER.fill();
  } else {
    CTX_OTHER.stroke();
  }
};
//check
var mazeWidth = function () {
  return CANVAS.width / 16;
};
//check
var drawBackground = function () {
  CTX.fillStyle = "yellow";
  CTX.fillRect(0, 0, CANVAS.width, CANVAS.height);
};
//check
var drawUum = function (x, y) {
  CTX_OTHER.lineWidth = 2;
  //body:
  circle(x, y, CANVAS.width / 19, true, "#ffb3cf");

  //arms:
  circle(x - CANVAS.width / 19, y, CANVAS.width / 19 / 5, true, "#ffb3cf");
  circle(x + CANVAS.width / 19, y, CANVAS.width / 19 / 5, true, "#ffb3cf");

  //belly:
  CTX_OTHER.fillStyle = "SeaShell";
  CTX_OTHER.beginPath();
  CTX_OTHER.ellipse(
    x,
    y + CANVAS.width / 19 / 2,
    CANVAS.width / 19 / 1.3,
    CANVAS.width / 19 / 1.92,
    0,
    0,
    2 * Math.PI,
    false
  );
  CTX_OTHER.fill();

  //eyes:
  circle(
    x - CANVAS.width / 95,
    y - CANVAS.width / 19 / 4,
    CANVAS.width / 125.4,
    true,
    "black",
    "black"
  );
  circle(
    x + CANVAS.width / 95,
    y - CANVAS.width / 19 / 4,
    CANVAS.width / 125.4,
    true,
    "black",
    "black"
  );
};
//check
var drawDig = function (X, y) {
  CTX_OTHER.lineWidth = 2;
  //body:
  circle(x, y, CANVAS.width / 19, true, "Chocolate", "brown");

  //belly:
  CTX_OTHER.fillStyle = "SeaShell";
  CTX_OTHER.beginPath();
  CTX_OTHER.ellipse(
    x,
    y + CANVAS.width / 19 / 2,
    CANVAS.width / 19 / 1.3,
    CANVAS.width / 19 / 1.92,
    0,
    0,
    2 * Math.PI,
    false
  );
  CTX_OTHER.fill();

  //mane:
  circle(x, y, CANVAS.width / 28.5, true, "GoldenRod", "pog");

  //eyes:
  circle(
    x - CANVAS.width / 75,
    y - CANVAS.width / 60,
    CANVAS.width / 125.4,
    true,
    "black",
    "black"
  );
  circle(
    x + CANVAS.width / 75,
    y - CANVAS.width / 60,
    CANVAS.width / 125.4,
    true,
    "black",
    "black"
  );

  //snoot:
  CTX_OTHER.fillStyle = "white";
  CTX_OTHER.beginPath();
  CTX_OTHER.ellipse(
    x,
    y,
    CANVAS.width / 80,
    CANVAS.width / 120,
    0,
    0,
    Math.PI * 2,
    false
  );
  CTX_OTHER.fill();

  //nose:
  circle(x, y, CANVAS.width / 240, true, "black", "pog");

  //ears:
  circle(
    x - CANVAS.width / 28,
    y - CANVAS.width / 22,
    CANVAS.width / 62.7,
    true,
    "Chocolate",
    false
  );
  circle(
    x + CANVAS.width / 28,
    y - CANVAS.width / 22,
    CANVAS.width / 62.7,
    true,
    "Chocolate",
    false
  );
};
//check
var drawIll = function (x, y) {
  CTX_OTHER.lineWidth = 8;

  //body:
  circle(x, y, CANVAS.width / 19, true, "silver");

  //tume:
  CTX_OTHER.fillStyle = "SeaShell";
  CTX_OTHER.beginPath();
  CTX_OTHER.ellipse(
    x,
    y + CANVAS.width / 19 / 2,
    CANVAS.width / 19 / 1.3,
    CANVAS.width / 19 / 1.92,
    0,
    0,
    2 * Math.PI,
    false
  );
  CTX_OTHER.fill();

  //uurs:
  circle(
    x - CANVAS.width / 28,
    y - CANVAS.width / 22,
    CANVAS.width / 62.7,
    true,
    "pink",
    false
  );
  circle(
    x + CANVAS.width / 28,
    y - CANVAS.width / 22,
    CANVAS.width / 62.7,
    true,
    "pink",
    false
  );
  circle(
    x - CANVAS.width / 28,
    y - CANVAS.width / 22,
    CANVAS.width / 62.7,
    false,
    "silver",
    "silver"
  );
  circle(
    x + CANVAS.width / 28,
    y - CANVAS.width / 22,
    CANVAS.width / 62.7,
    false,
    "silver",
    "silver"
  );

  //snootle:
  CTX_OTHER.fillStyle = "white";
  CTX_OTHER.beginPath();
  CTX_OTHER.ellipse(
    x,
    y - CANVAS.height / 48,
    CANVAS.width / 120,
    CANVAS.width / 180,
    0,
    0,
    Math.PI * 2,
    false
  );
  CTX_OTHER.fill();

  //uus:
  circle(
    x - CANVAS.width / 60,
    y - CANVAS.width / 60,
    CANVAS.width / 140,
    true,
    "black",
    "black"
  );
  circle(
    x + CANVAS.width / 60,
    y - CANVAS.width / 60,
    CANVAS.width / 140,
    true,
    "black",
    "black"
  );

  //nose:
  circle(x, y - CANVAS.height / 48, CANVAS.width / 360, true, "black", false);
};
//check
var drawCod = function (x, y) {
  CTX_OTHER.lineWidth = 4;

  //body:
  circle(x, y, CANVAS.width / 19, true, "SeaShell", false);

  //nose:
  circle(x, y - CANVAS.height / 48, CANVAS.width / 360, true, "pink", false);

  //uus:
  CTX_OTHER.strokeStyle = "black";
  CTX_OTHER.beginPath();
  CTX_OTHER.arc(
    x - CANVAS.width / 60,
    y - CANVAS.width / 60,
    CANVAS.width / 140,
    0,
    Math.PI,
    true
  );
  CTX_OTHER.moveTo(x + CANVAS.width / 40, y - CANVAS.width / 60);
  CTX_OTHER.arc(
    x + CANVAS.width / 60,
    y - CANVAS.width / 60,
    CANVAS.width / 140,
    0,
    Math.PI,
    true
  );
  CTX_OTHER.stroke();

  //black spot:
  CTX_OTHER.fillStyle = "black";
  CTX_OTHER.beginPath();
  CTX_OTHER.moveTo(x, y + CANVAS.width / 19);
  CTX_OTHER.quadraticCurveTo(
    x + CANVAS.width / 19,
    y + CANVAS.width / 19,
    x + CANVAS.width / 19,
    y
  );
  CTX_OTHER.fill();

  //brown spot:
  CTX_OTHER.fillStyle = "#d98238";
  CTX_OTHER.beginPath();
  CTX_OTHER.moveTo(x, y - CANVAS.width / 19);
  CTX_OTHER.quadraticCurveTo(
    x - CANVAS.width / 19,
    y - CANVAS.width / 19,
    x - CANVAS.width / 19,
    y
  );
  CTX_OTHER.fill();

  //urs:
  CTX_OTHER.fillStyle = "#d98238";
  CTX_OTHER.beginPath();
  CTX_OTHER.moveTo(x - CANVAS.width / 19, y - CANVAS.width / 76);
  CTX_OTHER.lineTo(x - CANVAS.width / 19, y - CANVAS.width / 23.75);
  CTX_OTHER.lineTo(x - CANVAS.width / 76, y - CANVAS.width / 23.75);
  CTX_OTHER.fill();

  CTX_OTHER.fillStyle = "black";
  CTX_OTHER.beginPath();
  CTX_OTHER.moveTo(x + CANVAS.width / 40, y - CANVAS.width / 60);
  CTX_OTHER.lineTo(
    x + CANVAS.width / 40 + CANVAS.width / 120,
    CANVAS.width / 120
  );
  CTX_OTHER.fill();
};
//check
var drawPog = function (x, y) {
  circle(x, y, CANVAS.width / 19, true, "black", false);
};
//check
var drawInfo = function () {
  document.getElementById("level").textContent = "Level: " + level;
};
//check
var testCollide = function () {
  //for edge:
  if (x <= 0) {
    x = 0;
  }
  if (x >= CANVAS.width) {
    x = CANVAS.width;
  }
  if (y <= 0) {
    y = 0;
  }
  if (y >= CANVAS.height) {
    y = CANVAS.height;
  }

  //for maze borders:
  var uumBoxWidth = 248;
  var uumBoxHeight = 204;

  var mazeData = CTX.getImageData(
    x - uumBoxWidth / 2,
    y - uumBoxHeight / 2,
    uumBoxWidth,
    uumBoxHeight
  ).data;
  var uumData = CTX_OTHER.getImageData(
    x - uumBoxWidth / 2,
    y - uumBoxHeight / 2,
    uumBoxWidth,
    uumBoxHeight
  ).data;

  for (var pix = 0; pix < uumBoxWidth * uumBoxHeight; pix++) {
    var isInUum = uumData[4 * pix + 3] > 0; // alpha of Uum CANVAS is > 0;
    if (
      isInUum &&
      !(
        mazeData[4 * pix] === 255 &&
        mazeData[4 * pix + 1] === 255 &&
        mazeData[4 * pix + 2] === 0
      )
    ) {
      level = 1;
      x = CANVAS.width / 2;
      y = CANVAS.height / 2 + CANVAS.height / 2 / 2;
      speed = 5;
    }
  }
};
//check
var drawWin = function () {
  document.getElementById("win").textContent = "You Win!";
  document.getElementById("uum").src = "images/uum.png";
  document.getElementById("uum").height = 200;
  document.getElementById("uum").width = 250;
};
class Ball {
  constructor() {
    this.x = 100;
    this.y = 100;
    this.xSpeed = -16;
    this.ySpeed = 24;
  }
  draw() {
    //circle(this.x, this.y, 50, true, 'purple', 'black');
    CTX.fillStyle = "purple";
    CTX.beginPath();
    CTX.arc(this.x, this.y, 40, 0, Math.PI * 2, false);
    CTX.fill();
  }
  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
  checkCollision() {
    if (this.x < 0 || this.x > CANVAS.width) {
      this.xSpeed = -this.xSpeed;
    }
    if (this.y < 0 || this.y > CANVAS.height) {
      this.ySpeed = -this.ySpeed;
    }
  }
}
var ball = new Ball();
//check
var drawMazeBorders = function () {
  //for level 1:
  CTX.fillStyle = "blue";
  if (level == 1) {
    CTX.fillRect(
      CANVAS.width / 2 / 2,
      CANVAS.height / 2 - CANVAS.height / 2 / 2,
      mazeWidth(),
      CANVAS.height / 2 + CANVAS.height / 2 / 2
    );

    CTX.fillRect(CANVAS.width / 2, 0, mazeWidth(), CANVAS.height / 2);
    CTX.fillRect(0, 0, (CANVAS.width / 4) * 2 + 5, mazeWidth());
    CTX.fillRect(0, 0, mazeWidth(), CANVAS.height / 2);
    CTX.fillRect(
      CANVAS.width / 2,
      (CANVAS.height / 2 / 2 / 2) * 7.5,
      CANVAS.width,
      CANVAS.height
    );
    CTX.fillRect(
      (CANVAS.width / 2 / 2 / 2) * 7.5,
      0,
      CANVAS.width,
      CANVAS.height
    );
  }

  //for level 2:
  CTX.fillStyle = "green";
  if (level == 2) {
    CTX.fillRect(
      CANVAS.width / 2 / 2,
      CANVAS.height / 2,
      mazeWidth(),
      CANVAS.height / 2 + CANVAS.height / 2 / 2
    );
    CTX.fillRect(
      CANVAS.width / 2 + CANVAS.width / 2 / 2,
      CANVAS.height / 2,
      mazeWidth(),
      CANVAS.height
    );
    CTX.fillRect(0, CANVAS.height / 2, CANVAS.width / 4 + 5, mazeWidth());
    CTX.fillRect(
      CANVAS.width / 2 + CANVAS.width / 2 / 2 / 2,
      CANVAS.height / 2,
      CANVAS.width / 2,
      mazeWidth()
    );
    CTX.fillRect(0, 0, mazeWidth(), CANVAS.height / 2);
    CTX.fillRect(CANVAS.width - mazeWidth(), 0, mazeWidth(), CANVAS.height / 2);
    CTX.fillRect(mazeWidth() * 4, 0, CANVAS.width, mazeWidth());
  }

  //for level 3:
  CTX.fillStyle = "red";
  if (level == 3) {
    CTX.fillRect(
      CANVAS.width / 2 / 2,
      (CANVAS.height / 2) * 1.4,
      CANVAS.width,
      mazeWidth()
    );
    CTX.fillRect(
      0,
      CANVAS.height / 2 - CANVAS.height / 2 / 2,
      CANVAS.width / 2 + CANVAS.width / 2 / 2,
      mazeWidth()
    );
  }

  //for level 4:
  CTX.fillStyle = "orange";
  if (level == 4) {
    //draw:
    CTX.fillRect(finnalX, CANVAS.height / 2, CANVAS.width / 2 / 2, mazeWidth());
    CTX.fillRect(
      finnalXOther,
      CANVAS.height / 2 - CANVAS.height / 2 / 2,
      CANVAS.width / 2 / 2,
      mazeWidth()
    );

    //move:
    if (finnalX < CANVAS.width) finnalX += 5;
    else finnalX = 0;

    if (finnalXOther > 0) finnalXOther -= 5;
    else finnalXOther = CANVAS.width;
  }

  //for level 5:
  CTX.fillStyle = "purple";
  if (level == 5) {
    ball.draw();
    ball.move();
    ball.checkCollision();
  }

  //for level 6:
  CTX.fillStyle = "green";
  if (level == 6) {
    CTX.fillRect(
      0,
      CANVAS.height / 2 + CANVAS.height / 2 / 2 / 2,
      CANVAS.width / 2 / 2,
      CANVAS.height
    );
    CTX.fillRect(0, 0, CANVAS.width, mazeWidth());
    CTX.fillRect(CANVAS.width / 2, 0, CANVAS.width, CANVAS.height);
    CTX.fillStyle = "yellow";
    CTX.fillRect(
      CANVAS.width / 2 - 5,
      CANVAS.height / 4,
      CANVAS.width,
      CANVAS.height / 4
    );
    CTX.fillRect(
      CANVAS.width / 2 + CANVAS.width / 2 / 2,
      0,
      CANVAS.width,
      CANVAS.height
    );
  }

  //for level 7:
  CTX.fillStyle = "blue";
  if (level == 7) {
    CTX.fillRect(
      CANVAS.width / 2,
      CANVAS.height / 2 + CANVAS.height / 8,
      CANVAS.width,
      mazeWidth() * 2
    );
    CTX.fillRect(0, 0, CANVAS.width, mazeWidth() * 2);
    CTX.fillRect(0, 0, mazeWidth() * 2, CANVAS.height);
  }
};
//check
var testLevel = function () {
  if (y <= 0 && level != (6 || 7)) {
    level++;
    y = CANVAS.height;
  }

  if (level == 6 && x <= 0) {
    level++;
    x = CANVAS.width;
  }

  if (level == 7 && y >= CANVAS.height) {
    level++;
    y = CANVAS.height;
  }

  if (level == 8) {
    level = "You Win!!";
    clearInterval(mainLoop);
    drawWin();
  }
};
//check
var debug = function () {
  if (showDebug) {
    document.getElementById("moreInfo").textContent =
      `XY= ${x}, ${y}\nspeed=${speed}\nimg: ` +
      CTX.getImageData(x, y, 1, 1).data.join(", ");
  } else {
    document.getElementById("moreInfo").textContent = "";
  }
};
//check
var drawStuv = function () {
  if (stuv == "uum") {
    drawUum(x, y);
  }
  if (stuv == "dig") {
    drawDig(x, y);
  }
  if (stuv == "cod") {
    drawCod(x, y);
  }
  if (stuv == "ill") {
    drawIll(x, y);
  }
  if (stuv == "pog") {
    drawPog(x, y);
  }
};
//check
var sendKeyDown = function (event) {
  var code = event.code;
  if (code == left) {
    x += speed; // move uum left
    if (level != 5 && level != 4) {
      speed++;
    }
  }
  if (code == right) {
    x -= speed; //move uum right
    if (level != 5 && level != 4) {
      speed++;
    }
  }
  if (code == up) {
    y -= speed; //move uum up
    if (level != 5 && level != 4) {
      speed++;
    }
  }
  if (code == down) {
    y += speed; //move uum down
    if (level != 5 && level != 4) {
      speed++;
    }
  }
  if (code == "KeyI") {
    showDebug = !showDebug; //togle debug
  }
};
//check
var sendKeyUp = function (event) {
  var code = event.code;
  if (code == right || code == left || code == up || code == down) speed = 1;
};
document.addEventListener("keydown", sendKeyDown);
document.addEventListener("keyup", sendKeyUp);
//main loop:
//check
var mainLoop = setInterval( () => {

  if (level == 4 && stuv != "pog") {
    speed = 7;
  } else if (level == 5 && stuv != "pog") {
    speed = 13;
  }

  CANVAS.height = window.innerHeight;
  CANVAS.width = window.innerWidth;
  CANVAS_OTHER.height = window.innerHeight;
  CANVAS_OTHER.width = window.innerWidth;

  drawBackground();
  drawMazeBorders();
  drawStuv(x, y);
  testLevel();
  if (stuv != "pog") {
    testCollide();
  }
  debug();
  drawInfo();
}, 30);