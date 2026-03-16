class ApartmentC extends Phaser.Scene {
    constructor() {
        super('ApartmentC')
    }

    create() {
        this.bgFront = this.add.image(0, 0, 'ApartmentComplex').setOrigin(0,0)

        this.interactables = []

        const apartmentDoor = new Interact(this, 735, 520, {
            width: 16,
            height: 32,
            color: 0xFFFFFF,
            radius: 40,
            onInteract: () => {
                this.scene.start('ApartmentR')
            }
        })

        if (apartmentDoor.displayObject)
            apartmentDoor.displayObject.setVisible(false)

        this.interactables.push(apartmentDoor)

        const mapWidth = this.bgFront.displayWidth
        const mapHeight = this.bgFront.displayHeight

        const spawnX = 80
        this.player = new Player(this, spawnX, 0, 'mica')
        this.player.y = mapHeight - this.player.height / 2
        this.player.setCollideWorldBounds(true)

        // Camera
        this.cameras.main.setDeadzone(120, 540)
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08)
        this.cameras.main.setZoom(1.7)

        this.keys = this.input.keyboard.addKeys({
            AKey: Phaser.Input.Keyboard.KeyCodes.A,
            DKey: Phaser.Input.Keyboard.KeyCodes.D,
            EKey: Phaser.Input.Keyboard.KeyCodes.E,
        })
    }

    update() {
        this.playerFSM.step()

        for (const interactables of this.interactables)
            interactables.update(this.player)
    }
}