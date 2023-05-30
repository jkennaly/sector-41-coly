// OnJoinCommand.ts
import { Command } from "@colyseus/command";
import { AxiosGetCommand } from "./util/DB.js";
import Player from '../rooms/schema/Player.js';
import Game from '../rooms/schema/db/Game.js';
import {Character} from '../rooms/schema/character/mgt2e/Character.js';

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
            //get players and assign as pcs or npcs
            //console.log('EnsureGameInstanceCommand game.players:', game.players);

            const charCmd = new AxiosGetCommand();
            const charData = await this.room.dispatcher.dispatch(charCmd, {
              token,
              apiRoute: '/api/games/' + options.gameId + '/characters',
            });
            console.log('EnsureGameInstanceCommand charData:', charData);
            //update state.pcs and state.npcs from charData.pcs and charData.npcs
            if(charData && charData.pcs) {
              if(!this.state.pcs || !Object.keys(this.state.pcs).length) this.state.pcs = charData.pcs;
              else {
                //add new pcs from charData.pcs to state.pcs, but do not overwrite.
                //Both objects are keyed by pc.ownerId
                const existingPlayers = Object.keys(this.state.pcs);
                existingPlayers.forEach(playerId => {
                  delete charData.pcs[playerId];
                });
                //create Characters from the charData.pcs and add them to state.pcs
                for(const pc of Object.values(charData.pcs)) {
                  const character = new Character(pc);
                  this.state.pcs[character.ownerId] = character;
                }

              }
            }
            if(charData.npcs) {
              //merge the charData.npcs into state.npcs, keeping state where npc.id is already in state

              const newNpcs = charData.npcs
                .filter(npc => !this.state.npcs.some(stateNpc => stateNpc.id === npc.id))
                .map(npc => new Character(npc))
              
              this.state.npcs = this.state.npcs.concat(newNpcs);

            }


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
