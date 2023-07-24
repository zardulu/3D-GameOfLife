import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const gridSize = 3;
const cubeSize = 1;
let gap = 0;

const cubesGroup = new THREE.Group();

// Creates a group of cubes in (x,y,z) plane
function createCubes() {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      for (let k = 0; k < gridSize; k++) {
        const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
        const material = new THREE.MeshNormalMaterial({ color: 0x049ef4 });
        const cube = new THREE.Mesh(geometry, material);

        const posX = (cubeSize + gap) * (i - gridSize / 2);
        const posY = (cubeSize + gap) * (j - gridSize / 2);
        const posZ = (cubeSize + gap) * (k - gridSize / 2);

        cube.position.set(posX, posY, posZ);
        cubesGroup.add(cube);
      }
    }
  }

  scene.add(cubesGroup);
}

createCubes();

camera.position.z = 10;


let mouseDown = false,
mouseX = 0,
mouseY = 0,
lastMouseX = 0,
lastMouseY = 0;

// Return mouse coordinates when inital mouseDown
function onDocumentMouseDown(event) {
mouseDown = true;
lastMouseX = event.clientX;
lastMouseY = event.clientY;
}

function onDocumentMouseUp(event) {
mouseDown = false;
}

// Return mouse coordinates when mouseDown and move
function onDocumentMouseMove(event) {
if (!mouseDown) return;
mouseX = event.clientX;
mouseY = event.clientY;


// Rotate the cube based on mouse drag
const deltaX = mouseX - lastMouseX;
const deltaY = mouseY - lastMouseY

if (mouseDown) {
    cubesGroup.rotation.x += deltaY * 0.01;
    cubesGroup.rotation.y += deltaX * 0.01;
  }

  lastMouseX = mouseX;
  lastMouseY = mouseY;
}

// Zoom and cube separation
function onDocumentMouseScroll(event) {
  event.preventDefault();
  const zoomSpeed = 0.01;
  camera.position.z += event.deltaY * zoomSpeed;

  if (camera.position.z <= 10) {
    gap -= event.deltaY * zoomSpeed * 0.1;
    gap = Math.max(gap, 0);
  }else{ gap = 0;}
    
    cubesGroup.clear();
    createCubes();
  }


// Render
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  cubesGroup.rotation.y += 0.015;

  
    
}

//Event listeners
document.addEventListener("wheel", onDocumentMouseScroll, false);
document.addEventListener("mousedown", onDocumentMouseDown, false);
document.addEventListener("mouseup", onDocumentMouseUp, false);
document.addEventListener("mousemove", onDocumentMouseMove, false);




animate();

