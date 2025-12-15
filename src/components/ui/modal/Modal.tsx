import React, { useEffect } from "react";
import styles from "./Modal.module.scss";
import { useModal } from "../../../context/modalContext";

type ModalContent = { title: React.ReactNode; content: React.ReactNode; contentMobile?: React.ReactNode; image?: string; altText?: string; };

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
            <p style={{fontStyle: "italic"}}>The content shown here is based on anonymized screen recordings and a prototype to respect confidentiality.</p>
        </>
    ),
    contentMobile: (
        <>
            <p>This project was part of a large-scale, consumer-facing web experience designed to visualize a personalized year in review. My focus was on interaction, motion, and translating visual concepts into smooth, intuitive UI behavior.</p>
            <p><strong>Tech Stack:</strong> React · TypeScript · SCSS</p>
        </>
    ),
    image: require("../../../assets/images/endofyear-screenshot.png"),
    altText: "Screenshot of the Interactive Year Review web experience"
},
"project-2": {
    title: <>Interactive Product Experience<br />— Automotive Web Platform</>,
    content: (
        <>
            <h3>Overview</h3>
            <p>This project focused on building interactive, motion-driven product experiences for a high-end consumer website. My work centered on frontend prototyping, component development, and integrating interactive content into a CMS-driven environment.</p>
            
            <h3>My Role</h3>
            <ul>
                <li>Development of interactive frontend prototypes for reusable UI components</li>
                <li>Implementation of scroll-driven storytelling, including video-controlled scrolling</li>
                <li>Building interactive components to visualize different product lines and configurations</li>
                <li>Integration of components and logic into a CMS-based system</li>
                <li>Close collaboration with design to translate concepts into functional UI behavior</li>
            </ul>
            
            <h3>Interaction & Motion</h3>
            <p>Motion and scrolling were used as core interaction patterns to guide users through complex product information. Scroll-based video control and animated components helped create a fluid, immersive experience while maintaining clarity and performance.</p>
            
            <h3>Tech Stack</h3>
            <p>Twig.js · Vanilla JavaScript · GSAP · SCSS · Storybook · Pimcore CMS</p>
            
            <p style={{fontStyle: "italic"}}>The live website is publicly accessible. The work shown reflects my contribution to frontend prototyping, interaction logic, and CMS integration.</p>
        </>
    ),
    contentMobile: (
        <>
            <p>This project focused on building interactive, motion-driven product experiences for a high-end consumer website. My work centered on frontend prototyping, component development, and integrating interactive content into a CMS-driven environment.</p>
            <p><strong>Tech Stack:</strong> Twig.js · Vanilla JavaScript · GSAP · SCSS · Storybook · Pimcore CMS</p>
        </>
    ),
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

    const isMobile = window.innerWidth < 768;
    const modalData = modalMap[retrieveModalId() || 'default'] ?? { title: "Default Title", content: "This is the default modal content." };
    const { title: modalTitle, content: modalContent, contentMobile, image: modalImage, altText } = modalData;
    const displayContent = isMobile && contentMobile ? contentMobile : modalContent;
    
    return (
        <div className={`${styles.modal} ${isOpen ? styles['modal--open'] : styles['modal--closed']}`}>
            <div className={styles.container}>
                <button className={styles.close} onClick={closeButtonClick}>❌</button>
                <div className={styles.image}><img src={modalImage} alt={altText} /></div>
                <div className={styles.textContent}>
                    <h2 className={styles.title}>{modalTitle}</h2>
                    <p className={styles.content}>{displayContent}</p>
                </div>
            </div>
        </div>
    );
};

export default Modal;
