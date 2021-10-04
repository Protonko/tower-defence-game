export interface Enemy {
  move: () => void,
  draw: () => void,
  readonly width: number,
  readonly height: number,
  readonly x: number,
  readonly y: number,
  readonly speed: number,
  readonly reward: number,
  readonly damage: number,
  health: number,
  movement: number,
}
