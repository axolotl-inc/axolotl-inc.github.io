class Game {
  constructor() {
    this.speed = 0;
    this.level = 1;
    this.showDebug = false;
    this.stuv = localStorage.getItem("STUVMAZE_stuv");
    this.controls = localStorage.getItem("STUVMAZE_controls");
    this.CANVAS_OTHER = document.getElementById("CANVAS_OTHER");
    this.CTX_OTHER = CANVAS_OTHER.getContext("2d");
    this.CANVAS_OTHER.height = window.innerHeight;
    this.CANVAS_OTHER.width = window.innerWidth;
    this.CANVAS = document.getElementById("CANVAS");
    this.CTX = CANVAS.getContext("2d");
    this.player = new Player(this);
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
    
    document.addEventListener("keydown", this.player.sendKeyDown);
    document.addEventListener("keyup", this.player.sendKeyUp);
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
      this.player.draw();
      this.player.testLevel();
      if (this.stuv != "pog") {
        this.player.testCollide();
      }
      this.player.debug();
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

class Player {
  constructor(game) {
    this.x = game.CANVAS.width / 2;
    this.y = game.CANVAS.height / 2 + game.CANVAS.height / 4;
    this.game = game;
    this.sendKeyDown = this.sendKeyDown.bind(this);
    this.sendKeyUp = this.sendKeyUp.bind(this);
  }
  sendKeyDown(event) {
    var code = event.code;
    if (code == this.game.left) {
      this.x += this.game.speed;
      if (this.game.level != 5 && this.game.level != 4) {
        this.game.speed++;
      }
    }
    if (code == this.game.right) {
      this.x -= this.game.speed;
      if (this.game.level != 5 && this.game.level != 4) {
        this.game.speed++;
      }
    }
    if (code == this.game.up) {
      this.y -= this.game.speed;
      if (this.game.level != 5 && this.game.level != 4) {
        this.game.speed++;
      }
    }
    if (code == this.game.down) {
      this.y += this.game.speed;
      if (this.game.level != 5 && this.game.level != 4) {
        this.game.speed++;
      }
    }
    if (code == "KeyI") {
      this.game.showDebug = !this.game.showDebug;
    }
  };
  sendKeyUp(event) {
    var code = event.code;
    if (code == this.game.right || code == this.game.left || code == this.game.up || code == this.game.down) this.game.speed = 1;
  };
  drawUum() {
    let ctx = this.game.CTX_OTHER;
    let canvas = this.game.CANVAS;
    ctx.lineWidth = 2;
    this.game.circle(this.x, this.y, canvas.width / 19, true, "#ffb3cf");
    this.game.circle(this.x - canvas.width / 19, this.y, canvas.width / 19 / 5, true, "#ffb3cf");
    this.game.circle(this.x + canvas.width / 19, this.y, canvas.width / 19 / 5, true, "#ffb3cf");
    ctx.fillStyle = "SeaShell";
    ctx.beginPath();
    ctx.ellipse(this.x, this.y + canvas.width / 19 / 2, canvas.width / 19 / 1.3, canvas.width / 19 / 1.92, 0, 0, 2 * Math.PI, false);
    ctx.fill();
    this.game.circle(this.x - canvas.width / 95, this.y - canvas.width / 19 / 4, canvas.width / 125.4, true, "black", "black");
    this.game.circle(this.x + canvas.width / 95, this.y - canvas.width / 19 / 4, canvas.width / 125.4, true, "black", "black");
  }
  drawDig() {
    let ctx = this.game.CTX_OTHER;
    let canvas = this.game.CANVAS;
    ctx.lineWidth = 2;
    this.game.circle(this.x, this.y, canvas.width / 19, true, "Chocolate", "brown");
    ctx.fillStyle = "SeaShell";
    ctx.beginPath();
    ctx.ellipse(this.x, this.y + canvas.width / 19 / 2, canvas.width / 19 / 1.3, canvas.width / 19 / 1.92, 0, 0, 2 * Math.PI, false);
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
    let ctx = this.game.CTX_OTHER;
    let canvas = this.game.CANVAS;
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
    this.game.circle(this.x, this.y - CANVAS.height / 48, CANVAS.width / 360, true, "black", false);
  }
  drawCod() {
    let ctx = this.game.CTX_OTHER;
    let canvas = this.game.CANVAS;
    ctx.lineWidth = 4;
    this.game.circle(this.x, this.y, canvas.width / 19, true, "SeaShell", false);
    this.game.circle(this.x, this.y - canvas.height / 48, canvas.width / 360, true, "pink", false);
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.arc(this.x - canvas.width / 60, this.y - canvas.width / 60, canvas.width / 140, 0, Math.PI, true);
    ctx.moveTo(this.x + CANVAS.width / 40, this.y - CANVAS.width / 60);
    ctx.arc(this.x + CANVAS.width / 60, this.y - CANVAS.width / 60, CANVAS.width / 140, 0, Math.PI, true);
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y + canvas.width / 19);
    ctx.quadraticCurveTo(this.x + canvas.width / 19, this.y + canvas.width / 19, this.x + canvas.width / 19, this.y);
    ctx.fill();
    ctx.fillStyle = "#d98238";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - canvas.width / 19);
    ctx.quadraticCurveTo(this.x - canvas.width / 19, this.y - canvas.width / 19, this.x - CANVAS.width / 19, this.y);
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
      this.drawUum(this.x, this.y);
    }
    if (this.game.stuv == "dig") {
      this.drawDig(this.x, this.y);
    }
    if (this.game.stuv == "cod") {
      this.drawCod(this.x, this.y);
    }
    if (this.game.stuv == "ill") {
      this.drawIll(this.x, this.y);
    }
    if (this.game.stuv == "pog") {
      this.circle(this.x, this.y, this.game.CANVAS.width / 19, true, "black", false);
    }
  }

  debug() {
    if (this.game.showDebug) {
      document.getElementById("moreInfo").textContent =
        `XY= ${this.x}, ${this.y}\nspeed=${this.game.speed}\nimg: ${this.game.CTX.getImageData(this.x, this.y, 1, 1).data.join(", ")}`
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
      this.game.speed = 1;
    }
    if (this.x >= this.game.CANVAS.width) {
      this.x = this.game.CANVAS.width;
      this.game.speed = 1;
    }
    if (this.y <= 0) {
      this.y = 0;
      this.game.speed = 1;
    }
    if (this.y >= this.game.CANVAS.height) {
      this.y = this.game.CANVAS.height;
      this.game.speed = 1;
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