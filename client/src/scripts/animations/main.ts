

export function anims(scene: Phaser.Scene): void
{


    ['uke', 'nage'].forEach((key: string) => {

        
        scene.anims.create({
            key: `${key} roll`,
            frames:  scene.anims.generateFrameNames(key, { prefix: 'fr', start: 0, end: 4, zeroPad: 2 }),
            frameRate: 8, repeat: 0
        });

        scene.anims.create({
            key: `${key} walk side`,
            frames:  scene.anims.generateFrameNames(key, { prefix: 'fr', start: 5, end: 14, zeroPad: 2 }),
            frameRate: 8, repeat: -1
        });

        scene.anims.create({
            key: `${key} walk front`,
            frames:  scene.anims.generateFrameNames(key, { prefix: 'fr', start: 15, end: 22, zeroPad: 2 }),
            frameRate: 8, repeat: -1
        });
    
        scene.anims.create({
            key: `${key} walk back`,
            frames:  scene.anims.generateFrameNames(key, { prefix: 'fr', start: 23, end: 30, zeroPad: 2 }),
            frameRate: 8, repeat: -1
        });
        

        scene.anims.create({
            key: `${key} kokyu side`,
            frames:  scene.anims.generateFrameNames(key, { prefix: 'fr', start: 31, end: 33, zeroPad: 2 }),
            frameRate: 8, repeat: 1, yoyo: true
        });
    
        scene.anims.create({
            key: `${key} kokyu front`,
            frames:  scene.anims.generateFrameNames(key, { prefix: 'fr', start: 34, end: 36, zeroPad: 2 }),
            frameRate: 8, repeat: 1, yoyo: true
        });
        
        scene.anims.create({
            key: `${key} kokyu back`,
            frames:  scene.anims.generateFrameNames(key, { prefix: 'fr', start: 37, end: 39, zeroPad: 2 }),
            frameRate: 8, repeat: 1, yoyo: true
        });
    });



}