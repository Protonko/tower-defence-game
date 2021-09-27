import type {Mouse} from '../interfaces/Mouse'
import {collision} from '../utils/collision'
import {AbstractComponentWithPosition} from './abstract/AbstractComponentWithPosition'
import {COLORS} from '../static/styles'

export class Cell extends AbstractComponentWithPosition {
  constructor(x: number, y: number) {
    super(x, y)
  }

  draw = () => {
    const mouse: Mouse = {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    }

    if (mouse.x && mouse.y && collision(mouse, this.gameConfigurator.mouse)) {
      this.gameConfigurator.context.strokeStyle = COLORS.cellColor
      this.gameConfigurator.context.strokeRect(this.x, this.y, this.width, this.height)
    }
  }
}
