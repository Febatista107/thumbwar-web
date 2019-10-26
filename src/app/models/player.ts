export interface Player {
  name: string;
  score: number;
  status: Status;
}

export enum Status {
  waiting = 'waiting',
  ready = 'ready',
  playing = 'playing'
}
