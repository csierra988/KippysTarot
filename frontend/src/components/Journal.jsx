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

    @media (max-width: 888px) {
        flex-direction: column;
        align-items: center;
    }
`;

const JournalTextArea = styled.textarea`
    width: 50%;
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

const Cards = styled.div`
    flex: 1;
    display: flex;
    gap: 20px;
    margin: 40px;
    min-height: 280px;
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
    top: 30px;
    left: 10px;
    margin-right: auto;
    display: flex;
    font-size: 16px;

`;

function Journal() {
    const { readingId } = useParams();
    const [title, setTitle] = useState("");
    const [reading, setReading] = useState(null);
    const [cards, setCards] = useState([]);
    const [entry, setEntry] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchReading = async () => {
            try{
                const response = await getReading(readingId);
                setReading(response);

                setTitle(response.title);

                //getting the data for each tarot card
                const card1 = cardData.find(card => card.number === response.card1);
                const card2 = cardData.find(card => card.number === response.card2);
                const card3 = cardData.find(card => card.number === response.card3);
                setCards([card1, card2, card3]);

            } catch (err) {
                console.error('error getting reading: ', err);
            }
        };

        fetchReading();

    }, [readingId]);

    //takes user back to history page
    const backButton = () => {
        navigate(-1);
    }

    
    if (!reading) {
        return <Wrapper>loading reading...</Wrapper>
    }

    return (
        <Wrapper>
            <BackButton onClick={backButton}>
                <TbArrowBackUp size={20}/>
                    <p> history </p>
            </BackButton>

            <Title>this is the entry for {title}</Title>

        <Content>

            <Cards>
                {cards.map((card, index) => (
                    <TarotCard key={index} cardData={card} />
                ))}
            </Cards>
            

            <JournalTextArea 
                placeholder={`This is your tarot journal. Use this to write out your thoughts. For example: How does the ${cards[0].name}, ${cards[1].name}, and ${cards[2].name} cards apply to you and your situation?`}
            />
        </Content>

        </Wrapper>
    );
}

export default Journal;