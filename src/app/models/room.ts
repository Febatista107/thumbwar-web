import { Player } from './player';

export interface Room {
  name: string;
  players: Array<Player>;
  winner: Player;
}
