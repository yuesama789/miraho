import React from 'react';
import styles from './Section.module.scss';

interface SectionProps {
    children: React.ReactNode;
    backgroundColor?: 'pink' | 'orange' | 'purple' | 'none';
    title: string;
    description?: string;
}

const Section: React.FC<SectionProps> = ({ children, backgroundColor, title, description }) => {

    const bg = backgroundColor ?? 'none';

    return <div className={`${styles['section-container']} ${styles[bg]}`}>
        <div className={styles['section-content']}>
            <h2>{title}</h2>
            {description && <p>{description}</p>}
            {children}
        </div>
    </div>;
};

export default Section;