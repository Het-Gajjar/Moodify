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
      <h1 className="heading-title" style={{ marginTop: 0 }}>Moodify</h1>
      
      <div className="glass-panel" style={{ maxWidth: "800px", marginBottom: "2rem" }}>
        <FaceEmotion onCapture={handleCapture} />
      </div>

      <h2 className="heading-subtitle">Now Playing</h2>

      <div style={{ width: "100%", maxWidth: "500px" }}>
        <Player
          title={song?.[0]?.title || "No song selected"}
          src={song?.[0]?.songurl || ""}
        />
      </div>
      {/* {console.log(song?.[0]?.title )} */}
    </div>
  );
};
