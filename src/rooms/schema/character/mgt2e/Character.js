import { Schema, type, ArraySchema } from '@colyseus/schema';
import * as schema from "@colyseus/schema";
import { SourceReference } from '../../util/SourceReference.js';
import { Armor } from './sections/ArmorState.js';
import { Augmentation } from './sections/AugmentationState.js';
import { CoreCharacteristics } from './sections/CoreCharacteristics.js';
import { Equipment } from './sections/Equipment.js';
import { Finances } from './sections/FinanceState.js';
import { LifePath } from './sections/LifePath.js';
import { PersonalDataFile } from './sections/PersonalDataFile.js';
import { Skills } from './sections/Skills.js';
import { Weapon } from './sections/Weapons.js';

class Character extends Schema {
    constructor() {
        super();
        this.id = 0;
        this.gameId = 0;
        this.sourceReference = new SourceReference();
        this.history = new ArraySchema();
        this.location = {};
        this.armor = new ArraySchema();
        this.augmentations = new ArraySchema();
        this.coreCharacteristics = new CoreCharacteristics();
        this.equipment = new ArraySchema();
        this.finances = new Finances();
        this.lifePaths = new ArraySchema();
        this.personalDataFile = new PersonalDataFile();
        this.skills = new ArraySchema();
        this.weapons = new ArraySchema();
    }
}

schema.defineTypes(Character, {
    id: "number",
    gameId: "number",
    sourceReference: SourceReference,
    history: [{ type: "map", values: "any" }], // This should be replaced by the appropriate type.
    location: "any", // This should be replaced by the appropriate type.
    armor: [Armor],
    augmentations: [Augmentation],
    coreCharacteristics: CoreCharacteristics,
    equipment: [Equipment],
    finances: Finances,
    lifePaths: [LifePath],
    personalDataFile: PersonalDataFile,
    skills: [Skills],
    weapons: [Weapon]
});

export { Character };
