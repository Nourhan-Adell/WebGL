import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "dat.gui";

//Create a scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // Sky Blue color

//Use the perspective projection to mimic the way that human eye sees
const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = 30;
camera.position.y = 20;
camera.position.z = 40;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); // appending to HTML elements, and domElement: is a property which is the HTML canvas

// Function to create a floor
const floor1Geometry = new THREE.BoxGeometry(10, 10, 20);
const floor1Material = new THREE.MeshBasicMaterial({ color: 0xdc9662 });
const floor1 = new THREE.Mesh(floor1Geometry, floor1Material);
floor1.position.set(0, 0, 0);

const floor2Geometry = new THREE.BoxGeometry(10, 10, 20);
const floor2Material = new THREE.MeshBasicMaterial({ color: 0xffffcc });
const floor2 = new THREE.Mesh(floor2Geometry, floor2Material);
floor2.position.set(0, 10, 0);

const floor3Geometry = new THREE.BoxGeometry(10, 10, 20);
const floor3Material = new THREE.MeshBasicMaterial({ color: 0xffcc99 });
const floor3 = new THREE.Mesh(floor3Geometry, floor3Material);
floor3.position.set(0, 2 * 10, 0);

const groundGeometry = new THREE.BoxGeometry(10, 5, 20);
const groundMaterial = new THREE.MeshBasicMaterial({ color: 0xffcc99 });
const ground = new THREE.Mesh(floor3Geometry, floor3Material);
ground.position.set(0, -10, 0);

scene.add(floor1, floor2, floor3, ground);

// Function to create a window
function createWindow(windowImage: string) {
  const windowGeometry = new THREE.BoxGeometry(3, 3, 1);
  const texture = new THREE.TextureLoader().load(windowImage);
  const windowMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
  const windowMesh = new THREE.Mesh(windowGeometry, windowMaterial);
  return windowMesh;
}
for (let i = 0; i < 3; i++) {
  const window1 = createWindow("img/window.png");
  window1.position.set(5, i * 10, -5); // Adjust the window position as needed
  // window1.add(new THREE.AxesHelper(20));
  window1.rotation.y = Math.PI / 2;
  scene.add(window1);
}
for (let i = 0; i < 3; i++) {
  const window1 = createWindow("img/window.png");
  window1.position.set(5, i * 10, 5); // Adjust the window position as needed
  // window1.add(new THREE.AxesHelper(20));
  window1.rotation.y = Math.PI / 2;
  scene.add(window1);
}

for (let i = 0; i < 3; i++) {
  const window1 = createWindow("img/window.png");
  window1.position.set(-5, i * 10, -5); // Adjust the window position as needed
  // window1.add(new THREE.AxesHelper(20));
  window1.rotation.y = Math.PI / 2;
  scene.add(window1);
}
for (let i = 0; i < 3; i++) {
  const window1 = createWindow("img/window.png");
  window1.position.set(-5, i * 10, 5); // Adjust the window position as needed
  // window1.add(new THREE.AxesHelper(20));
  window1.rotation.y = Math.PI / 2;
  scene.add(window1);
}

//Create door
const doorGeometry = new THREE.BoxGeometry(10, 10, 1);
const doorTexture = new THREE.TextureLoader().load("img/Door3.jpg");
const doorMaterial = new THREE.MeshBasicMaterial({ map: doorTexture, side: THREE.DoubleSide });
const door = new THREE.Mesh(doorGeometry, doorMaterial);
// door.add(new THREE.AxesHelper(20));
door.position.set(-5, -10, 0);
door.rotation.y = Math.PI / 2;
scene.add(door);

// Function to create a simple side stairs
// function createStairs(width: number, height: number, depth: number, steps: number) {
//   const stairs = new THREE.Group();

//   for (let i = 0; i < steps; i++) {
//     const stepGeometry = new THREE.BoxGeometry(width, height, depth);
//     const stepMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
//     const step = new THREE.Mesh(stepGeometry, stepMaterial);
//     step.position.set(-9, i * height, i * depth);
//     stairs.add(step);
//   }

//   return stairs;
// }

// // Create Z-shaped stairs for 3 floors
// const stairs1 = createStairs(5, 1, 1, 11); // Orange color
// stairs1.position.set(2, -5, -5);

// const stairs2 = createStairs(5, 1, 1, 10); // Orange color
// stairs2.rotation.x = Math.PI / 2; // Rotate the second set of stairs
// stairs2.position.set(2, 15, -5); // Move the second set of stairs
// // stairs2.add(new THREE.AxesHelper(20));
// scene.add(stairs1, stairs2);

// // Define the geometry
// const stairsGeometry = new THREE.BoxGeometry(5, 30, 20);

// const texture = new THREE.TextureLoader().load("img/test.jpeg");
// const frontSide = new THREE.MeshBasicMaterial({ map: texture }); // Use the texture for the front side
// const color = new THREE.MeshBasicMaterial({ color: 0xf3f2ea });
// // Apply different materials to each side
// const materials = [
//   color, // Right side
//   frontSide, // Left side
//   color, // Top side
//   color, // Bottom side
//   color, // Front side
//   color, // Back side
// ];

// const stairs = new THREE.Mesh(stairsGeometry, materials);
// stairs.position.set(-7, 10, 0);
// scene.add(stairs);

//Allow 3D object control
new OrbitControls(camera, renderer.domElement);

// Define a function to render the scene to the HTML canvas
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

//adds the stats box on the tob left of the page
const stats = new Stats();
document.body.appendChild(stats.dom);

// Adds the controlling box on the right hand of the page
const gui = new GUI();
const Building = gui.addFolder("Building");
const mainBuilding = Building.addFolder("Rotation");
mainBuilding.add(scene.rotation, "y", 0, Math.PI * 2, 0.01);

// Change floors color
const data = {
  floor1Color: floor1Material.color.getHex(),
  floor2color: floor1Material.color.getHex(),
  floor3color: floor1Material.color.getHex(),
};

const meshBasicMaterialFolder = gui.addFolder("floors coloring");
meshBasicMaterialFolder.addColor(data, "floor1Color").onChange(() => {
  floor1Material.color.setHex(Number(data.floor1Color.toString().replace("#", "0x")));
});
meshBasicMaterialFolder.addColor(data, "floor2color").onChange(() => {
  floor2Material.color.setHex(Number(data.floor2color.toString().replace("#", "0x")));
});
meshBasicMaterialFolder.addColor(data, "floor3color").onChange(() => {
  floor3Material.color.setHex(Number(data.floor3color.toString().replace("#", "0x")));
});

function animate() {
  requestAnimationFrame(animate);
  // Render the scene
  renderer.render(scene, camera);
  // render();

  stats.update();
}

function render() {
  renderer.render(scene, camera);
}

animate();
