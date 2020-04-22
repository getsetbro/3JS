import * as THREE from "../build/three.module.js";
import { OrbitControls } from "../jsm/controls/OrbitControls.js";
import { GLTFLoader } from "../jsm/loaders/GLTFLoader.js";

// import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/build/three.module.js';
// import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/controls/OrbitControls.js';
// import {GLTFLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/GLTFLoader.js';

function main() {
  const canvas = document.querySelector( "#c" );
  const renderer = new THREE.WebGLRenderer( { canvas } );
  const camera = new THREE.PerspectiveCamera( 55, 2, 0.1, 1000 );
  camera.position.set( 155, 222, 222 );

  const controls = new OrbitControls( camera, canvas );
  // controls.target.set( 0, 5, 0 );
  controls.update();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color( "gray" );

  {
    const planeGeo = new THREE.PlaneBufferGeometry( 555, 555 );
    const planeMat = new THREE.MeshPhongMaterial( { color:0x999999,side: THREE.DoubleSide } );
    const plane = new THREE.Mesh( planeGeo, planeMat );
    plane.rotation.x = Math.PI * 0.5;
    scene.add( plane );
  }

  {
    const skyColor = 0xB1E1FF;  // light blue
    const groundColor = 0xB97A20;  // brownish orange
    const light = new THREE.HemisphereLight( skyColor, groundColor, 1 );
    scene.add( light );
  }

  {
    const light = new THREE.DirectionalLight( 0xFFFFFF, 1 );
    light.position.set( -111,111,-111 );
    scene.add( light );
    scene.add( light.target );
  }

  {

    var loader = new GLTFLoader();
    loader.load( "./monsoon/scene.gltf", function ( gltf ) {
      const root1 = gltf.scene;

      root1.position.set( 0,0,-99 );
      // root1.rotation.set( 0, Math.PI / 2, 0 );
      // root.scale.set( 0.1, 0.1, 0.1 );
      root1.castShadow = true;
      scene.add( root1 );
    }, undefined, function ( error ) {console.error( error );} );

    var loader2 = new GLTFLoader();
    loader2.load( "./end_game/scene.gltf", function ( gltf ) {
      const root = gltf.scene;
      root.position.set( 0,0,99 );
      root.rotation.set( 0, Math.PI , 0 );
      root.castShadow = true;
      scene.add( root );
    } );
  }

  function resizeRendererToDisplaySize( renderer ) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if ( needResize ) {
      renderer.setSize( width, height, false );
    }
    return needResize;
  }

  function render() {
    if ( resizeRendererToDisplaySize( renderer ) ) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    renderer.render( scene, camera );
    requestAnimationFrame( render );
  }
  requestAnimationFrame( render );
}

main();
