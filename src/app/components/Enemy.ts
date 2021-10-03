import type {Component} from './interfaces/Component'
import {GameConfiguratorSingleton} from '../services/GameConfiguratorSingleton'
import {CELL_GAP, CELL_SIZE} from '../static/game'
import {ENEMY_HEALTH, ENEMY_REWARD, ENEMY_SPEED} from '../static/enemies'
import {COLORS, FONT_FAMILY, SIZES} from '../static/styles'
import {createFontStyle} from '../utils/createFontStyle'

export class Enemy implements Component {
  private _context: CanvasRenderingContext2D
  private _x: number
  private readonly _y: number
  private readonly _width: number
  private readonly _height: number
  private _health: number
  private readonly _reward: number
  private readonly _speed: number
  private _movement: number

  constructor(y: number) {
    const gameConfigurator = GameConfiguratorSingleton.getInstance()

    this._context = gameConfigurator.context
    this._x = gameConfigurator.canvasWidth
    this._y = y
    this._width = CELL_SIZE - CELL_GAP * 2
    this._height = CELL_SIZE - CELL_GAP * 2
    this._health = ENEMY_HEALTH
    this._reward = ENEMY_REWARD
    this._speed = ENEMY_SPEED
    this._movement = this._speed
  }

  move() {
    this._x -= this._movement
  }

  draw() {
    this._context.fillStyle = COLORS.enemyColor
    this._context.fillRect(this._x, this._y, this._width, this._height)
    this._context.fillStyle = COLORS.textColor
    this._context.font = createFontStyle(SIZES.headerFontSize, FONT_FAMILY)
    this._context.textAlign = 'start'
    this._context.textBaseline = 'middle'
    this._context.fillText(Math.floor(this._health).toString(), this._x, this._y + CELL_SIZE / 2)
  }

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

  get speed() {
    return this._speed
  }

  get reward() {
    return this._reward
  }

  get health() {
    return this._health
  }

  set health(health: number) {
    this._health = health
  }

  set movement(movement: number) {
    this._movement = movement
  }
}
