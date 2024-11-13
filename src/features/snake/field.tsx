import { SNAKE_APPLE } from "../../common/constants";

export default function Field({ field, score }: { field: number[][]; score: number }) {
  function color(box: number) {
    if (box === 0) return "bg-white";
    if (box > 0) return "bg-black";
    if (box === SNAKE_APPLE) return "bg-red-600";
  }

  return (
    <div className="flex flex-col items-center">
      <span className="text-white">{score}</span>

      <div className="flex flex-col">
        {field.map((row, xIndex) => (
          <div key={xIndex} className="flex">
            {row.map((box, yIndex) => (
              <div key={yIndex} className={`w-6 h-6 ${color(box)}`}></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
