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

export class RollBasicCommand extends Command {
  execute(data) {
    const { id } = data;
    //console.log('RollBasicCommand.execute id', JSON.stringify(this.state.players))

    let rollResults = [rollDice(2, 6)];

    // Store raw rolls and final values in the state
    //console.log('RollBasicCommand.execute id, players', id, Array.from(this.state.players.keys()))
    const player = findById(this.state.players, id);
    player.rollResults = rollResults;
    this.room.broadcast("rollResults", {id, rollResults});
  }

}
