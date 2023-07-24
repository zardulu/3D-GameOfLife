import * as THREE from 'three';

export function createCubes(scene, gridSize, cubeSize, gap) {
  const cubesGroup = new THREE.Group();

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
