class Ending extends Phaser.Scene {
    constructor() {
        super('Ending')
    }

    create() {

        const { width, height } = this.scale

        // background
        this.add.rectangle(
            width / 2,
            height / 2,
            width,
            height,
            0x0a0f1c
        )

        // centered text
        this.messageText = this.add.text(width / 2, height / 2, '', {
            fontSize: '28px',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: width * 0.8 }
        })
        .setOrigin(0.5)
        .setAlpha(0)

        this.messages = [
            'Hi Mica',
            'Congratulations finishing your finals!',
            "Let's go get sushi like we originally planned before I got sick :(",
            "I'll be waiting for you at home :D"
        ]

        this.messageIndex = 0

        this.showNextMessage()
    }

    showNextMessage() {

        // finished all messages
        if (this.messageIndex >= this.messages.length) {

            // small delay before returning
            this.time.delayedCall(2000, () => {
                this.scene.start('Menu')
            })

            return
        }

        this.messageText.setText(this.messages[this.messageIndex])
        this.messageIndex++

        // fade in
        this.tweens.add({
            targets: this.messageText,
            alpha: 1,
            duration: 600,
            ease: 'Power2'
        })

        // stay visible then fade out
        this.time.delayedCall(2000, () => {

            this.tweens.add({
                targets: this.messageText,
                alpha: 0,
                duration: 600,
                ease: 'Power2',
                onComplete: () => {
                    this.showNextMessage()
                }
            })

        })
    }
}