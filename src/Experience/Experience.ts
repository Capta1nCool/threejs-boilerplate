import * as THREE from 'three'
import Environment from './World/Environment';
import Camera from './Camera';
import Debug from './Utils/Debug';
import Stats from 'three/examples/jsm/libs/stats.module.js';

let instance: Experience;
let mesh: THREE.Mesh;

export default class Experience {
    camera!: Camera
    scene!: THREE.Scene
    renderer!: THREE.WebGLRenderer
    debug!: Debug;
    stats: any;
    constructor() {
        // Singleton
        if (instance) return instance

        instance = this;

        this.init()
    }

    init() {
        this.scene = new THREE.Scene()

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(this.renderer.domElement)

        this.camera = new Camera()

        this.debug = new Debug()

        this.stats = new Stats()
        document.body.appendChild(this.stats.dom)

        window.addEventListener('resize', () => {
            this.onResize();
        }, false);

        this.animate()
        this.createScene()
    }

    createScene() {
        let environment = new Environment()

        mesh = new THREE.Mesh(
            new THREE.IcosahedronGeometry(),
            new THREE.MeshNormalMaterial()
        )

        mesh.position.z = -8;

        this.scene.add(mesh)
    }

    onResize() {
        this.camera.instance.aspect = window.innerWidth / window.innerHeight;
        this.camera.instance.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(() => {
            this.stats.begin()
            this.renderer.render(this.scene, this.camera.instance)

            mesh.rotation.y += 0.01
            mesh.rotation.x += 0.01
            mesh.rotation.z += 0.01

            this.stats.end()

            this.animate()
        })
    }
}