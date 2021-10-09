import * as THREE from "three";
import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import gsap from "gsap/gsap-core";
import image from "./assets/BaseColor.jpg";
import imageAmbientOcclusion from "./assets/AmbientOcclusion.jpg";
import imageHeight from "./assets/Height.png";
import imageRoughness from "./assets/Roughness.jpg";
import imageNormal from "./assets/Normal.jpg";

const canvas = document.querySelector(".result");
const scene = new THREE.Scene();

//gui
// const gui = new dat.GUI();

//fog
const fog = new THREE.Fog("#262837", 2, 50);
scene.fog = fog;

//lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.x = 2;
light.position.y = 5;
light.position.z = 3;
light.castShadow = true;
scene.add(light);

//helper
// const directionalLightHelper = new THREE.DirectionalLightHelper(light, 0.2);
// scene.add(directionalLightHelper);

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

//Doors
const doorColorTexture = textureLoader.load("/texture-door/color.jpg");
const doorAlphaTexture = textureLoader.load("/texture-door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "/texture-door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("/texture-door/height.jpg");
const doorNormalTexture = textureLoader.load("/texture-door/normal.jpg");
const doorMetalnessTexture = textureLoader.load("/texture-door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("/texture-door/roughness.jpg");

//Walls
const bricksColorTexture = textureLoader.load("/texture-wall/color.jpg");
const bricksDisplacementTexture = textureLoader.load(
  "/texture-wall/displacement.png"
);
const bricksRoughnessTexture = textureLoader.load(
  "/texture-wall/roughness.jpg"
);

//window
const windowColorTexture = textureLoader.load("/texture-glass/color.jpg");
const windowAlphaTexture = textureLoader.load("/texture-glass/alpha.jpg");
const windowAmbientOcclusionTexture = textureLoader.load(
  "/texture-glass/ambientOcclusion.jpg"
);
const windowHeightTexture = textureLoader.load("/texture-glass/height.png");
const windowNormalTexture = textureLoader.load("/texture-glass/normal.jpg");
const windowRoughnessTexture = textureLoader.load(
  "/texture-glass/roughness.jpg"
);

//roof
const roofColorTexture = textureLoader.load("/texture-roof/color.jpg");
const roofDisplacementTexture = textureLoader.load(
  "/texture-roof/displacement.png"
);
const roofRoughnessTexture = textureLoader.load("/texture-roof/roughness.jpg");

//grass
const grassColorTexture = textureLoader.load("/texture-grass/color.jpg");
const grassAmbientOcclusionTexture = textureLoader.load(
  "/texture-grass/ambientOcclusion.jpg"
);
const grassNormalTexture = textureLoader.load("/texture-grass/normal.jpg");
const grassHeightTexture = textureLoader.load("/texture-grass/height.png");
const grassRoughnessTexture = textureLoader.load(
  "/texture-grass/roughness.jpg"
);

//stem
const stemColorTexture = textureLoader.load("/texture-stem/color.jpg");
const stemDisplacementTexture = textureLoader.load(
  "/texture-stem/displacement.png"
);
const stemRoughnessTexture = textureLoader.load("/texture-stem/roughness.jpg");

//sidewalk
const sideWalkColorTexture = textureLoader.load("/texture-street/color.jpg");
const sideWalkDisplacementTexture = textureLoader.load(
  "/texture-street/displacement.png"
);
const sideWalkRoughnessTexture = textureLoader.load(
  "/texture-street/roughness.jpg"
);

sideWalkColorTexture.repeat.set(2, 8);

sideWalkColorTexture.wrapS = THREE.RepeatWrapping;
sideWalkColorTexture.wrapT = THREE.RepeatWrapping;

//terrain
const terrainColorTexture = textureLoader.load("/texture-terrain/color.jpg");
const terrainDisplacementTexture = textureLoader.load(
  "/texture-terrain/displacement.png"
);
const terrainRoughnessTexture = textureLoader.load(
  "/texture-terrain/roughness.jpg"
);

terrainColorTexture.repeat.set(10, 10);
terrainRoughnessTexture.repeat.set(10, 10);

terrainColorTexture.wrapS = THREE.RepeatWrapping;
terrainRoughnessTexture.wrapS = THREE.RepeatWrapping;

terrainColorTexture.wrapT = THREE.RepeatWrapping;
terrainRoughnessTexture.wrapT = THREE.RepeatWrapping;

/**
 * House
 */
const house = new THREE.Group();
scene.add(house);

//Walls
const walls = new THREE.Mesh(
  new THREE.BoxBufferGeometry(4, 2.5, 4, 50, 50, 50),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    roughness: bricksRoughnessTexture,
    displacementMap: bricksDisplacementTexture,
    displacementScale: 0.001,
  })
);

