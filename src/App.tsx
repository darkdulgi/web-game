import { useEffect } from "react";
import useMouseStore from "./common/store/mouseStore";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import router from "./router";

export default function App() {
  const setMouseState = useMouseStore((state) => state.setMouseState);

  useEffect(() => {
    function handleMouseDown() {
      setMouseState(true);
    }
    function handleMouseUp() {
      setMouseState(false);
    }
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return <RouterProvider router={createBrowserRouter(router)} />;
}
