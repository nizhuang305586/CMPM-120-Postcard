class Play extends Phaser.Scene {
    constructor() {
        super('Play')
    }

    create() {
        const { width, height } = this.scale

        // Create background as part of the world
        this.bg = this.add.image(0, 0, 'cityBackground')
            .setOrigin(0, 0)
            .setDepth(-10)

        // IMPORTANT:
        // Scale by COVER, not stretch.
        // This preserves aspect ratio and guarantees no grey space in the camera.
        const scaleX = width / this.bg.width
        const scaleY = height / this.bg.height
        const scale = Math.max(scaleX, scaleY)

        this.bg.setScale(scale)

        // Use DISPLAY size after scaling
        const mapWidth = this.bg.displayWidth
        const mapHeight = this.bg.displayHeight

        // World + camera bounds must match the scaled background
        this.physics.world.setBounds(0, 0, mapWidth, mapHeight)
        this.cameras.main.setBounds(0, 0, mapWidth, mapHeight)

        // Spawn player near bottom-left of the map
        const spawnX = 80
        const spawnY = mapHeight - 60

        let tempPlayer = this.add.graphics()
            .fillStyle(0xffffff, 1)
            .fillRect(0, 0, 16, 28)
            .generateTexture('playerRect', 16, 28)

        tempPlayer.setAlpha(0)

        this.player = new Player(this, spawnX, spawnY, 'playerRect')
        this.player.y = mapHeight - this.player.height / 2
        this.player.setCollideWorldBounds(true)

        // Camera settings:
        // Deadzone lets the player move on screen before camera starts shifting
        this.cameras.main.setDeadzone(0, 0)
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08)
        this.cameras.main.setFollowOffset(-this.scale.width * 0.25, 0)
        this.cameras.main.setZoom(1.2)
        this.cameras.main.followOffset.set(-20, -100)

        this.keys = this.input.keyboard.addKeys({
            AKey: Phaser.Input.Keyboard.KeyCodes.A,
            DKey: Phaser.Input.Keyboard.KeyCodes.D,
            EKey: Phaser.Input.Keyboard.KeyCodes.E,
        })
    }

    update() {
        this.playerFSM.step()
    }
}