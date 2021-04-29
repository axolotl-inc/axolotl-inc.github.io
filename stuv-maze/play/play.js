//setup variables:
var speed = 1;
var level = 1;
var showDebug = false;
var stuv = localStorage.getItem("stuv");
var controls = localStorage.getItem("controls");
//this canvas, or "canvasOTHER" is for just the stuv:
const canvasOTHER = document.getElementById("canvasOTHER");
const ctxOTHER = canvasOTHER.getContext("2d");
canvasOTHER.height = window.innerHeight;
canvasOTHER.width = window.innerWidth;
//this is the canvas for everything else:
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
if (controls == "wasd") {
  var up = "KeyW";
  var left = "KeyD";
  var right = "KeyA";
  var down = "KeyS";
}
if (controls == "arrow") {
  var up = "ArrowUp";
  var left = "ArrowRight";
  var right = "ArrowLeft";
  var down = "ArrowDown";
}
if (controls == "mobile") {
  var mobileControls = $(".mobileControls");
  var topPog = canvas.height - canvas.width / 7;
  var leftPog = canvas.width - canvas.width / 7;

  mobileControls.css({
    top: topPog,
    left: leftPog
  });
} else {
  var mobileControls = $(".mobileControls");

  mobileControls.css({
    display: "none"
  });
}
var x = canvas.width / 2;
var y = canvas.height / 2 + canvas.height / 4;
var finnalX = canvas.width / 2;
var finnalXOther = canvas.width / 2;

//circle function:
var circle = function (x, y, radius, isFilled, fillColor, outlineColor) {
  ctxOTHER.strokeStyle = outlineColor;
  ctxOTHER.fillStyle = fillColor;
  ctxOTHER.beginPath();
  ctxOTHER.arc(x, y, radius, 0, Math.PI * 2, false);
  if (isFilled) {
    ctxOTHER.fill();
  } else {
    ctxOTHER.stroke();
  }
};

//maze border width function:
var mazeWidth = function () {
  return canvas.width / 2 / 2 / 2 / 2;
};

