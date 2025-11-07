import React, { useEffect, useState } from 'react';
import styles from './Section.module.scss';

interface SectionProps {
    children: React.ReactNode;
    backgroundColor?: 'pink' | 'orange' | 'purple' | 'none';
    additionalClassName?: string;
}

const Section: React.FC<SectionProps> = ({ children, backgroundColor, additionalClassName }) => {

    const bg = backgroundColor ?? 'none';
    const additionalClasses = additionalClassName ? additionalClassName : '';

    return <div className={`${styles['section-container']} ${styles[bg]} ${styles[additionalClasses]}`}>{children}</div>;
};

export default Section;