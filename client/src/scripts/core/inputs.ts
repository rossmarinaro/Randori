import { joystick } from '../../../typings/config';
import { Aikidoka } from '../objects/Aikidoka';
import { System } from './Config';

//scene.input.keyboard.clearCaptures()

export class Inputs {

    private target: Aikidoka;
    private refresh: Object
    private actionInputs: string[];
    private directionalInputs: string[];
    private optionInputs: string[];
    privatebuttons: object;
    private buttonDown: boolean 

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

    constructor(target: Aikidoka)
    {

        this.target = target;

        this.buttonDown = false;

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

        if (this.buttonDown)
            return;

        this.buttonDown = true;

    ////cancel walk if using item

        if (this.actionInputs.includes(button))
            for (let i in this.directionalInputs)
            {
                this.states[this.directionalInputs[i]] = false;

            }

    //// button type

        switch (button)
        {
            case 'start': this.target._setState('kokyu'); break;
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

        this.buttonDown = false;

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
          .on('pointerdown', ()=> this.target._setState('kokyu'))
          .on('pointerup', ()=> this.states.start = false)
          .on('pointerout', ()=> this.states.start = false);
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
            scene.input.keyboard.on('keydown-SPACE', (e)=> this._applyButton(scene, 'start', 0), false).on('keyup-SPACE', ()=> this._releaseButton('start'), false);
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

        }
        //-----------------------------------------------------------------------------------

        public gamepadControls(scene: Phaser.Scene): void
        {
            scene.input.gamepad.on('down', (pad: any, button: any, e: number): void => {
  
              //if (this.gamePads[0] !== undefined && this.gamePads[0] !== null) this.gamePads[0].vibrationActuator.playEffect("dual-rumble", {startDelay: 0, duration: 20, weakMagnitude: 0.5, strongMagnitude: 0.5});  
              
              if (System.Process.app.game.gameState === true && System.Process.app.game.cutScene === false)
              {
                  if (button.index === 9) 
                      this._applyButton(scene, 'start', 0);
                  if (button.index === 8) 
                      this._applyButton(scene, 'select', 0);
                  if (pad.left) 
                      this._applyButton(scene, 'left', 0);
                  if (pad.right) 
                      this._applyButton(scene, 'right', 0);
                  if (pad.up || pad.L2) 
                      this._applyButton(scene, 'up', 0);
                  if (pad.down || pad.L1) 
                      this._applyButton(scene, 'down', 0);
  
                  if (System.Process.app.input.mode === 'A')
                  {
                      if (pad.A || pad.R1) 
                          this._applyButton(scene, 'A', 0);
                      if (pad.B || pad.R2) 
                          this._applyButton(scene, 'B', 0);
                      if (pad.Y) 
                          this._applyButton(scene, 'C', 0);
                      if (pad.X) 
                          this._applyButton(scene, 'D', 0);
                  }
                  else
                  {
                      if (pad.B || pad.R1) 
                          this._applyButton(scene, 'A', 0);
                      if (pad.A || pad.R2) 
                          this._applyButton(scene, 'B', 0);
                      if (pad.X) 
                          this._applyButton(scene, 'C', 0);
                      if (pad.Y) 
                          this._applyButton(scene, 'D', 0);
                  }
              }
            })
            .on('up', (pad: any, button: any, e: number): void => { 
  
            //   this._releaseButton(scene, 'start');
            //   this._releaseButton(scene, 'select');
            //   this._releaseButton(scene, 'left');
            //   this._releaseButton(scene, 'right');
            //   this._releaseButton(scene, 'up');
            //   this._releaseButton(scene, 'down');
            //   this._releaseButton(scene, 'A');
            //   this._releaseButton(scene, 'B');
            //   this._releaseButton(scene, 'C');
            //   this._releaseButton(scene, 'D');
            });
        } 

        //--------------------------------------------------


        // private resizeWindow(scene: Phaser.Scene ): void 
        // {
    
        //   if (!scene.scene.settings.active)
        //       return;
    
        //   if (System.Process.app.input.type === 'touch')
        //   {
        //     setTimeout(()=> {
              
        //       if (System.Config.isPortrait(scene)) 
        //       {
        //         this.buttonA?.setPosition(40, 500);
        //         this.buttonB?.setPosition(100, 550);
        //         this.buttonC?.setPosition(this.scene.scale.width - 100, 550);
        //         this.buttonD?.setPosition(this.scene.scale.width - 50, 510);
        //         this.buttonE?.setPosition(this.scene.scale.width - 50, 590);
        //         this.buttonF?.setPosition(this.scene.scale.width - 150, 590);
        //         this.buttonG?.setPosition(40, 590);
        //         this.joystickBase1?.setPosition(100, 450);
        //         this.joystickThumb1?.setPosition(100, 450);
        //         this.joystick1?.setPosition(100, 450); 
        //         this.joystickBase2?.setPosition(this.scene.scale.width - 50, 450);
        //         this.joystickThumb2?.setPosition(this.scene.scale.width - 100, 450);
        //         this.joystick2?.setPosition(this.scene.scale.width - 100, 450);
        //       }
        //       else
        //       {
        //         this.joystickBase1?.setPosition(100, innerHeight / 2);
        //         this.joystickThumb1?.setPosition(100, innerHeight / 2);
        //         this.joystick1?.setPosition(100, innerHeight / 2); 
        //         this.joystickBase2?.setPosition(this.scene.scale.width - 50, innerHeight / 2);
        //         this.joystickThumb2?.setPosition(this.scene.scale.width - 100, innerHeight / 2);
        //         this.joystick2?.setPosition(this.scene.scale.width - 100, innerHeight / 2);
        //         this.buttonA?.setPosition(40, this.joystick1.y + 100);
        //         this.buttonB?.setPosition(100, this.joystick1.y + 100);
        //         this.buttonC?.setPosition(this.scene.scale.width - 100, this.joystick1.y + 100);
        //         this.buttonD?.setPosition(this.scene.scale.width - 50, this.joystick1.y + 60);
        //         this.buttonE?.setPosition(this.scene.scale.width - 50, this.joystick1.y + 140);
        //         this.buttonF?.setPosition(this.scene.scale.width - 150, this.joystick1.y + 140);
        //         this.buttonG?.setPosition(70, this.joystick1.y + 140);
        //       }
        //     }, 1000);
        //   }
        // }
    }
