import type {Defender} from '../components/interfaces/Defender'
import type {CartridgesService} from './interfaces/CartridgesService'
import type {DefendersService} from './interfaces/DefendersService'
import type {Mouse} from '../interfaces/Mouse'
import wizardSprite from '../../assets/images/wizard-attack.png'
import rangerSprite from '../../assets/images/ranger-attack.png'
import {inject, injectable} from 'inversify'
import {SERVICE_IDENTIFIER} from '../config/service-identifier'
import {CASTLE_WIDTH, CELL_GAP, CELL_SIZE, TOOLBAR_HEIGHT} from '../static/game'
import {DefenderFactory} from '../components/defenders/DefenderFactory'
import {GameConfiguratorSingleton} from './GameConfiguratorSingleton'
import {DEFENDER_TYPE, DefenderData} from '../interfaces/DefenderData'
import {collision} from '../utils/collision'

@injectable()
export class DefendersServiceImpl implements DefendersService {
  private _gameConfigurator: GameConfiguratorSingleton
  private _defenders: Defender[]
  private _timer: number
  private _selectedDefenderType: DEFENDER_TYPE

  private _defendersData: DefenderData[]

  constructor(
    @inject(SERVICE_IDENTIFIER.CARTRIDGES_SERVICE) private cartridgesService: CartridgesService
  ) {
    this._gameConfigurator = GameConfiguratorSingleton.getInstance()
    this._defenders = []
    this._timer = 0
    this._selectedDefenderType = DEFENDER_TYPE.RANGER

    const rangerImage = new Image()
    rangerImage.src = rangerSprite

    const wizardImage = new Image()
    wizardImage.src = wizardSprite

    this._defendersData = [
      {
        type: DEFENDER_TYPE.RANGER,
        cost: 100,
        image: rangerImage,
      },
      {
        type: DEFENDER_TYPE.WIZARD,
        cost: 200,
        image: wizardImage,
      }
    ]
  }

  buyDefender = () => {
    const gridPositionX = this._gameConfigurator.mouse.x - (this._gameConfigurator.mouse.x % CELL_SIZE) + CELL_GAP
    const gridPositionY = this._gameConfigurator.mouse.y - (this._gameConfigurator.mouse.y % CELL_SIZE) + CELL_GAP
    const isCollision = this._defenders.some(defender => defender.x === gridPositionX && defender.y === gridPositionY)
    const defenderCost = this._defendersData.find(defender => defender.type === this._selectedDefenderType)?.cost

    if (gridPositionY < TOOLBAR_HEIGHT || gridPositionX < CASTLE_WIDTH || isCollision) return

    if (defenderCost && this._gameConfigurator.balance >= defenderCost) {
      this._defenders.push(DefenderFactory.createDefender(this._selectedDefenderType, gridPositionX, gridPositionY))
      this._gameConfigurator.balance = this._gameConfigurator.balance - defenderCost
    }
  }

  selectDefender(mouses: Mouse[]) {
    mouses.forEach((mouse, index) => {
      if (collision(this._gameConfigurator.mouse, mouse)) {
        this._selectedDefenderType = this._defendersData[index].type
      }
    })
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

  get selectedDefenderType() {
    return this._selectedDefenderType
  }
}
