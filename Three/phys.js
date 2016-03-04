//CLASS
function PHYS(){
  //NAME
  const PHYS = this;

  //CONSTANTS
  PHYS.STATIC = -1;
  PHYS.MOVABLE = 1;
  PHYS.DEFAULT_GRAVITY = 9.82;

  //VARIABLES
  PHYS._grav; //gravity variable

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

  PHYS.defineObject = function(){
  }

  PHYS.render = function(){
    //USES ARRAYS AND CALCULATES THE MOVEMENT
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
  _OBJECT.THREEid;
  _OBJECT.childrenID = [];
  _OBJECT.numberOfChildren;
  _OBJECT.parentID;
  _OBJECT.THREEObj;

  if(inObj.type == "Mesh")
  {
    _OBJECT.THREEObj = inObj;
    _OBJECT.typeOf = "Mesh";
    _OBJECT.state = inState;
    _OBJECT.THREEid = inObj.id;
  }
  else if(inObj.type == "Group")
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
