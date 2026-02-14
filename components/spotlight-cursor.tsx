'use client';

import { useEffect, useRef, useState } from 'react';

export function SpotlightCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const isTouchRef = useRef(false);
    const visibleRef = useRef(false);

    useEffect(() => {
        const hasTouch = window.matchMedia('(hover: none)').matches;
        isTouchRef.current = hasTouch;
        setIsTouchDevice(hasTouch);
        if (isTouchRef.current) return;

        const updatePosition = (e: MouseEvent) => {
            if (isTouchRef.current) return;
            setPosition({ x: e.clientX, y: e.clientY });
            if (!visibleRef.current) {
                visibleRef.current = true;
                setIsVisible(true);
            }
        };

        const handleMouseLeave = () => {
            visibleRef.current = false;
            setIsVisible(false);
        };
        const handleMouseEnter = () => {
            visibleRef.current = true;
            setIsVisible(true);
        };

        window.addEventListener('mousemove', updatePosition);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', updatePosition);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, []);

    if (isTouchDevice) return null;

    return (
        <div
            className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
            style={{ opacity: isVisible ? 1 : 0 }}
        >
            <div
                className="absolute -inset-px bg-transparent pointer-events-none"
                style={{
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`,
                }}
            />
        </div>
    );
}
