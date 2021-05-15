//OOP in dev:

class Game {
  constructor() {
    this.speed = 1;
    this.level = 1;
    this.showDebug = false;
    this.stuv = localStorage.getItem("stuv");
    this.controls = localStorage.getItem("controls");
    this.CANVAS_OTHER = document.getElementById("CANVAS_OTHER");
    this.CTX_OTHER = CANVAS_OTHER.getContext("2d");
    this.CANVAS_OTHER.height = window.innerHeight;
    this.CANVAS_OTHER.width = window.innerWidth;
    this.CANVAS = document.getElementById("CANVAS");
    this.CTX = CANVAS.getContext("2d");
    this.stuv = new Stuv(this);
    this.walls = new Walls(this);
    this.up;
    this.left;
    this.right;
    this.down;
    if (this.controls == "wasd") {
      this.up = "KeyW";
      this.left = "KeyD";
      this.right = "KeyA";
      this.down = "KeyS";
    }
    else if (this.controls == "arrow") {
      this.up = "ArrowUp";
      this.left = "ArrowRight";
      this.right = "ArrowLeft";
      this.down = "ArrowDown";
    }
    
    document.addEventListener("keydown", this.stuv.sendKeyDown);
    document.addEventListener("keyup", this.stuv.sendKeyUp);
    this.mainLoop = setInterval( () => {

      if (this.level == 4 && this.stuv != "pog") {
        this.speed = 7;
      } else if (this.level == 5 && this.stuv != "pog") {
        this.speed = 13;
      }
    
      this.CANVAS.height = window.innerHeight;
      this.CANVAS.width = window.innerWidth;
      this.CANVAS_OTHER.height = window.innerHeight;
      this.CANVAS_OTHER.width = window.innerWidth;
    
      this.drawBackground();
      this.walls.draw();
      this.stuv.draw();
      this.stuv.testLevel();
      if (this.stuv != "pog") {
        this.stuv.testCollide();
      }
      this.stuv.debug();
      this.displayLvl();
    }, 30);
  }
  circle(x, y, radius, isFilled, fillColor, outlineColor) {
    this.CTX_OTHER.strokeStyle = outlineColor;
    this.CTX_OTHER.fillStyle = fillColor;
    this.CTX_OTHER.beginPath();
    this.CTX_OTHER.arc(x, y, radius, 0, Math.PI * 2, false);
    if (isFilled) {
      this.CTX_OTHER.fill();
    } else {
      this.CTX_OTHER.stroke();
    }
  }
  drawBackground() {
    this.CTX.fillStyle = "yellow";
    this.CTX.fillRect(0, 0, this.CANVAS.width, this.CANVAS.height);
  }

  drawWin() {
    document.getElementById("win").textContent = "You Win!";
    document.getElementById("uum").src = "images/uum.png";
    document.getElementById("uum").height = 200;
    document.getElementById("uum").width = 250;
  };

  displayLvl() {
    document.getElementById("level").textContent = "Level: " + this.level;
  };
  
}

