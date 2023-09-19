import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Create the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 100);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Responsive design adjustments
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

const gridSize = 3;
const cubeSize = 1;
let gap = 0;

const cubesGroup = new THREE.Group();

// Creates a group of cubes in (x, y, z) plane
function createCubes() {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      for (let k = 0; k < gridSize; k++) {
        const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
        const material = new THREE.MeshPhongMaterial({
          color: 0x031cfc,
          shininess: 50,
          side: THREE.DoubleSide
        });

        const cube = new THREE.Mesh(geometry, material);

        const posX = (cubeSize + gap) * (i - cubeSize);
        const posY = (cubeSize + gap) * (j - cubeSize);
        const posZ = (cubeSize + gap) * (k - cubeSize);

        cube.position.set(posX, posY, posZ);
        cube.castShadow = true;
        cubesGroup.add(cube);
      }
    }
  }

  scene.add(cubesGroup);
}

createCubes();

camera.position.set(5, 10, 15);
camera.lookAt(0, 1, 0);

// Lighting
scene.add(new THREE.AmbientLight(0xcccccc));

const spotLight = new THREE.SpotLight(0xffffff, 45);
spotLight.angle = Math.PI / 6;
spotLight.penumbra = 0.8;
spotLight.position.set(5, 10, 0);
spotLight.castShadow = true;
spotLight.shadow.camera.near = 0.5;
spotLight.shadow.camera.far = 20;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
scene.add(spotLight);

// Ground
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(25, 20, 1, 1),
  new THREE.MeshPhongMaterial({ color: 0xa0adaf, shininess: 200 })
);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -4;
ground.receiveShadow = true;
scene.add(ground);

// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1, 0);
controls.update();

// Zoom and cube separation
function onDocumentMouseScroll(event) {
  event.preventDefault();
  const zoomSpeed = 0.01;
  camera.position.z += event.deltaY * zoomSpeed;

  if (camera.position.z <= 15) {
    gap -= event.deltaY * zoomSpeed * 0.25;
    gap = Math.max(gap, 0);
  } else {
    gap = 0;
  }

  cubesGroup.clear();
  createCubes();
}

// Render
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  cubesGroup.rotation.y += 0.015;
}

// Event listeners
document.addEventListener('wheel', onDocumentMouseScroll, false);

// Initial call to resize the canvas
onWindowResize();

// Start the animation loop
animate();
