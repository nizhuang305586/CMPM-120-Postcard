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
        this.onDialogueComplete = config.onDialogueComplete ?? null

        // optional multi-step dialogue
        this.dialogueSequence = config.dialogueSequence ?? null
        this.dialogueIndex = 0
        this.inDialogue = false
        this.used = false
        this.oneTime = config.oneTime ?? false

        // temp visual: red rectangle or phone booth
        this.displayObject = scene.add.rectangle(
            x,
            y,
            this.width,
            this.height,
            config.color ?? 0xff0000
        )

        this.prompt = scene.add.text(x, y - this.height / 2 - 18, 'Interact (E)', {
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
        if (this.used) {
            this.prompt.setVisible(false)
            return
        }

        const dialogueOpen = this.scene.dialogueBox && this.scene.dialogueBox.visible

        if (dialogueOpen && !this.inDialogue) {
            this.prompt.setVisible(false)
            return
        }

        this.prompt.setPosition(this.x, this.y - this.height / 2 - 16)
        this.prompt.setVisible(this.isPlayerNear(player) && !dialogueOpen)
    }

    tryInteract(player) {
        if (!this.isPlayerNear(player)) return false

        this.prompt.setVisible(false)

        // continue special multi-step dialogue
        if (this.inDialogue && this.dialogueSequence) {
            this.dialogueIndex++

            if (this.dialogueIndex < this.dialogueSequence.length) {
                const step = this.dialogueSequence[this.dialogueIndex]
                this.scene.openDialogue(step.message, step.response)
            } else {
                this.scene.closeDialogue()
                this.scene.currentInteractable = null
                this.inDialogue = false
                this.dialogueIndex = 0

                if (this.oneTime) {
                    this.used = true
                }
                
                if (this.onDialogueComplete)
                    this.onDialogueComplete()
            }

            return true
        }

        // start special multi-step dialogue
        if (this.dialogueSequence && this.dialogueSequence.length > 0) {
            this.inDialogue = true
            this.dialogueIndex = 0
            this.scene.currentInteractable = this

            const step = this.dialogueSequence[0]
            this.scene.openDialogue(step.message, step.response)
            return true
        }

        // normal one-line interaction stays the same
        if (this.onInteract) {
            this.onInteract(player, this)

            if (this.oneTime) {
                this.used = true
            }
        }

        return true
    }

    destroy() {
        if (this.displayObject) this.displayObject.destroy()
        if (this.prompt) this.prompt.destroy()
    }
}