class Stuv {
  constructor(game) {
    this.x = game.CANVAS.width / 2;
    this.y = game.CANVAS.height / 2 + game.CANVAS.height / 4;
    this.game = game;
  }
  sendKeyDown(event) {
    var code = event.code;
    if (code == this.game.left) {
      this.x += this.game.speed;
      if (this.game.level != 5 && this.game.level != 4) {
        speed++;
      }
    }
    if (code == this.game.right) {
      this.x -= this.game.speed;
      if (this.game.level != 5 && this.game.level != 4) {
        speed++;
      }
    }
    if (code == this.game.up) {
      this.y -= this.game.speed;
      if (this.game.level != 5 && this.game.level != 4) {
        speed++;
      }
    }
    if (code == this.game.down) {
      this.y += this.game.speed;
      if (this.game.level != 5 && this.game.level != 4) {
        speed++;
      }
    }
    if (code == "KeyI") {
      this.game.showDebug = !this.game.showDebug;
    }
  };
  sendKeyUp(event) {
    var code = event.code;
    if (code == this.game.right || code == this.game.left || code == up || code == down) speed = 1;
  };
  drawUum() {
    ctx = this.game.CTX_OTHER;
    canvas = this.game.CANVAS;
    ctx.lineWidth = 2;
    this.game.circle(this.x, this.y, canvas.width / 19, true, "#ffb3cf");
    this.game.circle(this.x - canvas.width / 19, this.y, canvas.width / 19 / 5, true, "#ffb3cf");
    this.game.circle(this.x + canvas.width / 19, this.y, canvas.width / 19 / 5, true, "#ffb3cf");
    ctx.fillStyle = "SeaShell";
    ctx.beginPath();
    ctx.ellipse(this.x, this.y + canvas.width / 19 / 2, canvas.width / 19 / 1.3, canvas.width / 19 / 1.92, 0, 0, 2 * Math.PI, false);
    ctx.fill();
    this.game.circle(this.x - canvas.width / 95, y - canvas.width / 19 / 4, canvas.width / 125.4, true, "black", "black");
    this.game.circle(this.x + canvas.width / 95, this.y - canvas.width / 19 / 4, canvas.width / 125.4, true, "black", "black");
  }
  drawDig() {
    ctx = this.game.CTX_OTHER;
    canvas = this.game.CANVAS;
    ctx.lineWidth = 2;
    this.game.circle(this.x, this.y, canvas.width / 19, true, "Chocolate", "brown");
    ctx.fillStyle = "SeaShell";
    ctx.beginPath();
    ctx.ellipse(this.x, this.y + canvas.width / 19 / 2, canvas.width / 19 / 1.3, cnvas.width / 19 / 1.92, 0, 0, 2 * Math.PI, false);
    ctx.fill();
    this.game.circle(this.x, this.y, canvas.width / 28.5, true, "GoldenRod", "pog");
    this.game.circle(this.x - canvas.width / 75, this.y - canvas.width / 60, canvas.width / 125.4, true, "black", "black");
    this.game.circle(this.x + canvas.width / 75, this.y - canvas.width / 60, canvas.width / 125.4, true, "black", "black");
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, canvas.width / 80, canvas.width / 120, 0, 0, Math.PI * 2, false);
    ctx.fill();
    this.game.circle(this.x, this.y, canvas.width / 240, true, "black", "pog");
    this.game.circle(this.x - canvas.width / 28, this.y - canvas.width / 22, canvas.width / 62.7, true, "Chocolate", false);
    this.game.circle(this.x + canvas.width / 28, this.y - canvas.width / 22, canvas.width / 62.7, true, "Chocolate", false);
  }
  drawIll() {
    ctx = this.game.CTX_OTHER;
    canvas = this.game.CANVAS;
    ctx.lineWidth = 8;
    this.game.circle(this.x, this.y, canvas.width / 19, true, "silver");
    ctx.fillStyle = "SeaShell";
    ctx.beginPath();
    ctx.ellipse(this.x, this.y + canvas.width / 19 / 2, canvas.width / 19 / 1.3, canvas.width / 19 / 1.92, 0, 0, 2 * Math.PI, false);
    ctx.fill();
    this.game.circle(this.x - canvas.width / 28, this.y - canvas.width / 22, canvas.width / 62.7, true, "pink", false);
    this.game.circle(this.x + canvas.width / 28, this.y - canvas.width / 22, canvas.width / 62.7, true, "pink", false);
    this.game.circle(this.x - canvas.width / 28, this.y - canvas.width / 22, canvas.width / 62.7, false, "silver", "silver");
    this.game.circle(this.x + canvas.width / 28, this.y - canvas.width / 22, canvas.width / 62.7, false, "silver", "silver");
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.ellipse(this.x, this.y - canvas.height / 48, canvas.width / 120, canvas.width / 180, 0, 0, Math.PI * 2, false);
    ctx.fill();
    this.game.circle(this.x - canvas.width / 60, this.y - canvas.width / 60, canvas.width / 140, true, "black", "black");
    this.game.circle(this.x + canvas.width / 60, this.y - canvas.width / 60, canvas.width / 140, true, "black", "black");
    this.game.circle(x, y - CANVAS.height / 48, CANVAS.width / 360, true, "black", false);
  }
  drawCod() {
    ctx = this.game.CTX_OTHER;
    canvas = this.game.CANVAS;
    ctx.lineWidth = 4;
    circle(this.x, this.y, canvas.width / 19, true, "SeaShell", false);
    circle(this.x, this.y - canvas.height / 48, canvas.width / 360, true, "pink", false);
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.arc(this.x - canvas.width / 60, y - canvas.width / 60, canvas.width / 140, 0, Math.PI, true);
    ctx.moveTo(x + CANVAS.width / 40, y - CANVAS.width / 60);
    ctx.arc(this.x + CANVAS.width / 60, y - CANVAS.width / 60, CANVAS.width / 140, 0, Math.PI, true);
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y + canvas.width / 19);
    ctx.quadraticCurveTo(this.x + canvas.width / 19, this.y + canvas.width / 19, this.x + canvas.width / 19, this.y);
    ctx.fill();
    ctx.fillStyle = "#d98238";
    ctx.beginPath();
    ctx.moveTo(x, y - canvas.width / 19);
    ctx.quadraticCurveTo(this.x - canvas.width / 19, this.y - canvas.width / 19, x - CANVAS.width / 19, y);
    ctx.fill();
    ctx.fillStyle = "#d98238";
    ctx.beginPath();
    ctx.moveTo(this.x - canvas.width / 19, this.y - canvas.width / 76);
    ctx.lineTo(this.x - canvas.width / 19, this.y - canvas.width / 23.75);
    ctx.lineTo(this.x - canvas.width / 76, this.y - canvas.width / 23.75);
    ctx.fill();
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(this.x + canvas.width / 40, this.y - canvas.width / 60);
    ctx.lineTo(this.x + canvas.width / 40 + canvas.width / 120, canvas.width / 120);
    ctx.fill();
  }
  draw() {
    if (this.game.stuv == "uum") {
      this.drawUum(x, y);
    }
    if (this.game.stuv == "dig") {
      this.drawDig(x, y);
    }
    if (this.game.stuv == "cod") {
      this.drawCod(x, y);
    }
    if (this.game.stuv == "ill") {
      this.drawIll(x, y);
    }
    if (this.game.stuv == "pog") {
      this.circle(this.x, this.y, this.game.CANVAS.width / 19, true, "black", false);
    }
  }

  debug() {
    if (this.game.showDebug) {
      document.getElementById("moreInfo").textContent =
        `XY= ${this.x}, ${this.y}\nspeed=${this.game.speed}\nimg: ${this.game.CTX.getImageData(x, y, 1, 1).data.join(", ")}`
    } else {
      document.getElementById("moreInfo").textContent = "";
    }
  }
  testLevel() {
    if (this.y <= 0 && lthis.game.level != (6 || 7)) {
      this.game.level++;
      this.y = this.game.CANVAS.height;
    }
  
    if (this.game.level == 6 && this.x <= 0) {
      this.game.level++;
      this.x = this.game.CANVAS.width;
    }
  
    if (this.game.level == 7 && this.y >= this.game.CANVAS.height) {
      this.game.level++;
      this.y = this.game.CANVAS.height;
    }
  
    if (this.game.level == 8) {
      this.game.level = "You Win!!";
      clearInterval(this.game.mainLoop);
      this.game.drawWin();
    }
  }
  testCollide() {
    if (this.x <= 0) {
      this.x = 0;
    }
    if (this.x >= this.game.CANVAS.width) {
      this.x = this.game.CANVAS.width;
    }
    if (this.y <= 0) {
      this.y = 0;
    }
    if (this.y >= this.game.CANVAS.height) {
      this.y = this.game.CANVAS.height;
    }
    var uumBoxWidth = 248;
    var uumBoxHeight = 204;
    var mazeData = this.game.CTX.getImageData(
      this.x - uumBoxWidth / 2,
      this.y - uumBoxHeight / 2,
      uumBoxWidth,
      uumBoxHeight
    ).data;
    var uumData = this.game.CTX_OTHER.getImageData(
      this.x - uumBoxWidth / 2,
      this.y - uumBoxHeight / 2,
      uumBoxWidth,
      uumBoxHeight
    ).data;
  
    for (var pix = 0; pix < uumBoxWidth * uumBoxHeight; pix++) {
      var isInUum = uumData[4 * pix + 3] > 0;
      if (
        isInUum &&
        !(
          mazeData[4 * pix] === 255 &&
          mazeData[4 * pix + 1] === 255 &&
          mazeData[4 * pix + 2] === 0
        )
      ) {
        this.game.level = 1;
        this.x = this.game.CANVAS.width / 2;
        this.y = this.game.CANVAS.height / 2 + this.game.CANVAS.height / 2 / 2;
        this.game.speed = 5;
      }
    }
  };
}

