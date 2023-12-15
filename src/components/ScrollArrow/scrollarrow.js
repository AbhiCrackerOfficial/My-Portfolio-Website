import React from 'react';
import PropTypes from 'prop-types';
import './scrollarrow.css';
import { Link } from 'react-router-dom';
import { TfiAngleDoubleDown } from "react-icons/tfi";

const ScrollArrow = ({ link }) => {
    return (
        <div className='scroll-arrow-link'>
            <Link to={link}>
                <button className='ScrollArrow'>
                    <div className='scroll-arrow-img' >
                        <TfiAngleDoubleDown size={22} />
                    </div>
                </button>
            </Link>
        </div>
    );
};

ScrollArrow.propTypes = {
    link: PropTypes.string.isRequired,
}

export default ScrollArrow;
