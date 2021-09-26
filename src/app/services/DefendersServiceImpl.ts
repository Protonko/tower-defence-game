import type {DefendersService} from './interfaces/DefendersService'
import {CELL_SIZE} from '../static/game'
import {DEFENDER_COST} from '../static/defenders'
import {Defender} from '../components/Defender'
import {CanvasConfiguratorSingleton} from '../CanvasConfiguratorSingleton'

export class DefendersServiceImpl implements DefendersService {
  private canvasConfiguration: CanvasConfiguratorSingleton
  private defenders: Defender[]

  constructor() {
    this.canvasConfiguration = CanvasConfiguratorSingleton.getInstance()
    this.defenders = []
  }

  buyDefender = () => {
    const gridPositionX = this.canvasConfiguration.mouseValue.x - (this.canvasConfiguration.mouseValue.x % CELL_SIZE)
    const gridPositionY = this.canvasConfiguration.mouseValue.y - (this.canvasConfiguration.mouseValue.y % CELL_SIZE)
    const isCollision = this.defenders.some(defender => defender.xValue === gridPositionX && defender.yValue === gridPositionY)

    if (gridPositionY < CELL_SIZE || isCollision) return

    if (
      this.canvasConfiguration.balanceValue >= DEFENDER_COST) {
      this.defenders.push(new Defender(gridPositionX, gridPositionY))
      this.canvasConfiguration.balanceValue = this.canvasConfiguration.balanceValue - DEFENDER_COST
    }
  }

  // TODO: может быть, стоит объединить с buyDefender?
  drawDefender = () => {
    this.defenders.forEach(defender => defender.draw())
  }
}
