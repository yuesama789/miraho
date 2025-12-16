import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './TarotCards.module.scss';
import TarotCard from './TarotCard/TarotCard';
import {ReactComponent as Tarot1} from '../../../assets/svgs/tarot1.svg';
import {ReactComponent as Tarot2} from '../../../assets/svgs/tarot2.svg';
import {ReactComponent as Tarot3} from '../../../assets/svgs/tarot3.svg';

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

    useEffect(() => {
        const nameList = document.querySelector(`.${styles.tarotCardNameList}`);
        const fill = document.querySelector(`.${styles.fill}`);
        const listItems = gsap.utils.toArray("li", nameList) as HTMLElement[];
        const cards = gsap.utils.toArray(`.${styles.tarotCardWrapper}`) as HTMLElement[];

        console.log('cards:', cards);
        const nameListArray = gsap.utils.toArray(`.${styles.tarotCardNameList}`);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ref.current,
                start: "top top",
                end: "+=" + (listItems.length * 50) + "%",
                scrub: true,
                markers: true
            },
        });

        // First element visible, set the marker
        fill &&
        gsap.set(fill, {
            scaleY: 1 / listItems.length,
            transformOrigin: "top left"
        });


        listItems.forEach((item, i) => {
            gsap.set(item, { color: "rgba(255, 255, 255, 0.5)" });
            gsap.set(cards[i], { rotateY: 0, transformStyle: "preserve-3d" });
            const previousItem = listItems[i - 1];
            if (previousItem) {
                tl.set(item, { color: "#C716A6" }, 0.5 * i)
                .to(
                    cards[i],
                    {
                    rotateY: 180,
                    duration: 0.2
                    },
                    "<"
                )
                .set(previousItem, { color: "rgba(255, 255, 255, 0.5)" }, "<")
                .to(
                    cards[i - 1],
                    {
                    rotateY: 0,
                    duration: 0.2
                    },
                    "<"
                );
            } else {
                gsap.set(item, { color: "#C716A6" });
                gsap.set(cards[i], { autoAlpha: 1 });
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
