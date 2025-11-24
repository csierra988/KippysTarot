//displays the three card reading and can save at the end
import { useState, useEffect } from 'react';
import { randomCard } from '../utils/Helpers';
import TarotCard from './TarotCard';
import styled from 'styled-components';

function Reading() {
    // //the 3 cards that are selected
    const [cards, setCards] = useState([]);

    // useEffect(() => {
    //     setCards()
    // });
    const drawCards = () => {
        const drawnCard = randomCard();
        console.log("drawnCard:", drawnCard);
        setCards([drawnCard]);
    };

    console.log("cards state:", cards);

    return (
        <div>
            <button onClick={drawCards}>Card</button>
            {cards.map((card) =>
            <TarotCard key={card.number} cardData={card}/>
        )}
        </div>
    );
}

export default Reading;