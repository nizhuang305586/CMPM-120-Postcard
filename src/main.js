/*
 * Nikolas Huang, CMPM 120, Mar 16
 * 
 * Post card for Mica
 * 
 * Hours worked prediction: 20
 * 
 * all code was built by reading many phaser documentation code and sourcing stackoverflow
 */


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

    scene: [ Load, Menu, Play, ApartmentC, ApartmentRoom, Ending ]
}

const game = new Phaser.Game(config)