import type {Component} from '@models/Component'
import backgroundImage from '@assets/images/bg.png'
import {
  AREA_HEIGHT,
  AREA_WIDTH,
  CASTLE_WIDTH,
  CELL_SIZE,
  TOOLBAR_HEIGHT,
} from '@static/game'
import {Cell} from './Cell'
import {GameConfiguratorSingleton} from '@services/GameConfiguratorSingleton'

export class Grid implements Component {
  private _gameGrid: Cell[]
  private readonly _backgroundImage: HTMLImageElement

  constructor() {
    this._gameGrid = []
    this.prepareGrid()
    this._backgroundImage = new Image()
    this._backgroundImage.src = backgroundImage
  }

  private prepareGrid = () => {
    for (let y = TOOLBAR_HEIGHT; y < AREA_HEIGHT; y += CELL_SIZE) {
      for (let x = CASTLE_WIDTH; x < AREA_WIDTH; x += CELL_SIZE) {
        this._gameGrid.push(new Cell(x, y))
      }
    }
  }

  draw = () => {
    const context = GameConfiguratorSingleton.getInstance().context
    context.drawImage(this._backgroundImage, 0, 0, 900, 600)
    this._gameGrid.forEach((cell) => {
      cell.draw()
    })
  }
}
