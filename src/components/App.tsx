import React from 'react';
import PageHeader from './ui/pageheader/Pageheader';
import Section from './ui/section/Section';
import Storybox from './ui/storybox/Storybox';
import Imagebox from './ui/imagebox/Imagebox';

import ImageboxImage from '../assets/images/MiraHo.jpg';

const App: React.FC = () => {
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
                <p>This is another section content.</p>
            </Section>
        </div>
    );
};

export default App;