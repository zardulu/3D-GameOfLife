import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const gridSize = 3; 
const cubeSize = 1; 
const gap = 0; 

const cubesGroup = new THREE.Group();
createCubes();
scene.add(cubesGroup);

function createCubes() {
  cubesGroup.children.forEach((cube) => {
  cubesGroup.children = [];
  });

for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      for (let k = 0; k < gridSize; k++) {

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.LineBasicMaterial( {
	color: 0xffffff,})
const cube = new THREE.LineSegments( new THREE.EdgesGeometry(geometry), material ); 

const posX = (cubeSize + gap) * (i - gridSize / 2);
const posY = (cubeSize + gap) * (j - gridSize / 2);
const posZ = (cubeSize + gap) * (k - gridSize / 2);

cube.position.set(posX, posY, posZ);
cubesGroup.add(cube);

      }
    }
}
}



function onDocumentMouseScroll(event) {
  event.preventDefault();
  const zoomSpeed = 0.01;
  camera.position.z += event.deltaY * zoomSpeed;
  gap += camera.position.z*0.1;

  createCubes();
}

camera.position.z = 10;

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
    cubesGroup.rotation.y += 0.015;
}

document.addEventListener("wheel", onDocumentMouseScroll, false);

animate();