class Walls {
  constructor(Game) {
    this.game = Game;
    
  }
  mazeWidth() {
    return this.game.CANVAS.width / 16;
  }
  lvl1() {
    this.game.CTX.fillStyle = "blue";
    this.game.CTX.fillRect(this.game.CANVAS.width / 2 / 2, this.game.CANVAS.height / 2 - CANVAS.height / 2 / 2, this.mazeWidth(), this.game.CANVAS.height / 2 + CANVAS.height / 2 / 2);
    this.game.CTX.fillRect(CANVAS.width / 2, 0, this.mazeWidth(), CANVAS.height / 2);
    this.game.CTX.fillRect(0, 0, (CANVAS.width / 4) * 2 + 5, this.mazeWidth());
    this.game.CTX.fillRect(0, 0, this.mazeWidth(), CANVAS.height / 2);
    this.game.CTX.fillRect(this.game.CANVAS.width / 2, this.game.CANVAS.height / 8 * 7.5, this.game.CANVAS.width, this.game.CANVAS.height);
    this.game.CTX.fillRect(this.game.CANVAS.width / 8 * 7.5, 0, this.game.CANVAS.width, this.game.CANVAS.height);
  }
  lvl2() {
    this.game.CTX.fillStyle = "green";
    this.game.CTX.fillRect(this.game.CANVAS.width / 4, this.game.CANVAS.height / 2, this.mazeWidth(), this.game.CANVAS.height / 2 + this.game.CANVAS.height / 4);
    this.game.CTX.fillRect(this.game.CANVAS.width / 2 + CANVAS.width / 2 / 2, this.game.CANVAS.height / 2, this.mazeWidth(), this.game.CANVAS.height);
    this.game.CTX.fillRect(0, CANVAS.height / 2, CANVAS.width / 4 + 5, this.mazeWidth());
    this.game.CTX.fillRect(this.game.CANVAS.width / 2 + CANVAS.width / 8, this.game.CANVAS.height / 2, this.game.CANVAS.width / 2, this.mazeWidth());
    this.game.CTX.fillRect(0, 0, this.mazeWidth(), this.game.CANVAS.height / 2);
    this.game.CTX.fillRect(this.game.CANVAS.width - this.mazeWidth(), 0, this.mazeWidth(), this.game.CANVAS.height / 2);
    this.game.CTX.fillRect(this.mazeWidth() * 4, 0, this.game.CANVAS.width, this.mazeWidth());
  }
  lvl3() {
    this.game.CTX.fillStyle = "red";
    this.game.CTX.fillRect(this.game.CANVAS.width / 2 / 2, this.game.CANVAS.height / 2 * 1.4, this.game.CANVAS.width, this.mazeWidth());
    this.game.CTX.fillRect(0, this.game.CANVAS.height / 2 - CANVAS.height / 2 / 2, this.game.CANVAS.width / 2 + CANVAS.width / 2 / 2, this.mazeWidth());
  }
  lvl4() {
    this.lvl4X = this.game.CANVAS.width / 2;
    this.lvl4XOther = this.game.CANVAS.width / 2;
    this.game.CTX.fillStyle = "orange";
    this.game.CTX.fillRect(this.lvl4X, this.game.CANVAS.height / 2, this.game.CANVAS.width / 4, this.mazeWidth());
    this.game.CTX.fillRect(this.game.lvl4XOther, this.game.CANVAS.height / 2 - CANVAS.height / 4, this.game.CANVAS.width / 4, this.mazeWidth());
    if (this.lvl4X < this.game.CANVAS.width) {this.lvl4X += 5;}
    else {this.lvl4X = 0;}
    if (this.lvl4XOther > 0) {this.lvl4XOther -= 5;}
    else {this.lvl4XOther = this.game.CANVAS.width;}
  }
  lvl5() {
    this.lvl5X = 100;
    this.lvl5Y = 100;
    this.lvl5XSpeed = -16;
    this.lvl5YSpeed = 24;
    this.game.CTX.fillStyle = "purple";
    this.game.CTX.beginPath();
    this.game.CTX.arc(this.x, this.y, 40, 0, Math.PI * 2, false);
    this.game.CTX.fill();
    this.lvl5X += this.lvl5XSpeed;
    this.lvl5Y += this.lvl5YSpeed;
    if (this.lvl5X < 0 || this.lvl5X > this.game.CANVAS.width) {this.lvl5XSpeed = -this.lvl5XSpeed;}
    if (this.lvl5Y < 0 || this.lvl5Y > this.game.CANVAS.height) {this.lvl5YSpeed = -this.lvl5YSpeed;}
  }
  lvl6() {
    this.game.CTX.fillStyle = "green";
    this.game.CTX.fillRect(0, this.game.CANVAS.height / 2 + CANVAS.height / 8, this.game.CANVAS.width / 4, this.game.CANVAS.height);
    this.game.CTX.fillRect(0, 0, this.game.CANVAS.width, this.mazeWidth());
    this.game.CTX.fillRect(this.game.CANVAS.width / 2, 0, this.game.CANVAS.width, this.game.CANVAS.height);
    this.game.CTX.fillStyle = "yellow";
    this.game.CTX.fillRect(this.game.CANVAS.width / 2 - 5, this.game.CANVAS.height / 4, this.game.CANVAS.width, this.game.CANVAS.height / 4);
    this.game.CTX.fillRect(this.game.CANVAS.width / 2 + CANVAS.width / 4, 0, this.game.CANVAS.width, this.game.CANVAS.height);
  }
  lvl7() {
    this.game.CTX.fillStyle = "blue";
    this.game.CTX.fillRect(this.game.CANVAS.width / 2, this.game.CANVAS.height / 2 + CANVAS.height / 8, this.game.CANVAS.width, this.mazeWidth() * 2);
    this.game.CTX.fillRect(0, 0, this.game.CANVAS.width, this.mazeWidth() * 2);
    this.game.CTX.fillRect(0, 0, this.mazeWidth() * 2, this.game.CANVAS.height);
  }
  draw() {
    var lvl = this.game.level
    if (lvl == 1) {this.lvl1();}
    else if (lvl == 2) {this.lvl2();}
    else  if (lvl == 3) {this.lvl3();}
    else if (lvl == 4) {this.lvl4();}
    else if (lvl == 5) {this.lvl5();}
    else if (lvl == 6) {this.lvl6();}
    else if (lvl == 7) {this.lvl7();}
  }
}

