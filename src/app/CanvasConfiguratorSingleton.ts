import type {ControlsBar} from './interfaces/ControlsBar'
import type {Mouse} from './interfaces/Mouse'
import {AREA_HEIGHT, AREA_WIDTH, BALANCE, CELL_SIZE} from './static/game'
import {DEFENDER_COST} from './static/defenders'
import {Defender} from './components/Defender'

export class CanvasConfiguratorSingleton {
  private readonly canvas: HTMLCanvasElement
  private readonly context: CanvasRenderingContext2D | null
  private balance: number
  private defenders: Defender[]
  private static instance: CanvasConfiguratorSingleton;
  private mouse: Mouse = {
    x: 10,
    y: 10,
    width: 0.1,
    height: 0.1
  }

  private constructor() {
    this.canvas = document.getElementById('canvas-area') as HTMLCanvasElement
    this.context = this.canvas.getContext('2d')
    this.canvas.width = AREA_WIDTH
    this.canvas.height = AREA_HEIGHT
    this.balance = BALANCE
    this.defenders = []

    this.canvas.addEventListener('mousemove', event => {
      this.mouse.x = event.x - this.canvasPosition.left
      this.mouse.y = event.y - this.canvasPosition.top
    })

    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.x = 0
      this.mouse.y = 0
    })

    this.canvas.addEventListener('click', () => {
      const gridPositionX = this.mouse.x - (this.mouse.x % CELL_SIZE)
      const gridPositionY = this.mouse.y - (this.mouse.y % CELL_SIZE)

      if (gridPositionY < CELL_SIZE) return

      // TODO: исправить
      if (this.balance > DEFENDER_COST) {
        this.defenders.push(new Defender(gridPositionX, gridPositionY))
        this.balance -= DEFENDER_COST
      }
    })
  }

  static getInstance(): CanvasConfiguratorSingleton {
    if (!CanvasConfiguratorSingleton.instance) {
      CanvasConfiguratorSingleton.instance = new CanvasConfiguratorSingleton();
    }

    return CanvasConfiguratorSingleton.instance;
  }

  get canvasContext(): CanvasRenderingContext2D {
    return this.context!
  }

  get canvasWidth(): number {
    return this.canvas.width
  }

  get canvasHeight(): number {
    return this.canvas.height
  }

  get canvasPosition(): DOMRect {
    return this.canvas.getBoundingClientRect()
  }

  get controlsBar(): ControlsBar {
    return {
      width: this.canvas.width,
      height: CELL_SIZE,
    }
  }

  get mouseValue(): Mouse {
    return this.mouse
  }
}
