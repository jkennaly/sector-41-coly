import { Schema, type, ArraySchema } from '@colyseus/schema';
import * as schema from "@colyseus/schema";
import { SourceReference } from '../../../util/SourceReference.js';

class Skills extends Schema {
    constructor() {
        super();
        this.name = "";
        this.level = "";
        this.description = "";
        this.category = "";
        this.parentSkill = "";
        this.specializations = new ArraySchema();
        this.SourceReference = new SourceReference();
    }
}

schema.defineTypes(Skills, {
    name: "string",
    level: "string",
    description: "string",
    category: "string",
    parentSkill: "string",
    specializations: ["string"],
    SourceReference: SourceReference
});

export { Skills };
