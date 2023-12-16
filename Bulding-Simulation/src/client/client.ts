import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "dat.gui";

//Create a scene
const scene = new THREE.Scene();

//Use the perspective projection to mimic the way that human eye sees
const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = -10;
camera.position.y = 11;
camera.position.z = 30;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); // appending to HTML elements, and domElement: is a property which is the HTML canvas

// Define the geometry of the building
const buildingGeometry = new THREE.BoxGeometry(15, 30, 20);
const doorGeometry = new THREE.BoxGeometry(2, 4, 2);

// Define the materials for the building elements
const wallMaterial = new THREE.MeshBasicMaterial({ color: 0x5088 });
const doorMaterial = new THREE.MeshBasicMaterial({ color: 0x3c81ac });

// Create a 3D scene and add the building elements to it
const building = new THREE.Mesh(buildingGeometry, wallMaterial);
building.position.set(3, 0, 0);
scene.add(building);
// building.add(new THREE.AxesHelper(20));

const door = new THREE.Mesh(doorGeometry, doorMaterial);
door.position.set(-2, -13, 11);
building.add(door);
// door.add(new THREE.AxesHelper(50));

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
const options = {
  side: {
    FrontSide: THREE.FrontSide,
    BackSide: THREE.BackSide,
    DoubleSide: THREE.DoubleSide,
  },
  combine: {
    MultiplyOperation: THREE.MultiplyOperation,
    MixOperation: THREE.MixOperation,
    AddOperation: THREE.AddOperation,
  },
};

const gui = new GUI();
const Building = gui.addFolder("Cube");
const mainBuilding = Building.addFolder("Rotation");
mainBuilding.add(building.rotation, "y", 0, Math.PI * 2, 0.01);

const data = {
  color: wallMaterial.color.getHex(),
};
const texture = new THREE.TextureLoader().load("images/wall.jpg");
wallMaterial.map = texture;

const texture2 = new THREE.TextureLoader().load("images/door2.jpg");
doorMaterial.map = texture2;
// const envTexture = new THREE.CubeTextureLoader().load([
//   "images/door2.jpg",
//   "images/wall.jpg",
//   "images/wall.jpg",
//   "images/wall.jpg",
//   "images/wall.jpg",
//   "img/nz_50.png",
// ]);
// envTexture.mapping = THREE.CubeReflectionMapping;
// // // envTexture.mapping = THREE.CubeRefractionMapping
// doorMaterial.envMap = envTexture;

const meshBasicMaterialFolder = gui.addFolder("THREE.MeshBasicMaterial");
meshBasicMaterialFolder.addColor(data, "color").onChange(() => {
  wallMaterial.color.setHex(Number(data.color.toString().replace("#", "0x")));
});
meshBasicMaterialFolder.addColor(data, "color").onChange(() => {
  doorMaterial.color.setHex(Number(data.color.toString().replace("#", "0x")));
});
// meshBasicMaterialFolder.add(wallMaterial, "reflectivity", 0, 1);
function animate() {
  requestAnimationFrame(animate);
  // Render the scene
  renderer.render(scene, camera);
  // render();

  //debug.innerText = 'Matrix\n' + cube.matrix.elements.toString().replace(/,/g, '\n')

  stats.update();
}

function render() {
  renderer.render(scene, camera);
}

animate();
