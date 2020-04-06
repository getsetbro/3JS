import * as THREE from '../web_modules/three.js';
// import {TimelineMax, Expo} from '../web_modules/gsap.js';

// Set the scene size.
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

// Get the DOM element to attach to
const container = document.querySelector("#container");

// Create a WebGL renderer, camera
// and a scene
const renderer = new THREE.WebGLRenderer({ antialias: true });
// const camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
let camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  1,
  1000
);

const scene = new THREE.Scene();

// Add the camera to the scene.
scene.add(camera);

// Start the renderer.
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(WIDTH / 1.5, HEIGHT / 1.5);

// Attach the renderer-supplied
// DOM element.
container.appendChild(renderer.domElement);

// create a point light
const pointLight = new THREE.PointLight(0xffffff);

// set its position
pointLight.position.x = 55;
pointLight.position.y = 50;
pointLight.position.z = 44;

// add to the scene
scene.add(pointLight);

// create the sphere's material
const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0xcc00cc });

// Set up the sphere vars
const RADIUS = 3;
const SEGMENTS = 16;
const RINGS = 16;

// Create a new mesh with
// sphere geometry - we will cover
// the sphereMaterial next!
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(RADIUS, SEGMENTS, RINGS),
  sphereMaterial
);

// Move the Sphere back in Z so we
// can see it.
sphere.position.z = -2;

// Finally, add the sphere to the scene.
scene.add(sphere);

var geometry = new THREE.BoxGeometry(3, 3, 2);
var material = new THREE.MeshLambertMaterial({ color: 0xccffcc });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;
var animate = function () {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.005;
  cube.rotation.y += 0.001;

  renderer.render(scene, camera);
};

animate();

// function update() {
//   // Draw!
//   renderer.render(scene, camera);

//   // Schedule the next frame.
//   requestAnimationFrame(update);
// }

// // Schedule the first frame.
// requestAnimationFrame(update);
