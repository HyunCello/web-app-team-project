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



function showImage(){ 
    var imgNum=Math.round(Math.random()*3); 
    var objImg=document.getElementById("introimg"); 
    objImg.src=imgArray[imgNum]; 
    setTimeout("showImage()",3000); 
}

  
var imgArray=new Array(); 
imgArray[0]="img/1.png"; 
imgArray[1]="img/2.png"; 
imgArray[2]="img/3.png"; 

var DefineSize = window.matchMedia("(max-width: 1145px)")
myFunction(DefineSize) // Call listener function at run time
DefineSize.addListener(myFunction) // Attach listener function on state changes

