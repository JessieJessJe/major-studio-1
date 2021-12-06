
/* 
adapted from https://github.com/mrdoob/three.js/blob/master/examples/webgl_geometry_shapes.html
*/

export function DynamicShape(canvas, group){

    const extrudeSettings = { depth: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 2 };

    const circleRadius = 150;
    let circleShape = new THREE.Shape()
        .moveTo( 0, circleRadius )
        .quadraticCurveTo( circleRadius, circleRadius, circleRadius, 0 )
        .quadraticCurveTo( circleRadius, - circleRadius, 0, - circleRadius )
        .quadraticCurveTo( - circleRadius, - circleRadius, - circleRadius, 0 )
        .quadraticCurveTo( - circleRadius, circleRadius, 0, circleRadius );

	addLineShape( circleShape, extrudeSettings, 0x00f000, 0, 0, 10, 0, 0, 0, 1 );

    let points = circleShape.getSpacedPoints(26);

    function addLineShape( shape, extrudeSettings, color, x, y, z, rx, ry, rz, s ) {

        shape.autoClose = true;

        const points = shape.getPoints(4);
        const spacedPoints = shape.getSpacedPoints( 26 );

        const geometryPoints = new THREE.BufferGeometry().setFromPoints( points );
        const geometrySpacedPoints = new THREE.BufferGeometry().setFromPoints( spacedPoints );

                //dynamic update?
                // const position = geometryPoints.attributes.position;
                // position.usage = THREE.DynamicDrawUsage;
        
                // for ( let i = 0; i < position.count; i ++ ) {
        
                //     const y = 100 * Math.sin( i / 2 );
                //     position.setZ( i, y );
        
                // }

        //dashed line
        // const material = new THREE.LineDashedMaterial( {
        //     color: 0xffffff,
        //     linewidth: 1,
        //     scale: 1,
        //     dashSize: 3,
        //     gapSize: 100,
        // } );
        // let line = new THREE.Line( geometryPoints, material );

        //dashed line 2 
        let line = new THREE.Points( geometrySpacedPoints, new THREE.PointsMaterial( { color: 0xffffff, size: 5 } ) );

        //solid line
        // let line = new THREE.Line( geometryPoints, new THREE.LineBasicMaterial( { color: color } ) );


					line.position.set( x, y, z - 25 );
					line.rotation.set( rx, ry, rz );
					line.scale.set( s, s, s );
                    line.name = 'dynamicshape'
					group.add( line );


  

    }


      
    return points

}


