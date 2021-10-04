import type {Defender} from '../interfaces/Defender'
import {WizardDefender} from './WizardDefender'

export class DefenderFactory {
  static createDefender(gridPositionX: number, gridPositionY: number): Defender {
    return new WizardDefender(gridPositionX, gridPositionY)
  }
}
