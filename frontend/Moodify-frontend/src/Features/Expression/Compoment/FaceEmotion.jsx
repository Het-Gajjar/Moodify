import React, { useEffect, useRef, useState } from "react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

const FaceEmotion = () => {
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

        if (smile > 0.8) detectedEmotion = "Happy 😊";
        else if (mouthOpen > 0.6 && browRaise > 0.6)
          detectedEmotion = "Surprised 😲";
        else if (sad > 0.05) detectedEmotion = "Sad 😢";

        setLiveEmotion(detectedEmotion);
      }
    }

    requestAnimationFrame(detectEmotion);
  };

  const captureEmotion = () => {
    setCapturedEmotion(liveEmotion);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Face Emotion Detection</h2>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        width="640"
        height="480"
        style={{ borderRadius: "10px" }}
      />

      <br /><br />

      <button onClick={captureEmotion}>Capture</button>

      <h3>Live Emotion: {liveEmotion}</h3>

      <h1>Captured Emotion: {capturedEmotion}</h1>
    </div>
  );
};

export default FaceEmotion;