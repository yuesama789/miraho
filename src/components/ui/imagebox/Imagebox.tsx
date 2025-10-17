import React from 'react';
import styles from './Imagebox.module.scss';

interface ImageboxProps {
    src: string;
    alt: string;
    className?: string;
}

const Imagebox: React.FC<ImageboxProps> = ({
    src,
    alt,
    className,
}) => {
    return (
        <div className={styles.imagebox + (className ? ` ${className}` : '')}>
            <img
                src={src}
                alt={alt}
                loading="lazy"
            />
        </div>
    );
};

export default Imagebox;