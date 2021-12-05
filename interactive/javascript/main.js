
import {OrbitControls} from './OrbitControls.js';

let mydata = [{ "info": { "id":1, "imgurl":"1", "name":"a poster", "time": 1990, "institute":"Cooper Hewitt", "theme": "Design" }, "time": { "left":[{ "id":2, "imgurl":"2", "name":"another poster", "time": 1980, "institute":"Cooper Hewitt", "theme": "Design"}], "right":[{ "id":3, "imgurl":"3", "name":"aaa poster", "time": 1995, "institute":"Cooper Hewitt", "theme": "Design" }] }, "institute":{ "left":[{ "id":6, "imgurl":"6", "name":"placeholder", "time": 1990, "institute":"Cooper Hewitt", "theme": "Design" }], "right":[{ "id":7, "imgurl":"7", "name":"placeholder", "time": 1990, "institute":"Cooper Hewitt", "theme": "Design" }] }, "theme":{ "left":[{ "id":4, "imgurl":"6", "name":"themeholder", "time": 1990, "institute":"Cooper Hewitt", "theme": "Design" }], "right":[{ "id":5, "imgurl":"7", "name":"themeholder", "time": 1990, "institute":"Cooper Hewitt", "theme": "Design" }] } },{ "info": { "id":2, "imgurl":"2", "name":"another poster", "time": 1980, "institute":"Cooper Hewitt", "theme": "Design" }, "time": { "left":[{ "id":4, "imgurl":"4", "name":"a poster", "time": 1970, "institute":"Cooper Hewitt", "theme": "Design" }], "right":[{ "id":1, "imgurl":"1", "name":"a poster", "time": 1990, "institute":"Cooper Hewitt", "theme": "Design" }] }, "institute":{ "left":[{ "id":6, "imgurl":"6", "name":"placeholder", "time": 1990, "institute":"Cooper Hewitt", "theme": "Design" }], "right":[{ "id":7, "imgurl":"7", "name":"placeholder", "time": 1990, "institute":"Cooper Hewitt", "theme": "Design" }] }, "theme":{ "left":[{ "id":6, "imgurl":"6", "name":"themeholder", "time": 1990, "institute":"Cooper Hewitt", "theme": "Design" }], "right":[{ "id":7, "imgurl":"7", "name":"themeholder", "time": 1990, "institute":"Cooper Hewitt", "theme": "Design" }] } },{ "info": { "id":3, "imgurl":"3", "name":"aaa poster", "time": 1995, "institute":"Cooper Hewitt", "theme": "Design" }, "time": { "left":[{ "id":1, "imgurl":"1", "name":"a poster", "time": 1990, "institute":"Cooper Hewitt", "theme": "Design" }], "right":[{ "id":5, "imgurl":"5", "name":"a poster", "time": 2000, "institute":"Cooper Hewitt", "theme": "Design" }] }, "institute":{ "left":[{ "id":6, "imgurl":"6", "name":"placeholder", "time": 1990, "institute":"Cooper Hewitt", "theme": "Design" }], "right":[{ "id":7, "imgurl":"7", "name":"placeholder", "time": 1990, "institute":"Cooper Hewitt", "theme": "Design" }] }, "theme":{ "left":[{ "id":6, "imgurl":"6", "name":"themeholder", "time": 1990, "institute":"Cooper Hewitt", "theme": "Design" }], "right":[{ "id":7, "imgurl":"7", "name":"themeholder", "time": 1990, "institute":"Cooper Hewitt", "theme": "Design" }] } }]

