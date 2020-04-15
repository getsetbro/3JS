import * as THREE from "../web_modules/three.js";
// import Stats from "/jsm/libs/stats.module.js";
import { STLLoader } from "../jsm/loaders/STLLoader.js";
import { OrbitControls } from "../../jsm/controls/OrbitControls.js";
var controls;
var container;
var camera, cameraTarget, scene, renderer;

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
function init() {
  container = document.createElement( "div" );
  document.body.appendChild( container );
  camera = new THREE.PerspectiveCamera( 99, window.innerWidth / window.innerHeight, 0.1, 5000 );
  // camera.position.z = 111;
  camera.position.set( 0, 222, 222 );
  cameraTarget = new THREE.Vector3( 0, 0, 0 );
  camera.lookAt( cameraTarget );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x777777 );
  // Ground
  // var plane = new THREE.Mesh(
  //   new THREE.PlaneBufferGeometry( 0, 0 ),
  //   new THREE.MeshPhongMaterial( { color: 0x999999 } )
  // );
  // // plane.rotation.x = - Math.PI / 2;
  // // plane.position.y = - 0.5;
  // scene.add( plane );
  // plane.receiveShadow = true;
  // ASCII file
  var loader = new STLLoader();
  loader.load( "../stl/villa.stl", function ( geometry ) {
    var material = new THREE.MeshPhongMaterial( { color: 0xAAAAAA, specular: 0x111111, shininess: 100 } );
    var mesh = new THREE.Mesh( geometry, material );
    // mesh.position.set( 15, 0, 0 );
    // mesh.rotation.set( - Math.PI / 2, 0, 0 );
    // mesh.scale.set( 0.5, 0.5, 0.5 );
    // mesh.castShadow = true;
    // mesh.receiveShadow = true;
    scene.add( mesh );
  } );
  // Binary files
  // var material = new THREE.MeshPhongMaterial( { color: 0xAAAAAA, specular: 0x111111, shininess: 200 } );
  // loader.load( "/stl/body.stl", function ( geometry ) {
  //   var mesh2 = new THREE.Mesh( geometry, material );
  //   mesh2.position.set( 0,0,0 );
  //   // mesh.rotation.set( - Math.PI / 2, 0, 0 );
  //   mesh2.scale.set( 0.05, 0.05, 0.05 );
  //   // mesh.castShadow = true;
  //   // mesh.receiveShadow = true;
  //   scene.add( mesh2 );
  // } );

  // Lights
  scene.add( new THREE.HemisphereLight( 0x7777ff, 0xffffff, 0.95 ) );

  var directionalLight1 = new THREE.DirectionalLight( 0xffffff, 0.8 );
  directionalLight1.position.set( 33,33,33 );
  scene.add( directionalLight1 );
  // var directionalLight2 = new THREE.DirectionalLight( 0xffffff, 1 );
  // directionalLight2.position.set( -99,-99,99 );
  // scene.add( directionalLight2 );

  // renderer
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  // renderer.outputEncoding = THREE.sRGBEncoding;
  // renderer.shadowMap.enabled = true;
  container.appendChild( renderer.domElement );

  window.addEventListener( "resize", onWindowResize, false );
  // createControls
  controls = new OrbitControls( camera, renderer.domElement );
  // controls.rotateSpeed = 1.0;
  // controls.zoomSpeed = 1.2;
  // controls.panSpeed = 0.8;
  // controls.keys = [ 65, 83, 68 ];
}
function render() {
  // var timer = Date.now() * 0.00015;
  // camera.position.x = Math.cos( timer ) * 2;
  // camera.position.z = Math.sin( timer ) * 2;
  // camera.lookAt( cameraTarget );
  renderer.render( scene, camera );
}
function animate() {
  requestAnimationFrame( animate );
  controls.update();

  render();
}

init();
animate();
