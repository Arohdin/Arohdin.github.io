//GLOBBALS
var scene, camera, renderer, geometry, material;
var cube1, cube2, cube3, cube4;
var keyPressed = {};
var physEngine;
var group1, group2;
var floor1;

var PHYS_CUBE;
var PHYS_GROUP;

$(document).ready(function(){
  //INIT SCENE & CAMERA
  scene = new THREE.Scene();
  camera  = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 1, 500);
  camera.position.z = 25;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  //CREATE OBJECTS
  geometry = new THREE.BoxGeometry(1,1,1);
  material = new THREE.MeshBasicMaterial({color: 0x16a085});
  cube1 = new THREE.Mesh(geometry, material);

  geometry2 = new THREE.BoxGeometry(1,1,1);
  material2 = new THREE.MeshBasicMaterial({color: 0x8e44ad});
  cube2 = new THREE.Mesh(geometry2, material2);

  geometry3 = new THREE.BoxGeometry(1,1,1);
  material3 = new THREE.MeshBasicMaterial({color: 0xc0392b});
  cube3 = new THREE.Mesh(geometry3, material3);

  geometry4 = new THREE.BoxGeometry(1,1,1);
  material4 = new THREE.MeshBasicMaterial({color: 0x7f8c8d});
  cube4 = new THREE.Mesh(geometry4, material4);

  geometry5 = new THREE.BoxGeometry(20,1,10);
  material5 = new THREE.MeshBasicMaterial({color: 0xf39c12});
  floor1 = new THREE.Mesh(geometry5, material5);




  //CREATE GROUPS
  group1 = new THREE.Group();
    group1.add(cube2);
    group1.add(cube3);
  group2 = new THREE.Group();
    group2.add(cube4);
  group1.add(group2);

  //ADDS TO SCENE
  scene.add(cube1);
  scene.add(group1);
  scene.add(floor1);

  //INIT POSITION
  cube1.position.x = -3;
  cube2.position.x = -1;
  cube3.position.x = 1;
  cube4.position.x = 3;
  floor1.position.y = -10;


  //EVENTLISTENERS
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
  physEngine.init(physEngine.DEFAULT_GRAVITY, physEngine.DEFAULT_NORMDIST);

  //Create PHYS-Objects
  PHYS_CUBE = new PHYSObject(cube1, physEngine.MOVABLE);
  PHYS_GROUP = new PHYSObject(group1, physEngine.STATIC);

  //Set Parameters
  PHYS_CUBE.setMass(10);

  //Adds PHYS-Objects
  physEngine.add(PHYS_CUBE);
  physEngine.add(PHYS_GROUP);

  //RENDER
  render();
});


function render(){
  keyEvents(c.getDelta());
  requestAnimationFrame(render);
  physEngine.render(physEngine, c);
  renderer.render(scene, camera);
}

function keyEvents(dt){
  if(keyPressed[87] == true)
  {
    group1.translateY(0.2);
    cube1.translateY(0.2);
  }
  if(keyPressed[83] == true)
  {
    group1.translateY(-0.2);
    cube1.translateY(-0.2);
  }
  if(keyPressed[68] == true)
  {
    group1.translateX(0.2);
    cube1.translateX(0.2);
  }
  if(keyPressed[65] == true)
  {
    group1.translateX(-0.2);
    cube1.translateX(-0.2);
  }
  if(keyPressed[32] == true)
  {
    if(d1 >= 0.1)
    {
      cube1.material.color.setRGB(Math.random(), Math.random(), Math.random());
      d1 = 0.0;
    }
    else {
      {
        d1 += dt;
      }
    }

  }
}
