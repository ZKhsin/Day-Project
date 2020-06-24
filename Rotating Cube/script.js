let scene, camera, renderer, cube;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const texture = new THREE.TextureLoader().load("box-img.jpg");

  const material = new THREE.MeshBasicMaterial({ map: texture });
  // const  material = new THREE.MeshNormalMaterial({});

  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
}

function changeCube() {
  setInterval(() => {
    change = !change;
  }, 1000);
}

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize, false);

init();
animate();
