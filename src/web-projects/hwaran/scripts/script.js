import * as THREE from "three";
import Stats from "three/addons/libs/stats.module.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { TransformControls } from "three/addons/controls/TransformControls.js";

import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { FXAAShader } from "three/addons/shaders/FXAAShader.js";

import GUI from "https://cdn.jsdelivr.net/npm/lil-gui@0.19/+esm";

const modelDir = "/web-projects/hwaran/models/scene.glb"
const hdrDefaultUrl = "/web-projects/hwaran/images/studio_small_09_1k.hdr";
const hdrSunsetUrl = "/web-projects/hwaran/images/059_hdrmaps_com_free_10K.hdr";
const hdrMountainsUrl = "/web-projects/hwaran/images/107_hdrmaps_com_free_10K.hdr";
const hdrSunset2Url = "/web-projects/hwaran/images/101_hdrmaps_com_free_10K.hdr";

const gui = new GUI();
gui.show(false);
// gui.open(false);

const halfLine = window.innerHeight / 2;
let highlightLine;

const highlightMargin = 15;

THREE.ColorManagement.enabled = true;

let isModelLoaded = false;
let headLamp;
let spotlight25ConeMaterial, spotlight8ConeMaterial;
let headbandMaterial, clearPlasticBloomMaterial, headbandTextMaterial;
const targetHeadbandColor = new THREE.Color("rgb(198,85,68)");
const targetHeadbandTextColor = new THREE.Color(0x800000).convertLinearToSRGB();

clearPlasticBloomMaterial = new THREE.MeshStandardMaterial({
  transparent: true,
  emissive: new THREE.Color(0xffb16e),
  emissiveIntensity: 1,
  opacity: 0.01,
  color: new THREE.Color(0xffb16e),
  visible: false,
});

spotlight25ConeMaterial = new THREE.MeshStandardMaterial({
  transparent: true,
  emissive: new THREE.Color(0xffffff),
  emissiveIntensity: 0.1,
  opacity: 0,
  color: new THREE.Color(0xffffff),
});

spotlight8ConeMaterial = new THREE.MeshStandardMaterial({
  transparent: true,
  emissive: new THREE.Color(0xffffff),
  emissiveIntensity: 0.1,
  opacity: 0,
  color: new THREE.Color(0xffffff),
});

const scrollInfo = {
  totalProgress: 0,
  currentSection: 0,
  sectionProgress: 0,
  currentSectionStart: 0,
  currentSectionEnd: 0,
  nextSectionStart: 0,
  lerpTotalProgress: 0,
  lerpSectionProgress: 0,

  animate: function () {
    this.lerpTotalProgress = lerp(this.lerpTotalProgress, this.totalProgress);
    this.lerpSectionProgress = lerp(
      this.lerpSectionProgress,
      this.sectionProgress
    );
  },

  update: function () {
    this.updateScrollProgress();
    this.updateCurrentSection();
    this.updateSectionProgress();
  },

  updateScrollProgress: function () {
    var totalHeight = document.body.scrollHeight - window.innerHeight;
    var currentScrollPosition = window.scrollY;
    this.totalProgress = currentScrollPosition / totalHeight;
  },

  updateCurrentSection: function () {
    for (let index = 0; index < sectionElements.length; index++) {
      if (this.currentSection == sectionElements.length - 1) {
        if (
          sectionElements[index].offsetTop <= window.scrollY + highlightLine &&
          window.scrollY + highlightLine <
            sectionElements[index].offsetTop +
              sectionElements[index].offsetHeight
        ) {
          this.currentSection = index;
          break;
        }
      } else {
        if (
          sectionElements[index].offsetTop <= window.scrollY + highlightLine &&
          window.scrollY + highlightLine <
            sectionElements[index].offsetTop +
              sectionElements[index].offsetHeight
        ) {
          this.currentSection = index;
          break;
        }
      }
    }
  },

  updateSectionProgress: function () {
    let nextSectionStart;
    if (this.currentSection >= sectionElements.length - 1) {
      nextSectionStart =
        sectionElements[this.currentSection].offsetTop +
        sectionElements[this.currentSection].offsetHeight -
        window.innerHeight;
    } else {
      nextSectionStart = sectionElements[this.currentSection + 1].offsetTop;
    }

    const currentSectionStart = sectionElements[this.currentSection].offsetTop;

    this.currentSectionStart = currentSectionStart;
    this.nextSectionStart = nextSectionStart;
    if (this.currentSection == 0) {
      this.sectionProgress =
        (window.scrollY - currentSectionStart) /
        (nextSectionStart - currentSectionStart - highlightLine);
    } else if (this.currentSection == sectionElements.length - 1) {
      this.sectionProgress =
        (window.scrollY - currentSectionStart + highlightLine) /
        (nextSectionStart - currentSectionStart + highlightLine);
    } else {
      this.sectionProgress =
        (window.scrollY - currentSectionStart + highlightLine) /
        (nextSectionStart - currentSectionStart);
    }
  },
};
const sectionElements = document.querySelectorAll(".transform-break");

