import * as THREE from 'three'
import Experience from '../Experience'
import RAPIER from '@dimforge/rapier3d'

export default class Physics {
    constructor(scene, world) {
        this.scene = scene
        this.world = world
        this.debugMode = false;

        this.experience = new Experience()
        this.debug = this.experience.debug

        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Physics')
            this.debugFolder.add(this, 'debugMode')
        }
        let material = new THREE.LineBasicMaterial({
            color: 0xffffff,
            vertexColors: true,
        });
        let geometry = new THREE.BufferGeometry();
        this.lines = new THREE.LineSegments(geometry, material);
        this.scene.add(this.lines);

        this.bodies = []
        this.update()
    }

    addBox(props) {
        const { size, rigidBodyDesc, material, geometry } = props

        //THREE
        const meshThree = new THREE.Mesh(geometry, material)
        this.scene.add(meshThree)

        //RAPIER
        const rigidBody = this.world.createRigidBody(rigidBodyDesc)
        const colliderDesc = RAPIER.ColliderDesc.cuboid(
            size.x / 2,
            size.y / 2,
            size.z / 2
        )
        const collider = this.world.createCollider(colliderDesc, rigidBody)

        this.bodies.push({ meshThree, rigidBody, collider })

        return { meshThree, rigidBody, collider }
    }

    addCylinder(props) {
        const { size, rigidBodyDesc, material, geometry } = props;

        // THREE
        const meshThree = new THREE.Mesh(geometry, material);
        this.scene.add(meshThree);

        // RAPIER
        const rigidBody = this.world.createRigidBody(rigidBodyDesc);
        const colliderDesc = RAPIER.ColliderDesc.cylinder(size.y / 2, size.x); // Radius should be size.x / 2
        const collider = this.world.createCollider(colliderDesc, rigidBody);

        this.bodies.push({ meshThree, rigidBody, collider });

        return { meshThree, rigidBody, collider };
    }

    addSphere(props) {
        const { radius, rigidBodyDesc, material, geometry } = props;

        // THREE
        const meshThree = new THREE.Mesh(geometry, material);
        this.scene.add(meshThree);

        // RAPIER
        const rigidBody = this.world.createRigidBody(rigidBodyDesc);
        const colliderDesc = RAPIER.ColliderDesc.ball(radius);
        const collider = this.world.createCollider(colliderDesc, rigidBody);

        this.bodies.push({ meshThree, rigidBody, collider });

        return { meshThree, rigidBody, collider };
    }

    addCapsule(props) {
        const { size, rigidBodyDesc, material, geometry } = props;

        // THREE
        const meshThree = new THREE.Mesh(geometry, material);
        this.scene.add(meshThree);

        // RAPIER
        const rigidBody = this.world.createRigidBody(rigidBodyDesc);
        const colliderDesc = RAPIER.ColliderDesc.capsule(size.y / 2, size.x); // Radius should be size.x / 2
        const collider = this.world.createCollider(colliderDesc, rigidBody);

        this.bodies.push({ meshThree, rigidBody, collider });

        return { meshThree, rigidBody, collider };
    }

    update() {
        this.world.step()

        this.bodies.forEach(body => {
            const pos = body.rigidBody.translation();
            const rot = body.rigidBody.rotation();

            body.meshThree.position.x = pos.x;
            body.meshThree.position.y = pos.y;
            body.meshThree.position.z = pos.z;
            body.meshThree.setRotationFromQuaternion(new THREE.Quaternion(rot.x, rot.y, rot.z, rot.w));
        });

        if (this.debugMode) {
            let buffers = this.world.debugRender();
            this.lines.visible = true;
            this.lines.geometry.setAttribute(
                "position",
                new THREE.BufferAttribute(buffers.vertices, 3),
            );
            this.lines.geometry.setAttribute(
                "color",
                new THREE.BufferAttribute(buffers.colors, 4),
            );
        }
        else {
            this.lines.visible = false;
        }

        //60hz physics
        setTimeout(() => {
            this.update()
        }, 16);

    }
}