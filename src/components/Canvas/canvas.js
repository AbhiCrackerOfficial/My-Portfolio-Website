import React, { useEffect, useRef } from 'react';
import './canvas.css';

const Canvas = () => {
  // Create a reference to the canvas element
  const canvasRef = useRef(null);

  useEffect(() => {
    // Retrieve the canvas and its 2D context
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Initial settings
    let font_size = 10;
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890@#$%^&*()".split("");
    let columns, drops;
    let canvasHeight = window.innerHeight;
    let animationPaused = false;
    let resizeInProgress = false; // Flag to track resize events

    // Function to set canvas size based on window dimensions
    function setCanvasSize() {
      const windowWidth = window.innerWidth;
      canvas.width = windowWidth;
      canvas.height = canvasHeight;
      columns = Math.floor(windowWidth / font_size);
      drops = Array(columns).fill(1);
    }

    // Function to dynamically adjust font size based on window dimensions
    function setFontSize() {
      const windowWidth = window.innerWidth;
      font_size = Math.floor(windowWidth / columns);
      ctx.font = font_size + "px sans-serif";
    }

    // Function to draw the matrix rain animation on the canvas
    function draw() {
      // Draw a semi-transparent background to create a fading effect
      ctx.fillStyle = "rgba(20, 20, 20, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set the text color to green for the matrix rain
      ctx.fillStyle = "#0F0";

      // Iterate through each column and update the drops
      for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)];
        ctx.fillText(text, i * font_size, drops[i] * font_size);

        // Reset the drop if it goes beyond the canvas height with a certain probability
        if (drops[i] * font_size > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    }

    // Function to create the animation loop
    function loop() {
      if (!animationPaused) {
        // Continue the animation by recursively calling the loop function
        requestAnimationFrame(loop);
        // Draw the matrix rain animation
        draw();
      }
    }

    // Function to handle resizing of the window
    function handleResize() {
      if (!resizeInProgress) {
        resizeInProgress = true; // Set the flag to true during resize
        const prevCanvasHeight = canvas.height;
        canvasHeight = window.innerHeight;

        // Adjust canvas size and font size on window resize
        setCanvasSize();
        setFontSize();

        // Clear the area below the canvas if the new height is smaller than the previous height
        if (canvas.height < prevCanvasHeight) {
          ctx.clearRect(0, canvas.height, canvas.width, prevCanvasHeight - canvas.height);
        }

        // Set a timeout to reset the flag after a short delay
        setTimeout(() => {
          resizeInProgress = false;
        }, 200);
      }
    }

    // Check if the device is a mobile device (arbitrary threshold of 600 pixels)
    const isMobile = window.innerWidth < 600 && 'ontouchstart' in window;

    // Attach the event listener only if it's not a mobile device
    if (!isMobile) {
      window.addEventListener('resize', function () {
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(handleResize, 200);
      });
    }

    // Set initial canvas size and font size
    setCanvasSize();
    setFontSize();

    // Start the animation loop
    loop();

    // Cleanup function to stop the animation when the component unmounts
    return () => {
      animationPaused = true; // Stop the animation loop
    };
  }, []); // Empty dependency array ensures that the effect runs once on mount

  // Return the canvas element with a className for styling
  return <canvas ref={canvasRef} className='matrix'></canvas>;
};

export default Canvas;
