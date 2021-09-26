import {CELL_SIZE} from '../static/game'
import {CanvasConfiguratorSingleton} from '../CanvasConfiguratorSingleton'

export abstract class AbstractComponent {
  protected readonly x: number
  protected readonly y: number
  protected readonly width: number
  protected readonly height: number
  protected readonly canvasConfigurator: CanvasConfiguratorSingleton

  protected constructor(x: number, y: number) {
    this.x = x
    this.y = y
    this.width = CELL_SIZE
    this.height = CELL_SIZE
    this.canvasConfigurator = CanvasConfiguratorSingleton.getInstance()
  }

  abstract draw(): void

  get xValue() {
    return this.x
  }

  get yValue() {
    return this.y
  }
}
