class Interact {
    constructor(scene, x, y, config = {}) {
        this.scene = scene
        this.x = x
        this.y = y

        this.width = config.width ?? 40
        this.height = config.height ?? 80
        this.radius = config.radius ?? 50
        this.promptTxt = config.promptText ?? 'E'
        this.onInteract = config.onInteract ?? null


        //temp visual: red rectangle or phone booth
        this.displayObject = scene.add.rectangle(
            x,
            y,
            this.width,
            this.height,
            config.color ?? 0xff0000
        )

        this.prompt = scene.add.text(x, y - this.height / 2 - 18, 'Press E', {
            fontSize: '12px',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 4, y: 2 }
        }).setOrigin(0.5)

        this.prompt.setVisible(false)
        this.prompt.setDepth(1000)
    }

    isPlayerNear(player) {
        return Phaser.Math.Distance.Between(
            player.x,
            player.y,
            this.x,
            this.y
        ) <= this.radius
    }

    update(player) {
        
        if (this.scene.dialogueBox.visible) {
            this.prompt.setVisible(false)
            return
        }

        this.prompt.setPosition(this.x, this.y - this.height / 2 - 16)
        this.prompt.setVisible(this.isPlayerNear(player))
    }

    tryInteract(player) {
        if (!this.isPlayerNear(player)) return false

        this.prompt.setVisible(false)

        if (this.onInteract) {
            this.onInteract(player, this)
        }

        return true
    }

    destroy() {
        if (this.displayObject) this.displayObject.destroy()
        if (this.prompt) this.prompt.destroy()
    }

}