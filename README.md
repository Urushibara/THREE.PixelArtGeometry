# Three.js PixelArtGeometry

THREE.PixelArtGeometry constructs a single geometry by providing a &lt;canvas&gt; element to extrude each of its pixels. The voxel corresponding to each pixel has the color and UV mapping of the original image.
The second argument is the depth, an integer, the third argument is true when using VertexColors.

## example

```Javascript

    let color_geo = new THREE.PixelArtGeometry( canvas, 1, true );

    let material = new THREE.MeshLambertMaterial({ vertexColors: THREE.FaceColors });

    let mesh1 = new THREE.Mesh(

        color_geo,

        material

    );

    scene.add(mesh1);



    let uvs_geo = new THREE.PixelArtGeometry( canvas, 1 );
    
    let texture = new THREE.TextureLoader().load( './mytexture.png' );
    texture.magFilter = THREE.NearestFilter;

    material = new THREE.MeshLambertMaterial({ map: texture, transparent: true, alphaTest: 0.5 });

    let mesh2 = new THREE.Mesh(

        uvs_geo,

        material

    );

    scene.add(mesh2);

```
