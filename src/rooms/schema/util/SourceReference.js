import * as schema from "@colyseus/schema";
import { Schema } from '@colyseus/schema'

export class SourceReference extends Schema {
    constructor() {
        super();
        this.book = "";
        this.page = 0;
        this.notes = "";
    }
}

schema.defineTypes(SourceReference, {
    book: "string",
    page: "number",
    notes: "string"
});

export default SourceReference;