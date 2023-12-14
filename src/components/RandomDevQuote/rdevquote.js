import React, { useState, useEffect } from 'react';
import './rdevquote.css';

const RDevQuote = () => {
    const [quote, setQuote] = useState('');

    const randomQuote = async () => {
        try {
            const response = await fetch('https://random-dev-quotes.abhicracker.com/api/quotes/random');
            if (!response.ok) {
                throw new Error('Failed to fetch quote');
            }
            const data = await response.json();
            setQuote(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        randomQuote(); // Fetch initial quote

        const interval = setInterval(randomQuote, 5000); // Fetch new quote every 15 seconds

        return () => {
            clearInterval(interval); // Clear interval on component unmount
        };
    }, []);

    return (
        <span className='RandomDevQuote'>
            ❝ {quote && `${quote.quote} ❞`}
            <br />
            <span className='Author'>{quote && `- ${quote.author}`}</span>
        </span>
    );
};

export default RDevQuote;
