import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '@lottiefiles/lottie-player';

import { ModalProvider } from '../context/modalContext';
import { LanguageProvider, useLanguage } from '../context/languageContext';

import PageHeader from './ui/pageheader/Pageheader';
import Section from './ui/section/Section';
import Button from './ui/button/Button';
import TeaserContainer from './ui/teaserContainer/TeaserContainer';
import Modal from './ui/modal/Modal';
import BadgeCloud from './ui/badgeCloud/BadgeCloud';
import CustomCursor from './ui/customCursor/CustomCursor';
import TarotCards from './ui/tarotCards/TarotCards';
import StoryboxParralax from './ui/storyboxParralax/StoryboxParralax';
import LanguageSwitch from './ui/languageSwitch/LanguageSwitch';


const AppContent: React.FC = () => {
    gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

    const { t } = useLanguage();

    useEffect(() => {
        ScrollSmoother.create({
            wrapper: '#smooth-wrapper',
            content: '#smooth-content',
            smooth: 1,
            effects: true,
            normalizeScroll: true,
        });
    }, []);


    const downloadIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-component-line="235"><path d="M12 15V3"></path><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><path d="m7 10 5 5 5-5"></path></svg>
    );
    


    return (
        <ModalProvider>
                <div id="smooth-wrapper">
                    <div id="smooth-content">
                        <CustomCursor />
                        <LanguageSwitch />
                        
                        <div className="App">
                            <Section className="section-container" backgroundColor='orange'>
                                <PageHeader />
                            </Section>
                            <Section className="section-container" backgroundColor='pink' title={t.sections.whatIDo.title} description={t.sections.whatIDo.description} pinned="section">
                                <StoryboxParralax />
                            </Section>
                            <Section className="section-container" pinned="title" fullWidth={true} backgroundColor='purple' title={t.sections.miniShowcase.title} description={t.sections.miniShowcase.description}>
                                <TeaserContainer backgroundColor='purple' />
                            </Section>
                            <Section className="section-container" pinned="section" backgroundColor='dark' title={t.sections.howIWork.title} description={t.sections.howIWork.description}>
                                <TarotCards />
                            </Section>
                            <Section className="section-container" backgroundColor='pink' title={t.sections.skills.title} description={t.sections.skills.description}>
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
                        
                        <Modal />
                    </div>
                </div>
            </ModalProvider>
    );
};

const App: React.FC = () => {
    return (
        <LanguageProvider>
            <AppContent />
        </LanguageProvider>
    );
};

export default App;