class Player extends Phaser.Physics.Sprite {
    constructor(x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        scene.add.existing(true)
        scene.physics.add.existing(true)

        this.moveSpeed = 150

        scene.playerFSM = new StateMachine('idle', {
            idle: new IdleState(),
            walk: new WalkState(),
            interact: new InteractState()
        })

        
    }

}

class IdleState extends State {
    enter(scene, player) {
        player.setVelocity(0,0)

    }

    execute(scene, player) {
        const InteractKey = scene.keys.EKey
        const LeftKey = scene.keys.AKey
        const RightKey = scene.keys.Dkey

        if (Phaser.Input.Keyboard.JustDown(InteractKey)) {
            this.stateMachine.transition('interact')
            return
        }

        if (Phaser.Input.Keyboard.JustDown(LeftKey) || Phaser.Input.Keyboard.JustDown(RightKey)) {
            this.stateMachine.transition('walk')
            return
        }

    }

}

class WalkState extends State {
    enter(scene, player) {
        player.setVelocityX(player.moveSpeed)
    }

    execute(scene, player) {
        const LeftKey = scene.keys.AKey
        const RightKey = scene.keys.DKey

        if (!Phaser.Input.Keyboard.isDown(LeftKey) || !Phaser.Input.Keyboard.isDown(RightKey)) {
            
        }
    }
}

class InteractState extends State {
    enter(scene, player) {
        player.setVelocity(0, 0)
    }

    execute(scene, play) {

    }
}