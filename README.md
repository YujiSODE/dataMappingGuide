# dataMappingGuide
a tool that helps extract data from analog map.  
GitHub: https://github.com/YujiSODE/dataMappingGuide  
>Copyright (c) 2018 Yuji SODE \<yuji.sode@gmail.com\>  
>This software is released under the MIT License.  
>See LICENSE or http://opensource.org/licenses/mit-license.php
______
## 1. Script
- `dataMappingGuide.js`

## 2. Synopsis
`var obj=dataMappingGuide(canvas,src);`  
This function returns an object with some methods to control.

### Parameters  
- `canvas`: a canvas element
- `src`: an optional filename or pathname of an image for background

### Main methods
#### 1) resizing and background
- `resize(w,h,src)`; it sets canvas size and background image
- `setDivisions(x,y)`; it sets horizontal and vertical divisions
  - `w` and `h`: new values for canvas width and canvas height
  - `src`: filename or pathname of an image; 'none' is default value
  - `x` and `y`: numbers for horizontal and vertical divisions

#### 2) colors
- `setColor(rgb,alpha)`; it sets rgb color and alpha value
  - `rgb`: rgb color value
  - `alpha`: an optional value between 0.0 (fully transparent) and 1.0 (fully opaque)

#### 3) focus area
- `xy(x,y)`; it puts focus on a area that is specified using integer coordinates
  - `x` and `y`: positive integer indices for horizontal and vertical divisions

#### Focus area indices
    An example of 3x3 divided focus area:
    _|1|2|3|
    1|x|x|x|
    2|x|x|x|
    3|x|x|x|
 
