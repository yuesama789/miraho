import React from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './TarotCards.module.scss';
import TarotCard from './TarotCard/TarotCard';
import {ReactComponent as Tarot1} from '../../../assets/svgs/tarot1.svg';
import {ReactComponent as Tarot2} from '../../../assets/svgs/tarot2.svg';
import {ReactComponent as Tarot3} from '../../../assets/svgs/tarot3.svg';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '../../../context/languageContext';

gsap.registerPlugin(ScrollTrigger);

const TarotCards: React.FC = () => {

    const { t } = useLanguage();

    const tarotCards = [
        {
            name: t.tarotCards[0].name,
            svg: <Tarot1 />,
            colour: '#667eea',
            colour2: '#764ba2',
            description: t.tarotCards[0].description
        },
        {
            name: t.tarotCards[1].name,
            svg: <Tarot2 />,
            colour: '#9066ea',
            colour2: '#a24ba2',
            description: t.tarotCards[1].description
        },
        {
            name: t.tarotCards[2].name,
            svg: <Tarot3 />,
            colour: '#66c0ea',
            colour2: '#4b4ba2',
            description: t.tarotCards[2].description
        }
    ];

    const ref = React.useRef<HTMLDivElement>(null);
    const nameList = React.useRef<HTMLUListElement>(null);
    const listItemRefs = React.useRef<(HTMLLIElement | null)[]>([]);
    const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        const listItems = listItemRefs.current.filter(Boolean) as HTMLElement[];
        const cards = cardRefs.current.filter(Boolean) as HTMLElement[];

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
                // markers: true,
            }
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
                    x: 0,
                    ease: "power2.out",
                    duration: 0.1
                }, activateStart);
                
                // Card is now active and holds until next iteration
            }
        });
    }, []);

    return (
        <div className={styles.tarotCards} ref={ref}>
            <div className={styles.tarotCardsContainer}>
                <ul className={styles.tarotCardNameList} ref={nameList}>
                    {tarotCards.map((card, index) => (
                        <li key={index} ref={el => listItemRefs.current[index] = el}>{index + 1}. {card.name}</li>
                    ))}
                </ul>
                <div className={styles.tarotCardSide}>
                    {tarotCards.map((card, index) => (
                        <div key={index} className={styles.tarotCardWrapper} ref={el => cardRefs.current[index] = el}>
                            <TarotCard name={card.name} svg={card.svg} colour={card.colour} colour2={card.colour2} description={card.description} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TarotCards;
