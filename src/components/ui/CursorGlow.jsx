import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const glow = glowRef.current;
    const dot = dotRef.current;
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;
    let animId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    };

    const animate = () => {
      glowX += (mouseX - glowX) * 0.12;
      glowY += (mouseY - glowY) * 0.12;
      glow.style.left = glowX + 'px';
      glow.style.top = glowY + 'px';
      animId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    animId = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div
        ref={glowRef}
        className="cursor-glow"
        style={{ width: 80, height: 80 }}
      />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}
