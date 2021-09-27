import type {Component} from '../interfaces/Component'
import {CELL_SIZE} from '../../static/game'
import {GameConfiguratorSingleton} from '../../services/GameConfiguratorSingleton'

export abstract class AbstractComponentWithPosition implements Component {
  protected readonly x: number
  protected readonly y: number
  protected readonly width: number
  protected readonly height: number
  protected readonly gameConfigurator: GameConfiguratorSingleton

  protected constructor(x: number, y: number) {
    this.x = x
    this.y = y
    this.width = CELL_SIZE
    this.height = CELL_SIZE
    this.gameConfigurator = GameConfiguratorSingleton.getInstance()
  }

  abstract draw(): void

  get xValue() {
    return this.x
  }

  get yValue() {
    return this.y
  }
}
