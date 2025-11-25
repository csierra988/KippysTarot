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

const CardBlock = styled.div`
    display: grid;
    width: 400px;
    height: 600px;
`;


const Card = styled.div`
    width: 300px;
    height: 500px;
    border: 1px solid black;
    border-radius: 20px;
    margin: 50px auto;
    grid-area: 1 / 1 / 2 / 2;
    z-index: 1;
    background: ${props => props.$backgroundImage
        ? `url(${props.$backgroundImage})`
        : "url(${cardImage})"
    };
    background-size: cover;
    background-position: center;
`;

const CardData = styled.div`
    width: 250px;
    height: 100px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 0;
    grid-area: 1 / 1 / 2 / 2;
    z-index: 2;
    background-color: rgba(255, 255, 255, 0.85);
    box-shadow: 0 8px 24px hsla(0, 0%, 0%, .15);
`;


function TarotCard({ cardData }) {
    console.log("cardData received:", cardData);
    const [isFlipped, setIsFlipped] = useState(false);

    function flipCard() {
        setIsFlipped(!isFlipped);
    }

    return (
        <div>
            <ReactCardFlip flipDirection='horizontal' isFlipped={isFlipped}>
                <CardBlock>
                    <BackCard onClick={flipCard}>
                        {/* this is going to be the same for every card */}
                    </BackCard>
                </CardBlock>

                <div onClick={flipCard}>
                    <CardBlock>

                        <CardData>
                            <h5>{cardData?.meaning}</h5>
                        </CardData>

                        <Card onClick={flipCard}
                            $backgroundImage={cardData?.image}>
                        </Card>

                    </CardBlock>

                </div>
            </ReactCardFlip>
        </div>
    );
}

export default TarotCard;