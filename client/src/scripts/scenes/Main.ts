import { System } from '../core/Config';
import { playerSpawns } from '../spawns/player'


export class Main extends Phaser.Scene {

  private currentStage: string = ''
  private player: any


  constructor() {
    System.Process.setup.key = 'Main';
    super(System.Process.setup);
  }

  async create(scene: Phaser.Scene): Promise<void>
  {

    const background = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, 'dojo')/* .setScale(5) */; //this.map = new Map(scene);

    System.Process.app.hud = scene.scene.run('HUD', scene);

    this.player = new System.Process.app.player(this, this.scale.width / 2, this.scale.height / 2, 'nage', true);

    new System.Process.app.player(this, this.scale.width / 2 + 50, this.scale.height / 2, 'uke', false).setFlipX(true);

    this.cameras.main.setZoom(5);


  }

  public update(): void 
  {

  }



}