//background function:
var drawBackground = function () {
  ctx.fillStyle = "yellow";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

//draw uum function:
var drawUum = function (x, y) {
  ctxOTHER.lineWidth = 2;
  //body:
  circle(x, y, canvas.width / 19, true, "#ffb3cf");

  //arms:
  circle(x - canvas.width / 19, y, canvas.width / 19 / 5, true, "#ffb3cf");
  circle(x + canvas.width / 19, y, canvas.width / 19 / 5, true, "#ffb3cf");

  //belly:
  ctxOTHER.fillStyle = "SeaShell";
  ctxOTHER.beginPath();
  ctxOTHER.ellipse(
    x,
    y + canvas.width / 19 / 2,
    canvas.width / 19 / 1.3,
    canvas.width / 19 / 1.92,
    0,
    0,
    2 * Math.PI,
    false
  );
  ctxOTHER.fill();

  //eyes:
  circle(
    x - canvas.width / 95,
    y - canvas.width / 19 / 4,
    canvas.width / 125.4,
    true,
    "black",
    "black"
  );
  circle(
    x + canvas.width / 95,
    y - canvas.width / 19 / 4,
    canvas.width / 125.4,
    true,
    "black",
    "black"
  );
};

//draw diggy function:
var drawDig = function (X, y) {
  ctxOTHER.lineWidth = 2;
  //body:
  circle(x, y, canvas.width / 19, true, "Chocolate", "brown");

  //belly:
  ctxOTHER.fillStyle = "SeaShell";
  ctxOTHER.beginPath();
  ctxOTHER.ellipse(
    x,
    y + canvas.width / 19 / 2,
    canvas.width / 19 / 1.3,
    canvas.width / 19 / 1.92,
    0,
    0,
    2 * Math.PI,
    false
  );
  ctxOTHER.fill();

  //mane:
  circle(x, y, canvas.width / 28.5, true, "GoldenRod", "pog");

  //eyes:
  circle(
    x - canvas.width / 75,
    y - canvas.width / 60,
    canvas.width / 125.4,
    true,
    "black",
    "black"
  );
  circle(
    x + canvas.width / 75,
    y - canvas.width / 60,
    canvas.width / 125.4,
    true,
    "black",
    "black"
  );

  //snoot:
  ctxOTHER.fillStyle = "white";
  ctxOTHER.beginPath();
  ctxOTHER.ellipse(
    x,
    y,
    canvas.width / 80,
    canvas.width / 120,
    0,
    0,
    Math.PI * 2,
    false
  );
  ctxOTHER.fill();

  //nose:
  circle(x, y, canvas.width / 240, true, "black", "pog");

  //ears:
  circle(
    x - canvas.width / 28,
    y - canvas.width / 22,
    canvas.width / 62.7,
    true,
    "Chocolate",
    false
  );
  circle(
    x + canvas.width / 28,
    y - canvas.width / 22,
    canvas.width / 62.7,
    true,
    "Chocolate",
    false
  );
};

//draw illy function:
var drawIll = function (x, y) {
  ctxOTHER.lineWidth = 8;

  //body:
  circle(x, y, canvas.width / 19, true, "silver");

  //tume:
  ctxOTHER.fillStyle = "SeaShell";
  ctxOTHER.beginPath();
  ctxOTHER.ellipse(
    x,
    y + canvas.width / 19 / 2,
    canvas.width / 19 / 1.3,
    canvas.width / 19 / 1.92,
    0,
    0,
    2 * Math.PI,
    false
  );
  ctxOTHER.fill();

  //uurs:
  circle(
    x - canvas.width / 28,
    y - canvas.width / 22,
    canvas.width / 62.7,
    true,
    "pink",
    false
  );
  circle(
    x + canvas.width / 28,
    y - canvas.width / 22,
    canvas.width / 62.7,
    true,
    "pink",
    false
  );
  circle(
    x - canvas.width / 28,
    y - canvas.width / 22,
    canvas.width / 62.7,
    false,
    "silver",
    "silver"
  );
  circle(
    x + canvas.width / 28,
    y - canvas.width / 22,
    canvas.width / 62.7,
    false,
    "silver",
    "silver"
  );

  //snootle:
  ctxOTHER.fillStyle = "white";
  ctxOTHER.beginPath();
  ctxOTHER.ellipse(
    x,
    y - canvas.height / 48,
    canvas.width / 120,
    canvas.width / 180,
    0,
    0,
    Math.PI * 2,
    false
  );
  ctxOTHER.fill();

  //uus:
  circle(
    x - canvas.width / 60,
    y - canvas.width / 60,
    canvas.width / 140,
    true,
    "black",
    "black"
  );
  circle(
    x + canvas.width / 60,
    y - canvas.width / 60,
    canvas.width / 140,
    true,
    "black",
    "black"
  );

  //nose:
  circle(x, y - canvas.height / 48, canvas.width / 360, true, "black", false);
};

//draw CWOOOOOOOOOODY!! function:
var drawCod = function (x, y) {
  ctxOTHER.lineWidth = 4;

  //body:
  circle(x, y, canvas.width / 19, true, "SeaShell", false);

  //nose:
  circle(x, y - canvas.height / 48, canvas.width / 360, true, "pink", false);

  //uus:
  ctxOTHER.strokeStyle = "black";
  ctxOTHER.beginPath();
  ctxOTHER.arc(
    x - canvas.width / 60,
    y - canvas.width / 60,
    canvas.width / 140,
    0,
    Math.PI,
    true
  );
  ctxOTHER.moveTo(x + canvas.width / 40, y - canvas.width / 60);
  ctxOTHER.arc(
    x + canvas.width / 60,
    y - canvas.width / 60,
    canvas.width / 140,
    0,
    Math.PI,
    true
  );
  ctxOTHER.stroke();

  //black spot:
  ctxOTHER.fillStyle = "black";
  ctxOTHER.beginPath();
  ctxOTHER.moveTo(x, y + canvas.width / 19);
  ctxOTHER.quadraticCurveTo(
    x + canvas.width / 19,
    y + canvas.width / 19,
    x + canvas.width / 19,
    y
  );
  ctxOTHER.fill();

  //brown spot:
  ctxOTHER.fillStyle = "#d98238";
  ctxOTHER.beginPath();
  ctxOTHER.moveTo(x, y - canvas.width / 19);
  ctxOTHER.quadraticCurveTo(
    x - canvas.width / 19,
    y - canvas.width / 19,
    x - canvas.width / 19,
    y
  );
  ctxOTHER.fill();

  //urs:
  ctxOTHER.fillStyle = "#d98238";
  ctxOTHER.beginPath();
  ctxOTHER.moveTo(x - canvas.width / 19, y - canvas.width / 76);
  ctxOTHER.lineTo(x - canvas.width / 19, y - canvas.width / 23.75);
  ctxOTHER.lineTo(x - canvas.width / 76, y - canvas.width / 23.75);
  ctxOTHER.fill();

  ctxOTHER.fillStyle = "black";
  ctxOTHER.beginPath();
  ctxOTHER.moveTo(x + canvas.width / 40, y - canvas.width / 60);
  ctxOTHER.lineTo(
    x + canvas.width / 40 + canvas.width / 120,
    canvas.width / 120
  );
  ctxOTHER.fill();
};

//poggggggggggggggggggggggggg:
var drawPog = function (x, y) {
  circle(x, y, canvas.width / 19, true, "black", false);
};

//info stuff:
var drawInfo = function () {
  document.getElementById("level").textContent = "Level: " + level;
};

//collide test:
var testCollide = function () {
  //for edge:
  if (x <= 0) {
    x = 0;
  }
  if (x >= canvas.width) {
    x = canvas.width;
  }
  if (y <= 0) {
    y = 0;
  }
  if (y >= canvas.height) {
    y = canvas.height;
  }

  //for maze borders:
  var uumBoxWidth = 248;
  var uumBoxHeight = 204;

  var mazeData = ctx.getImageData(
    x - uumBoxWidth / 2,
    y - uumBoxHeight / 2,
    uumBoxWidth,
    uumBoxHeight
  ).data;
  var uumData = ctxOTHER.getImageData(
    x - uumBoxWidth / 2,
    y - uumBoxHeight / 2,
    uumBoxWidth,
    uumBoxHeight
  ).data;

  for (var pix = 0; pix < uumBoxWidth * uumBoxHeight; pix++) {
    var isInUum = uumData[4 * pix + 3] > 0; // alpha of Uum canvas is > 0;
    if (
      isInUum &&
      !(
        mazeData[4 * pix] === 255 &&
        mazeData[4 * pix + 1] === 255 &&
        mazeData[4 * pix + 2] === 0
      )
    ) {
      level = 1;
      x = canvas.width / 2;
      y = canvas.height / 2 + canvas.height / 2 / 2;
      speed = 5;
    }
  }
};

//draw win function:
var drawWin = function () {
  document.getElementById("win").textContent = "You Win!";
  document.getElementById("uum").src = "images/uum.png";
  document.getElementById("uum").height = 200;
  document.getElementById("uum").width = 250;
};

//something for level 5:
var Ball = function () {
  this.x = 100;
  this.y = 100;
  this.xSpeed = -16;
  this.ySpeed = 24;
};

Ball.prototype.draw = function () {
  //circle(this.x, this.y, 50, true, 'purple', 'black');
  ctx.fillStyle = "purple";
  ctx.beginPath();
  ctx.arc(this.x, this.y, 40, 0, Math.PI * 2, false);
  ctx.fill();
};

Ball.prototype.move = function () {
  this.x += this.xSpeed;
  this.y += this.ySpeed;
};

Ball.prototype.checkCollision = function () {
  if (this.x < 0 || this.x > canvas.width) {
    this.xSpeed = -this.xSpeed;
  }
  if (this.y < 0 || this.y > canvas.height) {
    this.ySpeed = -this.ySpeed;
  }
};

var ball = new Ball();

//draw maze borders:
var drawMazeBorders = function () {
  //for level 1:
  ctx.fillStyle = "blue";
  if (level == 1) {
    ctx.fillRect(
      canvas.width / 2 / 2,
      canvas.height / 2 - canvas.height / 2 / 2,
      mazeWidth(),
      canvas.height / 2 + canvas.height / 2 / 2
    );

    ctx.fillRect(canvas.width / 2, 0, mazeWidth(), canvas.height / 2);
    ctx.fillRect(0, 0, (canvas.width / 4) * 2 + 5, mazeWidth());
    ctx.fillRect(0, 0, mazeWidth(), canvas.height / 2);
    ctx.fillRect(
      canvas.width / 2,
      (canvas.height / 2 / 2 / 2) * 7.5,
      canvas.width,
      canvas.height
    );
    ctx.fillRect(
      (canvas.width / 2 / 2 / 2) * 7.5,
      0,
      canvas.width,
      canvas.height
    );
  }

  //for level 2:
  ctx.fillStyle = "green";
  if (level == 2) {
    ctx.fillRect(
      canvas.width / 2 / 2,
      canvas.height / 2,
      mazeWidth(),
      canvas.height / 2 + canvas.height / 2 / 2
    );
    ctx.fillRect(
      canvas.width / 2 + canvas.width / 2 / 2,
      canvas.height / 2,
      mazeWidth(),
      canvas.height
    );
    ctx.fillRect(0, canvas.height / 2, canvas.width / 4 + 5, mazeWidth());
    ctx.fillRect(
      canvas.width / 2 + canvas.width / 2 / 2 / 2,
      canvas.height / 2,
      canvas.width / 2,
      mazeWidth()
    );
    ctx.fillRect(0, 0, mazeWidth(), canvas.height / 2);
    ctx.fillRect(canvas.width - mazeWidth(), 0, mazeWidth(), canvas.height / 2);
    ctx.fillRect(mazeWidth() * 4, 0, canvas.width, mazeWidth());
  }

  //for level 3:
  ctx.fillStyle = "red";
  if (level == 3) {
    ctx.fillRect(
      canvas.width / 2 / 2,
      (canvas.height / 2) * 1.4,
      canvas.width,
      mazeWidth()
    );
    ctx.fillRect(
      0,
      canvas.height / 2 - canvas.height / 2 / 2,
      canvas.width / 2 + canvas.width / 2 / 2,
      mazeWidth()
    );
  }

  //for level 4:
  ctx.fillStyle = "orange";
  if (level == 4) {
    //draw:
    ctx.fillRect(finnalX, canvas.height / 2, canvas.width / 2 / 2, mazeWidth());
    ctx.fillRect(
      finnalXOther,
      canvas.height / 2 - canvas.height / 2 / 2,
      canvas.width / 2 / 2,
      mazeWidth()
    );

    //move:
    if (finnalX < canvas.width) finnalX += 5;
    else finnalX = 0;

    if (finnalXOther > 0) finnalXOther -= 5;
    else finnalXOther = canvas.width;
  }

  //for level 5:
  ctx.fillStyle = "purple";
  if (level == 5) {
    ball.draw();
    ball.move();
    ball.checkCollision();
  }

  //for level 6:
  ctx.fillStyle = "green";
  if (level == 6) {
    ctx.fillRect(
      0,
      canvas.height / 2 + canvas.height / 2 / 2 / 2,
      canvas.width / 2 / 2,
      canvas.height
    );
    ctx.fillRect(0, 0, canvas.width, mazeWidth());
    ctx.fillRect(canvas.width / 2, 0, canvas.width, canvas.height);
    ctx.fillStyle = "yellow";
    ctx.fillRect(
      canvas.width / 2 - 5,
      canvas.height / 4,
      canvas.width,
      canvas.height / 4
    );
    ctx.fillRect(
      canvas.width / 2 + canvas.width / 2 / 2,
      0,
      canvas.width,
      canvas.height
    );
  }

  //for level 7:
  ctx.fillStyle = "blue";
  if (level == 7) {
    ctx.fillRect(
      canvas.width / 2,
      canvas.height / 2 + canvas.height / 8,
      canvas.width,
      mazeWidth() * 2
    );
    ctx.fillRect(0, 0, canvas.width, mazeWidth() * 2);
    ctx.fillRect(0, 0, mazeWidth() * 2, canvas.height);
  }
};

//test Level function:
var testLevel = function () {
  if (y <= 0 && level != (6 || 7)) {
    level++;
    y = canvas.height;
  }

  if (level == 6 && x <= 0) {
    level++;
    x = canvas.width;
  }

  if (level == 7 && y >= canvas.height) {
    level++;
    y = canvas.height;
  }

  if (level == 8) {
    level = "You Win!!";
    clearInterval(mainLoop);
    drawWin();
  }
};

//debug:
var debug = function () {
  if (showDebug) {
    document.getElementById("moreInfo").textContent =
      `XY= ${x}, ${y}\nspeed=${speed}\nimg: ` +
      ctx.getImageData(x, y, 1, 1).data.join(", ");
  } else {
    document.getElementById("moreInfo").textContent = "";
  }
};

//draw stuv:
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

//event handeler stuff:
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

var sendKeyUp = function (event) {
  var code = event.code;
  if (code == right || code == left || code == up || code == down) speed = 1;
};
document.addEventListener("keydown", sendKeyDown);
document.addEventListener("keyup", sendKeyUp);

//main loop:
var mainLoop = setInterval(function () {
  if (controls == "mobile") {
    var mobileControls = $(".mobileControls");
    var topPog = canvas.height - canvas.width / 7;
    var leftPog = canvas.width - canvas.width / 7;

    mobileControls.css({
      top: topPog,
      left: leftPog
    });
  }

  if (level == 4 && stuv != "pog") {
    speed = 7;
  } else if (level == 5 && stuv != "pog") {
    speed = 13;
  }

  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  canvasOTHER.height = window.innerHeight;
  canvasOTHER.width = window.innerWidth;

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