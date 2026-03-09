class Play extends Phaser.Scene {
    constructor() {
        super('Play')
    }

    create() {
        this.keys = this.input.keyboard.addKeys({
            AKey: Phaser.Input.Keyboard.KeyCodes.A,
            DKey: Phaser.Input.Keyboard.KeyCodes.D,
            EKey: Phaser.Input.Keyboard.KeyCodes.E,
        })

        this.add.graphics()
            .fillStyle(0xfffff, 1)
            .fillRect(0, 0, 16, 24)
            .generateTexture('playerRect', 16, 24)

        this.player = new Player(this, 100, 500, 'playerRect')



    }

    update() {
        this.playerFSM.step()
    }
}