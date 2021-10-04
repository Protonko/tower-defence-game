import type {Component} from '../interfaces/Component'
import {GameConfiguratorSingleton} from '../../services/GameConfiguratorSingleton'

export abstract class ComponentWithPosition implements Component {
  protected _x: number
  protected readonly _y: number
  protected readonly _width: number
  protected readonly _height: number
  protected readonly _gameConfigurator: GameConfiguratorSingleton

  protected constructor(x: number, y: number, size: number) {
    this._x = x
    this._y = y
    this._width = size
    this._height = size
    this._gameConfigurator = GameConfiguratorSingleton.getInstance()
  }

  abstract draw(): void

  get width() {
    return this._width
  }

  get height() {
    return this._height
  }

  get x() {
    return this._x
  }

  get y() {
    return this._y
  }
}
