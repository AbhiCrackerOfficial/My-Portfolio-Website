import React, { useState, useEffect } from 'react';
import { Link, NavLink, Routes, Route } from 'react-router-dom';
import { Divide as Hamburger } from 'hamburger-react';

import './navbar.css';
import logo from '../../assets/images/logo.png';
import Home from '../../pages/Home/home';
import About from '../../pages/About/about';
import Skills from '../../pages/Skills/skills';
import Projects from '../../pages/Projects/projects';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        const contactBtn = document.getElementById('contact');
        if (contactBtn) {
            contactBtn.addEventListener('click', () => {
                // redirect to email
                window.location.href = 'mailto:contact@abhishekkumar001.dev';
            });
        }
    }, []);


    return (
        <>
            <nav>
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="logo" />
                    </Link>
                    <span>Abhi</span>
                </div>
                <span className='hamburger'>
                    <Hamburger
                        toggled={isOpen}
                        toggle={toggleMenu}
                    />
                </span>
                <ul className={`menu${isOpen ? '-open' : ''}`}>
                    <li>
                        <NavLink to="/" activeClassName="active" exact onClick={closeMenu}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" activeClassName="active" onClick={closeMenu}>
                            About
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/skills" activeClassName="active" onClick={closeMenu}>
                            Skills
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/projects" activeClassName="active" onClick={closeMenu}>
                            Projects
                        </NavLink>
                    </li>
                </ul>
                <button id="contact">Contact</button>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/projects" element={<Projects />} />
            </Routes>
        </>
    );
}

export default Navbar;
