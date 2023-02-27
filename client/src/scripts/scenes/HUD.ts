import { System } from '../core/Config';

export class HUD extends Phaser.Scene {


    private scoreText: Phaser.GameObjects.Text;
    private timeText: Phaser.GameObjects.Text;
    private levelText: Phaser.GameObjects.Text;
    private scoreText1: Phaser.GameObjects.Text;
    private timeText1: Phaser.GameObjects.Text;
    private levelText1: Phaser.GameObjects.Text;
    private highScore: Phaser.GameObjects.Text;

    constructor(){
        super('HUD');
    }
    public create(): void
    {


        this.levelText1 = this.add.text(10, 10, 'UKE: ', {fontSize: '3rem', fontFamily: 'Digitizer'}).setStroke('#ff0000', 4);
        this.levelText = this.add.text(220, 10, '', {fontSize: '3rem', fontFamily: 'Digitizer'}).setStroke('#ff0000', 4);

        this.scoreText1 = this.add.text(10, 60, 'SCORE: ', {fontSize: '3rem', fontFamily: 'Digitizer'}).setStroke('#ff0000', 4);
        this.scoreText = this.add.text(220, 60, '', {fontSize: '3rem', fontFamily: 'Digitizer'}).setStroke('#ff0000', 4);

        this.timeText1 = this.add.text(10, 110, 'TIME: ', {fontSize: '3rem', fontFamily: 'Digitizer'}).setStroke('#ff0000', 4);
        this.timeText = this.add.text(220, 110, '', {fontSize: '3rem', fontFamily: 'Digitizer'}).setStroke('#ff0000', 4);

        if (System.Process.app.data.currentLevel >= 10)
            this.highScore = this.add.text(10, 160, 'HIGH SCORE!', {fontSize: '3rem', fontFamily: 'Digitizer'}).setStroke('#ffff00', 4);
            this.tweens.add({targets: this.highScore, alpha: 0.5, duration: 500, ease: 'Sine.easeOut', repeat: -1, yoyo: true});

    }

    public update(): void 
    {

        this.scoreText.setText(System.Process.app.data.score.toString());
        this.levelText.setText(System.Process.app.data.currentLevel.toString());
        this.timeText.setText(this.scene.get('Game')['timeLeft'].toFixed(2).toString());

        //scale / position

        setTimeout(()=> {


            if (!System.Config.mobileAndTabletCheck())
            {
                this.levelText1.setScale(System.Config.isLandscape(this) ? 1 : 0.6);
                this.levelText.setScale(System.Config.isLandscape(this) ? 1 : 0.6).setX(this.levelText1.x + this.levelText1.width);
        
                this.scoreText1.setScale(System.Config.isLandscape(this) ? 1 : 0.6);
                this.scoreText.setScale(System.Config.isLandscape(this) ? 1 : 0.6).setX(this.scoreText1.x + this.scoreText1.width);
        
                this.timeText1.setScale(System.Config.isLandscape(this) ? 1 : 0.6);
                this.timeText.setScale(System.Config.isLandscape(this) ? 1 : 0.6).setX(this.timeText1.x + this.timeText1.width);

                if (this.highScore)
                    this.highScore.setScale(System.Config.isLandscape(this) ? 1 : 0.6);
            }
            else
            {
                this.levelText1.setScale(System.Config.isLandscape(this) ? 0.6 : 0.3);
                this.levelText.setScale(System.Config.isLandscape(this) ? 0.6 : 0.3).setX(this.levelText1.x + this.levelText1.width / 2 + 10);
        
                this.scoreText1.setScale(System.Config.isLandscape(this) ? 0.6 : 0.3);
                this.scoreText.setScale(System.Config.isLandscape(this) ? 0.6 : 0.3).setX(this.scoreText1.x + this.scoreText1.width / 2 + 10);
        
                this.timeText1.setScale(System.Config.isLandscape(this) ? 0.6 : 0.3);
                this.timeText.setScale(System.Config.isLandscape(this) ? 0.6 : 0.3).setX(this.timeText1.x + this.timeText1.width / 2 + 10);

                if (this.highScore)
                    this.highScore.setScale(System.Config.isLandscape(this) ? 0.6 : 0.3);
                
            }


        }, 200);

    }
} 