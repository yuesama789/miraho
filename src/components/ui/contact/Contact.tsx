import React from 'react';
import styles from './Contact.module.scss';
import Button from '../button/Button';
import { useLanguage } from '../../../context/languageContext';

const Contact: React.FC = () => {
    const { t } = useLanguage();

    const handleContact = (url: string) => {
        window.location.href = url;
    };

    const linkedInSvg = (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
    );

    const mailSvg = (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
    );

    return (
        <div className={styles.contact}>
            <div className={styles.contact__text}>
                <p>{t.contact.description1}</p>
                <h3><a href={`mailto:${t.contact.description2}`}>{t.contact.description2}</a></h3>
                <br></br>
                <p>{t.contact.description3}</p>
            </div>
            <div className={styles.buttons} >
                <Button type="secondary" link="https://www.linkedin.com/in/mira-hong-nguyen-ho-12ba63232/">
                    {linkedInSvg} LinkedIn
                </Button>
                <Button type="primary" onClick={() => handleContact('mailto:your-email@example.com')}>
                    {mailSvg} {t.buttons.contactMe}
                </Button>
            </div>
        </div>
    );
};

export default Contact;
