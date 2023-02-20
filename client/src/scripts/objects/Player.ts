
import { playerAnims } from '../animations/player';
import { System } from '../core/Config';


export class Player extends Phaser.Physics.Arcade.Sprite {

  private controls: any

  constructor(scene: Phaser.Scene, x: number, y: number, flipX: boolean, anim: string) 
  {
    super(scene, x, y, 'player')

    scene.add.existing(this)
    scene.physics.add.existing(this)

    System.config.groups.playerGroup.add(this)

  //anims

    playerAnims(scene);

    this
    .play(anim, true)
    .setCollideWorldBounds(true)
    .setSize(20, 10)
    .setOffset(5, 40)
    .setFlipX(flipX)


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
            case 'sv_walkFront': 
              return 'sv_idleFront';
            case 'sv_walkBack':
              return 'sv_idleBack';
            case 'sv_walkRight':
              return 'sv_idleRight';
            case 'sv_walkLeft':
              return 'sv_idleLeft';
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
          this.anims.play('sv_walkFront', true);
    
        if (this.body.velocity.y < 0)
          this.anims.play('sv_walkBack', true);

        if (this.body.velocity.y === 0 && this.body.velocity.x < 0)
          this.anims.play('sv_walkLeft', true)
          
        if (this.body.velocity.y === 0 && this.body.velocity.x > 0)
          this.anims.play('sv_walkRight', true)
      
    //listen for state change, movement

        if (this.controls.inputs.states.left)
            this.setVelocityX(-50)
        if (this.controls.inputs.states.right)
            this.setVelocityX(50)
        if (this.controls.inputs.states.up)
            this.setVelocityY(-50)
        if (this.controls.inputs.states.down)
            this.setVelocityY(50)

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
