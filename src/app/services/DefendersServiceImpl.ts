import type {DefendersService} from './interfaces/DefendersService'
import {CELL_SIZE} from '../static/game'
import {DEFENDER_COST} from '../static/defenders'
import {Defender} from '../components/Defender'
import {GameConfiguratorSingleton} from './GameConfiguratorSingleton'
import {Cartridge} from '../components/Cartridge'

export class DefendersServiceImpl implements DefendersService {
  private _canvasConfiguration: GameConfiguratorSingleton
  private _defenders: Defender[]
  private _cartridges: Cartridge[]

  constructor() {
    this._canvasConfiguration = GameConfiguratorSingleton.getInstance()
    this._defenders = []
    this._cartridges = []
  }

  buyDefender = () => {
    const gridPositionX = this._canvasConfiguration.mouse.x - (this._canvasConfiguration.mouse.x % CELL_SIZE)
    const gridPositionY = this._canvasConfiguration.mouse.y - (this._canvasConfiguration.mouse.y % CELL_SIZE)
    const isCollision = this._defenders.some(defender => defender.x === gridPositionX && defender.y === gridPositionY)

    if (gridPositionY < CELL_SIZE || isCollision) return

    if (
      this._canvasConfiguration.balance >= DEFENDER_COST) {
      this._defenders.push(new Defender(gridPositionX, gridPositionY))
      this._canvasConfiguration.balance = this._canvasConfiguration.balance - DEFENDER_COST
    }
  }

  removeDefenderByIndex(index: number) {
    this._defenders.splice(index, 1)
  }

  removeCartridgeByIndex(index: number) {
    this._cartridges.splice(index, 1)
  }

  drawDefenders() {
    this._defenders.forEach(defender => defender.draw())
  }

  drawCartridges() {
    this._cartridges.forEach((cartridge, index) => {
      cartridge.move()
      cartridge.draw()

      if (cartridge?.x > this._canvasConfiguration.canvasWidth - CELL_SIZE) {
        this.removeCartridgeByIndex(index)
      }
    })
  }

  shoot() {
    // ...
  }

  get defenders() {
    return this._defenders
  }
}
