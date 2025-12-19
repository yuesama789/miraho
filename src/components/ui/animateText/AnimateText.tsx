import React from 'react';
import { gsap } from 'gsap';
import {SplitText} from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

interface AnimateTextProps {
    children: React.ReactNode;
}

const AnimateText: React.FC<AnimateTextProps> = ({ 
    children
}) => {

    gsap.registerPlugin(SplitText, ScrollTrigger) 

    const textRef = React.useRef<HTMLDivElement | null>(null);

    gsap.set(textRef.current, { autoAlpha: 0 });

    useGSAP(() => {
        if (!textRef.current) return;

        ScrollTrigger.create({
            trigger: textRef.current,
            start: "top bottom",
            // markers: true,
            onEnter: () => initTextAnimation(),
        });

        initTextAnimation();
    }, []);

    const initTextAnimation = () => {
        SplitText.create(textRef.current, {
            type: "lines, words",
            mask: "lines",
            autoSplit: true,
            onSplit(self) {
                return gsap.from(self.words, {
                duration: 1, 
                y: 100, 
                autoAlpha: 0, 
                stagger: 0.05
                });
            }
        });
    };


    return (
        <div 
            ref={textRef}
            style={{ 
                fontSize: '3rem', 
                color: 'rgba(0, 0, 0, 0.8)', 
                lineHeight: '1.4', 
                fontWeight: 600, 
                textAlign: 'center',
                margin: '3rem 0 6rem',}}
            >
            {children}
        </div>
    );
};

export default AnimateText;