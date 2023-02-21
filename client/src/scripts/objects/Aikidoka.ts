import { System } from '../core/Config'

export class Aikidoka extends Phaser.Physics.Arcade.Sprite {

  private controls: any
  private _scene: Phaser.Scene
  private key: string
  private isPlayer: boolean
  private facing: string = ''
  private currentState: string | undefined

  public attacking: boolean = false
  public defend: boolean = false;

  constructor(scene: Phaser.Scene, x: number, y: number, key: string, isPlayer: boolean) 
  {

    super(scene, x, y, key);

    this._scene = scene;
    this.key = key;
    this.isPlayer = isPlayer;

    scene.add.existing(this);
    scene.physics.add.existing(this);


  //init player controller

    if (this.isPlayer)
    {
      scene.scene.run('Controller', this);
      this.controls = scene.scene.get('Controller'); 
    }
    else
      scene['entities'].add(this);

  //run update

    scene.events.on('update', ()=> this.update());

  }


  //----------------------------- set players state, attacks, etc

  public async _setState(state: string | undefined): Promise<void>
  {

    if (!this.anims.currentAnim)
      return;

    this.currentState = state;

    switch(this.currentState)
    {
        case 'idle':
        
        {
          const getFrame = async ()=> {

            switch (this.anims.currentAnim.key)
            {
              case `${this.key} walk front`: 
                return 'fr10';
              case `${this.key} walk back`:
                return 'fr18';
              case `${this.key} walk side`:
                return 'fr00';
            }
          }
  
          const frame = await getFrame();
  
          if (frame)
            this.setFrame(frame).stop();
        }

        break;

        case 'kokyu':

          this.defend = true;
          {
            const dir = await this.getDir();
            this.anims.play(`${this.key} kokyu ${dir}`);
            System.Process.app.audio.play(this._scene, 'hiyah1', 0.5);
          }
        break;
      }
  }


  //-------------------------- player update

  public async update()
  { 

      if (!this.active)
        return;

        
      this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, ()=> this.attacking = false);

    //listen for state change, movement

      if (this.isPlayer)
      {

        if (this.controls.inputs.states.left && this.x > this._scene.cameras.main.worldView.left + 10)
        {
          this.x -= 3;
          this.facing = 'side';
          this.setFlipX(true).play(
            this.controls.inputs.states.down ? `${this.key} walk front` : 
              this.controls.inputs.states.up ? 
                `${this.key} walk back` : `${this.key} walk side`, true
              );
        }

        if (this.controls.inputs.states.right && this.x < this._scene.cameras.main.worldView.right - 20)
        {
          this.x += 3;
          this.facing = 'side';
          this.setFlipX(false).play(
            this.controls.inputs.states.down ? `${this.key} walk front` : 
              this.controls.inputs.states.up ? 
                `${this.key} walk back` : `${this.key} walk side`, true
              );
        }

        if (this.controls.inputs.states.up && this.y > this._scene.scale.height / 2 - 30)
        {
          this.y -= 4;
          this.facing = 'back';
          this.setScale(this.scaleX -= 0.03, this.scaleY -= 0.03).play(`${this.key} walk back`, true);
        }

        if (this.controls.inputs.states.down && this.y < this._scene.cameras.main.worldView.bottom - 30)
        {
          this.y += 4;
          this.facing = 'front';
          this.setScale(this.scaleX += 0.03, this.scaleY += 0.03).play(`${this.key} walk front`, true);
        }

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

 
      }

    //------------------AI
      
      else 
      { 

        if (this.y !== this._scene['player'].y)
          this._scene.physics.moveToObject(this, this._scene['player'], 50); 

        switch(this._scene['player'].facing)
        {

          case 'side':
           // this.x -= 3;
            this.setFlipX(true).play(
             // this.controls.inputs.states.down ? `${this.key} walk front` : 
               // this.controls.inputs.states.up ? 
                 /*  `${this.key} walk back` : */ `${this.key} walk side`, true
                );

                // this.x += 3;
                // this.facing = 'side';
                // this.setFlipX(false).play(
                //   //this.controls.inputs.states.down ? `${this.key} walk front` : 
                //    // this.controls.inputs.states.up ? 
                //       /* `${this.key} walk back` : */ `${this.key} walk side`, true
                //     );

          break;

          case 'back':
  
            this.y -= 4;
            this.setScale(this.scaleX -= 0.03, this.scaleY -= 0.03).play(`${this.key} walk back`, true);
          
          break;

          case 'front':

            this.y += 4;
            this.setScale(this.scaleX += 0.03, this.scaleY += 0.03).play(`${this.key} walk front`, true);
          
          break;
        }

      }

      this.setDepth(this.y);


        //player actions A, B ...
        // this._setState(this.controls.inputs.state);
    
  }

  private async getDir()
  {
    switch (this.facing)
    {
      case `front`: 
        return 'front';
      case `back`:
        return 'back';
      case `side`:
        return 'side';
    }

  }
}
