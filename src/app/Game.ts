import type {CartridgesService} from './services/interfaces/CartridgesService'
import type {DefendersService} from './services/interfaces/DefendersService'
import type {EnemiesService} from './services/interfaces/EnemiesService'
import type {BattleService} from './services/interfaces/BattleService'
import type {BonusService} from './services/interfaces/BonusService'
import {GameConfiguratorSingleton} from './services/GameConfiguratorSingleton'
import {container} from './config/ioc.config'
import {SERVICE_IDENTIFIER} from './config/service-identifier'
import {Grid} from './components/Grid'
import {Toolbar} from './components/Toolbar'
import {GameOver} from './components/GameOver'
import {DefenderSelectBoxes} from './components/DefenderSelectBoxes'

export class Game {
  private gameConfigurator: GameConfiguratorSingleton
  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D
  private readonly canvasWidth: number
  private readonly canvasHeight: number
  private isGameOver: boolean
  private grid: Grid
  private toolbar: Toolbar
  private gameOver: GameOver
  private defenderSelectBoxes: DefenderSelectBoxes
  private cartridgesService: CartridgesService
  private defendersService: DefendersService
  private enemiesService: EnemiesService
  private battleService: BattleService
  private bonusService: BonusService

  constructor() {
    this.gameConfigurator = GameConfiguratorSingleton.getInstance()
    const context = this.gameConfigurator.context

    if (!context) {
      throw new Error('2d context not supported or canvas already initialized');
    }

    this.canvas = this.gameConfigurator.canvas
    this.context = this.gameConfigurator.context
    this.canvasWidth = this.gameConfigurator.canvasWidth
    this.canvasHeight = this.gameConfigurator.canvasHeight
    this.isGameOver = false

    this.cartridgesService = container.get(SERVICE_IDENTIFIER.CARTRIDGES_SERVICE)
    this.defendersService = container.get(SERVICE_IDENTIFIER.DEFENDERS_SERVICE)
    this.enemiesService = container.get(SERVICE_IDENTIFIER.ENEMIES_SERVICE)
    this.battleService = container.get(SERVICE_IDENTIFIER.BATTLE_SERVICE)
    this.bonusService = container.get(SERVICE_IDENTIFIER.BONUS_SERVICE)
    this.grid = new Grid()
    this.toolbar = new Toolbar()
    this.gameOver = new GameOver()
    this.defenderSelectBoxes = new DefenderSelectBoxes(this.defendersService.defendersData)

    this.canvas.addEventListener('click', this.defendersService.buyDefender)
    this.canvas.addEventListener('click', () => this.defendersService.selectDefender(this.defenderSelectBoxes.defendersSelectBoxMouses))
    this.animate()
  }

  private animate = () => {
    if (this.enemiesService.isEnemyGotBase) {
      this.isGameOver = true
    }

    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    this.grid.draw()
    this.defendersService.drawDefenders()
    this.battleService.fight()
    this.toolbar.draw()
    // TODO: Не отображается ranger?
    this.defenderSelectBoxes.draw(this.defendersService.selectedDefenderType)
    this.cartridgesService.drawCartridges()
    this.enemiesService.drawEnemies()
    this.bonusService.drawBonuses()
    this.gameConfigurator.frame = this.gameConfigurator.frame + 1

    if (!this.isGameOver) {
      requestAnimationFrame(this.animate)
    } else {
      this.gameOver.draw()
    }
  }
}
