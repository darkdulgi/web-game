export default function Logo() {
  return (
    <div
      onClick={() => window.location.reload()}
      className="z-20 flex text-4xl xl:text-7xl font-bold cursor-pointer"
    >
      <span className="text-red-500">T</span>
      <span className="text-orange-500">E</span>
      <span className="text-yellow-400">T</span>
      <span className="text-green-500">R</span>
      <span className="text-sky-400">I</span>
      <span className="text-purple-600">S</span>
    </div>
  );
}
