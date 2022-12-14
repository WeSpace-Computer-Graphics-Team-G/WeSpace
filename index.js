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

        camera.position.set(0, 20, -70);
        camera.up.set(0, 0, 1);
        camera.lookAt(0, 0, 0);

        this._camera = camera;
    }

    _setupLight() {
        const color = 0xffffff;
        // const intensity = 3;
        // const light = new THREE.PointLight(color, intensity);
        const intensity = 0.5;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(3, 0, 0);
        this._scene.add(light);
        const light2 = new THREE.DirectionalLight(color, intensity);
        light2.position.set(-3, 0, 0);
        this._scene.add(light2);
        const light3 = new THREE.DirectionalLight(color, intensity);
        light3.position.set(0, -3, 0);
        this._scene.add(light2);
        const light4 = new THREE.DirectionalLight(color, intensity);
        light4.position.set(0, 3, 0);
        this._scene.add(light4);
        const light5 = new THREE.DirectionalLight(color, intensity);
        light5.position.set(0, 0, 3);
        this._scene.add(light5);
        const light6 = new THREE.DirectionalLight(color, intensity);
        light6.position.set(0, 0, -3);
        this._scene.add(light6);


        // add ambient
        const ambientLight = new THREE.AmbientLight(0x404040);
        this._scene.add(ambientLight);
    }


    _setupModel() {
         //particle
         const particlesGeometry = new THREE.BufferGeometry();
         let canvas = document.createElement("canvas");
         let ctx = canvas.getContext("2d");
         canvas.height = 100;
         canvas.width = 100;
         ctx.fillStyle = "#fff";
         ctx.beginPath();
         ctx.arc(50, 50, 25, 0, 2 * Math.PI);
         ctx.fill();
         const particlesmaterial = new THREE.PointsMaterial({
         size: 0.3,
         map: THREE.ImageUtils.loadTexture('./image/back_star.png'),
         transparent: true,
         });
         const particlesCnt = 2000;
         const posArray = new Float32Array(particlesCnt * 3);
         // xyz,xyz,xyz , xyz
         for (let i = 0; i < particlesCnt * 3; i++) {
         //posArray[i] = Math.random()
         //   posArray[i] = Math.random() - 0.5
         //   posArray[i] = (Math.random() - 0.5) * 5
         posArray[i] = (Math.random() - 0.5) * (Math.random() * 150);
         }
 
         particlesGeometry.setAttribute(
         "position",
         new THREE.BufferAttribute(posArray, 3)
         );
 
         const particlesMesh = new THREE.Points(particlesGeometry, particlesmaterial);
         this._scene.add(particlesMesh);


        const domEvents = new THREEx.DomEvents(this._camera, this._renderer.domElement);

        const sun = new THREE.Object3D();
        this._scene.add(sun);

        const hyun = new THREE.Object3D();
        this._scene.add(hyun);

        const hoon = new THREE.Object3D();
        this._scene.add(hoon);
        
        const min = new THREE.Object3D();
        this._scene.add(min);

        const sh = new THREE.Object3D();
        this._scene.add(sh);

        const radius = 1;
        const widthSegments = 24;
        const heightSegments = 24;
        const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

        const centerOrbit = new THREE.Object3D();
        sun.add(centerOrbit);

        const linkSun = 'information/class.html';
        const linkHoon = 'information/hoon.html';
        const linkMin = 'information/min.html';
        const linkSh = 'information/sh.html';
        const linkHyun = 'information/hyun.html';

        const sunScale = 10;

        const sunMaterial = new THREE.MeshPhongMaterial({
            // emissive: 0xffff00, flatShading: true
            map: THREE.ImageUtils.loadTexture('./image/sun.png')
        });

        const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
        sunMesh.scale.set(sunScale, sunScale, sunScale);
        sun.add(sunMesh);

        const sunCircleOrbit = new THREE.Object3D();
        sun.add(sunCircleOrbit);

        const sunCircleMaterial = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('./image/sun_circle2.png'),
            opacity: 0.9,
            transparent: true,
            side: THREE.DoubleSide,
        });

        const sunCircleMesh = new THREE.Mesh(sphereGeometry, sunCircleMaterial);
        sunCircleMesh.scale.set(sunScale + 2, sunScale + 2, sunScale + 2);
        sunCircleOrbit.add(sunCircleMesh);

        domEvents.addEventListener(sunMesh, 'click', event => {
            location.href = linkSun;
        })

        const hoonScale = 3;
        const hoonPosition = 35;

        const minScale = 2;
        const minPosition = 25;

        const shScale = 3;
        const shPosition = 47;

        const hyunScale = 1.5;
        const hyunPosition = 17;

        //kyounghoon-------------------------------------------------------------------
        //----------------------------------------------------------------------------
        //basic_plant
        const hoonOrbit = new THREE.Object3D();
        hoon.add(hoonOrbit);

        const hoonMaterial = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('./image/puple_basic.png')
        });

        const hoonMesh = new THREE.Mesh(sphereGeometry, hoonMaterial);
        hoonMesh.scale.set(hoonScale, hoonScale, hoonScale);
        hoonOrbit.position.x = hoonPosition;
        hoonOrbit.add(hoonMesh);
        
        // click event
        domEvents.addEventListener(hoonMesh, 'click', event => {
            location.href = linkHoon;
        })

        //blueStar
        const hoonOrbit2 = new THREE.Object3D();
        hoon.add(hoonOrbit2);

        const hoonMaterial2 = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('./image/star.png'),
            transparent: true,
            side: THREE.DoubleSide
        });

        const hoonMesh2 = new THREE.Mesh(sphereGeometry, hoonMaterial2);
        hoonMesh2.scale.set(hoonScale + 0.5, hoonScale + 0.5, hoonScale + 0.5);
        hoonOrbit2.position.x = hoonPosition;
        hoonOrbit2.add(hoonMesh2);

        //musical notes circle
        const hoonOrbit3 = new THREE.Object3D();
        hoon.add(hoonOrbit3);

        const hooncircle = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('./image/music_circle2.png'),
            opacity: 0.7,
            transparent: true,
            side: THREE.DoubleSide,
        });

        const hoonMesh3 = new THREE.Mesh(sphereGeometry, hooncircle);
        hoonMesh3.scale.set(hoonScale + 2, hoonScale + 2, hoonScale + 2);
        hoonOrbit3.position.x = hoonPosition;
        hoonOrbit3.add(hoonMesh3);
        //-----------------------------------------------------------------------------

        //minPlanet-----------------------------------------------------------------
        //-------------------------------------------------------------------------

        //basic
        const minOrbit = new THREE.Object3D();
        min.add(minOrbit);

        const minMaterial = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('./image/mint_basic.png')
        });

        const minMesh = new THREE.Mesh(sphereGeometry, minMaterial);
        minMesh.scale.set(minScale, minScale, minScale);
        minOrbit.position.x = minPosition;
        minOrbit.add(minMesh);

        // click event
        domEvents.addEventListener(minMesh, 'click', event => {
            location.href = linkMin;
        })

        //mint circle1
        const minCircle = new THREE.Object3D();
        min.add(minCircle);

        const mincircle = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('./image/mint_circle1.png'),
            transparent: true,
            side: THREE.DoubleSide,
        });

        const minCircleMesh1 = new THREE.Mesh(sphereGeometry, mincircle);
        minCircleMesh1.scale.set(minScale + 0.05, minScale + 0.05, minScale + 0.05);
        minCircle.position.x = minPosition;
        minCircle.add(minCircleMesh1);

        //mint circle2
        const minCircle2 = new THREE.Object3D();
        min.add(minCircle2);

        const mincircle2 = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('./image/mint_circle2.png'),
            transparent: true,
            side: THREE.DoubleSide,
        });

        const minCircleMesh2 = new THREE.Mesh(sphereGeometry, mincircle2);
        minCircleMesh2.scale.set(minScale + 0.1, minScale + 0.1, minScale + 0.1);
        minCircle2.position.x = minPosition;
        minCircle2.add(minCircleMesh2);

        //mint circle3
        const minCircle3 = new THREE.Object3D();
        min.add(minCircle3);

        const mincircle3 = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('./image/mint_circle3.png'),
            transparent: true,
            side: THREE.DoubleSide,
        });

        const minCircleMesh3 = new THREE.Mesh(sphereGeometry, mincircle3);
        minCircleMesh3.scale.set(minScale + 0.15, minScale + 0.15, minScale + 0.15);
        minCircle3.position.x = minPosition;
        minCircle3.add(minCircleMesh3);

        //------------------------------------------------------------------


        //shPlanet-----------------------------------------------------------------
        //-------------------------------------------------------------------------
        //basic
        const shOrbit = new THREE.Object3D();
        sh.add(shOrbit);

        const shMaterial = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('./image/sh_basic.png')
        });

        const shMesh = new THREE.Mesh(sphereGeometry, shMaterial);
        shMesh.scale.set(shScale, shScale, shScale);
        shOrbit.position.x = shPosition;
        shOrbit.add(shMesh);

        // click event
        domEvents.addEventListener(shMesh, 'click', event => {
            location.href = linkSh;
        })

        //yellow circle
        const shOrbit2 = new THREE.Object3D();
        sh.add(shOrbit2);

        const shcircle = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('./image/sh_circle1.png'),
            opacity: 0.7,
            transparent: true,
            side: THREE.DoubleSide,
        });

        const shMesh2 = new THREE.Mesh(sphereGeometry, shcircle);
        shMesh2.scale.set(shScale + 1.5, shScale + 1.5, shScale + 1.5);
        shOrbit2.position.x = shPosition;
        shOrbit2.add(shMesh2);

        //blue star
        const shOrbit3 = new THREE.Object3D();
        sh.add(shOrbit3);

        const shcircle3 = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('./image/sh_circle2.png'),
            opacity: 0.7,
            transparent: true,
            side: THREE.DoubleSide,
        });

        const shMesh3 = new THREE.Mesh(sphereGeometry, shcircle3);
        shMesh3.scale.set(shScale + 1.5, shScale + 1.5, shScale + 1.5);
        shOrbit3.position.x = shPosition;
        shOrbit3.add(shMesh3);

        //hyun planet-----------------------------------------------------------------
        //-------------------------------------------------------------------------
        // basic
        const hyunOrbit = new THREE.Object3D();
        hyun.add(hyunOrbit);

        const hyunMaterial = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('./image/hyun_basic.jpeg')
        });

        const hyunMesh = new THREE.Mesh(sphereGeometry, hyunMaterial);
        hyunMesh.scale.set(hyunScale, hyunScale, hyunScale);
        hyunOrbit.position.x = hyunPosition;
        hyunOrbit.add(hyunMesh);
        
        // click event
        domEvents.addEventListener(hyunMesh, 'click', event => {
            location.href = linkHyun;
        })

        // yellow circle
        const hyunOrbit2 = new THREE.Object3D();
        hyun.add(hyunOrbit2);

        const hyunCircle = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('./image/hyun_circle1.png'),
            opacity: 0.7,
            transparent: true,
            side: THREE.DoubleSide,
        });

        const hyunMesh2 = new THREE.Mesh(sphereGeometry, hyunCircle);
        hyunMesh2.scale.set(hyunScale + 1.5, hyunScale + 1.5, hyunScale + 1.5);
        hyunOrbit2.position.x = hyunPosition;
        hyunOrbit2.add(hyunMesh2);


        //------------------------------------------------------------------

        this._sun = sun;
        //kyounghoon
        this._hoon = hoon;
        this._hoonOrbit = hoonOrbit;
        this._hoonOrbit2 = hoonOrbit2;
        this._hoonOrbit3 = hoonOrbit3;

        //min-----------------------------------------
        this._min = min;
        this._minOrbit = minOrbit;
        this._minCircle = minCircle;
        this._minCircle2 = minCircle2;
        this._minCircle3 = minCircle3;

        //sh-----------------------------------------
        this._sh = sh;
        this._shOrbit = shOrbit;
        this._shOrbit2 = shOrbit2;
        this._shOrbit3 = shOrbit3;

        // hyun-----------------------------------------
        this._hyun = hyun;
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

        this._sun.rotation.y = time / 2;
        this._hyun.rotation.y = time / 1.5;
        this._hoon.rotation.y = time / 4;
        this._min.rotation.y = time / 3;
        this._sh.rotation.y = time / 3;

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
        this._hyunOrbit.rotation.y += 0.050;
        this._hyunOrbit2.rotation.y += 0.001;
    }

}

window.onload = function () {
    new App();
}