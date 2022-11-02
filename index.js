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
    }


    _setupModel(){
        const weSpace = new THREE.Object3D();
        this._scene.add(weSpace);

        const radius = 1;
        const widthSegments = 24;
        const heightSegments = 24;
        const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

        const sunMaterial = new THREE.MeshPhongMaterial({
            emissive: 0xffff00, flatShading: true
        });

        const centerMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
        centerMesh.scale.set(3, 3, 3);
        weSpace.add(centerMesh);


        //minPlanet-----------------------------------------------------------------
        //-------------------------------------------------------------------------
        //basic
        const minOrbit = new THREE.Object3D();
        weSpace.add(minOrbit);

        const minMaterial = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('./image/mint_basic.png')
        });

        const minMesh = new THREE.Mesh(sphereGeometry,minMaterial);
        minMesh.scale.set(5,5,5);
        minOrbit.position.x = 30;
        minOrbit.add(minMesh);

<<<<<<< Updated upstream
        const moonOrbit = new THREE.Object3D();
        moonOrbit.position.x = 2;
        earthOrbit.add(moonOrbit);
=======
        //mint circle1
        const minCircle = new THREE.Object3D();
        weSpace.add(minCircle);

        const mincircle = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('./image/mint_circle1.png'),
            transparent : true,
            side : THREE.DoubleSide,
        });

        const minCircleMesh1 = new THREE.Mesh(sphereGeometry,mincircle);
        minCircleMesh1.scale.set(5.05,5.05,5.05);
        minCircle.position.x = 30;
        minCircle.add(minCircleMesh1);

        //mint circle2
        const minCircle2 = new THREE.Object3D();
        weSpace.add(minCircle2);

        const mincircle2 = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('./image/mint_circle2.png'),
            transparent : true,
            side : THREE.DoubleSide,
        });

        const minCircleMesh2 = new THREE.Mesh(sphereGeometry,mincircle2);
        minCircleMesh2.scale.set(5.1,5.1,5.1);
        minCircle2.position.x = 30;
        minCircle2.add(minCircleMesh2);

        //mint circle3
        const minCircle3 = new THREE.Object3D();
        weSpace.add(minCircle3);
>>>>>>> Stashed changes

        const mincircle3 = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('./image/mint_circle3.png'),
            transparent : true,
            side : THREE.DoubleSide,
        });

        const minCircleMesh3 = new THREE.Mesh(sphereGeometry,mincircle3);
        minCircleMesh3.scale.set(5.15,5.15,5.15);
        minCircle3.position.x = 30;
        minCircle3.add(minCircleMesh3);

      //------------------------------------------------------------------

      
        this._weSpace = weSpace;
<<<<<<< Updated upstream
        this._earthOrbit = earthOrbit;
        this._moonOrbit = moonOrbit;
=======

        //min-----------------------------------------
        this._minOrbit = minOrbit;
        this._minCircle = minCircle;
        this._minCircle2 = minCircle2;
        this._minCircle3 = minCircle3;
>>>>>>> Stashed changes
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

        this._weSpace.rotation.y = time / 2;

        //min---------------------------------------------------
        this._minCircle.rotation.y -= 0.005;
        this._minCircle2.rotation.y += 0.005;
        this._minCircle3.rotation.y -= 0.005;

    }

}

window.onload = function(){
    new App();
}