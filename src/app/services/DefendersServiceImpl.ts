import type {DefendersService} from './interfaces/DefendersService'
import {CELL_SIZE} from '../static/game'
import {DEFENDER_COST} from '../static/defenders'
import {Defender} from '../components/Defender'
import {GameConfiguratorSingleton} from './GameConfiguratorSingleton'

export class DefendersServiceImpl implements DefendersService {
  private canvasConfiguration: GameConfiguratorSingleton
  private defenders: Defender[]

  constructor() {
    this.canvasConfiguration = GameConfiguratorSingleton.getInstance()
    this.defenders = []
  }

  buyDefender = () => {
    const gridPositionX = this.canvasConfiguration.mouse.x - (this.canvasConfiguration.mouse.x % CELL_SIZE)
    const gridPositionY = this.canvasConfiguration.mouse.y - (this.canvasConfiguration.mouse.y % CELL_SIZE)
    const isCollision = this.defenders.some(defender => defender.xValue === gridPositionX && defender.yValue === gridPositionY)

    if (gridPositionY < CELL_SIZE || isCollision) return

    if (
      this.canvasConfiguration.balance >= DEFENDER_COST) {
      this.defenders.push(new Defender(gridPositionX, gridPositionY))
      this.canvasConfiguration.balance = this.canvasConfiguration.balance - DEFENDER_COST
    }
  }

  // TODO: может быть, стоит объединить с buyDefender?
  drawDefenders = () => {
    this.defenders.forEach(defender => defender.draw())
  }
}
