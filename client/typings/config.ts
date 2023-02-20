
/* CONFIG */



export type scale = {
    mode: number,
    autoCenter: number,
    width: number,
    height: number,
    min: {
        width: number,
        height: number
    },
    max: {
        width: number,
        height: number
    },
    scaleRatio: number,
    parentBottom: any, 
    sizerBottom: any
}

export type input = {
    virtual: boolean,
    gamepad: boolean,
    type: string,
    mode: string
}

export type physics = {
   // collisions: new Collisions,
    default: string,
    arcade: {
        gravity: { y: number }, //// arcade physics bodies wont budge
        useTicker: boolean,
        debug: boolean
    }
}

export type setup = {
    key: string,
    physics: {
    matter: { 
            gravity: {y: number},
            debug: boolean
        }
    }
} 

export type joystick = {
    A: {
      self: any | null
      base?: Phaser.GameObjects.Arc | null
      thumb?: Phaser.GameObjects.Arc
    }
}