var game = new Game;
//non OOP:

// var speed = 1;
// var level = 1;
// var showDebug = false;
// var stuv = localStorage.getItem("stuv");
// var controls = localStorage.getItem("controls");
// const CANVAS_OTHER = document.getElementById("CANVAS_OTHER");
// const CTX_OTHER = CANVAS_OTHER.getContext("2d");
// CANVAS_OTHER.height = window.innerHeight;
// CANVAS_OTHER.width = window.innerWidth;
// const CANVAS = document.getElementById("CANVAS");
// const CTX = CANVAS.getContext("2d");
// CANVAS.height = window.innerHeight;
// CANVAS.width = window.innerWidth;
// if (controls == "wasd") {
//   var up = "KeyW";
//   var left = "KeyD";
//   var right = "KeyA";
//   var down = "KeyS";
// }
// else if (controls == "arrow") {
//   var up = "ArrowUp";
//   var left = "ArrowRight";
//   var right = "ArrowLeft";
//   var down = "ArrowDown";
// }
// var x = CANVAS.width / 2;
// var y = CANVAS.height / 2 + CANVAS.height / 4;
// var finnalX = CANVAS.width / 2;
// var finnalXOther = CANVAS.width / 2;
// var touchX = 0;
// var touchY = 0;
// var touchDirX = 0;
// var touchDirY = 0;


