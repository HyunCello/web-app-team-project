function myFunction(DefineSize) {
    if (DefineSize.matches) { // If media query matches
        hide();
        console.log("hide")
      //ocument.body.style.backgroundColor = "yellow";
    } else {
        
        show();
        console.log("show")
      //document.body.style.backgroundColor = "pink";
    }
  }

function show() {
    document.getElementById("hideshow").style.visibility = "hidden";
}
   
   //숨기기
function hide(){
    document.getElementById("hideshow").style.visibility = "visible";
}
///////////////////////////////////////
window.imgNum = 0;

function showImage(){ 
  var imgArray= [`img/1.png`, `img/2.png`, `img/3.png`];
  var objImg=document.getElementById("introimg"); 
  objImg.src=imgArray[window.imgNum];  
  window.imgNum++;
  
  if (window.imgNum === 3) {
    window.imgNum = 0;
  }

  window.setTimeout(() => window.showImage(),3000); 
} 


var DefineSize = window.matchMedia("(max-width: 1145px)")
myFunction(DefineSize) // Call listener function at run time
DefineSize.addListener(myFunction) // Attach listener function on state changes

function openNav(){  /*style의 크기를 30%로 변경*/
  document.getElementById("myTopnav").style.height = "25%";
}
function closeNav(){ /*style의 크기를 0으로 변경*/
  document.getElementById("myTopnav").style.height = "0";
}