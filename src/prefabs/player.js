class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.moveSpeed = 65

        scene.playerFSM = new StateMachine('idle', {
            idle: new IdleState(),
            walk: new WalkState(),
            interact: new InteractState()
        }, [scene, this])

        
    }

}

class IdleState extends State {
    enter(scene, player) {
        player.setVelocity(0,0)
        player.anims.play('micaIdle', true)

    }

    execute(scene, player) {
        const InteractKey = scene.keys.EKey
        const LeftKey = scene.keys.AKey
        const RightKey = scene.keys.DKey

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
    enter (scene, player) {
        player.anims.play('micaWalk', true)
    }
    execute(scene, player) {
        const LeftKey = scene.keys.AKey
        const RightKey = scene.keys.DKey
        const InteractKey = scene.keys.EKey

        if (LeftKey.isDown) {
            player.setVelocityX(-player.moveSpeed)
            player.setFlipX(true)
        } else if (RightKey.isDown) {
            player.setVelocityX(player.moveSpeed)
            player.setFlipX(false)
        }

        if (Phaser.Input.Keyboard.JustDown(InteractKey)) {
            this.stateMachine.transition('interact')
            return
        }

        if (!LeftKey.isDown && !RightKey.isDown) {
            this.stateMachine.transition('idle')
            player.anims.stop()
            return
        }
    }
}

class InteractState extends State {
    enter(scene, player) {
        player.setVelocity(0, 0)

        for (const interactable of scene.interactables) {
            if (interactable.tryInteract(player)) {
                return
            }
        }

        this.stateMachine.transition('idle')
    }

    execute(scene, play) {
        const leftKey = scene.keys.AKey
        const rightKey = scene.keys.DKey

        if (leftKey.isDown || rightKey.isDown) {
            this.stateMachine.transition('walk')
            return
        }

        this.stateMachine.transition('idle')

    }
}