import React from 'react';
import PageHeader from './ui/pageheader/Pageheader';
import Section from './ui/section/Section';
import Storybox from './ui/storybox/Storybox';
//import Imagebox from './ui/imagebox/Imagebox';
import Button from './ui/button/Button';
import { motion, useScroll, useSpring } from 'framer-motion';


//import ImageboxImage from '../assets/images/MiraHo.jpg';
import TeaserContainer from './ui/teaserContainer/TeaserContainer';
import Modal from './ui/modal/Modal';
import { ModalProvider } from '../context/modalContext';
import BadgeCloud from './ui/badgeCloud/BadgeCloud';

const App: React.FC = () => {


    const downloadIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-component-line="235"><path d="M12 15V3"></path><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><path d="m7 10 5 5 5-5"></path></svg>
    );

    const { scrollYProgress } = useScroll()
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    return (
        <ModalProvider>
            <div className="App">
                <PageHeader />
                <Section scrollTelling={true} title="My Story" description="A brief overview of my journey.">
                    <div className='my-story-container'>
                        <div>
                            <Storybox title="Interactions & Motion" bulletPoints={["Microinteractions", "Scroll-Animationen", "Motion Prototyping"]}/>
                            <Storybox title="UI Engineering" bulletPoints={["Component-driven development", "Design Systems", "React & TypeScript"]} />
                            <Storybox title="Creative Problem Solving" bulletPoints={["I love sparring with design", "Turning concept into experiences", "Visual logic & ideation"]}  />
                        </div>
                        {/*<Imagebox src={ImageboxImage} alt="Description of image" className="custom-class" />*/}
                    </div>
                </Section>
                <Section backgroundColor='pink' title='Skills & Expertise' description='Here is the stuff I can do.'>
                    <BadgeCloud />
                    <div style={{ marginTop: '2rem' }}>
                        <Button type="secondary" onClick={() => alert('Button clicked!')} centered>{downloadIcon} Download CV</Button>
                    </div>
                </Section>
                <Section title="Portfolio" description="Some of my recent works.">
                    <TeaserContainer />
                    <Modal />
                </Section>
            </div>
            <motion.div
                id="scroll-indicator"
                style={{
                    scaleY,
                    position: "fixed",
                    top: 0,
                    bottom: 0,
                    right: 0,
                    width: 5,
                    originY: 0,
                }}
            />
        </ModalProvider>
    );
};

export default App;