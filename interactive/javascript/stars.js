// https://redstapler.co/space-warp-background-effect-three-js/

export function DrawStar(scene){

    starGeo = new THREE.Geometry();
    for(let i=0;i<6000;i++) {
        let star = new THREE.Vector3(
        Math.random() * 600 - 300,
        Math.random() * 600 - 300,
        Math.random() * 600 - 300
      );
      starGeo.vertices.push(star);
    }

    let sprite = new THREE.TextureLoader().load( './style/smithsonian_logo_2.png' );

    let starMaterial = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 0.7,
      map: sprite
    });


    stars = new THREE.Points(starGeo,starMaterial);
    scene.add(stars);
    
}