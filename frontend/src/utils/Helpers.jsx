//helper functions
import cardData from '../data/tarot-deck.json'

//returns an array of three random cards
export function threeRandomCards() {
    const threeCards = [...cardData].sort(() => Math.random() - 0.5)
    return threeCards.splice(0,3);
}

//returns one random card
export function randomCard() {
    return cardData[Math.floor(Math.random() * cardData.length)];
}
