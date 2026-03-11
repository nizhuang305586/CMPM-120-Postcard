class Load extends Phaser.Scene {
    constructor() {
        super('Load')
    }

    preload() {
        this.load.path = './assets/'
        this.load.image('cityBackground', 'background-city.jpg')
    }

    create() {
        this.scene.start('Menu')
    }
}