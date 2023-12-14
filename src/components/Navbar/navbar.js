import React, { useState } from 'react';
import './navbar.css';
import logo from '../../assets/images/logo.png';
import { Link, NavLink, Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home/home';
import About from '../../pages/About/about';
import Skills from '../../pages/Skills/skills';
import Projects from '../../pages/Projects/projects';
import { Divide as Hamburger } from 'hamburger-react';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };
    
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
                        <NavLink to="/" activeclassname="active" end onClick={closeMenu}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" activeclassname="active" onClick={closeMenu}>
                            About
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/skills" activeclassname="active" onClick={closeMenu}>
                            Skills
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/projects" activeclassname="active" onClick={closeMenu}>
                            Projects
                        </NavLink>
                    </li>
                </ul>
                <button>Contact</button>
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
