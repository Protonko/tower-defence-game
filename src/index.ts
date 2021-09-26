import './assets/style/style.css'
import {GameConfigurator} from './app/canvas'

try {
  new GameConfigurator()
} catch (error) {
  console.log(error)
}
