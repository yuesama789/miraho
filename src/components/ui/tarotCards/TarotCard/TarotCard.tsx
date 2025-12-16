import React from 'react';
import styles from './TarotCard.module.scss';

interface TarotCardProps {
    name: string;
    svg: React.ReactNode;
    colour: string;
    colour2: string;
    description?: string;
}

const TarotCard: React.FC<TarotCardProps> = ({ name, svg, colour, colour2, description }) => {
    return (
        <div className={styles.tarotCard}>
            <div className={styles.tarotCard__inner}
                style={{ 
                    background: `linear-gradient(135deg, ${colour} 0%, ${colour2} 100%)` }}>
                <div className={styles.tarotCard__front}>
                    <div className={styles.tarotCard__icon}>
                        {svg}
                    </div>
                    <div className={styles.tarotCard__name}>{name}</div>
                    <div className={styles.tarotCard__description}>{description}</div>
                </div>
            </div>
        </div>
    );
};

export default TarotCard;
