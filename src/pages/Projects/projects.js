import React, { useState, useEffect, useRef } from 'react';
import '../About/about.css';
import ScrollArrow from '../../components/ScrollArrow/scrollarrow';
import ProjectCard from '../../components/ProjectCard/projectcard';
import './projects.css';

const Projects = () => {
    const [shownSections, setShownSections] = useState([1]);
    const lastSectionRef = useRef(null);
    const [randomText, setRandomText] = useState('');
    const [projects, setProjects] = useState([]);
    const isManuallyScrolled = useRef(false);

    function getRandomTime() {
        // return random time between 500 and 2000 ms;
        return Math.floor(Math.random() * 1000) + 500;
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
            }, 1500);

            return () => clearTimeout(sectionTimeout);
        }
    }, [shownSections]);

    useEffect(() => {
        // Fetch projects data from the API
        fetch("https://github.abhicracker.com/repos")
            .then(response => response.json())
            .then(data => {
                let final = data.filter(project => project.name !== 'AbhiCrackerOfficial');
                setProjects(final.sort(() => Math.random() - 0.5));
            })
            .catch(error => console.error("Failed to fetch projects", error));
            
    }, []); 

    useEffect(() => {
        const arr = [
            "Sure, I'd love to! Let's get started.",
            "Absolutely! Ready when you are.",
            "Of course! I have a variety to share.",
            "Certainly! I'll walk you through.",
            "Definitely! Let's explore.",
            "Sure thing! Ready to share.",
            "Yes, indeed! Let's delve in.",
            "Absolutely! I'm prepared to discuss.",
            "Of course! I'm eager to showcase.",
            "Sure thing! I'm here to present."
        ];
        
        

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        function getRandomtext() {
            return shuffleArray(arr)[Math.floor(Math.random() * shuffleArray(arr).length)]
        }
        setRandomText(getRandomtext());
    }, []);
    

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
                        <p>{randomText}</p>
                    </div>
                )}
                {shownSections.includes(3) && (
                    <>
                        <div className='Projects-Sep'>
                            {/* run a loop to display all the projects */}
                            {projects.map((project) => (
                                <ProjectCard
                                    title={project.name}
                                    description={project.description}
                                    url={project.url}
                                    stars={project.stars}
                                    forks={project.forks}
                                    watchers={project.watchers}
                                    tags={project.tags}
                                />
                            ))}
                        </div>
                    </>
                )}
                {shownSections.length > 1 && shownSections.length % 2 === 1 && (
                    <ScrollArrow link='/'></ScrollArrow>
                )}
            </div>
        </>
    );
}

export default Projects
