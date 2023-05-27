import * as schema from "@colyseus/schema";
const Schema = schema.Schema;
import Player from './Player.js';
import { Character } from './character/mgt2e/Character.js';
import DbGame from './db/Game.js';

class Mgt2eState extends Schema {
  constructor({ dbGame}) {
    super();

    this.players = new schema.MapSchema();
    this.gm = new Player();
    this.dbGame = new DbGame(dbGame);
    this.pcs = new schema.MapSchema();
    this.npcs = []

  }


}

schema.defineTypes(Mgt2eState, {
  players: { map: Player },
  pcs: { map: Character },
  npcs: [Character],
  gm: Player,
  dbGame: DbGame
});

export default Mgt2eState;
