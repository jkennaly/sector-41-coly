import { GameRoom } from './GameRoom.js';
import LobbyState from './schema/LobbyState.js';

export class LobbyRoom extends GameRoom {

  async onAuth(client, options, request) {
    //call super.onAuth to check if the user is authenticated
    //if the user is authenticated, then the user's id will be in client.auth.id
    //if the user is not authenticated, then client.auth.id will be undefined
    const auth = await super.onAuth(client, options, request);
    //console.log('LobbyRoom.onAuth auth', auth);
    return auth
  }

  // When room is initialized
  onCreate(options) {
    const superOptions = {
      stateConstructor: LobbyState,
      state: { dbGame: {}, creator: {}}

    }
    super.onCreate(Object.assign(options, superOptions));



    this.onMessage("CLEAR_ROLL_RESULTS", (client, message) => {
      console.log('LobbyRoom.onMessage CLEAR_ROLL_RESULTS', message);
      this.dispatcher.dispatch(new ClearRollResultsCmd(), {
        id: client.auth.id
      });
    });
    this.onMessage("ROLL_BASIC", (client, message) => {
      console.log('LobbyRoom.onMessage ROLL_BASIC', client.auth.id, message);
    });
    this.onMessage("START_GAME", (client) => {
      console.log(`LobbyRoom.onMessage START_GAME ${client.auth.id} ${this.state.dbGame.gmId}`);
      if(client.auth.id === this.state.dbGame.gmId) {
        this.onAllPlayersReady();
      } else {
        console.log(`Client ${client.auth.id} tried to start the game but is not the GM.`);
      }
  });
  
  }

  // When a client joins the room
  onJoin(client, options, auth) {
    //console.log('LobbyRoom.onJoin', client.auth.id, options);
    super.onJoin(client, options, auth);
  }

  // When a client leaves the room
  onLeave(client, consented) {
    super.onLeave(client, consented);
  }

  // When a client sends a message
  // onMessage(client, message) {
  //   //console.log('LobbyRoom.onMessage', client.auth.id, message);
  //   console.log('LobbyRoom.onMessage', client.auth.id, message);
  //   // Handle message. This could include chat messages, or signals that the player is ready to start the game
  //   if(message === 'START_GAME') {
  //   if(client.auth.id === this.state.dbGame.gmId) {
  //     this.onAllPlayersReady();
  //   } else {
  //       console.log(`Client ${client.auth.id} tried to start the game but is not the GM.`);
  //   }
  // }
  // }

  onAllPlayersReady() {
    // Notify all clients that they should join the Character Generation room.
    this.broadcast('MOVE_TO_CHARACTER_GENERATION');
    // Close the current room.
    this.disconnect();
  }

  // Cleanup callback, called after there is no more clients in the room. (see `autoDispose`)
  onDispose() {
    super.onDispose();
    // Cleanup
  }
}

export default LobbyRoom;
