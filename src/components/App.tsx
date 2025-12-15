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
import CustomCursor from './ui/customCursor/CustomCursor';

import uiuxCard from '../assets/lottie/uiux-card.json';




const App: React.FC = () => {

    const [lottieInstance, setLottieInstance] = useState<any>(null);
    
    gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

    const isDeviceVertical = () => {
        return window.innerHeight > window.innerWidth;
    }

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
            if (!isDeviceVertical()){
                storyboxItems.forEach(item => {
                    (item as HTMLElement).style.opacity = '0';
                });
            }

            
            if (lottieElement) {
                // const totalFrames = lottieInstance.totalFrames;

                let storyItemSteps: string[];
                let lottieItemY: string;
                if (isDeviceVertical()) { 
                    storyItemSteps = ['-30dvh', '-30dvh', '-30dvh'];
                    lottieItemY = '-15dvh';
                } else {
                    storyItemSteps = ['-50dvh', '-70dvh', '-80dvh'];
                    lottieItemY = '-30dvh';
                }


                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: parralaxSection,
                        start: () => isDeviceVertical() ? "top 10%" : "top top",
                        end: "bottom top",
                        pin: true,
                        pinSpacing: false,
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
                    {y: storyItemSteps[0]}
                , "-=.1")
                .to(lottieContainer, 
                    {scale: () => isDeviceVertical() ? 1 : .5, y: lottieItemY}, "-=1")
                .to(storyboxItem1, 
                    {opacity: 1}, "-=1")
                .to(storyboxItemContainer,
                    {y: storyItemSteps[1]}, "-=0.5")
                .to(storyboxItem2, 
                    {opacity: 1}, "-=1")
                .to(storyboxItemContainer,
                    {y: storyItemSteps[2]}, "-=0.5")
                .to(storyboxItem3, 
                    {opacity: 1}, "-=1"
                )
                ;


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
            <CustomCursor />
            <div id="smooth-wrapper">
                <div id="smooth-content">
                    <div className="App">
                        <Section className="section-container" backgroundColor='orange'>
                            <PageHeader />
                        </Section>
                        <Section className="section-container" backgroundColor='pink' title="What I do" description="Things I'm passionate about." pinnedTitle={true} needExtraSpaceAfterPinnedTitle={true}>
                            <div className='whatIDoSection'>
                                <div className='storybox-parralax-section' style={{marginBottom:'100dvh'}}>
                                    <div className='lottie-container' 
                                            style={{ maxWidth: '100%', maxHeight: '100%' }}>
                                        <lottie-player
                                            id="uiuxLottie"
                                            src={`data:application/json;base64,${btoa(JSON.stringify(uiuxCard))}`}
                                            background="transparent"
                                            speed="1"
                                            style={{  maxWidth: '100dvw', maxHeight: '100dvh', width: '100%', height:'100%', aspectRatio: '107 / 91' }}
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
                        <Section className="section-container" pinnedTitle={true} fullWidth={true} backgroundColor='purple' title="Mini-Showcase" description="A selection of my work.">
                            <TeaserContainer backgroundColor='purple' />
                        </Section>
                        <Section className="section-container" backgroundColor='orange' title='How I Work' description='This is how my brain is wired.'>
                            <div><ul>
                                <li>User-Centered Design: I prioritize user needs and behaviors in every project.</li>
                                <li>Agile Methodology: I embrace iterative development and continuous feedback.</li>
                                <li>Collaboration: I work closely with cross-functional teams to achieve the best results.</li>
                            </ul></div>
                        </Section>
                        <Section className="section-container" backgroundColor='pink' title='Skills & Expertise' description='Some of the tools and technologies I excel in.'>
                            <BadgeCloud />
                            <div style={{ marginTop: '2rem' }}>
                                <Button type="secondary" onClick={() => alert('Button clicked!')} centered>{downloadIcon} Download CV</Button>
                            </div>
                        </Section>
                        <Section className="section-container" backgroundColor='purple' title='About Me' description='A brief introduction.'>
                            <div>Hello! I'm Mira Ho, an Interaction-Focused UI Developer & Design Engineer. I specialize in creating engaging digital experiences through thoughtful design and seamless interactions. With a passion for both aesthetics and functionality, I strive to bring ideas to life in ways that resonate with users.</div>
                        </Section>
                        <Section className="section-container" backgroundColor='orange' title='Let’s Connect!' description='I’m always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to reach out!'>
                            <Button type="primary" onClick={() => alert('Button clicked!')} centered>Contact Me</Button>
                        </Section>
                        <Section className="section-container" backgroundColor='purple'>
                            <footer style={{ textAlign: 'center', padding: '1rem', fontSize: '0.9rem', color: '#666' }}>
                                &copy; {new Date().getFullYear()} Mira Ho. All rights reserved.
                            </footer>
                        </Section>
                    </div>
                </div>
            </div>
            <Modal />
        </ModalProvider>
    );
};

export default App;