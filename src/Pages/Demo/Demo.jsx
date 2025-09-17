import React, { useState, useRef } from "react";
import "./Demo.css";
import demovideo from "../../assets/Demo-video.mp4";

const Demo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null); // reference for the video element

  const handleVideoPlay = () => {
    setIsPlaying(true);
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
  };

  const handleOverlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();  // actually play the video
    }
  };

  return (
    <div className="demo-page">
        
      <div className="demo-container">
        <div className="demo-header">
            
          <h1 className="demo-title">See How Our App Works</h1>
          <p className="demo-subtitle">
            Watch the demo video to explore all the features and capabilities
          </p>
        </div>

        <div className="video-wrapper">
          <div className="video-container">
            <video
              ref={videoRef}
              controls
              className="demo-video"
              onPlay={handleVideoPlay}
              onPause={handleVideoPause}
              poster="/demo-thumbnail.jpg"
            >
              <source src={demovideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {!isPlaying && (
              <div className="video-overlay" onClick={handleOverlayClick}>
                <div className="play-button">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="demo-features">
          <div className="feature-item1">
            <div className="feature-icon">📱</div>
            <h3>Mobile Responsive</h3>
            <p>Works perfectly on all devices</p>
          </div>
          <div className="feature-item1">
            <div className="feature-icon">⚡</div>
            <h3>Fast Performance</h3>
            <p>Optimized for speed and efficiency</p>
          </div>
          <div className="feature-item1">
            <div className="feature-icon">🎨</div>
            <h3>Beautiful Design</h3>
            <p>Modern and intuitive interface</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
