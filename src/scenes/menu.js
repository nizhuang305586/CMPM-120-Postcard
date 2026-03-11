class Menu extends Phaser.Scene {
    constructor() {
        super('Menu')
    }



    create() {
        const { width, height } = this.scale
        const W = 960
        const H = 540

        // Background behind the envelope
        this.cameras.main.setBackgroundColor(0xd8c7a0)

        // Main container so the whole menu can move together if needed later
        this.menuContainer = this.add.container(0, 0)

        // ---------- Letter / postcard ----------
        const card = this.add.rectangle(W / 2, H / 2 + 70, 720, 360, 0xf8f3e7)
            .setStrokeStyle(3, 0xc9b89a)

        const title = this.add.text(W / 2, H / 2 - 10, 'Postcard for [Name]', {
            fontFamily: 'Georgia, Times, serif',
            fontSize: '42px',
            color: '#3b2f2f',
            fontStyle: 'bold'
        }).setOrigin(0.5)

        title.setDepth(100000)

        const subtitle = this.add.text(W / 2, H / 2 + 45, 'Click to open', {
            fontFamily: 'Georgia, Times, serif',
            fontSize: '20px',
            color: '#5a4a3a'
        }).setOrigin(0.5)

        const startText = this.add.text(W / 2, H / 2 + 115, 'Begin', {
            fontFamily: 'Georgia, Times, serif',
            fontSize: '28px',
            color: '#2f241c',
            backgroundColor: '#eadfc8',
            padding: { left: 18, right: 18, top: 8, bottom: 8 }
        }).setOrigin(0.5)

        startText.setInteractive({ useHandCursor: true })

        this.cardContainer = this.add.container(0, 0, [
            card,
            title,
            subtitle,
            startText
        ])

        // Start with postcard mostly hidden inside envelope
        this.cardContainer.y = 95

        // ---------- Envelope back ----------
        const back = this.add.graphics()
        back.fillStyle(0xe7d7b8, 1)
        back.fillRect(0, 140, W, H - 140)

        // ---------- Left fold ----------
        const leftFold = this.add.graphics()
        leftFold.fillStyle(0xd9c4a0, 1)
        leftFold.beginPath()
        leftFold.moveTo(0, H)
        leftFold.lineTo(W / 2, H / 2 + 40)
        leftFold.lineTo(0, 140)
        leftFold.closePath()
        leftFold.fillPath()

        // ---------- Right fold ----------
        const rightFold = this.add.graphics()
        rightFold.fillStyle(0xd4bc95, 1)
        rightFold.beginPath()
        rightFold.moveTo(W, H)
        rightFold.lineTo(W / 2, H / 2 + 40)
        rightFold.lineTo(W, 140)
        rightFold.closePath()
        rightFold.fillPath()

        // ---------- Bottom fold ----------
        const bottomFold = this.add.graphics()
        bottomFold.fillStyle(0xcfb388, 1)
        bottomFold.beginPath()
        bottomFold.moveTo(0, H)
        bottomFold.lineTo(W / 2, H / 2 + 40)
        bottomFold.lineTo(W, H)
        bottomFold.closePath()
        bottomFold.fillPath()

        // ---------- Top flap ----------
        // Make this its own container so we can animate it upward
        const flapGraphics = this.add.graphics()
        flapGraphics.fillStyle(0xdec9a5, 1)
        flapGraphics.beginPath()
        flapGraphics.moveTo(0, 140)
        flapGraphics.lineTo(W / 2, H / 2 + 40)
        flapGraphics.lineTo(W, 140)
        flapGraphics.closePath()
        flapGraphics.fillPath()

        flapGraphics.lineStyle(3, 0xc2a77d, 1)
        flapGraphics.beginPath()
        flapGraphics.moveTo(0, 140)
        flapGraphics.lineTo(W / 2, H / 2 + 40)
        flapGraphics.lineTo(W, 140)
        flapGraphics.strokePath()

        this.flapContainer = this.add.container(0, 0, [flapGraphics])

        // Put everything on screen
        this.menuContainer.add([
            this.cardContainer,
            back,
            leftFold,
            rightFold,
            bottomFold,
            this.flapContainer
        ])

        // State flag so it doesn't spam
        this.isOpening = false
        this.hasOpened = false

        // Hover effect for the button
        startText.on('pointerover', () => {
            if (!this.isOpening && !this.hasOpened) {
                startText.setScale(1.05)
            }
        })

        startText.on('pointerout', () => {
            if (!this.isOpening && !this.hasOpened) {
                startText.setScale(1)
            }
        })

        // Click opens the envelope animation
        startText.on('pointerdown', () => {
            if (this.isOpening || this.hasOpened) return

            this.isOpening = true
            startText.disableInteractive()

            // little press feedback
            this.tweens.add({
                targets: startText,
                scaleX: 0.96,
                scaleY: 0.96,
                duration: 70,
                yoyo: true,
                onComplete: () => {
                    this.openEnvelope()
                }
            })
        })

        // optional: subtle idle bob on the postcard before opening
        this.tweens.add({
            targets: this.cardContainer,
            y: this.cardContainer.y - 6,
            duration: 1800,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        })

        // Fullscreen interactive zone
        const clickZone = this.add.zone(480, 270, 960, 540)
        clickZone.setInteractive({ useHandCursor: true })

        clickZone.on('pointerdown', () => {
            if (!this.isOpening && !this.hasOpened) {
                this.openEnvelope()
            }
        })
    }


    openEnvelope() {
        this.hasOpened = true

        // Stop all old tweens on card before doing the real animation
        this.tweens.killTweensOf(this.cardContainer)

        // 1. Open the top flap upward
        this.tweens.add({
            targets: this.flapContainer,
            y: -220,
            alpha: 0.92,
            duration: 700,
            ease: 'Cubic.easeOut'
        })

        // 2. Slide postcard upward out of the envelope
        this.tweens.add({
            targets: this.cardContainer,
            y: -40,
            duration: 900,
            delay: 120,
            ease: 'Cubic.easeOut'
        })

        // 3. Slight dramatic scale
        this.tweens.add({
            targets: this.cardContainer,
            scaleX: 1.03,
            scaleY: 1.03,
            duration: 900,
            delay: 120,
            ease: 'Sine.easeOut'
        })

        // 4. Fade into play scene after animation
        this.time.delayedCall(1400, () => {
            this.cameras.main.fadeOut(500, 0, 0, 0)
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start('Play')
            })
        })
    }
}