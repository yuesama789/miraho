import React from "react";
import styles from './Button.module.scss';

const Button: React.FC<{ onClick: () => void, type?: "primary" | "secondary" }> = ({ onClick, children, type = "primary" }) => {
    return (
        <button className={`${styles.customButton} ${styles[type]}`} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
