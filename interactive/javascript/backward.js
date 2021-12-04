let back_standard = 200, initial_y=0, initial_z = 10;
let back_layer = false;
let back_prev = back_standard + initial_z - 9;


export function backward(scene,img_group, arrow_group){

    // initial_y = img_group.position.y;
    // initial_z = img_group.position.z;

    // document.addEventListener('wheel', showNext);

    function debounce(func, timeout = 100){
        let timer;
        return (...args) => {
          clearTimeout(timer);
          timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
      }

    function updateLayer(){

        if (back_layer){

            // if (img_group.position.z <= initial_z ) {
            //     img_group.position.z += 0.1; // You decide on the increment, higher value will mean the objects moves faster
            // }

            img_group.position.z = initial_z;
            img_group.position.y = initial_y;

           
           

            for (let arr in arrow_group.children){
                if (arr == 0){
                    arrow_group.children[0].position.z = 100;
                } else {
                    //not working.....?
                    arrow_group.children[arr].position.z = initial_z - 9;
                    arrow_group.children[arr].position.y = initial_y;
                }
                
            }
            arrow_group.remove( arrow_group.children[0])

        back_layer = false;

        
        }

        // requestAnimationFrame(updateLayer)
    }

    const processChange = debounce(() => updateLayer());

    function showNext(event){

        drawBackArrow(-back_prev, back_standard * 0.1)

        moveImage(event);
    }

    function moveImage(event){

        // event.preventDefault();
        let scaleZ, scaleY;

        if (back_layer){
            // scaleZ = event.deltaY * -0.1;
            // scaleY = event.deltaY * 0.01;
            processChange();         

        }else{
            scaleZ = event.deltaY * -1;
            scaleY = event.deltaY * 0.1;

                 // Apply scale transform
            img_group.position.z += scaleZ;
            img_group.position.y += scaleY;
        }


        // // Restrict scale
        // scale = Math.min(Math.max(.125, scale), 4);
    
   

        if ( Math.abs(img_group.position.z - initial_z) > back_standard){

            // back_prev += back_standard;
            // drawBackArrow(img_group.position.z, img_group.position.y)
            back_layer = true;
              

        }
        
        
        
    }




function drawBackArrow(arrow_z=1, arrow_y=0){

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
    arrow.position.y = arrow_y;

    arrow_group.add(arrow)
}
}

