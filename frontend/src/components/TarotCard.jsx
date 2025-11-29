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

//parent block for front/back of card
const CardBlock = styled.div`
    display: grid;
    width: 220px;
    height: 380px;
    margin: 0;
`;

//parent for front of card - using for animation
const FrontCard = styled.div`
    display: inline-block;
    padding: 10px;
    border-radius: 25px;
    transition: transform 1s ease;
    &:hover {
        padding: 16px;
        background: #3F5EFB;
        background: radial-gradient(circle, rgba(63, 94, 251, 0.25) 0%, rgba(252, 70, 107, 0.25) 100%);
        filter: blur(0px);
        box-shadow: 
            0 0 30px rgba(63, 94, 251, 0.4),
            0 0 60px rgba(252, 70, 107, 0.3),
            0 0 90px rgba(63, 94, 251, 0.2);
        transform: scale(1.15);
        transition: 1s all ease;
    }
`;

const Card = styled.div`
    width: 200px;
    height: 350px;
    border: 1px solid black;
    border-radius: 20px;
    margin: 20px auto;
    overflow: hidden;
    grid-area: 1 / 1 / 2 / 2;
`;

const CardData = styled.div`
    width: 160px;
    height: 90px;
    margin-left: auto;
    margin-right: auto;
    margin-top: -10px;
    grid-area: 1 / 1 / 2 / 2;
    z-index: 2;
    background-color: rgba(255, 255, 255, 0.85);
    box-shadow: 0 8px 24px hsla(0, 0%, 0%, .15);
    border-radius: 10px;
    font-size: 14px;
    text-align: center;
    display: inline-block;
    color: black;
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

                <FrontCard>
                    <CardBlock>

                        <CardData>
                            {cardData?.meaning}
                        </CardData>

                        <Card>
                            <FrontImage src={cardData?.image} />
                        </Card>

                    </CardBlock>
                </FrontCard>

            </ReactCardFlip>
        </div>
    );
}

export default TarotCard;