import { GameRoom } from './GameRoom.js';
import Mgt2eState from './schema/Mgt2eState.js';

export class MGT2ECharCreateRoom extends GameRoom {

  async onAuth(client, options, request) {
    //call super.onAuth to check if the user is authenticated
    //if the user is authenticated, then the user's id will be in client.auth.id
    //if the user is not authenticated, then client.auth.id will be undefined
    const auth = await super.onAuth(client, options, request);
    //console.log('MGT2ECharCreateRoom.onAuth auth', auth);
    return auth
  }

  // When room is initialized
  onCreate(options) {
    const superOptions = {
      stateConstructor: Mgt2eState,
      state: { dbGame: {}, creator: {}}

    }
    super.onCreate(Object.assign(options, superOptions));

    this.onMessage("CREATE_CHARACTER", async (client) => {
      console.log(`MGT2ECharCreateRoom.onMessage CREATE_CHARACTER ${client.auth.id} ${this.state.dbGame.gmId}`);
      /*
      if(client.auth.id === this.state.dbGame.gmId) {
        //create a new npc character
        const gameId = this.state.dbGame.id;
    const cmd = new AxiosPostCommand();
    const data = await this.dispatcher.dispatch(cmd, {
      token: client.auth.token, // assuming client.auth.token contains the authentication token
      apiRoute: `/api/games/mgt2e/chargen/${gameId}`,
    });
      } else {
        //verify the user does not already have a pc character
        if(this.state.pcs[client.auth.id]) {
        //create a new pc character
        const gameId = this.state.dbGame.id;
    const cmd = new AxiosPostCommand();
    const data = await this.dispatcher.dispatch(cmd, {
      token: client.auth.token, // assuming client.auth.token contains the authentication token
      apiRoute: `/api/games/mgt2e/chargen/${gameId}`,
    });

    // assuming that the data returned contains the created character
    this.state.pcs[client.auth.id] = data.character;

      }
    }
    */
  });
  }

  // When a client joins the room
  onJoin(client, options, auth) {
    //console.log('MGT2ECharCreateRoom.onJoin', client.auth.id, options);
    super.onJoin(client, options, auth);
  }

  // When a client leaves the room
  onLeave(client, consented) {
    super.onLeave(client, consented);
    delete this.state.players[client.sessionId];
  }

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

export default MGT2ECharCreateRoom;
