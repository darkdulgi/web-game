const path = "/minesweeper/";

export default function getMinesweeperPreloadList() {
  let srcList = ["closed.svg", "flag.svg", "mine_red.svg", "mine.svg"];
  for (let i = 0; i <= 8; i++) {
    srcList = [...srcList, `type${i}.svg`];
  }
  return srcList.map((src) => path + src);
}
