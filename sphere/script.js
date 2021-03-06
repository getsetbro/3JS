import * as THREE from "../web_modules/three.js";

// Set the scene size.
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

// Set some camera attributes.
const VIEW_ANGLE = 45;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.1;
const FAR = 10000;

// Create a WebGL renderer, camera
// and a scene
const renderer = new THREE.WebGLRenderer();
const camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR );

const scene = new THREE.Scene();

// Add the camera to the scene.
scene.add( camera );

// Start the renderer.
renderer.setSize( WIDTH, HEIGHT );

// create a point light
const pointLight = new THREE.PointLight( 0xffffff );

// set its position
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;

// add to the scene
scene.add( pointLight );

// create the sphere's material
const sphereMaterial = new THREE.MeshLambertMaterial( { color: 0xcc0000 } );

// Set up the sphere vars
const RADIUS = 50;
const SEGMENTS = 16;
const RINGS = 16;

// Create a new mesh with
// sphere geometry - we will cover
// the sphereMaterial next!
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry( RADIUS, SEGMENTS, RINGS ),
  sphereMaterial
);

// Move the Sphere back in Z so we
// can see it.
sphere.position.z = -300;

// Finally, add the sphere to the scene.
scene.add( sphere );

document.body.appendChild( renderer.domElement );

function update() {
  // Draw!
  renderer.render( scene, camera );
  // Schedule the next frame.
  requestAnimationFrame( update );
}

// Schedule the first frame.
requestAnimationFrame( update );

window.addEventListener( "resize", () => {
  renderer.setSize( window.innerWidth, window.innerHeight );
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
} );
