// src/StarfieldTransition.jsx
import React, { useEffect, useRef, useState } from 'react';

const StarfieldTransition = ({ onWarpComplete }) => {
  const canvasRef = useRef(null);
  const requestRef = useRef();
  
  // 控制“淡出到黑暗”的状态
  const [isExiting, setIsExiting] = useState(false);
  
  const stateRef = useRef({
    width: 0,
    height: 0,
    centerX: 0,
    centerY: 0,
    particles: [],
    speed: 0.5,        
    // 【修改点1】最高速度降为 20，防止飞得太快眼花
    targetSpeed: 10,
    hasTriggered: false 
  });

  const PARTICLE_COUNT = 1000;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const state = stateRef.current;

    class Particle {
      constructor() { this.init(); }

      init() {
        this.x = (Math.random() - 0.5) * 4000; 
        this.y = (Math.random() - 0.5) * 4000;
        this.z = Math.random() * 2000;
        this.prevZ = this.z;
        // 稍微调暗了一点粒子颜色，看着更舒服
        const colors = ['#00f2ff', '#0072ff', '#4b5563', '#7000ff'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update(currentSpeed) {
        this.prevZ = this.z;
        this.z -= currentSpeed * 20; 

        if (this.z <= 0) {
          this.init();
          this.z = 2000;
          this.prevZ = this.z;
        }
      }

      draw(width, height, centerX, centerY) {
        const scale = 600 / this.z;
        const x2d = centerX + this.x * scale;
        const y2d = centerY + this.y * scale;
        const prevScale = 600 / this.prevZ;
        const prevX2d = centerX + this.x * prevScale;
        const prevY2d = centerY + this.y * prevScale;

        if (x2d > 0 && x2d < width && y2d > 0 && y2d < height) {
          ctx.beginPath();
          ctx.strokeStyle = this.color;
          // 线条不要太粗，保持精致感
          ctx.lineWidth = scale * (state.speed > 15 ? 2 : 1); 
          ctx.lineCap = 'round';
          ctx.moveTo(x2d, y2d);
          ctx.lineTo(prevX2d, prevY2d);
          ctx.stroke();
        }
      }
    }

    const initCanvas = () => {
      state.width = window.innerWidth;
      state.height = window.innerHeight;
      canvas.width = state.width;
      canvas.height = state.height;
      state.centerX = state.width / 2;
      state.centerY = state.height / 2;
    };

    const createParticles = () => {
      state.particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        state.particles.push(new Particle());
      }
    };

    const animate = () => {
      // 背景色：深空蓝黑
      ctx.fillStyle = '#020617'; 
      ctx.fillRect(0, 0, state.width, state.height);

      // 【修改点2】极慢的加速度系数 0.005，让起步非常平滑
      state.speed += (state.targetSpeed - state.speed) * 0.01;

      // 【修改点3】触发逻辑
      // 当速度达到 15 时，开始变黑
      if (state.speed > 8 && !state.hasTriggered) {
        state.hasTriggered = true;
        setIsExiting(true); // 开启 React 状态，让 CSS 把屏幕变黑
        
        // 延迟 2秒 (2000ms)，等屏幕全黑了，再通知 App 切换页面
        setTimeout(() => {
            if (onWarpComplete) onWarpComplete();
        }, 1000);
      }

      state.particles.forEach(p => {
        p.update(state.speed);
        p.draw(state.width, state.height, state.centerX, state.centerY);
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => { initCanvas(); };
    const handleMouseMove = (e) => {
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      if (clientX) {
        state.centerX += ((state.width / 2 + (clientX - state.width / 2) * 0.1) - state.centerX) * 0.1;
      }
    };

    initCanvas();
    createParticles();
    requestRef.current = requestAnimationFrame(animate);

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleMouseMove);

    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleMouseMove);
    };
  }, [onWarpComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950">
      <canvas ref={canvasRef} className="block w-full h-full" />
      
      {/* 黑色遮罩层 (Fade to Black) */}
      <div 
        className={`absolute inset-0 bg-[#020408] pointer-events-none z-50 transition-opacity duration-[2000ms] ease-in-out
        ${isExiting ? 'opacity-100' : 'opacity-0'}`}
      ></div>

      {/* 底部文字：变黑时自动隐藏 */}
      <div className={`absolute bottom-10 left-0 w-full text-center pointer-events-none transition-opacity duration-500 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
        <p className="text-amber-500/60 font-serif text-sm tracking-[0.5em] uppercase animate-pulse">
          Approaching The Gate...
        </p>
      </div>
    </div>
  );
};

export default StarfieldTransition;