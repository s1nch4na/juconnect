import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const greetings = [
  'Hello', 'Hola', 'Bonjour', 'Hallo', 'Ciao', 'Olá', 'Привет', 'नमस्ते', 'こんにちは', '안녕하세요', '你好', 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ',
  'வணக்கம்', 'నమస్కారం', 'ಹಲೋ', 'ഹലോ', 'سلام', 'مرحبا', 'ສະບາຍດີ', 'สวัสดี', 'हाय', 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ', 'നമസ്‌കാരം', 'హాయ్',
  'नमस्कार', 'शुभदिन', 'సుప్రభాతం', 'குட்மார்னிங்', 'శుభ సాయంత్రం', 'गुड इव्हनिंग', 'ಶುಭ ಸಂಜೆ'
];

const LandingPage = () => {
  const canvasRef = useRef(null);
  const [currentGreeting, setCurrentGreeting] = useState('');
  const [showJuConnect, setShowJuConnect] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  // MATRIX BACKGROUND
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const letters = 'アァイィウヴエエオカガキギクグケゲコゴサザABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00ff00';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        drops[i] = drops[i] * fontSize > canvas.height || Math.random() > 0.975 ? 0 : drops[i] + 1;
      }
    };

    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, []);

  // GREETING ROTATION EVERY 0.1 SECONDS
  useEffect(() => {
    let i = 0;
    const greetingInterval = setInterval(() => {
      setCurrentGreeting(greetings[i % greetings.length]);
      i++;
    }, 100); // FAST — 0.1 second per greeting

    const juTimer = setTimeout(() => {
      clearInterval(greetingInterval);
      setShowJuConnect(true);
    }, 3000); // Show JuConnect after 3 seconds

    const optionsTimer = setTimeout(() => setShowOptions(true), 4500);

    return () => {
      clearInterval(greetingInterval);
      clearTimeout(juTimer);
      clearTimeout(optionsTimer);
    };
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black text-white">
      <canvas ref={canvasRef} className="absolute top-0 left-0 z-0" />

      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center z-10">
        {!showJuConnect ? (
          <h1 className="text-4xl font-bold tracking-wide">{currentGreeting}</h1>
        ) : (
          <h1 className="text-5xl font-extrabold glitch-text">JuConnect</h1>
        )}

        {showOptions && (
          <div className="mt-8 flex flex-col items-center gap-4">
            <Link to="/login">
              <button className="bg-green-600 px-6 py-2 rounded hover:bg-green-700 transition">Login</button>
            </Link>
            <Link to="/signup">
              <button className="bg-emerald-600 px-6 py-2 rounded hover:bg-emerald-700 transition">Signup</button>
            </Link>
          </div>
        )}
      </div>

      {/* Glitch Style */}
      <style>{`
        .glitch-text {
          color: #ccffcc;
          position: relative;
          display: inline-block;
        }
        .glitch-text::before, .glitch-text::after {
          content: 'JuConnect';
          position: absolute;
          left: 0;
          width: 100%;
          background: black;
        }
        .glitch-text::before {
          animation: glitchTop 1s infinite linear alternate-reverse;
          top: -2px;
          color: #39ff14;
        }
        .glitch-text::after {
          animation: glitchBottom 1s infinite linear alternate-reverse;
          top: 2px;
          color: #00ffcc;
        }
        @keyframes glitchTop {
          0% { transform: translateX(0); }
          20% { transform: translateX(-2px); }
          40% { transform: translateX(2px); }
          60% { transform: translateX(-1px); }
          80% { transform: translateX(1px); }
          100% { transform: translateX(0); }
        }
        @keyframes glitchBottom {
          0% { transform: translateX(0); }
          20% { transform: translateX(2px); }
          40% { transform: translateX(-2px); }
          60% { transform: translateX(1px); }
          80% { transform: translateX(-1px); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
