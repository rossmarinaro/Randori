import { System } from '../core/Config';


export class GameOver extends Phaser.Scene {


  constructor() {
    super('GameOver');
  }

  async create(scene: Phaser.Scene): Promise<void> 
  {

    this.data = scene.data;

    this.cameras.main.setBackgroundColor(0x000000);


    this.add.text(600, 300, 'GAME OVER', {fontSize: '5rem', fontFamily: 'Arial'});
    const playAgain = this.add.text(730, 500, 'play again?', {fontSize: '2rem', fontFamily: 'Courier'});
    this.time.delayedCall(500, () => {
        this.tweens.add({targets: playAgain, alpha: 0, duration: 1500, ease: 'Sine.easeOut', repeat: -1, yoyo: true});
        this.input.keyboard.once('keydown', ()=> this.startGame());
        this.input.once('pointerdown', ()=> this.startGame());
    });

  }

  private startGame(): void
  {
    System.Process.app.audio.play(this, 'shakuhachi1');
    this.scene.run('Main', this);
    this.scene.stop('GameOver');
  }




}
