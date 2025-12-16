import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './TarotCards.module.scss';
import TarotCard from './TarotCard/TarotCard';
import {ReactComponent as Tarot1} from '../../../assets/svgs/tarot1.svg';
import {ReactComponent as Tarot2} from '../../../assets/svgs/tarot2.svg';
import {ReactComponent as Tarot3} from '../../../assets/svgs/tarot3.svg';
import { useGSAP } from '@gsap/react';
import { activeAnimations } from 'motion';

gsap.registerPlugin(ScrollTrigger);

const TarotCards: React.FC = () => {
    const tarotCards = [
        {
            name: 'User-Centered Design',
            svg: <Tarot1 />,
            colour: '#667eea',
            colour2: '#764ba2',
            description: 'I prioritize user needs and behaviors in every project.'
        },
        {
            name: 'Agile Methodology',
            svg: <Tarot2 />,
            colour: '#9370DB',
            colour2: '#663399',
            description: 'I embrace iterative development and continuous feedback.'
        },
        {
            name: 'Collaboration',
            svg: <Tarot3 />,
            colour: '#4169E1',
            colour2: '#1E90FF',
            description: 'I work closely with cross-functional teams to achieve the best results.'
        }
    ];

    const ref = React.createRef<HTMLDivElement>();

    useGSAP(() => {
        const nameList = document.querySelector(`.${styles.tarotCardNameList}`);
        const fill = document.querySelector(`.${styles.fill}`);
        const listItems = gsap.utils.toArray("li", nameList) as HTMLElement[];
        const cards = gsap.utils.toArray(`.${styles.tarotCardWrapper}`) as HTMLElement[];

        cards.forEach((card, i) => {
            gsap.set(card, {
                x: `${i * 3}dvw`,
                y: `${i * 2}dvh`,
                rotateZ: 10 + i * 5,
                zIndex: cards.length - i,
                transformStyle: "preserve-3d",
            });

        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ref.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
                markers: true,
            }
        });

        // First element visible, set the marker
        fill &&
        gsap.set(fill, {
            scaleY: 1 / listItems.length,
            transformOrigin: "top left"
        });


        listItems.forEach((item, i) => {
            gsap.set(item, { color: "rgba(255, 255, 255, 0.5)" });
            
            const previousItem = listItems[i - 1];
            
            if (i === 0) {
                // Card 1: initial state - name 1 active & card 1 active
                gsap.set(item, { color: "#C716A6" });
                gsap.set(cards[i], { rotateZ: 0 });
            } else {
                // Calculate timeline positions for this card
                const sectionDuration = 1 / listItems.length; // 0.333 for 3 cards
                const previousCardSection = (i - 1) * sectionDuration; // When previous card section starts
                const fadeOutStart = previousCardSection + sectionDuration * 0.7; // 70% through previous card's section
                const activateStart = fadeOutStart + 0.05; // Small gap after fade out completes
                
                tl
                // Step: Previous card fades out
                .to(previousItem, { color: "rgba(255, 255, 255, 0.5)", duration: 0.1 }, fadeOutStart)
                .to(cards[i - 1], { 
                    x: `${i * -3}dvw`,
                    opacity: 0,
                    ease: "power2.out",
                    duration: 0.1
                }, fadeOutStart)
                
                // Step: Current name activated & card rotates in
                .to(item, { color: "#C716A6", duration: 0.1 }, activateStart)
                .to(cards[i], {
                    rotateZ: 0,
                    ease: "power2.out",
                    duration: 0.1
                }, activateStart);
                
                // Card is now active and holds until next iteration
            }
        });
        tl.to(
        fill,
        {
            scaleY: 1,
            transformOrigin: "top left",
            ease: "none",
            duration: tl.duration()
        },
        0
        ).to({}, {}); // add a small pause at the end of the timeline before it un-pins
    }, []);

    return (
        <div className={styles.tarotCards} ref={ref}>
            <div className={styles.tarotCardsContainer}>
                <div className={styles.fill}></div>
                <ul className={styles.tarotCardNameList}>
                    {tarotCards.map((card, index) => (
                        <li key={index}>{card.name}</li>
                    ))}
                </ul>
                <div className={styles.tarotCardSide}>
                    {tarotCards.map((card, index) => (
                        <div key={index} className={styles.tarotCardWrapper}>
                            <TarotCard name={card.name} svg={card.svg} colour={card.colour} colour2={card.colour2} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TarotCards;
