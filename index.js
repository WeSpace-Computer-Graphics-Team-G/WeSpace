import * as THREE from 'https://unpkg.com/three@0.138.3/build/three.module.js';
import {OrbitControls} from "https://threejs.org/examples/jsm/controls/OrbitControls.js";

class App {
    constructor() {
        const divContainer = document.querySelector("#webgl-container");
        this._divContainer = divContainer;

        const renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setPixelRatio(window.devicePixelRatio);
        divContainer.appendChild(renderer.domElement);
        this._renderer = renderer;

        const scene = new THREE.Scene();
        this._scene = scene;

        this._setupCamera();
        this._setupLight();
        this._setupModel();

        var controls = new OrbitControls(this._camera, renderer.domElement);

        window.onresize = this.resize.bind(this);
        this.resize();
        requestAnimationFrame(this.render.bind(this));

    }

    _setupCamera() {
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;
        const camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            100
        );
        // camera.position.z = 25;

        camera.position.set(0, 50, 0);
        camera.up.set(0, 0, 1);
        camera.lookAt(0, 0, 0);

        this._camera = camera;
    }

    _setupLight() {
        const color = 0xffffff;
        // const intensity = 3;
        // const light = new THREE.PointLight(color, intensity);
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        this._scene.add(light);

        // add ambient
        const ambientLight = new THREE.AmbientLight(0x404040);
        this._scene.add(ambientLight);
    }


    _setupModel() {
        const weSpace = new THREE.Object3D();
        this._scene.add(weSpace);

        const radius = 1;
        const widthSegments = 24;
        const heightSegments = 24;
        const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

        const centerOrbit = new THREE.Object3D();
        weSpace.add(centerOrbit);

        const sunMaterial = new THREE.MeshPhongMaterial({
            // emissive: 0xffff00, flatShading: true
            map: THREE.ImageUtils.loadTexture('./image/sun.png')
        });

        const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
        sunMesh.scale.set(5, 5, 5);
        weSpace.add(sunMesh);

        //kyounghoon-------------------------------------------------------------------
        //----------------------------------------------------------------------------
        //basic_plant
        const hoonOrbit = new THREE.Object3D();
        weSpace.add(hoonOrbit);

        const hoonMaterial = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('./image/puple_basic.png')
        });

        const hoonMesh = new THREE.Mesh(sphereGeometry, hoonMaterial);
        hoonMesh.scale.set(5, 5, 5);
        hoonOrbit.position.x = 20;
        hoonOrbit.add(hoonMesh);

        //blueStar
        const hoonOrbit2 = new THREE.Object3D();
        weSpace.add(hoonOrbit2);

        const hoonMaterial2 = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('./image/star.png'),
            transparent: true,
            side: THREE.DoubleSide
        });

        const hoonMesh2 = new THREE.Mesh(sphereGeometry, hoonMaterial2);
        hoonMesh2.scale.set(5.05, 5.05, 5.05);
        hoonOrbit2.position.x = 20;
        hoonOrbit2.add(hoonMesh2);

        //musical notes circle
        const hoonOrbit3 = new THREE.Object3D();
        weSpace.add(hoonOrbit3);

        const hooncircle = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('./image/music_circle2.png'),
            opacity: 0.7,
            transparent: true,
            side: THREE.DoubleSide,
        });

        const hoonMesh3 = new THREE.Mesh(sphereGeometry, hooncircle);
        hoonMesh3.scale.set(7, 7, 7);
        hoonOrbit3.position.x = 20;
        hoonOrbit3.add(hoonMesh3);
        //-----------------------------------------------------------------------------

        //minPlanet-----------------------------------------------------------------
        //-------------------------------------------------------------------------
        //basic
        const minOrbit = new THREE.Object3D();
        weSpace.add(minOrbit);

        const minMaterial = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('./image/mint_basic.png')
        });

        const minMesh = new THREE.Mesh(sphereGeometry, minMaterial);
        minMesh.scale.set(5, 5, 5);
        minOrbit.position.x = 40;
        minOrbit.add(minMesh);

        //mint circle1
        const minCircle = new THREE.Object3D();
        weSpace.add(minCircle);

        const mincircle = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('./image/mint_circle1.png'),
            transparent: true,
            side: THREE.DoubleSide,
        });

        const minCircleMesh1 = new THREE.Mesh(sphereGeometry, mincircle);
        minCircleMesh1.scale.set(5.05, 5.05, 5.05);
        minCircle.position.x = 40;
        minCircle.add(minCircleMesh1);

        //mint circle2
        const minCircle2 = new THREE.Object3D();
        weSpace.add(minCircle2);

        const mincircle2 = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('./image/mint_circle2.png'),
            transparent: true,
            side: THREE.DoubleSide,
        });

        const minCircleMesh2 = new THREE.Mesh(sphereGeometry, mincircle2);
        minCircleMesh2.scale.set(5.1, 5.1, 5.1);
        minCircle2.position.x = 40;
        minCircle2.add(minCircleMesh2);

        //mint circle3
        const minCircle3 = new THREE.Object3D();
        weSpace.add(minCircle3);

        const mincircle3 = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('./image/mint_circle3.png'),
            transparent: true,
            side: THREE.DoubleSide,
        });

        const minCircleMesh3 = new THREE.Mesh(sphereGeometry, mincircle3);
        minCircleMesh3.scale.set(5.15, 5.15, 5.15);
        minCircle3.position.x = 40;
        minCircle3.add(minCircleMesh3);

        //------------------------------------------------------------------


        //shPlanet-----------------------------------------------------------------
        //-------------------------------------------------------------------------
        //basic
        const shOrbit = new THREE.Object3D();
        weSpace.add(shOrbit);

        const shMaterial = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('./image/sh_basic.png')
        });

        const shMesh = new THREE.Mesh(sphereGeometry, shMaterial);
        shMesh.scale.set(5, 5, 5);
        shOrbit.position.x = 60;
        shOrbit.add(shMesh);


        //yellow circle
        const shOrbit2 = new THREE.Object3D();
        weSpace.add(shOrbit2);

        const shcircle = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('./image/sh_circle1.png'),
            opacity: 0.7,
            transparent: true,
            side: THREE.DoubleSide,
        });

        const shMesh2 = new THREE.Mesh(sphereGeometry, shcircle);
        shMesh2.scale.set(7, 7, 7);
        shOrbit2.position.x = 60;
        shOrbit2.add(shMesh2);

        //blue star
        const shOrbit3 = new THREE.Object3D();
        weSpace.add(shOrbit3);

        const shcircle3 = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('./image/sh_circle2.png'),
            opacity: 0.7,
            transparent: true,
            side: THREE.DoubleSide,
        });

        const shMesh3 = new THREE.Mesh(sphereGeometry, shcircle3);
        shMesh3.scale.set(7, 7, 7);
        shOrbit3.position.x = 60;
        shOrbit3.add(shMesh3);

        //hyun planet-----------------------------------------------------------------
        //-------------------------------------------------------------------------
        // basic
        const hyunOrbit = new THREE.Object3D();
        weSpace.add(hyunOrbit);

        const hyunMaterial = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('./image/hyun_basic.jpeg')
        });

        const hyunMesh = new THREE.Mesh(sphereGeometry, hyunMaterial);
        hyunMesh.scale.set(1.5, 1.5, 1.5);
        hyunOrbit.position.x = 10;
        hyunOrbit.add(hyunMesh);


        // yellow circle
        const hyunOrbit2 = new THREE.Object3D();
        weSpace.add(hyunOrbit2);

        const hyunCircle = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('./image/hyun_circle1.png'),
            opacity: 0.7,
            transparent: true,
            side: THREE.DoubleSide,
        });

        const hyunMesh2 = new THREE.Mesh(sphereGeometry, hyunCircle);
        hyunMesh2.scale.set(3, 3, 3);
        hyunOrbit2.position.x = 10;
        hyunOrbit2.add(hyunMesh2);


        //------------------------------------------------------------------

        this._weSpace = weSpace;
        //kyounghoon
        this._hoonOrbit = hoonOrbit;
        this._hoonOrbit2 = hoonOrbit2;
        this._hoonOrbit3 = hoonOrbit3;

        //min-----------------------------------------
        this._minOrbit = minOrbit;
        this._minCircle = minCircle;
        this._minCircle2 = minCircle2;
        this._minCircle3 = minCircle3;

        //sh-----------------------------------------
        this._shOrbit = shOrbit;
        this._shOrbit2 = shOrbit2;
        this._shOrbit3 = shOrbit3;

        // hyun-----------------------------------------
        this._hyunOrbit = hyunOrbit;
        this._hyunOrbit2 = hyunOrbit2;

    }

    resize() {
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();

        this._renderer.setSize(width, height);
    }

    render(time) {
        this._renderer.render(this._scene, this._camera);
        this.update(time);
        requestAnimationFrame(this.render.bind(this));
    }

    update(time) {
        time *= 0.001

        this._weSpace.rotation.y = time / 2;

        //kyounghoon rotation
        this._hoonOrbit.rotation.y += 0.0005;
        this._hoonOrbit2.rotation.y += 0.005;
        this._hoonOrbit3.rotation.y -= 0.0005;

        // min rotaion
        this._minCircle.rotation.y -= 0.0008;
        this._minCircle2.rotation.y += 0.0008;
        this._minCircle3.rotation.y -= 0.0008;

        // sh rotation
        this._shOrbit.rotation.y += 0.001;
        this._shOrbit2.rotation.y += 0.001;
        this._shOrbit3.rotation.y += 0.0005;

        // sh rotation
        this._hyunOrbit.rotation.y += 0.003;
        this._hyunOrbit2.rotation.y += 0.005;
    }

}

window.onload = function () {
    new App();
}