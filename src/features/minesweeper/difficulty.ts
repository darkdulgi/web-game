interface DifficultyType {
  name: string;
  row: number;
  column: number;
  mine: number;
}

const difficultyList: DifficultyType[] = [
  {
    name: "쉬움",
    row: 9,
    column: 9,
    mine: 10,
  },
  {
    name: "중간",
    row: 16,
    column: 16,
    mine: 40,
  },
  {
    name: "어려움",
    row: 16,
    column: 30,
    mine: 99,
  },
];

export default difficultyList;
