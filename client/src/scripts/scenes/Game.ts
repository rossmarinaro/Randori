import { System } from '../core/Config';
import { Aikidoka } from '../objects/Aikidoka';
import { playerSpawns } from '../spawns/player'


export class Game extends Phaser.Scene {

  private currentStage: string = ''
  private player: any
  private entities: Aikidoka[] = []

  constructor() {
    System.Process.setup.key = 'Game';
    super(System.Process.setup);
  }

  async create(scene: Phaser.Scene): Promise<void>
  {

    this.cameras.main.setZoom(System.Config.isLandscape(this) && System.Config.mobileAndTabletCheck() ? 3 : 5);

    System.Process.app.audio.play(this, 'shakuhachi2');

    const background = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, 'dojo'); 

    System.Process.app.hud = scene.scene.run('HUD', scene);

    this.player = new System.Process.app.player(this, this.scale.width / 2 - 50, this.scale.height / 2, 'nage', true);

    this.spawnUke(System.Process.app.data.currentLevel);
  
    //collisions

    this.physics.add.overlap(this.player, this.entities, (nage, uke) => {

      if (this.player.currentState === 'kokyu' && this.player.attacking === false)
      {

        uke['rollUke']();

        System.Process.app.audio.play(this, 'huh', 0.5);
        System.Process.app.audio.play(this, 'ring', 0.5);
        System.Process.app.data.score++;

        switch (System.Process.app.data.score)
        {
         // case 3: System.Process.app.data.currentLevel++; this.scene.restart(); break;
        }

      }
      else if (this.physics.world.overlap(this.player, uke['hitbox'])) //game over

        this.endGame();
    });


    //camera update / shift objects to fit

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


  //---------------- game over

  private endGame(): void
  {
    System.Process.app.audio.play(this, 'error', 0.5);
    this.scene.launch('GameOver');
    this.scene.stop('Game');
  }

  //---------------------- uke spawner

  private spawnUke(amount: number): void
  {
    for (let i = 0; i < amount; i++)
    {

      let
          x = this.scale.width / 2 + Math.random() * 50 + 1,
          y = this.scale.height / 2 + Math.random() * 5 + 1;

      new System.Process.app.player(this, x, y, 'uke', false).setFlipX(true)
    }
  }



}
