'use client';

import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        
        const hue = Math.random() > 0.5 ? 25 : 210; // Orange or Blue
        const saturation = Math.floor(Math.random() * 40 + 60);
        const lightness = Math.floor(Math.random() * 40 + 30);
        this.color = `hsla(${hue}, ${saturation}%, ${lightness}%, ${Math.random() * 0.5 + 0.2})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 10000);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const connectParticles = () => {
      if (!ctx) return;
      
      const maxDistance = 100;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 107, 44, ${0.1 * (1 - distance / maxDistance)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      connectParticles();
      
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full" 
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-tight preserve-heading">
              Secure <span className="text-[#FF6B2C]">Blockchain</span> Infrastructure
            </h1>
            <p className="text-xl dark:text-white/70 text-gray-700 max-w-lg">
              Professional validator services across major networks with industry-leading uptime and security protocols.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8F2C] text-white hover:opacity-90 transition-all duration-200 rounded-xl px-6 py-6 h-auto font-medium text-base"
                onClick={() => scrollToSection('services')}
              >
                Explore Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="flex items-center space-x-6 pt-4">
              <div>
                <p className="text-3xl font-bold font-heading">99.8%</p>
                <p className="dark:text-white/60 text-gray-600 text-sm">Uptime</p>
              </div>
              <div className="h-12 w-px dark:bg-white/20 bg-gray-300"></div>
              <div>
                <p className="text-3xl font-bold font-heading">24/7</p>
                <p className="dark:text-white/60 text-gray-600 text-sm">Monitoring</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-lg aspect-square">
              <div className="absolute inset-0 rounded-full bg-[#FF6B2C]/20 blur-3xl"></div>
              <div className="relative h-full w-full">
                <NodeAnimation />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function NodeAnimation() {
  return (
    <div className="relative h-full w-full flex items-center justify-center">
      {/* Animated server/node clusters */}
      <div className="absolute w-72 h-72 border-4 border-accent/30 rounded-full animate-spin-slow"></div>
      <div className="absolute w-84 h-84 border-4 border-accent/20 rounded-full animate-spin-reverse-slow"></div>
      <div className="absolute w-96 h-96 border-2 border-dashed border-accent/10 rounded-full animate-spin-slow"></div>
      
      {/* Central validator node servers stack */}
      <div className="relative animate-float">
        {/* Server rack with 3D effect */}
        <div className="relative w-64 h-64">
          <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-[#1E1E1E] dark:to-[#2A2A2A] bg-gradient-to-br from-white to-gray-100 rounded-xl flex flex-col justify-center items-center dark:shadow-neumorphic shadow-neumorphic-light dark:border-white/5 border-gray-200/50 border p-5 backdrop-blur-sm">
            {/* Background grid pattern */}
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-10 overflow-hidden rounded-xl">
              {[...Array(36)].map((_, i) => (
                <div key={i} className="border border-accent/30"></div>
              ))}
            </div>
            
            {/* Server stack - multiple servers in a rack */}
            <div className="relative w-full h-full flex flex-col justify-center gap-4 z-10">
              {/* Top server - main validator */}
              <div className="relative h-16 dark:bg-[#151515] bg-white rounded-lg dark:border-white/10 border-gray-200 border p-2 flex flex-col animate-pulse" style={{ animationDuration: '3s' }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-accent font-bold text-xs">MAIN VALIDATOR</div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-ping-slow"></div>
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div className="w-3/4 h-4 dark:bg-[#252525] bg-gray-100 rounded-md"></div>
                  <div className="w-1/4 h-4 bg-accent/20 rounded-md"></div>
                </div>
                {/* Server lights - animated */}
                <div className="absolute right-2 bottom-2 flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`w-1 h-1 rounded-full ${i % 2 === 0 ? 'bg-green-500' : 'bg-blue-500'} animate-glow`} style={{ animationDelay: `${i * 0.1}s` }}></div>
                  ))}
                </div>
              </div>
              
              {/* Backup validator servers */}
              {[...Array(3)].map((_, i) => (
                <div key={i} className="relative h-12 dark:bg-[#151515] bg-white rounded-lg dark:border-white/10 border-gray-200 border p-2 flex flex-col" style={{ opacity: 1 - (i * 0.15) }}>
                  <div className="flex items-center justify-between">
                    <div className="text-accent/90 font-bold text-xs">BACKUP NODE {i + 1}</div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-1">
                    <div className="w-2/3 h-2 dark:bg-[#252525] bg-gray-100 rounded-md"></div>
                    <div className="w-1/3 h-2 bg-accent/10 rounded-md"></div>
                  </div>
                  {/* Server status lights */}
                  <div className="absolute right-2 bottom-1 flex space-x-1">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className={`w-1 h-1 rounded-full ${j === 0 ? 'bg-green-500' : 'bg-blue-500/70'}`}></div>
                    ))}
                  </div>
                </div>
              ))}
              
              {/* Server rack base */}
              <div className="h-6 dark:bg-[#0A0A0A] bg-gray-200 rounded-md dark:border-white/5 border-gray-300 border flex items-center justify-center">
                <div className="w-3/4 h-2 dark:bg-[#222] bg-gray-300 rounded-md"></div>
              </div>
            </div>
            
            {/* Animated data transfers */}
            <div className="absolute inset-0 overflow-hidden rounded-xl">
              {/* Vertical data flows */}
              {[...Array(4)].map((_, i) => (
                <div 
                  key={`vflow-${i}`} 
                  className="absolute w-px h-1/2 bg-gradient-to-b from-blue-500/0 via-blue-500/80 to-blue-500/0"
                  style={{
                    left: `${25 + i * 15}%`,
                    top: '0',
                    animation: `float 2s ease-in-out infinite`,
                    animationDelay: `${i * 0.3}s`
                  }}
                ></div>
              ))}
              
              {/* Horizontal data flows */}
              {[...Array(3)].map((_, i) => (
                <div 
                  key={`hflow-${i}`} 
                  className="absolute h-px w-1/2 bg-gradient-to-r from-accent/0 via-accent/80 to-accent/0"
                  style={{
                    top: `${30 + i * 20}%`,
                    left: '25%',
                    animation: `float 2s ease-in-out infinite`,
                    animationDirection: 'alternate',
                    animationDelay: `${i * 0.5}s`
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Network connection points */}
      {[...Array(8)].map((_, i) => {
        const distance = 46 + (i % 3) * 5;
        const size = 1 + (i % 3);
        const angle = Math.PI * 2 * i / 8;
        const delayOffset = i * 0.15;
        
        return (
        <div 
          key={i}
            className="absolute w-2 h-2 bg-accent rounded-full animate-glow"
            style={{
              left: `${50 + Math.cos(angle) * distance}%`,
              top: `${50 + Math.sin(angle) * distance}%`,
              width: `${size * 2}px`,
              height: `${size * 2}px`,
              animationDelay: `${delayOffset}s`
            }}
          />
        );
      })}
      
      {/* Network traffic visualization */}
      {[...Array(12)].map((_, i) => {
        const radius = 50 + (i % 4) * 5;
        const angle = (i / 12) * Math.PI * 2;
        const speed = 10 + (i % 3) * 5;
        
        return (
          <div 
            key={`traffic-${i}`}
            className={`absolute h-1 w-1 rounded-full ${i % 3 === 0 ? 'bg-green-500/80' : i % 3 === 1 ? 'bg-blue-500/80' : 'bg-accent/80'}`}
          style={{
              left: `${50 + Math.cos(angle) * radius}%`,
              top: `${50 + Math.sin(angle) * radius}%`,
              animation: `spin-slow ${speed}s linear infinite`,
              animationDelay: `-${i}s`
            }}
          />
        );
      })}
      
      {/* Consensus indicators - validators confirming blocks */}
      {[...Array(5)].map((_, i) => {
        const angle = Math.PI / 3 * i;
        const distance = 60;
        
        return (
          <div 
            key={`consensus-${i}`}
            className="absolute"
            style={{
              left: `${50 + Math.cos(angle) * distance}%`,
              top: `${50 + Math.sin(angle) * distance}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 rounded-full bg-accent/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-accent animate-ping-slow"></div>
              </div>
              <div className="w-px h-8 bg-gradient-to-b from-accent/80 to-accent/0 mt-1"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}