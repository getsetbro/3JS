import * as THREE from "../web_modules/three.js";

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

var camera = new THREE.PerspectiveCamera( 99, window.innerWidth / window.innerHeight, 1, 999 );
camera.position.set( 0, 0, 100 );
// camera.lookAt( 0, 0, 0 );
var scene = new THREE.Scene();

var points = [
  new THREE.Vector3( - 55, 0, 0 ),
  new THREE.Vector3( 0, 55, 0 ),
  new THREE.Vector3( 55, 0, 0 )
];
var geometry = new THREE.BufferGeometry().setFromPoints( points );
var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
var line = new THREE.Line( geometry, material );

scene.add( line );

document.body.appendChild( renderer.domElement );


renderer.render( scene, camera );
