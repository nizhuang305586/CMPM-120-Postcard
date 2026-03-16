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

        this.load.audio('bgMusic', 'bgMusic.mp3')

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
    }

    create() {
        this.scene.start('Menu')
    }
}