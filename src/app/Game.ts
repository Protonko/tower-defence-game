import type {CartridgesService} from '@services/interfaces/CartridgesService'
import type {DefendersService} from '@services/interfaces/DefendersService'
import type {EnemiesService} from '@services/interfaces/EnemiesService'
import type {BattleService} from '@services/interfaces/BattleService'
import type {BonusService} from '@services/interfaces/BonusService'
import {GameConfiguratorSingleton} from '@services/GameConfiguratorSingleton'
import {container} from '@config/ioc.config'
import {SERVICE_IDENTIFIER} from '@config/service-identifier'
import {Grid} from '@components/Grid'
import {Toolbar} from '@components/Toolbar'
import {GameOver} from '@components/GameOver'
import {DefenderSelectBoxes} from '@components/DefenderSelectBoxes'

export class Game {
  private _gameConfigurator: GameConfiguratorSingleton
  private _canvas: HTMLCanvasElement
  private _context: CanvasRenderingContext2D
  private readonly _canvasWidth: number
  private readonly _canvasHeight: number
  private _isGameOver: boolean
  private _grid: Grid
  private _toolbar: Toolbar
  private _gameOver: GameOver
  private _defenderSelectBoxes: DefenderSelectBoxes
  private _cartridgesService: CartridgesService
  private _defendersService: DefendersService
  private _enemiesService: EnemiesService
  private _battleService: BattleService
  private _bonusService: BonusService

  constructor() {
    this._gameConfigurator = GameConfiguratorSingleton.getInstance()
    const context = this._gameConfigurator.context

    if (!context) {
      throw new Error('2d context not supported or canvas already initialized')
    }

    this._canvas = this._gameConfigurator.canvas
    this._context = this._gameConfigurator.context
    this._canvasWidth = this._gameConfigurator.canvasWidth
    this._canvasHeight = this._gameConfigurator.canvasHeight
    this._isGameOver = false

    this._cartridgesService = container.get(
      SERVICE_IDENTIFIER.CARTRIDGES_SERVICE,
    )
    this._defendersService = container.get(SERVICE_IDENTIFIER.DEFENDERS_SERVICE)
    this._enemiesService = container.get(SERVICE_IDENTIFIER.ENEMIES_SERVICE)
    this._battleService = container.get(SERVICE_IDENTIFIER.BATTLE_SERVICE)
    this._bonusService = container.get(SERVICE_IDENTIFIER.BONUS_SERVICE)
    this._grid = new Grid()
    this._toolbar = new Toolbar()
    this._gameOver = new GameOver()
    this._defenderSelectBoxes = new DefenderSelectBoxes(
      this._defendersService.defendersData,
    )

    this._canvas.addEventListener('click', this._defendersService.buyDefender)
    this._canvas.addEventListener('click', () =>
      this._defendersService.selectDefender(
        this._defenderSelectBoxes.defendersSelectBoxMouses,
      ),
    )
    this.animate()
  }

  private animate = () => {
    if (this._enemiesService.isEnemyGotBase) {
      this._isGameOver = true
    }

    this._context.clearRect(0, 0, this._canvasWidth, this._canvasHeight)
    this._grid.draw()
    this._defendersService.drawDefenders()
    this._battleService.fight()
    this._toolbar.draw()
    this._defenderSelectBoxes.draw(this._defendersService.selectedDefenderType)
    this._cartridgesService.drawCartridges()
    this._enemiesService.drawEnemies()
    this._bonusService.drawBonuses()
    this._gameConfigurator.frame = this._gameConfigurator.frame + 1

    if (!this._isGameOver) {
      requestAnimationFrame(this.animate)
    } else {
      this._gameOver.draw()
    }
  }
}