const transformSplines = [
  //Initial Transform(Intro Page)
  //To lighting mode section
  {
    position: new THREE.CatmullRomCurve3([
      // new THREE.Vector3(-0.172, -0.328, -0.129),
      new THREE.Vector3(0.33, 0.28, -0.11),
      new THREE.Vector3(-0.23, 0.39, 0.28),
      new THREE.Vector3(-0.41, -0.08, 0.1),
      //new THREE.Vector3(-0.41, -0.08, 0.1)
    ]),
    rotation: new THREE.CatmullRomCurve3([
      // new THREE.Vector3(-1.194, 0.267, 0.178),
      new THREE.Vector3(-1.19, 0.19, -0.01),
      new THREE.Vector3(-1.0, -0.19, -0.51),
      new THREE.Vector3(-0.27, 1.31, 0.24),
      // new THREE.Vector3(-0.27, 1.31, 0.24)
    ]),
  },
  // lighting mode
  //stationary section
  {
    position: new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.41, -0.08, 0.1),
      new THREE.Vector3(-0.41, -0.08, 0.1),
    ]),
    rotation: new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.27, 1.31, 0.24),
      new THREE.Vector3(-0.27, 1.31, 0.24),
    ]),
  },
  // lighting mode
  // to flood light colors
  {
    position: new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.41, -0.08, 0.1),
      new THREE.Vector3(-0.23, 0.1, 0.28),
      new THREE.Vector3(0.03, 0.18, 0.45),
    ]),
    rotation: new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.27, 1.31, 0.24),
      new THREE.Vector3(-1.0, 0.19, 0.51),
      new THREE.Vector3(-1.22, 0.47, 0.28),
    ]),
  },
  // flood light color
  // stationary section
  {
    position: new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.03, 0.18, 0.45),
      new THREE.Vector3(0.03, 0.18, 0.45),
    ]),
    rotation: new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.22, 0.47, 0.284),
      new THREE.Vector3(-1.22, 0.47, 0.28),
    ]),
  },
  // flood colors
  // to button instructions
  {
    position: new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.03, 0.18, 0.45),
      new THREE.Vector3(0.2, 0.8, 0.1),
      new THREE.Vector3(-0.098, 0.122, 0.302),
    ]),
    rotation: new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.22, 0.47, 0.28),
      new THREE.Vector3(-1.0, 0.8, -0.51),
      new THREE.Vector3(0.13, 1.22, -0.11),
    ]),
  },
  // button instructions
  // stationary section
  {
    position: new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.098, 0.122, 0.302),
      new THREE.Vector3(-0.098, 0.122, 0.302),
    ]),
    rotation: new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.13, 1.22, -0.11),
      new THREE.Vector3(0.13, 1.22, -0.11),
    ]),
  },
  // button instructions to usb-c
  {
    position: new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.098, 0.122, 0.302),
      new THREE.Vector3(0.2, 0.8, 0.1),
      new THREE.Vector3(1.254, 0.458, -0.536),
    ]),
    rotation: new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.13, 1.22, -0.11),
      new THREE.Vector3(-1.0, 0.8, -0.51),
      new THREE.Vector3(-0.43, 0.21, 1.18),
    ]),
  },
  // usb-c
  // stationary section
  {
    position: new THREE.CatmullRomCurve3([
      new THREE.Vector3(1.254, 0.458, -0.536),
      new THREE.Vector3(0.721, 0.722, 0.533),
      new THREE.Vector3(1.142, 1.735, 1.712),
    ]),
    rotation: new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.43, 0.21, 1.18),
      new THREE.Vector3(-0.487, -0.489, 1.401),
      new THREE.Vector3(-1.33, -0.81, 0.98),
    ]),
  },
  // usb-c to band colors
  {
    position: new THREE.CatmullRomCurve3([
      new THREE.Vector3(1.142, 1.735, 1.712),
      new THREE.Vector3(-0.51, -0.28, -0.44),
    ]),
    rotation: new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.33, -0.81, 0.98),
      new THREE.Vector3(-1.06, 0.39, 1.45),
    ]),
  },
  // band colors
  // stationary
  {
    position: new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.51, -0.28, -0.44),
      new THREE.Vector3(-0.51, -0.28, -0.44),
    ]),
    rotation: new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.06, 0.39, 1.45),
      new THREE.Vector3(-1.06, 0.39, 1.45),
    ]),
  },
  // band colors
  // to top disappear
  {
    position: new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.51, -0.28, -0.44),
      new THREE.Vector3(1, 0.54, -0.1),
      new THREE.Vector3(-0.872, -0.328, -0.129),
      new THREE.Vector3(0.6, 0.58, 0.36),
    ]),
    rotation: new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.06, 0.39, 1.45),
      new THREE.Vector3(-1.194, 0.267 - 2 * Math.PI, 0.178 - 2 * Math.PI),
      new THREE.Vector3(-0.47, 0.27 - 2 * Math.PI, -0.13 - 2 * Math.PI),
    ]),
  },
];

//////////////////////////////////MOBILE//////////////////////////////////////
const transformSplinesMobile = [
  //Initial Transform(Intro Page)
  //To lighting mode section
  {
    position: new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.804, -1.074, -0.809),
      new THREE.Vector3(-0.23, 0.39, 0.28),
      new THREE.Vector3(-1.101, -0.774, -1.057),
      //new THREE.Vector3(-0.41, -0.08, 0.1)
    ]),
    rotation: new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.223, 0.172, -0.056),
      new THREE.Vector3(-1.0, -0.19, -0.51),
      new THREE.Vector3(-0.58, 1.244, 0.519),
      // new THREE.Vector3(-0.27, 1.31, 0.24)
    ]),
  },
  // lighting mode
  //stationary section
  {
    position: new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.101, -0.774, -1.057),
      new THREE.Vector3(-1.101, -0.774, -1.057),
    ]),
    rotation: new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.58, 1.244, 0.519),
      new THREE.Vector3(-0.58, 1.244, 0.519),
    ]),
  },
  // lighting mode
  // to flood light colors
  {
    position: new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.101, -0.774, -1.057),
      new THREE.Vector3(-0.23, 0.1, 0.28),
      new THREE.Vector3(-1.247, -0.961, -1.27),
    ]),
    rotation: new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.58, 1.244, 0.519),
      new THREE.Vector3(-1.0, 0.19, 0.51),
      new THREE.Vector3(-0.931, 0.47, 0.283),
    ]),
  },
  // flood light color
  // stationary section
  {
    position: new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.247, -0.961, -1.27),
      new THREE.Vector3(-1.247, -0.961, -1.27),
    ]),
    rotation: new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.931, 0.47, 0.283),
      new THREE.Vector3(-0.931, 0.47, 0.283),
    ]),
  },
  // flood colors
  // to button instructions
  {
    position: new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.247, -0.961, -1.27),
      new THREE.Vector3(0.2, 0.8, 0.1),
      new THREE.Vector3(-1.359, -0.915, -1.355),
    ]),
    rotation: new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.931, 0.47, 0.283),
      new THREE.Vector3(-1.0, 0.8, -0.51),
      new THREE.Vector3(0.161, 1.289, -0.142),
    ]),
  },
  // button instructions
  // stationary section
  {
    position: new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.359, -0.915, -1.355),
      new THREE.Vector3(-1.359, -0.915, -1.355),
    ]),
    rotation: new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.161, 1.289, -0.142),
      new THREE.Vector3(0.161, 1.289, -0.142),
    ]),
  },
  // button instructions to usb-c
  {
    position: new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.359, -0.915, -1.355),
      new THREE.Vector3(0.2, 0.8, 0.1),
      new THREE.Vector3(1.254, 0.458, -0.536),
    ]),
    rotation: new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.161, 1.289, -0.142),
      new THREE.Vector3(-1.0, 0.8, -0.51),
      new THREE.Vector3(-0.43, 0.21, 1.18),
    ]),
  },
  // usb-c
  // stationary section
  {
    position: new THREE.CatmullRomCurve3([
      new THREE.Vector3(1.254, 0.458, -0.536),
      new THREE.Vector3(0.721, 0.722, 0.533),
      new THREE.Vector3(1.142, 1.735, 1.712),
    ]),
    rotation: new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.43, 0.21, 1.18),
      new THREE.Vector3(-0.487, -0.489, 1.401),
      new THREE.Vector3(-1.33, -0.81, 0.98),
    ]),
  },
  // usb-c to band colors
  {
    position: new THREE.CatmullRomCurve3([
      new THREE.Vector3(1.142, 1.735, 1.712),
      new THREE.Vector3(-2.19, -1.707, -2.121),
    ]),
    rotation: new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.33, -0.81, 0.98),
      new THREE.Vector3(-1.06, 0.39, 1.45),
    ]),
  },
  // band colors
  // stationary
  {
    position: new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2.19, -1.707, -2.121),
      new THREE.Vector3(-2.19, -1.707, -2.121),
    ]),
    rotation: new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.06, 0.39, 1.45),
      new THREE.Vector3(-1.06, 0.39, 1.45),
    ]),
  },
  {
    position: new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2.19, -1.707, -2.121),
      new THREE.Vector3(1, 0.54, -0.1),
      new THREE.Vector3(-0.872, -0.328, -0.129),
      new THREE.Vector3(0.6, 0.58, 0.36),
    ]),
    rotation: new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.06, 0.39, 1.45),
      new THREE.Vector3(-1.194, 0.267 - 2 * Math.PI, 0.178 - 2 * Math.PI),
      new THREE.Vector3(-0.47, 0.27 - 2 * Math.PI, -0.13 - 2 * Math.PI),
    ]),
  },
];

