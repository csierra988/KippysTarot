//The display for singular card
import { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import styled from 'styled-components';
import cardBackImage from '/images/card-images/back.jpg';

//the back of the tarot card
const BackCard = styled.div`
    width: 200px;
    height: 350px;
    border: 1px solid black;
    border-radius: 20px;
    margin: 20px auto;
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
    width: 220px;
    height: 340px;
`;


const Card = styled.div`
    width: 200px;
    height: 350px;
    border: 1px solid black;
    border-radius: 20px;
    margin: 20px auto;
    overflow: hidden;
    grid-area: 1 / 1 / 2 / 2;
    z-index: 1;
`;

const CardData = styled.div`
    width: 150px;
    height: 95px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 0;
    grid-area: 1 / 1 / 2 / 2;
    z-index: 2;
    background-color: rgba(255, 255, 255, 0.85);
    box-shadow: 0 8px 24px hsla(0, 0%, 0%, .15);
    font-size: 14px;
    display: inline-block;
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
                            {cardData?.meaning}
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