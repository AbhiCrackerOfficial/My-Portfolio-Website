import React, { useState, useEffect, useRef } from 'react';
import './about.css';
import ScrollArrow from '../../components/ScrollArrow/scrollarrow';

const About = () => {
    const [shownSections, setShownSections] = useState([1]);
    const lastSectionRef = useRef(null);
    const isManuallyScrolled = useRef(false);
    function getRandomTime() {
        // return random time between 500 and 2000 ms;
        return Math.floor(Math.random() * 1500) + 500;
    }

    useEffect(() => {
        const handleScroll = () => {
            // Check if the user has manually scrolled
            isManuallyScrolled.current = true;
        };

        // Attach the scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [shownSections]);

    useEffect(() => {
        // Scroll to the last section only if it's added automatically
        if (lastSectionRef.current && !isManuallyScrolled.current) {
            lastSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        // Reset the manual scroll flag
        isManuallyScrolled.current = false;

        // For the initial Sec2, use a random time
        if (shownSections.length === 1) {
            const sectionTimeout = setTimeout(() => {
                const nextSection = shownSections[shownSections.length - 1] + 1;
                setShownSections([...shownSections, nextSection]);
            }, getRandomTime());

            return () => clearTimeout(sectionTimeout);
        }

        // For subsequent Sec2 elements, use a constant 5000ms delay
        if (shownSections.length > 1 && shownSections.length % 2 === 0) {
            const sectionTimeout = setTimeout(() => {
                const nextSection = shownSections[shownSections.length - 1] + 1;
                setShownSections([...shownSections, nextSection]);
            }, 5000);

            return () => clearTimeout(sectionTimeout);
        }
    }, [shownSections]);

    return (
        <>
            <div
                className='AboutSec-1'
            >
                {shownSections.includes(1) && (
                    <div className="Sec1">
                        <h1>
                            Tell me About Yourself.
                        </h1>
                    </div>
                )}
                {shownSections.includes(2) && (
                    <div className="Sec2" ref={lastSectionRef}>
                        <p>As a tech enthusiast, I dived into the world of computers back in 2015 when I was just a sixth-grader
                            (<i>Yeah, started young, didn't I?</i>). Fast forward to today, and here I am, rocking the title of a
                            Computer Engineer, Software Developer, and Security Pentester. <i>Pretty cool,
                                right?</i><br></br><br></br>
                            In my journey as a Software Engineer and Cybersecurity Enthusiast, I've been on a quest to develop
                            software solutions that are not just innovative but also user-friendly. <i>I mean, who doesn't want tech
                                to make their daily life smoother?</i> I'm all about it.<br></br><br></br></p>
                    </div>
                )}
                {shownSections.includes(3) && (
                    <div className='Sec2'>
                        <p> And hey, I'm not just your average coder. I'm also diving into the world of Penetration Testing and
                            Ethical Hacking, because, you know, why not? I use my ninja skills to find vulnerabilities and beef up
                            those system defenses. Comprehensive assessments are my jam; I make sure those digital assets are Fort
                            Knox-level protected. <i>And I'm not even kidding.</i><br></br><br></br>
                            Whether it's a quick hack or a full-blown project, count me in —— <i>I'm always up for the challenge!
                                💻✨</i>. I bring a mix of tech wizardry, passion, and a sprinkle of humor to the table. So, if you
                            want someone who can navigate the tech realm with finesse and a bit of flair, well, here I am. Let's
                            make some digital magic happen! 🚀<br></br><br></br></p>
                    </div>
                )}
                {shownSections.length > 1 && shownSections.length % 2 === 1 && (
                    <ScrollArrow link='/skills'></ScrollArrow>
                )}
            </div>
        </>
    );
};

export default About;
