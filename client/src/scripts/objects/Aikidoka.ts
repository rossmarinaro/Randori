

export class Aikidoka extends Phaser.Physics.Arcade.Sprite {

  private controls: any
  private _scene: Phaser.Scene
  private key: string
  private isPlayer: boolean
  private resetCam: boolean = false

  constructor(scene: Phaser.Scene, x: number, y: number, key: string, isPlayer: boolean) 
  {

    super(scene, x, y, key);

    this._scene = scene;
    this.key = key;
    this.isPlayer = isPlayer;

    scene.add.existing(this);

  //init player controller

    scene.scene.run('Controller');
    this.controls = scene.scene.get('Controller'); 


  //run update

    scene.events.on('update', ()=> this.update());

  }


  //----------------------------- set players state, attacks, etc

  public async _setState(state: string | undefined)
  {

    if (!this.anims.currentAnim)
      return;

    switch(state)
    {
      case 'idle':
        
        const getFrame = async ()=> {

          switch (this.anims.currentAnim.key)
          {
            case `${this.key} walk front`: 
              return 'fr10';
            case 'walk back':
              return 'fr18';
            case `${this.key} walk side`:
              return 'fr00';
          }
        }

        const frame = await getFrame();

        if (frame)
          this.setFrame(frame).stop();

    }
  }


  //-------------------------- player update

  public async update()
  { 

      if (!this.active)
        return;

    //listen for state change, movement

      if (this.isPlayer)
      {
        if (this.controls.inputs.states.left && this.x > this._scene.cameras.main.worldView.left + 10)
        {
          this.x -= 5;
          this.setFlipX(true).play(
            this.controls.inputs.states.down ? `${this.key} walk front` : 
              this.controls.inputs.states.up ? 
                `${this.key} walk back` : `${this.key} walk side`, true
              );
        }
        if (this.controls.inputs.states.right && this.x < this._scene.cameras.main.worldView.right - 20)
        {
          this.x += 5;
          this.setFlipX(false).play(
            this.controls.inputs.states.down ? `${this.key} walk front` : 
              this.controls.inputs.states.up ? 
                `${this.key} walk back` : `${this.key} walk side`, true
              );
        }
        if (this.controls.inputs.states.up && this.y > this._scene.scale.height / 2 - 30)
        {
          this.y -= 5;
          this.setScale(this.scaleX -= 0.03, this.scaleY -= 0.03).play(`${this.key} walk back`, true);
        }
        if (this.controls.inputs.states.down && this.y < this._scene.cameras.main.worldView.bottom - 30)
        {
          this.y += 5;
          this.setScale(this.scaleX += 0.03, this.scaleY += 0.03).play(`${this.key} walk front`, true);
        }
      }

      this.setDepth(this.y);
   // this.setY(!this._scene.scale.isFullscreen ? this._scene.cameras.main.height / 2 : this.scene.cameras.main.height / 2 - 30);



    //set to idle

        if (    
          (
            !this.controls.inputs.states.left && 
            !this.controls.inputs.states.right && 
            !this.controls.inputs.states.up && 
            !this.controls.inputs.states.down
          ) 
        )
          this._setState('idle');

          
        //player actions A, B ...
        //  this._setState(this.controls.inputs.state);
    
  }
}
