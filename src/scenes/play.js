class Play extends Phaser.Scene {
    constructor() {
        super('Play')
    }

    create() {
        const { width, height } = this.scale

        this.interactables = []

        // smaller box pushed higher
        this.dialogueBox = this.add.rectangle(480, 340, 360, 52, 0x000000, 0.85)
            .setVisible(false)
            .setScrollFactor(0)
            .setDepth(100)

        // main dialogue text
        this.dialogueText = this.add.text(310, 322, '', {
            fontSize: '11px',
            color: '#ffffff',
            wordWrap: { width: 320 }
        })
        .setVisible(false)
        .setScrollFactor(0)
        .setDepth(101)

        // response option
        this.responseText = this.add.text(310, 342, '', {
            fontSize: '11px',
            color: '#ffff66'
        })
        .setVisible(false)
        .setScrollFactor(0)
        .setDepth(101)

        this.openDialogue = (message, response) => {
            this.dialogueBox.setVisible(true)
            this.dialogueText.setText(message).setVisible(true)
            this.responseText.setText('[1] ' + response).setVisible(true)

            this.input.keyboard.once('keydown-ONE', () => {
                this.dialogueText.setText(response)
                this.responseText.setVisible(false)

                this.time.delayedCall(1200, () => {
                    this.dialogueBox.setVisible(false)
                    this.dialogueText.setVisible(false)
                })
            })
        }

        const boothHeight = 80

        const phoneBooth = new Interact(this, 430, 600, {
            width: 40,
            height: 80,
            color: 0xff0000,
            readius: 60,
            onInteract: () => {
                this.openDialogue(
                    'Hello? When are you coming back home?',
                    "I'm currently on my way."
                )
            }
        })

        this.interactables.push(phoneBooth)

        // FAR background
        this.bgFar = this.add.image(0, 0, 'cityBackground')
            .setOrigin(0, 0)
            .setDepth(-20)

        // FRONT city layer
        this.bgFront = this.add.image(0, 0, 'cityLayer')
            .setOrigin(0, 0)
            .setDepth(-10)

        this.bgMusic = this.sound.add('bgMusic', { loop: true })
        this.bgMusic.play()

        // Scale both backgrounds without stretching
        const scaleX = width / this.bgFar.width
        const scaleY = height / this.bgFar.height
        const scale = Math.max(scaleX, scaleY)

        this.bgFar.setScale(scale)
        this.bgFront.setScale(scale)

        const mapWidth = this.bgFront.displayWidth
        const mapHeight = this.bgFront.displayHeight

        this.physics.world.setBounds(0, 0, mapWidth, mapHeight)
        this.cameras.main.setBounds(0, 0, mapWidth, mapHeight)

        // Parallax
        this.bgFar.setScrollFactor(0.1, 1)
        this.bgFront.setScrollFactor(0.6, 1)

        // Temp player texture
        let tempPlayer = this.add.graphics()
            .fillStyle(0xffffff, 1)
            .fillRect(0, 0, 16, 28)
            .generateTexture('playerRect', 16, 28)

        tempPlayer.setAlpha(0)

        // Player spawn
        const spawnX = 80
        this.player = new Player(this, spawnX, 0, 'playerRect')
        this.player.y = mapHeight - this.player.height / 2
        this.player.setCollideWorldBounds(true)

        // Camera
        this.cameras.main.setDeadzone(120, 540)
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08)
        this.cameras.main.setZoom(1.7)
        this.cameras.main.followOffset.set(-180, -140)

        this.keys = this.input.keyboard.addKeys({
            AKey: Phaser.Input.Keyboard.KeyCodes.A,
            DKey: Phaser.Input.Keyboard.KeyCodes.D,
            EKey: Phaser.Input.Keyboard.KeyCodes.E,
        })
    }

    update() {
        this.playerFSM.step()

        for (const interactable of this.interactables) {
            interactable.update(this.player)
        }
    }
}