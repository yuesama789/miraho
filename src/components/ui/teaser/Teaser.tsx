import React from "react";
import styles from "./Teaser.module.scss";
import Button from "../button/Button";
import { useModal } from "../../../context/modalContext";

interface TeaserProps {
    title: string;
    imgPath?: string;
    id: string;
}

const Teaser: React.FC<TeaserProps> = ({ title, imgPath, id }) => {

    const { openModal, setModalId } = useModal();

    const handleReadMore = () => {
        setModalId(id);
        openModal();
    };

    return (
        <div className={styles.teaser}>
            <img src={imgPath ? imgPath : "https://placehold.co/1600x1100"} alt={title} className={styles.image} />
            <h3>{title}</h3>
            <div className={styles.teaser__button}>
                <Button type="tertiary" onClick={handleReadMore}>Read more</Button>
            </div>
        </div>
    );
};

export default Teaser;