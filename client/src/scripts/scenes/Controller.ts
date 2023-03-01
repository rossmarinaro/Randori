
import { System } from '../core/Config'; 
import { Inputs } from '../core/inputs';
import { Aikidoka } from '../objects/Aikidoka';

export class Controller extends Phaser.Scene {

  public inputs: Inputs;

    constructor() {
      super('Controller');
    }

    private init(target: Aikidoka): void
    {
      this.inputs = new Inputs(target);
    }

    private create(): void
    {
      System.Config.mobileAndTabletCheck() ?  
        this.inputs.virtualControls(this) : this.inputs.keyboardControls(this);

      System.Process.app.ui.listen(this, 'Controller', this.resizeWindow);

    }

    //--------------------------

    public resizeWindow(scene: any): void
    {

      if (!scene.scene.settings.active || System.Process.app.input.virtual === false)
        return;

      if (System.Process.app.input.type === 'touch')
      {
        
        setTimeout(()=>{

          if (System.Process.app.input.type === 'touch')
          {
    
            if (scene.inputs.buttons.A !== null)
              scene.inputs.buttons.A.setPosition((76 / 100) * scene.cameras.main.width, scene.cameras.main.height / 2 + 10);
            if (scene.inputs.buttons.B !== null)
              scene.inputs.buttons.B.setPosition((90 / 100) * scene.cameras.main.width, System.Config.isPortrait(scene) ? scene.cameras.main.height / 2 + 80 : scene.cameras.main.height / 2);
            if (scene.inputs.joystick.A !== null)
              scene.inputs.joystick.A.self.setPosition(70, System.Config.isPortrait(scene) ? 450 : 200);
          }
        }, 200);

      }

    }

  }
  