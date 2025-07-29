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

  
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
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
