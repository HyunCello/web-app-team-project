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

  
var DefineSize = window.matchMedia("(max-width: 1145px)")
myFunction(DefineSize) // Call listener function at run time
DefineSize.addListener(myFunction) // Attach listener function on state changes

