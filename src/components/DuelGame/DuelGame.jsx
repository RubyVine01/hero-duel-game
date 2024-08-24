import "./DuelGame.css";
import { useEffect, useRef } from "react";

const DuelGame = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
  }, []);

  return (
    <canvas ref={canvasRef} width={800} height={400} className="playground" />
  );
};

export default DuelGame;