// //check
// var circle = function (x, y, radius, isFilled, fillColor, outlineColor) {
//   CTX_OTHER.strokeStyle = outlineColor;
//   CTX_OTHER.fillStyle = fillColor;
//   CTX_OTHER.beginPath();
//   CTX_OTHER.arc(x, y, radius, 0, Math.PI * 2, false);
//   if (isFilled) {
//     CTX_OTHER.fill();
//   } else {
//     CTX_OTHER.stroke();
//   }
// };
// //check
// var mazeWidth = function () {
//   return CANVAS.width / 16;
// };
// //check
// var drawBackground = function () {
//   CTX.fillStyle = "yellow";
//   CTX.fillRect(0, 0, CANVAS.width, CANVAS.height);
// };
// //check
// var drawUum = function (x, y) {
//   CTX_OTHER.lineWidth = 2;
//   //body:
//   circle(x, y, CANVAS.width / 19, true, "#ffb3cf");

//   //arms:
//   circle(x - CANVAS.width / 19, y, CANVAS.width / 19 / 5, true, "#ffb3cf");
//   circle(x + CANVAS.width / 19, y, CANVAS.width / 19 / 5, true, "#ffb3cf");

//   //belly:
//   CTX_OTHER.fillStyle = "SeaShell";
//   CTX_OTHER.beginPath();
//   CTX_OTHER.ellipse(
//     x,
//     y + CANVAS.width / 19 / 2,
//     CANVAS.width / 19 / 1.3,
//     CANVAS.width / 19 / 1.92,
//     0,
//     0,
//     2 * Math.PI,
//     false
//   );
//   CTX_OTHER.fill();

//   //eyes:
//   circle(
//     x - CANVAS.width / 95,
//     y - CANVAS.width / 19 / 4,
//     CANVAS.width / 125.4,
//     true,
//     "black",
//     "black"
//   );
//   circle(
//     x + CANVAS.width / 95,
//     y - CANVAS.width / 19 / 4,
//     CANVAS.width / 125.4,
//     true,
//     "black",
//     "black"
//   );
// };
// //check
// var drawDig = function (X, y) {
//   CTX_OTHER.lineWidth = 2;
//   //body:
//   circle(x, y, CANVAS.width / 19, true, "Chocolate", "brown");

//   //belly:
//   CTX_OTHER.fillStyle = "SeaShell";
//   CTX_OTHER.beginPath();
//   CTX_OTHER.ellipse(
//     x,
//     y + CANVAS.width / 19 / 2,
//     CANVAS.width / 19 / 1.3,
//     CANVAS.width / 19 / 1.92,
//     0,
//     0,
//     2 * Math.PI,
//     false
//   );
//   CTX_OTHER.fill();

//   //mane:
//   circle(x, y, CANVAS.width / 28.5, true, "GoldenRod", "pog");

//   //eyes:
//   circle(
//     x - CANVAS.width / 75,
//     y - CANVAS.width / 60,
//     CANVAS.width / 125.4,
//     true,
//     "black",
//     "black"
//   );
//   circle(
//     x + CANVAS.width / 75,
//     y - CANVAS.width / 60,
//     CANVAS.width / 125.4,
//     true,
//     "black",
//     "black"
//   );

//   //snoot:
//   CTX_OTHER.fillStyle = "white";
//   CTX_OTHER.beginPath();
//   CTX_OTHER.ellipse(
//     x,
//     y,
//     CANVAS.width / 80,
//     CANVAS.width / 120,
//     0,
//     0,
//     Math.PI * 2,
//     false
//   );
//   CTX_OTHER.fill();

//   //nose:
//   circle(x, y, CANVAS.width / 240, true, "black", "pog");

//   //ears:
//   circle(
//     x - CANVAS.width / 28,
//     y - CANVAS.width / 22,
//     CANVAS.width / 62.7,
//     true,
//     "Chocolate",
//     false
//   );
//   circle(
//     x + CANVAS.width / 28,
//     y - CANVAS.width / 22,
//     CANVAS.width / 62.7,
//     true,
//     "Chocolate",
//     false
//   );
// };
// //check
// var drawIll = function (x, y) {
//   CTX_OTHER.lineWidth = 8;

//   //body:
//   circle(x, y, CANVAS.width / 19, true, "silver");

//   //tume:
//   CTX_OTHER.fillStyle = "SeaShell";
//   CTX_OTHER.beginPath();
//   CTX_OTHER.ellipse(
//     x,
//     y + CANVAS.width / 19 / 2,
//     CANVAS.width / 19 / 1.3,
//     CANVAS.width / 19 / 1.92,
//     0,
//     0,
//     2 * Math.PI,
//     false
//   );
//   CTX_OTHER.fill();

