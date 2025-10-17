import React from 'react';
import PageHeader from './ui/pageheader/Pageheader';
import Section from './ui/section/Section';
import Storybox from './ui/storybox/Storybox';

const App: React.FC = () => {
    return (
        <div className="App">
            <PageHeader />
            <Section>
                <h2>My Story</h2>
                {/* Additional content can go here */}
                <p>This is a section content.</p>
                <Storybox icon="📖" color="orange" title="Once upon a time..." text="In a land far, far away..." />
            </Section>
        </div>
    );
};

export default App;