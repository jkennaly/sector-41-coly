import * as schema from "@colyseus/schema";
const Schema = schema.Schema;

class Player extends Schema {
  constructor(options) {
    super();
    console.log('Player options:', options);
    this.roll = 0;
    this.sub = options.sub;
    this.id = options?.auth?.id;
    this.nickname = options?.auth?.nickname || options.sessionId;
    //if there is no picture on the auth object, use the gravatar of userEmail
    this.picture = options?.auth?.picture || `https://www.gravatar.com/avatar/${options?.auth?.email}`;
  }
}

schema.defineTypes(Player, {
  roll: 'number',
  id: 'number',
  nickname: 'string',
  picture: 'string',
});

export default Player;
