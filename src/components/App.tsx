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
import CustomCursor from './ui/customCursor/CustomCursor';
import TarotCards from './ui/tarotCards/TarotCards';
import StoryboxParralax from './ui/storyboxParralax/StoryboxParralax';
import LanguageSwitch from './ui/languageSwitch/LanguageSwitch';
import AnimateText from './ui/animateText/AnimateText';


const AppContent: React.FC = () => {
    gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

    const { t, locale } = useLanguage();

    useEffect(() => {
        // Set default scroller for all ScrollTriggers
        ScrollTrigger.defaults({
            scroller: "#smooth-content"
        });

        ScrollSmoother.create({
            wrapper: '#smooth-wrapper',
            content: '#smooth-content',
            smooth: 1,
            effects: true,
            normalizeScroll: true,
        });
    }, []);


    return (
        <ModalProvider>
            {/* <CustomCursor /> */}
                <div id="smooth-wrapper">
                    <div id="smooth-content">
                        <LanguageSwitch />

                        <div className="App">
                            <Section className="section-container" backgroundColor='orange'>
                                <PageHeader />
                            </Section>
                            <Section className="section-container" backgroundColor='purple' title={t.sections.about.title} description={t.sections.about.description}>
                                <AnimateText key={locale} text={t.sections.about.content} />
                            </Section>
                            <Section className="section-container" backgroundColor='pink' title={t.sections.whatIDo.title} description={t.sections.whatIDo.description} pinned="section">
                                <StoryboxParralax />
                            </Section>
                            <Section className="section-container" fullWidth={true} backgroundColor='purple' title={t.sections.miniShowcase.title} description={t.sections.miniShowcase.description}>
                                <TeaserContainer backgroundColor='purple' />
                            </Section>
                            <Section className="section-container" pinned="section" backgroundColor='dark' title={t.sections.howIWork.title} description={t.sections.howIWork.description}>
                                <TarotCards />
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

const App: React.FC = () => {
    return (
        <LanguageProvider>
            <AppContent />
        </LanguageProvider>
    );
};

export default App;