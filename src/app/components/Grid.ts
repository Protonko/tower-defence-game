import {AREA_HEIGHT, AREA_WIDTH, CELL_SIZE} from '../static/game'
import {Cell} from './Cell'

export class Grid {
  private gameGrid: Cell[]

  constructor() {
    this.gameGrid = []
    this.prepareGrid()
  }

  private prepareGrid = () => {
    for (let y = 0; y < AREA_HEIGHT; y += CELL_SIZE) {
      for (let x = 0; x < AREA_WIDTH; x += CELL_SIZE) {
        this.gameGrid.push(new Cell(x, y))
      }
    }
  }

  draw = () => {
    this.gameGrid.forEach(cell => {
      cell.draw()
    })
  }
}
