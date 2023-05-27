import { Schema, MapSchema } from '@colyseus/schema';
import * as schema from "@colyseus/schema";
import { SourceReference } from '../../../util/SourceReference.js';

class ArmorOption extends Schema {
    constructor() {
        super();
        this.key = "";
        this.value = null;
    }
}

schema.defineTypes(ArmorOption, {
    key: "string",
    value: "any"
});

class Armor extends Schema {
    constructor() {
        super();
        this.type = "";
        this.protection = 0;
        this.tl = 0;
        this.Radiation = 0;
        this.mass = 0;
        this.options = new MapSchema();
        this.SourceReference = new SourceReference();
    }
}

schema.defineTypes(Armor, {
    type: "string",
    protection: "number",
    tl: "number",
    Radiation: "number",
    mass: "number",
    options: { map: ArmorOption },
    SourceReference: SourceReference
});

export { Armor, ArmorOption };
