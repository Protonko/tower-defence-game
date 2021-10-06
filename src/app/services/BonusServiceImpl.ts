import type {BonusService} from './interfaces/BonusService'
import {injectable} from 'inversify'
import {CELL_SIZE, TOOLBAR_HEIGHT} from '../static/game'
import {Bonus} from '../components/Bonus'
import {GameConfiguratorSingleton} from './GameConfiguratorSingleton'
import {collision} from '../utils/collision'

@injectable()
export class BonusServiceImpl implements BonusService {
  private _gameConfigurator: GameConfiguratorSingleton
  private _bonuses: Bonus[]

  constructor() {
    const bonusCreationInterval = 10000

    this._gameConfigurator = GameConfiguratorSingleton.getInstance()
    this._bonuses = []

    setInterval(this.createBonus, bonusCreationInterval)
  }

  private removeBonusByIndex(index: number) {
    this._bonuses.splice(index, 1)
  }

  createBonus = () => {
    const bonusesAmounts = [10, 20, 30, 40]
    const amount = bonusesAmounts[Math.floor(Math.random() * bonusesAmounts.length)]
    const xPosition = Math.random() * (this._gameConfigurator.canvasWidth - CELL_SIZE)
    const yPosition = Math.floor((Math.random() * (this._gameConfigurator.canvasHeight - TOOLBAR_HEIGHT) / CELL_SIZE) + 1) * CELL_SIZE + CELL_SIZE / 2

    this._bonuses.push(new Bonus(xPosition, yPosition, amount))
  }

  drawBonuses() {
    this._bonuses.forEach((bonus, index) => {
      bonus.move()
      bonus.draw()

      if (bonus && collision(this._gameConfigurator.mouse, bonus)) {
        this._gameConfigurator.balance = this._gameConfigurator.balance + bonus.amount
        this.removeBonusByIndex(index)
      }
    })
  }
}
