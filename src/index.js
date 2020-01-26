import Phaser from "phaser";
import logoImg from "./assets/logo.png";
import gridtiles from "./assets/gridtiles.png";
import {Board} from "./components/deck.js"

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 1600,
  height: 1200,
  scene: {
    preload,
    create,
  }
};

const game = new Phaser.Game(config);
let map;
let map2;
let layer;

function preload() {
  this.load.image('tiles', gridtiles)
  this.load.spritesheet('tilesprites', gridtiles, {frameWidth: 96, frameHeight: 96})
}

function create() {
  const board = new Board();
  const tileArray = Array(10).fill(Array(10).fill(0, 0, 10), 0, 10)
  console.log(board)
  for (let idx=0; idx<10; idx++) {
    board.flipTile(idx, idx)
  }
  this.add.image(10, 10, 'tilesprites', 1)
  const tileArray2 = board.getBoardDisplay()
  map = this.make.tilemap({key: 'map', data: tileArray, tileWidth: 96, tileHeight: 96})
  map2 = this.make.tilemap({key: 'map2', data: tileArray2, tileWidth: 96, tileHeight: 96})
  const tiles = map.addTilesetImage('tiles')
  const tiles2 = map2.addTilesetImage('tiles')
  console.log(map2.tilesets)
  layer = map.createStaticLayer(0, tiles, 320, 60)
  const layer2 = map2.createDynamicLayer(0, tiles2, 320, 60)
  layer2.setInteractive()
  layer2.on('pointerup', function(pointer) {
    console.log('test') 
    console.log(pointer.positionToCamera(this.cameras.main))
    const worldPoint = pointer.positionToCamera(this.cameras.main)
    const pointerTileX = map.worldToTileX(worldPoint.x)
    const pointerTileY = map.worldToTileY(worldPoint.y)    
    board.flipTile(pointerTileX, pointerTileY)
    console.log(tiles2)
    console.log(map2.getImageIndex(tiles2, ))
    map2.putTileAt(tiles2.getTileData(board.state[pointerTileX, pointerTileY].tileIndex), pointerTileX, pointerTileY)
  }, this)
}
