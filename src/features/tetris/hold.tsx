import { TETROMINO } from "../../common/constants";

export default function Hold({ holding }: { holding: number[] }) {
  const [shape, isPossible] = holding;

  function imgSrc() {
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
    <div className="flex flex-col justify-between">
      <div className="flex flex-col bg-cyan-400 border-2 xl:border-4 border-cyan-400 border-r-0 xl:border-r-0">
        <span className="font-bold text-xs xl:text-base text-center">HOLD</span>

        <div className="flex justify-center items-center bg-black h-14 w-20 xl:h-24 xl:w-full">
          <img
            className={`${shape === -1 ? "hidden" : !isPossible && "grayscale brightness-75"} h-8 xl:h-16`}
            src={imgSrc()}
            alt="Hold"
          />
        </div>
      </div>

      <div className="hidden xl:flex flex-col text-white gap-1 pr-3 ">
        <span>←→ : 좌우이동</span>
        <span>Shift, C : 홀드</span>
        <span>↓ : 소프트 드롭</span>
        <span>Space : 하드 드롭</span>
        <span>↑, X : 시계방향 회전</span>
        <span>Ctrl, Z : 반시계방향 회전</span>
      </div>
    </div>
  );
}