//   //uurs:
//   circle(
//     x - CANVAS.width / 28,
//     y - CANVAS.width / 22,
//     CANVAS.width / 62.7,
//     true,
//     "pink",
//     false
//   );
//   circle(
//     x + CANVAS.width / 28,
//     y - CANVAS.width / 22,
//     CANVAS.width / 62.7,
//     true,
//     "pink",
//     false
//   );
//   circle(
//     x - CANVAS.width / 28,
//     y - CANVAS.width / 22,
//     CANVAS.width / 62.7,
//     false,
//     "silver",
//     "silver"
//   );
//   circle(
//     x + CANVAS.width / 28,
//     y - CANVAS.width / 22,
//     CANVAS.width / 62.7,
//     false,
//     "silver",
//     "silver"
//   );

//   //snootle:
//   CTX_OTHER.fillStyle = "white";
//   CTX_OTHER.beginPath();
//   CTX_OTHER.ellipse(
//     x,
//     y - CANVAS.height / 48,
//     CANVAS.width / 120,
//     CANVAS.width / 180,
//     0,
//     0,
//     Math.PI * 2,
//     false
//   );
//   CTX_OTHER.fill();

//   //uus:
//   circle(
//     x - CANVAS.width / 60,
//     y - CANVAS.width / 60,
//     CANVAS.width / 140,
//     true,
//     "black",
//     "black"
//   );
//   circle(
//     x + CANVAS.width / 60,
//     y - CANVAS.width / 60,
//     CANVAS.width / 140,
//     true,
//     "black",
//     "black"
//   );

//   //nose:
//   circle(x, y - CANVAS.height / 48, CANVAS.width / 360, true, "black", false);
// };
// //check
// var drawCod = function (x, y) {
//   CTX_OTHER.lineWidth = 4;

//   //body:
//   circle(x, y, CANVAS.width / 19, true, "SeaShell", false);

//   //nose:
//   circle(x, y - CANVAS.height / 48, CANVAS.width / 360, true, "pink", false);

//   //uus:
//   CTX_OTHER.strokeStyle = "black";
//   CTX_OTHER.beginPath();
//   CTX_OTHER.arc(
//     x - CANVAS.width / 60,
//     y - CANVAS.width / 60,
//     CANVAS.width / 140,
//     0,
//     Math.PI,
//     true
//   );
//   CTX_OTHER.moveTo(x + CANVAS.width / 40, y - CANVAS.width / 60);
//   CTX_OTHER.arc(
//     x + CANVAS.width / 60,
//     y - CANVAS.width / 60,
//     CANVAS.width / 140,
//     0,
//     Math.PI,
//     true
//   );
//   CTX_OTHER.stroke();

//   //black spot:
//   CTX_OTHER.fillStyle = "black";
//   CTX_OTHER.beginPath();
//   CTX_OTHER.moveTo(x, y + CANVAS.width / 19);
//   CTX_OTHER.quadraticCurveTo(
//     x + CANVAS.width / 19,
//     y + CANVAS.width / 19,
//     x + CANVAS.width / 19,
//     y
//   );
//   CTX_OTHER.fill();

//   //brown spot:
//   CTX_OTHER.fillStyle = "#d98238";
//   CTX_OTHER.beginPath();
//   CTX_OTHER.moveTo(x, y - CANVAS.width / 19);
//   CTX_OTHER.quadraticCurveTo(
//     x - CANVAS.width / 19,
//     y - CANVAS.width / 19,
//     x - CANVAS.width / 19,
//     y
//   );
//   CTX_OTHER.fill();

//   //urs:
//   CTX_OTHER.fillStyle = "#d98238";
//   CTX_OTHER.beginPath();
//   CTX_OTHER.moveTo(x - CANVAS.width / 19, y - CANVAS.width / 76);
//   CTX_OTHER.lineTo(x - CANVAS.width / 19, y - CANVAS.width / 23.75);
//   CTX_OTHER.lineTo(x - CANVAS.width / 76, y - CANVAS.width / 23.75);
//   CTX_OTHER.fill();

//   CTX_OTHER.fillStyle = "black";
//   CTX_OTHER.beginPath();
//   CTX_OTHER.moveTo(x + CANVAS.width / 40, y - CANVAS.width / 60);
//   CTX_OTHER.lineTo(
//     x + CANVAS.width / 40 + CANVAS.width / 120,
//     CANVAS.width / 120
//   );
//   CTX_OTHER.fill();
// };
// //check
// var drawPog = function (x, y) {
//   circle(x, y, CANVAS.width / 19, true, "black", false);
// };
// //check
// var drawInfo = function () {
//   document.getElementById("level").textContent = "Level: " + level;
// };
// //check
// var testCollide = function () {
//   //for edge:
//   if (x <= 0) {
//     x = 0;
//   }
//   if (x >= CANVAS.width) {
//     x = CANVAS.width;
//   }
//   if (y <= 0) {
//     y = 0;
//   }
//   if (y >= CANVAS.height) {
//     y = CANVAS.height;
//   }

//   //for maze borders:
//   var uumBoxWidth = 248;
//   var uumBoxHeight = 204;

