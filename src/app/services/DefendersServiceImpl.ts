import type {CartridgesService} from './interfaces/CartridgesService'
import type {DefendersService} from './interfaces/DefendersService'
import {CELL_GAP, CELL_SIZE} from '../static/game'
import {DEFENDER_COST} from '../static/defenders'
import {Defender} from '../components/Defender'
import {GameConfiguratorSingleton} from './GameConfiguratorSingleton'

export class DefendersServiceImpl implements DefendersService {
  private _canvasConfiguration: GameConfiguratorSingleton
  private _cartridgesService: CartridgesService
  private _defenders: Defender[]
  private _timer: number

  constructor(cartridgesService: CartridgesService) {
    this._cartridgesService = cartridgesService
    this._canvasConfiguration = GameConfiguratorSingleton.getInstance()
    this._defenders = []
    this._timer = 0
  }

  buyDefender = () => {
    const gridPositionX = this._canvasConfiguration.mouse.x - (this._canvasConfiguration.mouse.x % CELL_SIZE) + CELL_GAP
    const gridPositionY = this._canvasConfiguration.mouse.y - (this._canvasConfiguration.mouse.y % CELL_SIZE) + CELL_GAP
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

  drawDefenders() {
    this._defenders.forEach(defender => {
      defender.draw()
      this._cartridgesService.appendCartridge(defender.x, defender.y)
    })
  }

  get defenders() {
    return this._defenders
  }
}
