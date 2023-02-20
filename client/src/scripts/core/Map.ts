import { System } from './Config';
import { mapSpawns } from '../spawns/maps';

export class Map {

    public self: Phaser.Tilemaps.Tilemap
    public tiles: Phaser.Tilemaps.Tileset
    private scene: Phaser.Scene

    constructor(scene: Phaser.Scene)
    {
        this.scene = scene;
        this.init();
    }

    private async init()
    { 
        

    }


} 