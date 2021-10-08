import type {Mouse} from '@models/Mouse'

export const collision = (first: Mouse, second: Mouse) => {
  return !(
    first.x > second.x + second.width ||
    first.x + first.width < second.x ||
    first.y > second.y + second.height ||
    first.y + first.height < second.y
  )
}
