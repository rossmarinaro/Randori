import 'phaser'

import { input, physics, scale, setup } from '../../../typings/config'

import { System } from './Config'
import { GameData } from './data'
import { Aikidoka } from '../objects/Aikidoka'
import { Boot } from '../scenes/Boot'
import { Controller } from '../scenes/Controller'
import { HUD } from '../scenes/HUD'
import { Game } from '../scenes/Game'
import { AudioManager } from './Audio'
import { Preload } from '../scenes/Preload'
import { Menu } from '../scenes/Menu'
import { GameOver } from '../scenes/GameOver'
import { UI } from './UI'



export default class Application {
  
  public player: typeof Aikidoka
  public audio: typeof AudioManager = AudioManager
  public data: typeof GameData = GameData
  public ui: UI

  private hud: Phaser.Scenes.ScenePlugin
  private system: System.Config
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
  
  constructor(system: System.Config)
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
        new Menu,
        new Game, 
        new HUD,
        new Controller,
        new GameOver
      ];

      this.ui = new UI;
      this.player = Aikidoka;
  }


//--------------------------------------------- reinit variables

    public async refreshApp(): Promise<Phaser.Data.DataManager>
    { 

        System.Process.app.gameData = new GameData;
        return System.Process.app.gameData;
    }


}


//-------------------------------------- init app

window.addEventListener('load', () => {
    System.Process.app = new Application(System.Process); 
    System.Process.game = new Phaser.Game(System.Process.app);   
});


      

