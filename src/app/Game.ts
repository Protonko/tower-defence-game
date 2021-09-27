import type {DefendersService} from './services/interfaces/DefendersService'
import type {EnemiesService} from './services/interfaces/EnemiesService'
import type {BattleService} from './services/interfaces/BattleService'
import {GameConfiguratorSingleton} from './services/GameConfiguratorSingleton'
import {DefendersServiceImpl} from './services/DefendersServiceImpl'
import {EnemiesServiceImpl} from './services/EnemiesServiceImpl'
import {BattleServiceImpl} from './services/BattleServiceImpl'
import {Grid} from './components/Grid'
import {Toolbar} from './components/Toolbar'
import {GameOver} from './components/GameOver'

export class Game {
  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D
  private readonly canvasWidth: number
  private readonly canvasHeight: number
  private isGameOver: boolean
  private grid: Grid
  private toolbar: Toolbar
  private gameOver: GameOver
  private defendersService: DefendersService
  private enemiesService: EnemiesService
  private battleService: BattleService

  constructor() {
    const gameConfigurator = GameConfiguratorSingleton.getInstance()
    const context = gameConfigurator.context

    if (!context) {
      throw new Error('2d context not supported or canvas already initialized');
    }

    this.canvas = gameConfigurator.canvas
    this.context = gameConfigurator.context
    this.canvasWidth = gameConfigurator.canvasWidth
    this.canvasHeight = gameConfigurator.canvasHeight
    this.isGameOver = false

    this.grid = new Grid()
    this.toolbar = new Toolbar()
    this.gameOver = new GameOver()
    this.defendersService = new DefendersServiceImpl()
    this.enemiesService = new EnemiesServiceImpl()
    this.battleService = new BattleServiceImpl(this.defendersService, this.enemiesService)

    this.canvas.addEventListener('click', this.defendersService.buyDefender)
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
    this.enemiesService.drawEnemies()

    if (!this.isGameOver) {
      requestAnimationFrame(this.animate)
    } else {
      this.gameOver.draw()
    }
  }
}
