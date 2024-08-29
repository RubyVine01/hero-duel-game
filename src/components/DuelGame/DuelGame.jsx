import { observer } from "mobx-react-lite";
import "./DuelGame.css";
import Hero from "../../entities/Hero";
import { useEffect, useRef, useState } from "react";
import heroStore from "../../store/HeroStore";
import HeroPopupMenu from "../HeroPopupMenu/HeroPopupMenu";

const DuelGame = observer(() => {
  const canvasRef = useRef();
  const leftHeroRef = useRef();
  const rightHeroRef = useRef();

  const mousePosition = useRef({ x: 0, y: 0 });

  const [popupState, setPopupState] = useState({
    isVisible: false,
    heroSide: null,
  });

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
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      mousePosition.current = { x: mouseX, y: mouseY };
    };

    const handleMouseClick = () => {
      if (leftHeroRef.current.checkMouseCollision(mousePosition.current)) {
        setPopupState({ isVisible: true, heroSide: "left" });
      } else if (
        rightHeroRef.current.checkMouseCollision(mousePosition.current)
      ) {
        setPopupState({ isVisible: true, heroSide: "right" });
      }
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
    canvas.addEventListener("click", handleMouseClick);
    canvas.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleMouseClick);
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

  const handleClosePopup = () => {
    setPopupState({ isVisible: false, heroSide: null });
  };

  return (
    <>
      <canvas ref={canvasRef} width={800} height={400} className="playground" />
      {popupState.isVisible && (
        <HeroPopupMenu
          heroSide={popupState.heroSide}
          onClose={handleClosePopup}
        />
      )}
    </>
  );
});

export default DuelGame;
