import React from "react";
import Teaser from "../teaser/Teaser";
import styles from "./TeaserContainer.module.scss";

const TeaserContainer: React.FC = () => {
    return (
        <div className={styles.teaserContainer}>
            <Teaser title="Project 1" text="Description of project 1" />
            <Teaser title="Project 2" text="Description of project 2" />
            <Teaser title="Project 3" text="Description of project 3" />
        </div>
    );
};

export default TeaserContainer;
