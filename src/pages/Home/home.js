import React from 'react';
import './home.css';
import ScrollArrow from '../../components/ScrollArrow/scrollarrow';

function Home() {
    return (
        <div className="HeroSec">
            <h1>
                Hey! <br></br> I'm Abhishek Kumar
            </h1>
            <br></br>
            <p>Computer Engineer | Software Developer | Security Pentester</p>
            <ScrollArrow link="/about"></ScrollArrow>
        </div>
    );
}

export default Home;
