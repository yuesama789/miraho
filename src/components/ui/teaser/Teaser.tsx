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

    const isMobile = () => {
        return window.innerHeight > window.innerWidth && window.innerWidth < 600;
    }


    const headerRef = React.useRef<HTMLHeadingElement | null>(null);
    const buttonRef = React.useRef<HTMLDivElement | null>(null);
    const teaserRef = React.useRef<HTMLDivElement | null>(null);
    const mediaRef = React.useRef<HTMLDivElement | null>(null);
    const videoRef = React.useRef<HTMLVideoElement | null>(null);

    
    const scaleMedia = isMobile() ? .7 : .5;


    const { openModal, setModalId } = useModal();

    const handleReadMore = () => {
        setModalId(id);
        openModal();
    };

    useGSAP(() => {
        if (!teaserRef.current) return;

        const initAnimations = () => {
            const videoWidth = videoRef.current?.offsetWidth || 0;
            const videoHeight = videoRef.current?.offsetHeight || 0;

            const textXOffset = () => {
                return (window.innerWidth - videoWidth * scaleMedia) / 2;
            };

            const textYOffset = () => {
                return (window.innerHeight - videoHeight * scaleMedia) / 2;
            };

            gsap.set([headerRef.current, buttonRef.current], { opacity: 0 });

            if (isMobile()) {
                gsap.set(headerRef.current, { y: textYOffset() * 1.5 });
                gsap.set(buttonRef.current, { y: textYOffset() * -1 * .3 });
            } else {
                gsap.set(headerRef.current, { y: textYOffset() });
                gsap.set(buttonRef.current, { y: textYOffset() * -1 * .5 });
            }


            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: teaserRef.current,
                    start: "5% top",
                    end: "bottom center",
                    scrub: true,
                    // markers: true
                }
            });

            tl
                // Animate media scaling on scroll
                .to(mediaRef.current, {
                    scale: () => scaleMedia,
                    y: () => isMobile() ? '7dvh' : '5dvh',
                    ease: "none",
                })

                // Animate h3 entrance
                .to(headerRef.current,
                    {
                        x: textXOffset(),
                        opacity: 1,
                    })

                // Animate button entrance
                .to(buttonRef.current,
                    {
                        x: -textXOffset(),
                        opacity: 1,
                    },
                    "<"
                );
        };

        // Auto-play video when in view
        if (mediaType === "video" && videoRef.current) {
            // Wait for video metadata to load before initializing animations
            videoRef.current.addEventListener('loadedmetadata', initAnimations, { once: true });
            
            ScrollTrigger.create({
                trigger: teaserRef.current,
                start: "top 80%",
                end: "bottom top",
                // markers:true,
                onEnter: () => videoRef.current?.play(),
                onLeave: () => videoRef.current?.pause(),
                onEnterBack: () => videoRef.current?.play(),
                onLeaveBack: () => videoRef.current?.pause(),
            });
        } else {
            // For images, initialize immediately
            initAnimations();
        }
    }, []);

    return (
        <div className={`${styles.teaser} ${backgroundColor ? styles[`background-${backgroundColor}`] : ''}`} ref={teaserRef} data-teaser>
            <div ref={mediaRef}>
                {mediaType === "image" &&
                <img src={mediaPath ? mediaPath : "https://placehold.co/1920x1090"} alt={title} className={styles.image} />
                }
                {mediaType === "video" &&
                    <video 
                    ref={videoRef}
                    src={mediaPath} controls={false} muted loop className={styles.video} />
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