let metadata = [ { "id":1, "imgurl":"1", "name":"a poster", "time": 1990, "institute":"Cooper Hewitt", "theme": "Design" }, { "id":2, "imgurl":"2", "name":"another poster", "time": 1980, "institute":"Cooper Hewitt", "theme": "Design" }, { "id":3, "imgurl":"3", "name":"aaa poster", "time": 1995, "institute":"Cooper Hewitt", "theme": "Design" }, { "id":4, "imgurl":"4", "name":"a poster", "time": 1970, "institute":"Cooper Hewitt", "theme": "Design" }, { "id":5, "imgurl":"5", "name":"aa poster", "time": 1970, "institute":"Cooper Hewitt", "theme": "Design" }, { "id":6, "imgurl":"6", "name":"aaa poster", "time": 1970, "institute":"Cooper Hewitt", "theme": "Design" }, { "id":7, "imgurl":"7", "name":"aaaa poster", "time": 1970, "institute":"Cooper Hewitt", "theme": "Design" } ]

let state = {
    id: '1',
    dimention: 'time',
    index: 2
}

let axislist = [
    {index: 1, dimention:'institute'}, {index:2, dimention:'time'}, {index:3, dimention:'theme'}
]

let camera_z_original = 1000;

function main() {


// all the initialization
const canvas = document.querySelector('#threejs-canvas');

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener( 'resize', onWindowResize );
window.addEventListener("mousemove", onMouseMove, false);

document.querySelectorAll('.direction-class').forEach(item => {
    item.addEventListener('click', function(){
      //handle click
      var index = this.getAttribute("data-index");

      //do nothing if 'search' clicked
      if (index && index != state.index){

        var prev_index = state.index;
        var axis = axislist.find( (axis) => axis.index == index);
                
        state.index = index;
        state.dimention = axis.dimention;

        directionAnimation(prev_index)}

      }
    )
  })


var scene = new THREE.Scene();

//Add ambient light to make the scene more light
const light = new THREE.AmbientLight( 0xffffff ); // soft white light

//set up group
let group = new THREE.Group();
scene.add(group)

    let img_group = new THREE.Group();
    group.add(img_group);

    let arrow_group = new THREE.Group();
    group.add(arrow_group);

//Add image
let baseURL = './data/'



function drawSingleImage(image, x = 0, y = 0, z = 10, img_width = 150, name = 'main', radians = updateRadians(), index = state.index){

  
    let groupname = (name == 'main')? 'main' : (index + name)
    console.log(groupname)

    const img_plane = new Image();
    img_plane.src = baseURL + parseInt(image.imgurl) + '.jpg'; 

    // texture variable &activation to update it
    const texture_plane = new THREE.Texture(img_plane);
    img_plane.onload = () => { 
        texture_plane.needsUpdate = true;
        let img_height =  (img_plane.height / img_plane.width) * img_width;

        // plane to display
        const geometry_plane = new THREE.PlaneGeometry(img_width, img_height);
        const mesh_plane = new THREE.Mesh(geometry_plane,
        new THREE.MeshLambertMaterial({ map: texture_plane }))

        mesh_plane.position.set(x, y, z);
        mesh_plane.rotation.set(0, radians,0)
        mesh_plane.name = groupname + 'image';

        img_group.add(mesh_plane)

    };
}

function drawImage(state){

    img_group.clear()
    let x, y, z; 

    //main image
    let main_image = metadata.find( ({ id }) => id == state.id);
    drawSingleImage(main_image)

    //get neighbor info
    let neighbors = mydata.find( (d) => d.info.id == state.id);
    if (neighbors != undefined){

        axislist.forEach(axis =>{

            let size = (axis.index == state.index)? 150 : 15; 
       
            //left
            if (neighbors[axis['dimention']]['left'] != undefined){
                neighbors[axis['dimention']]['left'].forEach( (d, i) =>{

                    let img = metadata.find( ({ id }) => id == d.id);         

                    [x,y,z] = getXYZ(i-1, updateRadians(axis.index), size)

                    drawSingleImage(img, x, y, z, size, 'left', updateRadians(axis.index), axis.index)
                    // drawSingleImage(img, (i-1) * 300, 0, 10, 150, 'left', updateRadians(axis.index))
                })
            }
            
            //right
            if (neighbors[axis['dimention']]['right'] != undefined){

                neighbors[axis['dimention']]['right'].forEach( (d, i) =>{

                    let img = metadata.find( ({ id }) => id == d.id);

                    [x,y,z] = getXYZ(i+1, updateRadians(axis.index), size)

                    drawSingleImage(img, x, y, z, size, 'right', updateRadians(axis.index), axis.index)
                    // drawSingleImage(img, (i+1) * 300, 0, 10, 150, 'right', updateRadians(axis.index))
                })
            } 

        })
    }   
  
}

function getXYZ(i, radians, size){

    let r = (size == 150)? 300 : 500;

    let quaternion = new THREE.Quaternion();
    quaternion.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), radians );

    let vector = new THREE.Vector3( r*i, 0, 10 );
    vector.applyQuaternion( quaternion );

    return [vector.x, vector.y, vector.z]
    // x: camera_z_original * (Math.sin(radians)), y: 0, z: camera_z_original * (Math.cos(radians)) 
}

