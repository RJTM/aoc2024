import run from "aocrunner";

const exampleInput = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((l) => l.split(""));

const part1 = (rawInput: string) => {
  const matrix = parseInput(rawInput);
  let xmasFindings = 0;

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (j <= matrix[0].length - 4) {
        const testString = `${matrix[i][j]}${matrix[i][j + 1]}${matrix[i][j + 2]}${matrix[i][j + 3]}`;
        if (testString === "XMAS" || testString === "SAMX") {
          xmasFindings++;
        }
      }

      if (i <= matrix.length - 4) {
        const testString = `${matrix[i][j]}${matrix[i + 1][j]}${matrix[i + 2][j]}${matrix[i + 3][j]}`;
        if (testString === "XMAS" || testString === "SAMX") {
          xmasFindings++;
        }
      }

      if (j <= matrix[0].length - 4 && i <= matrix.length - 4) {
        const testString = `${matrix[i][j]}${matrix[i + 1][j + 1]}${matrix[i + 2][j + 2]}${matrix[i + 3][j + 3]}`;
        if (testString === "XMAS" || testString === "SAMX") {
          xmasFindings++;
        }
      }

      if (j >= 3 && i <= matrix.length - 4) {
        const testString = `${matrix[i][j]}${matrix[i + 1][j - 1]}${matrix[i + 2][j - 2]}${matrix[i + 3][j - 3]}`;
        if (testString === "XMAS" || testString === "SAMX") {
          xmasFindings++;
        }
      }
    }
  }

  return xmasFindings;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: exampleInput,
        expected: 18,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: exampleInput,
        expected: 9,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
