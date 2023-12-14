import React, { useState, useEffect, useRef } from 'react';
import '../About/about.css';
import ScrollArrow from '../../components/ScrollArrow/scrollarrow';

const Projects = () => {
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
            <div className='AboutSec-1'>
                {shownSections.includes(1) && (
                    <div className="Sec1">
                        <h1>
                            Oh! Then show me your projects.
                        </h1>
                    </div>
                )}
                {shownSections.includes(2) && (
                    <div className="Sec2">
                        <p>Just Wait and Check Again Later . Adding Soon</p>
                    </div>
                )}
                {shownSections.length > 1 && shownSections.length % 2 === 1 && (
                    <ScrollArrow link='/'></ScrollArrow>
                )}
            </div>
        </>
    );
}

export default Projects