function updateImageAnimation(size = 150, index){

    let x1, x2, y1, y2, z1, z2;
    let factor = (index == 2)? 1 : 10;
    let scale = (size == 150)? factor : (factor/10);

    if (index ==150){
        //zoom in -> animate position first

        [x1, y1, z1] = getXYZ( -1, updateRadians(index), size);

        createjs.Tween
        .get(img_group.getObjectByName( index + "leftimage" ).position, { loop: false })
        .wait(1500)
        .to({ x:x1, y:y1, z:z1 }, 500, createjs.Ease.getBackOut(0.5));

        createjs.Tween
        .get(img_group.getObjectByName( index + "leftimage" ).scale, { loop: false })
        .wait(500)
        .to({ x:scale, y:scale}, 500, createjs.Ease.getBackOut(0.5));

        [x2, y2, z2] = getXYZ( 1, updateRadians(index), size)

        createjs.Tween
        .get(img_group.getObjectByName( index + "rightimage" ).position, { loop: false })
        .wait(1500)
        .to({ x:x2, y:y2, z:z2 }, 500, createjs.Ease.getBackOut(0.5));

        createjs.Tween
        .get(img_group.getObjectByName( index + "rightimage" ).scale, { loop: false })
        .wait(500)
        .to({ x:scale, y:scale}, 500, createjs.Ease.getBackOut(0.5));


    }
    else{
        //zoom out -> animate scale first

        [x1, y1, z1] = getXYZ( -1, updateRadians(index), size);

        createjs.Tween
        .get(img_group.getObjectByName( index + "leftimage" ).scale, { loop: false })

        .to({ x:scale, y:scale}, 500, createjs.Ease.getBackOut(0.5));

        createjs.Tween
        .get(img_group.getObjectByName( index + "leftimage" ).position, { loop: false })
        .wait(500)
        .to({ x:x1, y:y1, z:z1 }, 500, createjs.Ease.getBackOut(0.5));


        [x2, y2, z2] = getXYZ( 1, updateRadians(index), size)

        createjs.Tween
        .get(img_group.getObjectByName( index + "rightimage" ).scale, { loop: false })
        .to({ x:scale, y:scale}, 500, createjs.Ease.getBackOut(0.5));

        createjs.Tween
        .get(img_group.getObjectByName( index + "rightimage" ).position, { loop: false })
        .wait(500)
        .to({ x:x2, y:y2, z:z2 }, 500, createjs.Ease.getBackOut(0.5));

    }


  

    
}

function updateImage2(prev_index){

    axislist.forEach( axis => {

       
        if (axis.index == state.index){
             //main view
            updateImageAnimation(150, axis.index)

        }else if (axis.index == prev_index){

            updateImageAnimation(50, prev_index)

        }
    })
}

