import {collision} from '../utils/collision'
import {AbstractComponentWithPosition} from './abstract/AbstractComponentWithPosition'
import {COLORS} from '../static/styles'
import {CELL_SIZE} from '../static/game'

export class Cell extends AbstractComponentWithPosition {
  constructor(x: number, y: number) {
    super(x, y, CELL_SIZE)
  }

  draw = () => {
    const gameMouse = this._gameConfigurator.mouse

    if (gameMouse.x && gameMouse.y && collision(this, gameMouse)) {
      this._gameConfigurator.context.strokeStyle = COLORS.cellColor
      this._gameConfigurator.context.strokeRect(this._x, this._y, this._width, this._height)
    }
  }
}
