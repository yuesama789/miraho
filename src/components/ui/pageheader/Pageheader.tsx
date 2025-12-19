import React, { useRef } from 'react';
import styles from './Pageheader.module.scss';
import Button from '../button/Button';
import MiraHo from '../../../assets/images/MiraHo.jpg';
import {gsap} from 'gsap';
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useLanguage } from '../../../context/languageContext';

import handWave from '../../../assets/lottie/handwave.json';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PageHeader: React.FC = () => {

    const { t } = useLanguage();

    const main = useRef<HTMLElement | null>(null);

    const sparkleSvg = (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-component-line="230"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path><path d="M20 3v4"></path><path d="M22 5h-4"></path><path d="M4 17v2"></path><path d="M5 18H3"></path></svg>
    );

    const downloadIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-component-line="235"><path d="M12 15V3"></path><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><path d="m7 10 5 5 5-5"></path></svg>
    );


useGSAP(() => {
    const tl = gsap.timeline({defaults: {duration: 1, ease: "power1.out"}});

    tl.from(`.${styles.pageheader__blob}`, { opacity: 0, y: -50})
        .fromTo(`.${styles.pageheader__blobOrnament}`, {opacity: 0, y: -50, rotate: 320}, {opacity: 1, y: 0, rotate: 332}, "0")
        .from(`.${styles.pageheader__content} h1`, {opacity: 0, y: -20}, "-=0.5")
        .from(`.${styles.pageheader__content} h3`, {opacity: 0, y: -20}, "-=0.5")
        .from(`.${styles.pageheader__buttons} button`, {opacity: 0, y: -20, stagger: 0.5}, "-=0.5");

        
        gsap.to(`.${styles.pageheader__blobOrnament}`, {
            yPercent: -10,
            scrollTrigger: {
                trigger: main.current,
                start: "top top",
                end: "bottom top",
                // markers: true,
                id: "blob-ornament-scroll",
                scrub: true,
            },
        });

    return () => {
        tl.kill();
    };
}, []);




    return (
        <>
            <header ref={main} className={styles.pageheader}>
                <div className={styles.pageheader__container}>
                    <div className={styles.pageheader__profilepic}>
                        <div className={styles.pageheader__blobOrnament}></div>
                        <div className={styles.pageheader__blob}>
                            <img src={MiraHo} alt="Mira Ho" />
                        </div>
                    </div>
                    <div className={styles.pageheader__content}>
                        <h1>{t.pageHeader.title}
                            <span className={styles.wave}>
                                <DotLottieReact
                                    data={handWave}
                                    loop={false}
                                    autoplay
                                />
                            </span>
                        </h1>
                        <h3>{t.pageHeader.subtitle}</h3>
                        <div className={styles.pageheader__buttons}>
                            <Button type="primary" onClick={() => alert('Button clicked!')}>{sparkleSvg} Show the Magic</Button>
                            <Button type="secondary" onClick={() => alert('Button clicked!')}>{downloadIcon} Download CV</Button>
                        </div>
                    </div>
                </div> 

            </header>
        </>
    );
};

export default PageHeader;
 