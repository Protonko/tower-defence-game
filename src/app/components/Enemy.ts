import type {Component} from './interfaces/Component'
import {GameConfiguratorSingleton} from '../services/GameConfiguratorSingleton'
import {CELL_SIZE} from '../static/game'
import {ENEMY_HEALTH, ENEMY_REWARD, ENEMY_SPEED} from '../static/enemies'
import {COLORS, FONT_FAMILY, SIZES} from '../static/styles'
import {createFontStyle} from '../utils/createFontStyle'

export class Enemy implements Component {
  private context: CanvasRenderingContext2D
  private x: number
  private readonly y: number
  private readonly width: number
  private readonly height: number
  private health: number
  private readonly reward: number
  private readonly speed: number
  private readonly movement: number

  constructor(y: number) {
    const gameConfigurator = GameConfiguratorSingleton.getInstance()

    this.context = gameConfigurator.context
    this.x = gameConfigurator.canvasWidth
    this.y = y
    this.width = CELL_SIZE
    this.height = CELL_SIZE
    this.health = ENEMY_HEALTH
    this.reward = ENEMY_REWARD
    this.speed = ENEMY_SPEED
    this.movement = this.speed
  }

  move() {
    this.x -= this.movement
  }

  draw() {
    this.context.fillStyle = COLORS.enemyColor
    this.context.fillRect(this.x, this.y, this.width, this.height)
    this.context.fillStyle = COLORS.textColor
    this.context.font = createFontStyle(SIZES.headerFontSize, FONT_FAMILY)
    this.context.fillText(Math.floor(this.health).toString(), this.x, this.y + 25)
  }

  get xPosition() {
    return this.x
  }
}
