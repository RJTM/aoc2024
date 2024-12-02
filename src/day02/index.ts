import run from "aocrunner";
import { removeElementAt } from "../utils/index.js";

const exampleInput = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

function isSafe(report: number[]) {
  const levelResult = report.reduce(
    (prev, n, index) => {
      if (index === report.length - 1) {
        return prev;
      }

      if (prev == "fail") {
        return "fail";
      }

      const difference = n - report[index + 1];

      if (prev === "decreasing" && difference < 0) return "fail";
      if (prev === "increasing" && difference > 0) return "fail";
      if (Math.abs(difference) > 3 || difference === 0) return "fail";

      if (difference < 0) return "increasing";
      return "decreasing";
    },
    "start" as "increasing" | "decreasing" | "fail" | "start",
  ) satisfies "increasing" | "decreasing" | "fail" | "start";

  return ["increasing", "decreasing"].includes(levelResult);
}

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((line) => line.split(" ").map(Number));

const part1 = (rawInput: string) => {
  const reports = parseInput(rawInput);

  return reports.filter(isSafe).length;
};

const part2 = (rawInput: string) => {
  const reports = parseInput(rawInput);

  return reports.filter((report) => {
    if (isSafe(report)) return true;

    for (let i = 0; i < report.length; i++) {
      const newReport = removeElementAt(report, i);

      if (isSafe(newReport)) return true;
    }

    return false;
  }).length;
};

run({
  part1: {
    tests: [
      {
        input: exampleInput,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: exampleInput,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
