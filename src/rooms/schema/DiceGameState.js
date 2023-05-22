import * as schema from "@colyseus/schema";
const Schema = schema.Schema;
import Player from './Player.js';

class DiceGameState extends Schema {
  constructor() {
    super();
    this.players = new schema.MapSchema();
    this.currentTurn = 0;
  }

  // Add a new method to reset the currentTurn.
  resetCurrentTurn() {
    if (!this.players.has(this.currentTurn)) {
      // The currentTurn player is not in the game, reset it.
      this.currentTurn = 0;
      // Loop over all players to check if any player has a roll of 0.
      for (let [playerId, player] of this.players.entries()) {
        if (player.roll === 0) {
          this.currentTurn = player.id;
          break;
        }
      }
    }
  }
}

schema.defineTypes(DiceGameState, {
  players: { map: Player },
  currentTurn: 'number',
});

export default DiceGameState;
