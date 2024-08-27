import "./DuelGame.css";
import Hero from "../../entities/Hero";
import { useEffect, useRef, useState } from "react";

const DuelGame = () => {
  const canvasRef = useRef();
  const hero1Ref = useRef();
  const hero2Ref = useRef();
  const [hero1Settings, setHero1Settings] = useState({
    speed: 0.5,
    spells: 500,
    color: "red",
  });

  const [hero2Settings, setHero2Settings] = useState({
    speed: 0.5,
    spells: 500,
    color: "blue",
  });

  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    hero1Ref.current = new Hero(
      context,
      50,
      canvas.height / 2,
      hero1Settings.color,
      hero1Settings
    );
    hero2Ref.current = new Hero(
      context,
      canvas.width - 50,
      canvas.height / 2,
      hero2Settings.color,
      hero2Settings
    );

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mousePosition.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      hero1Ref.current.checkMouseCollision(mousePosition.current);
      hero2Ref.current.checkMouseCollision(mousePosition.current);
      hero1Ref.current.update(hero2Ref.current);
      hero2Ref.current.update(hero1Ref.current);
      hero1Ref.current.draw();
      hero2Ref.current.draw();

      hero1Ref.current.checkSpellsCollision(hero2Ref.current);
      hero2Ref.current.checkSpellsCollision(hero1Ref.current);

      requestAnimationFrame(animate);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (hero1Ref.current) {
      hero1Ref.current.updateSettings(hero1Settings);
    }
    if (hero2Ref.current) {
      hero2Ref.current.updateSettings(hero2Settings);
    }
  }, [hero1Settings, hero2Settings]);

  return (
    <canvas ref={canvasRef} width={800} height={400} className="playground" />
  );
};

export default DuelGame;
