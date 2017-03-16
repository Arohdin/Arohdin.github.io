/*WARNING!!!
Hideous code ahead!
Proceed with caution.*/
function setup(leaf_positions){

    var distance = 20;
    leaf_height = 20;

    //Lövens böjningshastigheter i ordning efter index
    speeds = [];

    //Lövens böjningskrafter
    forces = [];

    //Räknar antal löv
    var counter = 0;

    //Containers-ish
    symbols = [];

    //Initialize
    initialize();

    //---------För att skapa löven-----------//
    //Leaf
    symbols[counter].add(this['leaf' + counter]);
    leaves.push(symbols[counter]);

    tobj1 = {angle:2*Math.PI/2,force: +forces[counter]};
    tween1 = new TWEEN.Tween(tobj1)
        .to({force: -forces[counter]},speeds[counter])
        .onUpdate(function(){
            bend.angle = this.angle;
            bend.force = this.force;
            mstack0.apply();
        })
        .onComplete(function(){
            tobj1.force = +forces[counter];
        });

     tobj2 = {angle:2*Math.PI/2,force: -forces[counter]};
     tween2 = new TWEEN.Tween(tobj2)
        .to({force: +forces[counter]},speeds[counter])
        .onUpdate(function(){
            bend.angle = this.angle;
            bend.force = this.force;
            mstack0.apply();
            })
        .onComplete(function(){
            tobj2.force = -forces[counter];
    });
    counter++;

    symbols[counter].add(this['leaf' + counter]);
    leaves.push(symbols[counter]);

    tobj3 = {angle:2*Math.PI/2,force: +forces[counter]};
    tween3 = new TWEEN.Tween(tobj3)
        .to({force: -forces[counter]},speeds[counter])
        .onUpdate(function(){
            bend.angle = this.angle;
            bend.force = this.force;
            mstack1.apply();
        })
        .onComplete(function(){
            tobj3.force = +forces[counter];
        });

     tobj4 = {angle:2*Math.PI/2,force: -forces[counter]};
     tween4 = new TWEEN.Tween(tobj4)
        .to({force: +forces[counter]},speeds[counter])
        .onUpdate(function(){
            bend.angle = this.angle;
            bend.force = this.force;
            mstack1.apply();
            })
        .onComplete(function(){
            tobj4.force = -forces[counter];
    });
      counter++;

    //Leaf2
    symbols[counter].add(this['leaf' + counter]);
    leaves.push(symbols[counter]);

    tobj5 = {angle:2*Math.PI/2,force: +forces[counter]};
    tween5 = new TWEEN.Tween(tobj5)
        .to({force: -forces[counter]},speeds[counter])
        .onUpdate(function(){
            bend.angle = this.angle;
            bend.force = this.force;
            mstack2.apply();
        })
        .onComplete(function(){
            tobj5.force = +forces[counter];
        });

     tobj6 = {angle:2*Math.PI/2,force: -forces[counter]};
     tween6 = new TWEEN.Tween(tobj6)
        .to({force: +forces[counter]},speeds[counter])
        .onUpdate(function(){
            bend.angle = this.angle;
            bend.force = this.force;
            mstack2.apply();
            })
        .onComplete(function(){
            tobj6.force = -forces[counter];
    });
        counter++;

    //Leaf3
    symbols[counter].add(this['leaf' + counter]);
    leaves.push(symbols[counter]);

    tobj7 = {angle:2*Math.PI/2,force: +forces[counter]};
    tween7 = new TWEEN.Tween(tobj7)
        .to({force: -forces[counter]},speeds[counter])
        .onUpdate(function(){
            bend.angle = this.angle;
            bend.force = this.force;
            mstack3.apply();
        })
        .onComplete(function(){
            tobj7.force = +forces[counter];
        });

     tobj8 = {angle:2*Math.PI/2,force: -forces[counter]};
     tween8 = new TWEEN.Tween(tobj8)
        .to({force: +forces[counter]},speeds[counter])
        .onUpdate(function(){
            bend.angle = this.angle;
            bend.force = this.force;
            mstack3.apply();
            })
        .onComplete(function(){
            tobj8.force = -forces[counter];
    });
        counter++;

    //Leaf4
    symbols[counter].add(this['leaf' + counter]);
    leaves.push(symbols[counter]);

    tobj9 = {angle:2*Math.PI/2,force: +forces[counter]};
    tween9 = new TWEEN.Tween(tobj9)
        .to({force: -forces[counter]},speeds[counter])
        .onUpdate(function(){
            bend.angle = this.angle;
            bend.force = this.force;
            mstack4.apply();
        })
        .onComplete(function(){
            tobj9.force = +forces[counter];
        });

     tobj10 = {angle:2*Math.PI/2,force: -forces[counter]};
     tween10 = new TWEEN.Tween(tobj10)
        .to({force: +forces[counter]},speeds[counter])
        .onUpdate(function(){
            bend.angle = this.angle;
            bend.force = this.force;
            mstack4.apply();
            })
        .onComplete(function(){
            tobj10.force = -forces[counter];
    });
        counter++;

    //Leaf5
    symbols[counter].add(this['leaf' + counter]);
    leaves.push(symbols[counter]);

    tobj11 = {angle:2*Math.PI/2,force: +forces[counter]};
    tween11 = new TWEEN.Tween(tobj11)
        .to({force: -forces[counter]},speeds[counter])
        .onUpdate(function(){
            bend.angle = this.angle;
            bend.force = this.force;
            mstack5.apply();
        })
        .onComplete(function(){
            tobj11.force = +forces[counter];
        });

     tobj12 = {angle:2*Math.PI/2,force: -forces[counter]};
     tween12 = new TWEEN.Tween(tobj12)
        .to({force: +forces[counter]},speeds[counter])
        .onUpdate(function(){
            bend.angle = this.angle;
            bend.force = this.force;
            mstack5.apply();
            })
        .onComplete(function(){
            tobj12.force = -forces[counter];
    });
        counter++;

    //Leaf6
    symbols[counter].add(this['leaf' + counter]);
    leaves.push(symbols[counter]);

    tobj13 = {angle:2*Math.PI/2,force: +forces[counter]};
    tween13 = new TWEEN.Tween(tobj13)
        .to({force: -forces[counter]},speeds[counter])
        .onUpdate(function(){
            bend.angle = this.angle;
            bend.force = this.force;
            mstack6.apply();
        })
        .onComplete(function(){
            tobj13.force = +forces[counter];
        });

     tobj14 = {angle:2*Math.PI/2,force: -forces[counter]};
     tween14 = new TWEEN.Tween(tobj14)
        .to({force: +forces[counter]},speeds[counter])
        .onUpdate(function(){
            bend.angle = this.angle;
            bend.force = this.force;
            mstack6.apply();
            })
        .onComplete(function(){
            tobj14.force = -forces[counter];
    });
        counter++;

    //Leaf7
    symbols[counter].add(this['leaf' + counter]);
    leaves.push(symbols[counter]);

    tobj15 = {angle:2*Math.PI/2,force: +forces[counter]};
    tween15 = new TWEEN.Tween(tobj15)
        .to({force: -forces[counter]},speeds[counter])
        .onUpdate(function(){
            bend.angle = this.angle;
            bend.force = this.force;
            mstack7.apply();
        })
        .onComplete(function(){
            tobj15.force = +forces[counter];
        });

     tobj16 = {angle:2*Math.PI/2,force: -forces[counter]};
     tween16 = new TWEEN.Tween(tobj16)
        .to({force: +forces[counter]},speeds[counter])
        .onUpdate(function(){
            bend.angle = this.angle;
            bend.force = this.force;
            mstack7.apply();
            })
        .onComplete(function(){
            tobj16.force = -forces[counter];
    });
        counter++;

    //Leaf8
    symbols[counter].add(this['leaf' + counter]);
    leaves.push(symbols[counter]);

    tobj17 = {angle:2*Math.PI/2,force: +forces[counter]};
    tween17 = new TWEEN.Tween(tobj17)
        .to({force: -forces[counter]},speeds[counter])
        .onUpdate(function(){
            bend.angle = this.angle;
            bend.force = this.force;
            mstack8.apply();
        })
        .onComplete(function(){
            tobj17.force = +forces[counter];
        });

     tobj18 = {angle:2*Math.PI/2,force: -forces[counter]};
     tween18 = new TWEEN.Tween(tobj18)
        .to({force: +forces[counter]},speeds[counter])
        .onUpdate(function(){
            bend.angle = this.angle;
            bend.force = this.force;
            mstack8.apply();
            })
        .onComplete(function(){
            tobj18.force = -forces[counter];
    });
        counter++;

    //Leaf9
    symbols[counter].add(this['leaf' + counter]);
    leaves.push(symbols[counter]);
    tobj19 = {angle:2*Math.PI/2,force: +forces[counter]};
    tween19 = new TWEEN.Tween(tobj19)
        .to({force: -forces[counter]},speeds[counter])
        .onUpdate(function(){
            bend.angle = this.angle;
            bend.force = this.force;
            mstack9.apply();
        })
        .onComplete(function(){
            tobj19.force = +forces[counter];
        });

     tobj20 = {angle:2*Math.PI/2,force: -forces[counter]};
     tween20 = new TWEEN.Tween(tobj20)
        .to({force: +forces[counter]},speeds[counter])
        .onUpdate(function(){
            bend.angle = this.angle;
            bend.force = this.force;
            mstack9.apply();
            })
        .onComplete(function(){
            tobj20.force = -forces[counter];
    });

    //---------Slut på kod för att skapa löv-----------//

    //Lägg till löven i scenen
     add();
}

