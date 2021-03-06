import type {Cartridge} from '@models/Cartridge'
import type {CartridgesService} from './interfaces/CartridgesService'
import {injectable} from 'inversify'
import {GameConfiguratorSingleton} from './GameConfiguratorSingleton'
import {CELL_SIZE} from '@static/game'

@injectable()
export class CartridgesServiceImpl implements CartridgesService {
  private _cartridges: Cartridge[]
  private readonly _canvasWidth: number

  constructor() {
    const gameConfigurator = GameConfiguratorSingleton.getInstance()

    this._cartridges = []
    this._canvasWidth = gameConfigurator.canvasWidth
  }

  removeCartridgeByIndex(index: number) {
    this._cartridges.splice(index, 1)
  }

  drawCartridges() {
    this._cartridges.forEach((cartridge, index) => {
      cartridge.move()
      cartridge.draw()

      if (cartridge?.x > this._canvasWidth - CELL_SIZE) {
        this.removeCartridgeByIndex(index)
      }
    })
  }

  get cartridges() {
    return this._cartridges
  }
}
