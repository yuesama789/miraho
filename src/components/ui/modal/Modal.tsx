import React from "react";
import styles from "./Modal.module.scss";
import { useModal } from "../../../context/modalContext";

const Modal: React.FC<{ id: string }> = ({ id }) => {

    const { isOpen, closeModal } = useModal();

    const closeButtonClick = () => {
        isOpen && closeModal();
    }

    return (
        <div className={`${styles.modal} ${isOpen ? styles['modal--open'] : styles['modal--closed']}`}>
            <div className={styles.container}>
            <div className={styles.close} onClick={closeButtonClick}>❌</div>
            <h2 className={styles.title}>Modal Title</h2>
            <p className={styles.content}>This is the modal content.</p>
            </div>
        </div>
    );
};

export default Modal;
