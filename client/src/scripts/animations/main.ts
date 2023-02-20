

export function anims(scene: Phaser.Scene): void
{

    scene.anims.create({
        key: 'walk side',
        frames:  scene.anims.generateFrameNames('aikidoka', { prefix: 'fr', start: 0, end: 9, zeroPad: 2 }),
        frameRate: 4, repeat: -1
    });

    scene.anims.create({
        key: 'walk back',
        frames:  scene.anims.generateFrameNames('aikidoka', { prefix: 'fr', start: 18, end: 25, zeroPad: 2 }),
        frameRate: 4, repeat: -1
    });
    
    scene.anims.create({
        key: 'walk front',
        frames:  scene.anims.generateFrameNames('aikidoka', { prefix: 'fr', start: 10, end: 17, zeroPad: 2 }),
        frameRate: 4, repeat: -1
    });
    scene.anims.create({
        key: 'attack side',
        frames:  scene.anims.generateFrameNames('aikidoka', { prefix: 'fr', start: 26, end: 28, zeroPad: 2 }),
        frameRate: 4, repeat: -1
    });

    scene.anims.create({
        key: 'attack front',
        frames:  scene.anims.generateFrameNames('aikidoka', { prefix: 'fr', start: 29, end: 31, zeroPad: 2 }),
        frameRate: 4, repeat: -1
    });
    
    scene.anims.create({
        key: 'attack back',
        frames:  scene.anims.generateFrameNames('aikidoka', { prefix: 'fr', start: 32, end: 34, zeroPad: 2 }),
        frameRate: 4, repeat: -1
    });



}