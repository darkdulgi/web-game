export default function shuffleList<T>(list: T[]) {
  // 배열의 길이만큼 순회를 하면서 뒤에서부터 하나씩 스왑
  for (let i = list.length - 1; i > 0; i--) {
    // 0부터 i 사이의 랜덤한 인덱스를 선택
    const j = Math.floor(Math.random() * (i + 1));

    // 배열의 i번째 요소와 j번째 요소를 스왑
    [list[i], list[j]] = [list[j], list[i]];
  }
}
