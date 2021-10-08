import '@assets/style/style.css'
import {Game} from '@app/Game'

try {
  new Game()
} catch (error) {
  console.log(error)
}
