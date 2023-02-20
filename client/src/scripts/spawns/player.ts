/* PLAYER SPAWNS */

export async function playerSpawns(scene: Phaser.Scene): Promise<any>
{


        switch (scene.data['currentStage']) //coming from
        {
            case 'Cave':
                switch(scene.data['spawnPoint'])
                {
                    case 'start' : return [150, 816, false, 'sv_idleFront'];  
                    case 'door1' : return [304, 1066, false, 'sv_idleFront'];  
                    case 'door2' : return [608, 982, false, 'sv_idleFront'];  
                    case 'door3' : return [608, 932, false, 'sv_idleFront'];  
                    case 'door4' : return [1232, 11460, false, 'sv_idleFront'];  
                    case 'door5' : return [1392, 308, false, 'sv_idleFront'];  
                    case 'door6' : return [608, 604, false, 'sv_idleBack'];  
                    case 'door7' : return [394, 584, false, 'sv_idleBack'];  
                    case 'door8' : return [192, 436, false, 'sv_idleFront'];  
                }   
            break;
            case 'Bar':
                switch(scene.data['spawnPoint'])
                {
                    case 'start' : return [150, 816, false, 'sv_idleFront'];  
 
                }   
            break;

            default: return [0, 0, 'down'];
        }


}