//   var mazeData = CTX.getImageData(
//     x - uumBoxWidth / 2,
//     y - uumBoxHeight / 2,
//     uumBoxWidth,
//     uumBoxHeight
//   ).data;
//   var uumData = CTX_OTHER.getImageData(
//     x - uumBoxWidth / 2,
//     y - uumBoxHeight / 2,
//     uumBoxWidth,
//     uumBoxHeight
//   ).data;

//   for (var pix = 0; pix < uumBoxWidth * uumBoxHeight; pix++) {
//     var isInUum = uumData[4 * pix + 3] > 0; // alpha of Uum CANVAS is > 0;
//     if (
//       isInUum &&
//       !(
//         mazeData[4 * pix] === 255 &&
//         mazeData[4 * pix + 1] === 255 &&
//         mazeData[4 * pix + 2] === 0
//       )
//     ) {
//       level = 1;
//       x = CANVAS.width / 2;
//       y = CANVAS.height / 2 + CANVAS.height / 2 / 2;
//       speed = 5;
//     }
//   }
// };
// //check
// var drawWin = function () {
//   document.getElementById("win").textContent = "You Win!";
//   document.getElementById("uum").src = "images/uum.png";
//   document.getElementById("uum").height = 200;
//   document.getElementById("uum").width = 250;
// };
// class Ball {
//   constructor() {
//     this.x = 100;
//     this.y = 100;
//     this.xSpeed = -16;
//     this.ySpeed = 24;
//   }
//   draw() {
//     //circle(this.x, this.y, 50, true, 'purple', 'black');
//     CTX.fillStyle = "purple";
//     CTX.beginPath();
//     CTX.arc(this.x, this.y, 40, 0, Math.PI * 2, false);
//     CTX.fill();
//   }
//   move() {
//     this.x += this.xSpeed;
//     this.y += this.ySpeed;
//   }
//   checkCollision() {
//     if (this.x < 0 || this.x > CANVAS.width) {
//       this.xSpeed = -this.xSpeed;
//     }
//     if (this.y < 0 || this.y > CANVAS.height) {
//       this.ySpeed = -this.ySpeed;
//     }
//   }
// }
// var ball = new Ball();
// //check
// var drawMazeBorders = function () {
//   //for level 1:
//   CTX.fillStyle = "blue";
//   if (level == 1) {
//     CTX.fillRect(
//       CANVAS.width / 2 / 2,
//       CANVAS.height / 2 - CANVAS.height / 2 / 2,
//       mazeWidth(),
//       CANVAS.height / 2 + CANVAS.height / 2 / 2
//     );

//     CTX.fillRect(CANVAS.width / 2, 0, mazeWidth(), CANVAS.height / 2);
//     CTX.fillRect(0, 0, (CANVAS.width / 4) * 2 + 5, mazeWidth());
//     CTX.fillRect(0, 0, mazeWidth(), CANVAS.height / 2);
//     CTX.fillRect(
//       CANVAS.width / 2,
//       (CANVAS.height / 2 / 2 / 2) * 7.5,
//       CANVAS.width,
//       CANVAS.height
//     );
//     CTX.fillRect(
//       (CANVAS.width / 2 / 2 / 2) * 7.5,
//       0,
//       CANVAS.width,
//       CANVAS.height
//     );
//   }

//   //for level 2:
//   CTX.fillStyle = "green";
//   if (level == 2) {
//     CTX.fillRect(
//       CANVAS.width / 2 / 2,
//       CANVAS.height / 2,
//       mazeWidth(),
//       CANVAS.height / 2 + CANVAS.height / 2 / 2
//     );
//     CTX.fillRect(
//       CANVAS.width / 2 + CANVAS.width / 2 / 2,
//       CANVAS.height / 2,
//       mazeWidth(),
//       CANVAS.height
//     );
//     CTX.fillRect(0, CANVAS.height / 2, CANVAS.width / 4 + 5, mazeWidth());
//     CTX.fillRect(
//       CANVAS.width / 2 + CANVAS.width / 2 / 2 / 2,
//       CANVAS.height / 2,
//       CANVAS.width / 2,
//       mazeWidth()
//     );
//     CTX.fillRect(0, 0, mazeWidth(), CANVAS.height / 2);
//     CTX.fillRect(CANVAS.width - mazeWidth(), 0, mazeWidth(), CANVAS.height / 2);
//     CTX.fillRect(mazeWidth() * 4, 0, CANVAS.width, mazeWidth());
//   }

//   //for level 3:
//   CTX.fillStyle = "red";
//   if (level == 3) {
//     CTX.fillRect(
//       CANVAS.width / 2 / 2,
//       (CANVAS.height / 2) * 1.4,
//       CANVAS.width,
//       mazeWidth()
//     );
//     CTX.fillRect(
//       0,
//       CANVAS.height / 2 - CANVAS.height / 2 / 2,
//       CANVAS.width / 2 + CANVAS.width / 2 / 2,
//       mazeWidth()
//     );
//   }

