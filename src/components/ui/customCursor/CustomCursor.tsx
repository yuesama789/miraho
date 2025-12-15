import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styles from './CustomCursor.module.scss';

const CustomCursor: React.FC = () => {
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const cursorOrbRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;

            // Move dot instantly
            gsap.to(cursorDotRef.current, {
                x: clientX,
                y: clientY,
                duration: 0,
            });

            // Move orb with delay for smooth follow effect
            gsap.to(cursorOrbRef.current, {
                x: clientX,
                y: clientY,
                duration: 0.6,
                ease: 'power2.out',
            });

            // Check if hovering over interactive element
            const target = e.target as HTMLElement;
            const isInteractive = target.closest('a, button, [role="button"]');
            setIsHovering(!!isInteractive);
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <>
            <div ref={cursorDotRef} className={`${styles.cursorDot} ${isHovering ? styles.hovering : ''}`} />
            <div ref={cursorOrbRef} className={`${styles.cursorOrb} ${isHovering ? styles.hovering : ''}`} />
        </>
    );
};

export default CustomCursor;
