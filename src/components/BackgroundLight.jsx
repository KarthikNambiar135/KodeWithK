import React, { useEffect, useRef } from 'react';

function BackgroundLight() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const pointsCount = 50;
    const points = [];

    // Create floating particles with varied sizes
    for (let i = 0; i < pointsCount; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 4 + 2,
        opacity: Math.random() * 0.7 + 0.3,
        hue: Math.random() * 30 + 345, // Warm coral to peach range
      });
    }

    function draw() {
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#fdfcfb');
      gradient.addColorStop(0.5, '#ffffff');
      gradient.addColorStop(1, '#f8f9fa');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Move points with smooth bouncing
      points.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        // Smooth bounce off edges
        if (p.x < 0 || p.x > width) {
          p.vx = -p.vx;
          p.x = Math.max(0, Math.min(width, p.x));
        }
        if (p.y < 0 || p.y > height) {
          p.vy = -p.vy;
          p.y = Math.max(0, Math.min(height, p.y));
        }

        // Gentle pulsing effect
        p.opacity = 0.4 + Math.sin(Date.now() * 0.001 + p.x * 0.01) * 0.3;
      });

      // Draw connection lines first (behind particles)
      ctx.lineWidth = 1.5;
      for (let i = 0; i < pointsCount; i++) {
        for (let j = i + 1; j < pointsCount; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const alpha = (120 - dist) / 120 * 0.3;
            ctx.strokeStyle = `rgba(255, 107, 107, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles with gradient and glow effect
      points.forEach(p => {
        ctx.save();
        
        // Create radial gradient for each particle
        const particleGradient = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, p.size * 2
        );
        
        // Dynamic color based on position and time
        const hue = (p.hue + Date.now() * 0.01) % 360;
        particleGradient.addColorStop(0, `hsla(${hue}, 70%, 65%, ${p.opacity})`);
        particleGradient.addColorStop(0.7, `hsla(${hue}, 60%, 70%, ${p.opacity * 0.6})`);
        particleGradient.addColorStop(1, `hsla(${hue}, 50%, 80%, 0)`);

        ctx.fillStyle = particleGradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Inner bright core
        ctx.fillStyle = `hsla(${hue}, 80%, 60%, ${p.opacity * 0.8})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(draw);
    }

    draw();

    function handleResize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      // Redistribute points on resize
      points.forEach(p => {
        if (p.x > width) p.x = width * Math.random();
        if (p.y > height) p.y = height * Math.random();
      });
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        width: '100vw',
        height: '100vh',
        display: 'block',
      }}
    />
  );
}

export default BackgroundLight;