import React from 'react';
import styles from './Section.module.scss';

interface SectionProps {
    children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ children }) => {
    return <div className={styles['section-container']}>{children}</div>;
};

export default Section;