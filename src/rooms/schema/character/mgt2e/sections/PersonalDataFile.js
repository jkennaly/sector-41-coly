import { Schema, type, ArraySchema } from '@colyseus/schema';
import * as schema from "@colyseus/schema";

class PersonalDataFile extends Schema {
    constructor() {
        super();
        this.Name = "";
        this.Species = "";
        this.Traits = new ArraySchema();
        this.Age = 0;
        this.Homeworld = "";
        this.Title = "";
        this.DistinguishingFeatures = new ArraySchema();
        this.CurrentPortrait = "";
        this.PreviousPortraits = new ArraySchema();
        this.BackgroundNotes = new ArraySchema();
    }
}

schema.defineTypes(PersonalDataFile, {
    Name: "string",
    Species: "string",
    Traits: ["string"],
    Age: "number",
    Homeworld: "string",
    Title: "string",
    DistinguishingFeatures: ["string"],
    CurrentPortrait: "string",
    PreviousPortraits: ["string"],
    BackgroundNotes: ["string"]
});

export { PersonalDataFile };
