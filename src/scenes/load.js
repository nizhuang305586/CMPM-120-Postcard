class Load extends Phaser.Scene {
    constructor() {
        super('Load')
    }

    preload() {
        this.load.path = './assets/'
        this.load.image('cityBackground', 'background-city.jpg')
        this.load.image('cityLayer', 'layer2.png')
        this.load.image('busStop', 'busStop.png')
        this.load.image('ApartmentComplex', 'ApartmentComplex.png')
        this.load.image('livingroom', 'LivingRoom.png')
        this.load.image('bedRoom', 'Bedroom.png')
        this.load.image('booth', 'redphonebooth.png')

        this.load.audio('bgMusic', 'bgMusic.mp3')
        this.load.audio('open', 'paperenevlopesound.mp3')
        this.load.audio('meow', 'catmeow.mp3')
        this.load.audio('footsteps', 'footsteps.mp3')
        this.load.audio('ringing', 'telephonering.mp3')

        this.load.spritesheet('mica', 'micaSprite.png', {
            frameWidth: 32,
            frameHeight: 32
        })
        this.load.spritesheet('npc', 'npcSprite.png', {
            frameWidth: 32,
            frameHeight: 32
        })
        this.load.spritesheet('cat', 'catSprite.png', {
            frameWidth: 32,
            frameHeight: 32
        })
        this.load.spritesheet('me', 'meSprite.png', {
            frameWidth: 32,
            frameHiehgt: 32,
        }) 
    }

    create() {
        this.anims.create({
            key: 'catIdle',
            frames: this.anims.generateFrameNumbers('cat', { start: 0, end: 4 }),
            frameRate: 12,
            repeat: -1
        })

        this.anims.create({
            key: 'micaIdle',
            frames: this.anims.generateFrameNumbers('mica', { start: 0, end: 0 }),
            frameRate: 0,
            repeat: -1
        })


        this.anims.create({
            key: 'micaWalk',
            frames: this.anims.generateFrameNumbers('mica', { start: 0, end: 4 }),
            frameRate: 12,
            repeat: -1
        })

        this.anims.create({
            key: 'npcIdle',
            frames: this.anims.generateFrameNumbers('npc', { start: 0, end: 4 }),
            frameRate: 12,
            repeat: -1
        })

        this.anims.create({
            key: 'meIdle',
            frames: this.anims.generateFrameNumbers('me', { start: 0, end: 4 }),
            frameRate: 12,
            repeat: -1
        })



        this.scene.start('Menu')
    }
}