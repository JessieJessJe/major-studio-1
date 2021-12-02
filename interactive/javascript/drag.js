
/*
Custom Reusable Drag Code
Dan Ellis 2020
*/
let originX, origin_followX;

export function dragControls(canvas, scene, dragAction,object,object_follow) {  

    originX = object.position.x;
    origin_followX = object_follow.position.x;

    var mouseDown = false,
        mouseX = 0,
        mouseY = 0;
    
    canvas.addEventListener('mousemove', function (evt) {
            if (!mouseDown) {return}
            //console.log('drag')
            evt.preventDefault();
            var deltaX = evt.clientX - mouseX,
                deltaY = evt.clientY - mouseY;
            mouseX = evt.clientX;
            mouseY = evt.clientY;
            dragAction(deltaX, deltaY, object, object_follow);
        }, false);
        
    canvas.addEventListener('mousedown', function (evt) {
        evt.preventDefault();
        mouseDown = true;
        mouseX = evt.clientX;
        mouseY = evt.clientY;
    }, false);
    
    canvas.addEventListener('mouseup', function (evt) {
        evt.preventDefault();
        mouseDown = false;
        dragActionEnd();
    }, false);

    function dragActionEnd(){
        object.position.x = originX;
        object_follow.position.x = origin_followX;

        document.querySelector('#threejs-canvas').style.cursor = 'default';
    }
    
}



export function dragAction(deltaX, deltaY, object, object_follow) {
    
    object.position.x += deltaX / 1.2;
    object_follow.position.x += deltaX / 1.2;
}



// export {dragControls, dragAction}