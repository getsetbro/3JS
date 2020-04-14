
import * as THREE from "../build/three.module.js";
// import Stats from "./jsm/libs/stats.module.js";
// import { FirstPersonControls } from "../jsm/controls/FirstPersonControls.js";
import { GLTFLoader } from "../jsm/loaders/GLTFLoader.js";
// import { ShadowMapViewer } from "../jsm/utils/ShadowMapViewer.js";
var SHADOW_MAP_WIDTH = 2048;
var SHADOW_MAP_HEIGHT = 1024;
var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
var FLOOR = - 250;
var camera;
var scene;
var renderer;
var NEAR = 10;
var FAR = 3000;
var mixer;
var morphs = [];
var light;
// var lightShadowMapViewer;
var clock = new THREE.Clock();
// var showHUD = false;
init();
animate();

function init() {
  // CAMERA
  camera = new THREE.PerspectiveCamera( 77, SCREEN_WIDTH / SCREEN_HEIGHT, NEAR, FAR );
  camera.position.set( 10, 10, 1200 );
  // SCENE
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x555555 );
  // scene.fog = new THREE.Fog( 0x59472b, 1000, FAR );
  // LIGHTS
  var ambient = new THREE.AmbientLight( 0x999999 );
  scene.add( ambient );
  light = new THREE.SpotLight( 0xffffff, 1, 0, Math.PI / 5, 0.3 );
  light.position.set( 0, 1500, 1000 );
  light.target.position.set( 0, 0, 0 );
  light.castShadow = true;
  light.shadow.camera.near = 1200;
  light.shadow.camera.far = 2500;
  light.shadow.bias = 0.0001;
  light.shadow.mapSize.width = SHADOW_MAP_WIDTH;
  light.shadow.mapSize.height = SHADOW_MAP_HEIGHT;
  scene.add( light );
  // createHUD();
  createScene();
  // RENDERER
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
  document.body.appendChild( renderer.domElement );
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.autoClear = false;
  //
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  // CONTROLS
  // controls = new FirstPersonControls( camera, renderer.domElement );
  // controls.lookSpeed = 0.0125;
  // controls.movementSpeed = 500;
  // controls.noFly = false;
  // controls.lookVertical = true;
  // controls.lookAt( scene.position );
  // STATS
  // stats = new Stats();
  //container.appendChild( stats.dom );
  //
  window.addEventListener( "resize", onWindowResize, false );
  // window.addEventListener( "keydown", onKeyDown, false );
}
function onWindowResize() {
  SCREEN_WIDTH = window.innerWidth;
  SCREEN_HEIGHT = window.innerHeight;
  camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
  camera.updateProjectionMatrix();
  renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
  // controls.handleResize();
}
// function onKeyDown( event ) {
//   switch ( event.keyCode ) {
//   case 84:	/*t*/
//     showHUD = ! showHUD;
//     break;
//   }
// }
// function createHUD() {
//   lightShadowMapViewer = new ShadowMapViewer( light );
//   lightShadowMapViewer.position.x = 10;
//   lightShadowMapViewer.position.y = SCREEN_HEIGHT - ( SHADOW_MAP_HEIGHT / 4 ) - 10;
//   lightShadowMapViewer.size.width = SHADOW_MAP_WIDTH / 4;
//   lightShadowMapViewer.size.height = SHADOW_MAP_HEIGHT / 4;
//   lightShadowMapViewer.update();
// }
function createScene( ) {
  // GROUND
  var geometry = new THREE.PlaneBufferGeometry( 100, 100 );
  var planeMaterial = new THREE.MeshPhongMaterial( { color: "darkgreen" } );
  var ground = new THREE.Mesh( geometry, planeMaterial );
  ground.position.set( 0, FLOOR, 0 );
  ground.rotation.x = - Math.PI / 2;
  ground.scale.set( 100, 100, 100 );
  ground.castShadow = false;
  ground.receiveShadow = true;
  scene.add( ground );

  mixer = new THREE.AnimationMixer( scene );

  var loader = new GLTFLoader();
  loader.load( "../glb/Horse.glb", function ( gltf ) {

    addMorph( gltf, -1300, 100 );
    addMorph( gltf, -1400, 200 );
    addMorph( gltf, -1500, 300 );
  } );

}

function addMorph( gltf, x, z ) {
  var mesh = gltf.scene.children[ 0 ];
  var clip = gltf.animations[ 0 ];
  mesh = mesh.clone();
  mesh.material = mesh.material.clone();

  mesh.speed = 550;
  mixer.clipAction( clip, mesh ).
    setDuration( 1 ).
  // to shift the playback out of phase:
    // startAt( - duration * Math.random() ).
    play();
  mesh.position.set( x, FLOOR, z );
  mesh.rotation.y = Math.PI / 2;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add( mesh );
  morphs.push( mesh );
}

function animate() {
  requestAnimationFrame( animate );
  render();
  // stats.update();
}
function render() {
  var delta = clock.getDelta();
  mixer.update( delta );
  for ( var i = 0; i < morphs.length; i ++ ) {
    var morph = morphs[ i ];
    morph.position.x += morph.speed * delta;
    if ( morph.position.x > 2000 ) {
      morph.position.x = -1222;
    }
  }
  // controls.update( delta );
  renderer.clear();
  renderer.render( scene, camera );
  // Render debug HUD with shadow map
  // if ( showHUD ) {
  //   lightShadowMapViewer.render( renderer );
  // }
}
