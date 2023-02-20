

export class HUD extends Phaser.Scene {

    private _scene: Phaser.Scene | any;
    private timeElapsed: Phaser.GameObjects.Text;
    private _time: number;

    constructor(){
        super('HUD');
    }
    create(scene: Phaser.Scene)
    {

        this._scene = scene;

        this.add.text(10, 10, 'SCORE: ', {fontSize: '3rem', fontFamily: 'Arial'}).setStroke('#ff0000', 4);

    }
    update() {
        //this.fpsText.update()

        
      }
}