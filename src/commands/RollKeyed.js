import { Command } from "@colyseus/command";
import { rollDice } from "../util/RollFunctions.js";

// Function to find an object by its id
function findById(map, id) {
    for (let [key, value] of map.entries()) {
        if (value.id === id) {
            return value;
        }
    }
    return undefined;  // If no object with such id is found
}

export class RollKeyedCommand extends Command {
  execute(data) {
    const { id, key, count = 2, max = 6 } = data;
    //console.log('RollKeyedCommand.execute id', JSON.stringify(this.state.players))

    let rollResults = rollDice(count, max);

    // Store raw rolls and final values in the state
    //console.log('RollKeyedCommand.execute id, players', id, Array.from(this.state.players.keys()))
    const player = findById(this.state.players, id);
    player.keyedRolls[key] = rollResults;
    this.room.broadcast("keyed rollResults", {id, rollResults});
  }

}
