//The display for singular card
import { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import styled from 'styled-components';
import cardBackImage from '/images/card-images/back1.jpg';

//the back of the tarot card
const BackCard = styled.div`
    width: 200px;
    height: 400px;
    border: 1px solid black;
    border-radius: 20px;
    margin: 50px auto;
    overflow: hidden;
`;

const BackImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: fill;
    object-position: center;
`;

const FrontImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: fill;
    object-position: center;
`;

const CardBlock = styled.div`
    display: grid;
    width: 400px;
    height: 600px;
`;


const Card = styled.div`
    width: 200px;
    height: 400px;
    border: 1px solid black;
    border-radius: 20px;
    margin: 50px auto;
    grid-area: 1 / 1 / 2 / 2;
    z-index: 1;
`;

const CardData = styled.div`
    width: 150px;
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
                        <BackImage src={cardBackImage} />
                    </BackCard>
                </CardBlock>

                <div onClick={flipCard}>
                    <CardBlock>

                        <CardData>
                            <h5>{cardData?.meaning}</h5>
                        </CardData>

                        <Card onClick={flipCard}>
                            <FrontImage src={cardData?.image} />
                            
                        </Card>

                    </CardBlock>

                </div>
            </ReactCardFlip>
        </div>
    );
}

export default TarotCard;