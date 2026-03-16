class Menu extends Phaser.Scene {
    constructor() {
        super('Menu')
    }

    create() {
        const W = 960
        const H = 540

        this.cameras.main.setBackgroundColor(0xd8c7a0)

        this.menuContainer = this.add.container(0, 0)

        // ---------- Postcard ----------
        const card = this.add.rectangle(W / 2, H / 2 + 70, 720, 360, 0xf8f3e7)
            .setStrokeStyle(3, 0xc9b89a)

        const title = this.add.text(W / 2, H / 2 - 30, 'Postcard for Mica', {
            fontFamily: 'Georgia, Times, serif',
            fontSize: '40px',
            color: '#3b2f2f',
            fontStyle: 'bold'
        }).setOrigin(0.5)

        const subtitle = this.add.text(W / 2, H / 2 + 20, 'Choose an option', {
            fontFamily: 'Georgia, Times, serif',
            fontSize: '20px',
            color: '#5a4a3a'
        }).setOrigin(0.5)

        const startText = this.add.text(W / 2, H / 2 + 95, 'Start', {
            fontFamily: 'Georgia, Times, serif',
            fontSize: '26px',
            color: '#2f241c',
            backgroundColor: '#eadfc8',
            padding: { left: 18, right: 18, top: 8, bottom: 8 }
        }).setOrigin(0.5)

        const creditsText = this.add.text(W / 2, H / 2 + 150, 'Credits', {
            fontFamily: 'Georgia, Times, serif',
            fontSize: '24px',
            color: '#2f241c',
            backgroundColor: '#eadfc8',
            padding: { left: 16, right: 16, top: 7, bottom: 7 }
        }).setOrigin(0.5)

        startText.setInteractive({ useHandCursor: true })
        creditsText.setInteractive({ useHandCursor: true })

        this.cardContainer = this.add.container(0, 0, [
            card,
            title,
            subtitle,
            startText,
            creditsText
        ])

        // postcard starts tucked into envelope
        this.cardContainer.y = 95

        // ---------- Credits paper ----------
        const creditsPaper = this.add.rectangle(W / 2, H / 2 + 70, 660, 330, 0xffffff)
            .setStrokeStyle(2, 0xd0d0d0)

        const creditsTitle = this.add.text(W / 2, H / 2 - 75, 'Credits', {
            fontFamily: 'Georgia, Times, serif',
            fontSize: '34px',
            color: '#2a2a2a',
            fontStyle: 'bold'
        }).setOrigin(0.5)

        const creditsBody = this.add.text(W / 2, H / 2 + 60,
            'Game Design / Programming\n' +
            'Nikolas Huang\n' +
            'Art\n' +
            'Mica\n' +
            'Music\n' +
            'Royalty Free and Pixabay\n' +
            'Click anywhere to return',
        {
            fontFamily: 'Georgia, Times, serif',
            fontSize: '22px',
            color: '#333333',
            align: 'center',
            lineSpacing: 8
        }).setOrigin(0.5)

        this.creditsContainer = this.add.container(0, 0, [
            creditsPaper,
            creditsTitle,
            creditsBody
        ])

        this.creditsContainer.y = 95
        this.creditsContainer.setVisible(false)
        this.creditsContainer.setAlpha(0)

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

        this.menuContainer.add([
            back,
            leftFold,
            rightFold,
            bottomFold,
            this.cardContainer,
            this.creditsContainer,
            this.flapContainer
        ])

        this.isOpening = false
        this.hasOpened = false
        this.showingCredits = false

        const addHoverEffect = (btn) => {
            btn.on('pointerover', () => {
                if (!this.isOpening && !this.hasOpened) {
                    btn.setScale(1.05)
                }
            })

            btn.on('pointerout', () => {
                if (!this.isOpening && !this.hasOpened) {
                    btn.setScale(1)
                }
            })
        }

        addHoverEffect(startText)
        addHoverEffect(creditsText)

        startText.on('pointerdown', () => {
            if (this.isOpening || this.hasOpened) return

            this.isOpening = true
            startText.disableInteractive()
            creditsText.disableInteractive()

            this.tweens.add({
                targets: startText,
                scaleX: 0.96,
                scaleY: 0.96,
                duration: 70,
                yoyo: true,
                onComplete: () => {
                    this.openEnvelope('start')
                }
            })
        })

        creditsText.on('pointerdown', () => {
            if (this.isOpening || this.hasOpened) return

            this.isOpening = true
            startText.disableInteractive()
            creditsText.disableInteractive()

            this.tweens.add({
                targets: creditsText,
                scaleX: 0.96,
                scaleY: 0.96,
                duration: 70,
                yoyo: true,
                onComplete: () => {
                    this.openEnvelope('credits')
                }
            })
        })

        this.tweens.add({
            targets: this.cardContainer,
            y: this.cardContainer.y - 6,
            duration: 1800,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        })

        this.clickZone = this.add.zone(480, 270, 960, 540)
        this.clickZone.setDepth(9999999)
        this.clickZone.disableInteractive()
        this.clickZone.setVisible(false)

        this.clickZone.on('pointerdown', () => {
            if (this.showingCredits) {
                this.scene.restart()
            }
        })
    }

    openEnvelope(mode = 'start') {
        this.hasOpened = true

        this.tweens.killTweensOf(this.cardContainer)
        this.tweens.killTweensOf(this.creditsContainer)

        // flap opens
        this.tweens.add({
            targets: this.flapContainer,
            y: -220,
            alpha: 0.92,
            duration: 700,
            ease: 'Cubic.easeOut'
        })

        if (mode === 'start') {
            // postcard comes out
            this.tweens.add({
                targets: this.cardContainer,
                y: -40,
                duration: 900,
                delay: 120,
                ease: 'Cubic.easeOut'
            })

            this.tweens.add({
                targets: this.cardContainer,
                scaleX: 1.03,
                scaleY: 1.03,
                duration: 900,
                delay: 120,
                ease: 'Sine.easeOut'
            })

            this.time.delayedCall(1400, () => {
                this.cameras.main.fadeOut(500, 0, 0, 0)
                this.cameras.main.once('camerafadeoutcomplete', () => {
                    this.scene.start('Play')
                })
            })
        }

        if (mode === 'credits') {
            this.cardContainer.setVisible(false)
            this.showCreditsPaper()
        }
    }

    showCreditsPaper() {
        this.showingCredits = true
        this.creditsContainer.setVisible(true)

        this.clickZone.setVisible(true)
        this.clickZone.setInteractive({ useHandCursor: true })

        this.tweens.add({
            targets: this.creditsContainer,
            y: -35,
            alpha: 1,
            duration: 900,
            delay: 120,
            ease: 'Cubic.easeOut'
        })

        this.tweens.add({
            targets: this.creditsContainer,
            scaleX: 1.02,
            scaleY: 1.02,
            duration: 900,
            delay: 120,
            ease: 'Sine.easeOut'
        })
    }
}