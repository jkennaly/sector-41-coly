import * as schema from "@colyseus/schema";
const Schema = schema.Schema;
import Player from './Player.js';

class DiceGameState extends Schema {
  constructor() {
    super();
    this.players = new schema.MapSchema();
    this.currentTurn = '';
  }
}

schema.defineTypes(DiceGameState, {
  players: { map: Player },
  currentTurn: 'string',
});

export default DiceGameState;
