import { Schema } from '@colyseus/schema'
import * as schema from "@colyseus/schema";
import { SourceReference } from '../../../util/SourceReference.js';

class Augmentation extends Schema {
    constructor() {
        super();
        this.Type = "";
        this.Name = "";
        this.Description = "";
        this.TL = 0;
        this.Cost = 0;
        this.Mass = 0;
        this.Effects = "";
        this.Limitations = "";
        this.SourceReference = new SourceReference();
    }
}

schema.defineTypes(Augmentation, {
    Type: "string",
    Name: "string",
    Description: "string",
    TL: "number",
    Cost: "number",
    Mass: "number",
    Effects: "string",
    Limitations: "string",
    SourceReference: SourceReference
});

export { Augmentation };
