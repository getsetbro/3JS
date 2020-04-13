
import * as THREE from "../../build/three.module.js";
import { TrackballControls } from "../../jsm/controls/TrackballControls.js";
var perspectiveCamera, controls, scene, renderer;

( function init() {

  perspectiveCamera = new THREE.PerspectiveCamera( 77, window.innerWidth / window.innerHeight, 0.1, 1000 );
  perspectiveCamera.position.z = 500;

  // world
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xcccccc );
  scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

  // lights
  var light = new THREE.DirectionalLight( 0xffffff );
  light.position.set( 1, 1, 1 );
  scene.add( light );
  var light2 = new THREE.DirectionalLight( 0x002288 );
  light.position.set( - 1, - 1, - 1 );
  scene.add( light2 );
  var light3 = new THREE.AmbientLight( 0x222222 );
  scene.add( light3 );

  var geometry = new THREE.CylinderBufferGeometry( 0, 10, 50, 3, 1 );
  var material = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } );
  var i = 444;
  while ( i-- ) {
    var mesh = new THREE.Mesh( geometry, material );
    mesh.position.x = ( Math.random() - 0.5 ) * 1000;
    mesh.position.y = ( Math.random() - 0.5 ) * 1000;
    mesh.position.z = ( Math.random() - 0.5 ) * 1000;
    mesh.updateMatrix();
    mesh.matrixAutoUpdate = false;
    scene.add( mesh );
  }

  // renderer
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );

  document.body.appendChild( renderer.domElement );

  window.addEventListener( "resize", onWindowResize, false );
  // createControls
  controls = new TrackballControls( perspectiveCamera, renderer.domElement );
  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 1.2;
  controls.panSpeed = 0.8;
  controls.keys = [ 65, 83, 68 ];
} )();

function onWindowResize() {
  perspectiveCamera.aspect = window.innerWidth / window.innerHeight;
  perspectiveCamera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
  controls.handleResize();
}
function render() {
  var camera = perspectiveCamera;
  renderer.render( scene, camera );
}
function animate() {
  requestAnimationFrame( animate );
  controls.update();
  render();
}
animate();
