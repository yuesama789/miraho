import React, { useEffect, useState } from 'react';
import styles from './Section.module.scss';

interface SectionProps {
    children: React.ReactNode;
    backgroundColor?: 'pink' | 'orange' | 'purple' | 'none';
}

const Section: React.FC<SectionProps> = ({ children, backgroundColor }) => {

    const bg = backgroundColor ?? 'none';

    return <div className={`${styles['section-container']} ${styles[bg]}`}>{children}</div>;
};

export default Section;