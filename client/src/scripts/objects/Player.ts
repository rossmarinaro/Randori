

import { System } from '../core/Config';


export class Player extends Phaser.Physics.Arcade.Sprite {

  private controls: any
  private _scene: Phaser.Scene


  constructor(scene: Phaser.Scene, x: number, y: number) 
  {

    super(scene, x, y, 'nage');

    this._scene = scene;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    System.config.groups.playerGroup.add(this)

    this.setScale(5).setOffset(5, 40).setTexture('aikidoka', 'fr05');

  //init player controller

    scene.scene.run('Controller');
    this.controls = scene.scene.get('Controller'); 


  //run update

    scene.events.on('update', ()=> {

        if (!this.active)
          return;

        this.update();       

 
    })

  }


  //----------------------------- set players state, attacks, etc

  public async _setState(state: string | undefined)
  {
    switch(state)
    {
      case 'idle':
        
        const getAnim = async ()=> {
          switch (this.anims.currentAnim.key)
          {
            case 'walk front': 
              return 'fr10';
            case 'walk back':
              return 'fr18';
            case 'walk side':
              return 'fr00';
          }
        }

        const anim = await getAnim()

        if (anim !== undefined)
          this.play(anim, true);

        this.setVelocity(0, 0);
    }
  }


  //-------------------------- player update

  public async update()
  { 

    //walk anims
    
        if (this.body.velocity.y > 0)
          this.play('walk front', true);
    
        if (this.body.velocity.y < 0)
          this.play('walk back', true);

        if (this.body.velocity.y === 0 && this.body.velocity.x < 0)
          this.setFlipX(true).play('walk side', true)
          
        if (this.body.velocity.y === 0 && this.body.velocity.x > 0)
          this.setFlipX(false).play('walk side', true);  
      
    //listen for state change, movement

        if (this.controls.inputs.states.left && this.x > 600)
            this.setVelocityX(-270)
        if (this.controls.inputs.states.right && this.x < 1000)
            this.setVelocityX(270)
      //  if (this.controls.inputs.states.up && this.y < this._scene.cameras.main.worldView.bottom)
       //     this./* setScale(this.scaleX += 0.01, this.scaleY += 0.01). */setVelocityY(-70);
      //  if (this.controls.inputs.states.down && this.y > this._scene.cameras.main.worldView.top)
       //     this./* setScale(this.scaleX -= 0.01, this.scaleY -= 0.01). */setVelocityY(70);


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
