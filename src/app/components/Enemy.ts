import type {Component} from './interfaces/Component'
import image from '../../assets/images/dragon-walk.png'
import {GameConfiguratorSingleton} from '../services/GameConfiguratorSingleton'
import {CELL_GAP, CELL_SIZE} from '../static/game'
import {ENEMY_HEALTH, ENEMY_REWARD, ENEMY_SPEED} from '../static/enemies'
import {COLORS, FONT_FAMILY, SIZES} from '../static/styles'
import {createFontStyle} from '../utils/createFontStyle'

const enemy1 = new Image()
enemy1.src = image

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
  private _frameX: number
  private _frameY: number
  private _minFrame: number
  private _maxFrame: number

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
    this._frameX = 0
    this._frameY = 0
    this._minFrame = 0
    this._maxFrame = 9
  }

  move() {
    this._x -= this._movement
    this._frameX += 0

    if (this._frameX < this._maxFrame) {
      this._frameX++
    } else if (this._frameY < 15) {
      this._frameX = this._minFrame
      this._frameY++
    } else {
      this._frameX = 0
      this._frameY = 0
    }
  }

  draw() {
    this._context.fillStyle = COLORS.textColor
    this._context.font = createFontStyle(SIZES.headerFontSize, FONT_FAMILY)
    this._context.textAlign = 'start'
    this._context.textBaseline = 'middle'
    this._context.fillText(Math.floor(this._health).toString(), this._x, this._y + CELL_SIZE / 2)
    this._context.drawImage(enemy1, this._frameX * 725, this._frameY * 445, 725, 445, this._x, this._y, this._width, this._height)
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
