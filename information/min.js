window.onload = function init() 
{
	const canvas = document.getElementById( "gl-canvas" );
	const renderer = new THREE.WebGLRenderer({canvas});
	const loadText1  = new THREE.FontLoader();
	const loader = new THREE.GLTFLoader();
	
	var radius   = 30,
		segments = 32,
		rotation = 6;

	var scene = new THREE.Scene();

	var camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 0.01, 1000);
	camera.position.z = 250;

	scene.add(new THREE.AmbientLight(0x333333));

	var light = new THREE.DirectionalLight(0xffffff, 0.8);
	light.position.set(0,0,5);
	scene.add(light);

	var sphere = createSphere(radius, segments);
	sphere.rotation.y = rotation;
	sphere.position.set(-40,0,0);
	scene.add(sphere);
 
	var clouds2 = createClouds2(radius, segments);
	clouds2.position.set(-40,0,0);
	clouds2.rotation.y = rotation;
	scene.add(clouds2);
 
	var clouds3 = createClouds3(radius, segments);
	clouds3.position.set(-40,0,0);
	clouds3.rotation.y = rotation;
	clouds3.rotation.x = rotation;
	scene.add(clouds3);
 
	var clouds4 = createClouds4(radius, segments);
	clouds4.position.set(-40,0,0);
	clouds4.rotation.y = rotation;
	clouds4.rotation.x = rotation;
	scene.add(clouds4);

	var material = new THREE.MeshBasicMaterial({
		color : 0xffffff,
	});

	loadText1.load('Do Hyeon_Regular.json',function(font){
		const geometry1 = new THREE.TextGeometry('Name : 김성민\n\nMajor : Software' 
		+ '\n\n ID : 201735815', {
			font: font,
			size:8,
			height:0,
			curveSegments:12		
		});
		geometry1.translate(-180,80,0);

		var mesh1 = new THREE.Mesh(geometry1, material);
		scene.add(mesh1);
	});

	loadText1.load('Do Hyeon_Regular.json',function(font){
		const geometry2 = new THREE.TextGeometry('Introduction', {
			font: font,
			size:22,
			height:0,
			curveSegments:12
		});
		geometry2.translate(40,-10,-200);

		var mesh2 = new THREE.Mesh(geometry2, material);
		scene.add(mesh2);
	});

	loadText1.load('Do Hyeon_Regular.json',function(font){
		const geometry3 = new THREE.TextGeometry('Nice to meet you! I like the mint color.\n'
		+ 'So I also decide to use mint as my personal color.\n' 
		+ 'Also, I love nature. So I add maple leaves and flowers.\n'
		+ 'Finally, the dinosaur is just cute, so I put it in.', {
			font: font,
			size:10,
			height:0,
			curveSegments:12
		});
		geometry3.translate(-5,-55,-200);

		var mesh3 = new THREE.Mesh(geometry3, material);
		scene.add(mesh3);
	});

	loadText1.load('Do Hyeon_Regular.json',function(font){
		const geometry3 = new THREE.TextGeometry('Thank you!!', {
			font: font,
			size:10,
			height:0,
			curveSegments:12
		});
		geometry3.translate(100,-90,0);

		var mesh3 = new THREE.Mesh(geometry3, material);
		scene.add(mesh3);
	});

	loader.load('../information/min_src/spaceship2/scene.gltf',function(gltf){
      spaceship = gltf.scene.children[0];
      spaceship.scale.set(0.03,0.03,0.03);
      spaceship.position.set(-100,0,-200);
      scene.add(gltf.scene);
      animate();
   }, undefined, function(error){
      console.error(error);
   });

   loader.load('../information/min_src/crystal_flowers/scene.gltf',function(gltf){
	  crystal = gltf.scene.children[0];
	  crystal.scale.set(0.2,0.2,0.2);
	  crystal.position.set(-160,-150,-50);
      scene.add(gltf.scene);
      animate();
   }, undefined, function(error){
      console.error(error);
   });

   loader.load('../information/min_src/milkyway/scene.gltf',function(gltf){
      galaxy = gltf.scene.children[0];
      galaxy.scale.set(1,1,1);
      galaxy.position.set(-100,0,0);
      scene.add(gltf.scene);
      animate();
   }, undefined, function(error){
      console.error(error);
   });

   loader.load('../information/min_src/crystal_flowers/scene.gltf',function(gltf){
      crystal2 = gltf.scene.children[0];
      crystal2.scale.set(0.4,0.4,0.4);
      crystal2.position.set(250,300,-200);
      scene.add(gltf.scene);
      animate();
   }, undefined, function(error){
      console.error(error);
   });

   loader.load('../information/min_src/cute_spino/scene.gltf',function(gltf){
      dino = gltf.scene.children[0];
	  dinoMesh = gltf.scene.children[3];
      dino.scale.set(25,25,25);
      dino.position.set(-20,18,0);
      scene.add(gltf.scene);
      animate();
   }, undefined, function(error){
      console.error(error);
   });



	render();

	function render() {
		clouds2.rotation.y -= 0.003;
		clouds3.rotation.y += 0.003;
		clouds4.rotation.y -= 0.003;
		requestAnimationFrame(render);
		renderer.render(scene, camera);
	 }

	function createSphere(radius, segments) {
		return new THREE.Mesh(
		   new THREE.SphereGeometry(radius, segments, segments),
		   new THREE.MeshPhongMaterial({
			  map:         THREE.ImageUtils.loadTexture('../image/mint_basic.png')                     
		   })
		);
	 }
  
	 function createClouds2(radius, segments) {
		return new THREE.Mesh(
		   new THREE.SphereGeometry(radius+1.2, segments, segments),         
		   new THREE.MeshPhongMaterial({
			  map:         THREE.ImageUtils.loadTexture('../image/mint_circle1.png'),
			  transparent: true,
			  side: THREE.DoubleSide
		   })
		);      
	 }
  
	 function createClouds3(radius, segments) {
		return new THREE.Mesh(
		   new THREE.SphereGeometry(radius+2, segments, segments),         
		   new THREE.MeshPhongMaterial({
			  map:         THREE.ImageUtils.loadTexture('../image/mint_circle2.png'),
			  transparent: true,
			  side: THREE.DoubleSide
		   })
		);      
	 }
  
	 function createClouds4(radius, segments) {
		return new THREE.Mesh(
		   new THREE.SphereGeometry(radius+3, segments, segments),         
		   new THREE.MeshPhongMaterial({
			  map:         THREE.ImageUtils.loadTexture('../image/mint_circle3.png'),
			  transparent: true,
			  side: THREE.DoubleSide
		   })
		);      
	 }


	function animate(time){
		dino.rotation.z = -1.73
		time *= 0.001;
		const speed = 0.3;
		const rot = time * speed;
		spaceship.position.x = Math.cos(rot) * 250-20;
		spaceship.position.y = Math.sin(rot) * 80;
		spaceship.rotation.z = 3.14;
		crystal2.rotation.y = -3.14;
		light.position.z = Math.cos(rot*2) * 100;
		light.position.y = Math.sin(rot*2) * 100;
		light.position.x = Math.cos(rot*2) * 100;

		renderer.render(scene,camera);
		requestAnimationFrame(animate);
	 }
}