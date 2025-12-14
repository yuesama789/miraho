import React from 'react';
import styles from './Section.module.scss';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

interface SectionProps {
    children: React.ReactNode;
    backgroundColor?: 'pink' | 'orange' | 'purple' | 'none';
    title?: string;
    description?: string;
    className?: string;
    pinnedTitle?: boolean;
    fullWidth?: boolean;
}

const Section: React.FC<SectionProps> = ({ children, backgroundColor, title, description, className, pinnedTitle, fullWidth }) => {

    gsap.registerPlugin(ScrollTrigger);

    const sectionContent = React.useRef<HTMLDivElement | null>(null);

    useGSAP(() => {
        if (!sectionContent.current) return;
        
        const tl = gsap.timeline({
            
            scrollTrigger: {
                trigger: sectionContent.current,
                start: "top 80%",
                end: "bottom 80%",
                scrub: 1,
            },
        });

        tl.fromTo(sectionContent.current?.querySelector('span'), {
            scaleX: 0,
            transformOrigin: 'center center',
        },
        {
            scaleX: 1,
            duration: 3,
            ease: 'power2.out',
        })

        .fromTo(sectionContent.current?.querySelector('h2'), {
            y: '100%',
            opacity: 0,
        },
        {
            y: '0%',
            opacity: 1,
            duration: 3,
            ease: 'power2.out',
        })

        .fromTo(sectionContent.current?.querySelector('p'), 
        {
            y: '-100%',
            opacity: 0,
        },
        {
            y: '0%',
            opacity: 1,
            duration: 3,
            ease: 'power2.out',
        });

        if (pinnedTitle) {
            console.log("Pinning section title: ", title);
            ScrollTrigger.create({
                trigger: sectionContent.current,
                start: "top top",
                end: "+=100",
                pin: sectionContent.current,
                pinSpacing: false,
                // markers: true,
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.vars.trigger === sectionContent.current) {
                    trigger.kill();
                }
            });
        };
    }, []);


    const bg = backgroundColor ?? 'none';


    return <div className={`${styles['section-container']} ${styles[bg]} ${className || ''} ${fullWidth ? styles['full-width'] : ''}`} style={{ position: 'relative' }}>
        {title || description ? <div className={styles['section-content']} >
            <div ref={sectionContent}>
                {title && (<><h2>{title}</h2><span className={styles['section-underline']}></span></>)}
                {description && <p>{description}</p>}
            </div>
            {children}
        </div> : children}
    </div>;
};

export default Section;