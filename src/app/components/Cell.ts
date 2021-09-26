import type {Mouse} from '../interfaces/Mouse'
import {CELL_SIZE} from '../static/game'
import {CanvasConfiguratorSingleton} from '../CanvasConfiguratorSingleton'
import {collision} from '../utils/collision'

export class Cell {
  private readonly x: number
  private readonly y: number
  private readonly width: number
  private readonly height: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
    this.width = CELL_SIZE
    this.height = CELL_SIZE
  }

  draw = () => {
    const canvasConfigurator = CanvasConfiguratorSingleton.getInstance()

    const mouse: Mouse = {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    }

    if (mouse.x && mouse.y && collision(mouse, canvasConfigurator.mouseValue)) {
      canvasConfigurator.canvasContext.strokeStyle = 'black'
      canvasConfigurator.canvasContext.strokeRect(this.x, this.y, this.width, this.height)
    }
  }
}
