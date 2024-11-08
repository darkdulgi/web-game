export default function Field({ field, score }: { field: number[][]; score: number }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-white">{score}</span>

      <div className="flex flex-col">
        {field.map((row, xIndex) => (
          <div key={xIndex} className="flex">
            {row.map((box, yIndex) => (
              <div key={yIndex} className={`w-6 h-6 ${box > 0 ? "bg-red-600" : "bg-white"}`}></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
