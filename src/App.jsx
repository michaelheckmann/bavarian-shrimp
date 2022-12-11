import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import "./App.css";
import { Shrimp } from "./components/Shrimp/Shrimp";
import { Textbox } from "./components/Textbox/Textbox";

import music from "./assets/music.mp3";

const COLS = 3;

function App() {
  const audio = new Audio(music);

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
    await introBoxControls.start({
      rotate: 720,
      scale: 0,
      boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)",
      transition: { duration: 1, delay: 5 },
    });
    setShowIntroBox(false);
    setShowJumpingShrimp(true);
    audio.play();
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
      transition: { duration: 1, type: "tween", ease: "easeInOut" },
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
    await paradingShrimpControls.start({
      rotate: 360,
      transition: {
        duration: 2,
        type: "tween",
        ease: "easeInOut",
        repeat: 5,
        repeatType: "reverse",
      },
    });
    await paradingShrimpControls.start(({ i, isOddRow }) => ({
      translateX: isOddRow ? "-100vw" : "100vw",
      transition: { duration: 3, type: "spring", delay: isOddRow ? 1 : 0 },
    }));
    setShowParadingShrimp(false);
    setShowGiftBox(true);
  };

  useEffect(() => {
    showParadingShrimp && startParadingShrimpSequence();
  }, [showParadingShrimp]);

  /* GIFT BOX */
  const startGiftBoxSequence = async () => {
    await giftBoxControls.start({
      translateY: 0,
      transition: { duration: 2, type: "spring", bounce: 0.6 },
    });
  };

  useEffect(() => {
    showGiftBox && startGiftBoxSequence();
  }, [showGiftBox]);

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
        >
          <Textbox>
            Das Wichtigste zuerst: Dreh die Lautstärke auf,
            <br />
            um das volle Erlebnis zu genießen! 🔊
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
            display: "grid",
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          }}
        >
          {Array(12)
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

// Shrimps
{
  /* <div
  style={{
    display: "grid",
    gridTemplateColumns: `repeat(${COLS}, 1fr)`,
  }}
>
  {Array(18)
    .fill(true)
    .map((_, i) => {
      return <Shrimp key={i} i={i} reverse={(i + 1) % COLS == 0} />;
    })}
</div>; */
}
