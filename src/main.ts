// canvasを取得
const myCanvas = document.querySelector<HTMLCanvasElement>('#myCanvas')!;

//
// ➊ three.jsセットアップ
//

// ライブラリの読み込み
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// モデルを読み込み
const loader = new GLTFLoader();
const model = await loader.loadAsync(`/Duck.glb`);
model.scene.scale.set(0.25, 0.25, 0.25);

// 座表軸
const axes = new THREE.AxesHelper();

// 環境光源
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);

// 平行光源
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(5, 5, 0);

// シーンを初期化
const scene = new THREE.Scene();
scene.add(model.scene);
scene.add(axes);
scene.add(ambientLight);
scene.add(directionalLight);

// カメラを初期化
const camera = new THREE.PerspectiveCamera(50, myCanvas.offsetWidth / myCanvas.offsetHeight);
camera.position.set(1, 1, 1);
camera.lookAt(scene.position);

// レンダラーの初期化
const renderer = new THREE.WebGLRenderer({ canvas: myCanvas });
renderer.setClearColor(0xffffff, 1.0); // 背景色
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(myCanvas.offsetWidth, myCanvas.offsetHeight);

// カメラコントローラー設定
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.maxPolarAngle = Math.PI * 0.5;
orbitControls.minDistance = 0.1;
orbitControls.maxDistance = 100;
orbitControls.autoRotate = true;     // カメラの自動回転設定
orbitControls.autoRotateSpeed = 1.0; // カメラの自動回転速度

// ➋ 描画ループを開始
renderer.setAnimationLoop(() => {
  // カメラコントローラーを更新
  orbitControls.update();

  // 描画する
  renderer.render(scene, camera);
});
