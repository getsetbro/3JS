import * as THREE from '../web_modules/three.js';
import {TimelineMax, Expo} from '../web_modules/gsap.js';

let scene = new THREE.Scene();
let wInnerWidth = window.innerWidth;
let wInnerHeight = window.innerHeight;
// PerspectiveCamera ost closely mimics human eye
let camera = new THREE.PerspectiveCamera(50, wInnerWidth / wInnerHeight, 0.1, 1000);
camera.position.z = 15;
// RENDERERS: WEBGL, CSS2D, CSS3D, SVG
let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("#ddd");
renderer.setSize(wInnerWidth, wInnerHeight);
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let geometry = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshLambertMaterial({ color: 0xF7F7F7 });
//let mesh = new THREE.Mesh(geometry, material);
//scene.add(mesh);
var i = 22;
while (i--) {
  let mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = (Math.random() - 0.5) * 10;
  mesh.position.y = (Math.random() - 0.5) * 10;
  mesh.position.z = (Math.random() - 0.5) * 10;
  scene.add(mesh);
}
//lots of kinds of lights
// let light = new THREE.PointLight("yellow", 1, 1000);
// light.position.set(0, 0, 0);
// scene.add(light);

// let light2 = new THREE.PointLight("blue", 2, 1000);
// light2.position.set(0, 0, 25);
// scene.add(light2);

// let geometryL = new THREE.BoxGeometry(0.17, 0.17, 0.17);
// let materialL = new THREE.MeshLambertMaterial({ color: 0xFFFFFF });

let light3 = new THREE.PointLight("red", 1, 100);
light3.position.set( 1,1,8 );
scene.add(light3);

// let meshL3 = new THREE.Mesh(geometryL, materialL);
// meshL3.position.x = 1;
// meshL3.position.y = 1;
// meshL3.position.z = 8;
// scene.add(meshL3);

let light4 = new THREE.PointLight(0xEEEEEE, 1, 100);
light4.position.set( -1,-1,18 );
scene.add(light4);

// let meshL = new THREE.Mesh(geometryL, materialL);
// meshL.position.x = -1;
// meshL.position.y = -1;
// meshL.position.z = 11;
// scene.add(meshL);

document.body.appendChild(renderer.domElement);

function repo(e) {
  e.preventDefault();
  mouse.x = e.clientX / window.innerWidth * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  let intersects = raycaster.intersectObjects(scene.children, true);
  for (var i = 0; i < intersects.length; i++) {
    this.tl = new TimelineMax();
    this.tl.to(intersects[i].object.scale, 1, { x: 2, ease: Expo.easeOut });
    this.tl.to(intersects[i].object.scale, .5, { x: .5, ease: Expo.easeOut });
    this.tl.to(intersects[i].object.position, .5, { x: 2, ease: Expo.easeOut });
    this.tl.to(intersects[i].object.rotation, .5, { y: Math.PI * .5, ease: Expo.easeOut }, "=-1.5");
  }
}

window.addEventListener('click', repo);

let render = function () {
  // create a loop to redraw upon refresh; pauses when in other tabs
  requestAnimationFrame(render);
  renderer.render(scene, camera);
};

requestAnimationFrame(render);

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});