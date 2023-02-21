import { System } from './Config';


export class UI {

    private parent: Phaser.Structs.Size;
    private sizer: Phaser.Structs.Size;

    constructor(){}

    //-----------------------------------------------------------

    listen (scene: Phaser.Scene, key: string, callback?: any)  
    {
   
        const _resize = (scene: Phaser.Scene, key: string) => {
            scene.scene.settings.visible = false;   //disable scene visibility / call resize method
            System.Process.app.ui.resize(scene, key);
            if (callback !== null)
                callback(scene);
        },
        _resizeCheck = (scene: Phaser.Scene, key: string) => {
            if (scene.scene.settings.active) 
                _resize(scene, key);
        };

        _resize(scene, key);

        scene.scale.on('resize', ()=> _resizeCheck(scene, key), scene);
        screen.orientation.addEventListener('change', ()=> _resizeCheck(scene, key));
        screen.orientation.addEventListener('webkitfullscreenchange', ()=> _resizeCheck(scene, key));
    }

    
//-----------------------------------------------------------

    callSizer (scene: Phaser.Scene)
    {
        return (
            this.parent = new Phaser.Structs.Size(scene.scale.gameSize.width, scene.scale.gameSize.height).setSize(scene.scale.gameSize.width, scene.scale.gameSize.height),
            this.sizer = new Phaser.Structs.Size(scene.cameras.main.width, scene.cameras.main.height, Phaser.Structs.Size.FIT, this.parent).setSize(scene.scale.gameSize.width, scene.scale.gameSize.height)
        );
    }

//-----------------------------------------------------------

    checkOrientation (scene: Phaser.Scene, key: string) 
    {
        switch (key)
        {
            case 'Preload': 
            return[
                !System.Config.isDesktop(scene) && System.Config.isLandscape(scene) ? 1400 : scene.cameras.main.width,
                !System.Config.isDesktop(scene) && System.Config.isLandscape(scene) ? 1800 : scene.cameras.main.height
            ];
            case 'Controller':
                return[scene.cameras.main.width, scene.cameras.main.height]; 
            case 'Modal':
                return [450, 800];
            case 'HUD':
                return[
                    !System.Config.isDesktop(scene) && System.Config.isLandscape(scene) ? 1400 : 740,
                    !System.Config.isDesktop(scene) && System.Config.isLandscape(scene) ? 1800 : 960
                ];
            case 'PauseMenu':
                if (!System.Config.isDesktop(scene))
                    return System.Config.isLandscape(scene) ? [1700, 1200] : [800, 1200];
                else 
                    return [2200, 980];
        }
    }


//------------------------------------------------------------

    async getPosition (scene: Phaser.Scene, key: string): Promise<[number, number, boolean]>
    {
        switch(key)
        {
            case 'Controller': case 'Mini': 
                return[scene.cameras.main.width / 2, scene.cameras.main.height / 2, false];
            case 'Preload': 
                if (System.Config.isDesktop(scene))
                    return[scene.cameras.main.width / 2, scene.cameras.main.height / 3.5, false];
                else
                    return[
                        System.Config.isLandscape(scene) ? 180 : scene.cameras.main.width / 2, 
                        System.Config.isLandscape(scene) ? scene.cameras.main.height / 2 : scene.cameras.main.height / 3.5, 
                        false
                    ];
            case 'Modal': 
                    return[
                        System.Config.isDesktop(scene) ? 200 : scene.cameras.main.width / 2, 
                        System.Config.isDesktop(scene) ? scene.cameras.main.height / 2 : scene.cameras.main.height / 2.5, 
                        false
                    ];
            case 'HUD':
                return[
                    !System.Config.isDesktop(scene) && System.Config.isLandscape(scene) ? 
                    scene.cameras.main.width / 3.5 : scene.cameras.main.width / 2, scene.cameras.main.height / 2,
                    false
                ];
            case 'PauseMenu':
                if (System.Config.isLandscape(scene))
                    return[
                        !System.Config.isDesktop(scene) ? 420 : 30, 
                        !System.Config.isDesktop(scene) ? 650 : scene.cameras.main.height / 2.4, 
                        !System.Config.isDesktop(scene) ? false : true
                    ];
                else                 
                    return[
                        scene.cameras.main.width / 2, 
                        !System.Config.isDesktop(scene) ? scene.cameras.main.height / 2.5 : scene.cameras.main.height / 2, 
                        false
                    ];
            default:
                    return [0, 0, false];

        }
    }

//-------------------------------------------------------------

    setCamera (scene: Phaser.Scene, x: number, y: number, pos: boolean)
    {
        if (pos === true)
        {
            let posX = System.Config.isDesktop(scene) ? 40 : scene.cameras.main.height > 400 ? 140 : scene.cameras.main.width / 2 - 150;

            scene.cameras.main.setPosition(posX, screenTop /* - 150 */)  

            if (!System.Config.isDesktop(scene))
                scene.cameras.main.setZoom(
                    Math.min(
                        this.sizer.width / scene.cameras.main.width, 
                        this.sizer.height / scene.cameras.main.height
                    )
                );
        }
        else 
        {
            scene.cameras.main
            .setViewport(Math.ceil((this.parent.width - this.sizer.width) * 0.5), screenTop, this.sizer.width, this.sizer.height)
            .setZoom(Math.max(this.sizer.width / scene.cameras.main.width, this.sizer.height / scene.cameras.main.height))
            .centerOn(x, y);
        }

    ////make scene visible
        scene.scene.settings.visible = true;
    }


//-------------------------------------------------------------

    resize(scene: Phaser.Scene, key: string)
    {
    
        const orientation = this.checkOrientation(scene, key); 

        if (!orientation)
            return;
        
        scene.cameras.main.width = orientation[0];
        scene.cameras.main.height = orientation[1];
        
        this.callSizer(scene);

        setTimeout(async ()=> {

            const position = await this.getPosition(scene, key);

            this.setCamera(scene, position[0], position[1], position[2]);

        }, 300);
    }
}