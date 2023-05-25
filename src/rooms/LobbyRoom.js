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
  }

  // When a client joins the room
  onJoin(client, options, auth) {
    //console.log('LobbyRoom.onJoin', client.auth.id, options);
    super.onJoin(client, options, auth);
  }

  // When a client leaves the room
  onLeave(client, consented) {
    super.onLeave(client, consented);
    delete this.state.players[client.sessionId];
  }

  // When a client sends a message
  onMessage(client, message) {
    //console.log('LobbyRoom.onMessage', client.auth.id, message);
    super.onMessage(client, message);
    // Handle message. This could include chat messages, or signals that the player is ready to start the game
  }

  // Cleanup callback, called after there is no more clients in the room. (see `autoDispose`)
  onDispose() {
    super.onDispose();
    // Cleanup
  }
}

export default LobbyRoom;
