// OnJoinCommand.ts
import { Command } from "@colyseus/command";
import { AxiosGetCommand } from "./util/DB.js";
import Player from '../rooms/schema/Player.js';
import Game from '../rooms/schema/db/Game.js';

export class OnJoinCommand extends Command {

    async execute({ client, options }) {
        //before creating a new player, check if the user is already in the game
        //if the client.auth.id matches any player's id, then use that player
        //otherwise, create a new player
        await this.room.dispatcher.dispatch(new EnsureGameInstanceCommand(), { client, options });
    }
  
  }

  class EnsureGameInstanceCommand extends Command {
    async execute({ client, options }) {
      // Your logic here, e.g. make an API call
      // return the result
      //check state to see if there is a game instance, by verifying game && game.id
      const game = this.state.game;
        if (!game || !game.id) {
            //get client's token
            const token = this.room.tokens[client.auth.id];
            //console.log('getting client')
            //use that to request a game instance from the server

            const cmd = new AxiosGetCommand();
            const data = await this.room.dispatcher.dispatch(cmd, {
              token,
              apiRoute: '/api/games/' + options.gameId,
            });
            
            const game = new Game(data);
            //console.log('EnsureGameInstanceCommand game:', game);
            this.state.dbGame = game;
        }

    }
  }
  
  class AssignAsPlayerCommand extends Command {
    execute({ client, options, gameInstance }) {
      // Your logic here
      // You can access the result of the previous command in the options
      const player = this.state.players[client.auth.id]
        if (!player) {
            const player = new Player({ sessionId: client.sessionId, auth: client.auth, options});
            this.state.players[client.auth.id] = player;
        }
    }
  }
  
  class AssignAsGmCommand extends Command {
    execute({ client, options, gameInstance, playerInstance }) {
      // Your logic here
      // You can access the results of previous commands in the options
    }
  }
