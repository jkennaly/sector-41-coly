import { Schema, ArraySchema } from '@colyseus/schema';
import { SourceReference } from '../../../util/SourceReference.js';
import * as schema from "@colyseus/schema";

class Equipment extends Schema {
  constructor() {
    super();
    this.name = "";
    this.Mass = 0;
    this.TL = 0;
    this.Traits = new ArraySchema();
    this.SourceReference = new SourceReference();
  }
}

schema.defineTypes(Equipment, {
  name: "string",
  Mass: "number",
  TL: "number",
  Traits: ["string"], // Assuming that Traits would be an array of strings
  SourceReference: SourceReference
});

export { Equipment };
