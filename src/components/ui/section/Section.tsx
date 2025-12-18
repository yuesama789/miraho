import React from 'react';
import styles from './Section.module.scss';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

interface SectionProps {
    children: React.ReactNode;
    backgroundColor?: 'pink' | 'orange' | 'purple' | 'dark' |'none';
    title?: string;
    description?: string;
    className?: string;
    pinned?: 'title' | 'section' | 'none';
    fullWidth?: boolean;
    addPinSpacer?: boolean;
}

const Section: React.FC<SectionProps> = ({ children, backgroundColor, title, description, className, pinned, fullWidth, addPinSpacer = false }) => {

    gsap.registerPlugin(ScrollTrigger);

    const sectionContent = React.useRef<HTMLDivElement | null>(null);

    const isDeviceVertical = () => {
        return window.innerHeight > window.innerWidth;
    }

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

        if (pinned === 'title') {
            console.log("Pinning section title: ", title);
            ScrollTrigger.create({
                trigger: sectionContent.current,
                start: "-=20 top",
                end: () => 
                    addPinSpacer ? isDeviceVertical() ? "+=33%" : "+=20%" : "bottom top",
                pin: sectionContent.current,
                pinSpacing: false,
                // markers: true,
            });
        }

        if (pinned === 'section') {
            console.log("Pinning entire section: ", title);
            ScrollTrigger.create({
                trigger: sectionContent.current?.parentElement,
                start: "top top",
                end: "bottom top",
                pin: true,
                pinSpacing: true,
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


    return (
    <>
        <div className={`${styles.sectionContainer} ${styles[bg]} ${className || ''} ${fullWidth ? styles.fullWidth : ''}`} style={{ position: 'relative' }}>
            <div className={styles.sectionInnerWrapper}>
                {title || description ? <div className={styles.sectionContent} >
                    <div className={styles.sectionHeader} ref={sectionContent}>
                        {title && (<><h2>{title}</h2><span className={styles.sectionUnderline}></span></>)}
                        {description && <p>{description}</p>}
                    </div>
                    {children}
                </div> : children}
            </div>
        </div>
    </>
    );
};

export default Section;