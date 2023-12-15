import React from 'react';
import './home.css';
import ScrollArrow from '../../components/ScrollArrow/scrollarrow';

function Home() {
    return (
        <div className="HeroSec">
            <h1>
                Hey!
            </h1>
            <br/>
            <h1>
                I'm ABHISHEK KUMAR
            </h1>
            <br/>
            <p>Computer Engineer | Software Developer | Security Pentester</p>
            <ScrollArrow link="/about"></ScrollArrow>
        </div>
    );
}

export default Home;
