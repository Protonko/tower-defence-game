import type {ControlsBar} from '../interfaces/ControlsBar'
import type {Mouse} from '../interfaces/Mouse'
import {AREA_HEIGHT, AREA_WIDTH, BALANCE, CELL_SIZE} from '../static/game'

export class CanvasConfiguratorSingleton {
  private readonly canvas: HTMLCanvasElement
  private readonly context: CanvasRenderingContext2D | null
  private balance: number
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

    this.canvas.addEventListener('mousemove', event => {
      this.mouse.x = event.x - this.canvasPosition.left
      this.mouse.y = event.y - this.canvasPosition.top
    })

    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.x = 0
      this.mouse.y = 0
    })
  }

  static getInstance(): CanvasConfiguratorSingleton {
    if (!CanvasConfiguratorSingleton.instance) {
      CanvasConfiguratorSingleton.instance = new CanvasConfiguratorSingleton();
    }

    return CanvasConfiguratorSingleton.instance;
  }

  get canvasElement(): HTMLCanvasElement {
    return this.canvas
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

  get balanceValue(): number {
    return this.balance
  }

  set balanceValue(value: number) {
    this.balance = value
  }
}