walls.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(walls.geometry.attributes.uv.array, 2)
);
walls.castShadow = true;
walls.position.y = 1;
house.add(walls);

//side Walls
const sideWalls = new THREE.Mesh(
  new THREE.BoxBufferGeometry(3, 2.5, 2.5, 50, 50, 50),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    roughness: bricksRoughnessTexture,
    displacementMap: bricksDisplacementTexture,
    displacementScale: 0.001,
  })
);
sideWalls.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(sideWalls.geometry.attributes.uv.array, 2)
);
sideWalls.castShadow = true;
sideWalls.position.x = 3;
sideWalls.position.y = 1;
house.add(sideWalls);

//roof
const roof = new THREE.Mesh(
  new THREE.ConeBufferGeometry(3.5, 1.5, 4, 20, 20, 20),
  new THREE.MeshStandardMaterial({
    map: roofColorTexture,
    roughness: roofRoughnessTexture,
    displacementMap: roofDisplacementTexture,
    displacementScale: 0.1,
  })
);
roof.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(roof.geometry.attributes.uv.array, 2)
);
roof.position.y = 3 - 0.05;
roof.rotation.y = Math.PI * 0.25;
house.add(roof);

//funnel house
const funnel = new THREE.Mesh(
  new THREE.CylinderBufferGeometry(0.5, 0.5, 1, 4, 1, false),
  new THREE.MeshStandardMaterial({
    map: roofColorTexture,
    roughness: roofRoughnessTexture,
  })
);
funnel.position.x = 1.7;
funnel.position.y = 3;
funnel.rotation.y = Math.PI * 0.25;
house.add(funnel);

//Door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.1,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
  })
);
door.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
);
door.position.y = 1 - 0.1;
door.position.z = 2 + 0.01;
house.add(door);

//window
const windows = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1, 50, 50),
  new THREE.MeshStandardMaterial({
    map: windowColorTexture,
    transparent: true,
    alphaMap: windowAlphaTexture,
    aoMap: windowAmbientOcclusionTexture,
    displacementMap: windowHeightTexture,
    displacementScale: 0.1,
    normalMap: windowNormalTexture,
    roughnessMap: windowRoughnessTexture,
  })
);
windows.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(windows.geometry.attributes.uv.array, 2)
);
windows.position.x = 3;
windows.position.y = 1;
windows.position.z = 1.3;
house.add(windows);

//bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({
  map: grassColorTexture,
  aoMap: grassAmbientOcclusionTexture,
  roughnessMap: grassRoughnessTexture,
  displacementMap: grassHeightTexture,
  displacementScale: 0.3,
  normalMap: grassNormalTexture,
  transparent: true,
});

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.castShadow = true;
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(2, 0.2, 5);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.castShadow = true;
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.castShadow = true;
bush3.scale.set(0.25, 0.25, 0.25);
bush3.position.set(-1.4, 0.1, 2.1);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.castShadow = true;
bush4.scale.set(0.4, 0.4, 0.4);
bush4.position.set(-1.5, 0.1, 4);

const bush5 = new THREE.Mesh(bushGeometry, bushMaterial);
bush5.castShadow = true;
bush5.scale.set(0.15, 0.15, 0.15);
bush5.position.set(-1, 0.05, 7);

