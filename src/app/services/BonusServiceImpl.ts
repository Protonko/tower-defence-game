import type {BonusService} from './interfaces/BonusService'
import {injectable} from 'inversify'
import {BONUS_CREATION_INTERVAL, BONUSES_AMOUNTS} from '../static/bonuses'
import {CELL_SIZE, TOOLBAR_HEIGHT} from '../static/game'
import {Bonus} from '../components/Bonus'
import {GameConfiguratorSingleton} from './GameConfiguratorSingleton'
import {collision} from '../utils/collision'

@injectable()
export class BonusServiceImpl implements BonusService {
  private _gameConfigurator: GameConfiguratorSingleton
  private _bonuses: Bonus[]

  constructor() {
    this._gameConfigurator = GameConfiguratorSingleton.getInstance()
    this._bonuses = []

    setInterval(this.createBonus, BONUS_CREATION_INTERVAL)
  }

  private removeBonusByIndex(index: number) {
    this._bonuses.splice(index, 1)
  }

  createBonus = () => {
    const xPosition = Math.random() * (this._gameConfigurator.canvasWidth - CELL_SIZE)
    const yPosition = Math.floor((Math.random() * (this._gameConfigurator.canvasHeight - TOOLBAR_HEIGHT) / CELL_SIZE) + 1) * CELL_SIZE + CELL_SIZE / 2
    const amount = BONUSES_AMOUNTS[Math.floor(Math.random() * BONUSES_AMOUNTS.length)]

    this._bonuses.push(new Bonus(xPosition, yPosition, amount))
  }

  drawBonuses() {
    this._bonuses.forEach((bonus, index) => {
      bonus.draw()

      if (bonus && collision(this._gameConfigurator.mouse, bonus)) {
        this._gameConfigurator.balance = this._gameConfigurator.balance + bonus.amount
        this.removeBonusByIndex(index)
      }
    })
  }
}
