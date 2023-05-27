import { CareerTerm, PreCareerTerm, MusteringOut } from './Terms.js';
import { Schema, ArraySchema } from '@colyseus/schema';
import * as schema from "@colyseus/schema";

class LifePath extends Schema {
    constructor() {
        super();
        this.CareerTerms = new ArraySchema();
        this.PreCareerTerms = new ArraySchema();
        this.MusteringOut = new MusteringOut();
    }
}

schema.defineTypes(LifePath, {
    CareerTerms: [CareerTerm],
    PreCareerTerms: [PreCareerTerm],
    MusteringOut: MusteringOut
});

export { LifePath };
