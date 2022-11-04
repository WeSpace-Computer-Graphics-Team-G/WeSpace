window.onload = function init()
{
    const canvas = document.getElementById( "gl-canvas" );
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	const renderer = new THREE.WebGLRenderer({canvas});
	renderer.setSize(canvas.width,canvas.height);

	const scene = new THREE.Scene();
	scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 1, 2000);
    camera.position.z = 15;
    camera.position.y = 1;

    renderer.setPixelRatio(devicePixelRatio);
    document.body.appendChild(renderer.domElement);
    
    const backLight = new THREE.DirectionalLight(0xffffff, 1);
    backLight.position.set(0, 0, -1);
    scene.add(backLight);
    const frontLight = new THREE.DirectionalLight(0xffffff, 1);
    frontLight.position.set(0, 0, 1);
    scene.add(frontLight);

    //snow
    let particles;
    let positions =[], velocities = [];

    const numSnowflakes = 8000;
    const maxRange = 1000, minRange = maxRange/2;
    const minHeight = 150;
    
    const geometry = new THREE.BufferGeometry();
    const TextureLoader = new THREE.TextureLoader();

    for(let i =0; i<numSnowflakes; i++){
        positions.push(
            Math.floor(Math.random()*maxRange - minRange),
            Math.floor(Math.random()*minRange - minHeight),
            Math.floor(Math.random()*maxRange - minRange));

        velocities.push(
            Math.floor(Math.random()*6 -3)*0.1,
            Math.floor(Math.random()*5 +0.12)*0.18,
            Math.floor(Math.random()*6 -3)*0.1);
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions,3));
    geometry.setAttribute('velocity', new THREE.Float32BufferAttribute(velocities,3));


    const flakeMaterial = new THREE.PointsMaterial({
        size:4,
        map: TextureLoader.load("sh_src/snow2.png"),
        blending: THREE.AdditiveBlending,
        depthTest:false,
        transparent:true,
        opacity: 0.7,
    });

    particles = new THREE.Points(geometry,flakeMaterial);
    scene.add(particles);

    //name
    const loadText1  = new THREE.FontLoader();
        loadText1.load('sh_src/Do Hyeon_Regular.json',function(font){
        const geometry = new THREE.TextGeometry('Name = SangHyun',{
         font: font,
         size:4,
         height:0,
         curveSegments:12
         
     });
     geometry.translate(0,0,0);
     var material = new THREE.MeshBasicMaterial({
        color : 0xffffff,
        //wireframe: true
     });
       var mesh = new THREE.Mesh(geometry, material);
       mesh.position.set(-1000, 400, -900); 
       mesh.scale.set(15, 15, 15);
       scene.add(mesh);
       });


        //text
        const loadText3  = new THREE.FontLoader();
        loadText3.load('sh_src/Do Hyeon_Regular.json',function(font){
        const geometry = new THREE.TextGeometry('Major = software',{
        font: font,
        size:4,
        height:0,
        curveSegments:12
        
        });
        geometry.translate(0,0,0);
        var material = new THREE.MeshBasicMaterial({
            color : 0xff9933,
            //wireframe: true
        });
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(-1000, 300, -900); 
        mesh.scale.set(15, 15, 15);
        scene.add(mesh);
        });

         //text
         const loadText4  = new THREE.FontLoader();
         loadText4.load('sh_src/Do Hyeon_Regular.json',function(font){
         const geometry = new THREE.TextGeometry('Student ID = 202037030',{
         font: font,
         size:4,
         height:0,
         curveSegments:12
         
         });
         geometry.translate(0,0,0);
         var material = new THREE.MeshBasicMaterial({
             color : 0xcc99ff,
             //wireframe: true
         });
         var mesh = new THREE.Mesh(geometry, material);
         mesh.position.set(-1000, 200, -900); 
         mesh.scale.set(15, 15, 15);
         scene.add(mesh);
         });

                
            //text
            const loadText2  = new THREE.FontLoader();
            loadText2.load('sh_src/Do Hyeon_Regular.json',function(font){
            const geometry = new THREE.TextGeometry('Welcome',{
            font: font,
            size:8,
            height:0,
            curveSegments:12
            
        });
        geometry.translate(0,0,0);
        var material = new THREE.MeshBasicMaterial({
            color : 0x00cccc,
            //wireframe: true
        });
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(-250, 700, -900); 
        mesh.scale.set(15, 15, 15);
        scene.add(mesh);
        });

    //DOG
        const loader = new THREE.GLTFLoader();
        loader.load('sh_src/dog/scene.gltf', function(gltf){
        jupi = gltf.scene.children[0];
        jupi.scale.set(100,100,100);
        jupi.position.set(900, 250, -1000);
        scene.add(gltf.scene);
        animate();
        }, undefined, function (error) {
            console.error(error);
        });
        //ball
        const loader2 = new THREE.GLTFLoader();
        loader2.load('sh_src/ball/scene.gltf', function(gltf){
        ball = gltf.scene.children[0];
        ball.scale.set(90,90,90);
        ball.position.set(500, 500, -1100);
        scene.add(gltf.scene);
        animate();
        }, undefined, function (error) {
            console.error(error);
        });

         //notebook
         const loader3 = new THREE.GLTFLoader();
         loader3.load('sh_src/notebook/scene.gltf', function(gltf){
         nb = gltf.scene.children[0];
         nb.scale.set(90,90,90);
         nb.position.set(0, 400, -1100);
         scene.add(gltf.scene);
         animate();
         }, undefined, function (error) {
             console.error(error);
         });

         //ribon
         const radius = 3.5;  // ui: radius
         const tubeRadius = 1.5;  // ui: tubeRadius
         const radialSegments = 8;  // ui: radialSegments
         const tubularSegments = 64;  // ui: tubularSegments
         const p = 2;  // ui: p
         const q = 3;  // ui: q

         const geometry4 = new THREE.TorusKnotGeometry(
         radius, tubeRadius, tubularSegments, radialSegments, p, q);
         const planetTexture4 = new THREE.TextureLoader().load("sh_src/planetTexture.jpeg");
         const planetMaterial4 = new THREE.MeshPhongMaterial({
            map: planetTexture4,
            color : 0xff0000
         });
         const planetMesh4 = new THREE.Mesh(geometry4, planetMaterial4);
         scene.add(planetMesh4);

         planetMesh4.position.set(-600, 1400, -1700); 
         planetMesh4.scale.set(10.5, 10.5, 10.5);




    //earth 3
    const planetGeometry2 = new THREE.SphereGeometry( 10, 10, 10 );
    const planetTexture2 = new THREE.TextureLoader().load("sh_src/planetTexture.jpeg");
    const planetMaterial2 = new THREE.MeshPhongMaterial({
        map: planetTexture2
    });
    const planetMesh2 = new THREE.Mesh(planetGeometry2, planetMaterial2);
    scene.add(planetMesh2);

    planetMesh2.position.set(-2000, 1200, -1700); 
    planetMesh2.scale.set(10.5, 10.5, 10.5);

     //sun 3
     const planetGeometry3 = new THREE.SphereGeometry( 10, 10, 10 );
     const planetTexture3 = new THREE.TextureLoader().load("sh_src/sun.png");
     const planetMaterial3 = new THREE.MeshPhongMaterial({
         map: planetTexture3
     });
     const planetMesh3 = new THREE.Mesh(planetGeometry3, planetMaterial3);
     scene.add(planetMesh3);
 
     planetMesh3.position.set(1500, 1200, -1800); 
     planetMesh3.scale.set(15, 15, 15);

    //floor
    const planeGeometry = new THREE.PlaneGeometry(100, 100, 100, 200);
    const planeTexture = new THREE.TextureLoader().load("sh_src/sh_basic.png");
    
    const planeMaterial = new THREE.MeshPhongMaterial({
        map: planeTexture,
        side: THREE.DoubleSide,
        flatShading: THREE.FlatShading,
        vertexColors: true
    });
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    planeMesh.rotation.x -= 1.5;

    const color = [];
    for(let i = 0; i < planeMesh.geometry.attributes.position.count; i++){
        color.push(0.8, 0.7, 0.4);
    }

    const {array} = planeMesh.geometry.attributes.position;
    for(let i = 0; i < array.length; i += 3){
        const x = array[i];
        const y = array[i + 1];
        const z = array[i + 2];
        array[i + 2] = z + Math.random();
    }

    planeMesh.geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(color), 3));
    scene.add(planeMesh);


    function animate(){
        renderer.render(scene, camera);

        if(camera.position.y <= 6){
            camera.position.z -= 0.01;
            camera.position.y += 0.008;
            camera.rotation.x += 0.0003;
        }

        planetMesh2.rotation.x += 0.0001;
        planetMesh2.rotation.y += 0.007;
        planetMesh4.rotation.x += 0.001;
        planetMesh4.rotation.y += 0.07;
        ball.rotation.z += 0.005;
        jupi.rotation.y += 0.0011;
        nb.rotation.y += 0.005;
        nb.rotation.z += 0.005;

        for(let i = 0; i<numSnowflakes*3;i+=3){
            particles.geometry.attributes.position.array[i]-=particles.geometry.attributes.velocity.array[i];
            particles.geometry.attributes.position.array[i+1]-=particles.geometry.attributes.velocity.array[i+1];
            particles.geometry.attributes.position.array[i+1]-=particles.geometry.attributes.velocity.array[i+2];
    
            if(particles.geometry.attributes.position.array[i+1]<0){
                particles.geometry.attributes.position.array[i]= Math.floor(Math.random()*maxRange-minRange);
                particles.geometry.attributes.position.array[i+1]= Math.floor(Math.random()*minRange-minHeight);
                particles.geometry.attributes.position.array[i+2]= Math.floor(Math.random()*maxRange-minRange);
            }
        }
        particles.geometry.attributes.position.needsUpdate = true;

        window.requestAnimationFrame(animate);

    }
    animate();  

}
