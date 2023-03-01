import { parseResources } from '../core/parser';
import { anims } from '../animations/main';

export class Preload extends Phaser.Scene {
  constructor() {
    super({ key: 'Preload' })
  }
  
  private init(data: Phaser.Scenes.Systems | any): void
  {
    this.data = data;

  }


  private async preload(): Promise<void> 
  {
    
    await parseResources(this, this.cache.json.get('resources_main')); 
  }

  private create(): void 
  {


    anims(this);

    this.scene.run('Menu')
    this.scene.stop('Preload');
    
    /**
     * This is how you would dynamically import the mainScene class (with code splitting),
     * add the mainScene to the Scene Manager
     * and start the scene.
     * The name of the chunk would be 'mainScene.chunk.js
     * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
     */
    // let someCondition = true
    // if (someCondition)
    //   import(/* webpackChunkName: "mainScene" */ './mainScene').then(mainScene => {
    //     this.scene.add('MainScene', mainScene.default, true)
    //   })
    // else console.log('The mainScene class will not even be loaded by the browser')
  }

}
 