import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styles from './CustomCursor.module.scss';

const CustomCursor: React.FC = () => {
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const cursorOrbRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 600);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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

        const handleMouseEnter = () => {
            setIsVisible(true);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <>
            <div ref={cursorDotRef} className={`${styles.cursorDot} ${isHovering ? styles.hovering : ''} ${!isVisible || isMobile ? styles.hidden : ''}`} />
            <div ref={cursorOrbRef} className={`${styles.cursorOrb} ${isHovering ? styles.hovering : ''} ${!isVisible || isMobile ? styles.hidden : ''}`} />
        </>
    );
};

export default CustomCursor;