// Scene
const scene = new THREE.Scene();
scene.environmentIntensity = 1;

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.outerWidth / window.outerHeight,
  0.1,
  1000
);

// Canvas
const canvas = document.querySelector("canvas");

// Stats
const stats = new Stats();
// document.body.appendChild(stats.dom);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});

renderer.setSize(window.outerWidth, window.outerHeight);

//HDR


const hdrDefault = {
  url: hdrDefaultUrl,
  envMap: null,
  isSet: false,
  load: function () {
    new RGBELoader().load(this.url, (texture) => {
      const gen = new THREE.PMREMGenerator(renderer);
      this.envMap = gen.fromEquirectangular(texture).texture;

      if (this.isSet) {
        this.set();
      }

      texture.dispose();
      gen.dispose();
    });
  },
  set: function () {
    this.isSet = true;
    scene.environment = this.envMap;
    scene.environmentRotation.x = 5.1;
    scene.environmentRotation.x = 4.352;
    scene.environmentRotation.y = 0.954;
    scene.environmentRotation.z = 0;
  },
};

hdrDefault.load();
hdrDefault.set();

// new RGBELoader().load(hdrDefaultUrl, (texture) => {
//   const gen = new THREE.PMREMGenerator(renderer);
//   const envMap = gen.fromEquirectangular(texture).texture;
//   scene.environment = envMap;
//   scene.environmentRotation.x = 4.352;
//   // scene.environmentRotation.y = 0.954;
//   scene.environmentRotation.z = 0;
//   // scene.background = envMap;
//   texture.dispose();
//   gen.dispose();
// });

//Orbit Controls
const defaultCameraPosition = new THREE.Vector3(0, 0, 10);
const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(2, 2, 2);

camera.fov = 20;
camera.updateProjectionMatrix();
orbit.update();
orbit.saveState();

// Axes Helper
const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

// Materials
const coverMaterial = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color(0xffffff),
  transparent: true,
  opacity: 0.5,
  roughness: 0.1,
  metalness: 1,
  ior: 1.3,
  reflectivity: 1,
  iridescence: 1,
  iridescenceIOR: 1,
  sheen: 0.8,
  specularIntensity: 1,
  clearcoat: 1,
  clearcoatRoughness: 0.2,
  // emissive: new THREE.Color(0xffffff),
  emissiveIntensity: 1,
});

//Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
const pointLight = new THREE.PointLight(0xffbb78, 10);

pointLight.position.set(0.5, 0.5, 0.5);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.1);
directionalLight.position.set(1, 1, 0);

// Shaders
const BLOOM_SCENE = 1;

const bloomLayer = new THREE.Layers();
bloomLayer.set(BLOOM_SCENE);

const bloomParams = {
  threshold: 0,
  strength: 1.85,
  radius: 1,
};

const renderScene = new RenderPass(scene, camera);

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.outerWidth, window.outerHeight),
  bloomParams.strength,
  bloomParams.radius,
  bloomParams.threshold
);

const bloomComposer = new EffectComposer(renderer);
bloomComposer.renderToScreen = false;
bloomComposer.addPass(renderScene);
bloomComposer.addPass(bloomPass);

const finalPass = new ShaderPass(
  new THREE.ShaderMaterial({
    uniforms: {
      baseTexture: { value: null },
      bloomTexture: { value: bloomComposer.renderTarget2.texture },
    },
    vertexShader: document.getElementById("vertexshader").textContent,
    fragmentShader: document.getElementById("fragmentshader").textContent,
    defines: {},
  }),
  "baseTexture"
);
finalPass.needsSwap = true;

const fxaaPass = new ShaderPass(FXAAShader);
const pixelRatio = renderer.getPixelRatio();

fxaaPass.material.uniforms["resolution"].value.x =
  1 / (canvas.offsetWidth * pixelRatio);
fxaaPass.material.uniforms["resolution"].value.y =
  1 / (canvas.offsetHeight * pixelRatio);

const finalComposer = new EffectComposer(renderer);
finalComposer.addPass(renderScene);
finalComposer.addPass(finalPass);
finalComposer.addPass(fxaaPass);

//Scene add
scene.add(ambientLight);
scene.add(directionalLight);
// scene.add(pointLight);

const sizes = {
  width: window.outerWidth,
  height: window.outerHeight,
};

const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath(
  "https://www.gstatic.com/draco/versioned/decoders/1.5.7/"
);
loader.setDRACOLoader(dracoLoader);

// Load a glTF resource
loader.load(
  // resource URL
  modelDir,
  // called when the resource is loaded
  function (gltf) {
    initModel(gltf);
    initTween();
  },
  // called while loading is progressing
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  // called when loading has errors
  function (error) {
    console.log("An error happened");
  }
);

