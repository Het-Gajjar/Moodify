import React, { useEffect, useRef, useState } from "react";
import "../../../style/Player.css";

const formatTime = (seconds) => {
  if (Number.isNaN(seconds) || seconds === Infinity) return "00:00";
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

const Player = ({ src, title = "Track" }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      setCurrentTime(audio.currentTime || 0);
    };

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const onEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, [src]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.playbackRate = playbackRate;
  }, [playbackRate]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => {
        // play() can fail if the user hasn't interacted with the page
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  };

  const seek = (seconds) => {
    const audio = audioRef.current;
    if (!audio) return;

    const nextTime = Math.min(Math.max(0, audio.currentTime + seconds), duration);
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const onChangeSpeed = (event) => {
    const value = Number(event.target.value);
    setPlaybackRate(value);
  };

  const onSeekChange = (event) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = Number(event.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div className="glass-panel" style={{ padding: "1.5rem" }}>
      <div style={{ marginBottom: "1.5rem", textAlign: "center" }}>
        <h3 style={{ margin: 0, fontSize: "1.25rem", color: "var(--secondary)" }}>
          {title}
        </h3>
      </div>

      <audio ref={audioRef} src={src} preload="metadata" />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1.5rem" }}>
        <button type="button" className="btn-icon" onClick={() => seek(-5)} title="Rewind 5 seconds">
          ⏪
        </button>
        <button type="button" className="btn-primary" onClick={togglePlay} style={{ minWidth: "100px" }}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button type="button" className="btn-icon" onClick={() => seek(5)} title="Forward 5 seconds">
          ⏩
        </button>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
        <span style={{ fontVariantNumeric: "tabular-nums", minWidth: "48px", fontSize: "0.9rem", color: "var(--text-muted)" }}>
          {formatTime(currentTime)}
        </span>
        <input
          type="range"
          className="custom-slider"
          min={0}
          max={duration || 0}
          value={currentTime}
          onChange={onSeekChange}
        />
        <span style={{ fontVariantNumeric: "tabular-nums", minWidth: "48px", fontSize: "0.9rem", color: "var(--text-muted)", textAlign: "right" }}>
          {formatTime(duration)}
        </span>
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <label style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
          Speed:
          <select value={playbackRate} onChange={onChangeSpeed} className="custom-select" style={{ marginLeft: "0.5rem" }}>
            {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
              <option key={rate} value={rate}>
                {rate}x
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

export default Player;
