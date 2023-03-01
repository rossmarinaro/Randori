import { System } from './Config';
import { Aikidoka } from '../objects/Aikidoka';

export function ukeAI(scene: Phaser.Scene, uke: Aikidoka): void
{

  if (uke.state === 'kokyu' || uke.state === 'roll') //stop actions if uke is in the following states
    return

  scene.physics.moveToObject(uke, scene['player'], System.Process.app.data.ukeSpeed); 

  uke.hitbox.setPosition(uke.x, uke.y);

  switch(scene['player'].facing)
  {

    case 'side':

      uke
        .setFlipX(scene['player'].x > uke.x ? false : true)
        .play(
          scene['player'].controls.inputs.states.down ? `${uke.key} walk front` : 
          scene['player'].controls.inputs.states.up ? 
            `${uke.key} walk back` : `${uke.key} walk side`, true
          );

    break;

    case 'back':

      if (uke.y > scene.scale.height / 2 - 30)
      {
        uke.y -= 2;
        uke.play(
            scene['player'].state !== 'moving' ?
            `${uke.key} walk side` : `${uke.key} walk back`, true
            );
      }

    break;

    case 'front':
      
      if (uke.y < uke.worldBounds.y + uke.worldBounds.height - (uke.worldBounds.height / 2 + 40))
      {
        uke.y += 2;
        uke.play(
          scene['player'].state !== 'moving' ? 
          `${uke.key} walk side` : `${uke.key} walk front`, true
          );
      }
    
    break;

  }

}
