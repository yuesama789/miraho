import React, { useEffect } from "react";
import styles from "./Modal.module.scss";
import { useModal } from "../../../context/modalContext";
import { useLanguage } from "../../../context/languageContext";

const Modal: React.FC = () => {

    const { isOpen, closeModal, retrieveModalId } = useModal();
    const { t } = useLanguage();

    const isDisplayVertical = () => {
        return window.innerHeight > window.innerWidth;
    }

    // Disable body scroll when modal is open
    useEffect(() => {
        const wrapper = document.querySelector('#smooth-wrapper') as HTMLElement;
        
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            if (wrapper) {
                wrapper.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                wrapper.style.transform = 'translateX(-100dvh)';
            }
        } else {
                document.body.style.overflow = '';
                if (wrapper) {
                    wrapper.style.transform = '';
                }
        }
    }, [isOpen]);

    const closeButtonClick = () => {
        isOpen && closeModal();
    }

    const isMobile = window.innerWidth < 768;
    const modalId = retrieveModalId() || 'project-1';
    const modalData = t.modals[modalId as keyof typeof t.modals];
    
    if (!modalData) {
        return null;
    }

    const { title, overview, myRole, interactionMotion, techStack, note, contentMobile, media } = modalData;
    
    // Build desktop content
    const desktopContent = (
        <>
            <h3>{t.modalSections.overview}</h3>
            <p>{overview}</p>
            <h3>{t.modalSections.myRole}</h3>
            <ul>
                {myRole.map((role: string, index: number) => (
                    <li key={index}>{role}</li>
                ))}
            </ul>
            <h3>{t.modalSections.interactionMotion}</h3>
            <p>{interactionMotion}</p>
            <h3>{t.modalSections.techStack}</h3>
            <p>{techStack}</p>
            {note && <p style={{fontStyle: "italic"}}>{note}</p>}
        </>
    );
    
    // Build mobile content
    const mobileContent = (
        <>
            <p>{contentMobile}</p>
            <p><strong>Tech Stack:</strong> {techStack}</p>
        </>
    );
    
    const displayContent = isMobile ? mobileContent : desktopContent;
    const mediaPath = media ? require(`../../../assets/videos/${media}--mobile.mp4`) : null;
    
    return (
        <div className={`${styles.modal} ${isOpen ? styles['modal--open'] : styles['modal--closed']}`}>
            <div className={styles.container}>
                <button className={styles.close} onClick={closeButtonClick}>❌</button>
                {!isDisplayVertical() && mediaPath && 
                    <div className={styles.video}>
                        <video
                        src={mediaPath} muted loop controls={true}  />
                    </div>
                }
                <div className={styles.textContent}>
                    <h2 className={styles.title}>{title}</h2>
                    <div className={styles.content}>{displayContent}</div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
