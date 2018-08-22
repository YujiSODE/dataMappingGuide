/*landformPath
*landformPath_webScript.js
*===================================================================
*	Copyright (c) 2018 Yuji SODE <yuji.sode@gmail.com>
*
*	This software is released under the MIT License.
*	See LICENSE or http://opensource.org/licenses/mit-license.php
*===================================================================
*/
//script using "landformPath.js" and "landformPath_tools.js"
(function(){
	var slf=window.document,SS,C=slf.getElementById('landformPathCvs'),Log=slf.getElementById('initialValues'),
		L=getLandform(C),SS=capturingCanvas(C,slf.getElementById('downloadDiv')),
		X=0,Y=0,Fix=!1,Randomness=0,Points=0,R=[],i=0,ctx;
	//### form event ###
	slf.getElementById('landformPathForm').addEventListener('change',function(){
		//if it fixes coordinates
		Fix=slf.getElementById('fixed').checked;
		//center coordinates
		X=!Fix?Math.floor(C.width*Math.random()):X;
		Y=!Fix?Math.floor(C.height*Math.random()):Y;
		Randomness=slf.getElementById('randomness').value;
		Points=slf.getElementById('points').value;
		i=0,R=[];
		//initial values
		while(i<Points){R.push(Randomness*Math.random()),i+=1;}
		Log.value+=!Log.value?'@'+R.join():'\n@'+R.join();
		//landforms
		ctx=C.getContext('2d'),ctx.clearRect(0,0,C.width,C.height),ctx=null;
		L.curves(X,Y,R,10,5);
	},false);
	//### event for capturing canvas ###
	slf.getElementById('captureB').addEventListener('click',SS,false);
	//### first landform ###
	//center coordinates
	X=Math.floor(C.width*Math.random()),Y=Math.floor(C.height*Math.random());
	Randomness=slf.getElementById('randomness').value,Points=slf.getElementById('points').value;
	i=0,R=[];
	//initial values
	while(i<Points){R.push(Randomness*Math.random()),i+=1;}
	Log.value+=!Log.value?'@'+R.join():'\n@'+R.join();
	//landforms
	ctx=C.getContext('2d'),ctx.clearRect(0,0,C.width,C.height),ctx=null;
	L.curves(X,Y,R,10,5);
}());
