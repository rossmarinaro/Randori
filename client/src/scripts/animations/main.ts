

export function anims(scene: Phaser.Scene): void
{

    ['uke', 'nage'].forEach((key: string) => {

        scene.anims.create({
            key: `${key} walk side`,
            frames:  scene.anims.generateFrameNames(key, { prefix: 'fr', start: 0, end: 9, zeroPad: 2 }),
            frameRate: 8, repeat: -1
        });
    
        scene.anims.create({
            key: `${key} walk back`,
            frames:  scene.anims.generateFrameNames(key, { prefix: 'fr', start: 18, end: 25, zeroPad: 2 }),
            frameRate: 8, repeat: -1
        });
        
        scene.anims.create({
            key: `${key} walk front`,
            frames:  scene.anims.generateFrameNames(key, { prefix: 'fr', start: 10, end: 17, zeroPad: 2 }),
            frameRate: 8, repeat: -1
        });
        scene.anims.create({
            key: `${key} kokyu side`,
            frames:  scene.anims.generateFrameNames(key, { prefix: 'fr', start: 26, end: 28, zeroPad: 2 }),
            frameRate: 8, repeat: 1, yoyo: true
        });
    
        scene.anims.create({
            key: `${key} kokyu front`,
            frames:  scene.anims.generateFrameNames(key, { prefix: 'fr', start: 29, end: 31, zeroPad: 2 }),
            frameRate: 8, repeat: 1, yoyo: true
        });
        
        scene.anims.create({
            key: `${key} kokyu back`,
            frames:  scene.anims.generateFrameNames(key, { prefix: 'fr', start: 32, end: 34, zeroPad: 2 }),
            frameRate: 8, repeat: 1, yoyo: true
        });
    });



}