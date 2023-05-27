import * as schema from "@colyseus/schema";
import { Schema } from '@colyseus/schema'

export class SourceReference extends Schema {
    constructor() {
        super();
        this.book = "";
        this.page = 0;
    }
}

schema.defineTypes(SourceReference, {
    book: "string",
    page: "number"
});

export default SourceReference;