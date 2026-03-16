class Play extends Phaser.Scene {
    constructor() {
        super('Play')
    }

    create() {
        const { width, height } = this.scale

        this.ringSFX = this.sound.add('ringing', {
            loop: true
        })

        this.meowSFX = this.sound.add('meow')

        this.ringSFX.play()
        
        this.interactables = [] //holds all interactable objects in a scene
        this.currentInteractable = null
        this.phoneBoothUsed = false

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

        //converted to new dialogue behavior
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

        // optional helper for multi-step interactables
        this.closeDialogue = () => {
            this.dialogueBox.setVisible(false)
            this.dialogueText.setVisible(false)
            this.responseText.setVisible(false)
            this.currentInteractable = null
        }

        this.phoneboothSprite = this.add.image(330, 650, 'booth')
            .setOrigin(0.5, 1)
            .setDepth(5)
            .setScale(0.1)

        const phoneBooth = new Interact(this, 330, 620, {
            width: 25,
            height: 50,
            color: 0xff0000,
            radius: 60,
            onInteract: (player, booth) => {
                if (booth.used) return

                booth.used = true
                booth.prompt.setVisible(false)

                this.openDialogue(
                    'Hello? When are you coming back home?',
                    "I'm currently on my way."
                )

                this.phoneBoothUsed = true
            }
        })



        if (phoneBooth.displayObject)
            phoneBooth.displayObject.setVisible(false)


        this.catSprite = this.add.sprite(470, 640, 'cat')
            .setOrigin(0.5, 1)
            .setDepth(5)

        this.catSprite.play('catIdle')

        const cat = new Interact(this, 470, 633, {
            width: this.catSprite.displayWidth,
            height: this.catSprite.displayHeight,
            color: 0xFFFFFF,
            radius: 60,
            onInteract: () => {
                this.meowSFX.play()
                this.openDialogue(
                    "Meow...",
                    "Cute kitty, wish I could adopt it"
                )
            }
        })

        if (cat.displayObject) {
            cat.displayObject.setVisible(false)
        }

        this.npcSprite = this.add.sprite(780, 640, 'npc')
            .setOrigin(0.5, 1)
            .setDepth(5)

        this.npcSprite.play('npcIdle')

        const NPC = new Interact(this, 780, 627, {
            width: 16,
            height: 28,
            color: 0xFFFFFF,
            radius: 60,
            onInteract: () => {
                this.openDialogue(
                    'Cant wait to go home that final was buns',
                    '...'
                )
            }
        })

        if (NPC.displayObject) {
            NPC.displayObject.setVisible(false)
        }

        this.interactables.push(phoneBooth)
        this.interactables.push(cat)
        this.interactables.push(NPC)

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

        this.busStopSprite = this.add.image(mapWidth - 100, mapHeight + 25, 'busStop')
            .setOrigin(0.5, 1)
            .setDepth(-5)
            .setScale(0.25)

        const busStop = new Interact(this, 840, 615, {
            width: this.busStopSprite.displayWidth,
            height: this.busStopSprite.displayHeight,
            color: 0x00ff00,
            radius: 70,
            onInteract: () => {
                this.scene.start('ApartmentC')
            }
        })

        if (busStop.displayObject) {
            busStop.displayObject.setVisible(false)
        }

        this.interactables.push(busStop)

        this.physics.world.setBounds(0, 0, mapWidth, mapHeight)
        this.cameras.main.setBounds(0, 0, mapWidth, mapHeight)

        // Parallax
        this.bgFar.setScrollFactor(0.1, 1)
        this.bgFront.setScrollFactor(0.6, 1)

        // Player spawn
        const spawnX = 80
        this.player = new Player(this, spawnX, 0, 'mica')
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

        if (Phaser.Input.Keyboard.JustDown(this.keys.EKey)) {
            // if a special multi-step interactable is active, continue it
            if (this.dialogueBox.visible && this.currentInteractable) {
                this.currentInteractable.tryInteract(this.player)
                return
            }

            // otherwise start a nearby interaction
            for (const interactable of this.interactables) {
                if (interactable.tryInteract(this.player)) {
                    break
                }
            }
        }

        if (this.phoneBoothUsed)
            this.ringSFX.stop()
    }
}