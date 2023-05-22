import GameRoom from './GameRoom.js';
import DiceGameState from './schema/DiceGameState.js';
import Player from './schema/Player.js';

export class DiceGameRoom extends GameRoom {
  onCreate(options) {
    super.onCreate(options);
    this.setState(new DiceGameState());

    this.onMessage('roll', (client) => {
      const player = this.state.players[client.sessionId];
      player.roll = Math.floor(Math.random() * 6) + 1;
      this.state.currentTurn = this.nextPlayerId(client.sessionId);
    });
  }

  onJoin(client, options) {
    const player = new Player({ sessionId: client.sessionId, auth: client.auth, options});
    console.log('player:', player);
    this.state.players[client.sessionId] = player;
    if (Object.keys(this.state.players).length === 1) {
      this.state.currentTurn = client.sessionId;
    }
  }

  onLeave(client, consented) {
    delete this.state.players[client.sessionId];
  }

  nextPlayerId(currentPlayerId) {
    const playerIds = Object.keys(this.state.players);
    const currentPlayerIndex = playerIds.indexOf(currentPlayerId);
    if (currentPlayerIndex === playerIds.length - 1) {
      return playerIds[0];
    } else {
      return playerIds[currentPlayerIndex + 1];
    }
  }
}

