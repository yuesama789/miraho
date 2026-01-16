import React from 'react';
import styles from './Contact.module.scss';
import Button from '../button/Button';
import { useLanguage } from '../../../context/languageContext';

const Contact: React.FC = () => {
    const { t } = useLanguage();

    const handleContact = () => {
        window.location.href = 'mailto:your-email@example.com';
    };

    return (
        <div className={styles.contact}>
            <Button type="primary" onClick={handleContact} centered>
                {t.buttons.contactMe}
            </Button>
        </div>
    );
};

export default Contact;
