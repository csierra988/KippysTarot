import { useState } from 'react';
import { threeRandomCards } from '../utils/Helpers';
import TarotCard from './TarotCard';
import styled from 'styled-components';

const Content = styled.div`
    display: flex;
    width: 100%;
    gap: 20px;
    margin-top: 60px;
`;

const KippyBlock = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    background: black;
    min-height: 400px;

    @media (max-width: 888px) {
        display: none;
    }
`;

const ReadingBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 45px;
    padding: 40px;
`;

const Text = styled.div`
    align-items: center;
    background-color: white;
    border: 2px solid black;
    width: 500px;
    height: 50px;
    padding: 10px;
    color: black;
`;

const CardContainer = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 50px;
    padding: 10px;
`;

const Row = styled.div`
    display: flex;
    gap: 32px;
    justify-content: center;
    flex-wrap: wrap;
`;

const Button = styled.button`
    font-size: 1em;
    outline: none;
    border: none;

    &:hover {
        outline: none;
        border: none;
        color: rgba(104, 20, 138, 0.66);
    }
`;

const ButtonBlock = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px auto; 
`;

const SaveButton = styled.div`
    padding: 10px;
`;

function Reading() {
    const [cards, setCards] = useState([]);
    const [readingButton, setReadingButton] = useState(true);
    const [cardValue, setCardValue] = useState(0);

    const drawThreeCards = () => {
        const threeCards = threeRandomCards();
        setCards(threeCards);
        //changing card value so that the cards get updated and rerender starting on back image
        setCardValue(prev => prev + 1);
    }

    //the first reading displays three cards, but subsequent readings display draw again button
    const firstReading = () => {
        const threeCards = threeRandomCards();
        setCards(threeCards);
        setReadingButton(false);
    }

    const saveReading = () => {
        alert("saved reading");
    }

    return (
        <ReadingBlock>

            <Content>
                <KippyBlock>
                    <p>meow its me kippy</p>
                </KippyBlock>

                <CardContainer>
                    <Text>your reading blah blah blah</Text>
                    <Row>
                    {cards.map((card) =>
                        <TarotCard key={`${cardValue} - ${card.number}`} cardData={card} />
                    )}
                </Row>

                </CardContainer>

            </Content>

            <ButtonBlock>
                <SaveButton>
                    <Button onClick={saveReading}>Save Reading</Button>
                    { readingButton ? (
                        <Button onClick={firstReading}>Three Cards</Button>
                    ): (
                        <Button onClick={drawThreeCards}>Draw Again</Button>
                    )}
                </SaveButton>
            </ButtonBlock>
        </ReadingBlock>
    );
}

export default Reading;