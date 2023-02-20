import 'phaser'

import { input, physics, scale, setup } from '../../../typings/config'

import { System, Config } from './Config'
import { GameData } from './data'
import { Player } from '../objects/Player'
import { Boot } from '../scenes/Boot'
import { Controller } from '../scenes/Controller'
import { HUD } from '../scenes/HUD'
import { Main } from '../scenes/Main'
import { Preload } from '../scenes/Preload'
import { Map } from './Map'
import { UI } from './UI'



export default class Application {
  
  public player: typeof Player
  public map: Map
  public ui: UI
  public gameData: GameData
  private hud: Phaser.Scenes.ScenePlugin
  private system: Config
  private type: number
  private transparent: boolean
  private parent: string
  private backgroundColor: string
  private pixelArt: boolean
  public groups?: any
  private scene: Phaser.Scene[]
  private dom: { createContainer: boolean }
  private input: input
  private physics: physics
  private setup: setup

  public scale: scale
  
  constructor(system: Config)
  {  

      this.type = Phaser.AUTO;
      this.transparent = true,
      this.parent = 'game';
      this.backgroundColor = '#898989';
      this.pixelArt = true;
      this.scale = {
          mode: system.mode,
          autoCenter: system.position,
          width: system.width,
          height: system.height,
          min: {
              width: system.min.width,
              height: system.min.height
          },
          max: {
              width: system.max.width,
              height: system.max.height
          },
          scaleRatio: 0,
          parentBottom: {}, 
          sizerBottom: {}
      };

      this.dom = { createContainer: true };
      this.input = {
          virtual: true,
          gamepad: true,
          type: system.inputType,
          mode: 'A'
      };

      
      this.scene = [ 
        new Boot, 
        new Preload, 
        new Main, 
        new HUD,
        new Controller 
      ];

      this.ui = new UI;
      this.player = Player;
  }


//--------------------------------------------- reinit variables

  public async refreshApp()
  { 

      // System.config.events.socket = null;
      // System.config.multiPlayer.username = null;
      // System.config.multiPlayer.isPlaying = false;
  
      // System.config.ui = new UI(); 
       System.config.gameData = new GameData();
      // System.config.gameData.player.color = 'red';
      // //console.log('data reset: ', System.config.gameData);

      return System.config.gameData;
  }

//------------------------------------    INIT LEVEL, groups, base game utils, called every main scene

    public async init(scene: Phaser.Scene/* , playerArgs, spawnEnemies, spawnPickups */): Promise<any>
    { 
   
        this.groups = {
            playerGroup : scene.physics.add.group({ runChildUpdate: true }),
            doorGroup: scene.physics.add.group({ runChildUpdate: true })
            //...
        }

        scene.add.sprite(scene.cameras.main.width / 2, scene.cameras.main.height / 2, 'dojo');//this.map = new Map(scene);

        this.hud = scene.scene.run('HUD', scene);

    }
}

window.addEventListener('load', () => {
    System.config = new Application(System); 
    System.game = new Phaser.Game(System.config);   
});


      

