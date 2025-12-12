import React, { useEffect } from 'react';
import PageHeader from './ui/pageheader/Pageheader';
import Section from './ui/section/Section';
import Storybox from './ui/storybox/Storybox';
//import Imagebox from './ui/imagebox/Imagebox';
import Button from './ui/button/Button';


//import ImageboxImage from '../assets/images/MiraHo.jpg';
import TeaserContainer from './ui/teaserContainer/TeaserContainer';
import Modal from './ui/modal/Modal';
import { ModalProvider } from '../context/modalContext';
import BadgeCloud from './ui/badgeCloud/BadgeCloud';

import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';



const App: React.FC = () => {

    
gsap.registerPlugin(ScrollSmoother);

useEffect(() => {
    ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1,
        effects: true,
        normalizeScroll: true,
    });
}, []);

/*     useEffect(() => {
        // Wait for DOM to be ready
        const initScrollTrigger = () => {
            ScrollTrigger.create({
                start: 0,
                end: "max",
                markers: true,
                snap: {
                    snapTo: [0, 1/3, 2/3, 1],
                    duration: 0.5,
                    ease: "power1.inOut",
                    delay: 0.5,
                    directional: true
                }
            });

            ScrollTrigger.normalizeScroll(true);
        };

        // Small delay to ensure DOM is ready
        const timeoutId = setTimeout(initScrollTrigger, 0);

        return () => {
            clearTimeout(timeoutId);
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []); */



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
                        <Section className="section-container" title="My Story" description="A brief overview of my journey.">
                            <div className='my-story-container'>
                                <div>
                                    <Storybox title="Interactions & Motion" bulletPoints={["Microinteractions", "Scroll-Animationen", "Motion Prototyping"]}/>
                                    <Storybox title="UI Engineering" bulletPoints={["Component-driven development", "Design Systems", "React & TypeScript"]} />
                                    <Storybox title="Creative Problem Solving" bulletPoints={["I love sparring with design", "Turning concept into experiences", "Visual logic & ideation"]}  />
                                </div>
                                {/*<Imagebox src={ImageboxImage} alt="Description of image" className="custom-class" />*/}
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