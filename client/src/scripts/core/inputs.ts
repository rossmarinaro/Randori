import { joystick } from '../../../typings/config';


//scene.input.keyboard.clearCaptures()

export class Inputs {

    private target: Phaser.Physics.Arcade.Sprite;
    private actionInputs: string[];
    private directionalInputs: string[];
    private optionInputs: string[];
    privatebuttons: object;
    private refresh: object;

    //private gamePads: Navigator;

    public joystick: joystick;
    public ee: Phaser.Events.EventEmitter;
    public pauseMenu: object;
    public currentInput: object;

    public buttons: {
        A: Phaser.GameObjects.Arc | null,
        B: Phaser.GameObjects.Arc | null,
        C: Phaser.GameObjects.Arc | null,
        D: Phaser.GameObjects.Arc | null,
        left: Phaser.GameObjects.Arc | null,
        up: Phaser.GameObjects.Arc | null,
        right: Phaser.GameObjects.Arc | null,
        down : Phaser.GameObjects.Arc | null,
        select: Phaser.GameObjects.Arc | null,
        start: Phaser.GameObjects.Arc | null,
        arrows: {
            up: Phaser.GameObjects.Image | null
            down: Phaser.GameObjects.Image | null
            left: Phaser.GameObjects.Image | null
            right: Phaser.GameObjects.Image | null
        }
    }

    public states: {
        left: boolean,
        right: boolean,
        up: boolean,
        down: boolean,
        A: boolean,
        B: boolean,
        C: boolean,
        D: boolean,
        enter: boolean,
        start: boolean,
        select: boolean
    };

    public get state()
    {
        for (let [key, val] of Object.entries(this.states))
            if (val === true)
                return key;
    }

    constructor(scene: Phaser.Scene)
    {
        this.ee = scene.events;

        this.joystick = {
            A: { self: null }
        }

        this.pauseMenu = {
            isPaused : false,
            cursorPos : 0
        }

        this.currentInput = {
            type: null
        }

        this.states = {
            left: false,
            right: false,
            up: false,
            down: false,
            A: false,
            B: false,
            C: false,
            D: false,
            enter: false,
            start: false,
            select: false
        };

        this.buttons = {
            A: null,
            B: null,
            C: null,
            D: null,
            left: null,
            up: null,
            right: null,
            down : null,
            select: null,
            start: null,
            arrows: {
                up: null,
                down: null,
                left: null,
                right: null
            }
        }

        this.actionInputs = ['A', 'B', 'C', 'D'];
        this.directionalInputs = ['left', 'right', 'up', 'down'];
        this.optionInputs = ['start', 'select'];


        this.refresh = {
            default: () =>{
                for (let [i, e] of Object.entries(this.currentInput))
                    e = false;
            }
        };


    }

 ////----------------------------------------------------- apply button

    public _applyButton (scene: Phaser.Scene, button: string, tint: number): void
    {

    ////change tint fill if virtual controls enabled
        //if (this.buttons !== null)
            //this.buttons[button].setFillStyle(tint, 1);


    ////cancel walk if using item

        if (this.actionInputs.includes(button))
            for (let i in this.directionalInputs)
            {
                this.states[this.directionalInputs[i]] = false;
                //this.target._setState('idle', scene);
            }

    //// button type

        switch (button)
        {
            case 'start': this.states.start = true; break;
            case 'select': this.states.select = true; break;
            case 'enter': this.states.enter = true; break;
            case 'left': this.states.left = true; break;
            case 'right': this.states.right = true; break;
            case 'up': this.states.up = true; break;
            case 'down': this.states.down = true; break;

            default: // A, B, C, D


            break;
        }

    //// if A, B, C, D: deselect directional inputs

        if (this.states.A || this.states.B || this.states.C || this.states.D)
        {
            if (this.directionalInputs.includes(button))
                this.states[button] = false;
        }
    }

//---------------------------------------------- release button

    public _releaseButton (button: string): void
    {
        //this.buttons[button].setFillStyle(0x464646, 0.6);

        if (this.directionalInputs.includes(button))
            this.states[button] = false;
        else if (this.actionInputs.includes(button))
            this.states[button] = false;
        else if (this.optionInputs.includes(button))
            this.states[button] = false;

        for (let [i, j] of Object.entries(this.currentInput))
            j = false;
    }


//-----------------**** VIRTUAL CONTROLLER ****

