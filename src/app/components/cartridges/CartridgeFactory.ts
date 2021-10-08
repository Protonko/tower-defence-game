import type {Cartridge} from '@models/Cartridge'
import {CARTRIDGE_TYPE} from '@models/CartridgeType'
import {ArrowCartridge} from './ArrowCartridge'
import {FireballCartridge} from './FireballCartridge'

export class CartridgeFactory {
  static createCartridge(
    cartridgeType: CARTRIDGE_TYPE,
    x: number,
    y: number,
  ): Cartridge {
    switch (cartridgeType) {
      case CARTRIDGE_TYPE.ARROW:
        return new ArrowCartridge(x, y)
      case CARTRIDGE_TYPE.FIREBALL:
        return new FireballCartridge(x, y)
      default:
        return new ArrowCartridge(x, y)
    }
  }
}