function initModel(model) {
  headLamp = model.scene.clone();
  headLamp.scale.set(10, 10, 10);
  headLamp.position.copy(new THREE.Vector3(0.02, -1.63, 0.07));
  headLamp.rotation.setFromVector3(new THREE.Vector3(-1.67, -0.42, 1.76));

  console.log(headLamp);
  scene.add(headLamp);
  scene.add(control);

  isModelLoaded = true;

  headLamp.traverse((object) => {
    if (object.name == "spotlight25_cone") {
      object.traverse((mesh) => {
        if (mesh.isMesh) {
          mesh.material = spotlight25ConeMaterial;
          mesh.layers.enable(BLOOM_SCENE);
        }
      });
    }
  });

  headLamp.traverse((object) => {
    if (object.name == "spotlight8_cone") {
      object.traverse((mesh) => {
        if (mesh.isMesh) {
          mesh.material = spotlight8ConeMaterial;
          mesh.layers.enable(BLOOM_SCENE);
        }
      });
    }
  });

  headLamp.traverse((object) => {
    if (object.name == "clear_plastic") {
      object.traverse((mesh) => {
        if (mesh.isMesh) {
          mesh.material = coverMaterial;
        }
      });
    }
  });

  headLamp.traverse((object) => {
    if (object.name == "clear_plastic_bloom") {
      object.traverse((mesh) => {
        if (mesh.isMesh) {
          mesh.material = clearPlasticBloomMaterial;
          mesh.layers.enable(BLOOM_SCENE);
        }
      });
    }
  });

  headLamp.traverse((object) => {
    if (object.name == "lens") {
      object.traverse((mesh) => {
        if (mesh.isMesh) {
          // mesh.material = lensMaterial;
        }
      });
    }
  });

  headLamp.traverse((object) => {
    if (object.name == "headband") {
      headbandMaterial = object.children[0].material;
    }
  });

  headLamp.traverse((object) => {
    if (object.name == "headband_text") {
      headbandTextMaterial = object.children[0].material;
    }
  });

  headLamp.traverse((object) => {
    if (
      object.name == "led_white" ||
      object.name == "led_warm" ||
      object.name == "spotlight25" ||
      object.name == "spotlight8"
    ) {
      object.traverse((mesh) => {
        if (mesh.isMesh) {
          mesh.layers.enable(BLOOM_SCENE);
        }
      });
    }
  });

  // assign LED materials
  ledMaterials.push(
    headLamp.children.find((element) => element.name == "led_warm").children[0]
      .material,
    headLamp.children.find((element) => element.name == "led_white").children[0]
      .material,
    headLamp.children.find((element) => element.name == "spotlight25")
      .children[0].material,
    headLamp.children.find((element) => element.name == "spotlight8")
      .children[0].material
  );

  ledMaterials.forEach((material) => {
    material.emissiveIntensity = ledParams.offEmissiveIntensity;
  });

  powerButton.position = headLamp.children.find(
    (element) => element.name === "power_button"
  ).position;
  modeButton.position = headLamp.children.find(
    (element) => element.name === "mode_button"
  ).position;

  //   POWER BUTTON///////////////////////////////////////////////////////////////////////////////
  // POWER BUTTON REPEAT PRESS(ON/OFF)
  powerButton.pressTween = new TWEEN.Tween(powerButton.position)
    .to({ y: -0.001 }, 150)
    .easing(TWEEN.Easing.Quadratic.Out);
  powerButton.liftTween = new TWEEN.Tween(powerButton.position)
    .to({ y: 0 }, 200)
    .easing(TWEEN.Easing.Quadratic.In);
  powerButton.pressTween.chain(powerButton.liftTween);

  powerButton.repeatPressTween = new TWEEN.Tween(powerButton.position)
    .to({ y: -0.001 }, 150)
    .easing(TWEEN.Easing.Quadratic.Out)
    .delay(2000);
  powerButton.repeatLiftTween = new TWEEN.Tween(powerButton.position)
    .to({ y: 0 }, 150)
    .easing(TWEEN.Easing.Quadratic.Out);
  powerButton.repeatPressTween.chain(powerButton.repeatLiftTween);
  powerButton.repeatLiftTween.chain(powerButton.repeatPressTween);

  //   POWER BUTTON HOLD(STEP BRIGHTNESS)
  powerButton.holdTween = new TWEEN.Tween(powerButton.position)
    .to({ y: -0.001 }, 150)
    .easing(TWEEN.Easing.Quadratic.Out);

  // POWER BUTTON HOLD(GRADUAL BRIGHTNESS)
  powerButton.holdTween2 = new TWEEN.Tween(powerButton.position)
    .to({ y: -0.001 }, 150)
    .easing(TWEEN.Easing.Quadratic.Out);

  // MODE BUTTONS/////////////////////////////////////////////////////////////////////////////////////
  //   MODE BUTTON REPEAT PRESS(CHANGE MODE)
  modeButton.pressTween = new TWEEN.Tween(modeButton.position)
    .to({ y: -0.001 }, 150)
    .easing(TWEEN.Easing.Quadratic.Out);

  modeButton.liftTween = new TWEEN.Tween(modeButton.position)
    .to({ y: 0 }, 200)
    .easing(TWEEN.Easing.Quadratic.In);

  modeButton.pressTween.chain(modeButton.liftTween);

  modeButton.repeatPressTween = new TWEEN.Tween(modeButton.position)
    .to({ y: -0.001 }, 150)
    .easing(TWEEN.Easing.Quadratic.Out)
    .delay(1000);

  modeButton.repeatLiftTween = new TWEEN.Tween(modeButton.position)
    .to({ y: 0 }, 150)
    .easing(TWEEN.Easing.Quadratic.Out);

  modeButton.repeatPressTween.chain(modeButton.repeatLiftTween);
  modeButton.repeatLiftTween.chain(modeButton.repeatPressTween);

  //   MODE BUTTON REPEAT PRESS(STEP BRIGHTNESS)
  modeButton.repeatPressTween2 = new TWEEN.Tween(modeButton.position)
    .to({ y: -0.001 }, 150)
    .easing(TWEEN.Easing.Quadratic.Out)
    .delay(1000);

  modeButton.repeatLiftTween2 = new TWEEN.Tween(modeButton.position)
    .to({ y: 0 }, 150)
    .easing(TWEEN.Easing.Quadratic.Out);

  modeButton.repeatPressTween2.chain(modeButton.repeatLiftTween2);
  modeButton.repeatLiftTween2.chain(modeButton.repeatPressTween2);

  //   MODE BUTTON HOLD(SOS)
  modeButton.holdTween = new TWEEN.Tween(modeButton.position)
    .to({ y: -0.001 }, 150)
    .easing(TWEEN.Easing.Quadratic.Out);

  console.log(headLamp);
  initModelDebug();
  initLeds();
}

let powerButton = {},
  modeButton = {};

let ledParams = {
  onTime: 500,
  offTime: 200,
  onEmissiveIntensity: 1,
  halfOnEmissiveIntensity: 0.8,
  offEmissiveIntensity: 0.1,
  coneOpacity: 0.025,
};

let ledWarm = {};
let ledWhite = {};
let ledSpotlight8 = {};
let ledSpotlight8Cone = {};
let ledSpotlight25 = {};
let ledSpotlight25Cone = {};

