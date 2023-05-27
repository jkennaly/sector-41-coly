import { Schema, type, ArraySchema } from '@colyseus/schema';
import * as schema from "@colyseus/schema";
import { SourceReference } from '../../../util/SourceReference.js';

class Weapon extends Schema {
    constructor() {
        super();
        this.name = "";
        this.Damage = "";
        this.Mass = 0;
        this.MagazineSize = 0;
        this.MagazineCurrent = 0;
        this.MagazineCost = 0;
        this.Range = "";
        this.Traits = new ArraySchema();
        this.SourceReference = new SourceReference();
    }
}

schema.defineTypes(Weapon, {
    name: "string",
    Damage: "string",
    Mass: "number",
    MagazineSize: "number",
    MagazineCurrent: "number",
    MagazineCost: "number",
    Range: "string",
    Traits: [{ type: "map", values: "any" }],
    SourceReference: SourceReference
});

export { Weapon };
