import "./DuelGame.css";
import Hero from "../../entities/Hero";

import { useEffect, useRef, useState } from "react";

const DuelGame = () => {
  const canvasRef = useRef();
  const [hero1Settings, setHero1Settings] = useState({
    speed: 2,
    spells: 1000,
    color: "red",
  });

  const [hero2Settings, setHero2Settings] = useState({
    speed: 3,
    spells: 1000,
    color: "blue",
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const hero1 = new Hero(
      context,
      100,
      canvas.height / 2,
      hero1Settings.color,
      hero1Settings
    );
    const hero2 = new Hero(
      context,
      canvas.width - 50,
      canvas.height / 2,
      hero2Settings.color,
      hero2Settings
    );

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      hero1.checkMouseCollision(mousePosition);
      hero2.checkMouseCollision(mousePosition);
      hero1.update();
      hero2.update();
      hero1.draw();
      hero2.draw();
      requestAnimationFrame(animate);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animate);
    };
  }, [hero1Settings, hero2Settings, mousePosition]);

  return (
    <canvas ref={canvasRef} width={800} height={400} className="playground" />
  );
};

export default DuelGame;
