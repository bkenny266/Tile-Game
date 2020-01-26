import cardPool from '../data/cards.js'

class Card {
  constructor(cardData) {
    this.tileIndex = cardData.tileIndex
    this.name = cardData.name
    this.isShowing = false
  }
}

class BoardTile {
  constructor(card) {
    this.name = card.name
    this.tileIndex = card.tileIndex
    this.isShown = false
  }
}

class Deck {
  constructor() {
    this.tiles = []
    for (const cardType of cardPool) {
      console.log(cardType)
      for (let x=0; x<cardType.quantity; x++) {
        this.tiles.push(new BoardTile(cardType))
      }
    }
  }
  shuffle() {
    for (let i = this.tiles.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
  
      // swap elements this.tiles[i] and this.tiles[j]
      // we use "destructuring assignment" syntax to achieve that
      // you'll find more details about that syntax in later chapters
      // same can be written as:
      // let t = this.tiles[i]; array[i] = array[j]; array[j] = t
      [this.tiles[i], this.tiles[j]] = [this.tiles[j], this.tiles[i]];
    }
  }
  draw() {
    if (!this.tiles.length) {
      return null
    }
    return this.tiles.shift()
  }
}

class Board {
  constructor() {
    const deck = new Deck()
    deck.shuffle()
    this.state = []
    for(let x=0; x<10; x++) {
      const inner = []
      for(let y=0; y<10; y++) {
        const tile = deck.draw()
        if (tile) {
          inner.push(tile)
        }
      }
      this.state.push(inner)
    }
  }
  
  flipTile(x, y) {
    this.state[x][y].isShown = true
  }

  getBoardDisplay() {
    const display = []
    for (const inner of this.state) {
      display.push(inner.map(tile => {
        if (tile.isShown) {
          return tile.tileIndex
        }
        return 28
      })
    )}
    return display
  }
}

export {Card, Deck, BoardTile, Board}