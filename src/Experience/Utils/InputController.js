import EventEmitter from "./EventEmitter";

export default class InputController extends EventEmitter 
{
    constructor(props)
    {
        const { camera, domElement } = props
        
        super()

        this.camera = camera
        this.domElement = domElement
        this.keys = {}
        this.mouseState = {}
        this.isLocked = true;

        this.addEvents()
    }

    onKeyDown(e)
    {
        this.keys[e.code] = true
        this.trigger('keychange')
    }

    onKeyUp(e)
    {
        this.keys[e.code] = false
        this.trigger('keychange')
    }

    onMouseMove(e)
    {
        this.trigger('mousemove')
        if (this.isLocked === false) return;
        const movementX = event.movementX || 0;
        const movementY = event.movementY || 0;
        this.mouseState = { dx: movementX, dy: movementY };
    }

    addEvents()
    {
        this.domElement.addEventListener('keydown', (e) => {
            this.onKeyDown(e)
        })
        this.domElement.addEventListener('keyup', (e) => {
            this.onKeyUp(e)
        })

        this.domElement.addEventListener('mousemove', (e) => {
            this.onMouseMove()
        })
    }

    removeEvents()
    {
        this.domElement.removeEventListener('keydown', () => {
            this.onKeyDown()
        })
         this.domElement.removeEventListener('keyup', () => {
            this.onKeyUp()
        })

    }
}