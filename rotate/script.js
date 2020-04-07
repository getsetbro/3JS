import * as THREE from "../web_modules/three.js";

var camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
var scene = new THREE.Scene();
scene.background = new THREE.Color("yellow");
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

var geometry = new THREE.BoxGeometry(3, 2, 1);
var material = new THREE.MeshBasicMaterial({ color: "pink" });
var cube = new THREE.Mesh(geometry, material);

scene.add(cube);
camera.position.z = 4;

document.body.appendChild(renderer.domElement);

var animate = function () {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.005;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
};

requestAnimationFrame(animate);

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
