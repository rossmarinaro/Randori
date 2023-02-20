import FpsText from '../objects/fpsText'


export class HUD extends Phaser.Scene {

    private fpsText: FpsText;
    private _scene: Phaser.Scene | any;
    private timeElapsed: Phaser.GameObjects.Text;
    private _time: number;

    constructor(){
        super('HUD');
    }
    create(scene: Phaser.Scene)
    {

        this._scene = scene;

    // display the Phaser.VERSION
        // this.add
        // .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
        // color: '#000000',
        // fontSize: '3rem'
        // })   
        // .setOrigin(1, 0)


        // this.fpsText = new FpsText(this)

    }
    update() {
        //this.fpsText.update()

        
      }
}