function updateImage(left_or_right = 'left'){

   
     if (left_or_right == 'left'){

        createjs.Tween
        .get(img_group.getObjectByName( state.index + "leftimage" ).position, { loop: false })
        .to({ x:0, y:0, z:11 }, 500, createjs.Ease.getBackOut(0.5));

        createjs.Tween
        .get(img_group.getObjectByName( state.index + "leftimage" ).scale, { loop: false })
        .to({ x:2, y:2}, 500);


        createjs.Tween
        .get(img_group.getObjectByName( "mainimage" ).position, { loop: false })
        .to({ x:300, y:0, z:11 }, 500, createjs.Ease.getBackOut(0.5));

        createjs.Tween
        .get(img_group.getObjectByName( "mainimage" ).scale, { loop: false })
        .to({ x:1/2, y:1/2}, 500)
        .call(function(evt){
            drawImage(state)
        });
        
    } else {

        createjs.Tween
        .get(img_group.getObjectByName( "mainimage" ).position, { loop: false })
        .to({ x:-300, y:0, z:11 }, 500, createjs.Ease.getBackOut(0.5));

        createjs.Tween
        .get(img_group.getObjectByName( "mainimage" ).scale, { loop: false })
        .to({ x:1/2, y:1/2, z:0 }, 500);

        createjs.Tween
        .get(img_group.getObjectByName( state.index + "rightimage" ).position, { loop: false })
        .to({ x:0, y:0, z:11 }, 500, createjs.Ease.getBackOut(0.5));

        createjs.Tween
        .get(img_group.getObjectByName( state.index + "rightimage" ).scale, { loop: false })
        .to({ x:2, y:2}, 500)
        .call(function(evt){
            drawImage(state)
        });

    }

}

//init drawing
drawImage(state);


function drawArrow(arrow_z=1){

        //drawing left arrow
        let geometry_left_line = new THREE.BufferGeometry();
        let geometry_left_up = new THREE.BufferGeometry();
        let geometry_left_down = new THREE.BufferGeometry();

        let vertices_left_line = [
            0.0,  0.0,  1.0,
            -500.0,  0.0,  1.0
        ]

        let vertices_left_up = [
            -450.0,  50.0,  1.0,
            -500.0,  0.0,  1.0
        ]

        let vertices_left_down = [
            -450.0,  -50.0,  1.0,
            -500.0,  0.0,  1.0
        ]

        geometry_left_line.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices_left_line, 3 ) );
        geometry_left_up.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices_left_up, 3 ) );
        geometry_left_down.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices_left_down, 3 ) );

        const material = new THREE.LineBasicMaterial( {
            color: 0xffffff,
            linewidth: 1,
        })

        let leftarrow = new THREE.Object3D();
        leftarrow.name = "leftarrow"

        leftarrow.add(new THREE.Line( geometry_left_line, material ))
        leftarrow.add(new THREE.Line( geometry_left_up, material ))
        leftarrow.add(new THREE.Line( geometry_left_down, material ))



        let rightarrow = new THREE.Object3D(); 
        rightarrow.name = "rightarrow"
        rightarrow = leftarrow.clone();
        rightarrow.rotation.set(0, 0, Math.PI);


        let arrow = new THREE.Object3D();
        arrow.name = "arrow";
        arrow.add(leftarrow);
        arrow.add(rightarrow)

        arrow.position.z = arrow_z;

        arrow_group.add(arrow)
}
 
drawArrow();


const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 4000 );

camera.position.set(0, 0, camera_z_original);
camera.rotation.set(0, 0, 0)

scene.add(camera);
scene.add(light);

function updateState_Image(left_or_right = 'left'){
    
        let prev_neighbors = mydata.find( (d) => d.info.id == state.id);
        
        if (prev_neighbors != undefined){

            if (prev_neighbors[state.dimention][left_or_right] != undefined){
                let id_to_confirm = prev_neighbors[state.dimention][left_or_right][0].id;

                let neighbors = mydata.find( (d) => d.info.id == id_to_confirm);

                if (neighbors != undefined){
                    state.id = id_to_confirm;
                    updateImage(left_or_right);
                }
                
            }  
        }
}

