import * as schema from "@colyseus/schema";
const Schema = schema.Schema;
import DiceRoll from "./DiceRoll.js";

class Player extends Schema {
  constructor(options) {
    super();
    this.rollResults = [] 
    this.roll = 0;
    this.id = options?.auth?.id;
    this.nickname = options?.auth?.nickname || options?.sessionId || 'anonymous';
    //if there is no picture on the auth object, use the gravatar of userEmail
    this.picture = options?.auth?.picture || `https://www.gravatar.com/avatar/${options?.auth?.email}`;
  }
}

schema.defineTypes(Player, {
  rollResults: [DiceRoll],
  roll: 'number',
  id: 'number',
  nickname: 'string',
  picture: 'string',
});

export default Player;
