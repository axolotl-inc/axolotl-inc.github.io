"use strict";
exports.__esModule = true;
var ts_pattern_1 = require("ts-pattern");
// We have to put the `Player` class first because there are references to it later,
// and in interpreted code where the code is read top to bottom, 
// that won't work so we have to put this at the top.
// This is why interpreted languages are very good for a mix of procedural and object-oriented code.
var Player = /** @class */ (function () {
    function Player(coords) {
        this.speed = 0;
        this.coords = coords;
        this.bristle_AABB = { x1: coords.x - 20, x2: coords.x + 20, y1: coords.y - 70 - points, y2: coords.y };
        this.pointing_direction = 0;
        this.send_key_down = this.send_key_down.bind(this);
        this.send_key_up = this.send_key_up.bind(this);
    }
    Player.prototype.test_collide = function () {
        // Border Collision
        if (this.coords.x - 30 < 0) {
            this.coords.x = 30;
            this.speed = 0;
        }
        if (this.coords.y - 30 < 0) {
            this.coords.y = 30;
            this.speed = 0;
        }
        if (this.coords.x + 30 > CANVAS.width) {
            this.coords.x = CANVAS.width - 30;
            this.speed = 0;
        }
        if (this.coords.y + 30 > CANVAS.height) {
            this.coords.y = CANVAS.height - 30;
            this.speed = 0;
        }
        // Food Collision
        var x = this.coords.x;
        var y = this.coords.y;
        var pts = points;
        var collide_x;
        var collide_y;
        if (this.pointing_direction == 0)
            this.bristle_AABB = { x1: x - 20, x2: x + 20, y1: y - 70 - pts, y2: y };
        if (this.pointing_direction == 90)
            this.bristle_AABB = { x1: x, x2: x + 70 + pts, y1: y - 20, y2: y + 20 };
        if (this.pointing_direction == 180)
            this.bristle_AABB = { x1: x - 20, x2: x + 20, y1: y, y2: y + 70 + pts };
        for (var i = 0; i < food_arr.length - 1; i++) {
            collide_x = food_arr[i].x > this.bristle_AABB.x1 && food_arr[i].x < this.bristle_AABB.x2;
            collide_y = food_arr[i].y > this.bristle_AABB.y1 && food_arr[i].y < this.bristle_AABB.y2;
            if (collide_x && collide_y) {
                points++;
                food_arr.splice(i, 1);
            }
        }
    };
    Player.prototype.draw = function () {
        var x = this.coords.x;
        var y = this.coords.y;
        var pts = points;
        CTX.fillStyle = "gray";
        if (this.pointing_direction == 0) {
            CTX.beginPath();
            CTX.moveTo(x - 20, y);
            CTX.lineTo(x + 20, y);
            CTX.lineTo(x, y - 70 - pts);
            CTX.fill();
        }
        else if (this.pointing_direction == 90) {
            CTX.beginPath();
            CTX.moveTo(x, y - 20);
            CTX.lineTo(x, y + 20);
            CTX.lineTo(x + 70 + pts, y);
            CTX.fill();
        }
        else if (this.pointing_direction == 180) {
            CTX.beginPath();
            CTX.moveTo(x - 20, y);
            CTX.lineTo(x + 20, y);
            CTX.lineTo(x, y + 70 + pts);
            CTX.fill();
        }
        else if (this.pointing_direction == 270) {
            CTX.beginPath();
            CTX.moveTo(x, y - 20);
            CTX.lineTo(x, y + 20);
            CTX.lineTo(x - 70 - pts, y);
            CTX.fill();
        }
        circle(x, y, 30, true, SKIN_COLOR, "blue");
    };
    Player.prototype.send_key_down = function (event) {
        var _this = this;
        var code = event.code;
        (0, ts_pattern_1.match)(code)["with"](control_keys[0], function () {
            _this.coords.y -= _this.speed;
            if (_this.speed < 20) {
                _this.speed++;
                _this.pointing_direction = 180;
            }
        })["with"](control_keys[1], function () {
            _this.coords.y += _this.speed;
            if (_this.speed < 20) {
                _this.speed++;
                _this.pointing_direction = 0;
            }
        })["with"](control_keys[2], function () {
            _this.coords.x -= _this.speed;
            if (_this.speed < 20) {
                _this.speed++;
                _this.pointing_direction = 90;
            }
        })["with"](control_keys[3], function () {
            _this.coords.x += _this.speed;
            if (_this.speed < 20) {
                _this.speed++;
                _this.pointing_direction = 270;
            }
        })["with"]("KeyI", function () { return show_debug = !show_debug; })
            .exhaustive();
    };
    ;
    Player.prototype.send_key_up = function (event) {
        if (control_keys.filter(function (code) { return code == event.code; }).length != 0)
            this.speed = 0;
    };
    ;
    return Player;
}());
// Game constants
var SKIN_COLOR = localStorage.getItem("BRISTLE_skin-color");
var control_setting = localStorage.getItem("BRISTLE_controls");
var CANVAS = document.getElementById("CANVAS");
var CTX = CANVAS.getContext("2d");
var FOOD_COLOR = ["blue", "green", "orange", "red", "pink"];
var PLAYER = new Player({ x: CANVAS.width / 2, y: CANVAS.height / 2 });
// Enums
var Axis;
(function (Axis) {
    Axis[Axis["minus_x"] = 0] = "minus_x";
    Axis[Axis["plus_x"] = 1] = "plus_x";
    Axis[Axis["minus_y"] = 2] = "minus_y";
    Axis[Axis["plus_y"] = 3] = "plus_y";
})(Axis || (Axis = {}));
// Game variables
var control_keys;
var show_debug = false;
var points = 0;
var mainloop;
var highscore;
var food_arr = [];
// Setting up the game
CANVAS.height = window.innerHeight;
CANVAS.width = window.innerWidth;
if (control_setting == "wasd") {
    control_keys = ["KeyW", "KeyS", "KeyA", "D"];
}
else if (control_setting == "arrow") {
    control_keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight "];
}
if (localStorage.getItem('BRISTLE_highscore') === null) {
    localStorage.setItem('BRISTLE_highscore', "0");
}
document.addEventListener("keydown", PLAYER.send_key_down);
document.addEventListener("keyup", PLAYER.send_key_up);
// Mainloop
mainloop = setInterval(function () {
    // @ts-ignore
    document.getElementById("points").textContent = "Points: " + points;
    CANVAS.height = window.innerHeight;
    CANVAS.width = window.innerWidth;
    // @ts-ignore
    highscore = +localStorage.getItem('BRISTLE_highscore');
    draw_background();
    generate_food();
    PLAYER.test_collide();
    PLAYER.draw();
    debug();
    if (points > highscore)
        localStorage.setItem('BRISTLE_highscore', points.toString());
}, 30);
function circle(x, y, radius, isFilled, fillColor, outlineColor) {
    CTX.strokeStyle = outlineColor;
    CTX.fillStyle = fillColor;
    CTX.beginPath();
    CTX.arc(x, y, radius, 0, Math.PI * 2, false);
    if (isFilled) {
        CTX.fill();
    }
    else {
        CTX.stroke();
    }
}
function draw_background() {
    CTX.fillStyle = "lavender";
    CTX.fillRect(0, 0, this.CANVAS.width, this.CANVAS.height);
}
function debug() {
    if (show_debug) {
        // @ts-ignore
        document.getElementById("moreInfo").textContent =
            "XY=".concat(PLAYER.coords.x, ", ").concat(this.player.coords.y, "\nspeed=").concat(PLAYER.speed, "\npointingDirection=").concat(PLAYER.pointing_direction, "\nfoodCount=").concat(food_arr.length);
    }
    else {
        // @ts-ignore
        document.getElementById("moreInfo").textContent = "";
    }
}
function generate_food() {
    var should_generate = Math.floor(Math.random() * 60) == 1;
    if (food_arr.length < 15 && should_generate) {
        var color = FOOD_COLOR[Math.floor(Math.random() * (FOOD_COLOR.length - 1))];
        var x = Math.floor(Math.random() * CANVAS.width);
        var y = Math.floor(Math.random() * CANVAS.height);
        var new_food = { color: color, x: x, y: y };
        food_arr.push(new_food);
    }
    for (var i = 0; i < food_arr.length - 1; i++) {
        circle(food_arr[i].x, food_arr[i].y, 15, true, food_arr[i].color, food_arr[i].color);
    }
}
