import { observer } from "mobx-react-lite";
import "./DuelGame.css";
import Hero from "../../entities/Hero";
import { useEffect, useRef } from "react";
import heroStore from "../../store/HeroStore";

const DuelGame = observer(() => {
  const canvasRef = useRef();
  const leftHeroRef = useRef();
  const rightHeroRef = useRef();

  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    leftHeroRef.current = new Hero(
      context,
      50,
      canvas.height / 2,
      heroStore.heroSettings.left
    );

    rightHeroRef.current = new Hero(
      context,
      canvas.width - 50,
      canvas.height / 2,
      heroStore.heroSettings.right
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

      leftHeroRef.current.checkMouseCollision(mousePosition.current);
      rightHeroRef.current.checkMouseCollision(mousePosition.current);
      leftHeroRef.current.update(rightHeroRef.current);
      rightHeroRef.current.update(leftHeroRef.current);
      leftHeroRef.current.draw();
      rightHeroRef.current.draw();

      leftHeroRef.current.checkSpellsCollision(rightHeroRef.current);
      rightHeroRef.current.checkSpellsCollision(leftHeroRef.current);

      requestAnimationFrame(animate);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (leftHeroRef.current) {
      leftHeroRef.current.updateSettings(heroStore.heroSettings.left);
    }
    if (rightHeroRef.current) {
      rightHeroRef.current.updateSettings(heroStore.heroSettings.right);
    }
  }, [
    heroStore.heroSettings.left.heroSpeed,
    heroStore.heroSettings.left.fireRate,
    heroStore.heroSettings.right.heroSpeed,
    heroStore.heroSettings.right.fireRate,
  ]);

  return (
    <canvas ref={canvasRef} width={800} height={400} className="playground" />
  );
});

export default DuelGame;
