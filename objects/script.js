import * as THREE from "../web_modules/three.js";
// import {TimelineMax, Expo} from '../web_modules/gsap.js';

// Set the scene size.
const wInnerWidth = window.innerWidth;
const wInnerHeight = window.innerHeight;

// Create a WebGL renderer, camera
// and a scene
// const camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
let camera = new THREE.PerspectiveCamera( 99, wInnerWidth / wInnerHeight, 1, 99 );
camera.position.z = 5;

const scene = new THREE.Scene();
// Add the camera to the scene.
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ antialias: true });
// Start the renderer.
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor("#222");
renderer.setSize(wInnerWidth, wInnerHeight);

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
const RADIUS = 2;
const SEGMENTS = 16;
const RINGS = 16;
// Create a new mesh with sphere geometry
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(RADIUS, SEGMENTS, RINGS),
  sphereMaterial
);
scene.add(sphere);

var geometry = new THREE.BoxGeometry(4, 3, 1);
var material = new THREE.MeshLambertMaterial({ color: 0xccffcc });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Attach the DOM element.
document.body.appendChild(renderer.domElement);

var animate = function () {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.05;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
};

requestAnimationFrame(animate);

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
