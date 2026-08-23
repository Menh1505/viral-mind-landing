import { useEffect, useRef } from "react";

interface EtherealGoldenDustProps {
  className?: string;
  particleCount?: number;
  interactive?: boolean;
}

interface DustParticle {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  alphaSpeed: number;
  vx: number;
  vy: number;
  driftAngle: number;
  driftSpeed: number;
  hue: string;
  glow: number;
}

const GOLD_PALETTES = [
  "254, 240, 138", // amber-200
  "251, 191, 36",  // amber-400
  "245, 158, 11",  // amber-500
  "255, 227, 179", // warm champagne gold
  "217, 119, 6",   // amber-600
];

export default function EtherealGoldenDust({
  className = "",
  particleCount = 65,
  interactive = true,
}: EtherealGoldenDustProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.offsetHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.offsetHeight || window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Initialize ethereal dust particles
    const particles: DustParticle[] = Array.from({ length: particleCount }, () => {
      const radius = 0.6 + Math.random() * 2.6;
      const baseAlpha = 0.15 + Math.random() * 0.65;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius,
        baseAlpha,
        alpha: baseAlpha,
        alphaSpeed: 0.008 + Math.random() * 0.018,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -0.2 - Math.random() * 0.45, // gentle upward drift
        driftAngle: Math.random() * Math.PI * 2,
        driftSpeed: 0.01 + Math.random() * 0.02,
        hue: GOLD_PALETTES[Math.floor(Math.random() * GOLD_PALETTES.length)],
        glow: radius > 1.8 ? 8 : 4,
      };
    });

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Organic sinusoidal floating
        p.driftAngle += p.driftSpeed;
        p.x += p.vx + Math.sin(p.driftAngle) * 0.45;
        p.y += p.vy;

        // Twinkle alpha pulsation
        p.alpha = p.baseAlpha + Math.sin(time * 2 + i) * 0.2;
        if (p.alpha < 0.05) p.alpha = 0.05;
        if (p.alpha > 0.95) p.alpha = 0.95;

        // Gentle interactive mouse repulsion
        if (interactive && mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140 && dist > 0) {
            const force = (140 - dist) / 140;
            p.x += (dx / dist) * force * 1.5;
            p.y += (dy / dist) * force * 1.5;
          }
        }

        // Wrap around boundaries seamlessly
        if (p.y < -20) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 10;
        if (p.x > width + 20) p.x = -10;

        // Draw soft glowing ethereal particle
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        // Core fill
        ctx.fillStyle = `rgba(${p.hue}, ${p.alpha})`;
        ctx.shadowColor = `rgba(${p.hue}, ${p.alpha * 0.9})`;
        ctx.shadowBlur = p.glow;
        ctx.fill();

        // Optional larger subtle diffuse aura for bigger particles
        if (p.radius > 1.8) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.hue}, ${p.alpha * 0.12})`;
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };

    if (interactive) {
      window.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseleave", onMouseLeave);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (interactive) {
        window.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseleave", onMouseLeave);
      }
    };
  }, [particleCount, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
}
