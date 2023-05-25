import GameRoom from './GameRoom.js';
import DiceGameState from './schema/DiceGameState.js';
import Player from './schema/Player.js';

export class DiceGameRoom extends GameRoom {
  onCreate(options) {
    super.onCreate(options);
    this.setState(new DiceGameState());

    this.onMessage("roll_dice", (client, message) => {
      // This code will run when a "roll_dice" message is received from a client.
      const rollResult = this.rollDice(); // Assume you have a method to do this.
      
      // Set the roll result for this player
      this.state.players.get(client.sessionId).roll = rollResult;
  
      // Now you might want to change the current turn to the next player.
      this.nextPlayerId(this.state.currentTurn);
    });
  }
  rollDice() {
    return Math.floor(Math.random() * 6) + 1; // Returns a number between 1 and 6.
  }

  onJoin(client, options) {
    //before creating a new player, check if the user is already in the game
    //if the client.auth.id matches any player's id, then use that player
    //otherwise, create a new player
    const playerIds = Object.keys(this.state.players);
    const playerId = playerIds.find((playerId) => {
      return playerId === client.auth.id;
    });
    if (playerId) {
      this.state.players[client.sessionId] = this.state.players[playerId];
      delete this.state.players[playerId];
    } else {
      const player = new Player({ sessionId: client.sessionId, auth: client.auth, options});
      this.state.players[client.sessionId] = player;
      if (Object.keys(this.state.players).length === 1) {
        this.state.currentTurn = client.sessionId;
      }
    }
    this.state.resetCurrentTurn();
  }

  onLeave(client, consented) {
    delete this.state.players[client.sessionId];
    this.state.resetCurrentTurn();
  }

  nextPlayerId(currentPlayerId) {
    const playerIds = Object.values(this.state.players).filter(Boolean).map(x => x.id);
    const currentPlayerIndex = playerIds.indexOf(currentPlayerId);
    if (currentPlayerIndex === playerIds.length - 1) {
      return playerIds[0];
    } else {
      return playerIds[currentPlayerIndex + 1];
    }
  }
}

