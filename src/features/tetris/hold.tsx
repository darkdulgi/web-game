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
    <div className="flex flex-col bg-cyan-400 outline outline-4 outline-cyan-400 w-40 h-fit">
      <span className="font-bold">HOLD</span>
      <div className="flex justify-center items-center w-full h-24 bg-black">
        <img
          className={`${shape === -1 ? "hidden" : !isPossible && "grayscale brightness-75"}`}
          src={imgSrc()}
          alt="Hold"
        />
      </div>
    </div>
  );
}
