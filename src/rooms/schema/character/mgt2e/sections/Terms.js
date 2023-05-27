import { Schema, type, ArraySchema } from '@colyseus/schema';
import * as schema from "@colyseus/schema";

class CareerTerm extends Schema {
    constructor() {
        super();
        this.term = 0;
        this.finalAge = 0;
        this.finishingRank = "";
        this.howEntered = "";
        this.name = "";
        this.assignment = "";
        this.advanced = false;
        this.event = "";
        this.mishap = "";
        this.connections = new ArraySchema();
        this.associateGained = {};
        this.gainedCommission = false;
        this.skillsGained = new ArraySchema();
        this.bonusesGained = new ArraySchema();
        this.benefitsGained = new ArraySchema();
        this.agingEffects = {};
    }
}

schema.defineTypes(CareerTerm, {
    term: "number",
    finalAge: "number",
    finishingRank: "string",
    howEntered: "string",
    name: "string",
    assignment: "string",
    advanced: "boolean",
    event: "string",
    mishap: "string",
    connections: ["string"],
    associateGained: "any", // Because the type is "object" and we don't know its structure
    gainedCommission: "boolean",
    skillsGained: ["any"], 
    bonusesGained: ["any"], 
    benefitsGained: ["any"], 
    agingEffects: "any" 
});

class PreCareerTerm extends Schema {
    constructor() {
        super();
        this.term = 0;
        this.finalAge = 0;
        this.name = "";
        this.graduated = false;
        this.event = "";
    }
}

schema.defineTypes(PreCareerTerm, {
    term: "number",
    finalAge: "number",
    name: "string",
    graduated: "boolean",
    event: "string"
});

class MusteringOut extends Schema {
    constructor() {
        super();
        this.rollCount = 0;
        this.cashRolls = 0;
        this.cashModifier = 0;
        this.cashGained = 0;
        this.otherBenefitsGained = new ArraySchema();
    }
}

schema.defineTypes(MusteringOut, {
    rollCount: "number",
    cashRolls: "number",
    cashModifier: "number",
    cashGained: "number",
    otherBenefitsGained: ["any"]
});

export { CareerTerm, PreCareerTerm, MusteringOut };
