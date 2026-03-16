class ApartmentRoom extends Phaser.Scene {
    constructor() {
        super('ApartmentR')
    }

    create() {
        this.bgFront = this.add.image(0, 0, 'livingroom').setOrigin(0, 0)

        this.interactables = []
        this.currentInteractable = null

        // dialogue UI
        this.dialogueBox = this.add.rectangle(480, 340, 360, 52, 0x000000, 0.85)
            .setVisible(false)
            .setScrollFactor(0)
            .setDepth(100)

        this.dialogueText = this.add.text(310, 322, '', {
            fontSize: '11px',
            color: '#ffffff',
            wordWrap: { width: 320 }
        })
        .setVisible(false)
        .setScrollFactor(0)
        .setDepth(101)

        this.responseText = this.add.text(310, 342, '', {
            fontSize: '11px',
            color: '#ffff66'
        })
        .setVisible(false)
        .setScrollFactor(0)
        .setDepth(101)

        // keep same dialogue style as Play
        this.openDialogue = (message, response) => {
            this.dialogueBox.setVisible(true)
            this.dialogueText.setText(message).setVisible(true)
            this.responseText.setText('[1] ' + response).setVisible(true)
        }

        this.closeDialogue = () => {
            this.dialogueBox.setVisible(false)
            this.dialogueText.setVisible(false)
            this.responseText.setVisible(false)
            this.currentInteractable = null
        }
        this.meSprite = this.add.sprite(150, 325, 'me')
            .setOrigin(0.5, 1)
            .setDepth(5)
            .setScale(1.5)

        const me = new Interact(this, 150, 325, {
            width: this.meSprite.displayWidth,
            height: this.meSprite.displayHeight,
            color: 0xFFFFFF,
            radius: 60,
            dialogueSequence: [
                { message: 'How were finals?', response: 'mehhh, is okay' },
                { message: 'oh. what happened', response: 'it was really hard and im hungry :(' },
                { message: 'lets get that sushi place to celebrate end of spring quarter', response: 'yippee' }
            ],
            onDialogueComplete: () => {
                this.time.delayedCall(500, () => {
                    this.scene.start('Ending')
                })
            }
        })

        if (me.displayObject) {
            me.displayObject.setVisible(false)
        }
        this.interactables.push(me)

        const mapWidth = this.bgFront.displayWidth
        const mapHeight = this.bgFront.displayHeight

        const spawnX = 80
        this.player = new Player(this, spawnX, 300, 'mica')
        this.player.setDepth(6)
        this.player.setScale(1.5)
        this.player.setCollideWorldBounds(true)

        this.physics.world.setBounds(0, 0, mapWidth, mapHeight)
        this.cameras.main.setBounds(0, 0, mapWidth, mapHeight)

        // Camera
        this.cameras.main.setDeadzone(120, 540)
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08)
        this.cameras.main.setZoom(1.7)

        this.keys = this.input.keyboard.addKeys({
            AKey: Phaser.Input.Keyboard.KeyCodes.A,
            DKey: Phaser.Input.Keyboard.KeyCodes.D,
            EKey: Phaser.Input.Keyboard.KeyCodes.E,
            OneKey: Phaser.Input.Keyboard.KeyCodes.ONE,
        })
    }

    update() {
        this.playerFSM.step()

        for (const interactable of this.interactables) {
            interactable.update(this.player)
        }

        // continue multi-step dialogue with 1
        if (Phaser.Input.Keyboard.JustDown(this.keys.OneKey)) {
            if (this.dialogueBox.visible && this.currentInteractable) {
                this.currentInteractable.tryInteract(this.player)
                return
            }
        }

        // start normal interactions with E
        if (Phaser.Input.Keyboard.JustDown(this.keys.EKey)) {
            if (this.dialogueBox.visible) return

            for (const interactable of this.interactables) {
                if (interactable.tryInteract(this.player)) {
                    break
                }
            }
        }
    }
}