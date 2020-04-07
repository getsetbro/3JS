import * as THREE from "../web_modules/three.js";
import { TimelineMax, Expo } from "../web_modules/gsap.js";

let scene = new THREE.Scene();
let wInnerWidth = window.innerWidth;
let wInnerHeight = window.innerHeight;
// PerspectiveCamera ost closely mimics human eye
let camera = new THREE.PerspectiveCamera(
  50,
  wInnerWidth / wInnerHeight,
  0.1,
  1000
);
camera.position.z = 15;
// RENDERERS: WEBGL, CSS2D, CSS3D, SVG
let renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setClearColor( "#ddd" );
renderer.setSize( wInnerWidth, wInnerHeight );
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let geometry = new THREE.BoxGeometry( 1, 1, 1 );
let material = new THREE.MeshLambertMaterial( { color: 0xf7f7f7 } );
//let mesh = new THREE.Mesh(geometry, material);
//scene.add(mesh);
var i = 22;
while ( i-- ) {
  let mesh = new THREE.Mesh( geometry, material );
  mesh.position.x = ( Math.random() - 0.5 ) * 10;
  mesh.position.y = ( Math.random() - 0.5 ) * 10;
  mesh.position.z = ( Math.random() - 0.5 ) * 10;
  scene.add( mesh );
}

let light3 = new THREE.PointLight( "red", 1, 100 );
light3.position.set( 1, 1, 8 );
scene.add( light3 );

let light4 = new THREE.PointLight( 0xeeeeee, 1, 100 );
light4.position.set( -1, -1, 18 );
scene.add( light4 );

document.body.appendChild( renderer.domElement );

function repo( e ) {
  e.preventDefault();
  mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = -( e.clientY / window.innerHeight ) * 2 + 1;
  raycaster.setFromCamera( mouse, camera );
  let intersects = raycaster.intersectObjects( scene.children, true );
  for ( var i = 0; i < intersects.length; i++ ) {
    this.tl = new TimelineMax();
    this.tl.to( intersects[i].object.scale, 1, { x: 2, ease: Expo.easeOut } );
    this.tl.to( intersects[i].object.scale, 0.5, { x: 0.5, ease: Expo.easeOut } );
    this.tl.to( intersects[i].object.position, 0.5, {
      x: 2,
      ease: Expo.easeOut
    } );
    this.tl.to(
      intersects[i].object.rotation,
      0.5,
      { y: Math.PI * 0.5, ease: Expo.easeOut },
      "=-1.5"
    );
  }
}

window.addEventListener( "click", repo );

let render = function () {
  // create a loop to redraw upon refresh; pauses when in other tabs
  requestAnimationFrame( render );
  renderer.render( scene, camera );
};

requestAnimationFrame( render );

window.addEventListener( "resize", () => {
  renderer.setSize( window.innerWidth, window.innerHeight );
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
} );
