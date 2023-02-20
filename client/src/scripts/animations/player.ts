

export function playerAnims(scene: Phaser.Scene)
{
    scene.anims.create({
        key: 'sv_idleFront',
        frames:  scene.anims.generateFrameNames('player', { prefix: 'fr', start: 0, end: 2, zeroPad: 2 }),
        frameRate: 4, repeat: -1, yoyo: true
    });

    scene.anims.create({
        key: 'sv_idleBack',
        frames:  scene.anims.generateFrameNames('player', { prefix: 'fr', frames: [10, 18, 19], zeroPad: 2 }),
        frameRate: 4, repeat: -1, yoyo: true
    });

    scene.anims.create({
        key: 'sv_idleRight',
        frames:  scene.anims.generateFrameNames('player', { prefix: 'fr', frames: [5, 6, 7, 6], zeroPad: 2 }),
        frameRate: 4, repeat: -1
    });

    scene.anims.create({
        key: 'sv_idleLeft',
        frames:  scene.anims.generateFrameNames('player', { prefix: 'fr', frames: [13, 14, 15, 14], zeroPad: 2 }),
        frameRate: 4, repeat: -1
    });

    scene.anims.create({
        key: 'sv_walkRight',
        frames:  scene.anims.generateFrameNames('player', { prefix: 'fr', frames: [6, 8, 6, 9], zeroPad: 2 }),
        frameRate: 4, repeat: -1
    });
    
    scene.anims.create({
        key: 'sv_walkLeft',
        frames:  scene.anims.generateFrameNames('player', { prefix: 'fr', frames: [13, 16, 13, 17], zeroPad: 2 }),
        frameRate: 4, repeat: -1
    });
    
    scene.anims.create({
        key: 'sv_walkFront',
        frames:  scene.anims.generateFrameNames('player', { prefix: 'fr', frames: [0, 3, 0, 4], zeroPad: 2 }),
        frameRate: 4, repeat: -1
    });

    scene.anims.create({
        key: 'sv_walkBack',
        frames:  scene.anims.generateFrameNames('player', { prefix: 'fr', frames: [10, 11, 10, 12], zeroPad: 2 }),
        frameRate: 4, repeat: -1
    });


}