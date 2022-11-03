import * as THREE from 'https://unpkg.com/three@0.138.3/build/three.module.js';
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";

class App {
    constructor(){
        const divContainer = document.querySelector("#webgl-container");
        this._divContainer = divContainer;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        divContainer.appendChild(renderer.domElement);
        this._renderer = renderer;

        const scene = new THREE.Scene();
        this._scene = scene;

        this._setupCamera();
        this._setupLight();
        this._setupModel();

        var controls = new OrbitControls( this._camera, renderer.domElement );

        window.onresize = this.resize.bind(this);
        this.resize();
        requestAnimationFrame(this.render.bind(this));

    }

    _setupCamera(){
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;
        const camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            100
        );
        // camera.position.z = 25;

        camera.position.set(0, 25, 0);
        camera.up.set(0, 0, 1);
        camera.lookAt(0, 0, 0);

        this._camera = camera;
    }

    _setupLight(){
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
        const sun = new THREE.Object3D();
        this._scene.add(sun);

        const hyun = new THREE.Object3D();
        this._scene.add(hyun);

        const hoon = new THREE.Object3D();
        this._scene.add(hoon);
        
        const min = new THREE.Object3D();
        this._scene.add(min);

        const radius = 1;
        const widthSegments = 24;
        const heightSegments = 24;
        const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

        const centerOrbit = new THREE.Object3D();
        weSpace.add(centerOrbit);

        const sunMaterial = new THREE.MeshPhongMaterial({
            emissive: 0xffff00, flatShading: true
        });

        const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
        sunMesh.scale.set(3, 3, 3);
        weSpace.add(sunMesh);

        //kyounghoon-------------------------------------------------------------------
        //----------------------------------------------------------------------------
        //basic_plant
        const hoonOrbit = new THREE.Object3D();
        weSpace.add(hoonOrbit);

        const hoonMaterial = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('./image/puple_basic.png')
        });

        const hoonMesh = new THREE.Mesh(sphereGeometry,hoonMaterial);
        hoonMesh.scale.set(5,5,5);
        hoonOrbit.position.x = 20;
        hoonOrbit.add(hoonMesh);

        //blueStar
        const hoonOrbit2 = new THREE.Object3D();
        weSpace.add(hoonOrbit2);

        const hoonMaterial2 = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('./image/star.png'),
            transparent:true,
            side : THREE.DoubleSide
        });
        
        const hoonMesh2 = new THREE.Mesh(sphereGeometry,hoonMaterial2);
        hoonMesh2.scale.set(5.05,5.05,5.05);
        hoonOrbit2.position.x = 20;
        hoonOrbit2.add(hoonMesh2);

        //musical notes circle
        const hoonOrbit3 = new THREE.Object3D();
        weSpace.add(hoonOrbit3);

        const hooncircle = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('./image/music_circle2.png'),
            opacity : 0.7,
            transparent : true,
            side : THREE.DoubleSide,
        });

        const hoonMesh3 = new THREE.Mesh(sphereGeometry,hooncircle);
        hoonMesh3.scale.set(7,7,7);
        hoonOrbit3.position.x = 20;
        hoonOrbit3.add(hoonMesh3);
    //-----------------------------------------------------------------------------  

    //minPlanet-----------------------------------------------------------------
        //-------------------------------------------------------------------------
        
        const minScale = 1.5;
        const minPosition = 15;

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

        //mint circle1
        const minCircle = new THREE.Object3D();
        min.add(minCircle);

        const mincircle = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('./image/mint_circle1.png'),
            transparent : true,
            side : THREE.DoubleSide,
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
            transparent : true,
            side : THREE.DoubleSide,
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
            transparent : true,
            side : THREE.DoubleSide,
        });

        const minCircleMesh3 = new THREE.Mesh(sphereGeometry, mincircle3);
        minCircleMesh3.scale.set(minScale + 0.15, minScale + 0.15, minScale + 0.15);
        minCircle3.position.x = minPosition;
        minCircle3.add(minCircleMesh3);

      //------------------------------------------------------------------


        this._weSpace = weSpace;
        //kyounghoon
        this._hoonOrbit = hoonOrbit;
        this._hoonOrbit2 = hoonOrbit2;
        this._hoonOrbit3 = hoonOrbit3;

        //min-----------------------------------------
        this._min = min;
        this._minOrbit = minOrbit;
        this._minCircle = minCircle;
        this._minCircle2 = minCircle2;
        this._minCircle3 = minCircle3;
    }

    resize() {
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();

        this._renderer.setSize(width, height);
    }

    render(time){
        this._renderer.render(this._scene, this._camera);
        this.update(time);
        requestAnimationFrame(this.render.bind(this));
    }

    update(time){
        time *= 0.001

        this._sun.rotation.y = time / 2;
        this._hyun.rotation.y = time / 1.5;
        this._hoon.rotation.y = time / 4;
        this._min.rotation.y = time / 3;

         //kyounghoon rotation
         this._hoonOrbit.rotation.y += 0.0005;
         this._hoonOrbit2.rotation.y += 0.005;
         this._hoonOrbit3.rotation.y -= 0.0005;

         // min rotaion
        this._minCircle.rotation.y -= 0.0008;
        this._minCircle2.rotation.y += 0.0008;
        this._minCircle3.rotation.y -= 0.0008;
    }

}

window.onload = function(){
    new App();
}