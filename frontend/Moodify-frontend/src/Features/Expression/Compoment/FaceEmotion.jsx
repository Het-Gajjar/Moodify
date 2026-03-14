import React, { useEffect, useRef, useState } from "react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import "../../../style/FaceEmotion.css";

const FaceEmotion = ({ onCapture }) => {
  const videoRef = useRef(null);

  const [liveEmotion, setLiveEmotion] = useState("Detecting...");
  const [capturedEmotion, setCapturedEmotion] = useState("");

  const landmarkerRef = useRef(null);
  let lastVideoTime = -1;

  useEffect(() => {
    setupFaceLandmarker();
  }, []);

  const setupFaceLandmarker = async () => {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
    );

    const faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task"
      },
      runningMode: "VIDEO",
      numFaces: 1,
      outputFaceBlendshapes: true
    });

    landmarkerRef.current = faceLandmarker;

    startCamera();
  };

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;

    videoRef.current.onloadeddata = () => {
      detectEmotion();
    };
  };

  const detectEmotion = () => {
    const video = videoRef.current;
    const landmarker = landmarkerRef.current;

    if (!landmarker) return;

    if (video.currentTime !== lastVideoTime) {
      lastVideoTime = video.currentTime;

      const results = landmarker.detectForVideo(video, Date.now());

      if (results.faceBlendshapes.length > 0) {
        const blendshapes = results.faceBlendshapes[0].categories;

        const getScore = (name) =>
          blendshapes.find((b) => b.categoryName === name)?.score || 0;

        const smile =
          getScore("mouthSmileLeft") + getScore("mouthSmileRight");

        const mouthOpen = getScore("jawOpen");

        const browRaise =
          getScore("browInnerUp") +
          getScore("browOuterUpLeft") +
          getScore("browOuterUpRight");

        const sad =
          getScore("mouthFrownLeft") + getScore("mouthFrownRight");

        let detectedEmotion = "Neutral";

        if (smile > 0.8) detectedEmotion = "happy";
        else if (mouthOpen > 0.6 && browRaise > 0.6)
          detectedEmotion = "surpised";
        else if (sad > 0.05) detectedEmotion = "Sad";

        setLiveEmotion(detectedEmotion);
      }
    }

    requestAnimationFrame(detectEmotion);
  };

  const captureEmotion = () => {
    setCapturedEmotion(liveEmotion);
    onCapture(liveEmotion);
  };

  return (
    <div style={{ textAlign: "center", width: "100%" }}>
      <h2 style={{ marginBottom: "1rem", color: "var(--text-main)", fontWeight: 500 }}>Detection Camera</h2>

      <div style={{ position: "relative", display: "inline-block", borderRadius: "10px", overflow: "hidden", border: "1px solid var(--surface-border)" }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          width="640"
          height="480"
          style={{ display: "block", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", bottom: "16px", left: "50%", transform: "translateX(-50%)", background: "rgba(255,255,255,0.8)", padding: "0.5rem 1rem", borderRadius: "20px", backdropFilter: "blur(4px)", border: "1px solid var(--surface-border)" }}>
          <span style={{ color: "var(--text-main)", fontWeight: 500 }}>Live: <span style={{ color: "var(--primary)" }}>{liveEmotion}</span></span>
        </div>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <button className="btn-primary" onClick={captureEmotion} style={{ fontSize: "1.1rem" }}>
          Capture Emotion
        </button>
      </div>

      {capturedEmotion && (
        <div style={{ marginTop: "1.5rem" }}>
          <h3 style={{ margin: 0, color: "var(--text-muted)", fontSize: "1rem" }}>Currently Captured</h3>
          <h1 style={{ margin: "0.5rem 0 0", color: "var(--primary)", textTransform: "capitalize", fontSize: "2rem" }}>{capturedEmotion}</h1>
        </div>
      )}
    </div>
  );
};

export default FaceEmotion;