import React from 'react';
import PropTypes from 'prop-types';
import './borderbox.css';

const BorderBox = ({ color, width, height, child }) => {
    const borderStyle = {
        border: `1px solid ${color}`,
        borderRadius: '3px',
        boxShadow: '0 0 0 1px rgba(16,22,26,.1), 0 0 0 rgba(16,22,26,.1)',
        display: 'flex',  // Use flex type
        alignItems: 'center',  // Align items center
        justifyContent: 'center',  // Justify content center
        width: `${width}rem`,
        height: `${height}rem`,
        textAlign: 'center',  // Text align center
    };

    return <div style={borderStyle}>{child}</div>;
};

BorderBox.propTypes = {
    color: PropTypes.string,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    child: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.element]).isRequired,
};

export default BorderBox;
