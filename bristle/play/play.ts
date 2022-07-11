import { match, P } from 'ts-pattern';

// We have to put the `Player` class first because there are references to it later,
// and in interpreted code where the code is read top to bottom, 
// that won't work so we have to put this at the top.
// This is why interpreted languages are very good for a mix of procedural and object-oriented code.
class Player {
    speed: number;
    coords: Coordinates;
    bristle_AABB: AABB;
    pointing_direction: number;

    constructor(coords: Coordinates) {
        this.speed = 0;     
        this.coords = coords;
        this.bristle_AABB = {x1: coords.x-20, x2: coords.x+20, y1: coords.y-70-points, y2: coords.y};
        this.pointing_direction = 0;
        this.send_key_down = this.send_key_down.bind(this);
        this.send_key_up = this.send_key_up.bind(this);
    }



    test_collide() {
        // Border Collision
        if (this.coords.x-30 < 0) {
            this.coords.x = 30;
            this.speed = 0;
        }
        if (this.coords.y-30 < 0) {
            this.coords.y = 30;
            this.speed = 0;
        }
        if (this.coords.x+30 > CANVAS.width) {
            this.coords.x = CANVAS.width-30;
            this.speed = 0;
        }
        if (this.coords.y+30 > CANVAS.height) {
            this.coords.y = CANVAS.height-30;
            this.speed = 0;
        }
        // Food Collision
        let x = this.coords.x;
        let y = this.coords.y;
        let pts = points;
        let collide_x: boolean;
        let collide_y: boolean;
        if (this.pointing_direction == 0) this.bristle_AABB = {x1: x-20, x2: x+20, y1: y-70-pts, y2: y};
        if (this.pointing_direction == 90) this.bristle_AABB = {x1: x, x2: x+70+pts, y1: y-20, y2: y+20};
        if (this.pointing_direction == 180) this.bristle_AABB = {x1: x-20, x2: x+20, y1: y, y2: y+70+pts}; 
        for (let i = 0; i < food_arr.length-1; i++) {
            collide_x = food_arr[i].x > this.bristle_AABB.x1 && food_arr[i].x < this.bristle_AABB.x2;
            collide_y = food_arr[i].y > this.bristle_AABB.y1 && food_arr[i].y < this.bristle_AABB.y2;
            if (collide_x && collide_y) {
                points++;
                food_arr.splice(i, 1);
            }
        }
    }

    draw() {
        let x = this.coords.x;
        let y = this.coords.y;
        let pts = points;
        CTX.fillStyle = "gray";
        if (this.pointing_direction == 0) {
            CTX.beginPath();
            CTX.moveTo(x-20, y);
            CTX.lineTo(x+20, y);
            CTX.lineTo(x, y-70-pts);
            CTX.fill();
        } else if (this.pointing_direction == 90) {
            CTX.beginPath();
            CTX.moveTo(x, y-20);
            CTX.lineTo(x, y+20);
            CTX.lineTo(x+70+pts, y);
            CTX.fill();
        } else if (this.pointing_direction == 180) {
            CTX.beginPath();
            CTX.moveTo(x-20, y);
            CTX.lineTo(x+20, y);
            CTX.lineTo(x, y+70+pts);
            CTX.fill();
        } else if (this.pointing_direction == 270) {
            CTX.beginPath();
            CTX.moveTo(x, y-20);
            CTX.lineTo(x, y+20);
            CTX.lineTo(x-70-pts, y);
            CTX.fill();
        }
        circle(x, y, 30, true, SKIN_COLOR, "blue");
    }

    send_key_down(event: { code: any; }) {
        let code = event.code;
        match(code)
            .with(control_keys[0], () => {
                this.coords.y -= this.speed;
                if (this.speed < 20) {
                    this.speed++;
                    this.pointing_direction = 180;
                }})
            .with(control_keys[1], () => {
                this.coords.y += this.speed;
                if (this.speed < 20) {
                    this.speed++;
                    this.pointing_direction = 0;
                }
            })
            .with(control_keys[2], () => {
                this.coords.x -= this.speed;
                if (this.speed < 20) {
                    this.speed++;
                    this.pointing_direction = 90;
                }})
            .with(control_keys[3], () => {
                this.coords.x += this.speed;
                if (this.speed < 20) {
                    this.speed++;
                    this.pointing_direction = 270;
                }})
            .with("KeyI", () => show_debug = !show_debug)
            .exhaustive();
    };
    send_key_up(event: { code: any; }) {
        if (control_keys.filter(code => code == event.code).length != 0) this.speed = 0;
    };      
}

// Game constants
const SKIN_COLOR: string | null = localStorage.getItem("BRISTLE_skin-color");
const control_setting: string | null = localStorage.getItem("BRISTLE_controls");
const CANVAS: any = document.getElementById("CANVAS");
const CTX: any = CANVAS.getContext("2d");
const FOOD_COLOR = ["blue", "green", "orange", "red", "pink"];
const PLAYER: Player = new Player({x: CANVAS.width / 2, y: CANVAS.height / 2});

// Enums
enum Axis {
    minus_x,
    plus_x,
    minus_y,
    plus_y,
}


// Bunch of interfaces
interface AABB {
    x1: number,
    x2: number,
    y1: number,
    y2: number,
}
interface Coordinates {
    x: number,
    y: number,
}
interface FoodObj {
    color: string,
    x: number,
    y: number,
}

// Game variables
let control_keys: Array<string>;
let show_debug: boolean = false;
let points: number = 0;
let mainloop: number;
let highscore: number;
let food_arr: Array<FoodObj> = [];

// Setting up the game
CANVAS.height = window.innerHeight;
CANVAS.width = window.innerWidth;
if (control_setting == "wasd") {
    control_keys = ["KeyW", "KeyS", "KeyA", "D"];
} else if (control_setting == "arrow") {
    control_keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight "];
}
if (localStorage.getItem('BRISTLE_highscore') === null) {
    localStorage.setItem('BRISTLE_highscore', "0");
}
document.addEventListener("keydown", PLAYER.send_key_down);
document.addEventListener("keyup", PLAYER.send_key_up);

// Mainloop
mainloop = setInterval( () => {
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


    if (points > highscore) localStorage.setItem('BRISTLE_highscore', points.toString());

}, 30);


function circle(x: any, y: any, radius: number, isFilled: boolean, fillColor: any, outlineColor: any) {
    CTX.strokeStyle = outlineColor;
    CTX.fillStyle = fillColor;
    CTX.beginPath();
    CTX.arc(x, y, radius, 0, Math.PI * 2, false);
    if (isFilled) {
        CTX.fill();
    } else {
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
        `XY=${PLAYER.coords.x}, ${this.player.coords.y}\nspeed=${PLAYER.speed}\npointingDirection=${PLAYER.pointing_direction}\nfoodCount=${food_arr.length}`
    } else {
        // @ts-ignore
        document.getElementById("moreInfo").textContent = "";
    }
}

function generate_food() {
    let should_generate = Math.floor(Math.random() * 60) == 1;
    if (food_arr.length < 15 && should_generate) {
        let color = FOOD_COLOR[Math.floor(Math.random() * (FOOD_COLOR.length - 1))];
        let x = Math.floor(Math.random() * CANVAS.width);
        let y = Math.floor(Math.random() * CANVAS.height);
        let new_food: FoodObj = {color, x, y};
        food_arr.push(new_food);
    }
    for (let i = 0; i < food_arr.length-1; i++) {
        circle(food_arr[i].x, food_arr[i].y, 15, true, food_arr[i].color, food_arr[i].color);
    }
}