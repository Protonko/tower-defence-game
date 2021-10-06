import type {Defender} from '../components/interfaces/Defender'
import type {CartridgesService} from './interfaces/CartridgesService'
import type {DefendersService} from './interfaces/DefendersService'
import wizardSprite from '../../assets/images/wizard-attack.png'
import rangerSprite from '../../assets/images/ranger-attack.png'
import {inject, injectable} from 'inversify'
import {SERVICE_IDENTIFIER} from '../config/service-identifier'
import {CASTLE_WIDTH, CELL_GAP, CELL_SIZE, TOOLBAR_HEIGHT} from '../static/game'
import {DEFENDER_COST} from '../static/defenders'
import {DefenderFactory} from '../components/defenders/DefenderFactory'
import {GameConfiguratorSingleton} from './GameConfiguratorSingleton'
import {DEFENDER_TYPE, DefenderData} from '../interfaces/DefenderData'

@injectable()
export class DefendersServiceImpl implements DefendersService {
  private _gameConfigurator: GameConfiguratorSingleton
  private _defenders: Defender[]
  private _timer: number

  private _defendersData: DefenderData[] = [
    {
      type: DEFENDER_TYPE.RANGER,
      cost: 100,
      imageSource: rangerSprite,
    },
    {
      type: DEFENDER_TYPE.WIZARD,
      cost: 200,
      imageSource: wizardSprite,
    }
  ]

  constructor(
    @inject(SERVICE_IDENTIFIER.CARTRIDGES_SERVICE) private cartridgesService: CartridgesService
  ) {
    this._gameConfigurator = GameConfiguratorSingleton.getInstance()
    this._defenders = []
    this._timer = 0
  }

  buyDefender = () => {
    const gridPositionX = this._gameConfigurator.mouse.x - (this._gameConfigurator.mouse.x % CELL_SIZE) + CELL_GAP
    const gridPositionY = this._gameConfigurator.mouse.y - (this._gameConfigurator.mouse.y % CELL_SIZE) + CELL_GAP
    const isCollision = this._defenders.some(defender => defender.x === gridPositionX && defender.y === gridPositionY)

    if (gridPositionY < TOOLBAR_HEIGHT || gridPositionX < CASTLE_WIDTH || isCollision) return

    if (
      this._gameConfigurator.balance >= DEFENDER_COST) {
      this._defenders.push(DefenderFactory.createDefender(DEFENDER_TYPE.RANGER, gridPositionX, gridPositionY))
      this._gameConfigurator.balance = this._gameConfigurator.balance - DEFENDER_COST
    }
  }

  removeDefenderByIndex(index: number) {
    this._defenders.splice(index, 1)
  }

  drawDefenders() {
    this._defenders.forEach(defender => {
      defender.draw()
      defender.shoot(this.cartridgesService.cartridges)
    })
  }

  get defenders() {
    return this._defenders
  }

  get defendersData() {
    return this._defendersData
  }
}
