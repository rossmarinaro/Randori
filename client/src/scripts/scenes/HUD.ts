import { System } from '../core/Config';

export class HUD extends Phaser.Scene {


    private scoreText: Phaser.GameObjects.Text;
    private timeText: Phaser.GameObjects.Text;
    private levelText: Phaser.GameObjects.Text;


    constructor(){
        super('HUD');
    }
    public create(): void
    {


        this.add.text(10, 10, 'UKE: ', {fontSize: '3rem', fontFamily: 'Digitizer'}).setStroke('#ff0000', 4);
        this.levelText = this.add.text(220, 10, '', {fontSize: '3rem', fontFamily: 'Digitizer'}).setStroke('#ff0000', 4);

        this.add.text(10, 60, 'SCORE: ', {fontSize: '3rem', fontFamily: 'Digitizer'}).setStroke('#ff0000', 4);
        this.scoreText = this.add.text(220, 60, '', {fontSize: '3rem', fontFamily: 'Digitizer'}).setStroke('#ff0000', 4);

        this.add.text(10, 110, 'TIME: ', {fontSize: '3rem', fontFamily: 'Digitizer'}).setStroke('#ff0000', 4);
        this.timeText = this.add.text(220, 110, '', {fontSize: '3rem', fontFamily: 'Digitizer'}).setStroke('#ff0000', 4);
    }

    public update(): void 
    {

        this.scoreText.setText(System.Process.app.data.score.toString());
        this.levelText.setText(System.Process.app.data.currentLevel.toString());
        this.timeText.setText(this.scene.get('Game')['timeLeft'].toFixed(2).toString());

    }
} 