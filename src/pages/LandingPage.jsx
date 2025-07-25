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

  // Load font
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  // Matrix Rain effect
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const letters = 'アァイィウヴエエェオカガキギクグケゲコゴサザABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const fontSize = 14;
    let columns = Math.floor(window.innerWidth / fontSize);
    let drops = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00FF41';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }

      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Text decoding animation
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
