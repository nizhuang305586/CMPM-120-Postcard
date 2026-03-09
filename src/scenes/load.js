class Load extends Phaser.Scene {
    constructor() {
        super('Load')
    }

    create() {
        this.load.path = './assets/'
    }
}