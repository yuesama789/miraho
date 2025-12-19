import React from 'react';
import { useLanguage } from '../../../context/languageContext';
import styles from './LanguageSwitch.module.scss';

const LanguageSwitch: React.FC = () => {
    const { locale, setLocale } = useLanguage();

    const toggleLanguage = () => {
        setLocale(locale === 'en' ? 'de' : 'en');
    };

    return (
        <div className={styles.languageSwitch}>
            <span className={locale === 'en' ? styles.active : ''}>EN</span>
            <div className={styles.languageSwitchInner}>
                <div className={styles.toggleSwitch} onClick={toggleLanguage} aria-label="Toggle language">
                    <div className={locale === 'en' ? styles.toggleCircleLeft : styles.toggleCircleRight} />
                </div>
            </div>
            <span className={locale === 'de' ? styles.active : ''}>DE</span>

        </div>
    );
};

export default LanguageSwitch;
