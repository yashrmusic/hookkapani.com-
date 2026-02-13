'use client';

import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const mousePosition = useRef({ x: 0, y: 0 });
  const currentPosition = useRef({ x: 0, y: 0 });
  const ringPosition = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const hasTouch = window.matchMedia('(hover: none)').matches;
    if (hasTouch) return;

    const updateMousePosition = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
      setIsHidden(false);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target || typeof target.closest !== 'function') {
        setIsPointer(false);
        return;
      }
      const isClickable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        (target instanceof HTMLElement && window.getComputedStyle(target).cursor === 'pointer');

      setIsPointer(!!isClickable);
    };

    const handleMouseLeave = () => {
      setIsHidden(true);
    };

    const animate = () => {
      currentPosition.current.x += (mousePosition.current.x - currentPosition.current.x) * 0.2;
      currentPosition.current.y += (mousePosition.current.y - currentPosition.current.y) * 0.2;

      ringPosition.current.x += (mousePosition.current.x - ringPosition.current.x) * 0.1;
      ringPosition.current.y += (mousePosition.current.y - ringPosition.current.y) * 0.1;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${currentPosition.current.x - 4}px, ${currentPosition.current.y - 4}px) scale(${isPointer ? 1.5 : 1})`;
        cursorDotRef.current.style.opacity = isHidden ? '0' : '1';
      }

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate(${ringPosition.current.x - 16}px, ${ringPosition.current.y - 16}px) scale(${isPointer ? 1.5 : 1})`;
        cursorRingRef.current.style.opacity = isHidden ? '0' : '1';
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave);

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPointer, isHidden]);

  useEffect(() => {
    const hasTouch = window.matchMedia('(hover: none)').matches;
    if (!hasTouch) {
      document.body.style.cursor = 'none';
      const style = document.createElement('style');
      style.innerHTML = `* { cursor: none !important; }`;
      style.id = 'custom-cursor-style';
      document.head.appendChild(style);

      return () => {
        document.body.style.cursor = 'auto';
        const existingStyle = document.getElementById('custom-cursor-style');
        if (existingStyle) existingStyle.remove();
      };
    }
  }, []);

  // Moved touch detection to avoid SSR window access
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(hover: none)').matches);
  }, []);
  if (isTouchDevice) return null;

  return (
    <>
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-50 mix-blend-difference will-change-transform"
        style={{ transform: 'translate(-100px, -100px)', opacity: 0 }}
      />
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 w-8 h-8 border-2 border-accent rounded-full pointer-events-none z-50 mix-blend-difference will-change-transform"
        style={{ transform: 'translate(-100px, -100px)', opacity: 0 }}
      />
    </>
  );
}
