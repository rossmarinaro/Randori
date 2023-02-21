import { System } from '../core/Config';
import { playerSpawns } from '../spawns/player'


export class Main extends Phaser.Scene {

  private currentStage: string = ''
  private player: any
  private entities: Phaser.Physics.Arcade.Group


  constructor() {
    System.Process.setup.key = 'Main';
    super(System.Process.setup);
  }

  async create(scene: Phaser.Scene): Promise<void>
  {

    System.Process.app.audio.play(this, 'shakuhachi2');

    const background = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, 'dojo'); 

    System.Process.app.hud = scene.scene.run('HUD', scene);

    this.entities = this.physics.add.group();

    this.player = new System.Process.app.player(this, this.scale.width / 2, this.scale.height / 2, 'nage', true);

    new System.Process.app.player(this, this.scale.width / 2 + 50, this.scale.height / 2, 'uke', false).setFlipX(true);

    this.cameras.main.setZoom(5);

    //collisions

    this.physics.add.overlap(this.player, this.entities, (a, b) => {

      if (this.player.currentState === 'kokyu' && this.player.attacking === false)
      {
        System.Process.app.audio.play(this, 'huh', 0.5);
        System.Process.app.audio.play(this, 'ring', 0.5);
        this.scene.get('HUD')['score']++;
      }
      else if (this.physics.world.overlap(this.player, b['hitbox']))
        this.endGame();
    });


    //camera update

    document.addEventListener('fullscreenchange', () => { 

      this.children.each(i => {
        if (i instanceof Phaser.GameObjects.Sprite)
        {
          i.setY(this.cameras.main.height / 2);

          if (i !== background)
            i.setScale(1);
          
        }
      });
    });
  }

  //---------------- init game over

  private endGame(): void
  {
    System.Process.app.audio.play(this, 'error', 0.5);
    this.scene.launch('GameOver');
    this.scene.stop('Main');
  }



}
