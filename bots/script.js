import * as THREE from "../build/three.module.js";
import { OrbitControls } from "../jsm/controls/OrbitControls.js";
import { GLTFLoader } from "../jsm/loaders/GLTFLoader.js";

// import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/build/three.module.js';
// import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/controls/OrbitControls.js';
// import {GLTFLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/GLTFLoader.js';

function main() {
  const canvas = document.querySelector( "#c" );
  const renderer = new THREE.WebGLRenderer( { canvas } );

  const fov = 45;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
  camera.position.set( 99, 444, -99 );

  const controls = new OrbitControls( camera, canvas );
  controls.target.set( 0, 5, 0 );
  controls.update();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color( "pink" );

  {
    const planeSize = 444;

    const loader = new THREE.TextureLoader();
    const texture = loader.load( "https://threejsfundamentals.org/threejs/resources/images/checker.png" );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    const repeats = planeSize / 2;
    texture.repeat.set( repeats, repeats );

    const planeGeo = new THREE.PlaneBufferGeometry( planeSize, planeSize );
    const planeMat = new THREE.MeshPhongMaterial( {
      map: texture,
      side: THREE.DoubleSide
    } );
    const mesh = new THREE.Mesh( planeGeo, planeMat );
    mesh.rotation.x = Math.PI * -.5;
    scene.add( mesh );
  }

  {
    const skyColor = 0xB1E1FF;  // light blue
    const groundColor = 0xB97A20;  // brownish orange
    const intensity = 1;
    const light = new THREE.HemisphereLight( skyColor, groundColor, intensity );
    scene.add( light );
  }

  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight( color, intensity );
    light.position.set( 5, 10, 222 );
    scene.add( light );
    scene.add( light.target );
  }

  function frameArea( sizeToFitOnScreen, boxSize, boxCenter, camera ) {
    const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
    const halfFovY = THREE.MathUtils.degToRad( camera.fov * .5 );
    const distance = halfSizeToFitOnScreen / Math.tan( halfFovY );
    // compute a unit vector that points in the direction the camera is now
    // in the xz plane from the center of the box
    const direction = ( new THREE.Vector3() )
      .subVectors( camera.position, boxCenter )
      .multiply( new THREE.Vector3( 1, 0, 1 ) )
      .normalize();

    // move the camera to a position distance units way from the center
    // in whatever direction the camera was from the center already
    camera.position.copy( direction.multiplyScalar( distance ).add( boxCenter ) );

    // pick some near and far values for the frustum that
    // will contain the box.
    camera.near = boxSize / 100;
    camera.far = boxSize * 100;

    camera.updateProjectionMatrix();

    // point the camera to look at the center of the box
    camera.lookAt( boxCenter.x, boxCenter.y, boxCenter.z );
  }

  {
    // const gltfLoader = new GLTFLoader();
    // gltfLoader.load( "https://threejsfundamentals.org/threejs/resources/models/cartoon_lowpoly_small_city_free_pack/scene.gltf", ( gltf ) => {
    //   const root = gltf.scene;
    //   scene.add( root );

    //   // compute the box that contains all the stuff
    //   // from root and below
    //   const box = new THREE.Box3().setFromObject( root );

    //   const boxSize = box.getSize( new THREE.Vector3() ).length();
    //   const boxCenter = box.getCenter( new THREE.Vector3() );

    //   // set the camera to frame the box
    //   frameArea( boxSize * 0.5, boxSize, boxCenter, camera );

    //   // update the Trackball controls to handle the new size
    //   controls.maxDistance = boxSize * 10;
    //   controls.target.copy( boxCenter );
    //   controls.update();
    // } );


    // var loader = new GLTFLoader();
    // loader.load( "./monsoon/scene.gltf", function ( gltf ) {
    //   const root = gltf.scene;

    //   root.position.set( -99,0,-99 );
    //   // root.rotation.set( - Math.PI / 2, Math.PI / 2, 0 );
    //   // root.scale.set( 0.1, 0.1, 0.1 );
    //   // root.castShadow = true;
    //   // root.receiveShadow = true;
    //   scene.add( root );
    // }, undefined, function ( error ) {console.error( error );} );

    var loader2 = new GLTFLoader();
    loader2.load( "./end_game/scene.gltf", function ( gltf ) {
      const root = gltf.scene;
      root.position.set( -2,0,-2 );
      // root.scale.set( 0.1, 0.1, 0.1 );

      scene.add( root );

      // compute the box that contains all the stuff
      // from root and below
      const box = new THREE.Box3().setFromObject( root );

      const boxSize = box.getSize( new THREE.Vector3() ).length();
      const boxCenter = box.getCenter( new THREE.Vector3() );

      // set the camera to frame the box
      frameArea( boxSize * 0.95, boxSize, boxCenter, camera );

      // update the Trackball controls to handle the new size
      controls.maxDistance = boxSize * 10;
      controls.target.copy( boxCenter );
      controls.update();
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