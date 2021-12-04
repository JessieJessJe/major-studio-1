
/*
Custom Reusable Drag Code
Dan Ellis 2020
*/
let MAXMOVE = 200;
let originX, origin_followX;
let drag_distance_standard = 100, drag_distance_current = 0, drag_distance_prev = 0;

let img_index_new, img_v = 0;

export function dragControls(canvas, object, object_follow, img_group, img_index, img_length) {  

    img_index_new = parseInt(img_index);

    originX = object.position.x;

    origin_followX = object_follow.position.x;

    var mouseDown = false,
        mouseX = 0,
        mouseY = 0;
    
    canvas.addEventListener('mousemove', function (evt) {
         
            if (mouseDown){

                evt.preventDefault();
                var deltaX = evt.clientX - mouseX,
                    deltaY = evt.clientY - mouseY;
                mouseX = evt.clientX;
                mouseY = evt.clientY;
               
    
                if (Math.abs(mouseY - window.innerHeight/2) > 200){
                    dragActionEnd();
                } else {
                    dragAction(deltaX, mouseX, object, object_follow);
                }
            }
            
        }, false);

    document.addEventListener( 'keydown', onKeyDown, false );
        
    canvas.addEventListener('mousedown', function (evt) {
        evt.preventDefault();
        mouseDown = true;
        mouseX = evt.clientX;
        mouseY = evt.clientY;

        drag_distance_prev = mouseX;

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
    
    function addImage(img_index = '1'){

    //Add image
    let img_width = 300, img_height;
    let baseURL = './data/'

    const img_plane = new Image();

    img_plane.src = baseURL + img_index + '.jpg'; 

    // texture variable &activation to update it
    const texture_plane = new THREE.Texture(img_plane);
    img_plane.onload = () => { 
        texture_plane.needsUpdate = true;
        img_height =  (img_plane.height / img_plane.width) * img_width;

        // plane to display
        const geometry_plane = new THREE.PlaneGeometry(img_width, img_height);
        const mesh_plane = new THREE.Mesh(geometry_plane,
        new THREE.MeshLambertMaterial({ map: texture_plane }))

        mesh_plane.position.set(0, 0, 10);
       
        img_group.add(mesh_plane);

        };
    }

    function dragDraw(mouseX){

        if ( Math.abs(mouseX - drag_distance_prev) > drag_distance_standard){

            //a<0 
            if (mouseX - drag_distance_prev <0){

                effectMoveLeft();
                
            }else{//a>0
                
                effectMoveRight();

            }

            //update
            drag_distance_prev = mouseX;
        }

    }

    function dragAction(deltaX, mouseX, object, object_follow) {
        
        if (Math.abs(deltaX)< MAXMOVE){
            object.position.x += deltaX / 1.2;
            object_follow.position.x += deltaX / 1.2;
        }

    
        dragDraw(mouseX)
    
        
    }

    function onKeyDown(e) {

        console.log('keydown!', e.keyCode)
        switch (e.keyCode) {
            case 37:  //arrow left 

                effectMoveLeft();

                break;
            case 39:  //arrow right

                effectMoveRight();

                break;
            default:
                break;
        }
    }

    function effectMoveLeft(){

                if (img_v<= 0){

                    if(img_index_new >1){
                         //add new image
                        img_v -- ;
                        img_index_new --;
                        addImage(img_index_new.toString())
                    }   

                }else{
                    if (img_group.children.length > 1){

                        img_v --;
                        img_index_new -= 1;
                        img_group.remove(img_group.children[img_group.children.length-1])}
                }


    }


    function effectMoveRight(){

                if (img_v>= 0){

                    if ( img_index_new < img_length){
                        img_v ++;
                        img_index_new =  Math.min(img_length, img_index_new+1);
                        addImage(img_index_new.toString())
                    }

                } else {

                    if (img_group.children.length > 1){
                        img_v ++;
                        img_index_new += 1;
                        img_group.remove(img_group.children[img_group.children.length-1])
                    }

                }
    }


}

