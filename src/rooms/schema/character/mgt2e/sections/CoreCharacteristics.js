import { Schema, MapSchema } from '@colyseus/schema';
import * as schema from "@colyseus/schema";

class CoreCharacteristics extends Schema {
  constructor() {
    super();
    this.Strength = 0;
    this.Dexterity = 0;
    this.Endurance = 0;
    this.Intelligence = 0;
    this.Education = 0;
    this.SocialStanding = 0;
    this.Psionics = 0;
    this.RacialAlternates = new MapSchema();
  }
}

schema.defineTypes(CoreCharacteristics, {
  Strength: "number",
  Dexterity: "number",
  Endurance: "number",
  Intelligence: "number",
  Education: "number",
  SocialStanding: "number",
  Psionics: "number",
  RacialAlternates: { map: "string" },
});

export { CoreCharacteristics };