let instTweens = {
  isPowerOn: false,
  brightnessStep: 2,
  lightingMode: 0,
  isSOSOn: false,
  isModeButtonPressed: false,
};
function initInstTweens() {
  // POWER ON OFF
  instTweens.startPowerOnOff = function () {
    powerButton.pressTween.onComplete(() => {
      if (!this.isPowerOn) {
        ledWarm.halfOnTween.start();
        ledWhite.halfOnTween.start();
        this.isPowerOn = true;
      } else {
        ledWarm.offTween.start();
        ledWhite.offTween.start();
        this.isPowerOn = false;
      }
    });
    powerButton.repeatPressTween.onComplete(() => {
      if (!this.isPowerOn) {
        ledWarm.halfOnTween.start();
        ledWhite.halfOnTween.start();
        this.isPowerOn = true;
      } else {
        ledWarm.offTween.start();
        ledWhite.offTween.start();
        this.isPowerOn = false;
      }
    });
    powerButton.pressTween.start();
    powerButton.repeatPressTween.start();
  };

  instTweens.stopPowerOnOff = function () {
    powerButton.pressTween.stop();
    powerButton.repeatPressTween.stop();
    powerButton.position.y = 0;

    ledWarm.halfOnTween.stop();
    ledWhite.halfOnTween.stop();
    ledWarm.material.emissiveIntensity = ledParams.offEmissiveIntensity;
    ledWhite.material.emissiveIntensity = ledParams.offEmissiveIntensity;

    this.isPowerOn = false;
  };
  // GRADUAL BRIGHTNESS
  instTweens.startGradBrightness = function () {
    powerButton.holdTween2.start();
    ledWarm.gradBrightmessTween.start();
    ledWhite.gradBrightmessTween.start();
  };

  instTweens.stopGradBrightness = function () {
    powerButton.holdTween2.stop();
    powerButton.position.y = 0;

    ledWarm.gradBrightmessTween.stop();
    ledWhite.gradBrightmessTween.stop();
    ledWarm.material.emissiveIntensity = ledParams.offEmissiveIntensity;
    ledWhite.material.emissiveIntensity = ledParams.offEmissiveIntensity;
  };

  //   STEP BRIGHTNESS
  instTweens.startStepBrightness = function () {
    ledWarm.material.emissiveIntensity = 0.15;
    ledWhite.material.emissiveIntensity = 0.15;
    modeButton.repeatPressTween2.onComplete(() => {
      this.brightnessStep += 1;
      if (this.brightnessStep > 5) {
        this.brightnessStep = 1;
      }
      ledWarm.material.emissiveIntensity = this.brightnessStep * 0.15;
      ledWhite.material.emissiveIntensity = this.brightnessStep * 0.15;
    });
    powerButton.holdTween.start();
    modeButton.repeatPressTween2.start();
  };

  instTweens.stopStepBrightness = function () {
    powerButton.holdTween.stop();
    modeButton.repeatPressTween2.stop();
    powerButton.position.y = 0;
    modeButton.position.y = 0;

    this.brightnessStep = 1;
    ledWarm.material.emissiveIntensity = ledParams.offEmissiveIntensity;
    ledWhite.material.emissiveIntensity = ledParams.offEmissiveIntensity;
  };

  // CHANGE MODE
  instTweens.startChangeMode = function () {
    modeButton.pressTween.onComplete(() => {
      this.modeChangeOnComplete();
    });

    modeButton.repeatPressTween.onComplete(() => {
      this.modeChangeOnComplete();
    });

    modeButton.pressTween.start();
    modeButton.repeatPressTween.start();
  };

  instTweens.stopChangeMode = function () {
    modeButton.pressTween.stop();
    modeButton.repeatPressTween.stop();

    modeButton.position.y = 0;
    this.turnOffAll();
  };

  instTweens.turnOffAll = function () {
    ledSpotlight25.material.emissiveIntensity = ledParams.offEmissiveIntensity;
    ledSpotlight25Cone.material.opacity = 0;
    ledWarm.material.emissiveIntensity = ledParams.offEmissiveIntensity;
    ledWhite.material.emissiveIntensity = ledParams.offEmissiveIntensity;
    ledSpotlight8.material.emissiveIntensity = ledParams.offEmissiveIntensity;
    ledSpotlight8Cone.material.opacity = 0;
  };

  instTweens.modeChangeOnComplete = function () {
    this.turnOffAll();
    switch (this.lightingMode) {
      case 0:
        ledSpotlight25.material.emissiveIntensity =
          ledParams.onEmissiveIntensity;
        ledSpotlight25Cone.material.opacity = ledParams.coneOpacity;
        break;
      case 1:
        ledSpotlight8.material.emissiveIntensity =
          ledParams.onEmissiveIntensity;
        ledSpotlight8Cone.material.opacity = ledParams.coneOpacity;
        break;
      case 2:
        ledWarm.material.emissiveIntensity = ledParams.onEmissiveIntensity;
        break;
      case 3:
        ledWhite.material.emissiveIntensity = ledParams.onEmissiveIntensity;
        break;
      case 4:
        ledWarm.material.emissiveIntensity = ledParams.onEmissiveIntensity;
        ledWhite.material.emissiveIntensity = ledParams.onEmissiveIntensity;
        break;
      case 5:
        ledSpotlight8.material.emissiveIntensity =
          ledParams.onEmissiveIntensity;
        ledSpotlight8Cone.material.opacity = ledParams.coneOpacity;
        ledSpotlight25.material.emissiveIntensity =
          ledParams.onEmissiveIntensity;
        ledSpotlight25Cone.material.opacity = ledParams.coneOpacity;
        ledWarm.material.emissiveIntensity = ledParams.onEmissiveIntensity;
        ledWhite.material.emissiveIntensity = ledParams.onEmissiveIntensity;
        break;
    }

    this.lightingMode += 1;
    if (this.lightingMode > 5) {
      this.lightingMode = 0;
    }
  };

  //   SOS Mode
  instTweens.startSOSMode = function () {
    modeButton.holdTween.start();
    this.isModeButtonPressed = true;
    this.SOS();
  };
  instTweens.stopSOSMode = function () {
    modeButton.holdTween.stop();
    modeButton.position.y = 0;
    this.isModeButtonPressed = false;
    spotlight25ConeMaterial.opacity = 0;
  };

  instTweens.SOS = function () {
    setTimeout(() => {
      if (this.isModeButtonPressed) {
        this.SOSOn();
        setTimeout(() => this.SOSOff(), 100);
        setTimeout(() => this.SOSOn(), 200);
        setTimeout(() => this.SOSOff(), 300);
        setTimeout(() => this.SOSOn(), 400);
        setTimeout(() => this.SOSOff(), 500);

        setTimeout(() => this.SOSOn(), 600);
        setTimeout(() => this.SOSOff(), 900);
        setTimeout(() => this.SOSOn(), 1000);
        setTimeout(() => this.SOSOff(), 1300);
        setTimeout(() => this.SOSOn(), 1400);
        setTimeout(() => this.SOSOff(), 1700);

        setTimeout(() => this.SOSOn(), 1800);
        setTimeout(() => this.SOSOff(), 1900);
        setTimeout(() => this.SOSOn(), 2000);
        setTimeout(() => this.SOSOff(), 2100);
        setTimeout(() => this.SOSOn(), 2200);
        setTimeout(() => this.SOSOff(), 2300);

        setTimeout(() => this.SOS(), 3300);
      }
    }, 3000);
  };

  instTweens.SOSOn = function () {
    spotlight25ConeMaterial.opacity = ledParams.coneOpacity;
  };
  instTweens.SOSOff = function () {
    spotlight25ConeMaterial.opacity = 0;
  };
}

