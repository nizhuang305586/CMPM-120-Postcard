class Load extends Phaser.Scene {
    constructor() {
        super('Load')
    }

    preload() {
        this.load.path = './assets/'
        this.load.image('cityBackground', 'background-city.jpg')
        this.load.image('cityLayer', 'layer2.png')

        this.load.audio('bgMusic', 'bgMusic.mp3')
    }

    create() {
        this.scene.start('Menu')
    }
}