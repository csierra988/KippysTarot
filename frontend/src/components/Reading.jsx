//displays the three card reading and can save at the end
import { useState, useEffect } from 'react';
import { randomCard, threeRandomCards } from '../utils/Helpers';
import TarotCard from './TarotCard';
import styled from 'styled-components';

const ReadingBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    padding: 40px;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: flex-end;
    flex-wrap: wrap;
`;


function Reading() {
    // //the 3 cards that are selected
    const [cards, setCards] = useState([]);

    const drawThreeCards = () => {
        const threeCards = threeRandomCards();
        setCards(threeCards);
    }

    // testing a single card
    // const drawCards = () => {
    //     const drawnCard = randomCard();
    //     setCards([drawnCard]);
    // };

    return (
        <div>
            <button onClick={drawThreeCards}>Three Cards</button>
            <ReadingBlock>
                <Row>
                    {/* in the future add perhaps a cardTense
                        for past, present, and future to know which meaning
                        to use */}
                    {cards.map((card) =>
                        <TarotCard key={card.number} cardData={card} />
                    )}
                </Row>
            </ReadingBlock>
        </div>
    );
}

export default Reading;