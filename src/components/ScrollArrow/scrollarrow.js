import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './scrollarrow.css';
import arrow from '../../assets/extras/arrow.png';
// import { Link } from 'react-router-dom';

const ScrollArrow = ({ link }) => {
    useEffect(() => {
        const imgElement = document.querySelector('.ScrollArrow');
        if (imgElement) {
            imgElement.addEventListener('click', () => {
                window.location.href = link;
            });
        }
    }, [link]);

    return <img src={arrow} alt='dropDown' className='ScrollArrow' />;
};


ScrollArrow.propTypes = {
    link: PropTypes.string.isRequired,
}

export default ScrollArrow