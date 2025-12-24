//tarotjournal - individual saved reading 
//displays cards and text box
//use it to write and reflect on how the cards can apply to your situation
import styled from 'styled-components';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getReading } from '../api';
import { TbArrowBackUp } from "react-icons/tb";
import TarotCard from './TarotCard';
import cardData from '../data/tarot-deck.json';
import { useAuth } from '../hooks/useAuth';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100vw;
`;

const Content = styled.div`
    display: flex;
    width: 100%;

    @media (max-width: 1100px) {
        flex-direction: column;
        align-items: center;
    }
`;

const JournalTextArea = styled.textarea`
    display: flex;
    width: 400px;
    height: 360px;
    padding: 15px;
    font-size: 16px;
    border: 2px solid black;
    border-radius: 8px;
    margin: 20px;
    font-family: "Poppins", sans-serif;

    &&::placeholder {
        font-family: "Poppins", sans-serif;
    }
`;

const EntryBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
`

const Cards = styled.div`
    flex: 1;
    display: flex;
    gap: 20px;
    margin: 40px;
    min-height: 280px;

    @media (max-width: 1100px) {
        order: -1;
    }
`;

const Title = styled.div`
    justify-content: center;
    text-align: center;
    margin: 24px;
    font-weight: 500;
    font-size: 20px;
    color: black;
`;

const BackButton = styled.button`
    height: 50px;
    position: relative;
    top: 60px;
    left: 10px;
    margin-right: auto;
    display: flex;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.65);
    box-shadow: 0 8px 24px hsla(0, 0%, 0%, .15);

    &:hover {
        outline: none;
        border: none;
        color: rgba(104, 20, 138, 0.66);
    }

    @media (max-width: 888px) {
        top: 76px;
    }

`;

const BackButtonText = styled.span`
    font-size: 16px;
    @media (max-width: 888px) {
        display: none;
    }
`;

const SaveButton = styled.div`
    padding: 10px;
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

const ButtonUnauth = styled.button`
    align-self: center;
    box-shadow: 0 8px 24px hsla(0, 0%, 0%, .15);

    &:hover {
        outline: none;
        border: none;
        color: rgba(104, 20, 138, 0.66);
    }
`

function Journal() {
    const { user, isLoading } = useAuth();

    const { readingId } = useParams();
    const [title, setTitle] = useState("");
    const [reading, setReading] = useState(null);
    const [cards, setCards] = useState([]);
    const [entry, setEntry] = useState('');

    const navigate = useNavigate();


    useEffect(() => {
        const fetchReading = async () => {
            if (user) {
                try {
                    //send in the readingId AND the uid, so a user can only access their readings
                    const response = await getReading(user.uid, readingId);
                    setReading(response);

                    setTitle(response.title);

                    //getting the data for each tarot card
                    const card1 = cardData.find(card => card.number == response.card1);
                    const card2 = cardData.find(card => card.number == response.card2);
                    const card3 = cardData.find(card => card.number == response.card3);
                    setCards([card1, card2, card3]);


                } catch (err) {
                    console.error('error getting reading: ', err);
                }
            }
        };

        fetchReading();

    }, [readingId, user]);

    const backButton = () => {
        navigate('/History');
    }

    const loginButton = () => {
        navigate('/Login');
    }

    const saveEntry = () => {

    }

    if (isLoading) {
        //waiting for authentication
        return (<Wrapper>
            <p>loading reading...</p>
        </Wrapper>);
    }
    //not logged in 
    else if (!user) {
        return (<Wrapper>
            <p>you must be logged in to view this page</p>
            <ButtonUnauth onClick={loginButton}>
                <BackButtonText> log in here! </BackButtonText>
            </ButtonUnauth>
        </Wrapper>);
    }
    else if (user && !reading) {
        //trying to access an unauthorized reading entry
        return (<Wrapper>
            <p>unable to load reading.</p>
            <ButtonUnauth onClick={backButton}>
                <TbArrowBackUp size={20} />
                <BackButtonText> back to history </BackButtonText>
            </ButtonUnauth>
        </Wrapper>);
    }

    return (
        <Wrapper>
            <BackButton onClick={backButton}>
                <TbArrowBackUp size={20} />
                <BackButtonText> history </BackButtonText>
            </BackButton>

            <Title>{title}</Title>

            <Content>

                <Cards>
                    {cards.map((card, index) => (
                        <TarotCard key={index} cardData={card} />
                    ))}
                </Cards>

                <EntryBlock>
                    <JournalTextArea
                        placeholder={
                            cards.length === 3
                                ? `This is your tarot journal. Use this to write out your thoughts. For example: How does the ${cards[0].name}, ${cards[1].name}, and ${cards[2].name} cards apply to you and your situation?`
                                : "Loading reading entry..."
                        }
                    />
                    <SaveButton>
                        <Button onClick={saveEntry}>Save Entry</Button>
                    </SaveButton>

                </EntryBlock>

            </Content>

        </Wrapper>
    );
}

export default Journal;