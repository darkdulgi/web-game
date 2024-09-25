interface DifficultyType {
  name: string;
  row: number;
  column: number;
  mine: number;
}

const difficultyList: DifficultyType[] = [
  {
    name: "초급",
    row: 9,
    column: 9,
    mine: 10,
  },
  {
    name: "중급",
    row: 16,
    column: 16,
    mine: 40,
  },
  {
    name: "고급",
    row: 16,
    column: 30,
    mine: 99,
  },
];

export default difficultyList;
