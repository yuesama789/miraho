import React from "react";
import Teaser from "../teaser/Teaser";
import styles from "./TeaserContainer.module.scss";

const TeaserContainer: React.FC = () => {
    return (
        <div className={styles.teaserContainer}>
            <Teaser id="project-1" title="Project 1" text="Description of project 1" />
            <Teaser id="project-2" title="Project 2" text="Description of project 2" />
            <Teaser id="project-3" title="Project 3" text="Description of project 3" />
        </div>
    );
};

export default TeaserContainer;
