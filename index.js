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


        this._weSpace = weSpace;
        //kyounghoon
        this._hoonOrbit = hoonOrbit;
        this._hoonOrbit2 = hoonOrbit2;
        this._hoonOrbit3 = hoonOrbit3;
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

         //kyounghoon rotation
         this._hoonOrbit.rotation.y += 0.0005;
         this._hoonOrbit2.rotation.y += 0.005;
         this._hoonOrbit3.rotation.y -= 0.0005;
    }

}

window.onload = function(){
    new App();
}