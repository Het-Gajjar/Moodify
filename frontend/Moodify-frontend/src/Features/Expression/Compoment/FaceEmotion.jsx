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

        let detectedEmotion = "sad";

        if (smile > 1) detectedEmotion = "happy";
        else if (mouthOpen > 0.6 && browRaise > 0.6)
          detectedEmotion = "surpised";
        else if (sad > 0.01) detectedEmotion = "Sad";

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
    <div className="face-emotion-container">
      <h2 className="detection-title">Detection Camera</h2>

      <div className="camera-container">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="video-preview"
        />
        <div className="emotion-live-badge">
          <span className="badge-text">
            Live: <span className="emotion-name">{liveEmotion}</span>
          </span>
        </div>
      </div>

      <div className="action-area">
        <button className="btn-primary highlight" onClick={captureEmotion}>
          Capture Emotion
        </button>
      </div>

      {capturedEmotion && (
        <div className="captured-result">
          <h3 className="result-label">Currently Captured</h3>
          <h1 className="result-value">{capturedEmotion}</h1>
        </div>
      )}
    </div>
  );
};

export default FaceEmotion;