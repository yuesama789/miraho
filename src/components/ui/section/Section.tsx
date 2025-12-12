import React from 'react';
import styles from './Section.module.scss';/* 
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; */

interface SectionProps {
    children: React.ReactNode;
    backgroundColor?: 'pink' | 'orange' | 'purple' | 'none';
    title?: string;
    description?: string;
    className?: string;
}

const Section: React.FC<SectionProps> = ({ children, backgroundColor, title, description, className }) => {

/* 
    ScrollTrigger.create({
        start: 0,
        end: "max",
        snap: {
        snapTo: 1,
        duration: 0.5,
        ease: "power1.inOut",}
    }); */



    const bg = backgroundColor ?? 'none';


    return <div className={`${styles['section-container']} ${styles[bg]} ${className || ''}`} style={{ position: 'relative' }}>
        {title || description ? <div className={styles['section-content']}>
            {title && <h2>{title}</h2>}
            {description && <p>{description}</p>}
            {children}
        </div> : children}
    </div>;
};

export default Section;