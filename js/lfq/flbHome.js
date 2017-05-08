
$(document).on("pageinit", "#flbHome", controllerInit);

function controllerInit() {
    setTimeout(function  () {
       setflbHeight(); 
    },30);
    
}

function setflbHeight() {
    var flbDomHeight = document.getElementsByTagName("body")[0].clientHeight + "px";
    document.getElementById("flbHome").style.height = flbDomHeight;
}