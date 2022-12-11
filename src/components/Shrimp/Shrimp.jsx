import { useMemo } from "react";
import { COLS } from "../../App";
import hat from "../../assets/hat.png";
import shrimp from "../../assets/shrimp.png";
import useWindowDimensions from "../../utils/useWindowDimensions";

export function Shrimp({ reverse, i }) {
  const { width } = useWindowDimensions();
  const WIDTH = useMemo(() => Math.min(width / COLS, 200), [width]);

  return (
    <div
      style={{
        position: "relative",
        width: WIDTH,
        height: WIDTH,
      }}
    >
      <img
        src={shrimp}
        alt="shrimp"
        style={{
          position: "absolute",
          top: WIDTH * 0.3,
          left: 0,
          width: WIDTH,
          transform: `scaleX(${reverse ? -1 : 1})`,
        }}
      />
      <img
        src={hat}
        alt="hat"
        style={{
          position: "absolute",
          top: 0,
          left: WIDTH * (reverse ? 0.1 : 0.4),
          width: WIDTH * 0.5,
          transform: `rotate(${reverse ? 15 : -15}deg) scaleX(${
            reverse ? 1 : -1
          })`,
        }}
      />
    </div>
  );
}
