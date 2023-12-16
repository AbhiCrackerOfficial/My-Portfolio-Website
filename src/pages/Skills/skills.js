import React, { useState, useEffect, useRef } from 'react';
import '../About/about.css';
import './skills.css';
import ScrollArrow from '../../components/ScrollArrow/scrollarrow';
// import BorderBox from '../../components/BorderBox/borderbox';
import { BiLogoReact, BiLogoJava } from "react-icons/bi";
import { TbBrandFlutter, TbBrandDjango, TbBrandCpp, TbBrandPython, TbBrandJavascript, TbBrandNodejs, TbBrandHtml5, TbBrandCss3, TbBrandPhp, TbBrandMysql, TbBrandMongodb, TbBrandVscode } from "react-icons/tb";
import { SiAndroidstudio, SiArduino, SiCloudflare, SiGnubash, SiPostman } from "react-icons/si";

const Skills = () => {
    const [shownSections, setShownSections] = useState([1]);
    const [randomText, setRandomText] = useState('');
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
            }, 3500);

            return () => clearTimeout(sectionTimeout);
        }
    }, [shownSections]);

    useEffect(() => {
        const arr = ['My skills are my silent ambassadors. They are the true reflection of what I bring to the table.',
            "Let's skip the talk and Take a look at my skills below.",
            "I am not much of a talker, but my skills are worth a look. See them below.",
            "No need for big words. Dive into the details below to see what I bring to the table.",
            "No need for a sales pitch. Just check out what I can do below.",
            "I let my skills speak for themselves. Check out below.",
        ]

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

    // make size of icons responsive
    const [size, setSize] = useState(() => {
        if (window.innerWidth <= 425) {
            return 50;
        } else if (window.innerWidth <= 768) {
            return 60;
        } else if (window.innerWidth <= 1024) {
            return 70;
        } else {
            return 80;
        }
    });

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 425) {
                setSize(50);
            } else if (window.innerWidth <= 768) {
                setSize(60);
            } else if (window.innerWidth <= 1024) {
                setSize(70);
            } else {
                setSize(80);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);



    return (
        <div className='AboutSec-1'>
            {shownSections.includes(1) && (
                <div className="Sec1">
                    <h1>
                        So what are your skills?
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
                    <hr className='divider' />
                    <div className="Skills-Div">
                        <h1>
                            MY SKILLS
                        </h1>
                        <div className='Skills-Sep'>
                            <h2>
                                Frameworks
                            </h2><br />
                            <div className='skill'>
                                <BiLogoReact size={size} /><br />
                                React
                            </div>
                            <div className='skill'>
                                <TbBrandFlutter size={size} /><br />
                                Flutter
                            </div>
                            <div className='skill'>
                                <TbBrandDjango size={size} /><br />
                                Django
                            </div>
                            <h2>
                                Languages
                            </h2><br />
                            <div className='skill'>
                                <TbBrandCpp size={size} /><br />
                                C++
                            </div>
                            <div className='skill'>
                                <TbBrandPython size={size} /><br />
                                Python
                            </div>
                            <div className='skill'>
                                <BiLogoJava size={size} /><br />
                                Java
                            </div>
                            <div className='skill'>
                                <SiGnubash size={size} /><br />
                                Bash
                            </div>
                            <div className='skill'>
                                <TbBrandJavascript size={size} /><br />
                                JavaScipt
                            </div>
                            <div className='skill'>
                                <TbBrandNodejs size={size} /><br />
                                Node.js
                            </div>
                            <div className='skill'>
                                <TbBrandHtml5 size={size} /><br />
                                Html5
                            </div>
                            <div className='skill'>
                                <TbBrandCss3 size={size} /><br />
                                Css3
                            </div>
                            <div className='skill'>
                                <TbBrandPhp size={size} /><br />
                                Php
                            </div>
                            <h2>
                                Databases
                            </h2><br />
                            <div className='skill'>
                                <TbBrandMysql size={size} /><br />
                                MySQL
                            </div>
                            <div className='skill'>
                                <TbBrandMongodb size={size} /><br />
                                MongoDB
                            </div>
                            <h2>
                                Tools & IDEs
                            </h2><br />
                            <div className='skill'>
                                <TbBrandVscode size={size} /><br />
                                VsCode
                            </div>
                            <div className='skill'>
                                <SiAndroidstudio size={size} /><br />
                                Android Studio
                            </div>
                            <div className='skill'>
                                <SiArduino size={size} /><br />
                                Arduino
                            </div>
                            <div className='skill'>
                                <SiPostman size={size} /><br />
                                Postman
                            </div>
                            <h2>
                                Cloud Platforms
                            </h2><br />
                            <div className='skill'>
                                <SiCloudflare size={size} /><br />
                                CloudFlare
                            </div>
                        </div>
                    </div>
                </>
            )}
            {shownSections.length > 1 && shownSections.length % 2 === 1 && (
                <ScrollArrow link='/projects'></ScrollArrow>
            )}
        </div>

    );
}

export default Skills
