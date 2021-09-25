import type {ControlsBar} from './interfaces/ControlsBar'
import {AREA_WIDTH, AREA_HEIGHT, CELL_SIZE, CELL_GAP} from './static'

export class GameConfigurator {
  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D
  private controlsBar: ControlsBar

  private AREA_WIDTH = AREA_WIDTH
  private AREA_HEIGHT = AREA_HEIGHT
  private CELL_SIZE = CELL_SIZE
  private CELL_GAP = CELL_GAP
  private GAME_GRID = []

  constructor() {
    this.canvas = document.getElementById('canvas-area') as HTMLCanvasElement
    this.context = this.canvas.getContext('2d')
    this.canvas.width = this.AREA_WIDTH
    this.canvas.height = this.AREA_HEIGHT
    this.controlsBar = {
      width: this.canvas.width,
      height: this.CELL_SIZE,
    }

    this.animate()
  }

  private animate = () => {
    this.context.fillStyle = 'blue' // TMP
    this.context.fillRect(0, 0, this.controlsBar.width, this.controlsBar.height)
    requestAnimationFrame(this.animate)
  }
}
