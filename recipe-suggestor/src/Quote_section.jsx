import React, { useState, useEffect } from 'react';

const Quote_section = () => {
  const [quote, setQuote] = useState("Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible!");

  const options = { method: 'GET' };

  async function getQuote() {
    try {
      let response = await fetch('https://api.spoonacular.com/food/trivia/random?apiKey=7f7543ed5a09491c8d1e89145f5caf81', options);
      response = await response.json();
      console.log(response);
      setQuote(response['text']);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  }

  useEffect(() => {
    getQuote(); 
  }, []); 

  return (
    <div className='section quote navContainer'>
      <p className='quote-text'>
        <img src='../public/quote.svg' alt="quote icon" />
        {quote}
      </p>
    </div>
  );
}

export default Quote_section;
