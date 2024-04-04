import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module.js';

import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'
import Resources from './Utils/Resources.js'
import sources from './sources.js'
import Debug from './Utils/Debug.js'
import Physics from './Utils/Physics.js'
import InputController from './Utils/InputController.js';

let instance = null

export default class Experience
{
    constructor(_canvas)
    {
        // Singleton
        if(instance)
        {
            return instance
        }
        instance = this
        
        // Global access
        window.experience = this

        // Options
        this.canvas = _canvas

        // Setup
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.camera = new Camera()
        this.renderer = new Renderer()
        
        this.world = new World()
        this.inputController = new InputController({ 
            camera: this.camera, 
            domElement: document.body 
        })
        
        this.initRapier()
        this.stats = new Stats()
        document.body.appendChild(this.stats.dom)

        // Resize event
        this.sizes.on('resize', () =>
        {
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () =>
        {
            this.update()
        })
       
    }

    initRapier() 
    {
        import('@dimforge/rapier3d').then(RAPIER => {
            this.RAPIER = RAPIER
            
            let gravity = { x: 0.0, y: -9.81, z: 0.0 };
            let world = new RAPIER.World(gravity);
            this.physics = new Physics(this.scene, world)
            
            this.world.addItems()
        })
 
    }

    resize()
    {   
        this.camera.resize()
        this.renderer.resize()
    }

    update()
    {
        this.stats.begin()
        this.camera.update()
        this.renderer.update()
        this.stats.end()

    }

    destroy()
    {
        this.sizes.off('resize')
        this.time.off('tick')

        // Traverse the whole scene
        this.scene.traverse((child) =>
        {
            // Test if it's a mesh
            if(child instanceof THREE.Mesh)
            {
                child.geometry.dispose()

                // Loop through the material properties
                for(const key in child.material)
                {
                    const value = child.material[key]

                    // Test if there is a dispose function
                    if(value && typeof value.dispose === 'function')
                    {
                        value.dispose()
                    }
                }
            }
        })

        this.camera.controls.dispose()
        this.renderer.instance.dispose()

        if(this.debug.active)
            this.debug.ui.destroy()
    }
}