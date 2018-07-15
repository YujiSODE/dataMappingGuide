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
* - canvas: a canvas element
* - src: an optional filename or pathname of an image for background
*=== Methods ===
*
*/
//============================================================================
function dataMappingGuide(canvas,src){
	//- canvas: a canvas element
	//- src: an optional filename or pathname of an image for background
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
		color:'#f00',
		alpha:+0.25
	};
	//default background image
	cvs.img=!src?'none':src;
	canvas.style.backgroundRepeat='no-repeat';
	canvas.style.backgroundImage=!src?'none':'url('+src+')';
	//### 1) resizing and background ###
	//it sets canvas size and background image
	cvs.resize=function(w,h,src){
		//- w and h: new value for canvas width and canvas height
		//- src: filename or pathname of an image; 'none' is default value
		cvs.img=!src?'none':src;
		//background image
		canvas.style.backgroundRepeat='no-repeat';
		canvas.style.backgroundImage=!src?'none':'url('+src+')';
		//sizes and focus area sizes
		canvas.width=+w;
		canvas.height=+h;
		cvs.dw=+w/cvs.Nx;
		cvs.dh=+h/cvs.Ny;
		return src;
	};
	//it sets horizontal and vertical divisions
	cvs.setDivisions=function(x,y){
		// - x: a number of horizontal division
		// - y: a number of vertical division
		cvs.Nx=+x<1?+1:Math.floor(+x);
		cvs.Ny=+y<1?+1:Math.floor(+y);
		cvs.dw=+canvas.width/cvs.Nx;
		cvs.dh=+canvas.height/cvs.Ny;
		return [cvs.Nx,cvs.Ny];
	};
	//### 2) colors ###
	//it sets rgb color and alpha value
	cvs.setColor=function(rgb,alpha){
		// - rgb: rgb color value
		// - alpha: an optional value between 0.0 (fully transparent) and 1.0 (fully opaque)
		cvs.color=!rgb?cvs.color:rgb;
		cvs.alpha=!alpha?cvs.alpha:alpha;
		return [cvs.color,cvs.alpha];
	};
	//### 3) focus area ###
	//
	cvs.xy=function(x,y){
		// - x: a positive integer index for horizontal division
		// - y: a positive integer index for vertical division
		x=+x<1?1:Math.floor(+x);
		y=+y<1?1:Math.floor(+y);
		cvs.X=x>cvs.Nx?cvs.Nx:x;
		cvs.Y=y>cvs.Ny?cvs.Ny:y;
		//showing focus area
		var ctx=canvas.getContext('2d');
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.globalAlpha=cvs.alpha;
		ctx.fillStyle=cvs.color;
		//vertical area
		ctx.fillRect((cvs.X-1)*cvs.dw,0,cvs.dw,canvas.height);
		//horizontal area
		ctx.fillRect(0,(cvs.Y-1)*cvs.dh,canvas.width,cvs.dh);
		ctx.clearRect((cvs.X-1)*cvs.dw,(cvs.Y-1)*cvs.dh,cvs.dw,cvs.dh);
		ctx=null;
		return [cvs.X,cvs.Y];
	};
	//it clears canvas element
	cvs.clear=function(){
		var ctx=canvas.getContext('2d');
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx=null;
		return [canvas.width,canvas.height];
	};
	//
	cvs.next=function(){};
	//
	cvs.info=function(){
		return {
			area:canvas.width+'x'+canvas.height+'pixels',
			divisions:cvs.Nx+'x'+cvs.Ny
		};
	};
	return cvs;
}
