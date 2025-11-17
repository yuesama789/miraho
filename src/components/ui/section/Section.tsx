import React from 'react';
import styles from './Section.module.scss';

interface SectionProps {
    children: React.ReactNode;
    backgroundColor?: 'pink' | 'orange' | 'purple' | 'none';
    title: string;
    description?: string;
    scrollTelling?: boolean;
}

const Section: React.FC<SectionProps> = ({ children, backgroundColor, title, description, scrollTelling }) => {

    const bg = backgroundColor ?? 'none';

    const sectionHeight = () => {
        if (scrollTelling) {
            return '300vh';
        }
        return 'auto';
    }

    const height = sectionHeight();

    const [scrolledPercentage, setScrolledPercentage] = React.useState('');

    React.useEffect(() => {
        if (!scrollTelling) {
            setScrolledPercentage('');
            return;
        }

        const el = document.querySelector(`.${styles['section-container']}`) as HTMLElement | null;
        if (!el) return;

        const handleScroll = () => {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            const y = window.scrollY;

            const inView = y + window.innerHeight > top && y < top + height;
            if (!inView) {
                setScrolledPercentage('');
                return;
            }

            const denom = Math.max(1, height - window.innerHeight);
            const progress = (y - top) / denom;
            const pct = Math.round(Math.min(1, Math.max(0, progress)) * 100);
            setScrolledPercentage(`${pct}%`);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrollTelling]);



    return <div className={`${styles['section-container']} ${styles[bg]}`} style={{ height, position: 'relative' }}>
        <div className={styles['section-content']}>
            <h2>{title}</h2>
            {description && <p>{description}</p>}
            {children}
        </div>
        <div style={{ position: 'fixed', top: 0, width: '100%', padding: '1rem', fontSize: '0.875rem', color: '#666' }}>
            {scrolledPercentage}
        </div>
    </div>;
};

export default Section;