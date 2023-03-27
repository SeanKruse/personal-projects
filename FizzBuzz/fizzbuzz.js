class FizzBuzz {
  fizzBuzz(start, end) {
    let ar = [];
    let index = start;

    while (index <= end) {
      if (index % 3 === 0 && index % 5 === 0) {
        ar.push("FizzBuzz");
      } else if (index % 3 === 0) {
        ar.push("Fizz");
      } else if (index % 5 === 0) {
        ar.push("Buzz");
      } else {
        ar.push(String(index));
      }

      index++;
    }

    return ar;
  }
}

// Example usage
const fizzBuzzGame = new FizzBuzz();
const results = fizzBuzzGame.fizzBuzz(1, 100);
console.log(results);
