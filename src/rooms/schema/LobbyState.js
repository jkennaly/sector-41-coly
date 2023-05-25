import * as schema from "@colyseus/schema";
const Schema = schema.Schema;
import Player from './Player.js';
import DbGame from './db/Game.js';

class LobbyState extends Schema {
  constructor({ dbGame, creator}) {
    super();

    this.players = new schema.MapSchema();
    this.gm = new Player();
    this.dbGame = new DbGame(dbGame);

  }


}

schema.defineTypes(LobbyState, {
  players: { map: Player },
  gm: Player,
  dbGame: DbGame
});

export default LobbyState;
