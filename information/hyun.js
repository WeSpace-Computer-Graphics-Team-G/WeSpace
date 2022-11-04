window.onload = function init() {
    const canvas = document.getElementById("gl-canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.setSize(canvas.width, canvas.height);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("skyblue");

    const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 1, 2000);
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

    // maple
    let particles;
    let positions = [], velocities = [];

    const numMapleflakes = 8000;
    const maxRange = 1000, minRange = maxRange / 2;
    const minHeight = 150;

    const geometry = new THREE.BufferGeometry();
    const TextureLoader = new THREE.TextureLoader();

    for (let i = 0; i < numMapleflakes; i++) {
        positions.push(Math.floor(Math.random() * maxRange - minRange), Math.floor(Math.random() * minRange - minHeight), Math.floor(Math.random() * maxRange - minRange));

        velocities.push(Math.floor(Math.random() * 6 - 3) * 0.1, Math.floor(Math.random() * 5 + 0.12) * 0.18, Math.floor(Math.random() * 6 - 3) * 0.1);
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('velocity', new THREE.Float32BufferAttribute(velocities, 3));


    const flakeMaterial = new THREE.PointsMaterial({
        size: 4,
        map: TextureLoader.load("hyun_src/maple.png"),
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true,
        opacity: 0.7,
    });

    particles = new THREE.Points(geometry, flakeMaterial);
    scene.add(particles);

    // name
    const loadText1 = new THREE.FontLoader();
    loadText1.load('sh_src/Do Hyeon_Regular.json', function (font) {
        const geometry = new THREE.TextGeometry('Name = Hyunseo', {
            font: font, size: 3, height: 0, curveSegments: 12

        });
        geometry.translate(0, 0, 0);
        var material = new THREE.MeshBasicMaterial({
            color: "blue", //wireframe: true
        });
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(-1200, 400, -900);
        mesh.scale.set(15, 15, 15);
        scene.add(mesh);
    });


    //text
    const loadText2 = new THREE.FontLoader();
    loadText2.load('sh_src/Do Hyeon_Regular.json', function (font) {
        const geometry = new THREE.TextGeometry('Major = software', {
            font: font, size: 3, height: 0, curveSegments: 12

        });
        geometry.translate(0, 0, 0);
        const material = new THREE.MeshBasicMaterial({
            color: "black", //wireframe: true
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(-1200, 300, -900);
        mesh.scale.set(15, 15, 15);
        scene.add(mesh);
    });

    //text
    const loadText3 = new THREE.FontLoader();
    loadText3.load('sh_src/Do Hyeon_Regular.json', function (font) {
        const geometry = new THREE.TextGeometry('Student ID = 201933375', {
            font: font, size: 3, height: 0, curveSegments: 12

        });
        geometry.translate(0, 0, 0);
        const material = new THREE.MeshBasicMaterial({
            color: "ash", //wireframe: true
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(-1200, 200, -900);
        mesh.scale.set(15, 15, 15);
        scene.add(mesh);
    });


    //text
    const loadText4 = new THREE.FontLoader();
    loadText4.load('sh_src/Do Hyeon_Regular.json', function (font) {
        const geometry = new THREE.TextGeometry('Hello, This is Hyun', {
            font: font, size: 8, height: 0, curveSegments: 12

        });
        geometry.translate(0, 0, 0);
        const material = new THREE.MeshBasicMaterial({
            color: "gray", //wireframe: true
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(-1500, 700, -900);
        mesh.scale.set(15, 15, 15);
        scene.add(mesh);
    });

    //text
    const loadText5 = new THREE.FontLoader();
    loadText5.load('sh_src/Do Hyeon_Regular.json', function (font) {
        const geometry = new THREE.TextGeometry('- A developer who is constantly looking for\na sense of accomplishment.\n - I\'m mainly responsible for server construction,\ndatabase construction, and backend', {
            font: font, size: 2, height: 0, curveSegments: 6

        });
        geometry.translate(0, 0, 0);
        const material = new THREE.MeshBasicMaterial({
            color: "#6E614D",
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(-1200, 100, -900);
        mesh.scale.set(15, 15, 15);
        scene.add(mesh);
    });

    //text
    const loadText6 = new THREE.FontLoader();
    loadText6.load('sh_src/Do Hyeon_Regular.json', function (font) {
        const geometry = new THREE.TextGeometry('- Email: danpung_2@naver.com \n - Blog: https://danpung2.tistory.com\n - Github: https://github.com/danpung2', {
            font: font, size: 2, height: 0, curveSegments: 6

        });
        geometry.translate(0, 0, 0);
        const material = new THREE.MeshBasicMaterial({
            color: "purple",
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(-1200, -200, -900);
        mesh.scale.set(15, 15, 15);
        scene.add(mesh);
    });

    // planet
    const loader = new THREE.GLTFLoader();
    loader.load('hyun_src/planet/scene.gltf', function (gltf) {
        planet = gltf.scene.children[0];
        planet.scale.set(100, 100, 100);
        planet.position.set(900, 250, -1000);
        scene.add(gltf.scene);
        animate();
    }, undefined, function (error) {
        console.error(error);
    });


    function animate() {
        renderer.render(scene, camera);

        if (camera.position.y <= 6) {
            camera.position.z -= 0.01;
            camera.position.y += 0.008;
            camera.rotation.x += 0.0003;
        }


        for (let i = 0; i < numMapleflakes * 3; i += 3) {
            particles.geometry.attributes.position.array[i] -= particles.geometry.attributes.velocity.array[i];
            particles.geometry.attributes.position.array[i + 1] -= particles.geometry.attributes.velocity.array[i + 1];
            particles.geometry.attributes.position.array[i + 1] -= particles.geometry.attributes.velocity.array[i + 2];

            if (particles.geometry.attributes.position.array[i + 1] < 0) {
                particles.geometry.attributes.position.array[i] = Math.floor(Math.random() * maxRange - minRange);
                particles.geometry.attributes.position.array[i + 1] = Math.floor(Math.random() * minRange - minHeight);
                particles.geometry.attributes.position.array[i + 2] = Math.floor(Math.random() * maxRange - minRange);
            }
        }
        particles.geometry.attributes.position.needsUpdate = true;

        window.requestAnimationFrame(animate);

    }

    animate();

}