//   //for level 4:
//   CTX.fillStyle = "orange";
//   if (level == 4) {
//     //draw:
//     CTX.fillRect(finnalX, CANVAS.height / 2, CANVAS.width / 2 / 2, mazeWidth());
//     CTX.fillRect(
//       finnalXOther,
//       CANVAS.height / 2 - CANVAS.height / 2 / 2,
//       CANVAS.width / 2 / 2,
//       mazeWidth()
//     );

//     //move:
//     if (finnalX < CANVAS.width) finnalX += 5;
//     else finnalX = 0;

//     if (finnalXOther > 0) finnalXOther -= 5;
//     else finnalXOther = CANVAS.width;
//   }

//   //for level 5:
//   CTX.fillStyle = "purple";
//   if (level == 5) {
//     ball.draw();
//     ball.move();
//     ball.checkCollision();
//   }

//   //for level 6:
//   CTX.fillStyle = "green";
//   if (level == 6) {
//     CTX.fillRect(
//       0,
//       CANVAS.height / 2 + CANVAS.height / 2 / 2 / 2,
//       CANVAS.width / 2 / 2,
//       CANVAS.height
//     );
//     CTX.fillRect(0, 0, CANVAS.width, mazeWidth());
//     CTX.fillRect(CANVAS.width / 2, 0, CANVAS.width, CANVAS.height);
//     CTX.fillStyle = "yellow";
//     CTX.fillRect(
//       CANVAS.width / 2 - 5,
//       CANVAS.height / 4,
//       CANVAS.width,
//       CANVAS.height / 4
//     );
//     CTX.fillRect(
//       CANVAS.width / 2 + CANVAS.width / 2 / 2,
//       0,
//       CANVAS.width,
//       CANVAS.height
//     );
//   }

//   //for level 7:
//   CTX.fillStyle = "blue";
//   if (level == 7) {
//     CTX.fillRect(
//       CANVAS.width / 2,
//       CANVAS.height / 2 + CANVAS.height / 8,
//       CANVAS.width,
//       mazeWidth() * 2
//     );
//     CTX.fillRect(0, 0, CANVAS.width, mazeWidth() * 2);
//     CTX.fillRect(0, 0, mazeWidth() * 2, CANVAS.height);
//   }
// };
// //check
// var testLevel = function () {
//   if (y <= 0 && level != (6 || 7)) {
//     level++;
//     y = CANVAS.height;
//   }

//   if (level == 6 && x <= 0) {
//     level++;
//     x = CANVAS.width;
//   }

//   if (level == 7 && y >= CANVAS.height) {
//     level++;
//     y = CANVAS.height;
//   }

//   if (level == 8) {
//     level = "You Win!!";
//     clearInterval(mainLoop);
//     drawWin();
//   }
// };
// //check
// var debug = function () {
//   if (showDebug) {
//     document.getElementById("moreInfo").textContent =
//       `XY= ${x}, ${y}\nspeed=${speed}\nimg: ` +
//       CTX.getImageData(x, y, 1, 1).data.join(", ");
//   } else {
//     document.getElementById("moreInfo").textContent = "";
//   }
// };
// //check
// var drawStuv = function () {
//   if (stuv == "uum") {
//     drawUum(x, y);
//   }
//   if (stuv == "dig") {
//     drawDig(x, y);
//   }
//   if (stuv == "cod") {
//     drawCod(x, y);
//   }
//   if (stuv == "ill") {
//     drawIll(x, y);
//   }
//   if (stuv == "pog") {
//     drawPog(x, y);
//   }
// };
// //check
// var sendKeyDown = function (event) {
//   var code = event.code;
//   if (code == left) {
//     x += speed; // move uum left
//     if (level != 5 && level != 4) {
//       speed++;
//     }
//   }
//   if (code == right) {
//     x -= speed; //move uum right
//     if (level != 5 && level != 4) {
//       speed++;
//     }
//   }
//   if (code == up) {
//     y -= speed; //move uum up
//     if (level != 5 && level != 4) {
//       speed++;
//     }
//   }
//   if (code == down) {
//     y += speed; //move uum down
//     if (level != 5 && level != 4) {
//       speed++;
//     }
//   }
//   if (code == "KeyI") {
//     showDebug = !showDebug; //togle debug
//   }
// };
// //check
// var sendKeyUp = function (event) {
//   var code = event.code;
//   if (code == right || code == left || code == up || code == down) speed = 1;
// };
// document.addEventListener("keydown", sendKeyDown);
// document.addEventListener("keyup", sendKeyUp);
// //main loop:
// //check
// var mainLoop = setInterval( () => {

//   if (level == 4 && stuv != "pog") {
//     speed = 7;
//   } else if (level == 5 && stuv != "pog") {
//     speed = 13;
//   }

//   CANVAS.height = window.innerHeight;
//   CANVAS.width = window.innerWidth;
//   CANVAS_OTHER.height = window.innerHeight;
//   CANVAS_OTHER.width = window.innerWidth;

//   drawBackground();
//   drawMazeBorders();
//   drawStuv(x, y);
//   testLevel();
//   if (stuv != "pog") {
//     testCollide();
//   }
//   debug();
//   drawInfo();
// }, 30);