import Experience from "../Experience.js";
import * as THREE from 'three'
import Environment from "./Environment.js";

export default class World 
{
    constructor() 
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // const testMesh = new THREE.Mesh(
        //     new THREE.BoxGeometry(1, 1, 1),
        //     new THREE.MeshStandardMaterial()
        // )
        // testMesh.position.y = 0.5;

        // this.scene.add(testMesh)

        // const ground = new THREE.Mesh(
        //     new THREE.PlaneGeometry(50, 50),
        //     new THREE.MeshStandardMaterial({ color: '#18A558' })
        // )

        // ground.rotation.x = -Math.PI / 2

        // this.scene.add(ground)

        this.resources.on('ready', () => {
            // Setup Environent
            this.environment = new Environment()
        })

    }

    addItems() 
    {
        let box = this.experience.physics.addBox({
            size: { x: 2, y: 2, z: 2 },
            rigidBodyDesc: this.experience.RAPIER.RigidBodyDesc.dynamic().setTranslation(0.0, 20.0, 0.0),
            material: new THREE.MeshStandardMaterial(),
            geometry: new THREE.BoxGeometry(2, 2, 2),
        })

        let plane = this.experience.physics.addBox({
            size: { x: 50, y: 0.2, z: 50 },
            rigidBodyDesc: this.experience.RAPIER.RigidBodyDesc.fixed(),
            material: new THREE.MeshStandardMaterial({ color: 0x18A558 }),
            geometry: new THREE.BoxGeometry(50, 0.2, 50),
        })

        let cylinder = this.experience.physics.addCylinder({
            size: { x: 1, y: 5 },
            rigidBodyDesc: this.experience.RAPIER.RigidBodyDesc.dynamic().setTranslation(-5.0, 20.0, 0.0),
            material: new THREE.MeshStandardMaterial({ color: 0x0fffff }),
            geometry: new THREE.CylinderGeometry(1, 1, 5, 32)
        })


        let playerBody = this.experience.physics.addCapsule({
            size: { x: 1, y: 4 },
            rigidBodyDesc: this.experience.RAPIER.RigidBodyDesc.dynamic().setTranslation(-10.0, 20.0, 0.0),
            material: new THREE.MeshStandardMaterial({ color: 0x0fffff }),
            geometry: new THREE.CapsuleGeometry(1, 4, 4, 20)
        })

        let ball = this.experience.physics.addSphere({
            radius: 1,
            rigidBodyDesc: this.experience.RAPIER.RigidBodyDesc.dynamic().setTranslation(5.0, 20.0, 0.0),
            material: new THREE.MeshStandardMaterial({ color: 0x0fffff }),
            geometry: new THREE.SphereGeometry(1)
        })
    }
}