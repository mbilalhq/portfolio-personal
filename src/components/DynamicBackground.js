import { useEffect, useRef } from "react";

export const DynamicBackground = () => {
  const canvasRef = useRef(null);
  const torchRef = useRef({ x: -1000, y: -1000, active: false });
  const scrollRef = useRef(0);
  const smoothScrollRef = useRef(0);
  const scrollSpeedRef = useRef(0);
  const lastScrollRef = useRef(0);
  const animFrameRef = useRef(null);
  const timeRef = useRef(0);
  const particlesRef = useRef([]);
  const cachedPageHeightRef = useRef(2000);
  const frameCountRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cachedPageHeightRef.current = Math.max(document.body.scrollHeight, 2000);
      initParticles();
    };

    // Stars: small to big (like sun), random colors
    const initParticles = () => {
      // Reduced density + hard cap for high-res displays
      const count = Math.min(
        Math.floor((canvas.width * canvas.height) / 18000),
        150
      );
      const hues = [0, 30, 40, 45, 120, 140, 180, 200, 220, 260, 280, 320, 340, 170, 250, 300, 50, 190];
      particlesRef.current = Array.from({ length: count }, () => {
        // Size distribution: mostly small, some medium, few large (sun-like)
        const sizeRoll = Math.random();
        let size, glowSize;
        if (sizeRoll < 0.65) {
          size = Math.random() * 1.5 + 0.3;        // small stars
          glowSize = size + 2;
        } else if (sizeRoll < 0.88) {
          size = Math.random() * 2.5 + 1.5;        // medium stars
          glowSize = size + 4;
        } else if (sizeRoll < 0.96) {
          size = Math.random() * 3 + 3;            // large stars
          glowSize = size + 8;
        } else {
          size = Math.random() * 4 + 5;            // sun-like giants
          glowSize = size + 14;
        }

        const hue = hues[Math.floor(Math.random() * hues.length)];

        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          baseX: Math.random() * canvas.width,
          baseY: Math.random() * canvas.height,
          size,
          glowSize,
          baseOpacity: size > 4 ? 0.7 : size > 2.5 ? 0.4 : 0.2,
          hue,
          twinkleSpeed: Math.random() * 2 + 0.5,
          twinkleOffset: Math.random() * Math.PI * 2,
          parallaxFactor: size > 4 ? 0.05 : size > 2.5 ? 0.15 : 0.25 + Math.random() * 0.2,
          driftX: (Math.random() - 0.5) * 0.9,
          driftY: (Math.random() - 0.5) * 0.6,
        };
      });
    };

    resize();
    window.addEventListener("resize", resize);

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleMouseMove = (e) => {
      torchRef.current.x = e.clientX;
      torchRef.current.y = e.clientY;
      torchRef.current.active = true;
    };
    const handleMouseLeave = () => {
      torchRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    const draw = () => {
      timeRef.current += 0.008;
      const t = timeRef.current;
      frameCountRef.current++;

      // Refresh cached page height every 60 frames to avoid layout thrashing
      if (frameCountRef.current % 60 === 0) {
        cachedPageHeightRef.current = Math.max(document.body.scrollHeight, 2000);
      }

      // Smooth scroll + calculate scroll speed
      smoothScrollRef.current += (scrollRef.current - smoothScrollRef.current) * 0.08;
      const scrollDelta = Math.abs(scrollRef.current - lastScrollRef.current);
      lastScrollRef.current = scrollRef.current;
      scrollSpeedRef.current += (scrollDelta - scrollSpeedRef.current) * 0.15;
      const scrollSpeed = Math.min(scrollSpeedRef.current / 20, 1); // normalized 0-1

      const scroll = smoothScrollRef.current;
      const { width, height } = canvas;
      const maxScroll = cachedPageHeightRef.current - window.innerHeight;
      const scrollProgress = maxScroll > 0 ? Math.min(scroll / maxScroll, 1) : 0;

      // Speed multiplier for particles when scrolling
      const speedMult = 1 + scrollSpeed * 4; // 1x to 5x faster when scrolling

      // Background base — single clear
      ctx.fillStyle = "#0a0a0f";
      ctx.fillRect(0, 0, width, height);

      // ── Ambient blobs (reduced from 3 to 2 — the 3rd was barely visible) ──
      const hue1 = 140 + scrollProgress * 60;
      const blob1X = width * 0.25 + Math.sin(t * 0.5) * 100;
      const blob1Y = height * 0.3 + Math.cos(t * 0.3) * 40 - scrollProgress * 120;
      const grad1 = ctx.createRadialGradient(blob1X, blob1Y, 0, blob1X, blob1Y, 480);
      grad1.addColorStop(0, `hsla(${hue1}, 100%, 60%, 0.07)`);
      grad1.addColorStop(1, "transparent");
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const hue2 = 210 + scrollProgress * 50;
      const blob2X = width * 0.75 + Math.cos(t * 0.4) * 80;
      const blob2Y = height * 0.6 + Math.sin(t * 0.35) * 50 + scrollProgress * 60;
      const grad2 = ctx.createRadialGradient(blob2X, blob2Y, 0, blob2X, blob2Y, 420);
      grad2.addColorStop(0, `hsla(${hue2}, 100%, 60%, 0.065)`);
      grad2.addColorStop(1, "transparent");
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // ── Soft scanner ──
      const scannerCycle = 12;
      const scannerProgress = (t % scannerCycle) / scannerCycle;
      const scannerY = scannerProgress * (height + 200) - 100;
      const scannerGrad = ctx.createLinearGradient(0, scannerY - 30, 0, scannerY + 30);
      scannerGrad.addColorStop(0, "transparent");
      scannerGrad.addColorStop(0.5, "rgba(110,218,255,0.015)");
      scannerGrad.addColorStop(1, "transparent");
      ctx.fillStyle = scannerGrad;
      ctx.fillRect(0, scannerY - 30, width, 60);

      // ── Stars / Particles ──
      const torch = torchRef.current;
      const particles = particlesRef.current;
      const torchActive = torch.active;
      const torchX = torch.x;
      const torchY = torch.y;
      const torchRadius = 160;
      const torchRadiusSq = torchRadius * torchRadius;

      for (let i = 0, len = particles.length; i < len; i++) {
        const p = particles[i];

        // Base drift (always moving slowly)
        p.baseX += p.driftX * speedMult;
        p.baseY += p.driftY * speedMult;

        // Wrap around
        if (p.baseX < -20) p.baseX = width + 20;
        if (p.baseX > width + 20) p.baseX = -20;
        if (p.baseY < -20) p.baseY = height + 20;
        if (p.baseY > height + 20) p.baseY = -20;

        // Scroll parallax (vertical)
        const scrollOffset = scroll * p.parallaxFactor;
        const displayY = ((p.baseY - scrollOffset) % height + height) % height;
        const displayX = p.baseX;

        p.x = displayX;
        p.y = displayY;

        // Twinkle
        const twinkle = Math.sin(t * p.twinkleSpeed + p.twinkleOffset) * 0.5 + 0.5;
        let currentOpacity = p.baseOpacity * (0.5 + twinkle * 0.5);
        let currentSize = p.size;
        let lightness = 75;
        let saturation = 80;

        // Torch interaction — stars glow like real stars when light hits
        let inTorch = false;
        let torchIntensity = 0;
        if (torchActive) {
          const dx = displayX - torchX;
          const dy = displayY - torchY;
          const distSq = dx * dx + dy * dy;

          if (distSq < torchRadiusSq) {
            inTorch = true;
            const dist = Math.sqrt(distSq);
            torchIntensity = 1 - (dist / torchRadius);
            torchIntensity = torchIntensity * torchIntensity; // quadratic

            currentOpacity = Math.min(1, currentOpacity + torchIntensity * 0.85);
            currentSize = p.size + torchIntensity * (p.size > 4 ? 6 : 3);
            lightness = 75 + torchIntensity * 25;
            saturation = 80 - torchIntensity * 50;
          }
        }

        // Glow halo — only for genuinely large stars (>4px), skip for medium
        if (p.size > 4) {
          const glowRadius = p.glowSize + (inTorch ? torchIntensity * 12 : 0);
          const glowGrad = ctx.createRadialGradient(
            displayX, displayY, 0,
            displayX, displayY, glowRadius
          );
          glowGrad.addColorStop(0, `hsla(${p.hue}, ${saturation}%, ${lightness}%, ${currentOpacity * 0.5})`);
          glowGrad.addColorStop(0.5, `hsla(${p.hue}, ${saturation}%, ${lightness}%, ${currentOpacity * 0.15})`);
          glowGrad.addColorStop(1, "transparent");
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(displayX, displayY, glowRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw star core
        ctx.beginPath();
        ctx.arc(displayX, displayY, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, ${saturation}%, ${lightness}%, ${currentOpacity})`;
        ctx.fill();
      }

      // ── Torch ambient glow ──
      if (torchActive) {
        const torchGrad = ctx.createRadialGradient(
          torchX, torchY, 0,
          torchX, torchY, 320
        );
        torchGrad.addColorStop(0, "rgba(255, 255, 255, 0.05)");
        torchGrad.addColorStop(0.3, "rgba(255,255,255,0.03)");
        torchGrad.addColorStop(0.7, "rgba(255,255,255,0.01)");
        torchGrad.addColorStop(1, "transparent");
        ctx.fillStyle = torchGrad;
        ctx.fillRect(0, 0, width, height);
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
};
