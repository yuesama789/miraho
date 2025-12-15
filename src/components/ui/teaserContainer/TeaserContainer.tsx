import React, { useEffect } from "react";
import Teaser from "../teaser/Teaser";
import styles from "./TeaserContainer.module.scss";
import endOfYearVideo_desktop from "../../../assets/videos/endofyear2024--desktop.mp4";
import endOfYearVideo_mobile from "../../../assets/videos/endofyear2024--mobile.mp4";
import hymerVideo from "../../../assets/videos/hymer.mp4";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


const TeaserContainer: React.FC<{ backgroundColor?: string }> = (
    { backgroundColor }
) => {
    
    gsap.registerPlugin(ScrollTrigger);

    const isDeviceVertical = () => {
        return window.innerHeight > window.innerWidth;
    }

    useEffect(() => {
        const teaserContainer = document.querySelector(`[data-teaser]`);
        const teaserContainerHeight = teaserContainer?.clientHeight || 0;
        console.log("Teaser Container Height:", teaserContainerHeight);

        if (!teaserContainer) return;
        let panels = Array.from(teaserContainer.querySelectorAll<HTMLDivElement>(`div[data-teaser]`));
        // console.log(panels);


        panels.forEach((panel, i) => {
        // console.log(panel.offsetHeight, window.innerHeight);
            ScrollTrigger.create({
                trigger: panel,
                start: () => panel.offsetHeight < window.innerHeight ? "top top" : "bottom bottom", 
                // if it's shorter than the viewport, we prefer to pin it at the top
                end: "bottom top",
                id: `teaser-panel-${i}`,
                // markers: true,
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
            <Teaser id="project-1" title="Jahresrückblick" mediaType="video" mediaPath={isDeviceVertical() ? endOfYearVideo_mobile : endOfYearVideo_desktop} backgroundColor={backgroundColor} />
            <Teaser id="project-2" title="Produktseite" mediaType="video" mediaPath={hymerVideo} backgroundColor={backgroundColor} />
            <Teaser id="project-3" title="Project 3" backgroundColor={backgroundColor} />
        </div>
    );
};

export default TeaserContainer;
