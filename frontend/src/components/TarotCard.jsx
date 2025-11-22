//The display for singular card
import { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import styled from 'styled-components';

const FrontCard = styled.div`
    width: 300px;
    height: 400px;
    border: 1px solid black;
    border-radius: 20px;
    margin 50px auto;
    background: skyblue;
`;

const BackCard = styled.div`
    width: 300px;
    height: 400px;
    border: 1px solid black;
    border-radius: 20px;
    margin 50px auto;
    background: teal;
`;


function TarotCard() {
    const [isFlipped, setIsFlipped] = useState(false);

    function flipCard(){
        //if front is showing show back vice versa
        setIsFlipped(!isFlipped);
    }

    return (
        <div>
            <ReactCardFlip flipdirection='horizontal' isFlipped={isFlipped}>
                <FrontCard onClick={flipCard}>

                </FrontCard>
                <BackCard onClick={flipCard}>

                </BackCard>
                
            </ReactCardFlip>
        </div>
    );
}

export default TarotCard;