function initialize(){

    //Sätt lövens hastigheter
    for(i = 0; i<noLeaves; i++)
    {
        if(i < 2)
        {
            speeds[i] = 600;
        }
        else
        {
            speeds[i] = i*150;
        }

        forces[i] = 0.1;
    }

    //Skapa symboler (en kontainer med objekt)
    createSymbols(noLeaves);

    //Skapa bend-modifier
    createBend();

    //Dynamiskt tilldela variabelnamn
    setNames(noLeaves);
}

//Lägg till löven i scenen
function add(){
    for(i = 0; i<noLeaves; i++)
    {
         scene.add(symbols[i]);
    }
}

//Skapa symboler (en kontainer med objekt)
function createSymbols(noLeaves){

    for(i = 0; i<noLeaves; i++)
    {
        obj = new THREE.Object3D();
        symbols.push(obj);
    }
}

//Dynamiskt tilldela variabelnamn
function setNames(noLeaves){

    for(i = 0; i<noLeaves; i++)
    {
        //Namn
        this['leaf' + i]  = createLeaf(leaf_height);
        this['geometry' + i] = this['leaf' + i].geometry;
        vertices = this['geometry' + i].vertices;

        //Pivot point & applicera bend
        this['geometry' + i].applyMatrix( new THREE.Matrix4().makeTranslation( 0, leaf_height/2, 0 ) );

        this['mstack' + i] = new MOD3.ModifierStack(MOD3.LibraryThree, this['leaf' + i]);
        this['mstack' + i].addModifier(bend);
    }
}

function createLeaf(leaf_height){
    //w,h,d, de 3 sista argumenten är segments
    leaf = new THREE.Mesh( new THREE.BoxGeometry( 0.001, leaf_height, leaf_height , 20, 20, 20 ), new THREE.MeshFaceMaterial( materials) );
    return leaf;
}

//Lövens position
function setPosition(leaf, idx) {
    leaf.position.x = leaf_positions[idx].getComponent(0);
    leaf.position.y = leaf_positions[idx].getComponent(1);
    leaf.position.z = leaf_positions[idx].getComponent(2);
}

//Skapa bend-modifier
function createBend() {
    //Böj
    bend = new MOD3.Bend();
    bend.angle = 0;
    bend.force = 0;
    bend.offset = 0.6;
    bend.switchAxes = true;
    bend.constraint = MOD3.ModConstant.LEFT;
}
