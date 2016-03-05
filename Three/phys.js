//CLASS
function PHYS(){
  //NAME
  const PHYS = this;

  //CONSTANTS
  PHYS.STATIC = -1;
  PHYS.MOVABLE = 1;
  PHYS.DEFAULT_GRAVITY = -9.82;
  PHYS.DEFAULT_NORMDIST = 0.1;

  //VARIABLES
  PHYS._grav = PHYS.DEFAULT_GRAVITY; //gravity variable
  PHYS._normDist = PHYS.DEFAULT_NORMDIST;

  //TO RENDER
  PHYS.movableRenderArray = [];
  PHYS.staticRenderArray = [];

  //FUNCTIONS
  PHYS.add = function(_obj){
    if(_obj.state == PHYS.STATIC)
    {
      PHYS.staticRenderArray.push(_obj);
    }
    else {
      {
        PHYS.movableRenderArray.push(_obj);
      }
    }
  }

  PHYS.remove = function(){
  }

  PHYS.init = function(grav,nd){
    PHYS._grav = grav;
    PHYS._normDist = Math.abs(nd);
  }

  PHYS.render = function(PE, c){
    //USES ARRAYS AND CALCULATES THE MOVEMENT
        //HAS PARAMTER obj.up..
    for(var i = 0; i < PE.movableRenderArray.length; ++i)
    {

    }
  }

}


function PHYSObject(inObj, inState){
  //NAME
  const _OBJECT = this;
  const type = "PhysObject";

  //VARIABLES
  _OBJECT.typeOf; //group or mesh
  _OBJECT.state;  //if static or moveable.
  _OBJECT.mass; //in kg
  _OBJECT.THREEid;  //ID of object given by THREE.js
  _OBJECT.childrenID = [];  //ID of children given by THREE.js
  _OBJECT.numberOfChildren; //Nmber of children...
  _OBJECT.parentID; //THREE.js-ID of parent to a child.
  _OBJECT.THREEObj; //Holds the actual THREE OBJECT

  if(inObj.type == "Mesh")
  {
    _OBJECT.THREEObj = inObj;
    _OBJECT.typeOf = "Mesh";
    _OBJECT.state = inState;
    _OBJECT.THREEid = inObj.id;
  }
  else if(inObj.type == "Group")  //MAKE THIS RECURSIVE
  {
    _OBJECT.THREEObj = inObj;
    _OBJECT.typeOf = "Group";
    _OBJECT.state = inState;
    _OBJECT.THREEid = inObj.id;
    _OBJECT.numberOfChildren = inObj.children.length;
    for(var i = 0; i < _OBJECT.numberOfChildren; ++i)
    {
      _OBJECT.childrenID.push(inObj.children[i]);
    }
    if(inObj.parent != null)
    {
      _OBJECT.parentID = inObj.parent.id;
    }
  }

  //FUNCTIONS
  _OBJECT.setMass = function(inMass){
    _OBJECT.mass = inMass;
  }

  _OBJECT.setState = function(inState){
    _OBJECT.state = inState;
  }


}
