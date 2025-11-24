//The display for singular card
import { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import styled from 'styled-components';
import cardBackImage from '/images/card-images/back.jpg';
import cardImage from '/images/card-images/w14.jpg';

//the back of the tarot card
const BackCard = styled.div`
    width: 300px;
    height: 500px;
    border: 1px solid black;
    border-radius: 20px;
    margin: 50px auto;
    background: url(${cardBackImage});
    background-size: cover;
    background-position: center;
`;

//going to take in cardData
const Card = styled.div`
    width: 300px;
    height: 500px;
    border: 1px solid black;
    border-radius: 20px;
    margin: 50px auto;
    background: ${props => props.$backgroundImage
        ? `url(${props.$backgroundImage})`
        : "url(${cardImage})"
    };
    background-size: cover;
    background-position: center;
`;


function TarotCard({ cardData }) {
    console.log("cardData received:", cardData);
    const [isFlipped, setIsFlipped] = useState(false);

    function flipCard(){
        setIsFlipped(!isFlipped);
    }

    return (
        <div>
            <ReactCardFlip flipDirection='horizontal' isFlipped={isFlipped}>
                <BackCard onClick={flipCard}>
                    {/* this is going to be the same for every card */}
                </BackCard>
                <div onClick={flipCard}>
                    <Card onClick={flipCard} 
                    $backgroundImage={cardData?.image}>
                    </Card>
                    <h3>{cardData?.number}</h3>
                    <h4>{cardData?.meaning}</h4>
                </div>
                
            </ReactCardFlip>
        </div>
    );
}

export default TarotCard;