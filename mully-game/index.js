// The "scene" is where stuff in our game will happen:
var scene = new THREE.Scene();
var flat = { flatShading: true };
var light = new THREE.AmbientLight("white", 0.8);
scene.add(light);

// The "camera" is what sees the stuff:
var aspectRatio = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera(75, aspectRatio, 1, 10000);
camera.position.z = -500;
camera.position.y = 200;
camera.rotation.x = 3.14;
camera.rotation.z = 3.14;

// The "renderer" draws what the camera sees onto the screen:
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("skyblue");
renderer.setSize(window.innerWidth - 10, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ******** START CODING ON THE NEXT LINE ********

var shape = new THREE.SphereGeometry(100);
var cover = new THREE.MeshBasicMaterial({ color: "gray" });
var mully = new THREE.Mesh(shape, cover);
scene.add(mully);

var ear = new THREE.SphereGeometry(40);
var earcover = new THREE.MeshBasicMaterial({ color: "pink" });

var ear1 = new THREE.Mesh(ear, earcover);
ear1.position.set(-75, 90, 0);
mully.add(ear1);

var ear2 = new THREE.Mesh(ear, earcover);
ear2.position.set(75, 90, 0);
mully.add(ear2);

var eye = new THREE.SphereGeometry(10);
var eye_cover = new THREE.MeshBasicMaterial({ color: "black" });

var eye1 = new THREE.Mesh(eye, eye_cover);
eye1.position.set(25, 25, 80);
mully.add(eye1);

var eye2 = new THREE.Mesh(eye, eye_cover);
eye2.position.set(-25, 25, 80);
mully.add(eye2);

mully.rotation.set(0, Math.PI, 0);

var mouth = new THREE.TorusGeometry(10, 1, 50, 100, 1);
var mouth_cover = new THREE.MeshBasicMaterial({ color: "black" });

var mouth1 = new THREE.Mesh(mouth, mouth_cover);
mouth1.rotation.set(0, 0, 5.22);
mouth1.position.set(-10, 10, 99);
mully.add(mouth1);

var mouth2 = new THREE.Mesh(mouth, mouth_cover);
mouth2.rotation.set(0, 3.14, 5.22);
mouth2.position.set(10, 10, 99);
mully.add(mouth2);

mully.add(camera);

var groundShape = new THREE.PlaneGeometry(3000, 4000, 10, 10);
var groundCover = new THREE.MeshBasicMaterial({ color: "lawngreen" });
var ground = new THREE.Mesh(groundShape, groundCover);
ground.rotation.x = -Math.PI / 2;
ground.position.set(0, -200, -500);
scene.add(ground);

function makeTreeAt(x, z) {
  var trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(50, 50, 200),
    new THREE.MeshBasicMaterial({ color: "sienna" })
  );

  var top = new THREE.Mesh(
    new THREE.SphereGeometry(150),
    new THREE.MeshBasicMaterial({ color: "forestgreen" })
  );

  top.position.y = 175;
  trunk.add(top);

  trunk.position.set(x, -75, z);
  scene.add(trunk);
}

try {
  makeTreeAt(500, 0);
  makeTreeAt(-500, 0);
  makeTreeAt(750, -1000);
  makeTreeAt(-750, -1000);
  makeTreeAt(1000, -2000);
  makeTreeAt(-1000, -2000);
  makeTreeAt(0, -2000);
  makeTreeAt(0, -1000);
} catch (e) {
  alert(e);
}

var yaw;
var pitch;
const worldUp = new THREE.Vector3(0, 1, 0);
var up = new THREE.Vector3();
var front = new THREE.Vector3();
var right = new THREE.Vector3();
const mouseSensitivety = 0.0035;

function toRad(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

function handleMouse(offsetX, offsetY) {
  yaw = offsetX * mouseSensitivety;
  pitch = offsetY * mouseSensitivety;

  if (pitch > 89) {
    pitch = 89;
  }
  if (pitch < -89) {
    pitch = -89;
  }
  if (yaw > 360) {
    yaw = 0;
  }
  if (yaw < 0) {
    yaw = 360;
  } 
}

function evaluateVectorsAndStuff() {
  
  front.x = Math.cos(toRad(yaw)) * Math.cos(toRad(pitch));
  front.y = Math.sin(toRad(pitch));
  front.z = Math.sin(toRad(yaw)) * Math.cos(toRad(pitch));

  front.normalize();
  right.crossVectors(front, worldUp).normalize();
  up.crossVectors(right, front).normalize();
}

function sendKeyDown(event) {
  var c = event.code;
  if (c == "KeyA") mully.position.x = mully.position.x - 10;
  if (c == "KeyD") mully.position.x = mully.position.x + 10;
  if (c == "KeyW") mully.position.z = mully.position.z - 10;
  if (c == "KeyS") mully.position.z = mully.position.z + 10;
  if (c == "KeyR") {
    mully.position.set(0, 0, 0);
    mully.rotation.set(0, Math.PI, 0);
  }

  if (c == "ArrowRight") mully.rotation.y = mully.rotation.y - 0.25;
  if (c == "ArrowLeft") mully.rotation.y = mully.rotation.y + 0.25;
  if (c == "ArrowUp") mully.rotation.x = mully.rotation.x + 0.25;
  if (c == "ArrowDown") mully.rotation.x = mully.rotation.x - 0.25;

  if (c == "KeyF") flip = !flip;

  if (c == "Digit1") {
    camera.position.z = 0;
    camera.rotation.y = 0;
  }
  if (c == "Digit2") {
    camera.position.z = 500;
    camera.rotation.y = 3.14;
  }
  if (c == "Digit3") {
    camera.position.z = -500;
    camera.rotation.y = 0;
  }
}
document.addEventListener("keydown", sendKeyDown);
document.addEventListener("mousemove", e => {
  handleMouse(e.offsetX, e.offsetY);
  console.log("yaw:" + yaw + " - - - - pitch:" + pitch);
  mully.rotation.set(pitch, yaw, 0);
});
var flip = false;

// Start Animation

var clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  var t = clock.getElapsedTime();

  // Animation code goes here...
  // change if mully is spinning by changeing this from false to true and vise-versa
  if (flip) {
    mully.rotation.x = mully.rotation.x + 0.025;
  }

  renderer.render(scene, camera);
}

animate();
