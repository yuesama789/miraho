import React, { useEffect } from "react";
import styles from "./Modal.module.scss";
import { useModal } from "../../../context/modalContext";

type ModalContent = { title: React.ReactNode; content: React.ReactNode; image?: string; altText?: string; };

const modalMap: Record<string, ModalContent> = {
"project-1": {
    title: <>Interactive Year Review<br />— Web Experience</>,
    content: (
        <>
            <h3>Overview</h3>
            <p>This project was part of a large-scale, consumer-facing web experience designed to visualize a personalized year in review. My focus was on interaction, motion, and translating visual concepts into smooth, intuitive UI behavior.</p>
            <h3>My Role</h3>
            <ul>
                <li>
                    Implementation of scroll-driven animations and transitions
                    </li>
                <li>
                    Development of reusable, motion-ready UI components
                    </li>
                <li>
                    Close collaboration with design to refine interaction and motion details
                </li>
                <li>
                    Performance-aware animation across devices
                </li>
            </ul>            
            <h3>Interaction & Motion</h3>
            <p>
                The experience relies on subtle motion cues, progressive reveals, and scroll-based storytelling to guide users through their content without overwhelming them.
                Animations were designed to feel responsive, calm, and purposeful.
            </p>
            <h3>Tech Stack</h3>
            <p>React · TypeScript · SCSS</p>

        </>
    ),
    image: require("../../../assets/images/endofyear-screenshot.png"),
    altText: "Screenshot of the Interactive Year Review web experience"
},
"project-2": {
    title: "Portfolio 2",
    content: "This is the second portfolio modal content.",
    image: require("../../../assets/images/endofyear-screenshot.png"),
},
// add more modal entries here
};

const Modal: React.FC = () => {

    const { isOpen, closeModal, retrieveModalId } = useModal();

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

    const { title: modalTitle, content: modalContent, image: modalImage, altText } =
    modalMap[retrieveModalId() || 'default'] ?? { title: "Default Title", content: "This is the default modal content." };
    
    return (
        <div className={`${styles.modal} ${isOpen ? styles['modal--open'] : styles['modal--closed']}`}>
            <div className={styles.container}>
                <button className={styles.close} onClick={closeButtonClick}>❌</button>
                <div className={styles.image}><img src={modalImage} alt={altText} /></div>
                <div className={styles.textContent}>
                    <h2 className={styles.title}>{modalTitle}</h2>
                    <p className={styles.content}>{modalContent}</p>
                </div>
            </div>
        </div>
    );
};

export default Modal;
