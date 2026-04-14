import React from "react";
import FaceEmotion from "../../Expression/Compoment/FaceEmotion";
import Player from "../componant/player";
import { useSong } from "../hooks/useSong";
import "../../../style/Home.css";

export const Home = () => {
  const { song, handlesong } = useSong();

  const handleCapture = (emotion) => {
    const mood = emotion.split(" ")[0].toLowerCase();
    console.log("Captured Mood:", mood);
    handlesong(mood);
  };

  return (
    <div className="app-container">
      <h1 className="heading-title">Moodify</h1>

      <div className="home-row">
        <div className="glass-panel home-panel">
          <h2 className="section-title">Camera Capture</h2>
          <FaceEmotion onCapture={handleCapture} />
        </div>

        <div className="glass-panel home-panel">
          <h2 className="section-title">Now Playing</h2>
          <div className="player-wrapper">
            <Player
              title={song?.[0]?.title || "No song selected"}
              src={song?.[0]?.songurl || ""}
              image={song?.[0]?.posterurl}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
