import React, { useEffect, useRef } from 'react';
import './canvas.css';

const Canvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let font_size = 10;
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890@#$%^&*()".split("");
    let columns, drops;
    let canvasHeight = window.innerHeight;
    let animationPaused = false;
    let resizeInProgress = false;

    function setCanvasSize() {
      const windowWidth = window.innerWidth;
      canvas.width = windowWidth;
      canvas.height = canvasHeight*1.5;
      columns = Math.floor(windowWidth / font_size);
      drops = Array(columns).fill(1);
    }

    function setFontSize() {
      const windowWidth = window.innerWidth;
      font_size = Math.floor(windowWidth / columns);
      ctx.font = font_size + "px sans-serif";
    }

    function draw() {
      ctx.fillStyle = "rgba(20, 20, 20, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0F0";

      for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)];
        ctx.fillText(text, i * font_size, drops[i] * font_size);

        if (drops[i] * font_size > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    }

    function loop() {
      if (!animationPaused) {
        requestAnimationFrame(loop);
        draw();
      }
    }

    function handleResize() {
      if (!resizeInProgress) {
        resizeInProgress = true;
        const prevCanvasHeight = canvas.height;
        canvasHeight = window.innerHeight;

        setCanvasSize();
        setFontSize();

        if (canvas.height < prevCanvasHeight) {
          ctx.clearRect(0, canvas.height, canvas.width, prevCanvasHeight - canvas.height);
        }

        setTimeout(() => {
          resizeInProgress = false;
        }, 200);
      }
    }

    const isMobile = window.innerWidth < 600 && 'ontouchstart' in window;

    if (!isMobile) {
      window.addEventListener('resize', function () {
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(handleResize, 200);
      });
    }

    setCanvasSize();
    setFontSize();
    loop();

    return () => {
      animationPaused = true;
    };
  }, []);

  return (
    <div className="canvas-container" style={{ overflow: 'hidden' }}>
      <canvas ref={canvasRef} className='matrix'></canvas>
    </div>
  );
};

export default Canvas;
