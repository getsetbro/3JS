import * as THREE from "../web_modules/three.js";
import { OrbitControls } from "../jsm/controls/OrbitControls.js";
// import { DragControls } from "../jsm/controls/DragControls.js";

// Set the scene size.
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

// Create a WebGL renderer, camera
// and a scene
const renderer = new THREE.WebGLRenderer();
// renderer.setPixelRatio( window.devicePixelRatio );

const camera = new THREE.PerspectiveCamera( 55, WIDTH / HEIGHT, 1, 1000 );

const scene = new THREE.Scene();

// Add the camera to the scene.
scene.add( camera );

// Start the renderer.
renderer.setSize( WIDTH, HEIGHT );

let light = new THREE.PointLight( 0xffffff, 1, 1000 );
light.position.set( 0, 0, 0 ); // x y z
scene.add( light );

// Set up the sphere vars
const RADIUS = 0.4;
const SEGMENTS = 16;
const RINGS = 16;

var geometry = new THREE.SphereGeometry( RADIUS, SEGMENTS, RINGS );
// create the sphere's material
const sphereMaterial = new THREE.MeshLambertMaterial( { color: 0xcc00cc } );
let objects = [];
var i = 55;
while ( i-- ) {
  // Create a new mesh with
  // sphere geometry - we will cover
  // the sphereMaterial next!

  const sphere = new THREE.Mesh( geometry, sphereMaterial );
  // Move the Sphere back in Z
  // sphere.position.z = -300;
  sphere.position.x = Math.random() * 10 - 5;
  sphere.position.y = Math.random() * 10 - 5;
  sphere.position.z = Math.random() * 10 - 5;
  // Finally, add the sphere to the scene.
  scene.add( sphere );
  objects.push( sphere );
}

// Attach the renderer-supplied
// DOM element.
document.body.appendChild( renderer.domElement );

var controls = new OrbitControls( camera, renderer.domElement );
// controls.addEventListener( "change", render );

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 0, 0, 10 );
controls.update();

function animate() {
  requestAnimationFrame( animate );
  // required if controls.enableDamping or controls.autoRotate are set to true
  // controls.update();
  renderer.render( scene, camera );
}

// Schedule the first frame.
requestAnimationFrame( animate );

window.addEventListener( "resize", () => {
  renderer.setSize( window.innerWidth, window.innerHeight );
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
} );


// var controls2 = new DragControls( objects, camera, renderer.domElement );

// // add event listener to highlight dragged objects

// controls2.addEventListener( "dragstart", function ( event ) {

//   event.object.material.emissive.set( 0xaaaaaa );

// } );

// controls2.addEventListener( "dragend", function ( event ) {

//   event.object.material.emissive.set( 0x000000 );

// } );
