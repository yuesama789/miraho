import React, { useEffect } from 'react';
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
}

const Section: React.FC<SectionProps> = ({ children, backgroundColor, title, description, className }) => {

    gsap.registerPlugin(ScrollTrigger);

    const sectionContent = React.useRef<HTMLDivElement | null>(null);

    /* console.log('sectionTitle.current:', sectionTitle.current);

    useEffect(() => {
        if (!sectionTitle.current) return;

        gsap.fromTo(sectionTitle.current, {
            y: '-100%',
            opacity: 0,
        },
        {
            scrollTrigger: {
                trigger: sectionTitle.current,
                start: "top 80%",
                end: "bottom 80%",
                scrub: 1,
                markers: true,
            },
            y: '0%',
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.vars.trigger === sectionTitle.current) {
                    trigger.kill();
                }
            });
        };
    }, []); */

    useGSAP(() => {
        if (!sectionContent.current) return;
        
        const tl = gsap.timeline({
            
            scrollTrigger: {
                trigger: sectionContent.current,
                start: "top 80%",
                end: "bottom 80%",
                markers: true,
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

        return () => {
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.vars.trigger === sectionContent.current) {
                    trigger.kill();
                }
            });
        };
    }, []);


    const bg = backgroundColor ?? 'none';


    return <div className={`${styles['section-container']} ${styles[bg]} ${className || ''}`} style={{ position: 'relative' }}>
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