function myDragControls(){

    let MAXMOVE = 200;
    let drag_distance_standard = 100, drag_distance_current = 0, drag_distance_prev = 0;

    /*
        Adapted from:: 
        Custom Reusable Drag Code
        Dan Ellis 2020
    */

    let originX = 0;

    var mouseDown = false,
        mouseX = 0,
        mouseY = 0;

    renderer.domElement.addEventListener('mousemove', function (evt) {
        
        if (mouseDown){

            evt.preventDefault();
            var deltaX = evt.clientX - mouseX,
                deltaY = evt.clientY - mouseY;
            mouseX = evt.clientX;
            mouseY = evt.clientY;
            

            if (Math.abs(mouseY - window.innerHeight/2) > 200){
                dragActionEnd();
            } else {
                dragAction(deltaX, mouseX);
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

        arrow_group.position.x = originX;
        
        // document.querySelector('#threejs-canvas').style.cursor = 'default';
    }

    function dragAction(deltaX, mouseX) {
        
        arrow_group.position.x += deltaX / 1.2;
       
        if ( Math.abs(mouseX - drag_distance_prev) > drag_distance_standard){

            //a<0 
            if (mouseX - drag_distance_prev <0){

                updateState_Image('left')
                
            }else{//a>0
                
                updateState_Image('right')
            }

            //update
            drag_distance_prev = mouseX;
        }
    }

    function onKeyDown(e) {

        switch (e.keyCode) {
            case 37:  //arrow left 

            updateState_Image('left')

                break;
            case 39:  //arrow right

            updateState_Image('right')

                break;
            default:
                break;
        }
    }


} // end of drag control function

myDragControls();

//Orbit controls
    let controls;

    controls = new OrbitControls( camera, renderer.domElement );


    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.1;

    controls.enablePan = false;
    controls.enableZoom = false;

    controls.screenSpacePanning = false;

    controls.minDistance = 150;
    controls.maxDistance = 1000;

    controls.maxPolarAngle = Math.PI / 2;

//end of control

const raycaster = new THREE.Raycaster();

raycaster.params.Line.threshold = 1000;

//not working -- the whole ray castering thing...
function onMouseMove(event){

    const mouse2D = new THREE.Vector2();
    mouse2D.x= (event.clientX / window.innerWidth) * 2 - 1;
    mouse2D.y= -(event.clientY / window.innerHeight) * 2 - 1;

    raycaster.setFromCamera( mouse2D, camera );

    // calculate objects intersecting the picking ray
    let intersects = raycaster.intersectObjects( arrow_group, true);
    // let intersects = raycaster.intersectObjects( img_group, true);
    
    if (intersects[0]!= undefined){
        document.querySelector('#threejs-canvas').style.cursor = 'pointer';

        console.log(intersects)
    }
    else {
        document.querySelector('#threejs-canvas').style.cursor = 'default';
    }
        
    
}


function directionAnimation(prev_index){


        var radians = updateRadians();

        // animation
        createjs.Tween
            .get(arrow_group.rotation, { loop: false })
            .to({ y:radians}, 1500, createjs.Ease.getPowInOut(3));

        createjs.Tween
            .get(img_group.getObjectByName( "mainimage" ).rotation, { loop: false })
            .to({ y:radians}, 1500, createjs.Ease.getPowInOut(3));
 
    
        createjs.Tween
            .get(camera.rotation, { loop: false })
            .wait(1500)
            .to({y:radians}, 500, createjs.Ease.getPowOut(3));
    
        createjs.Tween 
            .get(camera.position)
            .wait(1500)
            .to({x: camera_z_original * (Math.sin(radians)), y: 0, z: camera_z_original * (Math.cos(radians)) }, 500, createjs.Ease.getPowOut(3))
            .call(function(Evt){
                updateImage2(prev_index);
            })

    
}

function update(){
    requestAnimationFrame( update );
    // controls.update(); 
    renderer.render( scene, camera );
   
}
    
update();

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    update();

}

}

main();

function updateRadians( index = state.index){
    return Math.PI / 6 * (index - 2)
}
