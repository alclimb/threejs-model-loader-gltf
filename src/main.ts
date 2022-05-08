// ライブラリの読み込み
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

async function main() {
  // 描画先の要素
  const appElement = document.querySelector<HTMLDivElement>('#appElement')!;

  // モデルを読み込み
  const loader = new GLTFLoader();
  const model = await loader.loadAsync(`./Duck.glb`);
  model.scene.position.set(0, -0.15, 0);   // モデルの位置を下に微調整
  model.scene.scale.set(0.25, 0.25, 0.25); // モデルのサイズを縮小

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
  const camera = new THREE.PerspectiveCamera(50, appElement.offsetWidth / appElement.offsetHeight);
  camera.position.set(1, 1, 1);
  camera.lookAt(scene.position);

  // レンダラーの初期化
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor(0xffffff, 1.0); // 背景色
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(appElement.offsetWidth, appElement.offsetHeight);

  // レンダラーをDOMに追加
  appElement.appendChild(renderer.domElement);

  // カメラコントローラー設定
  const orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.maxPolarAngle = Math.PI * 0.5;
  orbitControls.minDistance = 0.1;
  orbitControls.maxDistance = 100;
  orbitControls.autoRotate = true;     // カメラの自動回転設定
  orbitControls.autoRotateSpeed = 1.0; // カメラの自動回転速度

  // 画面のサイズ変更イベントを登録
  window.addEventListener(`resize`, () => {
    // レンダラーのサイズを調整
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(appElement.offsetWidth, appElement.offsetHeight);

    // カメラのアスペクト比を調整
    camera.aspect = appElement.offsetWidth / appElement.offsetHeight;
    camera.updateProjectionMatrix();
  });

  // 描画ループを開始
  renderer.setAnimationLoop(() => {
    // カメラコントローラーを更新
    orbitControls.update();

    // 描画する
    renderer.render(scene, camera);
  });
}

main();
