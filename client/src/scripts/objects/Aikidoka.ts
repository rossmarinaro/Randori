import { System } from '../core/Config'
import { ukeAI } from '../core/AI'


export class Aikidoka extends Phaser.Physics.Arcade.Sprite {

  private controls: any
  private _scene: Phaser.Scene
  private isPlayer: boolean
  private facing: string = 'side'

  public key: string  
  public YFactor: number = 0.1
  public hitbox: Phaser.GameObjects.Rectangle
  public setUkeState: Function
  public worldBounds: Phaser.GameObjects.Sprite


  constructor(scene: Phaser.Scene, x: number, y: number, key: string, isPlayer: boolean) 
  {

    super(scene, x, y, key);

    this._scene = scene;
    this.key = key;
    this.isPlayer = isPlayer;
    this.worldBounds = this._scene['background'];

    scene.add.existing(this);
    scene.physics.add.existing(this);


  //init player controller

    if (this.isPlayer)
    {
      scene.scene.run('Controller', this);
      this.controls = scene.scene.get('Controller'); 
      this.setSize(30, 20).setFrame('fr05');
    }

    //uke

    else 
    {

      scene['entities'].push(this); 
      this.hitbox = scene.add.rectangle(0, 0, 5, 20); scene.physics.world.enable(this.hitbox);

      System.Process.app.data.ukeSpeed = System.Process.app.data.currentLevel * 5;

      //roll player proxy function

      this.setUkeState = (state: string) => this.applyState(state); 

    }


  //run update

    scene.events.on('update', ()=> this.update());

  }


  //----------------------------- set players state, attacks, etc

  public async applyState(state: string | undefined): Promise<void>
  {

    switch(state)
    {
        case 'idle':
        
        {
          const frame = await this.getFrame();

          if (frame)
            this.setFrame(frame).stop();
        }

        break;

        case 'kokyu':

          {
            this.setState('kokyu');
            const dir = await this.getDir();
            this.anims.play(`${this.key} kokyu ${dir}`, true);
            System.Process.app.audio.play(this._scene, 'hiyah1', 0.5);
          }

        break;

        case 'roll':
     
          this.setState('roll');
          this.hitbox.active = false;
          this._scene.physics.world.disable(this.hitbox);

          this._scene.time.delayedCall(700, () => {
            this.setState('');
            this.hitbox.active = true;
            this._scene.physics.world.enable(this.hitbox);
          });

          this.anims.play(`${this.key} roll`, true);

          if (!this.isPlayer)
            this._scene.physics.moveToObject(this, this._scene['player'], 125);
          else 
            this.flipX ? this.x -= 6 : this.x += 6; 

        break;
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
          this.x -= 3;
          this.facing = 'side';
          this.setState('moving').setFlipX(true).play(
            this.controls.inputs.states.down ? `${this.key} walk front` : 
              this.controls.inputs.states.up ? 
                `${this.key} walk back` : `${this.key} walk side`, true
              );
        }

        if (this.controls.inputs.states.right && this.x < this._scene.cameras.main.worldView.right - 20)
        {
          this.x += 3;
          this.facing = 'side';
          this.setState('moving').setFlipX(false).play(
            this.controls.inputs.states.down ? `${this.key} walk front` : 
              this.controls.inputs.states.up ? 
                `${this.key} walk back` : `${this.key} walk side`, true
              );
        }

        if (this.controls.inputs.states.up && this.y > this._scene.scale.height / 2 - 30)
        {
          this.y -= 4; 
          this.YFactor -= 0.005;
          this.facing = 'back';
          this.setState('moving').play(`${this.key} walk back`, true);
        }

        if (this.controls.inputs.states.down && this.y < this.worldBounds.y + this.worldBounds.height - (this.worldBounds.height / 2 + 40))
        {
          this.y += 4;
          this.YFactor += 0.005;
          this.facing = 'front';
          this.setState('moving').play(`${this.key} walk front`, true);
        }

        //set to idle

        if (    
          (
            !this.controls.inputs.states.left && 
            !this.controls.inputs.states.right && 
            !this.controls.inputs.states.up && 
            !this.controls.inputs.states.down &&
            !this.controls.inputs.states.A &&
            !this.controls.inputs.states.B 
          ) 
        )
        this.setState('').applyState('idle');

 
      }

    //------------------ enemy AI
      
      else 
        ukeAI(this._scene, this);



    //set depth and scale

    this
      .setDepth(this.y)
      .setScale(((this.y * 0.002) * (this._scene.cameras.main.height / 100)) * this.YFactor);  

    //prevent y axis from extending beyond floor / reset scale

      if (this.y < this._scene.scale.height / 2 - 35)
      {
        this.y = this._scene.scale.height / 2 - 30;
        this.setScale(0.4);
      }

      if (this.y === this.worldBounds.y + this.worldBounds.height - (this.worldBounds.height / 2 + 40))
      {
        this.setScale(1.35);
      }

      if (this.scale > 1.35)
        this.setScale(1.35);

      if (this.scale < 0.4)
        this.setScale(0.4);

    
  }

  //---------------------------- get frame 

  private async getFrame ()
  {

    if (!this.anims.currentAnim)
      return;

    switch (this.anims.currentAnim.key)
    {
      case `${this.key} walk front`: 
        return 'fr15';
      case `${this.key} walk back`:
        return 'fr23';
      case `${this.key} walk side`: case `${this.key} roll`: 
        return 'fr05';
    }
  }

  //--------------------------- get direction

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
