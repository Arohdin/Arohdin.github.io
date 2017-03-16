function bernoulli(g, u, rho, p, A, y){

	var p_static = p/(rho*g);
	var p_dynamic = Math.pow(u,2)/(2*g);
	var p_stag = p_static + p_dynamic + y;
	var f =  A * p_stag;

	return f;
}

function eulerStep(y_prev, y_deriv, h){
	//Gör ett steg med Euler
	var f = y_prev + h*y_deriv;
	return f;
}

function calculateForce(force_wind, k, c, w, theta ){
//Räknar ut kraftresultanten
//Motverkande kraft
 var ang_diff = theta;
 var F_motv;

    if(theta < 0)
       F_motv = k*(Math.pow(ang_diff,2));
    else if(theta > 0)
       F_motv = -k*(Math.pow(ang_diff,2));
   else
   		F_motv = 0;

//Vridning från vind
var F_vrid = force_wind*Math.cos(theta); 

//Dämpande kraft
var F_dampning = -c*w;

var f = F_vrid + F_motv + F_dampning;

return f;
}

function calculateTorque(force, r){
//Räkna ut vridmomentsresultant
var f =  force*r;

return f;
}

function calculateAngAcc(torque, momInerita){
//Räkna ut vinkelacceleration
var f =  torque/momInerita;
return f;
}

