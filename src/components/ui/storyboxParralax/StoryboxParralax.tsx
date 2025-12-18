import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import '@lottiefiles/lottie-player';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Storybox from '../storybox/Storybox';
import uiuxCard from '../../../assets/lottie/uiux-card.json';
import styles from './StoryboxParralax.module.scss';

const StoryboxParralax: React.FC = () => {
    const [lottieInstance, setLottieInstance] = useState<any>(null);
    const parralaxSectionRef = useRef<HTMLDivElement>(null);
    const lottieContainerRef = useRef<HTMLDivElement>(null);
    const storyboxItemContainerRef = useRef<HTMLDivElement>(null);
    const storyboxItem1Ref = useRef<HTMLDivElement>(null);
    const storyboxItem2Ref = useRef<HTMLDivElement>(null);
    const storyboxItem3Ref = useRef<HTMLDivElement>(null);

    const isMobile = () => {
        return window.innerHeight > window.innerWidth && window.innerWidth < 600;
    };

    // Check for lottie instance periodically
    useEffect(() => {
        const checkLottieReady = () => {
            const lottieElement: any = document.querySelector("#uiuxLottie");
            if (lottieElement && lottieElement.getLottie) {
                const instance = lottieElement.getLottie();
                if (instance && instance.totalFrames > 0) {
                    setLottieInstance(instance);
                    return true;
                }
            }
            return false;
        };

        // Try immediately
        if (!checkLottieReady()) {
            // If not ready, poll every 100ms
            const interval = setInterval(() => {
                if (checkLottieReady()) {
                    clearInterval(interval);
                }
            }, 100);

            return () => clearInterval(interval);
        }
    }, []);

    // Initialize scroll trigger when lottie instance is ready
    useEffect(() => {
        if (lottieInstance) {
            const lottieElement: any = document.querySelector("#uiuxLottie");
            const lottieContainer = lottieContainerRef.current;
            const storyboxItemContainer = storyboxItemContainerRef.current;
            const parralaxSection = parralaxSectionRef.current;
            const storyboxItem1 = storyboxItem1Ref.current;
            const storyboxItem2 = storyboxItem2Ref.current;
            const storyboxItem3 = storyboxItem3Ref.current;
            const storyboxItems = [storyboxItem1, storyboxItem2, storyboxItem3];

            

            if (isMobile()) {
                gsap.set(storyboxItemContainer, { opacity: 0, y: '10%'});
                gsap.set(lottieContainer, { y: '-10%'});

            } else {
                // Hide storybox items initially
                storyboxItems.forEach(item => {
                    gsap.set(item, { opacity: 0, x: '20%'});
                });

                //tweak parralax section margin for desktop
                gsap.set(parralaxSection, { marginBottom: '-60dvh'});

                gsap.set(lottieContainer, { y: '-5%'});
            }

            if (lottieElement) {
     

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: parralaxSection,
                        start: () => isMobile() ? "top 10%" : "top top",
                        end: "bottom top",
                        // markers: true,
                        scrub: true,
                        id: "parralax-scroll",
                        onUpdate: (self) => {
                            const progress = self.progress;
                            const frame = Math.floor(progress * 220);
                            lottieInstance.goToAndStop(frame, true);
                        }
                    },
                    defaults: { duration: 1, ease: "power2.out" }
                });

                if (isMobile()) {
                    tl
                        .to(lottieContainer,
                            { width: '80dvw' }, '<')
                        .to(storyboxItemContainer,
                            { y: '-10%', opacity: 1 }, "<");
                } else {
                    tl
                        .to(lottieContainer,
                            { height: '40dvh' }, '<')
                        .to(storyboxItem1,
                            { opacity: 1, x: '0%' }, "<0.3")
                        .to(storyboxItem2,
                            { opacity: 1, x: '0%' }, "<0.3")
                        .to(storyboxItem3,
                            { opacity: 1, x: '0%' }, "<0.3"
                        );
                }

                return () => {
                    tl.kill();
                };
            }
        }
    }, [lottieInstance]);

    return (
            <div ref={parralaxSectionRef} className={styles.storyboxParralaxSection}>
                <div ref={lottieContainerRef} className={styles.lottieContainer}
                    style={{ maxWidth: '100%', maxHeight: '100%', margin: '0 auto'}}>
                    <lottie-player
                        id="uiuxLottie"
                        src={`data:application/json;base64,${btoa(JSON.stringify(uiuxCard))}`}
                        background="transparent"
                        speed="1"
                        style={{ maxWidth: '100dvw', maxHeight: '100dvh', width: '100%', height: '100%', aspectRatio: '107 / 91' }}
                    />
                </div>
                <div ref={storyboxItemContainerRef} className={styles.storyboxItemContainer}>
                    <div ref={storyboxItem1Ref} className={styles.storyboxItem}>
                        <Storybox title="Interactions & Motion" bulletPoints={["Microinteractions", "Scroll-Animationen", "Motion Prototyping"]} />
                    </div>
                    <div ref={storyboxItem2Ref} className={styles.storyboxItem}>
                        <Storybox title="UI Engineering" bulletPoints={["Component-driven development", "Design Systems", "React & TypeScript"]} />
                    </div>
                    <div ref={storyboxItem3Ref} className={styles.storyboxItem}>
                        <Storybox title="Creative Problem Solving" bulletPoints={["I love sparring with design", "Turning concept into experiences", "Visual logic & ideation"]} />
                    </div>
                </div>
            </div>
    );
};

export default StoryboxParralax;
