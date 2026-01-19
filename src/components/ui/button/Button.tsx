import React from "react";
import styles from './Button.module.scss';

const Button: React.FC<{ onClick?: () => void, type?: "primary" | "secondary" | "tertiary", centered?: boolean, link?: string }> = ({ onClick, children, type = "primary", centered, link }) => {
    const className = `${styles.customButton} ${styles[type]} ${centered ? styles.centered : ''}`;
    
    if (link) {
        return (
            <button className={className}>
                <a href={link} target="_blank" rel="noopener noreferrer">
                    {children}
                </a>
            </button>
        );
    } else {
        return (
            <button className={className} onClick={onClick}>
                {children}
            </button>
        );
    }
};

export default Button;
