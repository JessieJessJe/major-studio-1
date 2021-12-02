
import {dragControls} from './drag.js';

let img_index = '5';
let img_length = 9;

function main() {

// all the initialization
const canvas = document.querySelector('#threejs-canvas');

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener( 'resize', onWindowResize );
window.addEventListener("mousemove", onMouseMove, false);


var scene = new THREE.Scene();

//Add ambient light to make the scene more light
const light = new THREE.AmbientLight( 0xffffff ); // soft white light

//Add image
let img_width = 300, img_height;
let baseURL = './data/'

const img_plane = new Image();
let img_group = new THREE.Group();
scene.add(img_group);

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

    img_group.add(mesh_plane)
    // scene.add(mesh_plane);

};


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

scene.add(arrow)
 
// scene.add(new THREE.Line(geometry, new THREE.LineBasicMaterial({
//     color: 0x0000ff
// })));

// just camera and light
// const camera = new THREE.OrthographicCamera(width / - 2, width / 2, 
// height / 2, height / - 2, 1, 10);
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 4000 );

camera.position.set(0, 0, 1000);

scene.add(camera);
scene.add(light);

// rendering function
function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
} 

render();

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    render();

}

dragControls(renderer.domElement,leftarrow, rightarrow, img_group, img_index, img_length)

const raycaster = new THREE.Raycaster();
const mouse2D = new THREE.Vector2();
raycaster.params.Line.threshold = 1000;

function onMouseMove(event){

   
    mouse2D.x= (event.clientX / window.innerWidth) * 2 - 1;
    mouse2D.y= -(event.clientY / window.innerHeight) * 2 - 1;

    raycaster.setFromCamera( mouse2D, camera );

    // calculate objects intersecting the picking ray
    // let intersects = raycaster.intersectObjects( [scene.getObjectByName("arrows")], true);
    let intersects = raycaster.intersectObjects( img_group, true);
    
    if (intersects[0]!= undefined){
        document.querySelector('#threejs-canvas').style.cursor = 'pointer';

        console.log(intersects)
    }
    else {
        document.querySelector('#threejs-canvas').style.cursor = 'default';
    }
        
    
}

    


}

main();

