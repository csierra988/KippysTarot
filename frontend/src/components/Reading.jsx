import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { threeRandomCards } from '../utils/Helpers';
import { saveReading } from '../api';
import TarotCard from './TarotCard';
import styled from 'styled-components';

const Content = styled.div`
    display: flex;
    width: 100%;
    gap: 20px;
    margin-top: 60px;

    @media (max-width: 888px) {
        flex-direction: column;
        align-items: center;
    }
`;

const KippyBlock = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    background: black;
    height: 550px;
    max-height: 550px;

    @media (max-width: 888px) {
        order: -1;
        width: 550px;
        height: 200px;
        padding-top: 40px;
        padding-bottom: 40px;
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
    text-align: center;
    align-items: center;
    background-color: white;
    border: 2px solid black;
    width: 550px;
    height: 60px;
    padding: 10px;
    color: black;
    font-weight: 420;
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
    width: 150px;
    margin-left: 20px;
    box-shadow: 0 8px 24px hsla(0, 0%, 0%, .15);

    &:hover {
        outline: none;
        border: none;
        color: rgba(104, 20, 138, 0.66);
    }
`;

const ButtonBlock = styled.div`
    display: flex;
    position: relative;
    justify-content: center;
    margin: 20px auto; 
`;

const SaveButton = styled.div`
    padding: 10px;
`;

function Reading() {
    const [user, setUser] = useState(null);
    const auth = getAuth();

    //checking if the user is logged in
    useEffect(() => {
            const unsub = onAuthStateChanged(auth, (currentUser) => {
                setUser(currentUser);
            });
    
            return () => unsub();
        }, []);

    const [cards, setCards] = useState([]);
    const [readingButton, setReadingButton] = useState(true);
    const [cardValue, setCardValue] = useState(0);

    const drawThreeCards = () => {
        const threeCards = threeRandomCards();
        setCards(threeCards);
        //changing card value so that the cards get updated and rerender starting on back image
        setCardValue(prev => prev + 1);
    }

    //the first reading displays three cards, but subsequent readings display draw again and save reading buttons
    const firstReading = () => {
        const threeCards = threeRandomCards();
        setCards(threeCards);
        setReadingButton(false);
    }

    //saves a reading with title if a user is logged in
    const savingReading = async ( ) => {
        if (user) {
            const title = prompt("enter a title for your reading");
    
            if (title) {
                try {
                     //save the reading to the database with uid, title, and card ids
                    await saveReading(user.uid, title, cards[0].number, cards[1].number, cards[2].number);
                    console.log('successfully saved reading with title');
                } catch (err) {
                    console.error('error with saving reading: ', err);
                }
            }
        }
        else {
            alert("to save a reading you must be logged in");
        }
    }

    return (
        <ReadingBlock>

            <Content>
                <KippyBlock>
                    <p>meow its me kippy</p>
                </KippyBlock>

                <CardContainer>
                    <Text>
                        <p>my third eye has opened to reveal your reading...meow</p> </Text>
                    <Row>
                    {cards.map((card) =>
                        <TarotCard key={`${cardValue} - ${card.number}`} cardData={card} />
                    )}
                </Row>

                 <ButtonBlock>
                <SaveButton>
                    { readingButton ? (
                        <Button onClick={firstReading}>Reveal Cards</Button>
                    ): (
                        <div>
                            <Button onClick={drawThreeCards}>Draw Again</Button>
                            <Button onClick={savingReading}>Save Reading</Button>
                        </div>
                    )}
                </SaveButton>
            </ButtonBlock>

                </CardContainer>

            </Content>

            {/* <ButtonBlock>
                <SaveButton>
                    <Button onClick={saveReading}>Save Reading</Button>
                    { readingButton ? (
                        <Button onClick={firstReading}>Three Cards</Button>
                    ): (
                        <Button onClick={drawThreeCards}>Draw Again</Button>
                    )}
                </SaveButton>
            </ButtonBlock> */}
        </ReadingBlock>
    );
}

export default Reading;