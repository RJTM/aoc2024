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

function getAllMatrixLines(matrix: string[][]): string[] {
  const horizontal = matrix.map((horizontalLine) => horizontalLine.join(""));
  const verticalMatrix = Array(matrix[0].length)
    .fill([])
    .map((_) => [] as string[]);
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      verticalMatrix[x][y] = matrix[y][x];
    }
  }

  const vertical = verticalMatrix.map((verticalLine) => verticalLine.join(""));

  const diagonalLR = [] as string[];
  const diagonalRL = [] as string[];

  for (let row = 0; row < matrix.length; row++) {
    const rowLineLR: string[] = [];
    const rowLineRL: string[] = [];
    for (
      let x = 0, y = row;
      x < matrix[0].length && y < matrix.length;
      x++, y++
    ) {
      rowLineLR.push(matrix[y][x]);
      rowLineRL.push(matrix[matrix.length - y - 1][matrix[0].length - x - 1]);
    }

    diagonalLR.push(rowLineLR.join(""));
    diagonalRL.push(rowLineRL.join(""));
  }

  for (let column = 1; column < matrix.length; column++) {
    const columnLineLR: string[] = [];
    const columnLineRL: string[] = [];
    for (
      let x = column, y = 0;
      x < matrix[0].length && y < matrix.length;
      x++, y++
    ) {
      columnLineLR.push(matrix[y][x]);
      columnLineRL.push(
        matrix[matrix.length - y - 1][matrix[0].length - x - 1],
      );
    }

    diagonalLR.push(columnLineLR.join(""));
    diagonalRL.push(columnLineRL.join(""));
  }

  return [...horizontal, ...vertical, ...diagonalLR, ...diagonalRL];
}

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((l) => l.split(""));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const lines = getAllMatrixLines(input);

  console.log(lines);

  return lines.reduce(
    (prev, line) =>
      prev +
      (line.match(/xmas/gi) ?? []).length +
      (line.match(/samx/gi) ?? []).length,
    0,
  );
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
        expected: "",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
