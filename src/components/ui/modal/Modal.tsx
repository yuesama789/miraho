import React, { useState } from "react";
import styles from "./Modal.module.scss";

const Modal: React.FC = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.modal}>
            <div className={styles.backdrop} onClick={() => setIsOpen(false)}></div>
            <h2 className={styles.title}>Modal Title</h2>
            <p className={styles.content}>This is the modal content.</p>
        </div>
    );
};

export default Modal;
