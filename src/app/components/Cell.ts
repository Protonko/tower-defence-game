import type {Mouse} from '../interfaces/Mouse'
import {collision} from '../utils/collision'
import {AbstractComponent} from './AbstractComponent'
import {COLORS} from '../static/styles'

export class Cell extends AbstractComponent {
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

    if (mouse.x && mouse.y && collision(mouse, this.canvasConfigurator.mouseValue)) {
      this.canvasConfigurator.canvasContext.strokeStyle = COLORS.cellColor
      this.canvasConfigurator.canvasContext.strokeRect(this.x, this.y, this.width, this.height)
    }
  }
}
