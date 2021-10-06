export enum DEFENDER_TYPE {
  WIZARD = 'WIZARD',
  RANGER = 'RANGER',
}

export interface DefenderData {
  type: DEFENDER_TYPE,
  imageSource: string,
  cost: number,
}
