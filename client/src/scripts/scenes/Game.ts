import { System } from '../core/Config';
import { Aikidoka } from '../objects/Aikidoka';


export class Game extends Phaser.Scene {

  private timeLeft: number
  private player: any
  private entities: Aikidoka[] = []

  constructor() {
    System.Process.setup.key = 'Game';
    super(System.Process.setup);
  }

  async create(): Promise<void>
  {

    let gameOver = false;

    this.timeLeft = 20;

    this.cameras.main.setZoom(System.Config.isLandscape(this) && System.Config.mobileAndTabletCheck() ? 3 : 5);

    System.Process.app.audio.play(this, 'shakuhachi2');

    const background = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, 'dojo'); 

    System.Process.app.hud = this.scene.run('HUD', this);

    this.player = new System.Process.app.player(this, this.scale.width / 2 - 50, this.scale.height / 2, 'nage', true);

    this.spawnUke(System.Process.app.data.currentLevel);
  
    //collisions

    this.physics.add.overlap(this.player, this.entities, (nage, uke): void => { 

      if (this.player.state === 'kokyu')
      {

        this.entities.forEach(i => {

            if (this.physics.world.overlap(nage, i) && i.hitbox.active)
            {
              uke['setUkeState']('roll');
      
              System.Process.app.audio.play(this, 'huh', 0.5);
              System.Process.app.audio.play(this, 'ring', 0.5);
            }
        });

        System.Process.app.data.score++;
      
      }
      else 
      {
        if (this.physics.world.overlap(this.player, uke['hitbox'])) //game over
        {
          if (gameOver)
            return;

          gameOver = true;

          uke['setUkeState']('kokyu');
          this.time.delayedCall(500, ()=> this.endGame());
        }
      }

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


  //--------------update 

  public update(): void
  {
    if (this.timeLeft > 0.01) 
      this.timeLeft -= 0.02;
    else
    {
      System.Process.app.data.currentLevel++;
      this.scene.restart();
    }
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
