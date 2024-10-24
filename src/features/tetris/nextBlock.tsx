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
    <div className="flex flex-col border-2 xl:border-4 border-cyan-400 border-l-0 xl:border-l-0 bg-cyan-400 h-fit">
      <span className="text-xs xl:text-base font-bold text-center">NEXT</span>

      <div className="bg-black flex flex-col justify-center items-center gap-4 xl:gap-6 h-64 xl:h-[380px] w-20 xl:w-40">
        {nextBlockList
          .filter((_, idx) => idx < 5)
          .map((block, idx) => (
            <img key={idx} src={imgSrc(block)} className="h-8 xl:h-12" />
          ))}
      </div>

      <span className="text-xs xl:text-base font-bold text-center">SCORE</span>

      <div className="bg-black p-1 xl:p-3">
        <span className="text-yellow-300">{score}</span>
      </div>
    </div>
  );
}
