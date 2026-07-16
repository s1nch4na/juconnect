import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const canvasRef = useRef(null);
  const [decodedText, setDecodedText] = useState('');
  const frame = useRef(0);
  const navigate = useNavigate();

  const textToDecode = "JUConnect";
  const duration = 1500;
  const fps = 60;
  const interval = 1000 / fps;
  const totalFrames = Math.floor(duration / interval);
  const CHARS = '!<>-_\\/[]{}—=+*^?#________';

  const bubbles = [
  { text: "💬 Anyone has DBMS notes?", top: "8%", left: "6%" },
  { text: "💬 Looking for hackathon teammates!", top: "18%", right: "8%" },
  { text: "💬 Free pizza near Block C 🍕", top: "28%", left: "3%" },
  { text: "💬 Is today's OS class cancelled?", top: "38%", right: "6%" },
  { text: "💬 Who's joining ACM?", top: "48%", left: "10%" },
  { text: "💬 Need React project partner.", top: "58%", right: "12%" },
  { text: "💬 Lost my ID card 😭", top: "72%", left: "7%" },
  { text: "💬 Anyone from Section B?", top: "84%", right: "10%" },
  { text: "💬 Placement tips please 🥲", top: "12%", left: "70%" },
  { text: "💬 Canteen is packed today.", top: "82%", left: "60%" },
  { text: "💬 Leetcode contest tonight!", top: "65%", right: "30%" },
  { text: "💬 Midsem syllabus?", top: "22%", left: "55%" },
];

  
  useEffect(() => {
  const link = document.createElement("link");
  link.href =
    "https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap";
  link.rel = "stylesheet";
  document.head.appendChild(link);

  const style = document.createElement("style");

  style.innerHTML = `
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
  `;

  document.head.appendChild(style);

  return () => {
    document.head.removeChild(link);
    document.head.removeChild(style);
  };
  }, []);


  
  useEffect(() => {
    const update = () => {
      const progress = frame.current / totalFrames;
      let output = '';

      for (let i = 0; i < textToDecode.length; i++) {
        if (progress > i / textToDecode.length) {
          output += textToDecode[i];
        } else {
          output += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      setDecodedText(output);
      frame.current++;

      if (frame.current < totalFrames) {
        requestAnimationFrame(update);
      } else {
        setDecodedText(textToDecode);
      }
    };

    update();
  }, []);

  return (
    <div style={{
      position: 'relative',
      height: '100vh',
      backgroundColor: 'black',
      overflow: 'hidden'
    }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -1,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />

      {bubbles.map((bubble, index) => (
  <div
    key={index}
    style={{
      position: "absolute",
      top: bubble.top,
      left: bubble.left,
      right: bubble.right,
      background: "rgba(40,40,40,.9)",
      color: "#fff",
      padding: "10px 18px",
      borderRadius: "999px",
      fontSize: "13px",
      fontFamily: "Arial",
      opacity: 0.8,
      animation: `float ${5 + (index % 3)}s ease-in-out infinite`,
      animationDelay: `${index * 0.4}s`,
      border: "1px solid rgba(255,255,255,.08)",
      boxShadow: "0 8px 20px rgba(0,0,0,.3)",
      pointerEvents: "none",
      whiteSpace: "nowrap",
    }}
    >
    {bubble.text}
    </div>
    ))}

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        color: 'white',
        fontFamily: "'Press Start 2P', monospace",
        zIndex: 2,
        textAlign: 'center',
      }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{decodedText}</h1>

        <p style={{ fontSize: '0.8rem', marginBottom: '2rem', color: '#aaa' }}>
          Where your campus conversations come alive.
        </p>

        <div style={{ display: 'flex', gap: '20px' }}>
          <button
            onClick={() => navigate('/login')}
            style={{
              background: 'transparent',
              border: '2px solid white',
              color: 'white',
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '0.7rem',
              padding: '10px 20px',
              cursor: 'pointer',
              transition: '0.3s',
            }}
            onMouseOver={e => e.target.style.backgroundColor = 'white'}
            onMouseOut={e => e.target.style.backgroundColor = 'transparent'}
          >
            Login
          </button>

          <button
            onClick={() => navigate('/signup')}
            style={{
              background: 'white',
              border: '2px solid white',
              color: 'black',
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '0.7rem',
              padding: '10px 20px',
              cursor: 'pointer',
              transition: '0.3s',
            }}
            onMouseOver={e => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = 'white';
            }}
            onMouseOut={e => {
              e.target.style.backgroundColor = 'white';
              e.target.style.color = 'black';
            }}
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
