class Interact extends Phaser.GameObjects.Sprite {
    constructor(x, y, texture, messsage, radius = 40) {
        super(x, y, texture)

        scene.add.existing(true)
        this.message = message
        this.radius = radius

        this.prompt = scene.add.text(x, y - 24, 'E', {
            fontSize: '10px',
            color: '#ffffff',
            backgroundColor: '#000000'
        }).setOrigin(0.5)

        this.prompt.setVisible = false

    }

    isPlayerNear(player) {
        const dist = Phaser.Math.Distance.Between(
            player.x, player.y,
            this.x, this.y
        )

        return dist <= this.radius
    }

    updatePrompt(player) {
        this.prompt.setPosition(this.x, this.y - 24)
        this.prompt.setVisible(this.isPlayerNear(player))
    }

    tryInteract(player) {
        if (this.isPlayerNear(player)) {
            return this.message
        }

        return null
    }

}