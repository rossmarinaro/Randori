/* BOOT */
import { System } from '../core/Config';

import resources_main from '../resources/main.json';
import JoyStickPlugin from '../../../plugins/joystick.js';

import Utils from '../core/Utils.js';


export class Boot extends Phaser.Scene {

        constructor() {
            super("Boot");      
        }
        
    //---------------------- initialize 

        async init(): Promise<void>
        {
            
            this.data = await System.Process.app.refreshApp(); 

         //call full screen if available

            this.input.keyboard.on('keyup', () => this.initFullscreen());
            this.input.on('pointerup', () => this.initFullscreen());
            
        }

        async preload(): Promise<void>
        {
            // assets

            this.load.json('resources_main', resources_main);   

            //plugins

            this.load.plugin('rexvirtualjoystickplugin', JoyStickPlugin, true);
        }
        
    //------------------------------- run preload scene

       async create(): Promise<void>
       {   

            this.add.text(0, 0, '', {fontSize: "1px", fontFamily: "Digitizer"}).setAlpha(0);

            this.time.delayedCall(500, ()=> {

            //gameplay data object (gets passed scene to scene)
            
                this.scene.run('Preload', this.data);
    
            });
        }

    //------------------------------ init full screen

        private initFullscreen(): void
        {
            if (!this.scale.isFullscreen && this.scale.fullscreen.available)
            {   
                this.scale.fullscreenTarget = document.getElementById(System.Process.app.parent);    
                this.scale.startFullscreen();
            }
        }
    }


   