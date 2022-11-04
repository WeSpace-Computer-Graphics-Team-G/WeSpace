
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

	//Basic--------------------------------------------------------------------------------
    var sphere = createSphere(radius, segments);
	sphere.rotation.y = rotation; 
	sphere.position.set(-5,0,0)
	scene.add(sphere)
	
	//Star around Basic-----------------------------------------------------------------------
    var sphereStar = createSphereStar(radius, segments);
	sphereStar.rotation.y = rotation;
	sphereStar.position.set(-5,0,0)
	scene.add(sphereStar)

	//Basic circle-------------------------------------------------------------------------
	var circle = createCircle(radius, segments);
	circle.rotation.y = rotation;
	circle.position.set(-5,0,0)
	scene.add(circle)

	//Dolphine 3D model -----------------------------------------------------------------------
	const loader = new THREE.GLTFLoader();
	loader.load('dolphing/scene.gltf',function(gltf){
		dolphine = gltf.scene.children[0];
		dolphine.scale.set(30,30,30);
		scene.add(gltf.scene);
		animate();
	}, undefined, function(error){
		console.error(error);
	});

	//Whale 3D model -----------------------------------------------------------------------
	const loader2 = new THREE.GLTFLoader();
	loader2.load('whale/scene.gltf',function(gltf){
		whale = gltf.scene.children[0];
		whale.scale.set(0.6,0.6,0.6);
		whale.position.set(0,5,5);
		scene.add(gltf.scene);
		animate();
	}, undefined, function(error){
		console.error(error);
	});

	//Cloud1 3D model -----------------------------------------------------------------------
	const loader3 = new THREE.GLTFLoader();
	loader3.load('stylized_clouds/scene.gltf',function(gltf){
		cloud = gltf.scene.children[0];
		cloud.scale.set(0.01,0.01,0.01);
		cloud.position.set(-6,-3,5);
		cloud.rotation.x = 5;
		cloud.rotation.y = rotation;
		scene.add(gltf.scene);
		animate();
	}, undefined, function(error){
		console.error(error);
	});

	//Cloud2 3D model -----------------------------------------------------------------------
	const loader4 = new THREE.GLTFLoader();
	loader4.load('stylized_clouds/scene.gltf',function(gltf){
		cloud2 = gltf.scene.children[0];
		cloud2.scale.set(0.01,0.01,0.01);
		cloud2.position.set(0,-3,-3);
		cloud2.rotation.x = rotation;
		cloud2.rotation.y = rotation;
		scene.add(gltf.scene);
		animate();
	}, undefined, function(error){
		console.error(error);
	});

	//Text model-----------------------------------------------------------------------
	const loadText1  = new THREE.FontLoader();
	loadText1.load('Do Hyeon_Regular.json',function(font){
		const geometry = new THREE.TextGeometry('Hello',{
			font: font,
			size:3,
			height:0,
			curveSegments:12
			
		});
		geometry.translate(3,4,0);

		var material = new THREE.MeshBasicMaterial({
			color : 0xffffff,
			wireframe: true
		});

	var mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);
	
	});

	//Text2 model-----------------------------------------------------------------------
    const loadText2  = new THREE.FontLoader();
	loadText2.load('Do Hyeon_Regular.json',function(font){
		const geometry = new THREE.TextGeometry('Student ID : 201735809\nName : 김경훈\nMajor : Software',{
			font: font,
			size:0.5,
			height:0,
			curveSegments:12,
			
		});
		geometry.translate(2,2.5,0);

		var material = new THREE.MeshBasicMaterial({
			color : 0xffffff,
		});

	var mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);
	
	});

	//Text3 model-----------------------------------------------------------------------
    const loadText3  = new THREE.FontLoader();
	loadText3.load('Do Hyeon_Regular.json',function(font){
		const geometry = new THREE.TextGeometry('Note :\n I made this planet with the motif of bubble\n This is designed with things that symbolize me',{
			font: font,
			size:0.4,
			height:0,
			curveSegments:12,
			
		});
		geometry.translate(2,-1,0);

		var material = new THREE.MeshBasicMaterial({
			color : 0xffffff,
		});

	var mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);
	
	});

	//Text4 model -----------------------------------------------------------------------
    const loadText4  = new THREE.FontLoader();
	loadText4.load('Do Hyeon_Regular.json',function(font){
		const geometry = new THREE.TextGeometry(' - Constellaion : I like to see the night sky\n - Musical note ring : I like to listen to music\n - Dolphine and Whale : My hobby is swimming\n - Clouds : It is somthing that relaxes my mind',{
			font: font,
			size:0.35,
			height:0,
			curveSegments:12,
			
		});
		geometry.translate(2,-3,0);

		var material = new THREE.MeshBasicMaterial({
			color : 0xffffff,
		});

	var mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);
	
	});

	//BackGround -----------------------------------------------------------------------
	var stars = createStars(90, 64);
	scene.add(stars);

	//Bubble -----------------------------------------------------------------------
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
		map: TextureLoader.load("../image/bubble.png"),
		blending: THREE.AdditiveBlending,
		depthTest:false,
		transparent:true,
		opacity: 0.7,
	 });
 
	particles = new THREE.Points(geometry,flakeMaterial);
	scene.add(particles);


	render();

	function render() {

		sphere.rotation.y -= 0.0005;
		sphereStar.rotation.y += 0.005;
		circle.rotation.y -= 0.0007;
		
		//Bubble -----------------------------------------------------------------------
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
				map:         THREE.ImageUtils.loadTexture('../image/puple_basic.png'),							
			})
		);
	}
	//function make star around basic -----------------------------------------------------------------------
	function createSphereStar(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius+0.05, segments, segments),			
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('../image/star.png'),
				transparent: true,
				side: THREE.DoubleSide
			})
		);		
	}
	//function make ring -----------------------------------------------------------------------
	function createCircle(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius + 3.5, segments, segments),			
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('../image/music_circle2.png'),
				opacity : 0.7,
				transparent: true,
				side : THREE.DoubleSide,
			})
		);		
	}
	//function make background -----------------------------------------------------------------------
	function createStars(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments), 
			new THREE.MeshBasicMaterial({
				map:  THREE.ImageUtils.loadTexture('../image/galaxy_starfield.png'), 
				side: THREE.BackSide
			})
		);
	}

	//Dolphine and Whale animate -----------------------------------------------------------------------
	function animate(time){
		time *=0.001;
		const speed = 1;
		const rot = time*speed;
		dolphine.position.x = Math.cos(rot)*4-5;
		dolphine.position.y = Math.sin(rot)*4;
		dolphine.rotation.y = -rot/1.03;

		whale.position.z = Math.cos(rot)*4;
		whale.position.x = Math.sin(rot)*4-5;
		whale.rotation.x = -rot/1.03;
		renderer.render(scene,camera);
		requestAnimationFrame(animate);
	}


}