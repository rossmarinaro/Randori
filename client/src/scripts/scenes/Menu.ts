import { System } from '../core/Config';

export class Menu extends Phaser.Scene {


  constructor() {
    System.Process.setup.key = 'Menu';
    super(System.Process.setup);
  }

  async create(scene: Phaser.Scene): Promise<void> 
  {

    this.data = scene.data;

    this.cameras.main.fadeIn(3000).setBackgroundColor(0x000000).centerOn(this.scale.width / 2, this.scale.height / 2);

    const logo = this.add.sprite(this.scale.width / 2, this.scale.height / 2 - 50, 'logo').setScale(5);

    this.time.delayedCall(3000, () => {
        
        const start = this.add.text(logo.x - 170, logo.y + 200, 'START GAME', {fontSize: '3rem', fontFamily: 'Arial'});
        this.time.delayedCall(500, () => {
            this.tweens.add({targets: start, alpha: 0, duration: 1500, ease: 'Sine.easeOut', repeat: -1, yoyo: true});
            this.input.keyboard.once('keydown', ()=> this.startGame());
            this.input.once('pointerdown', ()=> this.startGame());
        });
    });

  }

  private startGame(): void
  {
    System.Process.app.audio.play(this, 'shakuhachi1');
    this.scene.run('Main', this);
    this.scene.stop('Menu');
  }


}
