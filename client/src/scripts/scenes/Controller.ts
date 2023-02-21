
import { System } from '../core/Config'; 
import { Inputs } from '../core/inputs';

export class Controller extends Phaser.Scene {

  public inputs: Inputs;

    constructor()
    {
      super('Controller');
      this.inputs = new Inputs(this);
    }

    create(): void
    {
      System.Config.mobileAndTabletCheck() ?  
        this.inputs.virtualControls(this) : this.inputs.keyboardControls(this);

      System.Process.app.ui.listen(this, 'Controller', this.resizeWindow);

    }

    public resizeWindow(scene: any)
    {

      if (!scene.scene.settings.active || System.Process.app.input.virtual === false)
        return;

      if (System.Process.app.input.type === 'touch'/*  && scene.isVisible === true */)
      {
        setTimeout(()=>{
          if (System.Process.app.input.type === 'touch'/*  && scene.isVisible === true */)
          {
    
            if (scene.inputs.buttons.A !== null)
              scene.inputs.buttons.A.setPosition((76 / 100) * scene.cameras.main.width, scene.cameras.main.height / 2 + 20);
            if (scene.inputs.buttons.B !== null)
              scene.inputs.buttons.B.setPosition((90 / 100) * scene.cameras.main.width, scene.cameras.main.height / 2 + 80);
            if (scene.inputs.joystick.A !== null)
              scene.inputs.joystick.A.self.setPosition(100, System.Config.isPortrait(scene) ? 450 : 200);
          }
        }, 200);

      }

    }

  }
  