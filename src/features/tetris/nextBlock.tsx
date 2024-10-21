import { TETROMINO } from "../../common/constants";

export default function NextBlockAndScore({
  nextBlockList,
  score,
}: {
  nextBlockList: number[];
  score: number;
}) {
  function imgSrc(shape: number) {
    if (shape === -1) return "";

    let src: string = "/tetris/";
    if (shape === TETROMINO.INDIA) src += "purple_I.png";
    else if (shape === TETROMINO.JULIETT) src += "pink_J.png";
    else if (shape === TETROMINO.LIMA) src += "green_L.png";
    else if (shape === TETROMINO.OSCAR) src += "red_O.png";
    else if (shape === TETROMINO.SIERRA) src += "yellow_S.png";
    else if (shape === TETROMINO.TANGO) src += "blue_T.png";
    else if (shape === TETROMINO.ZULU) src += "cyan_Z.png";

    return src;
  }

  return (
    <div className="flex flex-col border-4 border-cyan-400 border-l-0 bg-cyan-400 w-48 h-fit">
      <span className="font-bold text-center">NEXT</span>

      <div className="bg-black w-full min-h-[450px] flex flex-col gap-2 py-2">
        {nextBlockList
          .filter((_, idx) => idx < 5)
          .map((block, idx) => (
            <div key={idx} className="h-20 flex items-center justify-center">
              <img src={imgSrc(block)} />
            </div>
          ))}
      </div>

      <span className="font-bold text-center">SCORE</span>

      <div className="bg-black w-full h-full p-3">
        <span className="text-yellow-300">{score}</span>
      </div>
    </div>
  );
}
