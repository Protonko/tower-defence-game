import type {Component} from './interfaces/Component'
import {AREA_HEIGHT, AREA_WIDTH, CELL_SIZE} from '../static/game'
import {Cell} from './Cell'

export class Grid implements Component {
  private _gameGrid: Cell[]

  constructor() {
    this._gameGrid = []
    this.prepareGrid()
  }

  private prepareGrid = () => {
    for (let y = 0; y < AREA_HEIGHT; y += CELL_SIZE) {
      for (let x = 0; x < AREA_WIDTH; x += CELL_SIZE) {
        this._gameGrid.push(new Cell(x, y))
      }
    }
  }

  draw = () => {
    this._gameGrid.forEach(cell => {
      cell.draw()
    })
  }
}
