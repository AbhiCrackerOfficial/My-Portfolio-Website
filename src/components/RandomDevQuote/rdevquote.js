import React, { useState, useEffect, useCallback, useRef } from 'react';
import './rdevquote.css';

const API_URL = 'https://random-dev-quotes.abhicracker.com/api/quotes/random';

const RDevQuote = () => {
    const [quote, setQuote] = useState('');
    const intervalRef = useRef(null);

    const randomQuote = useCallback(async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Failed to fetch quote');
            }
            const data = await response.json();
            setQuote(data);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        randomQuote(); // Fetch initial quote

        intervalRef.current = setInterval(randomQuote, 5000); // Fetch new quote every 5 seconds

        return () => {
            clearInterval(intervalRef.current); // Clear interval on component unmount
        };
    }, [randomQuote]);

    return (
        <span className='RandomDevQuote'>
            ❝ {quote && `${quote.quote} ❞`}
            <br />
            <span className='Author'>{quote && `- ${quote.author}`}</span>
        </span>
    );
};

export default RDevQuote;
