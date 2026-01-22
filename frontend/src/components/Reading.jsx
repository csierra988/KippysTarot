import { useState, useRef } from 'react';
import { threeRandomCards } from '../utils/Helpers';
import { saveReading } from '../api';
import TarotCard from './TarotCard';
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';

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
    background-color: rgba(255, 255, 255, 0.65);
    border-radius: 12px;
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
    border: 2px solid transparent;
    height: 55px;
    width: 200px;
    margin-left: 20px;
    box-shadow: 0 8px 24px hsla(0, 0%, 0%, .15);
    background-color: rgba(255, 255, 255, 0.75);
    color: black;

    &:hover {
        border: 2px solid rgba(104, 20, 138, 0.66); 
        color: rgba(104, 20, 138, 0.66);
    }

    &:focus {
        border: 2px solid rgba(104, 20, 138, 0.66); 
        outline: none; 
    }
`;

const ButtonBlock = styled.div`
    display: flex;
    position: relative;
    justify-content: center;
    margin: 20px auto; 
`;

const ButtonPlacement = styled.div`
    padding: 10px;
`;

const SavePrompt = styled.dialog`
    color: black;
    background-color: white;
    outline: none;
    border: 2px solid transparent;
    border-radius: 12px;
    text-align: center;
    padding: 30px;
    position: fixed;
    width: 440px;

    @media (min-width: 888px) {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;

const CenteredPrompts = styled.div`
`;

const UserInput = styled.input`
    height: 30px;
    width: 400px;
    margin: 10px;
   // padding: 4px;
    background-color: white;
    caret-color: black;
    color: black;
    outline: none;
    border: 2px solid rgba(104, 20, 138, 0.66);
    border-radius: 8px;

    &:focus {
        border: 2px solid rgba(104, 20, 138, 0.66); 
        outline: none; 
    }

    &&::placeholder {
        font-family: "Pixelify Sans", sans-serif;
    }
`;

function Reading() {
    const { user, isLoading} = useAuth();

    const [cards, setCards] = useState([]);
    const [readingButton, setReadingButton] = useState(true);
    const [cardValue, setCardValue] = useState(0);
    const [title, setTitle] = useState('');
    const dialogRef = useRef(null);

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
    const savingReading = async ( event ) => {
            //console.log(event);
            event.preventDefault();
            
            if (title) {
                try {
                     //save the reading to the database with uid, title, and card ids
                    await saveReading(user.uid, title, cards[0].number, cards[1].number, cards[2].number);
                    console.log('successfully saved reading with title');
                } catch (err) {
                    console.error('error with saving reading: ', err);
                }
            }

            setTitle(""); //resetting the title
            dialogRef.current?.close();
    }

    const changeTitle =  (event) => {
        setTitle(event.target.value);
    }

    return (
        <>
        <SavePrompt ref={dialogRef}>
            { user ? (
                <CenteredPrompts> 
                    Enter the title for your reading.
                    <form onSubmit={savingReading}>
                        <UserInput type="text" placeholder="title" value={title} onChange={changeTitle}/>
                        <Button type="submit">
                            Save
                        </Button>
                    </form>
                </CenteredPrompts>
            ) : (
                    <CenteredPrompts> 
                        <p> Log in to save a reading.</p>
                        <Button onClick={() => dialogRef.current?.close()}>ok</Button>
                    </CenteredPrompts>
                )
            }
        </SavePrompt>

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

                <ButtonPlacement>
                    { readingButton ? (
                        <Button onClick={firstReading}>Reveal Cards</Button>
                    ): (
                        <div>
                            <Button onClick={drawThreeCards}>Draw Again</Button>
                            <Button onClick={() => dialogRef.current?.showModal()}>Save Reading</Button>
                        </div>
                    )}
                </ButtonPlacement>
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
        </>
    );
}

export default Reading;