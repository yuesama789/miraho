import React, { useRef } from 'react';
import styles from './Pageheader.module.scss';
import Button from '../button/Button';
import MiraHo from '../../../assets/images/MiraHo.jpg';
import {gsap} from 'gsap';
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PageHeader: React.FC = () => {

    const main = useRef<HTMLElement | null>(null);

    const sparkleSvg = (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-component-line="230"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path><path d="M20 3v4"></path><path d="M22 5h-4"></path><path d="M4 17v2"></path><path d="M5 18H3"></path></svg>
    );

    const downloadIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-component-line="235"><path d="M12 15V3"></path><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><path d="m7 10 5 5 5-5"></path></svg>
    );

    //const scrollIndicator = (
    //    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-component-line="254"><path d="m6 9 6 6 6-6"></path></svg>
    //);

useGSAP(() => {
    const tl = gsap.timeline({defaults: {duration: 1, ease: "power2.out"}});

    tl.from(`.${styles.pageheader__blob}`, { opacity: 0.5, y: -50})
        .fromTo(`.${styles.pageheader__blobOrnament}`, {opacity: 0, y: -50, rotate: 320}, {opacity: 1, y: 0, rotate: 332}, "-=0.5")
        .from(`.${styles.pageheader__content} h1`, {opacity: 0, y: -20}, "-=0.5")
        .fromTo(`.${styles.wave}`, {rotation: 0}, {rotation: 20, yoyo: true, repeat: 6, ease: "sine.inOut", duration: 0.5}, "-=0.5")
        .from(`.${styles.pageheader__content} h3`, {opacity: 0, y: -20}, "-=3")
        .from(`.${styles.pageheader__buttons} button`, {opacity: 0, y: -20, stagger: 0.2}, "-=2.4");

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
                        <h1>Hi, ich bin Mira <span className={styles.wave}>👋</span></h1>
                        <h3>Interaction-Focused UI Developer & Design Engineer</h3>
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
 