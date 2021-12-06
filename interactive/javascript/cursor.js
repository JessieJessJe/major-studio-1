var cursor = document.getElementById('logo');

document.onmousemove = function(evt){
    cursor.style.left = evt.pageX + "px";
    cursor.style.top = evt.pageY + "px";

}