function initLeds() {
  // LED WARM
  ledWarm.material = headLamp.children.find(
    (element) => element.name == "led_warm"
  ).children[0].material;

  ledWarm.onTween = new TWEEN.Tween(ledWarm.material).to(
    { emissiveIntensity: ledParams.onEmissiveIntensity },
    ledParams.onTime
  );
  ledWarm.halfOnTween = new TWEEN.Tween(ledWarm.material).to(
    { emissiveIntensity: ledParams.halfOnEmissiveIntensity },
    ledParams.onTime
  );
  ledWarm.offTween = new TWEEN.Tween(ledWarm.material).to(
    { emissiveIntensity: ledParams.offEmissiveIntensity },
    ledParams.offTime
  );
  ledWarm.gradBrightmessTween = new TWEEN.Tween(ledWarm.material).to(
    { emissiveIntensity: ledParams.halfOnEmissiveIntensity },
    3000
  );
  ledWarm.gradBrightmessDownTween = new TWEEN.Tween(ledWarm.material).to(
    { emissiveIntensity: ledParams.offEmissiveIntensity },
    3000
  );
  ledWarm.gradBrightmessTween.chain(ledWarm.gradBrightmessDownTween);
  ledWarm.gradBrightmessDownTween.chain(ledWarm.gradBrightmessTween);

  // LED WHITE
  ledWhite.material = headLamp.children.find(
    (element) => element.name == "led_white"
  ).children[0].material;
  ledWhite.onTween = new TWEEN.Tween(ledWhite.material).to(
    { emissiveIntensity: ledParams.onEmissiveIntensity },
    ledParams.onTime
  );
  ledWhite.halfOnTween = new TWEEN.Tween(ledWhite.material).to(
    { emissiveIntensity: ledParams.halfOnEmissiveIntensity },
    ledParams.onTime
  );
  ledWhite.offTween = new TWEEN.Tween(ledWhite.material).to(
    { emissiveIntensity: ledParams.offEmissiveIntensity },
    ledParams.offTime
  );
  ledWhite.gradBrightmessTween = new TWEEN.Tween(ledWhite.material).to(
    { emissiveIntensity: ledParams.halfOnEmissiveIntensity },
    3000
  );
  ledWhite.gradBrightmessDownTween = new TWEEN.Tween(ledWhite.material).to(
    { emissiveIntensity: ledParams.offEmissiveIntensity },
    3000
  );
  ledWhite.gradBrightmessTween.chain(ledWhite.gradBrightmessDownTween);
  ledWhite.gradBrightmessDownTween.chain(ledWhite.gradBrightmessTween);

  // SPOTLIGHT 25
  ledSpotlight25.material = headLamp.children.find(
    (element) => element.name == "spotlight25"
  ).children[0].material;
  ledSpotlight25.onTween = new TWEEN.Tween(ledSpotlight25.material).to(
    { emissiveIntensity: ledParams.onEmissiveIntensity },
    ledParams.onTime
  );
  ledSpotlight25.offTween = new TWEEN.Tween(ledSpotlight25.material).to(
    { emissiveIntensity: ledParams.offEmissiveIntensity },
    ledParams.offTime
  );
  // Cone
  ledSpotlight25Cone.material = spotlight25ConeMaterial;
  ledSpotlight25Cone.onTween = new TWEEN.Tween(ledSpotlight25Cone.material).to(
    { opacity: ledParams.coneOpacity },
    ledParams.onTime
  );
  ledSpotlight25Cone.offTween = new TWEEN.Tween(ledSpotlight25Cone.material).to(
    { opacity: 0 },
    ledParams.offTime
  );

  // SPOTLIGHT 8
  ledSpotlight8.material = headLamp.children.find(
    (element) => element.name == "spotlight8"
  ).children[0].material;
  ledSpotlight8.onTween = new TWEEN.Tween(ledSpotlight8.material).to(
    { emissiveIntensity: ledParams.onEmissiveIntensity },
    ledParams.onTime
  );
  ledSpotlight8.offTween = new TWEEN.Tween(ledSpotlight8.material).to(
    { emissiveIntensity: ledParams.offEmissiveIntensity },
    ledParams.offTime
  );
  //   cone
  ledSpotlight8Cone.material = spotlight8ConeMaterial;
  ledSpotlight8Cone.onTween = new TWEEN.Tween(ledSpotlight8Cone.material).to(
    { opacity: ledParams.coneOpacity },
    ledParams.onTime
  );
  ledSpotlight8Cone.offTween = new TWEEN.Tween(ledSpotlight8Cone.material).to(
    { opacity: 0 },
    ledParams.offTime
  );

  initInstTweens();
}

let ledMaterials = [];

{
  const specContainer = document.querySelectorAll(".spec-scroller");
  //max scrolltop of specContainer elements
  let scrollTopMax = [];
  for (let i = 0; i < specContainer.length; i++) {
    scrollTopMax.push(
      specContainer[i].scrollHeight - specContainer[i].offsetHeight
    );
  }
  // console.log(scrollTopMax);
}

addEventListener("scroll", (event) => {
  scrollInfo.update();
  updateHighlight();
  updateScrollWatcherValue();
  updateIntroBackground();
  updateHighlightLine();
});

function render() {
  renderer.render(scene, camera);
}
let transformModel = true;
const pos = document.querySelector("#pos");
pos.copyPos = function () {
  const pos = `new THREE.Vector3(${headLamp.position.x.toFixed(
    3
  )},${headLamp.position.y.toFixed(3)},${headLamp.position.z.toFixed(3)}),`;
  navigator.clipboard.writeText(pos);
  console.log("Copied the text: " + pos);
};
const rot = document.querySelector("#rot");
rot.copyRot = function () {
  const rot = `new THREE.Vector3(${headLamp.rotation.x.toFixed(
    3
  )},${headLamp.rotation.y.toFixed(3)},${headLamp.rotation.z.toFixed(3)}),`;
  navigator.clipboard.writeText(rot);
  console.log("Copied the text: " + rot);
};

function animate() {
  requestAnimationFrame(animate);

  if (isModelLoaded) {
    if (transformModel) {
      updateModelTransfrom();
    }

    stats.update();
    renderBloom();
    finalComposer.render();
    TWEEN.update();
    updateHeadbandColor();

    pos.textContent = `
    ${headLamp.position.x.toFixed(3)},${headLamp.position.y.toFixed(
      3
    )},${headLamp.position.z.toFixed(3)}`;
    rot.textContent = `
    ${headLamp.rotation.x.toFixed(3)},${headLamp.rotation.y.toFixed(
      3
    )},${headLamp.rotation.z.toFixed(3)}`;
  }
}

function renderBloom() {
  scene.traverse(darkenNonBloomed);
  headLamp.children.find(
    (element) => element.name === "clear_plastic"
  ).visible = false;
  bloomComposer.render();
  scene.traverse(restoreMaterial);
  headLamp.children.find(
    (element) => element.name === "clear_plastic"
  ).visible = true;
}

