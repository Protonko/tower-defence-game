import type {Defender} from '../interfaces/Defender'
import {DEFENDER_TYPE} from '../../interfaces/DefenderData'
import {WizardDefender} from './WizardDefender'
import {RangerDefender} from './RangerDefender'

export class DefenderFactory {
  static createDefender(defenderType: DEFENDER_TYPE, gridPositionX: number, gridPositionY: number): Defender {
    switch (defenderType) {
      case DEFENDER_TYPE.WIZARD:
        return new WizardDefender(gridPositionX, gridPositionY)
      case DEFENDER_TYPE.RANGER:
        return new RangerDefender(gridPositionX, gridPositionY)
      default:
        return new RangerDefender(gridPositionX, gridPositionY)
    }
  }
}
