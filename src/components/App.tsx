import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '@lottiefiles/lottie-player';

import { ModalProvider } from '../context/modalContext';

import PageHeader from './ui/pageheader/Pageheader';
import Section from './ui/section/Section';
import Storybox from './ui/storybox/Storybox';
import Button from './ui/button/Button';
import TeaserContainer from './ui/teaserContainer/TeaserContainer';
import Modal from './ui/modal/Modal';
import BadgeCloud from './ui/badgeCloud/BadgeCloud';

import uiuxCard from '../assets/lottie/uiux-card.json';




const App: React.FC = () => {

    const [lottieInstance, setLottieInstance] = useState<any>(null);
    
    gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

    useEffect(() => {
        ScrollSmoother.create({
            wrapper: '#smooth-wrapper',
            content: '#smooth-content',
            smooth: 1,
            effects: true,
            normalizeScroll: true,
        });
    }, []);

    // Check for lottie instance periodically
    useEffect(() => {
        const checkLottieReady = () => {
            const lottieElement: any = document.querySelector("#uiuxLottie");
            if (lottieElement && lottieElement.getLottie) {
                const instance = lottieElement.getLottie();
                if (instance && instance.totalFrames > 0) {
                    // console.log("Lottie ready with frames:", instance.totalFrames);
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
            const lottieContainer = document.querySelector(".lottie-container");
            const storyboxItemContainer = document.querySelector(".storyboxItem-container");
            const parralaxSection = document.querySelector(".storybox-parralax-section");
            const storyboxItem1 = document.querySelector(".storyboxItem.item-1");
            const storyboxItem2 = document.querySelector(".storyboxItem.item-2");
            const storyboxItem3 = document.querySelector(".storyboxItem.item-3");
            const storyboxItems = [storyboxItem1, storyboxItem2, storyboxItem3];

            // Hide storybox items initially
            storyboxItems.forEach(item => {
                (item as HTMLElement).style.opacity = '0';
            });

            
            if (lottieElement) {
                // const totalFrames = lottieInstance.totalFrames;

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: parralaxSection,
                        start: "top top",
                        end: "bottom top",
                        pin: true,
                        // markers: true,
                        scrub: true,
                        id: "parralax-scroll",
                    },
                    defaults: {duration: 1, ease: "power2.out"}
                });

                tl
                .to(lottieElement, {
                    onUpdate: function() {
                            const progress = this.progress();
                            const frame = Math.floor(progress * (220));
                            lottieInstance.goToAndStop(frame, true);
                    }
                })
                .to(storyboxItemContainer, 
                    {y: -300}
                , "-=.1")
                .to(lottieContainer, 
                    {scale: 0.5, y: -150}, "-=1")
                .to(storyboxItem1, 
                    {opacity: 1, delay: 0.5}, "-=1")
                .to(storyboxItemContainer,
                    {y: -400}, "-=0.5")
                .to(storyboxItem2, 
                    {opacity: 1, delay: 0.5}, "-=1")
                .to(storyboxItemContainer,
                    {y: -500}, "-=0.5")
                .to(storyboxItem3, 
                    {opacity: 1, delay: 0.5}, "-=1"
                )
                .to(storyboxItemContainer,
                    {scrollTrigger: {
                        trigger: parralaxSection,
                        start: "80% bottom",
                        end: "bottom top",
                        pin: true,
                        markers: true,
                        id: "storyboxItem-fadeout-scroll",
                    },
                    opacity: 0}
                );


                return () => {                    
                    tl.kill();
                };
            }
        }
    }, [lottieInstance]);

    const downloadIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-component-line="235"><path d="M12 15V3"></path><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><path d="m7 10 5 5 5-5"></path></svg>
    );
    


    return (
        <ModalProvider>
            <div id="smooth-wrapper">
                <div id="smooth-content">
                    <div className="App">
                        <Section className="section-container" backgroundColor='orange'>
                            <PageHeader />
                        </Section>
                        <Section className="section-container" backgroundColor='pink' title="What I do" description="Things I'm passionate about.">
                            <div className='whatIDoSection'>
                                <div className='storybox-parralax-section'>
                                    <div className='lottie-container'>
                                        <lottie-player
                                            id="uiuxLottie"
                                            src={`data:application/json;base64,${btoa(JSON.stringify(uiuxCard))}`}
                                            background="transparent"
                                            speed="1"
                                            style={{ width: '100%', height: '100%' }}
                                        />
                                    </div>
                                    <div className='storyboxItem-container'>
                                        <div className="storyboxItem item-1">
                                        <Storybox title="Interactions & Motion" bulletPoints={["Microinteractions", "Scroll-Animationen", "Motion Prototyping"]}/>
                                        </div>
                                        <div className="storyboxItem item-2">
                                            <Storybox title="UI Engineering" bulletPoints={["Component-driven development", "Design Systems", "React & TypeScript"]} />
                                        </div>
                                        <div className="storyboxItem item-3">
                                            <Storybox title="Creative Problem Solving" bulletPoints={["I love sparring with design", "Turning concept into experiences", "Visual logic & ideation"]}  />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Section>
                        <Section className="section-container" backgroundColor='pink' title='Skills & Expertise' description='Here is the stuff I can do.'>
                            <BadgeCloud />
                            <div style={{ marginTop: '2rem' }}>
                                <Button type="secondary" onClick={() => alert('Button clicked!')} centered>{downloadIcon} Download CV</Button>
                            </div>
                        </Section>
                        <Section className="section-container" title="Portfolio" description="Some of my recent works.">
                            <TeaserContainer />
                            <Modal />
                        </Section>
                    </div>
                </div>
            </div>
        </ModalProvider>
    );
};

export default App;