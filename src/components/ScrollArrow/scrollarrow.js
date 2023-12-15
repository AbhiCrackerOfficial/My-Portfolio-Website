import React from 'react';
import PropTypes from 'prop-types';
import './scrollarrow.css';
import { Link } from 'react-router-dom';

const ScrollArrow = ({ link }) => {
    return (
        <div className='scroll-arrow-link'>
            <Link to={link}>
                <button className='ScrollArrow'>
                    <div className='scroll-arrow-img' />
                </button>
            </Link>
        </div>
    );
};

ScrollArrow.propTypes = {
    link: PropTypes.string.isRequired,
}

export default ScrollArrow;
