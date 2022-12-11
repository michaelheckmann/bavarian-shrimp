import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { Shrimp } from "./components/Shrimp/Shrimp";
import { Textbox } from "./components/Textbox/Textbox";
import useWindowDimensions from "./utils/useWindowDimensions";

import music from "./assets/music.mp3";
const audio = new Audio(music);

export const COLS = 3;
export const ROWS = 4;

function App() {
  const { width, height: HEIGHT } = useWindowDimensions();
  const WIDTH = useMemo(() => Math.min(width / COLS, 200), [width]);

  const [permissionGiven, setPermissionGiven] = useState(false);

  const jumpingShrimpControls = useAnimationControls();
  const [showJumpingShrimp, setShowJumpingShrimp] = useState(false);

  const introBoxControls = useAnimationControls();
  const [showIntroBox, setShowIntroBox] = useState(false);

  const paradingShrimpControls = useAnimationControls();
  const [showParadingShrimp, setShowParadingShrimp] = useState(false);

  const giftBoxControls = useAnimationControls();
  const [showGiftBox, setShowGiftBox] = useState(false);

  /* INTRO BOX */
  const startIntroBoxSequence = async () => {
    await introBoxControls.start({
      translateY: 0,
      transition: { duration: 1, type: "spring" },
    });
  };

  useEffect(() => {
    showIntroBox && startIntroBoxSequence();
  }, [showIntroBox]);

  /* JUMPING SHRIMP */
  const startJumpingShrimpSequence = async () => {
    await jumpingShrimpControls.start({
      translateY: 0,
      rotate: 360,
      transition: { duration: 1, type: "spring" },
    });
    await jumpingShrimpControls.start({
      rotate: 180,
      scale: 2,
      transition: { duration: 2, type: "tween", ease: "easeInOut" },
    });
    await jumpingShrimpControls.start({
      translateY: "100vh",
      scale: 0,
      rotate: 0,
      transition: { duration: 1 },
    });
    setShowJumpingShrimp(false);
    setShowParadingShrimp(true);
  };

  useEffect(() => {
    showJumpingShrimp && startJumpingShrimpSequence();
  }, [showJumpingShrimp]);

  /* JUMPING SHRIMP */
  const startParadingShrimpSequence = async () => {
    await paradingShrimpControls.start(({ i, isOddRow }) => ({
      translateX: isOddRow ? "-100vw" : "100vw",
      transition: { duration: 3, type: "spring", delay: isOddRow ? 1 : 0 },
    }));
    await paradingShrimpControls.start({
      translateX: 0,
      transition: { duration: 1, type: "spring" },
    });
    await paradingShrimpControls.start(({ i }) => ({
      scaleX: -1,
      translateY: [0, -50, 0],
      transformY: 0,
      transition: {
        duration: 0.5,
        type: "tween",
        ease: "easeInOut",
        delay: i * 0.1,
      },
    }));
    await paradingShrimpControls.start({
      rotate: 360,
      transition: {
        duration: 2,
        type: "tween",
        ease: "easeInOut",
        repeat: 2,
        repeatType: "reverse",
      },
    });
    await paradingShrimpControls.start(({ i, isOddRow }) => ({
      translateX: isOddRow ? "-100vw" : "100vw",
      transition: { duration: 3, type: "spring", delay: isOddRow ? 1 : 0 },
    }));
    setShowGiftBox(true);
    await paradingShrimpControls.start(({ i, isOddRow }) => ({
      translateX: [
        isOddRow ? "-100vw" : "100vw",
        isOddRow ? "100vw" : "-100vw",
      ],
      translateY: ["-100vh", "100vh"],
      transition: { duration: 3, type: "spring", delay: i * 0.2 },
    }));
    setShowParadingShrimp(false);
  };

  useEffect(() => {
    showParadingShrimp && startParadingShrimpSequence();
  }, [showParadingShrimp]);

  /* GIFT BOX */
  const startGiftBoxSequence = async () => {
    await giftBoxControls.start({
      translateY: 0,
      transition: { duration: 2, type: "spring", bounce: 0.3, delay: 1 },
    });
  };

  useEffect(() => {
    showGiftBox && startGiftBoxSequence();
  }, [showGiftBox]);

  const startAnimation = async () => {
    await introBoxControls.start({
      rotate: 720,
      scale: 0,
      boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)",
      transition: { duration: 1, delay: 5 },
    });
    setShowIntroBox(false);
    setShowJumpingShrimp(true);
  };

  useEffect(() => {
    permissionGiven && startAnimation();
  }, [permissionGiven]);

  useEffect(() => {
    setShowIntroBox(true);
  }, []);

  return (
    <div className="wrapper">
      {/* INTRO BOX */}
      {showIntroBox && (
        <motion.div
          animate={introBoxControls}
          initial={{
            translateY: "100vh",
          }}
          onClick={() => {
            if (!permissionGiven) {
              audio.play();
              setPermissionGiven(true);
            }
          }}
          whileTap={{ scale: permissionGiven ? 1 : 0.9 }}
          style={{
            cursor: permissionGiven ? "default" : "pointer",
            pointerEvents: permissionGiven ? "none" : "auto",
          }}
        >
          <Textbox
            style={{
              borderColor: permissionGiven ? "#16a34a" : "#292524",
            }}
          >
            Das Wichtigste zuerst:
            <br />
            Dreh die Lautstärke auf, um das volle Erlebnis zu genießen! 🔊
            <br />
            Tippe mich an, wenn du bereit bist!
          </Textbox>
        </motion.div>
      )}

      {/* JUMPING SHRIMP */}
      {showJumpingShrimp && (
        <motion.div
          animate={jumpingShrimpControls}
          initial={{
            translateY: "100vh",
          }}
        >
          <Shrimp />
        </motion.div>
      )}

      {/* PARADING SHRIMP */}
      {showParadingShrimp && (
        <div
          style={{
            position: "absolute",
            top: (HEIGHT - WIDTH * ROWS) / 2,
            left: (width - WIDTH * COLS) / 2,
            zIndex: 1,
            display: "grid",
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          }}
        >
          {Array(ROWS * COLS)
            .fill(true)
            .map((_, i) => {
              const isOddRow = i % (COLS * 2) >= COLS;
              return (
                <motion.div
                  key={i}
                  custom={{ i, isOddRow }}
                  animate={paradingShrimpControls}
                  initial={{
                    translateX: isOddRow ? "100vw" : "-100vw",
                  }}
                >
                  {/* Shrimp compnent where every second row is reversed */}
                  <Shrimp reverse={isOddRow} />
                </motion.div>
              );
            })}
        </div>
      )}

      {/* GIFT BOX */}
      {showGiftBox && (
        <motion.div
          animate={giftBoxControls}
          initial={{
            translateY: "-100vh",
          }}
        >
          <Textbox
            style={{
              textAlign: "left",
              lineHeight: "1.7",
            }}
          >
            {/* Add birthday emojis */}
            <p
              style={{
                color: "black",
                fontWeight: "bold",
              }}
            >
              Alles Gute zum Geburtstag! 🎁
            </p>
            <p>
              Wie du vielleicht schon ahnst, möchten wir zu deinem Ehrentag ein
              ganz besonderes Geschenk machen. Wir möchten dich, Jacqueline und
              die bayerische Garnele zu uns zum Abendessen einladen! 🎂🎉🎈
            </p>
            <p>Zeitpunkt ist flexibel ⏲️</p>
            <p>
              Hauptgang mit{" "}
              <span
                style={{
                  fontWeight: "bold",
                  backgroundColor: "#fbc67e",
                  background:
                    "linear-gradient(62deg, #fbc67e 0%, #ed6c47 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Krustentier
              </span>{" "}
              ist gesetzt 🦐
            </p>
            <p
              style={{
                letterSpacing: "0.2rem",
              }}
            >
              Happy Birthday! 🎉
            </p>
          </Textbox>
        </motion.div>
      )}
    </div>
  );
}

export default App;
