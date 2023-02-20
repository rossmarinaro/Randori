import { System } from '../core/Config';
import { playerSpawns } from '../spawns/player'


export class Main extends Phaser.Scene {

  private currentStage: string = '';

  constructor() {
    System.setup.key = 'Main';
    super(System.setup);
  }

  async create(scene: Phaser.Scene) 
  {

   // this.data = scene.scene['data'];
    await System.config.init(this);

    
    // const spawn: any = await playerSpawns(this);
    // const spawnX = spawn[0],
    //       spawnY = spawn[1],
    //       flipX = spawn[2],
    //       anim = spawn[3];

     const player = new System.config.player(this, this.scale.width / 2, this.scale.height / 2);


    this.cameras.main.centerOn(this.scale.width / 2, this.scale.height / 2);



  }


}
