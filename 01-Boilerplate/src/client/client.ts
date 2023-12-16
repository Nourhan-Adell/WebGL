import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "dat.gui";

const scene = new THREE.Scene();
// scene.background = new THREE.Color(0x448800);
scene.add(new THREE.AxesHelper(5));

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 2;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); // appending to HTML elements, and domElement: is a property which is the HTML canvas

const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener("change", render);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// This function work when reloading or make any event on the page
window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

const stats = new Stats();
document.body.appendChild(stats.dom); //adds the stats box on the tob left of the page

const gui = new GUI();
const cubeFolder = gui.addFolder("Cube");
const cubeRotation = cubeFolder.addFolder("Rotation");
cubeRotation.add(cube.rotation, "x", 0, Math.PI * 2);
cubeRotation.add(cube.rotation, "y", 0, Math.PI * 2);
cubeRotation.add(cube.rotation, "z", 0, Math.PI * 2);
// cubeFolder.open();
const cameraFolder = gui.addFolder("Camera");
cameraFolder.add(camera.position, "z", 0, 10);
// cameraFolder.open();

const cubePosition = cubeFolder.addFolder("Position");
cubePosition.add(cube.position, "x", -10, 10, 2);
cubePosition.add(cube.position, "y", -10, 10, 2);
cubePosition.add(cube.position, "z", -10, 10, 2);

const cubeScale = cubeFolder.addFolder("Scale");
cubeScale.add(cube.scale, "x", -5, 5);
cubeScale.add(cube.scale, "y", -5, 5);
cubeScale.add(cube.scale, "z", -5, 5);

gui.add(cube, "visible");
function animate() {
  requestAnimationFrame(animate); // keeps looping over the time and don't stop

  //   //   cube.rotation.x += 0.01;
  //   //   cube.rotation.y += 0.01;

  render();
  stats.update();
}

function render() {
  renderer.render(scene, camera);
}

animate();
render();
