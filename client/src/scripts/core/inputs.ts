import { joystick } from '../../../typings/config';
import { Aikidoka } from '../objects/Aikidoka';
import { System } from './Config';



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

    public _applyButton (button: string): void
    {

        if (this.buttonDown)
            return;

        this.buttonDown = true;

    //cancel walk if using item

        if (this.actionInputs.includes(button))
            for (let i in this.directionalInputs)
                this.states[this.directionalInputs[i]] = false;


    // button type

        switch (button)
        {
            case 'start': this.target.applyState('kokyu'); break;
            case 'select': this.states.select = true; break;
            case 'enter': this.states.enter = true; break;
            case 'left': this.states.left = true; break;
            case 'right': this.states.right = true; break;
            case 'up': this.states.up = true; break;
            case 'down': this.states.down = true; break;

            default: // A, B, C, D


            break;
        }

    // if A, B, C, D: deselect directional inputs

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

        this.joystick.A.base = scene.add.circle(50, 450, 50, 0x000000).setAlpha(0.5);
        this.joystick.A.thumb = scene.add.circle(50, 450, 30, 0xcccccc).setAlpha(0.5);
        this.joystick.A.self = joystickPlugin.add(scene, {
            forceX: 0,
            forceY: 0,
            x: 50,
            y: 450,
            radius: 60,
            base: this.joystick.A.base,
            thumb: this.joystick.A.thumb
        });
        
        // this.buttons.A = scene.add.circle(scene.scale.width - 80, 500, 20, 0x000000).setAlpha(0.5)
        //     .setInteractive()
        //     .on('pointerdown', ()=> this.target.applyState('kokyu'));

        this.buttons.B = scene.add.circle(scene.scale.width - 100, 550, 20, 0x000000).setAlpha(0.5)
            .setInteractive()
            .on('pointerdown', ()=> this.target.applyState('kokyu'));

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

        });
    }


    //-------------------------------------------------- keyboard

    public keyboardControls(scene: Phaser.Scene): void
    {
        scene.input.keyboard.clearCaptures()
            .on('keydown-SPACE', ()=> this._applyButton('start'), false)
            .on('keyup-SPACE', ()=> this._releaseButton('start'), false)
            .on('keydown-SHIFT', ()=> this._applyButton('select'), false)
            .on('keyup-SHIFT', ()=> this._releaseButton('select'), false)
            .on('keydown-UP', ()=> this._applyButton('up'), false)
            .on('keyup-UP', ()=> this._releaseButton('up'), false)
            .on('keydown-DOWN', ()=> this._applyButton('down'), false)
            .on('keyup-DOWN', ()=> this._releaseButton('down'), false)
            .on('keydown-LEFT', ()=> this._applyButton('left'), false)
            .on('keyup-LEFT', ()=> this._releaseButton('left'), false)
            .on('keydown-RIGHT', ()=> this._applyButton('right'), false)
            .on('keyup-RIGHT', ()=> this._releaseButton('right'), false)
            .on('keydown-S', ()=> this._applyButton('A'), false)
            .on('keyup-S', ()=> this._releaseButton('A'), false)
            .on('keydown-D', ()=> this._applyButton('B'), false)
            .on('keyup-D', ()=> this._releaseButton('B'), false)
            .on('keydown-W', ()=> this._applyButton('C'), false)
            .on('keyup-W', ()=> this._releaseButton('C'), false)
            .on('keydown-A', ()=> this._applyButton('D'), false)
            .on('keyup-A', ()=> this._releaseButton('D'), false)
            .on('keydown-ENTER', ()=> this._applyButton('enter'), false);

    }


    //----------------------------------------------------------------------------------- gamepad

        public gamepadControls(scene: Phaser.Scene): void
        {
            scene.input.gamepad.on('down', (pad: any, button: any, e: number): void => {
                
              if (System.Process.app.game.gameState === true && System.Process.app.game.cutScene === false)
              {
                  if (button.index === 9) 
                      this._applyButton('start');
                  if (button.index === 8) 
                      this._applyButton('select');
                  if (pad.left) 
                      this._applyButton('left');
                  if (pad.right) 
                      this._applyButton('right');
                  if (pad.up || pad.L2) 
                      this._applyButton('up');
                  if (pad.down || pad.L1) 
                      this._applyButton('down');
  
                  if (System.Process.app.input.mode === 'A')
                  {
                      if (pad.A || pad.R1) 
                          this._applyButton('A');
                      if (pad.B || pad.R2) 
                          this._applyButton('B');
                      if (pad.Y) 
                          this._applyButton('C');
                      if (pad.X) 
                          this._applyButton('D');
                  }
                  else
                  {
                      if (pad.B || pad.R1) 
                          this._applyButton('A');
                      if (pad.A || pad.R2) 
                          this._applyButton('B');
                      if (pad.X) 
                          this._applyButton('C');
                      if (pad.Y) 
                          this._applyButton('D');
                  }
              }
            })
            .on('up', (pad: any, button: any, e: number): void => { 
  
              this._releaseButton('start');
              this._releaseButton('select');
              this._releaseButton('left');
              this._releaseButton('right');
              this._releaseButton('up');
              this._releaseButton('down');
              this._releaseButton('A');
              this._releaseButton('B');
              this._releaseButton('C');
              this._releaseButton('D');
            });
        } 

    }