const highlightElements = document.querySelectorAll(".highlight");
const currentHighlight = {
  element: null,
  clear: function () {
    this.turnOff();
    this.element = null;
  },
  assign: function (element) {
    this.element = element;
    this.turnOn();
  },

  turnOn: function () {
    switch (this.element.id) {
      case "spotlight-25deg":
        ledSpotlight25.onTween.start();
        ledSpotlight25Cone.onTween.start();
        break;
      case "spotlight-8deg":
        ledSpotlight8.onTween.start();
        ledSpotlight8Cone.onTween.start();
        break;
      case "flood-light":
        ledWarm.onTween.start();
        ledWhite.onTween.start();
        break;
      case "turbo":
        ledSpotlight25.onTween.start();
        ledSpotlight25Cone.onTween.start();
        ledSpotlight8.onTween.start();
        ledSpotlight8Cone.onTween.start();
        ledWarm.onTween.start();
        ledWhite.onTween.start();
        break;
      case "3000k":
        ledWarm.onTween.start();
        break;
      case "6500k":
        ledWhite.onTween.start();
        break;
      case "4200k":
        ledWarm.halfOnTween.start();
        ledWhite.halfOnTween.start();
        break;
      case "on-off":
        instTweens.startPowerOnOff();

        break;
      case "gradual-brightness":
        instTweens.startGradBrightness();
        break;
      case "step-brightness":
        instTweens.startStepBrightness();
        break;
      case "change-mode":
        instTweens.startChangeMode();
        break;
      case "sos":
        instTweens.startSOSMode();
        break;

      case "flame-red":
        targetHeadbandColor.set(0xc65544);
        targetHeadbandTextColor.set(0x800000).convertLinearToSRGB();
        break;
      case "sunset-orange":
        targetHeadbandColor.r = 255 / 255;
        targetHeadbandColor.g = 165 / 255;
        targetHeadbandColor.b = 0 / 255;

        targetHeadbandTextColor.set(0xff8000).convertLinearToSRGB();
        break;
      case "midnight-blue":
        targetHeadbandColor.r = 24 / 255;
        targetHeadbandColor.g = 24 / 255;
        targetHeadbandColor.b = 65 / 255;

        targetHeadbandTextColor.set(0x004080).convertLinearToSRGB();
        break;
      case "forrest-green":
        targetHeadbandColor.r = 127 / 255;
        targetHeadbandColor.g = 255 / 255;
        targetHeadbandColor.b = 127 / 255;

        targetHeadbandTextColor.set(0xcaffca).convertLinearToSRGB();
        break;
      case "glacier-white":
        targetHeadbandColor.r = 198 / 255;
        targetHeadbandColor.g = 216 / 255;
        targetHeadbandColor.b = 213 / 255;

        targetHeadbandTextColor.set(0xefefef).convertLinearToSRGB();
        break;
    }
  },

  turnOff: function (element) {
    switch (element.id) {
      case "spotlight-25deg":
        ledSpotlight25.onTween.stop();
        ledSpotlight25.material.emissiveIntensity = 1;
        ledSpotlight25.offTween.start();
        ledSpotlight25Cone.onTween.stop();
        ledSpotlight25Cone.material.opacity = ledParams.coneOpacity;
        ledSpotlight25Cone.offTween.start();
        break;
      case "spotlight-8deg":
        ledSpotlight8.onTween.stop();
        ledSpotlight8.material.emissiveIntensity = 1;
        ledSpotlight8.offTween.start();
        ledSpotlight8Cone.onTween.stop();
        ledSpotlight8Cone.material.opacity = ledParams.coneOpacity;
        ledSpotlight8Cone.offTween.start();
        break;
      case "flood-light":
        ledWarm.onTween.stop();
        ledWhite.onTween.stop();
        ledWarm.material.emissiveIntensity = 0.5;
        ledWhite.material.emissiveIntensity = 0.5;
        ledWarm.offTween.start();
        ledWhite.offTween.start();
        break;
      case "turbo":
        ledSpotlight25.onTween.stop();
        ledSpotlight25.material.emissiveIntensity = 1;
        ledSpotlight25.offTween.start();
        ledSpotlight25Cone.onTween.stop();
        ledSpotlight25Cone.material.opacity = ledParams.coneOpacity;
        ledSpotlight25Cone.offTween.start();
        ledSpotlight8.onTween.stop();
        ledSpotlight8.material.emissiveIntensity = 1;
        ledSpotlight8.offTween.start();
        ledSpotlight8Cone.onTween.stop();
        ledSpotlight8Cone.material.opacity = ledParams.coneOpacity;
        ledSpotlight8Cone.offTween.start();
        ledWarm.onTween.stop();
        ledWhite.onTween.stop();
        ledWarm.material.emissiveIntensity = 0.5;
        ledWhite.material.emissiveIntensity = 0.5;
        ledWarm.offTween.start();
        ledWhite.offTween.start();

      case "3000k":
        ledWarm.onTween.stop();
        ledWarm.material.emissiveIntensity = 1;
        ledWarm.offTween.start();
        break;
      case "6500k":
        ledWhite.onTween.stop();
        ledWhite.material.emissiveIntensity = 1;
        ledWhite.offTween.start();
        break;
      case "4200k":
        ledWarm.halfOnTween.stop();
        ledWhite.halfOnTween.stop();
        ledWarm.material.emissiveIntensity = 0.5;
        ledWhite.material.emissiveIntensity = 0.5;
        ledWarm.offTween.start();
        ledWhite.offTween.start();
        break;
      case "on-off":
        instTweens.stopPowerOnOff();
        break;
      case "gradual-brightness":
        instTweens.stopGradBrightness();
        break;
      case "step-brightness":
        instTweens.stopStepBrightness();
        break;
      case "change-mode":
        instTweens.stopChangeMode();
        break;
      case "sos":
        instTweens.stopSOSMode();
        break;

      case "flame-red":
        break;
      case "sunset-orange":
        break;
      case "midnight-blue":
        break;
      case "forrest-green":
        break;
      case "glacier-white":
        break;
    }
  },
};

function updateHighlight() {
  let boundingRect = [];
  highlightElements.forEach((element) =>
    boundingRect.push(element.getBoundingClientRect())
  );

  for (let index = 0; index < boundingRect.length; index++) {
    if (isDesktop == true) {
      highlightLine = halfLine;
    } else {
      highlightLine =
        window.innerHeight - highlightElements[index].offsetHeight / 1.5;
    }

    const boldingElements =
      highlightElements[index].querySelectorAll(".bolding");

    if (
      boundingRect[index].y - highlightMargin <= highlightLine &&
      highlightLine <= boundingRect[index].bottom + highlightMargin
    ) {
      if (!highlightElements[index].classList.contains("active")) {
        highlightElements[index].classList.toggle("active");
        currentHighlight.assign(highlightElements[index]);
        boldingElements.forEach((element) => {
          element.classList.toggle("active");
        });
      }
    } else {
      if (highlightElements[index].classList.contains("active")) {
        highlightElements[index].classList.toggle("active");
        currentHighlight.turnOff(highlightElements[index]);

        boldingElements.forEach((element) => {
          element.classList.toggle("active");
        });
      }
    }
    if (
      highlightLine >= boundingRect[index].bottom + highlightMargin &&
      !isDesktop
    ) {
      const opacity =
        (100 + boundingRect[index].bottom + highlightMargin - highlightLine) *
        0.01;
      highlightElements[index].style.opacity = opacity;
    } else {
      highlightElements[index].style.opacity = 1;
    }
  }
}

function updateIntroBackground() {
  const introBackground = document.querySelector(".intro-background");
  if (getScrollPercentage() > 1) {
    introBackground.style.opacity = 0;
  } else {
    introBackground.style.opacity = 1;
  }
}
let isDesktop = true;
function updateIsDesktop() {
  const titleRect = document
    .querySelector(".page-title")
    .getBoundingClientRect();
  const specWrapperRect = document
    .querySelector(".spec-wrapper")
    .getBoundingClientRect();

  if (titleRect.right < specWrapperRect.left) {
    isDesktop = true;
  } else {
    isDesktop = false;
  }
}

