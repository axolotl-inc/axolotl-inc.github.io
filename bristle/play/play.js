class Game {
    constructor() {
        this.skinColor = localStorage.getItem("skin-color");
        this.controls = localStorage.getItem("controls");
        this.CANVAS = document.getElementById("CANVAS");
        this.CTX = CANVAS.getContext("2d");
        this.up;
        this.left;
        this.right;
        this.down;
        this.CANVAS.height = window.innerHeight;
        this.CANVAS.width = window.innerWidth;
        this.player = new Player(this, this.CANVAS.width / 2, this.CANVAS.height / 2);
        this.food = new Food(this, this.CANVAS.width, this.CANVAS.height);
        if (this.controls == "wasd") {
            this.up = "KeyW";
            this.left = "KeyA";
            this.right = "KeyD";
            this.down = "KeyS";
        } else if (this.controls == "arrow") {
            this.up = "ArrowUp";
            this.left = "ArrowLeft";
            this.right = "ArrowRight";
            this.down = "ArrowDown";
        }
        this.showDebug = false
        this.points = 0;

        
        document.addEventListener("keydown", this.player.sendKeyDown);
        document.addEventListener("keyup", this.player.sendKeyUp);
        this.mainloop = setInterval( () => {

            document.getElementById("points").textContent = "Points: " + this.points;

            this.CANVAS.height = window.innerHeight;
            this.CANVAS.width = window.innerWidth;

            this.drawBackground();
            this.food.generate();
            this.player.testCollide();
            this.food.draw();
            this.player.draw();
            this.player.debug();

        }, 30);
    }

    circle(x, y, radius, isFilled, fillColor, outlineColor) {
        this.CTX.strokeStyle = outlineColor;
        this.CTX.fillStyle = fillColor;
        this.CTX.beginPath();
        this.CTX.arc(x, y, radius, 0, Math.PI * 2, false);
        if (isFilled) {
          this.CTX.fill();
        } else {
          this.CTX.stroke();
        }
    }

    drawBackground() {
        this.CTX.fillStyle = "lavender";
        this.CTX.fillRect(0, 0, this.CANVAS.width, this.CANVAS.height);
    }
}

class Player {
    constructor(game, x, y) {
        this.speed = 0;
        this.x = x;
        this.y = y;
        this.game = game;
        this.pointingDirection=365;
        this.sendKeyDown = this.sendKeyDown.bind(this);
        this.sendKeyUp = this.sendKeyUp.bind(this);
    }

    debug() {
        if (this.game.showDebug) {
          document.getElementById("moreInfo").textContent =
            `XY=${this.x}, ${this.y}\nspeed=${this.speed}\npointingDirection=${this.pointingDirection}`
        } else {
          document.getElementById("moreInfo").textContent = "";
        }
    }

    testCollide() {
        if (this.x-30 < 0) {
            this.x = 30;
            this.speed = 0;
        }
        if (this.y-30 < 0) {
            this.y = 30;
            this.speed = 0;
        }
        if (this.x+30 > this.game.CANVAS.width) {
            this.x = this.game.CANVAS.width-30;
            this.speed = 0;
        }
        if (this.y+30 > this.game.CANVAS.height) {
            this.y = this.game.CANVAS.height-30;
            this.speed = 0;
        }
    }

    draw() {
        let x = this.x;
        let y = this.y;
        this.game.CTX.fillStyle = "gray";
        if (this.pointingDirection == 0) {
            this.game.CTX.beginPath();
            this.game.CTX.moveTo(x-20, y);
            this.game.CTX.lineTo(x+20, y);
            this.game.CTX.lineTo(x, y+70);
            this.game.CTX.fill();
        } else if (this.pointingDirection == 90) {
            this.game.CTX.beginPath();
            this.game.CTX.moveTo(x, y-20);
            this.game.CTX.lineTo(x, y+20);
            this.game.CTX.lineTo(x-70, y);
            this.game.CTX.fill();
        } else if (this.pointingDirection == 180) {
            this.game.CTX.beginPath();
            this.game.CTX.moveTo(x-20, y);
            this.game.CTX.lineTo(x+20, y);
            this.game.CTX.lineTo(x, y-70);
            this.game.CTX.fill();
        } else if (this.pointingDirection == 270) {
            this.game.CTX.beginPath();
            this.game.CTX.moveTo(x, y-20);
            this.game.CTX.lineTo(x, y+20);
            this.game.CTX.lineTo(x+70, y);
            this.game.CTX.fill();
        }
        this.game.circle(x, y, 30, true, this.game.skinColor, "blue");
    }

    sendKeyDown(event) {

        let code = event.code;
        if (code == this.game.left) {
            this.x -= this.speed;
            if (this.speed < 20) {
                this.speed++;
                this.pointingDirection = 270;
            }
        }
        if (code == this.game.right) {
            this.x += this.speed;
            if (this.speed < 20) {
                this.speed++;
                this.pointingDirection = 90;
            }
        }
        if (code == this.game.up) {
            this.y -= this.speed;
            if (this.speed < 20) {
                this.speed++;
                this.pointingDirection = 0;
            }
        }
        if (code == this.game.down) {
            this.y += this.speed;
            if (this.speed < 20) {
                this.speed++;
                this.pointingDirection = 180;
            }
        }
        if (code == "KeyI") {
            this.game.showDebug = !this.game.showDebug;
        }
    };
    sendKeyUp(event) {
        let code = event.code;
        if (code == this.game.right || code == this.game.left || code == this.game.up || code == this.game.down) this.speed = 0;
    };
}

class Food {
    constructor(game, width, height) {
        this.game = game;
        this.width = width;
        this.height = height;
        this.foods = [];
        this.colors = ["blue", "green", "orange", "red", "pink"];
    }
    generate() {
        let shouldGenerate = Math.floor(Math.random() * 60) == 1;
        if (this.foods.length < 15 && shouldGenerate) {
            let color = this.colors[Math.floor(Math.random() * (this.colors.length - 1))];
            let x = Math.floor(Math.random() * this.width);
            let y = Math.floor(Math.random() * this.height);
            this.foods.push([color, x, y]);
        }
    }
    draw() {
        for (let i = 0; i < this.foods.length; i++) {
            this.game.circle(this.foods[i][1], this.foods[i][2], 15, true, this.foods[i][0], this.foods[i][0]);
        }
    }
}

game = new Game();