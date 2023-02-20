
export default class Player2 extends Phaser.GameObjects.Sprite { 
    // keyboard key for moving up 
    private keyW: Phaser.Input.Keyboard.Key; 
    // keyboard key for moving left 
    private keyA: Phaser.Input.Keyboard.Key;
    // keyboard key for moving down 
    private keyS: Phaser.Input.Keyboard.Key; 
    // keyboard key for moving right
     private keyD: Phaser.Input.Keyboard.Key; 
     constructor(scene: Phaser.Scene, x: number, y: number) {
      super(scene, x, y, 'player'); 

         this.scene.add.existing(this); 
         this.scene.physics.add.existing(this);
         this.getBody().setCollideWorldBounds(true);
         this.keyW = this.scene.input.keyboard.addKey("W");
         this.keyA = this.scene.input.keyboard.addKey("A");
         this.keyS = this.scene.input.keyboard.addKey("S"); 
         this.keyD = this.scene.input.keyboard.addKey("D"); 
     //     this.scene.anims.create({
     //          key: "idle",
     //         frames: this.scene.anims.generateFrameNames("assets/elf_f", { prefix: "idle_anim_f", end: 3 }),
     //    frameRate: 8 
     //      });
     //     this.scene.anims.create({
     //          key: "run", frames: this.scene.anims.generateFrameNames("assets/elf_f", { prefix: "run_anim_f", end: 3 }), frameRate: 8 
     //      }); 
              // set collision bounds
               this.getBody().setSize(16, 16);
                this.getBody().setOffset(0, 12);
             } 
     /** * This should be called every frame. */ 
             public update(): void {
      // update velocity 
                if (this.keyW.isDown)  this.getBody().setVelocity(0, -64);
                else if (this.keyA.isDown)  this.getBody().setVelocity(-64, 0);
                else if (this.keyS.isDown) this.getBody().setVelocity(0, 64); 
                else if (this.keyD.isDown) this.getBody().setVelocity(64, 0);  
                else  this.getBody().setVelocity(0, 0); 
      // update flip x
                 if (this.getBody().velocity.x > 0)  this.setFlipX(false); 
                 else if (this.getBody().velocity.x < 0)  this.setFlipX(true);
      // update frame and physics body 
               // if (this.getBody().velocity.x === 0 && this.getBody().velocity.y === 0)this.anims.play("idle", true);
              //  else  this.anims.play("run", true); 
                            
              } /** * Get the physics body *
                         @return {Phaser.Physics.Arcade.Body} - the physics body */ 
                         private getBody(): Phaser.Physics.Arcade.Body { return this.body as Phaser.Physics.Arcade.Body; }
        }