addEventListener("resize", (event) => {
  // Update sizes
  sizes.width = window.outerWidth;
  sizes.height = window.outerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  bloomComposer.setSize(sizes.width, sizes.height);
  finalComposer.setSize(sizes.width, sizes.height);
  fxaaPass.material.uniforms["resolution"].value.x =
    1 / (canvas.offsetWidth * pixelRatio);
  fxaaPass.material.uniforms["resolution"].value.y =
    1 / (canvas.offsetHeight * pixelRatio);

  updateScrollWatcher();
  updateIsDesktop();
  updateHighlightLine();
});

const scrollWatcher = document.querySelector(".scroll-watcher");
const scrollWatcherValue = document.querySelector(".scroll-watcher-value");

function updateScrollWatcherValue() {
  scrollWatcherValue.style.width = `${getScrollPercentage("rounded")}%`;
}

function initScrollWatcher() {
  if (isDesktop) {
    hideScrollWatcher();
  } else {
    showScrollWatcher();
  }
}

function updateScrollWatcher() {
  initScrollWatcher();
}

function showScrollWatcher() {
  scrollWatcher.style.opacity = 1;
  scrollWatcherValue.style.opacity = 1;
}

function hideScrollWatcher() {
  scrollWatcher.style.opacity = 0;
  scrollWatcherValue.style.opacity = 0;
}

function getScrollPercentage(rounded = false) {
  // Get the total scrollable height of the page
  var totalHeight = document.body.scrollHeight - window.innerHeight;

  // Get the current scroll position
  var currentScrollPosition = window.scrollY;

  // Calculate the scroll percentage
  var scrollPercentage = (currentScrollPosition / totalHeight) * 100;

  if (!rounded) {
    return scrollPercentage;
  } else {
    return Math.round(scrollPercentage);
  }
}

gui.add(camera, "fov", 1, 200, 1).onChange(() => {
  camera.updateProjectionMatrix();
});
const canvasControls = {
  element: canvas,
  isControlling: false,
  toggle: function () {
    this.isControlling = !this.isControlling;
    if (this.isControlling) {
      transformModel = false;
      this.element.style.zIndex = 2;
      control.attach(headLamp);
    } else {
      transformModel = true;
      this.element.style.zIndex = -9;
      control.detach(headLamp);
    }
  },
  changeHDR: function () {},
};

gui.add(orbit, "reset");
gui.add(canvasControls, "toggle");
gui.add(canvasControls, "changeHDR");

const scrollFolder = gui.addFolder("Scroll");
scrollFolder.open(false);
scrollFolder.add(scrollInfo, "totalProgress").listen();
scrollFolder.add(scrollInfo, "lerpTotalProgress").listen();
scrollFolder.add(scrollInfo, "currentSection").listen();
scrollFolder.add(scrollInfo, "sectionProgress").listen();
scrollFolder.add(scrollInfo, "lerpSectionProgress").listen();

const positionFolder = gui.addFolder("Position");
positionFolder.open(false);
function initModelDebug() {
  positionFolder.add(headLamp.position, "x").listen().decimals(2);
  positionFolder.add(headLamp.position, "y").listen().decimals(2);
  positionFolder.add(headLamp.position, "z").listen().decimals(2);

  positionFolder
    .add(headLamp.rotation, "x")
    .name("rotation x")
    .listen()
    .decimals(2);
  positionFolder
    .add(headLamp.rotation, "y")
    .name("rotation y")
    .listen()
    .decimals(2);
  positionFolder
    .add(headLamp.rotation, "z")
    .name("rotation z")
    .listen()
    .decimals(2);

  gui.add(bloomPass, "strength", 0, 5, 0.01);
  gui.add(bloomPass, "threshold", 0, 0.1, 0.0001);
  gui.add(bloomPass, "radius", 0, 1, 0.001);
  gui.add(scene, "environmentIntensity", 0, 2, 0.001);
  gui.add(renderer, "toneMappingExposure", 0, 2, 0.001);
  gui.add(scene.environmentRotation, "x", 0, Math.PI * 2, 0.001);
  gui.add(scene.environmentRotation, "y", 0, Math.PI * 2, 0.001);
  gui.add(scene.environmentRotation, "z", 0, Math.PI * 2, 0.001);
}

// Transform Controls
const control = new TransformControls(camera, renderer.domElement);
control.addEventListener("change", render);

control.addEventListener("dragging-changed", function (event) {
  orbit.enabled = !event.value;
});

window.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "w":
      control.setMode("translate");
      break;
    case "e":
      control.setMode("rotate");
      break;
    case "q":
      canvasControls.toggle();
      break;
  }
});

function initTween() {}

let targetPosition = new THREE.Vector3();
let targetRotation = new THREE.Euler();
function updateModelTransfrom() {
  const transformSection = scrollInfo.currentSection;
  const transformProgress = Math.min(1, scrollInfo.sectionProgress);

  if (isDesktop) {
    targetPosition.copy(
      transformSplines[transformSection].position.getPointAt(transformProgress)
    );

    targetRotation.setFromVector3(
      transformSplines[transformSection].rotation.getPointAt(transformProgress)
    );
  } else {
    targetPosition.copy(
      transformSplinesMobile[transformSection].position.getPointAt(
        transformProgress
      )
    );

    targetRotation.setFromVector3(
      transformSplinesMobile[transformSection].rotation.getPointAt(
        transformProgress
      )
    );
  }

  const targetQuaternion = new THREE.Quaternion();
  targetQuaternion.setFromEuler(targetRotation);

  const lerp = 0.05;
  headLamp.position.lerp(targetPosition, lerp);
  headLamp.quaternion.slerp(targetQuaternion, lerp);
}

//linear interpolation
function lerp(a, b, n = 0.1) {
  return (1 - n) * a + n * b;
}

const darkMaterial = new THREE.MeshBasicMaterial({ color: "black" });
const materials = {};

function darkenNonBloomed(obj) {
  if (obj.isMesh && bloomLayer.test(obj.layers) === false) {
    materials[obj.uuid] = obj.material;
    obj.material = darkMaterial;
  }
}

function restoreMaterial(obj) {
  if (materials[obj.uuid]) {
    obj.material = materials[obj.uuid];
    delete materials[obj.uuid];
  }
}

function updateHeadbandColor() {
  headbandMaterial.color.lerp(targetHeadbandColor, 0.3);
  headbandTextMaterial.color.lerp(targetHeadbandTextColor, 0.3);
}

function updateHighlightLine() {
  // Update Highlight line(line where contents are transitioned)
  if (isDesktop == true) {
    highlightLine = halfLine;
  } else {
    if (scrollInfo.currentSection == 0) {
      highlightLine = halfLine;
    } else {
      highlightLine = window.innerHeight;
    }
  }
}

animate();
updateIsDesktop();
updateHighlightLine();
initScrollWatcher();
scrollInfo.update();
updateHighlight();
updateScrollWatcherValue();
updateIntroBackground();
