import React, { useEffect } from "react";
import Teaser from "../teaser/Teaser";
import styles from "./TeaserContainer.module.scss";
import endOfYearVideo from "../../../assets/videos/endofyear2024.mp4";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


const TeaserContainer: React.FC<{ backgroundColor?: string }> = (
    { backgroundColor }
) => {
    
    gsap.registerPlugin(ScrollTrigger);

    useEffect(() => {
        const teaserContainer = document.querySelector(`[data-teaser]`);
        const teaserContainerHeight = teaserContainer?.clientHeight || 0;
        console.log("Teaser Container Height:", teaserContainerHeight);

        if (!teaserContainer) return;
        let panels = Array.from(teaserContainer.querySelectorAll<HTMLDivElement>(`div[data-teaser]`));
        console.log(panels);


        panels.forEach((panel, i) => {
        // console.log(panel.offsetHeight, window.innerHeight);
            ScrollTrigger.create({
                trigger: panel,
                start: () => panel.offsetHeight < window.innerHeight ? "top top" : "bottom bottom", 
                // if it's shorter than the viewport, we prefer to pin it at the top
                end: "bottom top",
                id: `teaser-panel-${i}`,
                markers: true,
                pin: true,
                scrub: 1,
                pinSpacing: true
            })
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div className={styles.teaserContainer} data-teaser>
            <Teaser id="project-1" title="Jahresrückblick" mediaType="video" mediaPath={endOfYearVideo} backgroundColor={backgroundColor} />
            <Teaser id="project-2" title="Project 2" backgroundColor={backgroundColor} />
            <Teaser id="project-3" title="Project 3" backgroundColor={backgroundColor} />
        </div>
    );
};

export default TeaserContainer;
