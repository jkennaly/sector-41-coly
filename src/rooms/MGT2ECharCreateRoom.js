import { GameRoom } from './GameRoom.js';
import Mgt2eState from './schema/Mgt2eState.js';
import { AxiosPostCommand } from "../commands/util/DB.js";
import {Character} from './schema/character/mgt2e/Character.js';
import { RollDiceCommand } from '../commands/RollDiceCommand.js';

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

    this.onMessage("ROLL_MGT2E_CHARGEN", (client, message) => {
      this.dispatcher.dispatch(new RollDiceCommand(), {
        id: client.auth.id
      });
    });

    this.onMessage("CREATE_CHARACTER", async (client) => {
      const token = this.tokens[client.auth.id]
      console.log(`MGT2ECharCreateRoom.onMessage CREATE_CHARACTER tokenLength: ${token && token.length} ${client.auth.id} ${this.state.dbGame.gmId}`);
      let data
      if(client.auth.id === this.state.dbGame.gmId) {
        console.log('Creating NPC')
        //create a new npc character
        const gameId = this.state.dbGame.id;
    const cmd = new AxiosPostCommand();
    data = await this.dispatcher.dispatch(cmd, {
      token, // assuming client.auth.token contains the authentication token
      apiRoute: `/api/games/mgt2e/chargen/${gameId}`,
    });
    //use the data returned to instantiate a new npc character
    const character = new Character(data);
    this.state.npcs.push(character)
    console.log(`MGT2ECharCreateRoom.onMessage CREATE_CHARACTER NPC ${JSON.stringify(data)}`);
      } else {
        //verify the user does not already have a pc character
        if(this.state.pcs[client.auth.id]) {
          console.log('Creating PC')
        //create a new pc character
        const gameId = this.state.dbGame.id;
    const cmd = new AxiosPostCommand();
    data = await this.dispatcher.dispatch(cmd, {
      token, // assuming client.auth.token contains the authentication token
      apiRoute: `/api/games/mgt2e/chargen/${gameId}`,
    });

    // assuming that the data returned contains the created character
    const character = new Character(data);
    this.state.pcs[client.auth.id] = character;

      }
    }
    
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
