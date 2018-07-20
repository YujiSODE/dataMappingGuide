/*dataMappingGuide
*dataMappingGuide.js
*===================================================================
*	Copyright (c) 2018 Yuji SODE <yuji.sode@gmail.com>
*
*	This software is released under the MIT License.
*	See LICENSE or http://opensource.org/licenses/mit-license.php
*===================================================================
*/
//a tool that helps extract data from analog map
/*
*=== Synopsis ===
* `var obj=dataMappingGuide(canvas,src);`
* this function returns an object with some methods to control
*=== Parameters ===
* - `canvas`: a canvas element
* - `src`: an optional filename or pathname of an image for background
*=== Methods ===
*### 1) Resizing and background ###
*	- `resize(w,h,src)`; it sets canvas size and background image
*	- `setDivisions(x,y)`; it sets horizontal and vertical divisions
*		- `w` and `h`: new values for canvas width and canvas height
*		- `src`: filename or pathname of an image; 'none' is default value
*		- `x` and `y`: numbers for horizontal and vertical divisions
*### 2) Colors ###
*	- `setColor(rgb,alpha)`; it sets rgb color and alpha value
*		- `rgb`: rgb color value
*		- `alpha`: an optional value between 0.0 (fully transparent) and 1.0 (fully opaque)
*### 3) Focus area ###
*	- `xy(x,y)`; it puts focus on a area that is specified using integer coordinates
*		- `x` and `y`: positive integer indices for horizontal and vertical divisions
*### Other methods ###
*	- `clear()`; it clears canvas
*	- `next()`; it returns coordinates for the next focus area as form of [x,y]
*	- `info()`; it returns the current state of sampling
*=== Focus area indices ===
* an example of 3x3 divided focus area
* _|1|2|3|
* 1|x|x|x|
* 2|x|x|x|
* 3|x|x|x|
*/
//============================================================================
function dataMappingGuide(canvas,src){
	// - canvas: a canvas element
	// - src: an optional filename or pathname of an image for background
	//cvs is object to return
	var cvs={
		/*background image*/
		img:'none',
		/*horizontal and vertical divisions*/
		Nx:+1,
		Ny:+1,
		/*focus area sizes*/
		dw:+canvas.width,
		dh:+canvas.height,
		/*focus area indices (positive integers)*/
		X:+1,
		Y:+1,
		/*rgb color and alpha value*/
		color:'#000',
		alpha:+1.0
	};
	//default background image
	cvs.img=!src?'none':src;
	canvas.style.backgroundRepeat='no-repeat';
	canvas.style.backgroundImage=!src?'none':'url('+src+')';
	//### 1) Resizing and background ###
	//it sets canvas size and background image
	cvs.resize=function(w,h,src){
		// - w and h: new values for canvas width and canvas height
		// - src: filename or pathname of an image; 'none' is default value
		cvs.img=!src?'none':src;
		//background image
		canvas.style.backgroundRepeat='no-repeat';
		canvas.style.backgroundImage=!src?'none':'url('+src+')';
		//sizes and focus area sizes
		w=!w?100:w;
		h=!h?100:h;
		canvas.width=+w;
		canvas.height=+h;
		cvs.dw=+w/cvs.Nx;
		cvs.dh=+h/cvs.Ny;
		return src;
	};
	//it sets horizontal and vertical divisions
	cvs.setDivisions=function(x,y){
		// - x and y: numbers for horizontal and vertical divisions
		x=!x?1:x;
		y=!y?1:y;
		cvs.Nx=+x<1?+1:Math.floor(+x);
		cvs.Ny=+y<1?+1:Math.floor(+y);
		cvs.dw=+canvas.width/cvs.Nx;
		cvs.dh=+canvas.height/cvs.Ny;
		return [cvs.Nx,cvs.Ny];
	};
	//### 2) Colors ###
	//it sets rgb color and alpha value
	cvs.setColor=function(rgb,alpha){
		// - rgb: rgb color value
		// - alpha: an optional value between 0.0 (fully transparent) and 1.0 (fully opaque)
		cvs.color=!rgb?cvs.color:rgb;
		cvs.alpha=!alpha?cvs.alpha:alpha;
		return [cvs.color,cvs.alpha];
	};
	//### 3) Focus area ###
	//it puts focus on a area that is specified using integer coordinates
	cvs.xy=function(x,y){
		// - `x` and `y`: positive integer indices for horizontal and vertical divisions
		x=!x?1:x;
		y=!y?1:y;
		x=+x<1?1:Math.floor(+x);
		y=+y<1?1:Math.floor(+y);
		cvs.X=x>cvs.Nx?cvs.Nx:x;
		cvs.Y=y>cvs.Ny?cvs.Ny:y;
		//showing focus area
		var ctx=canvas.getContext('2d');
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.globalAlpha=cvs.alpha;
		ctx.fillStyle=cvs.color;
		ctx.strokeStyle=cvs.color;
		ctx.lineWidth=1.0;
		//vertical area
		ctx.fillRect((cvs.X-1)*cvs.dw,0,cvs.dw,canvas.height);
		//horizontal area
		ctx.fillRect(0,(cvs.Y-1)*cvs.dh,canvas.width,cvs.dh);
		//focus area
		ctx.clearRect((cvs.X-1)*cvs.dw,(cvs.Y-1)*cvs.dh,cvs.dw,cvs.dh);
		ctx.beginPath();
		//(X-1)*dx+dx/2=dx*(2*X-1)/2
		//horizontal line
		ctx.moveTo((cvs.X-1)*cvs.dw,cvs.dh*(2*cvs.Y-1)/2);
		ctx.lineTo(cvs.X*cvs.dw,cvs.dh*(2*cvs.Y-1)/2);
		//vertical line
		ctx.moveTo(cvs.dw*(2*cvs.X-1)/2,(cvs.Y-1)*cvs.dh);
		ctx.lineTo(cvs.dw*(2*cvs.X-1)/2,cvs.Y*cvs.dh);
		ctx.stroke();
		ctx=null;
		return [cvs.X,cvs.Y];
	};
	//### Other methods ###
	//it clears canvas
	cvs.clear=function(){
		var ctx=canvas.getContext('2d');
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx=null;
		return [canvas.width,canvas.height];
	};
	//it returns coordinates for the next focus area as form of [x,y]
	cvs.next=function(){
		var x2=cvs.X+1,y2=(x2<cvs.Nx+1)?cvs.Y:cvs.Y+1;
		y2=(y2<cvs.Ny+1)?y2:1;
		x2=(x2<cvs.Nx+1)?x2:1;
		return [x2,y2];
	};
	//it returns the current state of sampling
	cvs.info=function(){
		return {
			area:canvas.width+'x'+canvas.height+' pixels',
			divisions:cvs.Nx+'x'+cvs.Ny
		};
	};
	return cvs;
}
