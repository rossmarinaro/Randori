/* BOOT */
import { System } from '../core/Config';

import resources_main from '../resources/main.json';

import JoyStickPlugin from '../../../plugins/joystick.js';
import { GameData } from '../core/data';

//import Utils from '../system/Utils.js';


export class Boot extends Phaser.Scene {

        constructor() {
            super("Boot");      
        }
        
    //---------------------- initialize 

        async init() 
        {
            
            this.data = await System.config.refreshApp(); 
             
        }
        async preload()
        {
            // assets

            this.load.json('resources_main', resources_main);   

            //plugins

            this.load.plugin('rexvirtualjoystickplugin', JoyStickPlugin, true);
        }
        
    //------------------------------- run preload scene

       async create()
        {   
            this.add.text(0, 0, '', {fontSize: "1px", fontFamily: "Bangers"}).setAlpha(0);
            this.add.text(0, 0, '', {fontSize: "1px", fontFamily: "Digitizer"}).setAlpha(0);
            this.time.delayedCall(500, ()=> {

            //gameplay data object (gets passed scene to scene)
            
                this.scene.run('Preload', this.data);
                this.scene.stop('Boot');

            });
        }
    }


   