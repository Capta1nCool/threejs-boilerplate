import * as THREE from 'three'
import Experience from './Experience'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default class Camera {
    experience: Experience
    scene: THREE.Scene
    instance!: THREE.PerspectiveCamera
    controls?: OrbitControls

    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        
        this.setInstance()
        this.setControls()
    }
    
    setInstance() {
        this.instance = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.scene.add(this.instance)
    }
    
    setControls() {
        this.controls = new OrbitControls(this.instance, this.experience.renderer.domElement)
        this.controls.update();
    }

    update() {
        this.controls?.update()
    }
}