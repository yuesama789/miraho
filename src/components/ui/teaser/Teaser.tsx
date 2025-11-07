import React from "react";
import styles from "./Teaser.module.scss";
import Button from "../button/Button";
import { useModal } from "../../../context/modalContext";

interface TeaserProps {
    title: string;
    text: string;
    imgPath?: string;
    id: string;
}

const Teaser: React.FC<TeaserProps> = ({ title, text = "", imgPath, id }) => {

    const { openModal, setModalId } = useModal();

    const handleReadMore = () => {
        setModalId(id);
        openModal();
    };

    return (
        <div className={styles.teaser}>
            <img src={imgPath ? imgPath : "https://placehold.co/600x400"} alt={title} className={styles.image} />
            <h3>{title}</h3>
            <p>{text}</p>
            <Button type="tertiary" onClick={handleReadMore}>Read more</Button>
        </div>
    );
};

export default Teaser;