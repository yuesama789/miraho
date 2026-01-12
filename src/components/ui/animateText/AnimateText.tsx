import React from 'react';
import { gsap } from 'gsap';
import {SplitText} from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

interface AnimateTextProps {
    text: string;
}

const AnimateText: React.FC<AnimateTextProps> = ({ 
    text
}) => {

    gsap.registerPlugin(SplitText, ScrollTrigger) 

    const textRef = React.useRef<HTMLDivElement | null>(null);
    const splitInstanceRef = React.useRef<any>(null);

    useGSAP(() => {
        if (!textRef.current) return;

        // Clean up previous SplitText instance
        if (splitInstanceRef.current) {
            splitInstanceRef.current.revert();
        }

        gsap.set(textRef.current, { autoAlpha: 1 });

        ScrollTrigger.create({
            trigger: textRef.current,
            start: "top bottom",
            // markers: true,
            onEnter: () => initTextAnimation(),
        });

        return () => {
            if (splitInstanceRef.current) {
                splitInstanceRef.current.revert();
            }
        };
    }, [text]);

    const initTextAnimation = () => {
        if (!textRef.current) return;
        
        splitInstanceRef.current = SplitText.create(textRef.current, {
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
                fontSize: '2rem',
                width: '80%',
                color: 'rgba(0, 0, 0, 0.8)', 
                lineHeight: '1.4', 
                fontWeight: 600, 
                textAlign: 'center',
                margin: '3rem auto 6rem',}}
            >
            {text}
        </div>
    );
};

export default AnimateText;