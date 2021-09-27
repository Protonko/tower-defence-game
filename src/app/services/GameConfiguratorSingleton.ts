import type {ControlsBar} from '../interfaces/ControlsBar'
import type {Mouse} from '../interfaces/Mouse'
import {AREA_HEIGHT, AREA_WIDTH, BALANCE, CELL_SIZE} from '../static/game'

export class GameConfiguratorSingleton {
  private static _instance: GameConfiguratorSingleton;
  private readonly _canvas: HTMLCanvasElement
  private readonly _context: CanvasRenderingContext2D | null
  private _balance: number
  private _mouse: Mouse = {
    x: 10,
    y: 10,
    width: 0.1,
    height: 0.1
  }

  private constructor() {
    this._canvas = document.getElementById('canvas-area') as HTMLCanvasElement
    this._context = this._canvas.getContext('2d')
    this._canvas.width = AREA_WIDTH
    this._canvas.height = AREA_HEIGHT
    this._balance = BALANCE

    this._canvas.addEventListener('mousemove', event => {
      this._mouse.x = event.x - this.canvasPosition.left
      this._mouse.y = event.y - this.canvasPosition.top
    })

    this._canvas.addEventListener('mouseleave', () => {
      this._mouse.x = 0
      this._mouse.y = 0
    })
  }

  static getInstance(): GameConfiguratorSingleton {
    if (!GameConfiguratorSingleton._instance) {
      GameConfiguratorSingleton._instance = new GameConfiguratorSingleton();
    }

    return GameConfiguratorSingleton._instance;
  }

  get canvas(): HTMLCanvasElement {
    return this._canvas
  }

  get context(): CanvasRenderingContext2D {
    return this._context!
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

  get mouse(): Mouse {
    return this._mouse
  }

  get balance(): number {
    return this._balance
  }

  set balance(value: number) {
    this._balance = value
  }
}
