import { System } from '../core/Config';
import { Aikidoka } from '../objects/Aikidoka';


export class Game extends Phaser.Scene {

  private timeLeft: number
  private player: any
  private entities: Aikidoka[] = []

  public background: Phaser.GameObjects.Sprite

  constructor() {
    System.Process.setup.key = 'Game';
    super(System.Process.setup);
  }

  async create(): Promise<void>
  {

    let gameOver = false,
        zoom = 1;

    this.timeLeft = 20;

    if (System.Config.isLandscape(this) && System.Config.mobileAndTabletCheck())
      zoom = 3;

    else if (System.Config.isDesktop(this))
      zoom = 5;


    this.cameras.main.setZoom(zoom);

    System.Process.app.audio.play(this, 'shakuhachi2');

    this.background = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, 'dojo'); 

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
            System.Process.app.data.score++;
          }
        });
      
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
      
        this.cameras.main.centerOn(this.cameras.main.width / 2, this.cameras.main.height / 2);
  
        this.background.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2); 

        this.player.setScale(0.6).setPosition(this.cameras.main.width / 2 - 40, this.cameras.main.height / 2);

        this.entities.forEach(i => i.setScale(0.6).setPosition(this.cameras.main.width / 2 + 40, this.cameras.main.height / 2));

      //restart scene if exiting fullscreen (a hack, does not affect score or spawn count)

        if (!this.scale.isFullscreen)
        {
          if (gameOver)
            return;

           gameOver = true;

          this.time.delayedCall(500, () => this.scene.restart());
        }
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
    let initialX = 1, 
        initialY = 1;

    for (let i = 0; i < amount; i++)
    {
      if (i === 1)
      {
        initialX = Math.random() * 50 + 1;
        initialY = Math.random() * 5 + 1;
      }
      else 
      {
        initialX += Math.random() * 3 + 1;
        initialY += Math.random() * 2 + 1;
      }

      let
          x = this.scale.width / 2 + initialX,
          y = this.scale.height / 2 + initialY;

      new System.Process.app.player(this, x, y, 'uke', false).setFlipX(true)
    }
  }



}
