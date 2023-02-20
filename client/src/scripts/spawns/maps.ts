
/* PLAYER SPAWNS */

export async function mapSpawns(scene: Phaser.Scene, zone: Phaser.GameObjects.GameObject): Promise<any>
{

    switch (scene.data['currentStage']) //coming from
    {
        case 'Cave':
            switch(zone.name)
            {
                case 'door1':
                    return 'door7';
                case 'door2':
                    return 'door6';
                case 'door3':
                    return /* shop? */'';
                case 'door4':
                    return /* shop? */'';
                case 'door5':
                    return /* next stage */''; 
                case 'door6':
                    return 'door2';
                case 'door7':
                    return 'door1';
                case 'door8':
                    return /* dungeon */'';
                default: 
                    return 'start';
            }
        case 'Bar': return 'start';
    }
}

