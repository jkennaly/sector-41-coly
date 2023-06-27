
import DiceRoll from "../rooms/schema/DiceRoll.js";

export function rollDice(diceCount, sides, dropLowest = false) {
  let rolls = [];
  const drops = [];
  for(let i = 0; i < diceCount; i++){
    rolls.push(Math.floor(Math.random() * sides) + 1);
  }

  if(dropLowest){
    // Sort and drop the lowest
    rolls.sort((a, b) => a - b);
    const [drop, ...remaining] = rolls;
    rolls = remaining;
    drops.push(drop);
  }

  // Sum remaining dice
  let sum = rolls.reduce((a, b) => a + b, 0);

  return new DiceRoll({rolls, sum, drops});
}