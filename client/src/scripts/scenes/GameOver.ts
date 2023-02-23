
import { System } from '../core/Config';

export class GameOver extends Phaser.Scene {


  constructor() {
    System.Process.setup.key = 'GameOver';
    super(System.Process.setup);
  }

  async create(scene: Phaser.Scene): Promise<void> 
  {

    this.data = scene.data;

    this.cameras.main
    .fadeIn(3000)
    .setBackgroundColor(0x000000)
    .centerOn(this.scale.width / 2, this.scale.height / 2)
    .setZoom(System.Config.mobileAndTabletCheck() ? 0.5 : 1);

    System.Process.app.data.currentLevel = 1;
    System.Process.app.data.score = 0;
    System.Process.app.audio.play(this, 'shakuhachi1');

    this.add.text(this.scale.width / 2 - 220, this.scale.height / 2 - 100, 'GAME OVER', {fontSize: '5rem', fontFamily: 'Arial'});

    const playAgain = this.add.text(this.scale.width / 2 - 100, this.scale.height / 2, 'play again?', {fontSize: '2rem', fontFamily: 'Courier'});

    this.time.delayedCall(500, () => {
        this.tweens.add({targets: playAgain, alpha: 0, duration: 1500, ease: 'Sine.easeOut', repeat: -1, yoyo: true});
        this.input.keyboard.once('keydown', ()=> this.startGame());
        this.input.once('pointerdown', ()=> this.startGame());
    });

  }

  private startGame(): void
  {

    this.scene.run('Game', this);
    this.scene.stop('GameOver');
  }


}
