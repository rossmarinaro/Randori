

export class HUD extends Phaser.Scene {

    private _scene: Phaser.Scene | any;
    private scoreText: Phaser.GameObjects.Text;
    private score: number;

    constructor(){
        super('HUD');
    }
    public create(scene: Phaser.Scene): void
    {
        this.score = 0;
        this._scene = scene;

        this.add.text(10, 10, 'SCORE: ', {fontSize: '3rem', fontFamily: 'Arial'}).setStroke('#ff0000', 4);
        this.scoreText = this.add.text(220, 10, '', {fontSize: '3rem', fontFamily: 'Arial'}).setStroke('#ff0000', 4);
    }

    public update(): void 
    {
        
        this.scoreText.setText(this.score.toString());
        
      }
}