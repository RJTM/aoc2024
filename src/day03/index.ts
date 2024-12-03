import run from "aocrunner";

const exampleInput = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const operations = [
    ...input.matchAll(/mul\((?<n1>(\d){1,3}),(?<n2>(\d){1,3})\)/g),
  ].map((o) => [Number(o.groups.n1), Number(o.groups.n2)]);

  return operations.reduce((prev, curr) => prev + curr[0] * curr[1], 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const operations = input.match(
    /(do\(\))|don't\(\)|mul\((\d){1,3},(\d){1,3}\)/g,
  );

  let enabled = true;
  const enabledOperations = [];
  for (let operation of operations!) {
    if (operation === "don't()") {
      enabled = false;
      continue;
    }

    if (operation === "do()") {
      enabled = true;
      continue;
    }

    if (enabled) {
      enabledOperations.push(operation);
    }
  }

  return enabledOperations.reduce(
    (prev, operation) =>
      prev +
      operation
        .match(/\d{1,3}/g)!
        .map(Number)
        .reduce((n0, n1) => n0 * n1, 1),
    0,
  );
};

run({
  part1: {
    tests: [
      {
        input: exampleInput,
        expected: 161,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
        expected: 48,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
