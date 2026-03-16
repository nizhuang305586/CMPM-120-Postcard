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
    zoom: 1,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },

    scene: [ Load, Menu, Play, ApartmentC ]
}

const game = new Phaser.Game(config)