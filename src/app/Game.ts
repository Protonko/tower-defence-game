import type {DefendersService} from './services/interfaces/DefendersService'
import {Grid} from './components/Grid'
import {CanvasConfiguratorSingleton} from './services/CanvasConfiguratorSingleton'
import {DefendersServiceImpl} from './services/DefendersServiceImpl'
import {Toolbar} from './components/Toolbar'

export class Game {
  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D
  private readonly canvasWidth: number
  private readonly canvasHeight: number
  private grid: Grid
  private toolbar: Toolbar
  private defendersService: DefendersService

  constructor() {
    const canvasConfigurator = CanvasConfiguratorSingleton.getInstance()
    const context = canvasConfigurator.canvasContext

    if (!context) {
      throw new Error('2d context not supported or canvas already initialized');
    }

    this.context = canvasConfigurator.canvasContext
    this.canvasWidth = canvasConfigurator.canvasWidth
    this.canvasHeight = canvasConfigurator.canvasHeight
    this.canvas = canvasConfigurator.canvasElement

    this.grid = new Grid()
    this.toolbar = new Toolbar()
    this.defendersService = new DefendersServiceImpl()

    this.canvas.addEventListener('click', this.defendersService.buyDefender)
    this.animate()
  }

  private animate = () => {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    this.grid.draw()
    this.defendersService.drawDefender()
    this.toolbar.draw()
    requestAnimationFrame(this.animate)
  }
}