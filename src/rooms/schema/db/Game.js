import { Schema, defineTypes } from "@colyseus/schema";

class Game extends Schema {
  constructor(dbGame) {
    super();
    if (dbGame) {
      this.id = dbGame.id;
      this.name = dbGame.name;
      this.description = dbGame.description;
      this.status = dbGame.status;
      this.gmId = dbGame.gmId;
      this.completedAt = Date.parse(dbGame.completedAt);
      this.createdAt = Date.parse(dbGame.createdAt);
      this.updatedAt = Date.parse(dbGame.updatedAt);
      this.maxPlayers = dbGame.maxPlayers;
      this.gameLength = dbGame.gameLength;
      this.gameType = dbGame.gameType;
    }
  }
}

defineTypes(Game, {
  id: "number",
  name: "string",
  description: "string",
  status: "string",
  gmId: "number",
  completedAt: "number",
  createdAt: "number",
  updatedAt: "number",
  maxPlayers: "number",
  gameLength: "number",
  gameType: "string"
});

export default Game;
