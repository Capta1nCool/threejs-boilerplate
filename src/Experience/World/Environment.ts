import * as THREE from 'three'
import Experience from '../Experience'
import EnvironmentScene from './EnvironmentScene';

export default class Environment {
    experience: Experience
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;

    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.renderer = this.experience.renderer

        this.initLights()
    }

    initLights() {
        let environment = new EnvironmentScene('neutral')
        const pmremGenerator = new THREE.PMREMGenerator(this.renderer)

        this.scene.environment = pmremGenerator.fromScene(environment).texture;
    }
}