import run from "aocrunner";

const exampleInput = `3   4
4   3
2   5
1   3
3   9
3   3`;

const parseInput = (rawInput: string) =>
  rawInput.split("\n").reduce(
    ([listA, listB], line) => {
      const [numberA, numberB] = line.split("   ");

      return [
        [...listA, Number(numberA)],
        [...listB, Number(numberB)],
      ] satisfies [number[], number[]];
    },
    [[], []] as [number[], number[]],
  );

const part1 = (rawInput: string) => {
  const [listA, listB] = parseInput(rawInput);

  listA.sort();
  listB.sort();

  return listA.reduce(
    (prev, curr, index) => prev + Math.abs(curr - listB[index]),
    0,
  );
};

const part2 = (rawInput: string) => {
  const [listA, listB] = parseInput(rawInput);

  return listA.reduce(
    (prev, curr) => prev + curr * listB.filter((b) => b === curr).length,
    0,
  );
};

run({
  part1: {
    tests: [
      {
        input: exampleInput,
        expected: 11,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: exampleInput,
        expected: 31,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
