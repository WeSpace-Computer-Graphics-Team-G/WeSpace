window.onload = function init() 
{
	const canvas = document.getElementById( "gl-canvas" );
	const renderer = new THREE.WebGLRenderer({canvas});
	
	// Planet params
	var radius   = 3,
		segments = 32,
		rotation = 6;  

	var scene = new THREE.Scene();

	var camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 0.01, 1000);
	camera.position.z = 30;

	scene.add(new THREE.AmbientLight(0x333333));

	var light = new THREE.DirectionalLight(0xffffff, 1);
	light.position.set(5,3,5);
	scene.add(light);

    var light2 = new THREE.DirectionalLight(0xffffff, 1.5);
	light2.position.set(0,3,10);
	scene.add(light2);


	//Basic--------------------------------------------------------------------------------
    var sphere = createSphere(radius, segments);
	sphere.rotation.y = rotation; 
	sphere.position.set(-5,0,0)
	scene.add(sphere)
	
	//Star around Basic-----------------------------------------------------------------------
    var sphereAround = createSphereAround(radius, segments);
	sphereAround.rotation.y = rotation;
	sphereAround.position.set(-5,0,0)
	scene.add(sphereAround)

    //Dragon 3D model -----------------------------------------------------------------------
	const loader = new THREE.GLTFLoader();
	loader.load('shenron_dragon_ball/scene.gltf',function(gltf){
		Dragon = gltf.scene.children[0];
		Dragon.scale.set(0.03,0.03,0.03);
        Dragon.position.set(-5,-17,-3)
		scene.add(gltf.scene);
		animate();
	}, undefined, function(error){
		console.error(error);
	});

    //THREEJS LOGO 3D model -----------------------------------------------------------------------
	loader.load('three.js/scene.gltf',function(gltf){
		threejs = gltf.scene.children[0];
		threejs.scale.set(0.025,0.025,0.025);
        threejs.position.set(5,-5,10)
		scene.add(gltf.scene);
		animate();
	}, undefined, function(error){
		console.error(error);
	});

    //BackGround -----------------------------------------------------------------------
	var stars = createBack(90, 64);
	scene.add(stars);

    //Text model-----------------------------------------------------------------------
	const loadText  = new THREE.FontLoader();
	loadText.load('Do Hyeon_Regular.json',function(font){
		const geometry = new THREE.TextGeometry('CLASS',{
			font: font,
			size:3,
			height:0,
			curveSegments:12
			
		});
		geometry.translate(1,4,0);

		var material = new THREE.MeshBasicMaterial({
			color : 0xff0000,
		});

	var mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);
	});

    //Text2 model -----------------------------------------------------------------
    loadText.load('Do Hyeon_Regular.json',function(font){
		const geometry = new THREE.TextGeometry('Class ID : 61407001\nClass Name : Computer Graphics\nProfessor : Prof.조정찬',{
			font: font,
			size:0.6,
			height:0,
			curveSegments:12,
			
		});
		geometry.translate(1,2.5,0);

		var material = new THREE.MeshBasicMaterial({
			color : 0xffffff,
		});

	var mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);
	});
     //Text3 model -----------------------------------------------------------------
     loadText.load('Do Hyeon_Regular.json',function(font){
		const geometry = new THREE.TextGeometry('With this course, students can:\n (1) learn fundamental theories and principles used\n for computer graphics.\n'+
        '(2) obtain practical OpenGL-based programming skills\n through a set of programming assignments and\n a term project.The prerequisite knowledge is linear\nalgebra including matrix and vector calculation\nand programing language, e.g., C or JavaScript.',{
			font: font,
			size:0.4,
			height:0,
			curveSegments:12,
			
		});
		geometry.translate(1,-1,0);

		var material = new THREE.MeshBasicMaterial({
			color : 0xffffff,
		});

	var mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);
	});
    //Textbox model -----------------------------------------------------------------
    loadText.load('Do Hyeon_Regular.json',function(font){
		const geometry = new THREE.TextGeometry('.',{
			font: font,
			size:0.2,
			height:0,
			curveSegments:0,
            bevelEnabled : true,
            bevelThickness : 0,
            bevelSize : 2.2,
            bevelOffset : 0,
            bevelSegments: 10
			
		});
		geometry.translate(8.5,-8.5,-3);

		var material = new THREE.MeshBasicMaterial({
			color : 0xffffff,
		});

	var mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);
	});


    //spark -----------------------------------------------------------------------
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
		map: TextureLoader.load("../image/sparke.png"),
		blending: THREE.AdditiveBlending,
		depthTest:false,
		transparent:true,
		opacity: 0.7,
	 });
 
	particles = new THREE.Points(geometry,flakeMaterial);
	scene.add(particles);

    render();

	function render() {
		sphere.rotation.y -= 0.005;
        sphereAround.rotation.y += 0.005;
        //Spark -----------------------------------------------------------------------
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

		requestAnimationFrame(render);
		renderer.render(scene, camera);
	}
	
	//fuction make basic -----------------------------------------------------------------------
	function createSphere(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('../image/sun.png'),							
			})
		);
	}
	//function make star around basic -----------------------------------------------------------------------
	function createSphereAround(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius+2, segments, segments),			
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('../image/sun_circle2.png'),
                opacity : 0.7,
				transparent: true,
				side: THREE.DoubleSide
			})
		);		
	}

    //function make background -----------------------------------------------------------------------
	function createBack(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments), 
			new THREE.MeshBasicMaterial({
				map:  THREE.ImageUtils.loadTexture('../image/galaxy_starfield.png'), 
				side: THREE.BackSide
			})
		);
	}

    //Dragon animate -----------------------------------------------------------------------
	function animate(time){
		time *=0.001;
		renderer.render(scene,camera);
		requestAnimationFrame(animate);
	}

}