house.add(bush1, bush2, bush3, bush4, bush5);

//rock
const rockGeometry = new THREE.DodecahedronBufferGeometry(0.5, 0);
const rockMaterial = new THREE.MeshStandardMaterial({ color: "#cecad4" });

const rock1 = new THREE.Mesh(rockGeometry, rockMaterial);
rock1.castShadow = true;
rock1.scale.set(0.5, 0.5, 0.5);
rock1.position.set(1.5, 0.1, 7);

const rock2 = new THREE.Mesh(rockGeometry, rockMaterial);
rock2.castShadow = true;
rock2.scale.set(0.5, 0.5, 0.5);
rock2.position.set(-1.5, 0.1, 7);

house.add(rock1, rock2);

//tree
const tree = new THREE.Group();
scene.add(tree);

for (let i = 0; i < 10; i++) {
  const angle = Math.random() * Math.PI * 2;
  const radius = 15 * Math.random() * 3;

  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;

  const stem = new THREE.Mesh(
    new THREE.CylinderBufferGeometry(0.5, 0.5, 2, 15, 1, false),
    new THREE.MeshStandardMaterial({
      map: stemColorTexture,
      roughness: stemRoughnessTexture,
    })
  );
  stem.castShadow = true;
  stem.position.set(x, 0.8, z);

  const leafDown = new THREE.Mesh(
    new THREE.ConeBufferGeometry(1.5, 2, 10),
    new THREE.MeshStandardMaterial({
      map: grassColorTexture,
      roughness: grassRoughnessTexture,
    })
  );
  leafDown.castShadow = true;
  leafDown.position.set(x, 2.3, z);

  const leafTop = new THREE.Mesh(
    new THREE.ConeBufferGeometry(1.2, 1.3, 10),
    new THREE.MeshStandardMaterial({
      map: grassColorTexture,
      roughness: grassRoughnessTexture,
    })
  );
  leafTop.castShadow = true;
  leafTop.position.set(x, 3.5, z);

  tree.add(stem, leafDown, leafTop);
}

//fence 1
const fence = new THREE.Group();
scene.add(fence);

const woodEdgeRight = new THREE.Mesh(
  new THREE.CylinderBufferGeometry(0.1, 0.1, 0.8, 4, 1, false),
  new THREE.MeshStandardMaterial({ color: "#E58E53" })
);
woodEdgeRight.castShadow = true;
woodEdgeRight.position.set(1.5, 0.4, 6);
woodEdgeRight.rotation.y = -Math.PI * 0.25;

const woodEdgeRight2 = new THREE.Mesh(
  new THREE.CylinderBufferGeometry(0.1, 0.1, 0.8, 4, 1, false),
  new THREE.MeshStandardMaterial({ color: "#E58E53" })
);
woodEdgeRight2.castShadow = true;
woodEdgeRight2.position.set(1.5, 0.4, 6.6);
woodEdgeRight2.rotation.y = -Math.PI * 0.25;

const woodRight2 = new THREE.Mesh(
  new THREE.CylinderBufferGeometry(0.1, 0.1, 0.8, 4, 1, false),
  new THREE.MeshStandardMaterial({ color: "#E58E53" })
);
woodRight2.castShadow = true;
woodRight2.position.set(1.5, 0.5, 6.3);
woodRight2.rotation.x = Math.PI * 0.5;
woodRight2.rotation.y = -Math.PI * 0.25;

const woodRight1 = new THREE.Mesh(
  new THREE.CylinderBufferGeometry(0.1, 0.1, 0.8, 4, 1, false),
  new THREE.MeshStandardMaterial({ color: "#E58E53" })
);
woodRight1.castShadow = true;
woodRight1.position.set(1.5, 0.3, 6.3);
woodRight1.rotation.x = Math.PI * 0.5;
woodRight1.rotation.y = -Math.PI * 0.25;

