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

export class RollDiceCommand extends Command {
  execute(data) {
    const { id } = data;
    console.log('RollDiceCommand.execute id', JSON.stringify(this.state.players))

    let rollResults = [];
    // Roll 2D6 4 times
    for(let i = 0; i < 4; i++){
      rollResults.push(rollDice(2, 6));
    }
    
    // Roll 3D6 and drop the lowest, twice
    for(let i = 0; i < 2; i++){
      let roll = rollDice(3, 6, true);
      rollResults.push(roll);
    }

    // Store raw rolls and final values in the state
    console.log('RollDiceCommand.execute id, players', id, Array.from(this.state.players.keys()))
    const player = findById(this.state.players, id);
    player.rollResults = rollResults;
    this.room.broadcast("rollResults", {id, rollResults});
  }

}
