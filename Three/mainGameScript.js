//GLOBBALS
var scene, camera, renderer, geometry, material, cube, c;
var d1 = 0.0;
var keyPressed = {};
var physEngine;
var g;
var gt;
var PHYS_CUBE;
var PHYS_GROUP;

$(document).ready(function(){
  scene = new THREE.Scene();
  camera  = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 1, 500);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  geometry = new THREE.BoxGeometry(1,1,1);
  material = new THREE.MeshBasicMaterial({color: 0x00ff00});
  cube = new THREE.Mesh(geometry, material);

  geometry2 = new THREE.BoxGeometry(1,1,1);
  material2 = new THREE.MeshBasicMaterial({color: 0x00ff00});
  cube2 = new THREE.Mesh(geometry2, material2);


  scene.add(cube);

  camera.position.z = 10;

  window.addEventListener("keydown", function(e){
    keyPressed[e.keyCode] = true;
    //console.log("KeyCode Pressed: " + e.keyCode);
  } ,false);
  window.addEventListener("keyup", function(e){
    keyPressed[e.keyCode] = false;
  } ,false);

  //CLOCK
  c = new THREE.Clock();

  //PHYS
  physEngine = new PHYS();
  physEngine.defineObject();

  cube2.scale.z = 10;

  g = new THREE.Group()
  g.add(cube2);

  scene.add(g);
  PHYS_CUBE = new PHYSObject(cube, physEngine.STATIC);
  physEngine.add(PHYS_CUBE);
  PHYS_GROUP = new PHYSObject(g,physEngine.MOVABLE);
  physEngine.add(PHYS_GROUP);
  //RENDER
  render();
});


function render(){
  keyEvents(c.getDelta());
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

function keyEvents(dt){
  if(keyPressed[87] == true)
  {
    cube.translateY(0.1);
  }
  if(keyPressed[83] == true)
  {
    cube.translateY(-0.1);
  }
  if(keyPressed[68] == true)
  {
    cube.translateX(0.1);
  }
  if(keyPressed[65] == true)
  {
    cube.translateX(-0.1);
  }
  if(keyPressed[32] == true)
  {
    if(d1 >= 0.1)
    {
      cube.material.color.setRGB(Math.random(), Math.random(), Math.random());
      d1 = 0.0;
    }
    else {
      {
        d1 += dt;
      }
    }

  }
}
