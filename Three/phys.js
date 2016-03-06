//CLASS
function PHYS(){
  //NAME
  const PHYS = this;

  //CONSTANTS
  PHYS.STATIC = -1;
  PHYS.MOVABLE = 1;
  PHYS.DEFAULT_GRAVITY = THREE.Vector3(0,-9.82,0);
  PHYS.DEFAULT_NORMDIST = 0.1;
  PHYS.DEFAULT_MASS = 1.00;

  //VARIABLES
  PHYS._grav = PHYS.DEFAULT_GRAVITY; //gravity variable
  PHYS._normDist = PHYS.DEFAULT_NORMDIST;

  //TO RENDER
  PHYS.movableRenderArray = [];
  PHYS.staticRenderArray = [];

  //FUNCTIONS
  PHYS.add = function(obj){       //DETTA KAN GÖRAS TILL EN. KOLLA MOVE/STATIC INNUTILL!

    if(obj.typeOf == "Group")
    {
      for(var i = 0; i < obj.PHYSChildren.length; ++i)
      {
        if(obj.PHYSChildren[i].typeOf == "Mesh")
        {
          if(obj.PHYSChildren[i].state == PHYS.MOVABLE)
          {
            PHYS.movableRenderArray.push((obj.PHYSChildren[i]));
          }
          else
          {
            PHYS.staticRenderArray.push(obj.PHYSChildren[i]);
          }
        }
        else if(obj.PHYSChildren[i].typeOf == "Group")
        {
          PHYS.add(obj.PHYSChildren[i]);
        }
      }
    }
    else if(obj.typeOf == "Mesh")
    {
      if(obj.state == PHYS.MOVABLE)
      {
        PHYS.movableRenderArray.push(obj);
      }
      else
      {
        PHYS.staticRenderArray.push(obj);
      }
    }
  }

  PHYS.init = function(grav,nd){
    PHYS._grav = grav;
    PHYS._normDist = Math.abs(nd);
  }

  PHYS.render = function(PE, deltaTime){
  }

  PHYS.remove = function(){
  }
}


function PHYSObject(inObj, inState){
  //NAME
  const _OBJECT = this;
  const type = "PhysObject";

  //VARIABLES
  _OBJECT.typeOf; //group or mesh
  _OBJECT.state;  //if static or moveable. (MAKE INHERITABLE)
  _OBJECT.mass; //in kg
  _OBJECT.THREEid;  //ID of object given by THREE.js
  _OBJECT.children = [];  //Stores children of object (contains THREE Objects)
  _OBJECT.numberOfChildren; //Nmber of children...
  _OBJECT.parentID; //THREE.js-ID of parent to this.
  _OBJECT.THREEObj; //Holds the actual THREE OBJECT
  _OBJECT.PHYSChildren = [];

  if(inObj.type == "Mesh")
  {
    _OBJECT.THREEObj = inObj;
    _OBJECT.typeOf = "Mesh";
    _OBJECT.state = inState;
    _OBJECT.THREEid = inObj.id;
    _OBJECT.mass = _OBJECT.DEFAULT_MASS;
    _OBJECT.numberOfChildren = 0;
  }
  else if(inObj.type == "Group")  //MAKE THIS RECURSIVE
  {
    _OBJECT.THREEObj = inObj;
    _OBJECT.typeOf = "Group";
    _OBJECT.state = inState;
    _OBJECT.THREEid = inObj.id;
    _OBJECT.numberOfChildren = inObj.children.length;

    if(inObj.parent != null)
    {
      _OBJECT.parentID = inObj.parent.id; //If id = 1, then object is direct child of SCENE
    }

    for(var i = 0; i < _OBJECT.numberOfChildren; ++i)
    {
      _OBJECT.children.push(inObj.children[i]);
      _OBJECT.PHYSChildren.push(new PHYSObject(inObj.children[i], inState));
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

//PROTOTYPE FUNCTION TO CLASS PHYSObject
PHYSObject.prototype.listChildrenByID = function(){
  var str = "THREE ID of children: ";
  for(var i = 0; i < this.children.length; ++i)
  {
    str += this.children[i].id + " ";
  }
  console.log(str);
}

PHYSObject.prototype.getChildByID = function(key){  //Return -1 if not found
  for(var i = 0; i < PHYS.staticRenderArray.length; ++i)
  {
    if(PHYS.staticRenderArray[i].THREEid == key)
    {
      return PHYS.staticRenderArray[i];
    }
  }
  for(var t = 0; t < PHYS.movableRenderArray.length; ++t)
  {
    if(PHYS.movableRenderArray[i].THREEid == key)
    {
      return PHYS.movableRenderArray[i];
    }
  }
}
