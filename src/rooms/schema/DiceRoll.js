import * as schema from "@colyseus/schema";
import { v4 } from 'uuid';
const Schema = schema.Schema;

class DiceRoll extends Schema {
  constructor({rolls, sum, drops = [], max = 6}) {
    super();
    this.sum = sum;
    this.rolls = rolls;
    this.drops = drops;
    this.max = max;
    this.id = v4();
  }


}

schema.defineTypes(DiceRoll, {
    sum: 'number',
    rolls: ['number'],
    drops: ['number'],
    id: 'string',
});

export default DiceRoll;