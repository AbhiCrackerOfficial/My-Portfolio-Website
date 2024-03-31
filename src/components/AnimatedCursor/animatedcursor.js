import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const AnimatedCursor = ({
    innerSize = 32,
    innerColor = '255, 255, 255',
    innerAlpha = 0.9,
    innerTransitionDuration = 0.025,
    innerCursorInvert = true,
    anotherCursor = false,
    outerSize = 64,
    outerColor = '255, 255, 255',
    outerAlpha = 0.4,
    outerTransitionDuration = 0.05,
    outerCursorInvert = false,
    clickables = [
        'a',
        'input[type="text"]',
        'input[type="email"]',
        'input[type="number"]',
        'input[type="submit"]',
        'input[type="image"]',
        'label[for]',
        'select',
        'textarea',
        'button',
        '.link',
    ],
}) => {
    const [mousePosition, setMousePosition] = useState({
        x: 0,
        y: 0,
    });

    const [isVisible, setIsVisible] = useState(false);
    const [isOnClickable, setIsOnClickable] = useState(false);

    const updatePosition = (e) => {
        const { clientX, clientY } = e.touches ? e.touches[0] : e;
        setMousePosition({ x: clientX, y: clientY });
    };

    useEffect(() => {
        const onMouseMove = (e) => {
            updatePosition(e);

            const isCursorOnClickable = clickables.some(
                (tagName) => e.target.tagName.toLowerCase() === tagName.toLowerCase()
            );

            setIsOnClickable(isCursorOnClickable);
            setIsVisible(true);
        };

        const onTouchMove = (e) => {
            updatePosition(e);
        };

        if (document) {
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('touchmove', onTouchMove);
        }

        return () => {
            if (document) {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('touchmove', onTouchMove);
            }
        };
    }, [clickables]);

    useEffect(() => {
        let scrollTimer;

        const handleScroll = () => {
            setIsVisible(false);

            clearTimeout(scrollTimer);

            scrollTimer = setTimeout(() => {
                setIsVisible(true);
            }, 350);

            setMousePosition((prevPosition) => ({
                ...prevPosition,
                x: prevPosition.x + window.scrollX,
                y: prevPosition.y + window.scrollY,
            }));
        };

        if (window) {
            window.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (window) {
                window.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    const innerCursorVariant = {
        default: {
            transition: {
                duration: innerTransitionDuration,
                ease: 'linear',
            },
            x: mousePosition.x - innerSize / 2,
            y: mousePosition.y - innerSize / 2,
            mixBlendMode: innerCursorInvert ? 'difference' : 'normal',
            scale: isOnClickable ? 1.3 : 1,
        },
    };

    const outerCursorVariant = {
        default: {
            transition: {
                duration: outerTransitionDuration,
                ease: 'linear',
            },
            x: mousePosition.x - outerSize / 2,
            y: mousePosition.y - outerSize / 2,
            mixBlendMode: outerCursorInvert ? 'difference' : 'normal',
        },
    };

    // Check if the screen width is greater than the threshold (adjust as needed)
    const shouldRenderCursor =
        window.innerWidth > 768 &&
        (('ontouchstart' in window && window.innerWidth <= 1024) || !(('ontouchstart' in window) && window.innerWidth <= 1024));

    return (
        <>
            {shouldRenderCursor && isVisible && (
                <>
                    <motion.div
                        variants={innerCursorVariant}
                        animate="default"
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            pointerEvents: 'none',
                            zIndex: 999,
                            width: innerSize + 'px',
                            height: innerSize + 'px',
                            borderRadius: '50%',
                            backgroundColor: `rgba(${innerColor} , ${innerAlpha})`,
                            display: isVisible ? 'block' : 'none',
                        }}
                    />
                    {anotherCursor && (
                        <motion.div
                            variants={outerCursorVariant}
                            animate="default"
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                pointerEvents: 'none',
                                zIndex: 999,
                                width: outerSize + 'px',
                                height: outerSize + 'px',
                                borderRadius: '50%',
                                backgroundColor: `rgba(${outerColor} , ${outerAlpha})`,
                                display: isVisible ? 'block' : 'none',
                            }}
                        />
                    )}
                </>
            )}
        </>
    );
};

AnimatedCursor.propTypes = {
    innerSize: PropTypes.number,
    innerColor: PropTypes.string,
    innerAlpha: PropTypes.number,
    innerTransitionDuration: PropTypes.number,
    innerCursorInvert: PropTypes.bool,
    anotherCursor: PropTypes.bool,
    outerSize: PropTypes.number,
    outerColor: PropTypes.string,
    outerAlpha: PropTypes.number,
    outerTransitionDuration: PropTypes.number,
    outerCursorInvert: PropTypes.bool,
    clickables: PropTypes.array,
};

export default AnimatedCursor;
