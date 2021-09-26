import type {ControlsBar} from './interfaces/ControlsBar'
import {Grid} from './components/Grid'
import {CanvasConfiguratorSingleton} from './CanvasConfiguratorSingleton'

export class GameConfigurator {
  private controlsBar: ControlsBar
  private context: CanvasRenderingContext2D
  private readonly canvasWidth: number
  private readonly canvasHeight: number
  private grid: Grid

  constructor() {
    const canvasConfigurator = CanvasConfiguratorSingleton?.getInstance()
    const context = canvasConfigurator.canvasContext

    if (!context) {
      throw new Error('2d context not supported or canvas already initialized');
    }

    this.controlsBar = canvasConfigurator.controlsBar
    this.context = canvasConfigurator.canvasContext
    this.canvasWidth = canvasConfigurator.canvasWidth
    this.canvasHeight = canvasConfigurator.canvasHeight
    this.grid = new Grid()

    this.animate()
  }

  private animate = () => {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    this.context.fillStyle = 'blue' // TMP
    this.context.fillRect(0, 0, this.controlsBar.width, this.controlsBar.height)
    this.grid.draw()
    requestAnimationFrame(this.animate)
  }
}
