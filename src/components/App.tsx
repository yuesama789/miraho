import React, { useEffect, useRef, useState } from 'react';
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
                    console.log("Lottie ready with frames:", instance.totalFrames);
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
        const whatIDoItem1 = document.querySelector(".storyboxItem.item-1");
        const whatIDoItem3 = document.querySelector(".storyboxItem.item-3");
        const whatIDoItem4 = document.querySelector(".storyboxItem.item-4");

        gsap.fromTo(whatIDoItem1,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1,
              scrollTrigger: {
                  trigger: whatIDoItem1,
                    start: "top 90%",
                    end: "bottom 70%",
                    scrub: true,
                    markers: true,
                }
            }
        )
        gsap.fromTo(whatIDoItem3,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1,
                scrollTrigger: {
                    trigger: whatIDoItem3,
                    start: "top 90%",
                    end: "bottom 70%",
                    scrub: true,
                }
            }
        )
        gsap.fromTo(whatIDoItem4,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1,
                scrollTrigger: {
                    trigger: whatIDoItem4,
                    start: "top 90%",
                    end: "bottom 70%",
                    scrub: true,
                }
            }
        );

        if (lottieInstance) {
            const lottieElement: any = document.querySelector("#uiuxLottie");
            const containerElement = document.querySelector(".storyboxItem.item-2");
            
            if (lottieElement && containerElement) {
                // const totalFrames = lottieInstance.totalFrames;
                
                gsap.to(lottieElement, {
                    scrollTrigger: {
                        trigger: containerElement,
                        start: "top top",
                        end: "+=500",
                        pin: true,
                        markers: true,
                        scrub: true,
                        onUpdate: (self) => {
                            const frame = Math.floor(self.progress * 220);
                            lottieInstance.goToAndStop(frame, true);
                        }
                    }
                });
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
                        <Section className="section-container" title="What I do" description="Things I'm passionate about.">
                            <div className='whatIDoSection'>
                                <div className='storybox-parralax-section'>
                                    <div className="storyboxItem item-1">
                                    <Storybox title="Interactions & Motion" bulletPoints={["Microinteractions", "Scroll-Animationen", "Motion Prototyping"]}/>
                                    </div>
                                    <div className='storyboxItem item-2'>
                                        <lottie-player
                                            id="uiuxLottie"
                                            src={`data:application/json;base64,${btoa(JSON.stringify(uiuxCard))}`}
                                            background="transparent"
                                            speed="1"
                                            style={{ width: '100%', height: '100%' }}
                                        />
                                    </div>
                                    <div className="storyboxItem item-3">
                                        <Storybox title="UI Engineering" bulletPoints={["Component-driven development", "Design Systems", "React & TypeScript"]} />
                                    </div>
                                    <div className="storyboxItem item-4">
                                        <Storybox title="Creative Problem Solving" bulletPoints={["I love sparring with design", "Turning concept into experiences", "Visual logic & ideation"]}  />
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