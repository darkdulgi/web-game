import { Link } from "react-router-dom";

interface GameProps {
  name: string;
  link: string;
}

export default function Game({ name, link }: GameProps) {
  return (
    <Link to={link}>
      <div className="bg-neutral-700 text-white w-60 h-40 rounded-xl flex justify-center items-center">
        {name}
      </div>
    </Link>
  );
}
