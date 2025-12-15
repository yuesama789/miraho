import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './CustomCursor.module.scss';

const CustomCursor: React.FC = () => {
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const cursorOrbRef = useRef<HTMLDivElement>(null);

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
                duration: 0.3,
                ease: 'power2.out',
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <>
            <div ref={cursorDotRef} className={styles.cursorDot} />
            <div ref={cursorOrbRef} className={styles.cursorOrb} />
        </>
    );
};

export default CustomCursor;
