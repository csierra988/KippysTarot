//tarotjournal - individual saved reading 
//displays cards and text box
//use it to write and reflect on how the cards can apply to your situation
import styled from 'styled-components';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getReading, saveEntry } from '../api';
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
    width: 100%;
    overflow-x: hidden;
`;

const Content = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: flex-start;
    gap: 20px;

    @media (max-width: 1250px) {
        flex-direction: column;
        align-items: center;
    }
`;

const EntryBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1; 
    padding-right: 40px; 
    min-width: 0; 

   @media (max-width: 1250px) {
    width: 100%;
    flex: none;
    padding: 0 20px;
  }
`;

const JournalTextArea = styled.textarea`
    display: flex;
    width: 100%;
    max-width: 400px; 
    height: 360px;
    padding: 15px;
    font-size: 16px;
    outline: none;
    border: 2px solid transparent;
    border-radius: 8px;
    box-sizing: border-box; 
    margin: 20px 0;
    box-shadow: 0 8px 24px hsla(0, 0%, 0%, .15);
    font-family: "Pixelify Sans", sans-serif;
    background-color: white;
    color: black;

    &&::placeholder {
        font-family: "Pixelify Sans", sans-serif;
    }

    &:focus {
        border: 2px solid rgba(104, 20, 138, 0.66); 
        outline: none; 
    }
`;

const Cards = styled.div`
    flex: 1;
    display: flex;
    gap: 20px;
    margin: 40px;
    min-height: 280px;

    @media (max-width: 1250px) {
        order: -1;
    }
`;

const Title = styled.div`
    justify-content: center;
    text-align: center;
    margin: 24px;
    margin-top: 60px;
    font-weight: 500;
    font-size: 30px;
    color: black;

    text-shadow: 
    -1px -1px 0 #ffffffff,  
     1px -1px 0 #ffffffff,
    -1px  1px 0 #ffffffff,
     1px  1px 0 #ffffffff;

     @media (max-width: 1250px) {
        margin-top: 100px;
  }
`;

// const BackButton = styled.button`
//     height: 50px;
//     position: relative;
//     top: 60px;
//     left: 10px;
//     margin-right: auto;
//     display: flex;
//     justify-content: center;
//     color: black;
//     background-color: rgba(255, 255, 255, 0.65);
//     box-shadow: 0 8px 24px hsla(0, 0%, 0%, .15);

//     &:hover {
//         outline: none;
//         border: none;
//         color: rgba(104, 20, 138, 0.66);
//     }

//     @media (max-width: 888px) {
//         top: 76px;
//     }

// `;

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
    border: 2px solid transparent;
    width: 150px;
    margin-left: 20px;
    box-shadow: 0 8px 24px hsla(0, 0%, 0%, .15);
    color: black;
    background-color: white;
    
    &:hover {
        border: 2px solid rgba(104, 20, 138, 0.66); 
        color: rgba(104, 20, 138, 0.66);
    }

    &:focus {
        border: 2px solid rgba(104, 20, 138, 0.66); 
        outline: none; 
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
`;

function Journal() {
    const { user, isLoading } = useAuth();

    const { readingId } = useParams();
    const [title, setTitle] = useState("");
    const [reading, setReading] = useState(null);
    const [cards, setCards] = useState([]);
    const [entry, setEntry] = useState('');
    const [error, setError] = useState(false);

    const navigate = useNavigate();


    useEffect(() => {
        const fetchReading = async () => {
            if (user) {
                try {
                    //send in the readingId AND the uid, so a user can only access their readings
                    const response = await getReading(user.uid, readingId);
                    if (!response) {
                        setError(true);
                        return;
                    }
                    setReading(response);
                    setEntry(response.journal_entry || '');
                    setTitle(response.title);

                    //getting the data for each tarot card
                    const card1 = cardData.find(card => card.number == response.card1);
                    const card2 = cardData.find(card => card.number == response.card2);
                    const card3 = cardData.find(card => card.number == response.card3);
                    setCards([card1, card2, card3]);


                } catch (err) {
                    console.error('error getting reading: ', err);
                    setError(true);
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

    const savingEntry = async () => {
        //retrieving the journal entry text
        // const entry = document.getElementById("entry").value;
        // console.log(entry);

        try {
             await saveEntry(entry, readingId);
             console.log('successfully saved text entry');
        } catch (err) {
            console.error("error with saving entry: ", err);
        }
    }

    if (isLoading) {
        //waiting for authentication
        return (<Wrapper>
            <p>loading reading...</p>
        </Wrapper>);
    }
    //not logged in 
    if (!user) {
        return (<Wrapper>
            <p>you must be logged in to view this page</p>
            <ButtonUnauth onClick={loginButton}>
                <BackButtonText> log in here! </BackButtonText>
            </ButtonUnauth>
        </Wrapper>);
    }
    if (error) {
        //trying to access an unauthorized reading entry
        return (<Wrapper>
            <p>unable to load reading.</p>
            <ButtonUnauth onClick={backButton}>
                <TbArrowBackUp size={20} />
                <BackButtonText> back to history </BackButtonText>
            </ButtonUnauth>
        </Wrapper>);
    }

    if (!reading || cards.length !== 3) {
        return (<Wrapper>
            <p>Loading...</p>
        </Wrapper>);
    }

    return (
        <Wrapper>
            {/* <BackButton onClick={backButton}>
                <TbArrowBackUp size={20} />
                <BackButtonText> history </BackButtonText>
            </BackButton> */}

            <Title>{title}</Title>

            <Content>

                <Cards>
                    {cards.map((card, index) => (
                        <TarotCard key={index} cardData={card} />
                    ))}
                </Cards>

                <EntryBlock>
                    <JournalTextArea
                        value ={entry}
                        onChange ={(e) => setEntry(e.target.value)}
                        placeholder={
                            cards.length === 3
                                ? `This is your tarot journal. Use this to write out your thoughts. For example: How does ${cards[0].name}, ${cards[1].name}, and ${cards[2].name} apply to you and your situation?`
                                : "Loading reading entry..."
                        }
                    />
                    <SaveButton>
                        <Button onClick={savingEntry}>Save Entry</Button>
                    </SaveButton>

                </EntryBlock>

            </Content>

        </Wrapper>
    );
}

export default Journal;