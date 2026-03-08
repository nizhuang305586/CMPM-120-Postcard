'use strict'

let config = {
    type: Phaser.AUTO,
    render: {
        pixelArt: true,
        roundPixels: true,
    },
    width: 960,
    height: 540,
    backgroundColor: '#0b1020',
    zoom: 2,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },

    scene: [ Load, Menu, Play ]
}

let game = new Phaser.Game(config)