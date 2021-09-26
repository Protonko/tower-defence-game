import {CanvasConfiguratorSingleton} from '../CanvasConfiguratorSingleton'

export class Toolbar {
  private canvasConfigurator: CanvasConfiguratorSingleton

  constructor() {
    this.canvasConfigurator = CanvasConfiguratorSingleton.getInstance()
  }

  draw = () => {
    this.canvasConfigurator.canvasContext.fillStyle = 'black'
    this.canvasConfigurator.canvasContext.font = '30px Roboto'
    this.canvasConfigurator.canvasContext.fillText(`Balance: ${this.canvasConfigurator.balanceValue}`, 0, 20)
  }
}
