//helper functions
import cardData from '../data/tarot-deck.json'

//returns an array of three random cards
export function threeRandomCards() {
    //use when testing specific cards
    // const typeCards = cardData.filter(
    //     card => card.suit == 'wands'
    // );
    const threeCards = [...cardData].sort(() => Math.random() - 0.5).splice(0,3)
    return threeCards.map(card => ({
        ...card,
        reversed: Math.random() < 0.5
    }));
}

//returns one random card
export function randomCard() {
    return cardData[Math.floor(Math.random() * cardData.length)];
}
