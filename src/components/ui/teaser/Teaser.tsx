import React from "react";
import styles from "./Teaser.module.scss";
import Button from "../button/Button";
import { useModal } from "../../../context/modalContext";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface TeaserProps {
    title: string;
    mediaType?: "image" | "video";
    mediaPath?: string;
    id: string;
    backgroundColor?: string;
}

const Teaser: React.FC<TeaserProps> = ({ title, mediaPath, mediaType = "image", id, backgroundColor }) => {

    gsap.registerPlugin(ScrollTrigger);

    const headerRef = React.useRef<HTMLHeadingElement | null>(null);
    const buttonRef = React.useRef<HTMLDivElement | null>(null);
    const teaserRef = React.useRef<HTMLDivElement | null>(null);
    const mediaRef = React.useRef<HTMLDivElement | null>(null);

    const { openModal, setModalId } = useModal();

    const handleReadMore = () => {
        setModalId(id);
        openModal();
    };

    useGSAP(() => {
        if (!teaserRef.current) return;

        console.log(teaserRef.current.offsetHeight)

        // Animate h3 entrance
        gsap.fromTo(headerRef.current, 
            { y: 0, opacity: 0 }, 
            {
                y: 300,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: teaserRef.current,
                    start: () => teaserRef.current!.offsetHeight < window.innerHeight ? "top top" : "bottom bottom",
                    end: "bottom 60%",
                    toggleActions: "play none none reverse",
                    // markers: true
                }
            }
        );

        gsap.to(mediaRef.current, {
            scale: 0.5,
            y: 100,
            ease: "none",
            scrollTrigger: {
                trigger: teaserRef.current,
                start: "top 80%",
                end: "bottom bottom",
                scrub: true,
                markers: true
            },
        }
        );

        // Animate button entrance (slightly delayed)
        gsap.fromTo(buttonRef.current, 
            { y: 20, opacity: 0 }, 
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: teaserRef.current,
                    start: () => teaserRef.current!.offsetHeight < window.innerHeight ? "top top" : "bottom bottom",
                    end: "bottom 60%",
                    toggleActions: "play none none reverse",
                    // markers: true
                }
            }
        );
    }, []);

    return (
        <div className={`${styles.teaser} ${backgroundColor ? styles[`background-${backgroundColor}`] : ''}`} ref={teaserRef} data-teaser>
            <div ref={mediaRef}>
                {mediaType === "image" &&
                <img src={mediaPath ? mediaPath : "https://placehold.co/1600x1100"} alt={title} className={styles.image} />
                }
                {mediaType === "video" &&
                    <video src={mediaPath} no-controls autoPlay muted loop className={styles.video} />
                }
            </div>
            <h3 ref={headerRef}>{title}</h3>
            <div className={styles.teaser__button} ref={buttonRef}>
                <Button type="tertiary" onClick={handleReadMore}>Read more</Button>
            </div>
        </div>
    );
};

export default Teaser;