    public virtualControls(scene: Phaser.Scene)
    {
        const joystickPlugin: any = scene.plugins.get('rexvirtualjoystickplugin');

        scene.input.addPointer(1);

        this.joystick.A.base = scene.add.circle(100, 450, 50, 0x000000).setAlpha(0.5);
        this.joystick.A.thumb = scene.add.circle(100, 450, 30, 0xcccccc).setAlpha(0.5);
        this.joystick.A.self = joystickPlugin.add(scene, {
            forceX: 0,
            forceY: 0,
            x: 100,
            y: 450,
            radius: 60,
            base: this.joystick.A.base,
            thumb: this.joystick.A.thumb
        });
        this.buttons.A = scene.add.circle(scene.scale.width - 80, 500, 20, 0x000000).setAlpha(0.5)
            .setInteractive()
        //   .on('pointerdown', ()=> this.shoot = true)
        //   .on('pointerup', ()=> this.shoot = false)
        //   .on('pointerout', ()=> this.shoot = false);
        this.buttons.B = scene.add.circle(scene.scale.width - 100, 550, 20, 0x000000).setAlpha(0.5)
            .setInteractive()
        //   .on('pointerdown', ()=> this.zoom = true)
        //   .on('pointerup', ()=> this.zoom = false)
        //   .on('pointerout', ()=> this.zoom = false);

        scene.events.on('update', ()=>{

            if (!scene.scene.settings.active || this.joystick.A.self === null)
                return;

            if (this.joystick.A.self.forceX < -40)
                this.states.left = true;
            if (this.joystick.A.self.forceX > 40)
                this.states.right = true;
            if (this.joystick.A.self.forceY < -40)
                this.states.up = true;
            if (this.joystick.A.self.forceY > 40)
                this.states.down = true;
            if (this.joystick.A.self.forceX === 0 && this.joystick.A.self.forceY === 0) //temp
            {
                this._releaseButton('left')
                this._releaseButton('right')
                this._releaseButton('up')
                this._releaseButton('down')
            }
                // for (let button in this.directionalInputs)
                //     this._releaseButton(button);
        });
    }


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /******    cursors and keys 'WASD'     ******/////
    /******                                      ****/
    public keyboardControls(scene: Phaser.Scene): void
    {

        //start
            scene.input.keyboard.on('keydown-SPACE', ()=> this._applyButton(scene, 'start', 0), false).on('keyup-SPACE', ()=> this._releaseButton('start'), false);
            /* if (System.Process.gameState === true)
            { */
            //select
                scene.input.keyboard.on('keydown-SHIFT', ()=> this._applyButton(scene, 'select', 0), false).on('keyup-SHIFT', ()=> this._releaseButton('select'), false);
            //up
                scene.input.keyboard.on('keydown-UP', ()=> this._applyButton(scene, 'up', 0), false).on('keyup-UP', ()=> this._releaseButton('up'), false);
            //down
                scene.input.keyboard.on('keydown-DOWN', ()=> this._applyButton(scene, 'down', 0), false).on('keyup-DOWN', ()=> this._releaseButton('down'), false);
            //left
                scene.input.keyboard.on('keydown-LEFT', ()=> this._applyButton(scene, 'left', 0), false).on('keyup-LEFT', ()=> this._releaseButton('left'), false);
            //right
                scene.input.keyboard.on('keydown-RIGHT', ()=> this._applyButton(scene, 'right', 0), false).on('keyup-RIGHT', ()=> this._releaseButton('right'), false);
        //////////wasd
            //s A
                scene.input.keyboard.on('keydown-S', ()=> this._applyButton(scene, 'A', 0), false).on('keyup-S', ()=> this._releaseButton('A'), false);
            //d B
                scene.input.keyboard.on('keydown-D', ()=> this._applyButton(scene, 'B', 0), false).on('keyup-D', ()=> this._releaseButton('B'), false);
            //w  C
                scene.input.keyboard.on('keydown-W', ()=> this._applyButton(scene, 'C', 0), false).on('keyup-W', ()=> this._releaseButton('C'), false);
            //a D
                scene.input.keyboard.on('keydown-A', ()=> this._applyButton(scene, 'D', 0), false).on('keyup-A', ()=> this._releaseButton('D'), false);
            //enter CHAT
                scene.input.keyboard.on('keydown-ENTER', ()=> this._applyButton(scene, 'enter', 0), false);
            //}
        }
    /******    gamepad     ******////////////////////////////////////////////////////////////////////////////////////////////////////
        /******                        ****/
        //// haptic actuator if gamepad is connected

        public gamepadControls(scene: Phaser.Scene): void
        {
            scene.input.gamepad.on('down', (pad, button, e) => {
                //console.log(pad.buttons)
                //console.log(this.gamePads[0], 'event: ', e);
                //if (this.gamePads[0] !== undefined && this.gamePads[0] !== null) this.gamePads[0].vibrationActuator.playEffect("dual-rumble", {startDelay: 0, duration: 20, weakMagnitude: 0.5, strongMagnitude: 0.5});

                //start button
                    // switch(button.index)
                    // {
                    //     case 8 : ()=> this._applyButton(scene, 'start', null); break;
                    // }
                    // if (pad.start) alert('start')
                    // if (pad.left/* pad.buttons[0] || pad.buttons[6]|| pad.buttons[7] */)
                    //     this._applyButton(scene, 'left', null)
                    // if (pad.right)
                    //     this._applyButton(scene, 'right', null)
                    // if (pad.up)
                    //     this._applyButton(scene, 'up', null)
                    // if (pad.down)
                    //     this._applyButton(scene, 'down', null)
                    // if (pad.A)
                    //     this._applyButton(scene, 'A', null)
                    // if (pad.B)
                    //     this._applyButton(scene, 'B', null)
                    // if (pad.Y)
                    //     this._applyButton(scene, 'C', null)
                    // if (pad.X)
                    //     this._applyButton(scene, 'D', null);
            })
            /////up
            .on('up', (pad, button, e) => { //console.log('pad up', pad, button)

                // // switch(button.index)
                // // {
                // //     case 8 : ()=> this._releaseButton(scene, 'start'); break;
                // // }
                // if (pad.left)
                //     this._releaseButton(scene, 'left')
                // if (pad.right)
                //     this._releaseButton(scene, 'right')
                // if (pad.up)
                //     this._releaseButton(scene, 'up')
                // if (pad.down)
                //     this._releaseButton(scene, 'down')
                // if (pad.A)
                //     this._releaseButton(scene, 'A')
                // if (pad.B)
                //     this._releaseButton(scene, 'B')
                // if (pad.Y)
                //     this._releaseButton(scene, 'C')
                // if (pad.X)
                //     this._releaseButton(scene, 'D');
            });
        }
    }
