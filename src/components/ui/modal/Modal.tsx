import React from "react";
import styles from "./Modal.module.scss";
import { useModal } from "../../../context/modalContext";

type ModalContent = { title: string; content: React.ReactNode };

const modalMap: Record<string, ModalContent> = {
"project-1": {
    title: "Portfolio 1",
    content: "This is the portfolio modal content.",
},
// add more modal entries here
};

const Modal: React.FC = () => {

    const { isOpen, closeModal, retrieveModalId } = useModal();

    const closeButtonClick = () => {
        isOpen && closeModal();
    }

    const { title: modalTitle, content: modalContent } =
    modalMap[retrieveModalId() || 'default'] ?? { title: "Default Title", content: "This is the default modal content." };
    
    return (
        <div className={`${styles.modal} ${isOpen ? styles['modal--open'] : styles['modal--closed']}`}>
            <div className={styles.container}>
            <div className={styles.close} onClick={closeButtonClick}>❌</div>
            <h2 className={styles.title}>{modalTitle}</h2>
            <p className={styles.content}>{modalContent}</p>
            </div>
        </div>
    );
};

export default Modal;