fence.add(woodEdgeRight, woodEdgeRight2, woodRight1, woodRight2);

const woodEdge1 = new THREE.Mesh(
  new THREE.CylinderBufferGeometry(0.1, 0.1, 0.8, 4, 1, false),
  new THREE.MeshStandardMaterial({ color: "#E58E53" })
);
woodEdge1.castShadow = true;
woodEdge1.position.set(-1.5, 0.4, 6);
woodEdge1.rotation.y = -Math.PI * 0.25;

const woodEdge2 = new THREE.Mesh(
  new THREE.CylinderBufferGeometry(0.1, 0.1, 0.8, 4, 1, false),
  new THREE.MeshStandardMaterial({ color: "#E58E53" })
);
woodEdge2.castShadow = true;
woodEdge2.position.set(-1.5, 0.4, 6.6);
woodEdge2.rotation.y = -Math.PI * 0.25;

const wood2 = new THREE.Mesh(
  new THREE.CylinderBufferGeometry(0.1, 0.1, 0.8, 4, 1, false),
  new THREE.MeshStandardMaterial({ color: "#E58E53" })
);
wood2.castShadow = true;
wood2.position.set(-1.5, 0.5, 6.3);
wood2.rotation.x = Math.PI * 0.5;
wood2.rotation.y = -Math.PI * 0.25;

const wood1 = new THREE.Mesh(
  new THREE.CylinderBufferGeometry(0.1, 0.1, 0.8, 4, 1, false),
  new THREE.MeshStandardMaterial({ color: "#E58E53" })
);
wood1.castShadow = true;
wood1.position.set(-1.5, 0.3, 6.3);
wood1.rotation.x = Math.PI * 0.5;
wood1.rotation.y = -Math.PI * 0.25;

fence.add(woodEdge1, woodEdge2, wood1, wood2);

//groundFloorHouse
const floorHouse = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 10),
  new THREE.MeshStandardMaterial({
    map: sideWalkColorTexture,
    roughness: sideWalkRoughnessTexture,
  })
);
floorHouse.receiveShadow = true;
floorHouse.rotation.x = -Math.PI * 0.5;
floorHouse.position.y = 0.01;
floorHouse.position.z = 5;
house.add(floorHouse);

//floor
const material = new THREE.MeshStandardMaterial({
  map: terrainColorTexture,
  roughness: terrainRoughnessTexture,
  displacementMap: terrainDisplacementTexture,
  displacementScale: 0.01,
});

const floorGeometry = new THREE.PlaneBufferGeometry(100, 100, 500, 500);
const floor = new THREE.Mesh(floorGeometry, material);
floor.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(floor.geometry.attributes.uv.array, 2)
);

floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
floor.receiveShadow = true;

scene.add(floor);

/**
 * Particles
 */
const particleTexture = textureLoader.load("/particles/particle.png");

const particlesGeometry = new THREE.BufferGeometry();
const count = 2000;

const positions = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 20;
  colors[i] = Math.random();
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);

particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

const particlesMaterial = new THREE.PointsMaterial();
particlesMaterial.size = 0.05;
particlesMaterial.sizeAttenuation = true;
// particlesMaterial.color = new THREE.Color("#ff88cc");

particlesMaterial.alphaMap = particleTexture;
particlesMaterial.transparent = true;
particleTexture.depthWrite = false;
particlesMaterial.vertexColors = true;
//points
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

//sizes
const sizes = {
  width: 1000,
  height: 800,
};

// camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);

camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 10;
// // console.log(camera.position.length());
camera.lookAt(house.position);

scene.add(camera);

//Control
const control = new OrbitControls(camera, canvas);
control.enableDamping = true;

//Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setClearColor("#262837");

//resize renderer
renderer.setSize(sizes.width, sizes.height);

//Clock
const clock = new THREE.Clock();

const loop = () => {
  const elaspsedTime = clock.getElapsedTime();

  renderer.render(scene, camera);

  control.update();

  window.requestAnimationFrame(loop);
};

loop();
