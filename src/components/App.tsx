import React from 'react';
import PageHeader from './ui/pageheader/Pageheader';
import Section from './ui/section/Section';
import Storybox from './ui/storybox/Storybox';
import Imagebox from './ui/imagebox/Imagebox';
import Badge from './ui/badge/Badge';
import Button from './ui/button/Button';


import ImageboxImage from '../assets/images/MiraHo.jpg';

const App: React.FC = () => {


    const downloadIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-component-line="235"><path d="M12 15V3"></path><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><path d="m7 10 5 5 5-5"></path></svg>
    );

    return (
        <div className="App">
            <PageHeader />
            <Section>
                <h2>My Story</h2>
                {/* Additional content can go here */}
                <p>This is a section content.</p>
                <Storybox icon="♥️" color="orange" title="Der Anfang" text="In den 2010er fing ich an - wie viele andere - einen Blog zu schreiben. Doch mehr als das Schreiben fand ich gefallen am Gestalten meines Blogs und so fing ich an, darüber zu schreiben und anderen beim Design ihrer Blogs zu helfen. Noch heute findet man meinen Blog 'Copy Paste Love' im Netz, auch wenn er leider nicht mehr aktiv ist." />
                <Storybox icon="🚀" color="pink" title="Die Reise" text="Neben meinem Medieninformatik Studium habe ich als Selbstständige unter 'MiraDesigns' vielen Bloggern beim Erstellen und Gestalten ihrer Webseite geholfen. Dadurch konnte ich mein Studium finanzieren und weiterhin meiner Leidenschaft nachgehen." />
                <Storybox icon="🌟" color="purple" title="Das Ziel" text="Nach einem Exkurs in der Projektmanagement habe ich meine Leidenschaft für das Designen von Webseiten weiter vertieft und arbeitete nun an spannenden Projekten. Dabei durfte ich mein Wissen in scrollgetriggerten Animationen und modernen Webtechnologien einbringen." />
                <Imagebox src={ImageboxImage} alt="Description of image" className="custom-class" />
            </Section>
            <Section backgroundColor='pink'>
                <h2>Skills & Expertise</h2>
                <p>Here is the stuff I can do.</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent:'flex-start' }}>
                    <Badge color="blue">Web Design</Badge>
                    <Badge color="green">Frontend Development</Badge>
                    <Badge color="purple">UX/UI Design</Badge>
                    <Badge color="red">Project Management</Badge>
                    <Badge color="yellow">Typescript</Badge>
                    <Badge color="gray">React</Badge>
                    <Badge color="blue">Sass</Badge>
                    <Badge color="green">Animation</Badge>
                    <Badge color="purple">Accessibility</Badge>
                </div>
                <div style={{ marginTop: '1rem' }}>
                    <Button type="secondary" onClick={() => alert('Button clicked!')}>{downloadIcon} Download CV</Button>
                </div>
            </Section>
        </div>
    );
};

export default App;